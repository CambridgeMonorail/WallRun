#!/usr/bin/env node

/**
 * BrightSign Player Management CLI
 * Manages local player configurations for deployment
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const BRIGHTSIGN_DIR = resolve(ROOT_DIR, '.brightsign');
const PLAYERS_FILE = resolve(BRIGHTSIGN_DIR, 'players.json');
const EXAMPLE_FILE = resolve(BRIGHTSIGN_DIR, 'players.example.json');

/**
 * Load players configuration
 */
async function loadPlayers() {
  if (!existsSync(PLAYERS_FILE)) {
    console.log('⚠️  No players.json found. Creating from example...');
    await ensurePlayersFile();
  }

  const content = await readFile(PLAYERS_FILE, 'utf-8');
  return JSON.parse(content);
}

/**
 * Save players configuration
 */
async function savePlayers(config) {
  await mkdir(BRIGHTSIGN_DIR, { recursive: true });
  await writeFile(PLAYERS_FILE, JSON.stringify(config, null, 2) + '\n', 'utf-8');
}

/**
 * Ensure players.json exists (copy from example if not)
 */
async function ensurePlayersFile() {
  if (!existsSync(PLAYERS_FILE) && existsSync(EXAMPLE_FILE)) {
    const example = await readFile(EXAMPLE_FILE, 'utf-8');
    await mkdir(BRIGHTSIGN_DIR, { recursive: true });
    await writeFile(PLAYERS_FILE, example, 'utf-8');
    console.log('✓ Created .brightsign/players.json from example');
    console.log('  Edit this file to add your player IP addresses\n');
  }
}

/**
 * List all configured players
 */
async function listPlayers() {
  const config = await loadPlayers();
  
  console.log('\n📺 Configured BrightSign Players:\n');
  
  if (!config.players || config.players.length === 0) {
    console.log('  No players configured yet.');
    console.log('  Run: pnpm player add [name] [ip]\n');
    return;
  }

  for (const player of config.players) {
    const isDefault = player.name === config.default ? ' (default)' : '';
    console.log(`  • ${player.name}${isDefault}`);
    console.log(`    IP: ${player.ip}:${player.port || 8008}`);
    if (player.model) console.log(`    Model: ${player.model}`);
    if (player.serial) console.log(`    Serial: ${player.serial}`);
    if (player.description) console.log(`    ${player.description}`);
    if (player.tags?.length) console.log(`    Tags: ${player.tags.join(', ')}`);
    console.log('');
  }
}

/**
 * Add a new player configuration
 */
async function addPlayer(name, ip, options = {}) {
  const config = await loadPlayers();
  
  // Check if player already exists
  const existingIndex = config.players.findIndex(p => p.name === name);
  
  const player = {
    name,
    ip,
    port: options.port || 8008,
    ...(options.model && { model: options.model }),
    ...(options.serial && { serial: options.serial }),
    ...(options.description && { description: options.description }),
    ...(options.tags && { tags: options.tags.split(',').map(t => t.trim()) }),
  };

  if (existingIndex >= 0) {
    config.players[existingIndex] = player;
    console.log(`✓ Updated player: ${name}`);
  } else {
    config.players.push(player);
    console.log(`✓ Added player: ${name}`);
  }

  // Set as default if it's the first player or --default flag is set
  if (config.players.length === 1 || options.default) {
    config.default = name;
    console.log(`✓ Set as default player`);
  }

  await savePlayers(config);
}

/**
 * Remove a player configuration
 */
async function removePlayer(name) {
  const config = await loadPlayers();
  const initialLength = config.players.length;
  
  config.players = config.players.filter(p => p.name !== name);
  
  if (config.players.length === initialLength) {
    console.log(`❌ Player not found: ${name}`);
    return;
  }

  // Update default if we removed it
  if (config.default === name) {
    config.default = config.players[0]?.name || null;
    if (config.default) {
      console.log(`✓ Default player changed to: ${config.default}`);
    }
  }

  await savePlayers(config);
  console.log(`✓ Removed player: ${name}`);
}

/**
 * Set default player
 */
async function setDefault(name) {
  const config = await loadPlayers();
  
  const player = config.players.find(p => p.name === name);
  if (!player) {
    console.log(`❌ Player not found: ${name}`);
    return;
  }

  config.default = name;
  await savePlayers(config);
  console.log(`✓ Default player set to: ${name}`);
}

/**
 * Get player configuration by name or default
 */
async function getPlayer(name) {
  const config = await loadPlayers();
  
  if (!name) {
    name = config.default;
    if (!name) {
      throw new Error('No default player configured. Use --player or set a default.');
    }
  }

  const player = config.players.find(p => p.name === name);
  if (!player) {
    throw new Error(`Player not found: ${name}`);
  }

  return player;
}

/**
 * CLI Interface
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    await ensurePlayersFile();

    switch (command) {
      case 'list':
      case 'ls':
        await listPlayers();
        break;

      case 'add': {
        const [_, name, ip] = args;
        if (!name || !ip) {
          console.log('Usage: pnpm player add <name> <ip> [--port 8008] [--model X] [--serial X] [--description "X"] [--tags "dev,test"] [--default]');
          process.exit(1);
        }
        
        const options = {};
        for (let i = 3; i < args.length; i += 2) {
          const key = args[i].replace('--', '');
          const value = args[i + 1];
          options[key] = value;
        }
        options.default = args.includes('--default');
        
        await addPlayer(name, ip, options);
        break;
      }

      case 'remove':
      case 'rm': {
        const [_, name] = args;
        if (!name) {
          console.log('Usage: pnpm player remove <name>');
          process.exit(1);
        }
        await removePlayer(name);
        break;
      }

      case 'default': {
        const [_, name] = args;
        if (!name) {
          console.log('Usage: pnpm player default <name>');
          process.exit(1);
        }
        await setDefault(name);
        break;
      }

      case 'get': {
        const [_, name] = args;
        const player = await getPlayer(name);
        console.log(JSON.stringify(player, null, 2));
        break;
      }

      default:
        console.log(`
BrightSign Player Management

Usage:
  pnpm player list                    List all configured players
  pnpm player add <name> <ip>         Add a new player
  pnpm player remove <name>           Remove a player
  pnpm player default <name>          Set default player
  pnpm player get [name]              Get player config (JSON)

Options for 'add':
  --port <port>                       DWS port (default: 8008)
  --model <model>                     Player model (e.g., CL435)
  --serial <serial>                   Player serial number
  --description "text"                Human-readable description
  --tags "tag1,tag2"                  Comma-separated tags
  --default                           Set as default player

Examples:
  pnpm player add dev-player 192.168.1.50 --model CL435 --default
  pnpm player add test-player 192.168.1.51 --tags "test,lab"
  pnpm player list
  pnpm player default dev-player
        `);
        break;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Export for use in other scripts
export { loadPlayers, getPlayer, ensurePlayersFile };

// Run CLI if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
