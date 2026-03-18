#!/usr/bin/env node

/**
 * BrightSign Player Discovery
 *
 * Single tool for finding BrightSign players on the local network and
 * writing the results to .brightsign/players.json in the correct schema.
 *
 * Commands:
 *   pnpm discover                                # scan local subnets, update .brightsign/players.json
 *   pnpm discover --cidr 192.168.0.0/24          # scan explicit subnet
 *   pnpm discover --host 192.168.0.42            # probe a single player
 *   pnpm discover --json                         # output raw JSON to stdout (no file write)
 *   pnpm discover --verbose                      # show failure details for debugging
 */

import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import { argv, exit } from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '../../..');
const PLAYERS_FILE = path.join(ROOT_DIR, '.brightsign', 'players.json');

const DEFAULT_PORTS = [8008, 8080, 80, 443];
const DEFAULT_TIMEOUT = 1500;
const DEFAULT_CONCURRENCY = 32;

/** Endpoints probed in order — BrightSign-specific first, generic last. */
const API_PATHS = ['/api/v1/info', '/GetDeviceInfo', '/GetID', '/info', '/'];

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs(rawArgs) {
  const args = {
    cidr: null,
    host: null,
    ports: DEFAULT_PORTS,
    timeout: DEFAULT_TIMEOUT,
    concurrency: DEFAULT_CONCURRENCY,
    verbose: false,
    json: false,
    output: null,
  };

  for (let i = 2; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];

    if (arg === '--cidr') {
      args.cidr = rawArgs[++i];
    } else if (arg === '--host') {
      args.host = rawArgs[++i];
    } else if (arg === '--ports') {
      args.ports = rawArgs[++i]
        .split(',')
        .map((v) => Number.parseInt(v.trim(), 10))
        .filter(Boolean);
    } else if (arg === '--timeout') {
      args.timeout = Number.parseInt(rawArgs[++i], 10);
    } else if (arg === '--concurrency') {
      args.concurrency = Number.parseInt(rawArgs[++i], 10);
    } else if (arg === '--verbose') {
      args.verbose = true;
    } else if (arg === '--json') {
      args.json = true;
    } else if (arg === '--output') {
      args.output = rawArgs[++i];
    } else if (arg === 'help' || arg === '--help') {
      showHelp();
      exit(0);
    }
  }

  return args;
}

function showHelp() {
  console.log(`
BrightSign Player Discovery

Scans the local network for BrightSign players and writes results
to .brightsign/players.json so deployment scripts can use them.

Usage:
  pnpm discover                         Scan local subnets, update players.json
  pnpm discover --cidr 192.168.0.0/24   Scan specific subnet
  pnpm discover --host 192.168.0.42     Probe a single player
  pnpm discover --json                  Output raw JSON to stdout (no file write)
  pnpm discover --verbose               Show failure details for debugging
  pnpm discover help                    Show this help

Options:
  --cidr <subnet>       CIDR range to scan (default: auto-detect local subnets)
  --host <ip>           Probe a single IP instead of scanning
  --ports <list>        Comma-separated ports (default: 8008,8080,80,443)
  --timeout <ms>        Probe timeout in ms (default: 1500)
  --concurrency <n>     Parallel probes (default: 32)
  --output <path>       Override output file path
  --json                Print JSON to stdout instead of writing file
  --verbose             Show per-host failure details when debugging
`);
}

// ---------------------------------------------------------------------------
// IP / CIDR utilities
// ---------------------------------------------------------------------------

function ipToInt(ip) {
  const parts = ip.split('.').map(Number);
  if (
    parts.length !== 4 ||
    parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)
  ) {
    throw new Error(`Invalid IPv4 address: ${ip}`);
  }
  return (
    (((parts[0] << 24) >>> 0) +
      ((parts[1] << 16) >>> 0) +
      ((parts[2] << 8) >>> 0) +
      (parts[3] >>> 0)) >>>
    0
  );
}

function intToIp(value) {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255,
  ].join('.');
}

