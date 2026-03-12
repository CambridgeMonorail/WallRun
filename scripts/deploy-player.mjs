#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAppNameFromArgs } from './player-app-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

function printUsage() {
  console.log(`
Usage:
  pnpm deploy:player -- --app <player-app-name> [--player <configured-player-name>]

Options:
  --app     Optional. Player app to package and deploy. Defaults to player-minimal.
  --player  Optional. Named player from .brightsign/players.json.
  --help    Show this help message.
`);
}

function getPlayerArgs(argv) {
  const playerIndex = argv.indexOf('--player');

  if (playerIndex === -1) {
    return [];
  }

  const playerName = argv[playerIndex + 1];
  if (!playerName) {
    throw new Error('Missing player name after --player');
  }

  return ['--player', playerName];
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }

  const appName = getAppNameFromArgs(args);
  const playerArgs = getPlayerArgs(args);

  execSync(`node scripts/package-player.mjs --app ${appName}`, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  });

  const deployArgs = [
    'scripts/deploy-local.mjs',
    '--app',
    appName,
    ...playerArgs,
  ]
    .map((arg) => (arg.includes(' ') ? `"${arg}"` : arg))
    .join(' ');

  execSync(`node ${deployArgs}`, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  });
}

main();
