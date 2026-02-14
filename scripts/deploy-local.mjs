#!/usr/bin/env node

/**
 * Deploy to Local BrightSign Player
 *
 * Deploys the packaged app to a BrightSign player via HTTP POST
 * to the diagnostic web server (port 8008)
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

/**
 * @typedef {Object} PlayerConfig
 * @property {string} ip
 * @property {number} port
 * @property {string} [username]
 * @property {string} [password]
 */

async function promptForIP() {
  const rl = createInterface({ input, output });
  const ip = await rl.question('Enter BrightSign player IP address: ');
  rl.close();
  return ip.trim();
}

async function discoverPlayers() {
  console.log('🔍 Scanning network for BrightSign players...');
  // In a real implementation, use SSDP or mDNS to discover players
  // For now, just return empty array
  console.log('   (Discovery not yet implemented - please enter IP manually)');
  return [];
}

async function checkPlayerStatus(config) {
  console.log(`🔍 Checking player at ${config.ip}:${config.port}...`);
  try {
    const response = await fetch(
      `http://${config.ip}:${config.port}/GetDeviceInfo`,
      {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      },
    );
    if (response.ok) {
      const info = await response.json();
      console.log(
        `✅ Player found: ${info.model || 'BrightSign'} (${info.serial || 'N/A'})`,
      );
      return true;
    }
  } catch (error) {
    console.error(`❌ Cannot reach player: ${error.message}`);
  }
  return false;
}

async function uploadPackage(config, packagePath) {
  console.log(`📤 Uploading package to ${config.ip}...`);

  try {
    const packageData = readFileSync(packagePath);
    const formData = new FormData();
    const blob = new Blob([packageData], { type: 'application/zip' });
    formData.append('file', blob, 'player.zip');
    formData.append('path', '/sd:/');

    const response = await fetch(`http://${config.ip}:${config.port}/upload`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(30000),
    });

    if (response.ok) {
      console.log('✅ Package uploaded successfully');
      return true;
    } else {
      console.error(
        `❌ Upload failed: ${response.status} ${response.statusText}`,
      );
      return false;
    }
  } catch (error) {
    console.error(`❌ Upload error: ${error.message}`);
    return false;
  }
}

async function rebootPlayer(config) {
  console.log('🔄 Rebooting player...');

  try {
    const response = await fetch(`http://${config.ip}:${config.port}/reboot`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });

    if (response.ok) {
      console.log('✅ Reboot command sent');
      return true;
    } else {
      console.error(
        `❌ Reboot failed: ${response.status} ${response.statusText}`,
      );
      return false;
    }
  } catch (error) {
    console.error(`❌ Reboot error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 BrightSign Local Deploy\n');

  // Find latest package
  const version = process.env.npm_package_version || '0.1.0';
  const packagePath = join(
    ROOT_DIR,
    'dist',
    'packages',
    `brightsign-player-v${version}.zip`,
  );

  if (!existsSync(packagePath)) {
    console.error(`❌ Package not found: ${packagePath}`);
    console.error('   Run "pnpm package:player" first');
    process.exit(1);
  }

  console.log(`📦 Package: brightsign-player-v${version}.zip\n`);

  // Get player IP
  const players = await discoverPlayers();
  let playerIP;

  if (players.length > 0) {
    console.log('\nDiscovered players:');
    players.forEach((ip, i) => console.log(`  ${i + 1}. ${ip}`));
    playerIP = players[0];
  } else {
    playerIP = await promptForIP();
  }

  if (!playerIP) {
    console.error('❌ No player IP provided');
    process.exit(1);
  }

  /** @type {PlayerConfig} */
  const config = {
    ip: playerIP,
    port: 8008,
  };

  // Check player status
  const playerReachable = await checkPlayerStatus(config);
  if (!playerReachable) {
    console.error('\n❌ Cannot reach player. Please check:');
    console.error('   - Player is powered on and connected to network');
    console.error('   - IP address is correct');
    console.error('   - Diagnostic web server is enabled (port 8008)');
    process.exit(1);
  }

  // Upload package
  const uploaded = await uploadPackage(config, packagePath);
  if (!uploaded) {
    console.error('\n❌ Deployment failed');
    process.exit(1);
  }

  // Reboot player
  const rebooted = await rebootPlayer(config);
  if (!rebooted) {
    console.warn('\n⚠️  Could not reboot player automatically');
    console.warn('   Please reboot the player manually to apply changes');
  }

  console.log('\n✅ Deployment complete!');
  console.log(`\n📺 Check the player display to verify the app is running`);
  console.log(`🔍 Debug inspector: http://${config.ip}:2999\n`);
}

main().catch(console.error);
