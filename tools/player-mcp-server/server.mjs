#!/usr/bin/env node

/**
 * BrightSign Player Tools — MCP Server (stdio)
 *
 * A zero-dependency MCP server exposing BrightSign player discovery,
 * probing, and registry management. Communicates via JSON-RPC 2.0
 * over stdin/stdout (stdio transport).
 *
 * Tools:
 *   brightsign_discover_players  — Scan a subnet for BrightSign players
 *   brightsign_probe_player      — Check connectivity to a single player
 *   brightsign_list_players      — List registered players from .brightsign/players.json
 *   brightsign_get_player        — Get config for a specific player
 *   brightsign_add_player        — Register a player
 *   brightsign_remove_player     — Remove a player from registry
 *   brightsign_get_device_info   — Fetch live device info from a player
 *
 * Usage:
 *   node tools/player-mcp-server/server.mjs
 *
 * MCP config (.vscode/mcp.json or plugin .mcp.json):
 *   {
 *     "servers": {
 *       "brightsign-player-tools": {
 *         "command": "node",
 *         "args": ["tools/player-mcp-server/server.mjs"]
 *       }
 *     }
 *   }
 */

import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import { createInterface } from 'node:readline';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PROTOCOL_VERSION = '2024-11-05';
const SERVER_NAME = 'brightsign-player-tools';
const SERVER_VERSION = '0.1.0';

const DEFAULT_PORTS = [8008, 8080, 80, 443];
const DEFAULT_TIMEOUT = 1500;
const DEFAULT_CONCURRENCY = 32;

const API_PATHS = ['/api/v1/info', '/GetDeviceInfo', '/GetID', '/info', '/'];

// ---------------------------------------------------------------------------
// Players file location — workspace-relative
// ---------------------------------------------------------------------------