function expandCIDR(cidr) {
  const [baseIp, prefixString] = cidr.split('/');
  const prefix = Number.parseInt(prefixString, 10);

  if (!baseIp || Number.isNaN(prefix) || prefix < 1 || prefix > 32) {
    throw new Error(`Invalid CIDR: ${cidr}`);
  }
  if (prefix < 24) {
    throw new Error(
      `Only /24 to /32 subnets supported for safety (got /${prefix})`,
    );
  }

  const base = ipToInt(baseIp);
  const mask = (0xffffffff << (32 - prefix)) >>> 0;
  const network = base & mask;
  const hostCount = 2 ** (32 - prefix);
  const ips = [];
  for (let i = 0; i < hostCount; i += 1) {
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

      const ip = ipToInt(entry.address);
      const mask = ipToInt(entry.netmask);
      const network = ip & mask;

      const prefix = entry.netmask
        .split('.')
        .map((o) => Number(o).toString(2).padStart(8, '0'))
        .join('')
        .split('')
        .filter((b) => b === '1').length;

      // Only private ranges
      if (
        entry.address.startsWith('10.') ||
        entry.address.startsWith('192.168.') ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(entry.address)
      ) {
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
// BrightSign fingerprinting
// ---------------------------------------------------------------------------

function detectEvidence(headers, bodyText, status) {
  const server = String(headers?.server ?? '').toLowerCase();
  const body = String(bodyText ?? '').toLowerCase();

  if (server.includes('brightsign')) {
    return `server:${headers.server}`;
  }
  if (body.includes('diagnostic web server')) {
    return 'body:diagnostic-web-server';
  }
  if (body.includes('brightsign')) {
    return 'body:brightsign';
  }
  // Classic DWS markers (older firmware without "brightsign" in body)
  if (
    body.includes('bsp.js') ||
    body.includes('getuservars') ||
    body.includes('/setvalues')
  ) {
    return 'body:dws-classic';
  }
  // BrightSign XML identity response from /GetID
  if (body.includes('<brightsignid>')) {
    return 'body:brightsign-xml-id';
  }
  if (body.includes('/api/v1/') || body.includes('getdeviceinfo')) {
    return 'body:api-endpoint-marker';
  }
  if (
    body.includes('"fwversion"') ||
    body.includes('"serial"') ||
    body.includes('"model"') ||
    body.includes('"isplayer":true')
  ) {
    return 'body:device-json-marker';
  }
  // 401 on a BrightSign port is likely a password-protected DWS
  if (status === 401) {
    return 'http:401-auth-required';
  }
  return null;
}

/**
 * Parse BrightSign /GetID XML response into structured data.
 * Uses simple string extraction — no XML parser needed.
 */
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
    autorunVersion: tag('autorunVersion'),
  };
}

/**
 * Extract device info from a JSON API response.
 */
function normaliseDeviceInfo(data) {
  if (!data || typeof data !== 'object') return null;

  // Handle nested { data: { result: { ... } } } shape from /api/v1/info
  const root = data?.data?.result ?? data?.result ?? data;

  const lookup = (keys) => {
    for (const key of keys) {
      if (root[key] != null && root[key] !== '') return String(root[key]);
    }
    return null;
  };

  const name =
    lookup(['name', 'unitName', 'hostname']) ??
    root?.networking?.result?.name ??
    null;
  const description =
    lookup(['description']) ??
    root?.networking?.result?.description?.trim() ??
    null;

  const deviceInfo = {
    model: lookup(['model', 'modelName', 'model_number', 'hwFamily']),
    serial: lookup(['serial', 'serialNumber', 'unitSerial']),
    firmware: lookup([
      'fwversion',
      'FWVersion',
      'firmware',
      'firmwareVersion',
      'osVersion',
    ]),
    name,
    description,
  };

  return deviceInfo.model || deviceInfo.serial || deviceInfo.firmware || deviceInfo.name || deviceInfo.description
    ? deviceInfo
    : null;
}

// ---------------------------------------------------------------------------
// HTTP probing
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
          'User-Agent': 'TheSignAge-PlayerDiscovery/2.0',
          Accept: 'application/json, text/xml;q=0.9, text/html;q=0.8, */*;q=0.7',
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk.toString('utf8');
          if (body.length > 20_000) res.destroy();
        });
        res.on('end', () =>
          resolve({ ok: true, status: res.statusCode ?? 0, headers: res.headers, body }),
        );
        res.on('close', () =>
          resolve({ ok: true, status: res.statusCode ?? 0, headers: res.headers, body }),
        );
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
  } catch {
    /* not JSON */
  }

  const evidence = detectEvidence(
    response.headers,
    response.body,
    response.status,
  );
  const deviceInfo = normaliseDeviceInfo(json) ?? parseGetIdXml(response.body) ?? null;

  return {
    success: Boolean(evidence || deviceInfo),
    status: response.status,
    headers: response.headers,
    body: response.body,
    json,
    deviceInfo,
    evidence,
    path: reqPath,
  };
}

