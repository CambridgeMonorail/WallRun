#!/usr/bin/env node

/**
 * Deploy to Local BrightSign Player
 *
 * Deploys the packaged app to a BrightSign player via LDWS REST API
 *
 * BrightSign OS 9.x Local Diagnostic Web Server (LDWS):
 * - Base URL: https://<player-ip>:443/api/v1/
 * - Authentication: HTTP Digest (username: admin)
 * - Self-signed certificate (requires -k flag with curl)
 * - Endpoints: /info/, /files/sd/, /control/reboot, etc.
 */

import {
  readFileSync,
  existsSync,
  createReadStream,
  readdirSync,
  statSync,
} from 'fs';
import { join, dirname, basename } from 'path';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { fileURLToPath } from 'url';
import { getPlayer } from './player-config.mjs';
import AdmZip from 'adm-zip';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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

/**
 * Make API call to BrightSign player using curl with digest auth
 * @param {PlayerConfig} config
 * @param {string} endpoint - API endpoint (e.g., '/api/v1/info/', '/api/v1/files/sd/')
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Buffer|string} [data] - Data to send (for PUT/POST)
 * @param {string} [filename] - Filename for file uploads
 * @returns {Promise<any>} JSON response
 */
async function callPlayerAPI(
  config,
  endpoint,
  method = 'GET',
  data = null,
  filename = null,
) {
  const protocol = config.port === 443 ? 'https' : 'http';
  const url = `${protocol}://${config.ip}:${config.port}${endpoint}`;

  let curlCmd = `curl -k --digest -s -X ${method}`;

  if (config.username && config.password) {
    // Escape password for shell
    const escapedPassword = config.password.replace(/"/g, '\\"');
    curlCmd += ` -u "${config.username}:${escapedPassword}"`;
  }

  // Handle file upload
  if (data && filename) {
    // Write data to temp file and upload with -F
    const { writeFileSync, unlinkSync } = await import('fs');
    const { tmpdir } = await import('os');
    const tempPath = join(tmpdir(), filename);
    writeFileSync(tempPath, data);
    curlCmd += ` -F "file=@${tempPath}" "${url}"`;

    try {
      const { stdout } = await execAsync(curlCmd);
      unlinkSync(tempPath);
      return stdout ? JSON.parse(stdout) : {};
    } catch (error) {
      unlinkSync(tempPath);
      throw error;
    }
  }

  curlCmd += ` "${url}"`;

  try {
    const { stdout, stderr } = await execAsync(curlCmd);
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout ? JSON.parse(stdout) : {};
  } catch (error) {
    if (error.stdout && error.stdout.includes('401')) {
      throw new Error('401 Unauthorized - check credentials');
    }
    throw error;
  }
}

async function promptForIP() {
  const rl = createInterface({ input, output });
  const ip = await rl.question('Enter BrightSign player IP address: ');
  rl.close();
  return ip.trim();
}

/**
 * Get player configuration from CLI flag, players.json, or prompt
 */
async function getPlayerConfig() {
  // Check for --player flag
  const playerNameIndex = process.argv.indexOf('--player');
  if (playerNameIndex !== -1 && process.argv[playerNameIndex + 1]) {
    const playerName = process.argv[playerNameIndex + 1];
    try {
      const player = await getPlayer(playerName);
      console.log(`📺 Using player: ${player.name}`);
      return {
        ip: player.ip,
        port: player.port || 8008,
        username: player.username,
        password: player.password,
      };
    } catch (error) {
      console.error(`❌ ${error.message}`);
      process.exit(1);
    }
  }

  // Try to load default player from players.json
  try {
    const player = await getPlayer(); // Gets default player
    if (player) {
      console.log(`📺 Using default player: ${player.name} (${player.ip})`);
      return {
        ip: player.ip,
        port: player.port || 8008,
        username: player.username,
        password: player.password,
      };
    }
  } catch (error) {
    // No players.json or no default player - fall through to prompt
  }

  // Fall back to interactive prompt
  console.log('💡 Tip: Configure players with "pnpm player add <name> <ip>"');
  const playerIP = await promptForIP();

  if (!playerIP) {
    throw new Error('No player IP provided');
  }

  return {
    ip: playerIP,
    port: 8008,
  };
}

async function checkPlayerStatus(config) {
  console.log(`🔍 Checking player at ${config.ip}:${config.port}...`);

  try {
    // Primary check: file system access (tests what we actually need for deployment)
    const filesResponse = await callPlayerAPI(
      config,
      '/api/v1/files/sd/',
      'GET',
    );

    if (!filesResponse || !filesResponse.data) {
      return false;
    }

    // Optional: Try to get player info for better diagnostics
    try {
      const infoResponse = await callPlayerAPI(config, '/api/v1/info/', 'GET');
      if (infoResponse && infoResponse.data && infoResponse.data.result) {
        const player = infoResponse.data.result;
        console.log(
          `✅ Player found: ${player.model || 'BrightSign'} (Serial: ${player.serial || 'N/A'})`,
        );
        console.log(
          `   Firmware: ${player.FWVersion || 'unknown'}, Uptime: ${player.upTime || 'unknown'}`,
        );
        return true;
      }
    } catch (infoError) {
      // Info endpoint failed, but file access works - that's okay
      console.log(`✅ Player is online (file system accessible)`);
    }

    return true;
  } catch (error) {
    console.error(`❌ Cannot reach player: ${error.message}`);
    return false;
  }
}

/**
 * Check if player is registered to BSN.cloud
 * @param {PlayerConfig} config
 * @returns {Promise<boolean>} true if BSN-registered, false otherwise
 */
async function checkBSNRegistration(config) {
  console.log(`🔍 Checking BSN registration status...`);

  try {
    const protocol = config.port === 443 ? 'https' : 'http';
    const https = await import('https');
    const agent = new https.Agent({ rejectUnauthorized: false });

    // Check for BSN-specific registry keys
    const registryKeys = [
      'networking/setupType',
      'networking/bsn',
      'endpoints/bsnserver',
      'endpoints/certsserver',
    ];

    let bsnDetected = false;
    const bsnIndicators = [];

    for (const key of registryKeys) {
      const url = `${protocol}://${config.ip}:${config.port}/api/v1/registry/${key}/`;

      const fetchOptions = {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      };

      if (config.username && config.password) {
        const auth = Buffer.from(
          `${config.username}:${config.password}`,
        ).toString('base64');
        fetchOptions.headers = { Authorization: `Basic ${auth}` };
      }

      if (protocol === 'https') {
        fetchOptions.agent = agent;
      }

      try {
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
          const data = await response.json();

          // Check for BSN setup type
          if (key === 'networking/setupType' && data.value === 'BSN') {
            bsnDetected = true;
            bsnIndicators.push(`setupType: ${data.value}`);
          }

          // Check for BSN endpoints
          if (
            (key === 'endpoints/bsnserver' ||
              key === 'endpoints/certsserver') &&
            data.value
          ) {
            bsnDetected = true;
            bsnIndicators.push(`${key.split('/')[1]}: ${data.value}`);
          }

          // Check for networking/bsn section
          if (key === 'networking/bsn' && data.value) {
            bsnDetected = true;
            bsnIndicators.push('BSN networking config present');
          }
        }
      } catch (error) {
        // Key may not exist - that's OK
      }
    }

    if (bsnDetected) {
      console.log(
        '\n⚠️  ═══════════════════════════════════════════════════════════════',
      );
      console.log('⚠️  WARNING: Player is provisioned to BSN.cloud');
      console.log(
        '⚠️  ═══════════════════════════════════════════════════════════════',
      );
      console.log('⚠️  Detected BSN configuration:');
      bsnIndicators.forEach((indicator) => console.log(`⚠️    - ${indicator}`));
      console.log('⚠️  ');
      console.log(
        '⚠️  Local LDWS deployment will be OVERRIDDEN by BSN supervisor.',
      );
      console.log(
        '⚠️  Your custom autorun.brs will be loaded but BSN content will run instead.',
      );
      console.log('⚠️  ');
      console.log('⚠️  To use local deployment:');
      console.log('⚠️    1. Un-register player from BSN.cloud web portal, OR');
      console.log('⚠️    2. Use an unregistered development player, OR');
      console.log(
        '⚠️    3. Publish content via BSN.cloud instead of local LDWS',
      );
      console.log(
        '⚠️  ═══════════════════════════════════════════════════════════════\n',
      );
    } else {
      console.log('✅ Player is not BSN-registered (local deployment mode)');
    }

    return bsnDetected;
  } catch (error) {
    console.warn(`⚠️  Could not check BSN registration: ${error.message}`);
    return false;
  }
}

