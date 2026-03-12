#!/usr/bin/env node

/**
 * Package BrightSign Player App
 *
 * Creates a deployment-ready package for BrightSign OS 9.x players:
 * - Builds the player-minimal app
 * - Copies autorun.brs bootstrap script
 * - Creates deployment package structure
 * - Generates manifest.json with version and checksums
 */

import { execFileSync } from 'node:child_process';
import {
  createReadStream,
  existsSync,
  mkdirSync,
  writeFileSync,
  readdirSync,
  statSync,
  rmSync,
  cpSync,
} from 'fs';
import { join, dirname } from 'path';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import {
  assertPlayerAppExists,
  getAppNameFromArgs,
  getPlayerAppPaths,
} from './player-app-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

const MANIFEST_FILE_NAME = 'manifest.json';

function printUsage() {
  console.log(`
Usage:
  pnpm package:player -- --app <player-app-name>

Options:
  --app   Optional. Player app to build and package. Defaults to player-minimal.
  --help  Show this help message.
`);
}

/**
 * @typedef {Object} PackageManifest
 * @property {string} name
 * @property {string} version
 * @property {string} buildTimestamp
 * @property {Array<{path: string, size: number, checksum: string}>} files
 * @property {number} totalSize
 * @property {string[]} [excludedFiles]
 */

async function calculateChecksum(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);
    stream.on('error', reject);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

async function getAllFiles(dir, baseDir = dir) {
  const files = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...(await getAllFiles(fullPath, baseDir)));
    } else {
      // Return relative path from baseDir
      const relativePath = fullPath
        .substring(baseDir.length + 1)
        .replace(/\\/g, '/');
      files.push(relativePath);
    }
  }

  return files;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }

  const appName = getAppNameFromArgs(args);
  assertPlayerAppExists(ROOT_DIR, appName);
  const {
    autorunSrc,
    distDir,
    packageDir,
    packageFileName,
    packagePath,
    version,
  } = getPlayerAppPaths(ROOT_DIR, appName);

  console.log('📦 Packaging BrightSign Player App\n');

  // Step 1: Build the app
  console.log(`1️⃣  Building ${appName} app...`);
  try {
    execFileSync('pnpm', ['exec', 'nx', 'build', appName, '--configuration=production'], {
      cwd: ROOT_DIR,
      stdio: 'inherit',
    });
    console.log('✅ Build complete\n');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }

  // Step 2: Create package directory
  console.log('2️⃣  Creating package directory...');
  if (existsSync(packageDir)) {
    rmSync(packageDir, { recursive: true, force: true });
  }
  mkdirSync(packageDir, { recursive: true });
  console.log(`✅ Created ${packageDir}\n`);

  // Step 3: Copy autorun.brs
  console.log('3️⃣  Copying autorun.brs...');
  if (!existsSync(autorunSrc)) {
    console.error(`❌ autorun.brs not found at ${autorunSrc}`);
    process.exit(1);
  }
  cpSync(autorunSrc, join(packageDir, 'autorun.brs'));
  console.log('✅ Copied autorun.brs\n');

  // Step 4: Copy dist files
  console.log('4️⃣  Copying application files...');
  // Copy contents of the app dist directory into the package directory.
  const distItems = readdirSync(distDir);
  for (const item of distItems) {
    const srcPath = join(distDir, item);
    const destPath = join(packageDir, item);
    cpSync(srcPath, destPath, { recursive: true });
  }
  console.log('✅ Copied application files\n');

  // Step 5: Generate manifest
  console.log('5️⃣  Generating manifest...');
  const buildTimestamp = new Date().toISOString();

  const allFiles = (await getAllFiles(packageDir)).filter(
    // manifest.json cannot safely include itself when it contains checksums
    // (including it would be self-referential and unstable).
    (file) => file !== MANIFEST_FILE_NAME,
  );
  const filesWithMeta = await Promise.all(
    allFiles.map(async (file) => {
      const fullPath = join(packageDir, file);
      const stat = statSync(fullPath);
      const checksum = await calculateChecksum(fullPath);
      return {
        path: file,
        size: stat.size,
        checksum,
      };
    }),
  );

  const totalSize = filesWithMeta.reduce((sum, f) => sum + f.size, 0);

  /** @type {PackageManifest} */
  const manifest = {
    name: appName,
    version,
    buildTimestamp,
    files: filesWithMeta,
    totalSize,
    excludedFiles: [MANIFEST_FILE_NAME],
  };

  writeFileSync(
    join(packageDir, MANIFEST_FILE_NAME),
    JSON.stringify(manifest, null, 2),
  );
  console.log('✅ Generated manifest.json\n');

  // Step 6: Create zip archive
  console.log('6️⃣  Creating deployment package...');
  // Use platform-specific zip command
  if (process.platform === 'win32') {
    // Windows: Use PowerShell Compress-Archive
    execFileSync(
      'powershell',
      [
        '-Command',
        `Compress-Archive -Path '${packageDir}\\*' -DestinationPath '${packagePath}' -Force`,
      ],
      { stdio: 'inherit' },
    );
  } else {
    // Unix: Use zip command
    execFileSync('zip', ['-r', packagePath, '.'], {
      cwd: packageDir,
      stdio: 'inherit',
    });
  }
  console.log(`✅ Created ${packagePath}\n`);

  // Summary
  console.log('✨ Package Summary:');
  console.log(`   App: ${appName}`);
  console.log(`   Version: ${version}`);
  console.log(`   Files: ${filesWithMeta.length}`);
  console.log(`   Total Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Package: ${packageFileName}`);
  console.log('\n✅ Packaging complete!\n');
}

main().catch(console.error);