async function probeHost(ip, ports, timeout, verbose = false) {
  const failures = [];
  let bestHit = null;

  for (const port of ports) {
    for (const reqPath of API_PATHS) {
      const result = await probeEndpoint({ ip, port, path: reqPath, timeout });

      if (result.success) {
        // Extract device info from JSON or /GetID XML
        const deviceInfo = result.deviceInfo ?? null;

        const hit = {
          ip,
          port,
          path: result.path,
          status: result.status,
          evidence: result.evidence ?? 'json-response',
          discoveredAt: new Date().toISOString(),
          deviceInfo,
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

        // Got full device identity — no need to keep probing
        if (bestHit.deviceInfo?.serial && bestHit.deviceInfo?.model) {
          return bestHit;
        }
        // Found evidence on this port — try next port
        break;
      }

      if (verbose && result.error) {
        failures.push({ port, path: reqPath, error: result.error });
      }
    }
  }

  if (bestHit) return bestHit;
  return verbose ? { ip, found: false, failures } : null;
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
      results[i] = await worker(tasks[i], i);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, () => next()),
  );
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
      (p.deviceInfo?.serial ? 3 : 0) +
      (p.deviceInfo?.model ? 2 : 0) +
      (p.port === 8008 ? 1 : 0);
    if (score(player) > score(existing)) byIp.set(player.ip, player);
  }
  return [...byIp.values()];
}

// ---------------------------------------------------------------------------
// .brightsign/players.json integration
// ---------------------------------------------------------------------------

/**
 * Convert raw scan results into the .brightsign/players.json schema,
 * merging with any existing entries (preserving user-set tags, descriptions).
 */
function mergeIntoPlayersJson(discovered, existingPath) {
  let existing = { players: [], default: null };

  if (fs.existsSync(existingPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingPath, 'utf-8'));
    } catch {
      /* start fresh if corrupt */
    }
  }

  // Index existing players by IP for merge
  const existingByIp = new Map();
  for (const p of existing.players ?? []) {
    if (p.ip) existingByIp.set(p.ip, p);
  }

  const players = [];

  for (const d of discovered) {
    const prev = existingByIp.get(d.ip);
    const model = d.deviceInfo?.model ?? prev?.model ?? 'unknown';
    const serial = d.deviceInfo?.serial ?? prev?.serial ?? 'unknown';
    const tags = Array.from(
      new Set([...(prev?.tags ?? []).filter((tag) => tag !== 'offline'), 'discovered'])
    );

    // Schema requires name matching ^[a-z0-9-]+$
    const existingName = prev?.name;
    const nameIsValid = existingName && /^[a-z0-9-]+$/.test(existingName);
    const name = nameIsValid
      ? existingName
      : toKebabName(d.deviceInfo?.name ?? prev?.name ?? `player-${lastOctet(d.ip)}`);

    players.push({
      name,
      ip: d.ip,
      port: d.port,
      model,
      serial,
      firmware: d.deviceInfo?.firmware ?? prev?.firmware ?? undefined,
      description:
        d.deviceInfo?.description ?? prev?.description ?? undefined,
      tags,
    });

    existingByIp.delete(d.ip);
  }

  // Keep existing entries that were not re-discovered (offline players)
  for (const prev of existingByIp.values()) {
    if (!prev.tags?.includes('offline')) {
      prev.tags = [...(prev.tags ?? []), 'offline'];
    }
    // Normalize name to match schema pattern
    if (prev.name && !/^[a-z0-9-]+$/.test(prev.name)) {
      prev.name = toKebabName(prev.name);
    }
    players.push(prev);
  }

  // Sort by IP for stable output
  players.sort((a, b) => ipToInt(a.ip) - ipToInt(b.ip));

  const existingDefault = existing.default;
  const normalizedDefault = existingDefault && !/^[a-z0-9-]+$/.test(existingDefault)
    ? toKebabName(existingDefault)
    : existingDefault;
  const defaultPlayer =
    normalizedDefault && players.some((p) => p.name === normalizedDefault)
      ? normalizedDefault
      : players[0]?.name ?? null;

  return {
    $schema: './players.schema.json',
    players,
    ...(defaultPlayer ? { default: defaultPlayer } : {}),
  };
}

