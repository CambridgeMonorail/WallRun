#!/usr/bin/env node

/**
 * BrightSign Player Discovery Tool
 * 
 * Usage:
 *   pnpm discover              # Interactive mode
 *   pnpm discover:scan         # Quick scan with defaults
 *   pnpm discover:probe <ip>   # Probe specific player
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scanSubnet, probePlayer, parseCIDR } from './scanner.mjs';
import { prompt, ProgressSpinner, formatPlayersTable, formatPlayerInfo } from './cli.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../..');
const outputDir = path.join(rootDir, 'dist');
const outputFile = path.join(outputDir, 'players.json');

/**
 * Interactive discovery mode
 */
async function interactiveDiscover() {
  console.log('\n🔍 BrightSign Player Discovery\n');
  
  // Get subnet from user
  const cidr = await prompt('Which subnet should I scan?', '192.168.0.0/24');
  
  // Validate CIDR
  try {
    parseCIDR(cidr);
  } catch (err) {
    console.error(`\n❌ Invalid CIDR notation: ${err.message}`);
    process.exit(1);
  }
  
  // Get scan mode
  const mode = await prompt('Scan mode? [fast/thorough]', 'fast');
  const ports = mode === 'thorough' ? [80, 443, 8008, 8080] : [80, 8080];
  
  console.log('');
  const spinner = new ProgressSpinner(`Scanning ${cidr}...`);
  spinner.start();
  
  const discovered = await scanSubnet({
    cidr,
    ports,
    timeout: 2000,
    parallel: 20,
    onProgress: ({ total, completed, found }) => {
      spinner.update(
        `Scanning ${cidr}... ${completed}/${total} (found: ${found})`
      );
    },
  });
  
  if (discovered.length > 0) {
    spinner.succeed(`Found ${discovered.length} BrightSign player(s)`);
    console.log('\n' + formatPlayersTable(discovered) + '\n');
    
    // Save results
    ensureDir(outputDir);
    fs.writeFileSync(outputFile, JSON.stringify(discovered, null, 2));
    console.log(`💾 Wrote ${outputFile}\n`);
    
    // Optionally enrich with device info
    const enrich = await prompt('Fetch device info from players? [y/N]', 'n');
    if (enrich.toLowerCase() === 'y') {
      await enrichPlayers(discovered);
    }
  } else {
    spinner.fail('No BrightSign players found');
    console.log('\n💡 Troubleshooting:');
    console.log('   - Are you on the same network as the players?');
    console.log('   - Is Local Diagnostic Web Server enabled?');
    console.log('   - Are the players powered on?\n');
  }
}

/**
 * Non-interactive scan mode
 */
async function scanMode(args) {
  const cidr = args.cidr || args._[1] || '192.168.0.0/24';
  const ports = args.thorough ? [80, 443, 8008, 8080] : [80, 8080];
  
  console.log(`Scanning ${cidr}...`);
  
  const discovered = await scanSubnet({
    cidr,
    ports,
    timeout: 2000,
    parallel: 20,
  });
  
  if (discovered.length > 0) {
    console.log(`\n✔ Found ${discovered.length} player(s)\n`);
    console.log(formatPlayersTable(discovered));
    
    ensureDir(outputDir);
    fs.writeFileSync(outputFile, JSON.stringify(discovered, null, 2));
    console.log(`\n💾 ${outputFile}`);
  } else {
    console.log('\n✖ No players found');
    process.exit(1);
  }
}

/**
 * Probe a specific player
 */
async function probeMode(args) {
  const ip = args.ip || args._[1];
  const port = parseInt(args.port || 8008, 10);
  
  if (!ip) {
    console.error('❌ Usage: pnpm discover:probe <ip> [--port 8008]');
    process.exit(1);
  }
  
  console.log(`Probing ${ip}:${port}...`);
  
  const info = await probePlayer(ip, port);
  
  if (info) {
    console.log('\n✔ Player found\n');
    console.log(formatPlayerInfo(info));
  } else {
    console.log('\n✖ No player info available');
    console.log('   Try different ports: --port 80 or --port 8080');
    process.exit(1);
  }
}

/**
 * Enrich discovered players with device info
 */
async function enrichPlayers(players) {
  console.log('\nFetching device info...');
  
  for (const player of players) {
    const info = await probePlayer(player.ip, player.port);
    if (info) {
      player.deviceInfo = info.info;
      console.log(`✔ ${player.ip} - ${info.info.model || 'unknown'}`);
    } else {
      console.log(`✖ ${player.ip} - no device info`);
    }
  }
  
  // Save enriched results
  fs.writeFileSync(outputFile, JSON.stringify(players, null, 2));
  console.log(`\n💾 Updated ${outputFile}\n`);
}

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Parse command-line arguments
 */
function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      if (value !== undefined) {
        args[key] = value;
      } else {
        // Check if next arg is a value (not a flag)
        const nextArg = argv[i + 1];
        if (nextArg && !nextArg.startsWith('-')) {
          args[key] = nextArg;
          i++; // Skip next arg
        } else {
          args[key] = true;
        }
      }
    } else {
      args._.push(arg);
    }
  }
  return args;
}

/**
 * Main entry point
 */
async function main() {
  const args = parseArgs(process.argv);
  const command = args._[0];
  
  try {
    if (command === 'scan') {
      await scanMode(args);
    } else if (command === 'probe') {
      await probeMode(args);
    } else if (command === 'help' || args.help) {
      showHelp();
    } else {
      // Interactive mode by default
      await interactiveDiscover();
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

/**
 * Show help text
 */
function showHelp() {
  console.log(`
BrightSign Player Discovery Tool

Usage:
  pnpm discover                           Interactive discovery
  pnpm discover:scan [--cidr 192.168.0.0/24] [--thorough]
                                          Non-interactive scan
  pnpm discover:probe <ip> [--port 8008] Probe specific player

Options:
  --cidr       Subnet to scan (default: 192.168.0.0/24)
  --thorough   Scan more ports (80, 443, 8008, 8080)
  --port       Port to probe (default: 8008)
  --help       Show this help

Output:
  dist/players.json    Discovered players (gitignored)

Limitations:
  - Players must be on same network/VLAN
  - Local Diagnostic Web Server must be enabled
  - Firewalls may block discovery
  - Best effort only, not exhaustive

Examples:
  pnpm discover
  pnpm discover:scan --cidr 10.0.1.0/24 --thorough
  pnpm discover:probe 192.168.0.51 --port 8080
`);
}

main();
