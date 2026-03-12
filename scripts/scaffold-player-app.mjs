#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const PNPM_CLI = join(ROOT_DIR, 'node_modules', 'pnpm', 'bin', 'pnpm.cjs');

function printUsage() {
  console.log(`
Usage:
  pnpm scaffold:player --name <app-name> [--port <4200-4299>] [--display-orientation <value>] [--no-status-page]

Options:
  --name            Required. New Nx app name, for example: player-menu-board
  --port            Optional. Explicit dev/preview port. Auto-selects next free 42xx port when omitted.
  --display-orientation Optional. One of landscape, portrait-left, portrait-right, inverted.
  --no-status-page  Optional. Removes src/app/StatusPage.tsx from the generated app.
  --force           Optional. Recreate the target app directory if it already exists.
`);
}

function parseArgs(argv) {
  const options = {
    displayOrientation: undefined,
    force: false,
    noStatusPage: false,
    port: undefined,
    name: undefined,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    switch (arg) {
      case '--name':
        options.name = argv[index + 1];
        index += 1;
        break;

      case '--port':
        options.port = argv[index + 1];
        index += 1;
        break;

      case '--display-orientation':
        options.displayOrientation = argv[index + 1];
        index += 1;
        break;

      case '--no-status-page':
        options.noStatusPage = true;
        break;

      case '--force':
        options.force = true;
        break;

      case '--help':
      case '-h':
        printUsage();
        process.exit(0);
        break;

      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    const generatorArgs = ['nx', 'g', 'sign-age:player-app'];

    if (options.name) {
      generatorArgs.push('--name', options.name);
    }

    if (options.port !== undefined) {
      generatorArgs.push('--port', options.port);
    }

    if (options.displayOrientation !== undefined) {
      generatorArgs.push('--displayOrientation', options.displayOrientation);
    }

    if (options.noStatusPage) {
      generatorArgs.push('--noStatusPage');
    }

    if (options.force) {
      generatorArgs.push('--force');
    }

    execFileSync(process.execPath, [PNPM_CLI, ...generatorArgs], {
      cwd: ROOT_DIR,
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(`❌ ${error.message}`);
    printUsage();
    process.exit(1);
  }
}

main();