function toKebabName(raw) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function lastOctet(ip) {
  return ip.split('.').pop();
}

function writePlayersJson(data, filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

// ---------------------------------------------------------------------------
// Output formatting
// ---------------------------------------------------------------------------

function printTable(players) {
  if (players.length === 0) return;

  const rows = players.map((p) => ({
    ip: `${p.ip}:${p.port}`,
    model: p.deviceInfo?.model ?? '?',
    serial: p.deviceInfo?.serial ?? '?',
    firmware: p.deviceInfo?.firmware ?? '?',
    name: p.deviceInfo?.name ?? p.deviceInfo?.description ?? '',
    evidence: p.evidence,
  }));

  const cols = ['ip', 'model', 'serial', 'firmware', 'name'];
  const widths = {};
  for (const col of cols) {
    widths[col] = Math.max(
      col.length,
      ...rows.map((r) => String(r[col] ?? '').length),
    );
  }

  const header = cols.map((c) => c.toUpperCase().padEnd(widths[c])).join('  ');
  const divider = cols.map((c) => '-'.repeat(widths[c])).join('  ');
  const body = rows
    .map((r) => cols.map((c) => String(r[c] ?? '').padEnd(widths[c])).join('  '))
    .join('\n');

  console.log(`\n${header}\n${divider}\n${body}\n`);
}

function printFailures(results) {
  const failures = results
    .filter((item) => item?.found === false)
    .slice(0, 5);
  if (failures.length === 0) return;

  console.log('Sample connection failures:');
  for (const f of failures) {
    console.log(`  ${f.ip}`);
    for (const d of f.failures.slice(0, 3)) {
      console.log(`    ${d.port}${d.path}: ${d.error}`);
    }
  }
  console.log('');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(argv);
  const outputPath = args.output
    ? path.resolve(ROOT_DIR, args.output)
    : PLAYERS_FILE;

  // Determine scan targets
  let targets = [];

  if (args.host) {
    targets = [args.host];
  } else if (args.cidr) {
    targets = expandCIDR(args.cidr);
  } else {
    const localCidrs = [...new Set(getLocalCandidateCidrs().map(trimTo24))];
    if (localCidrs.length === 0) {
      console.error(
        'No private IPv4 interfaces found. Pass --cidr or --host.',
      );
      exit(1);
    }
    for (const cidr of localCidrs) targets.push(...expandCIDR(cidr));
    console.error(`Auto-detected subnets: ${localCidrs.join(', ')}`);
  }

  console.error(`Scanning ${targets.length} host(s) on ports ${args.ports.join(', ')}...`);

  // Scan
  let scanned = 0;
  let found = 0;

  const results = await runPool(targets, args.concurrency, async (ip) => {
    const result = await probeHost(ip, args.ports, args.timeout, args.verbose);
    scanned += 1;
    if (result && result.found !== false) found += 1;
    if (scanned % 25 === 0 || scanned === targets.length) {
      console.error(`  ${scanned}/${targets.length} scanned, ${found} found`);
    }
    return result;
  });

  const players = dedupePlayers(
    results.filter((item) => item && item.found !== false),
  );

  // No results
  if (players.length === 0) {
    console.log('\nNo BrightSign players found.\n');
    if (args.verbose) printFailures(results);
    console.log('Troubleshooting:');
    console.log('  - Are the players powered on and on the same network?');
    console.log('  - Is Local DWS enabled on the players?');
    console.log('  - Try: pnpm discover --host <known-ip> --verbose');
    console.log('');
    exit(1);
  }

  // JSON-only mode: print and exit (no file write)
  if (args.json) {
    console.log(JSON.stringify(players, null, 2));
    return;
  }

  // Print human-readable summary
  console.log(`\nFound ${players.length} BrightSign player(s)`);
  printTable(players);

  if (args.verbose) printFailures(results);

  // Write .brightsign/players.json
  const merged = mergeIntoPlayersJson(players, outputPath);
  writePlayersJson(merged, outputPath);

  const relPath = path.relative(ROOT_DIR, outputPath);
  console.log(`Updated ${relPath} (${merged.players.length} player(s))`);
  if (merged.default) console.log(`Default player: ${merged.default}`);
  console.log('');
}

main().catch((error) => {
  console.error(error);
  exit(1);
});