/**
 * Download and analyze system logs to verify deployment success
 * @param {PlayerConfig} config
 */
async function verifyDeployment(config) {
  console.log(`🔍 Downloading system logs to verify deployment...`);

  try {
    const protocol = config.port === 443 ? 'https' : 'http';
    const url = `${protocol}://${config.ip}:${config.port}/api/v1/download-log-package/`;

    const fetchOptions = {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    };

    if (config.username && config.password) {
      const auth = Buffer.from(
        `${config.username}:${config.password}`,
      ).toString('base64');
      fetchOptions.headers = { Authorization: `Basic ${auth}` };
    }

    const https = await import('https');
    const agent = new https.Agent({ rejectUnauthorized: false });
    if (protocol === 'https') {
      fetchOptions.agent = agent;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      console.warn(
        `⚠️  Could not download logs: ${response.status} ${response.statusText}`,
      );
      return;
    }

    // Get log content as text
    const logText = await response.text();

    // Check for BSN supervisor activation
    const bsnIndicators = [
      'Enabling BSN cloud',
      'Starting supervisor version',
      'BSN.cloud is enabled',
      'Configuring network to {"base":"https://handlers.bsn.cloud',
    ];

    const foundIndicators = [];
    for (const indicator of bsnIndicators) {
      if (logText.includes(indicator)) {
        foundIndicators.push(indicator);
      }
    }

    if (foundIndicators.length > 0) {
      console.log(
        '\n⚠️  ═══════════════════════════════════════════════════════════════',
      );
      console.log('⚠️  BSN SUPERVISOR DETECTED IN LOGS');
      console.log(
        '⚠️  ═══════════════════════════════════════════════════════════════',
      );
      console.log('⚠️  Found in system logs:');
      foundIndicators.forEach((indicator) =>
        console.log(`⚠️    - "${indicator}"`),
      );
      console.log('⚠️  ');
      console.log(
        '⚠️  This confirms the player is running BSN-managed content,',
      );
      console.log('⚠️  not your local deployment.');
      console.log(
        '⚠️  ═══════════════════════════════════════════════════════════════\n',
      );
    } else {
      // Check for local autorun execution
      if (
        logText.includes('SD:/autorun.brs') ||
        logText.includes("Loading 'SD:/autorun.brs'")
      ) {
        console.log('✅ Local autorun.brs detected in logs');

        // Check for HTML widget success
        if (
          logText.includes('roHtmlWidget') ||
          logText.includes('index.html')
        ) {
          console.log('✅ HTML widget appears to be running');
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not verify deployment: ${error.message}`);
  }
}

async function uploadPackage(config, packagePath) {
  console.log(`📤 Uploading package to ${config.ip}...`);

  try {
    // Extract ZIP file
    const zip = new AdmZip(packagePath);
    const zipEntries = zip.getEntries();

    console.log(`📦 Extracting ${zipEntries.length} files from package...`);

    let uploadedCount = 0;

    // Upload each file from the ZIP
    for (const entry of zipEntries) {
      if (entry.isDirectory) continue;

      const fileName = entry.entryName.replace(/\\/g, '/');
      const fileData = entry.getData();

      // Determine upload path - preserve directory structure
      const uploadPath =
        dirname(fileName) === '.' || dirname(fileName) === ''
          ? '/api/v1/files/sd/'
          : `/api/v1/files/sd/${dirname(fileName)}/`;

      try {
        await callPlayerAPI(
          config,
          uploadPath,
          'PUT',
          fileData,
          basename(fileName),
        );
        console.log(`  ✅ ${fileName}`);
        uploadedCount++;
      } catch (error) {
        console.error(`  ❌ ${fileName} - ${error.message}`);
      }
    }

    const totalFiles = zipEntries.filter((e) => !e.isDirectory).length;
    if (uploadedCount === totalFiles) {
      console.log(`✅ All ${uploadedCount} files uploaded successfully`);
      return true;
    } else {
      console.error(`❌ Only ${uploadedCount} of ${totalFiles} files uploaded`);
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
    await callPlayerAPI(config, '/api/v1/control/reboot', 'PUT');
    console.log('✅ Reboot command sent');
    return true;
  } catch (error) {
    console.error(`❌ Reboot error: ${error.message}`);
    return false;
  }
}

/**
 * Check if source files are newer than package (staleness check)
 * @param {string} packagePath - Path to the packaged ZIP file
 * @returns {boolean} true if package might be stale, false if up to date
 */
function checkPackageStaleness(packagePath) {
  try {
    const packageStat = statSync(packagePath);
    const packageTime = packageStat.mtimeMs;

    const sourceDirs = [
      join(ROOT_DIR, 'apps', 'player-minimal', 'src'),
      join(ROOT_DIR, 'apps', 'player-minimal', 'public'),
    ];

    let newestSourceTime = 0;
    let newestSourceFile = null;

    for (const dir of sourceDirs) {
      if (!existsSync(dir)) continue;

      const checkDir = (dirPath) => {
        const entries = readdirSync(dirPath);
        for (const entry of entries) {
          const fullPath = join(dirPath, entry);
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            checkDir(fullPath);
          } else {
            if (stat.mtimeMs > newestSourceTime) {
              newestSourceTime = stat.mtimeMs;
              newestSourceFile = fullPath;
            }
          }
        }
      };

      checkDir(dir);
    }

    // If any source file is newer than package, it's stale
    if (newestSourceTime > packageTime) {
      const packageDate = new Date(packageTime).toLocaleString();
      const sourceDate = new Date(newestSourceTime).toLocaleString();
      const relativeSourceFile = newestSourceFile
        .replace(ROOT_DIR, '')
        .replace(/\\/g, '/');

      console.warn('⚠️  WARNING: Package may be stale!');
      console.warn(`   Package built: ${packageDate}`);
      console.warn(`   Newest source: ${sourceDate}`);
      console.warn(`   File: ${relativeSourceFile}\n`);
      console.warn('   Your source code changes are NOT in this package.');
      console.warn('   Use "pnpm deploy:player" to rebuild + deploy\n');

      return true;
    }

    return false;
  } catch (error) {
    // If we can't check, don't fail - just warn
    console.warn(`⚠️  Could not check package staleness: ${error.message}\n`);
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

  // Check if package might be stale (source files newer than package)
  checkPackageStaleness(packagePath);

  console.log(`📦 Package: brightsign-player-v${version}.zip\n`);

  // Get player configuration
  const config = await getPlayerConfig();

  // Check player status
  const playerReachable = await checkPlayerStatus(config);
  if (!playerReachable) {
    console.error('\n❌ Cannot reach player. Please check:');
    console.error('   - Player is powered on and connected to network');
    console.error('   - IP address is correct');
    console.error('   - Local DWS is enabled');
    console.error('   - Try port 80 (HTTP) or 443 (HTTPS)');
    console.error('   - Credentials are correct if required');
    process.exit(1);
  }

  // Check if player is BSN-registered
  const isBSNRegistered = await checkBSNRegistration(config);
  if (isBSNRegistered) {
    console.log(
      '⚠️  Continuing deployment (files will upload but may not run)...\n',
    );
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
  } else {
    // Wait for player to boot before checking logs
    console.log('⏳ Waiting 30 seconds for player to boot...');
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // Verify deployment by checking logs
    await verifyDeployment(config);
  }

  console.log('\n✅ Deployment complete!');
  console.log(`\n📺 Check the player display to verify the app is running`);
  console.log(`🔍 Debug inspector: http://${config.ip}:2999\n`);
}

main().catch(console.error);