function findWorkspaceRoot() {
  let dir = process.cwd();
  for (let i = 0; i < 20; i++) {
    if (fs.existsSync(path.join(dir, 'nx.json')) || fs.existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

const WORKSPACE_ROOT = findWorkspaceRoot();
const BRIGHTSIGN_DIR = path.join(WORKSPACE_ROOT, '.brightsign');
const PLAYERS_FILE = path.join(BRIGHTSIGN_DIR, 'players.json');

// ---------------------------------------------------------------------------
// IP / CIDR utilities (lifted from discover-players.mjs)
// ---------------------------------------------------------------------------

function ipToInt(ip) {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
    throw new Error(`Invalid IPv4 address: ${ip}`);
  }
  return ((parts[0] << 24) >>> 0) + ((parts[1] << 16) >>> 0) + ((parts[2] << 8) >>> 0) + (parts[3] >>> 0) >>> 0;
}

function intToIp(value) {
  return [(value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255].join('.');
}

function expandCIDR(cidr) {
  const [baseIp, prefixString] = cidr.split('/');
  const prefix = Number.parseInt(prefixString, 10);
  if (!baseIp || Number.isNaN(prefix) || prefix < 1 || prefix > 32) {
    throw new Error(`Invalid CIDR: ${cidr}`);
  }
  if (prefix < 24) {
    throw new Error(`Only /24 to /32 subnets supported for safety (got /${prefix})`);
  }
  const base = ipToInt(baseIp);
  const mask = (0xffffffff << (32 - prefix)) >>> 0;
  const network = base & mask;
  const hostCount = 2 ** (32 - prefix);
  const ips = [];
  for (let i = 0; i < hostCount; i++) {
    ips.push(intToIp((network + i) >>> 0));
  }
  return ips;
}

function getLocalCandidateCidrs() {
  const nets = os.networkInterfaces();
  const cidrs = new Set();
  for (const entries of Object.values(nets)) {
    for (const entry of entries ?? []) {
      if (entry.family !== 'IPv4' || entry.internal) continue;
      if (!entry.address || !entry.netmask) continue;
      if (
        entry.address.startsWith('10.') ||
        entry.address.startsWith('192.168.') ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(entry.address)
      ) {
        const prefix = entry.netmask
          .split('.')
          .map((o) => Number(o).toString(2).padStart(8, '0'))
          .join('')
          .split('')
          .filter((b) => b === '1').length;
        cidrs.add(`${entry.address}/${prefix}`);
      }
    }
  }
  return [...cidrs];
}

function trimTo24(cidr) {
  const parts = cidr.split('/')[0].split('.');
  return `${parts[0]}.${parts[1]}.${parts[2]}.0/24`;
}

// ---------------------------------------------------------------------------
// BrightSign fingerprinting (lifted from discover-players.mjs)
// ---------------------------------------------------------------------------

function detectEvidence(headers, bodyText, status) {
  const server = String(headers?.server ?? '').toLowerCase();
  const body = String(bodyText ?? '').toLowerCase();
  if (server.includes('brightsign')) return `server:${headers.server}`;
  if (body.includes('diagnostic web server')) return 'body:diagnostic-web-server';
  if (body.includes('brightsign')) return 'body:brightsign';
  if (body.includes('bsp.js') || body.includes('getuservars') || body.includes('/setvalues')) return 'body:dws-classic';
  if (body.includes('<brightsignid>')) return 'body:brightsign-xml-id';
  if (body.includes('/api/v1/') || body.includes('getdeviceinfo')) return 'body:api-endpoint-marker';
  if (body.includes('"fwversion"') || body.includes('"serial"') || body.includes('"model"') || body.includes('"isplayer":true')) return 'body:device-json-marker';
  if (status === 401) return 'http:401-auth-required';
  return null;
}

function parseGetIdXml(body) {
  if (!body || !body.toLowerCase().includes('<brightsignid>')) return null;
  const tag = (name) => {
    const match = body.match(new RegExp(`<${name}>([^<]*)</${name}>`, 'i'));
    return match ? match[1].trim() : null;
  };
  return {
    name: tag('unitName'),
    serial: tag('serialNumber'),
    firmware: tag('firmwareVersion'),
    description: tag('unitDescription'),
  };
}

function normaliseDeviceInfo(data) {
  if (!data || typeof data !== 'object') return null;
  const root = data?.data?.result ?? data?.result ?? data;
  const lookup = (keys) => {
    for (const key of keys) {
      if (root[key] != null && root[key] !== '') return String(root[key]);
    }
    return null;
  };
  const name = lookup(['name', 'unitName', 'hostname']) ?? root?.networking?.result?.name ?? null;
  const description = lookup(['description']) ?? root?.networking?.result?.description?.trim() ?? null;
  const deviceInfo = {
    model: lookup(['model', 'modelName', 'model_number', 'hwFamily']),
    serial: lookup(['serial', 'serialNumber', 'unitSerial']),
    firmware: lookup(['fwversion', 'FWVersion', 'firmware', 'firmwareVersion', 'osVersion']),
    name,
    description,
  };
  return deviceInfo.model || deviceInfo.serial || deviceInfo.firmware || deviceInfo.name || deviceInfo.description ? deviceInfo : null;
}

// ---------------------------------------------------------------------------
// HTTP probing (lifted from discover-players.mjs)
// ---------------------------------------------------------------------------

function httpRequest({ ip, port, path: reqPath, timeout }) {
  const useHttps = port === 443;
  const client = useHttps ? https : http;
  return new Promise((resolve) => {
    const req = client.request(
      {
        host: ip,
        port,
        path: reqPath,
        method: 'GET',
        timeout,
        rejectUnauthorized: false,
        headers: {
          'User-Agent': 'WallRun-PlayerMCP/1.0',
          Accept: 'application/json, text/xml;q=0.9, text/html;q=0.8, */*;q=0.7',
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk.toString('utf8');
          if (body.length > 20_000) res.destroy();
        });
        res.on('end', () => resolve({ ok: true, status: res.statusCode ?? 0, headers: res.headers, body }));
        res.on('close', () => resolve({ ok: true, status: res.statusCode ?? 0, headers: res.headers, body }));
      },
    );
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (error) => resolve({ ok: false, error: error.message }));
    req.end();
  });
}

async function probeEndpoint({ ip, port, path: reqPath, timeout }) {
  const response = await httpRequest({ ip, port, path: reqPath, timeout });
  if (!response.ok) return { success: false, error: response.error };
  let json = null;
  try {
    json = JSON.parse(response.body);
  } catch { /* not JSON */ }
  const evidence = detectEvidence(response.headers, response.body, response.status);
  const deviceInfo = normaliseDeviceInfo(json) ?? parseGetIdXml(response.body) ?? null;
  return {
    success: Boolean(evidence || deviceInfo),
    status: response.status,
    deviceInfo,
    evidence,
    path: reqPath,
  };
}

async function probeHost(ip, ports, timeout) {
  let bestHit = null;
  for (const port of ports) {
    for (const reqPath of API_PATHS) {
      const result = await probeEndpoint({ ip, port, path: reqPath, timeout });
      if (result.success) {
        const hit = {
          ip,
          port,
          path: result.path,
          status: result.status,
          evidence: result.evidence ?? 'json-response',
          discoveredAt: new Date().toISOString(),
          deviceInfo: result.deviceInfo ?? null,
        };
        if (!bestHit) {
          bestHit = hit;
        } else {
          const score = (h) =>
            (h.deviceInfo?.serial ? 4 : 0) +
            (h.deviceInfo?.model ? 3 : 0) +
            (h.evidence?.startsWith('server:') ? 2 : 0) +
            (h.evidence === 'http:401-auth-required' ? 0 : 1);
          if (score(hit) > score(bestHit)) bestHit = hit;
        }
        if (bestHit.deviceInfo?.serial && bestHit.deviceInfo?.model) return bestHit;
        break;
      }
    }
  }
  return bestHit;
}

// ---------------------------------------------------------------------------
// Concurrency pool
// ---------------------------------------------------------------------------

async function runPool(tasks, limit, worker) {
  const results = [];
  let index = 0;
  async function next() {
    while (index < tasks.length) {
      const i = index++;
      results[i] = await worker(tasks[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, () => next()));
  return results;
}

function dedupePlayers(players) {
  const byIp = new Map();
  for (const player of players) {
    if (!player?.ip) continue;
    const existing = byIp.get(player.ip);
    if (!existing) {
      byIp.set(player.ip, player);
      continue;
    }
    const score = (p) =>
      (p.deviceInfo?.serial ? 3 : 0) + (p.deviceInfo?.model ? 2 : 0) + (p.port === 8008 ? 1 : 0);
    if (score(player) > score(existing)) byIp.set(player.ip, player);
  }
  return [...byIp.values()];
}

// ---------------------------------------------------------------------------
// Players.json registry operations
// ---------------------------------------------------------------------------

function loadPlayersFile() {
  if (!fs.existsSync(PLAYERS_FILE)) {
    return { players: [], default: null };
  }
  try {
    return JSON.parse(fs.readFileSync(PLAYERS_FILE, 'utf-8'));
  } catch {
    return { players: [], default: null };
  }
}

function savePlayersFile(config) {
  fs.mkdirSync(BRIGHTSIGN_DIR, { recursive: true });
  fs.writeFileSync(PLAYERS_FILE, JSON.stringify(config, null, 2) + '\n', 'utf-8');
}

function toKebabName(raw) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function validatePlayerName(name) {
  if (!name || typeof name !== 'string') throw new Error('Player name is required');
  if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) throw new Error(`Player name must be kebab-case: ${name}`);
}

function validateIp(ip) {
  if (!ip || typeof ip !== 'string') throw new Error('IP address is required');
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
    throw new Error(`Invalid IPv4 address: ${ip}`);
  }
}

function validatePort(port) {
  if (port === undefined || port === null) return 8008;
  const p = Number(port);
  if (!Number.isInteger(p) || p < 1 || p > 65535) throw new Error(`Invalid port: ${port}`);
  return p;
}

function mergeDiscoveredIntoRegistry(discovered) {
  const existing = loadPlayersFile();
  const existingByIp = new Map();
  for (const p of existing.players ?? []) {
    if (p.ip) existingByIp.set(p.ip, p);
  }

  const players = [];

  for (const d of discovered) {
    const prev = existingByIp.get(d.ip);
    const model = d.deviceInfo?.model ?? prev?.model ?? 'unknown';
    const serial = d.deviceInfo?.serial ?? prev?.serial ?? 'unknown';
    const tags = Array.from(new Set([...(prev?.tags ?? []).filter((t) => t !== 'offline'), 'discovered']));
    const existingName = prev?.name;
    const nameIsValid = existingName && /^[a-z0-9-]+$/.test(existingName);
    const name = nameIsValid ? existingName : toKebabName(d.deviceInfo?.name ?? `player-${d.ip.split('.').pop()}`);

    players.push({
      name,
      ip: d.ip,
      port: d.port,
      model,
      serial,
      ...(d.deviceInfo?.firmware && { firmware: d.deviceInfo.firmware }),
      ...(d.deviceInfo?.description && { description: d.deviceInfo.description }),
      tags,
    });
    existingByIp.delete(d.ip);
  }

  for (const prev of existingByIp.values()) {
    if (!prev.tags?.includes('offline')) {
      prev.tags = [...(prev.tags ?? []), 'offline'];
    }
    players.push(prev);
  }

  players.sort((a, b) => ipToInt(a.ip) - ipToInt(b.ip));

  const defaultPlayer =
    existing.default && players.some((p) => p.name === existing.default)
      ? existing.default
      : players[0]?.name ?? null;

  return { $schema: './players.schema.json', players, ...(defaultPlayer ? { default: defaultPlayer } : {}) };
}

// ---------------------------------------------------------------------------
// Tool implementations
// ---------------------------------------------------------------------------

async function toolDiscoverPlayers(args) {
  const cidr = args?.cidr ?? null;
  const timeout = args?.timeout ?? DEFAULT_TIMEOUT;
  const concurrency = args?.concurrency ?? DEFAULT_CONCURRENCY;
  const saveToRegistry = args?.save !== false;

  let targets = [];

  if (cidr) {
    targets = expandCIDR(cidr);
  } else {
    const localCidrs = [...new Set(getLocalCandidateCidrs().map(trimTo24))];
    if (localCidrs.length === 0) {
      return { content: [{ type: 'text', text: 'No private IPv4 interfaces found. Pass a cidr parameter.' }] };
    }
    for (const c of localCidrs) targets.push(...expandCIDR(c));
  }

  const results = await runPool(targets, concurrency, async (ip) => {
    return probeHost(ip, DEFAULT_PORTS, timeout);
  });

  const players = dedupePlayers(results.filter((item) => item != null));

  if (players.length === 0) {
    return {
      content: [{
        type: 'text',
        text: 'No BrightSign players found on the network. Ensure players are powered on, on the same subnet, and have Local DWS enabled.',
      }],
    };
  }

  if (saveToRegistry) {
    const merged = mergeDiscoveredIntoRegistry(players);
    savePlayersFile(merged);
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        found: players.length,
        players: players.map((p) => ({
          ip: p.ip,
          port: p.port,
          model: p.deviceInfo?.model ?? 'unknown',
          serial: p.deviceInfo?.serial ?? 'unknown',
          firmware: p.deviceInfo?.firmware ?? 'unknown',
          name: p.deviceInfo?.name ?? null,
          evidence: p.evidence,
        })),
        savedToRegistry: saveToRegistry,
        registryPath: PLAYERS_FILE,
      }, null, 2),
    }],
  };
}

