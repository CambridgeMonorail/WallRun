#!/usr/bin/env node

/**
 * Setup script for The Sign Age development environment
 * 
 * Initializes configuration files needed for BrightSign development:
 * - .env (from .env.example)
 * - .brightsign/players.json (from .brightsign/players.example.json)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const configs = [
  {
    example: path.join(rootDir, '.env.example'),
    target: path.join(rootDir, '.env'),
    description: 'Environment variables for BrightSign deployment',
    optional: true,
  },
  {
    example: path.join(rootDir, '.brightsign', 'players.example.json'),
    target: path.join(rootDir, '.brightsign', 'players.json'),
    description: 'BrightSign player registry',
    required: false, // Will be created interactively by deploy script if needed
  },
];

console.log('🚀 Setting up The Sign Age development environment...\n');

let setupCount = 0;
let skipCount = 0;

for (const config of configs) {
  if (!fs.existsSync(config.example)) {
    console.log(`⚠️  Warning: Example file not found: ${path.relative(rootDir, config.example)}`);
    continue;
  }

  if (fs.existsSync(config.target)) {
    console.log(`✓ Already exists: ${path.relative(rootDir, config.target)}`);
    skipCount++;
    continue;
  }

  // Ensure target directory exists
  const targetDir = path.dirname(config.target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy example to target
  fs.copyFileSync(config.example, config.target);
  console.log(`✅ Created: ${path.relative(rootDir, config.target)}`);
  console.log(`   ${config.description}`);
  setupCount++;
}

console.log('\n' + '='.repeat(60));

if (setupCount > 0) {
  console.log(`✅ Setup complete! Created ${setupCount} configuration file(s).`);
  console.log('\n📝 Next steps:');
  console.log('   1. Configure your BrightSign player:');
  console.log('      pnpm player add <name> <ip-address> --default');
  console.log('      Example: pnpm player add dev-player 192.168.0.51 --default');
  console.log('\n   2. Build the player app:');
  console.log('      pnpm build:player');
  console.log('\n   3. Deploy to your player:');
  console.log('      pnpm deploy:local');
  console.log('\n📖 For more details, see:');
  console.log('   - docs/guides/brightsign-player-config.md');
  console.log('   - docs/guides/brightsign-developer-tooling.md');
} else if (skipCount > 0) {
  console.log('✓ All configuration files already exist. No changes needed.');
  console.log('\n💡 Tip: To reconfigure, delete the existing files and run setup again.');
} else {
  console.log('⚠️  No configuration files were created.');
  console.log('   Check that .env.example and .brightsign/players.example.json exist.');
}

console.log('='.repeat(60) + '\n');