async function toolProbePlayer(args) {
  const ip = args?.ip;
  if (!ip) return { content: [{ type: 'text', text: 'Error: ip parameter is required' }], isError: true };
  validateIp(ip);

  const port = validatePort(args?.port);
  const timeout = args?.timeout ?? DEFAULT_TIMEOUT;
  const ports = port ? [port] : DEFAULT_PORTS;

  const result = await probeHost(ip, ports, timeout);

  if (!result) {
    return {
      content: [{
        type: 'text',
        text: `No BrightSign player found at ${ip}. Ensure the player is powered on, on the same subnet, and has Local DWS enabled.`,
      }],
    };
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        reachable: true,
        ip: result.ip,
        port: result.port,
        evidence: result.evidence,
        deviceInfo: result.deviceInfo,
        discoveredAt: result.discoveredAt,
      }, null, 2),
    }],
  };
}

function redactPlayer(player) {
  const redacted = { ...player };
  if (redacted.password) redacted.password = '***';
  if (redacted.username) redacted.username = '***';
  return redacted;
}

function toolListPlayers() {
  const config = loadPlayersFile();
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        players: (config.players ?? []).map(redactPlayer),
        default: config.default ?? null,
        registryPath: PLAYERS_FILE,
      }, null, 2),
    }],
  };
}

function toolGetPlayer(args) {
  const name = args?.name;
  const config = loadPlayersFile();

  const targetName = name ?? config.default;
  if (!targetName) {
    return { content: [{ type: 'text', text: 'Error: no player name provided and no default player configured' }], isError: true };
  }

  const player = (config.players ?? []).find((p) => p.name === targetName);
  if (!player) {
    return { content: [{ type: 'text', text: `Error: player not found: ${targetName}` }], isError: true };
  }

  return { content: [{ type: 'text', text: JSON.stringify(redactPlayer(player), null, 2) }] };
}

function toolAddPlayer(args) {
  const name = args?.name;
  const ip = args?.ip;
  validatePlayerName(name);
  validateIp(ip);
  const port = validatePort(args?.port);

  const config = loadPlayersFile();
  const existingIndex = (config.players ?? []).findIndex((p) => p.name === name);

  const player = {
    name,
    ip,
    port,
    ...(args?.model && { model: String(args.model) }),
    ...(args?.serial && { serial: String(args.serial) }),
    ...(args?.description && { description: String(args.description) }),
    ...(args?.tags && { tags: Array.isArray(args.tags) ? args.tags : String(args.tags).split(',').map((t) => t.trim()) }),
  };

  if (existingIndex >= 0) {
    config.players[existingIndex] = player;
  } else {
    if (!config.players) config.players = [];
    config.players.push(player);
  }

  if (config.players.length === 1 || args?.setDefault) {
    config.default = name;
  }

  savePlayersFile(config);

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        action: existingIndex >= 0 ? 'updated' : 'added',
        player,
        isDefault: config.default === name,
      }, null, 2),
    }],
  };
}

function toolRemovePlayer(args) {
  const name = args?.name;
  if (!name) return { content: [{ type: 'text', text: 'Error: name parameter is required' }], isError: true };

  const config = loadPlayersFile();
  const before = (config.players ?? []).length;
  config.players = (config.players ?? []).filter((p) => p.name !== name);

  if (config.players.length === before) {
    return { content: [{ type: 'text', text: `Error: player not found: ${name}` }], isError: true };
  }

  if (config.default === name) {
    config.default = config.players[0]?.name ?? null;
  }

  savePlayersFile(config);

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({ action: 'removed', name, newDefault: config.default }, null, 2),
    }],
  };
}

async function toolGetDeviceInfo(args) {
  const ip = args?.ip;
  if (!ip) return { content: [{ type: 'text', text: 'Error: ip parameter is required' }], isError: true };
  validateIp(ip);
  const port = validatePort(args?.port ?? 8008);
  const timeout = args?.timeout ?? 3000;

  const response = await httpRequest({ ip, port, path: '/api/v1/info', timeout });
  if (!response.ok) {
    return { content: [{ type: 'text', text: `Error: could not reach player at ${ip}:${port} — ${response.error}` }], isError: true };
  }

  let json = null;
  try {
    json = JSON.parse(response.body);
  } catch { /* not JSON */ }

  const deviceInfo = normaliseDeviceInfo(json);
  if (!deviceInfo && !json) {
    return { content: [{ type: 'text', text: `Received response from ${ip}:${port} but could not parse device info. Status: ${response.status}` }] };
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        ip,
        port,
        status: response.status,
        deviceInfo: deviceInfo ?? json,
      }, null, 2),
    }],
  };
}

// ---------------------------------------------------------------------------
// Tool definitions (MCP schema)
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: 'brightsign_discover_players',
    description: 'Scan the local network for BrightSign players. Probes common ports (8008, 8080, 80, 443) on all IPs in a subnet and identifies BrightSign devices by their DWS fingerprint. Results are saved to .brightsign/players.json by default.',
    inputSchema: {
      type: 'object',
      properties: {
        cidr: { type: 'string', description: 'CIDR subnet to scan (e.g. 192.168.1.0/24). If omitted, auto-detects local private subnets. Only /24 to /32 supported.' },
        timeout: { type: 'number', description: 'Per-probe timeout in milliseconds (default: 1500)' },
        concurrency: { type: 'number', description: 'Number of parallel probes (default: 32)' },
        save: { type: 'boolean', description: 'Whether to save results to .brightsign/players.json (default: true)' },
      },
    },
  },
  {
    name: 'brightsign_probe_player',
    description: 'Check connectivity to a single BrightSign player by IP address. Returns device info (model, serial, firmware) if reachable.',
    inputSchema: {
      type: 'object',
      properties: {
        ip: { type: 'string', description: 'IPv4 address of the player to probe' },
        port: { type: 'number', description: 'DWS port to probe (default: tries 8008, 8080, 80, 443)' },
        timeout: { type: 'number', description: 'Probe timeout in milliseconds (default: 1500)' },
      },
      required: ['ip'],
    },
  },
  {
    name: 'brightsign_list_players',
    description: 'List all BrightSign players registered in .brightsign/players.json. Shows name, IP, port, model, serial, and tags for each player.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'brightsign_get_player',
    description: 'Get the configuration for a specific registered BrightSign player by name. If no name is provided, returns the default player.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Player name (kebab-case). If omitted, returns the default player.' },
      },
    },
  },
  {
    name: 'brightsign_add_player',
    description: 'Register a BrightSign player in .brightsign/players.json. If a player with the same name exists, it will be updated.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Player name in kebab-case (e.g. dev-player, lobby-screen)' },
        ip: { type: 'string', description: 'IPv4 address of the player' },
        port: { type: 'number', description: 'DWS port (default: 8008)' },
        model: { type: 'string', description: 'BrightSign model (e.g. CL435, XD1035)' },
        serial: { type: 'string', description: 'Device serial number' },
        description: { type: 'string', description: 'Human-readable description' },
        tags: { type: 'string', description: 'Comma-separated tags (e.g. dev,office,lobby)' },
        setDefault: { type: 'boolean', description: 'Set this player as the default (default: false, auto-set if first player)' },
      },
      required: ['name', 'ip'],
    },
  },
  {
    name: 'brightsign_remove_player',
    description: 'Remove a BrightSign player from .brightsign/players.json by name.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Player name to remove' },
      },
      required: ['name'],
    },
  },
  {
    name: 'brightsign_get_device_info',
    description: 'Fetch live device information from a BrightSign player via its DWS API (/api/v1/info). Returns model, serial, firmware version, and other device details.',
    inputSchema: {
      type: 'object',
      properties: {
        ip: { type: 'string', description: 'IPv4 address of the player' },
        port: { type: 'number', description: 'DWS port (default: 8008)' },
        timeout: { type: 'number', description: 'Request timeout in milliseconds (default: 3000)' },
      },
      required: ['ip'],
    },
  },
];

// ---------------------------------------------------------------------------
// MCP JSON-RPC 2.0 stdio transport
// ---------------------------------------------------------------------------

function makeResponse(id, result) {
  return { jsonrpc: '2.0', id, result };
}

function makeError(id, code, message) {
  return { jsonrpc: '2.0', id, error: { code, message } };
}

async function handleRequest(msg) {
  const { id, method, params } = msg;

  switch (method) {
    case 'initialize':
      return makeResponse(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
      });

    case 'notifications/initialized':
      return null; // no response for notifications

    case 'tools/list':
      return makeResponse(id, { tools: TOOLS });

    case 'tools/call': {
      const toolName = params?.name;
      const args = params?.arguments ?? {};
      try {
        let result;
        switch (toolName) {
          case 'brightsign_discover_players':
            result = await toolDiscoverPlayers(args);
            break;
          case 'brightsign_probe_player':
            result = await toolProbePlayer(args);
            break;
          case 'brightsign_list_players':
            result = toolListPlayers();
            break;
          case 'brightsign_get_player':
            result = toolGetPlayer(args);
            break;
          case 'brightsign_add_player':
            result = toolAddPlayer(args);
            break;
          case 'brightsign_remove_player':
            result = toolRemovePlayer(args);
            break;
          case 'brightsign_get_device_info':
            result = await toolGetDeviceInfo(args);
            break;
          default:
            return makeError(id, -32601, `Unknown tool: ${toolName}`);
        }
        return makeResponse(id, result);
      } catch (err) {
        return makeResponse(id, {
          content: [{ type: 'text', text: `Error: ${err instanceof Error ? err.message : String(err)}` }],
          isError: true,
        });
      }
    }

    case 'ping':
      return makeResponse(id, {});

    default:
      if (method?.startsWith('notifications/')) return null;
      return makeError(id, -32601, `Method not found: ${method}`);
  }
}

// ---------------------------------------------------------------------------
// stdio transport
// ---------------------------------------------------------------------------

function send(obj) {
  const json = JSON.stringify(obj);
  process.stdout.write(json + '\n');
}

const rl = createInterface({ input: process.stdin, terminal: false });

rl.on('line', async (line) => {
  if (!line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    send(makeError(null, -32700, 'Parse error'));
    return;
  }
  const response = await handleRequest(msg);
  if (response) send(response);
});

rl.on('close', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
