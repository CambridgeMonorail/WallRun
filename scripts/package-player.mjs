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

import { execSync } from 'child_process';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const DIST_DIR = join(ROOT_DIR, 'dist', 'apps', 'player-minimal');
const PACKAGE_DIR = join(ROOT_DIR, 'dist', 'packages', 'brightsign');
const AUTORUN_SRC = join(
  ROOT_DIR,
  'apps',
  'player-minimal',
  'public',
  'autorun.brs',
);

const MANIFEST_FILE_NAME = 'manifest.json';

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
  console.log('📦 Packaging BrightSign Player App\n');

  // Step 1: Build the app
  console.log('1️⃣  Building player-minimal app...');
  try {
    execSync('pnpm exec nx build player-minimal --configuration=production', {
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
  if (existsSync(PACKAGE_DIR)) {
    rmSync(PACKAGE_DIR, { recursive: true, force: true });
  }
  mkdirSync(PACKAGE_DIR, { recursive: true });
  console.log(`✅ Created ${PACKAGE_DIR}\n`);

  // Step 3: Copy autorun.brs
  console.log('3️⃣  Copying autorun.brs...');
  if (!existsSync(AUTORUN_SRC)) {
    console.error(`❌ autorun.brs not found at ${AUTORUN_SRC}`);
    process.exit(1);
  }
  cpSync(AUTORUN_SRC, join(PACKAGE_DIR, 'autorun.brs'));
  console.log('✅ Copied autorun.brs\n');

  // Step 4: Copy dist files
  console.log('4️⃣  Copying application files...');
  // Copy contents of DIST_DIR into PACKAGE_DIR
  const distItems = readdirSync(DIST_DIR);
  for (const item of distItems) {
    const srcPath = join(DIST_DIR, item);
    const destPath = join(PACKAGE_DIR, item);
    cpSync(srcPath, destPath, { recursive: true });
  }
  console.log('✅ Copied application files\n');

  // Step 5: Generate manifest
  console.log('5️⃣  Generating manifest...');
  const version = process.env.npm_package_version || '0.1.0';
  const buildTimestamp = new Date().toISOString();

  const allFiles = (await getAllFiles(PACKAGE_DIR)).filter(
    // manifest.json cannot safely include itself when it contains checksums
    // (including it would be self-referential and unstable).
    (file) => file !== MANIFEST_FILE_NAME,
  );
  const filesWithMeta = await Promise.all(
    allFiles.map(async (file) => {
      const fullPath = join(PACKAGE_DIR, file);
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
    name: 'the-sign-age-player',
    version,
    buildTimestamp,
    files: filesWithMeta,
    totalSize,
    excludedFiles: [MANIFEST_FILE_NAME],
  };

  writeFileSync(
    join(PACKAGE_DIR, MANIFEST_FILE_NAME),
    JSON.stringify(manifest, null, 2),
  );
  console.log('✅ Generated manifest.json\n');

  // Step 6: Create zip archive
  console.log('6️⃣  Creating deployment package...');
  const zipFile = join(
    ROOT_DIR,
    'dist',
    'packages',
    `brightsign-player-v${version}.zip`,
  );

  // Use platform-specific zip command
  if (process.platform === 'win32') {
    // Windows: Use PowerShell Compress-Archive
    execSync(
      `powershell -Command "Compress-Archive -Path '${PACKAGE_DIR}\\*' -DestinationPath '${zipFile}' -Force"`,
      { stdio: 'inherit' },
    );
  } else {
    // Unix: Use zip command
    execSync(`cd "${PACKAGE_DIR}" && zip -r "${zipFile}" .`, {
      stdio: 'inherit',
    });
  }
  console.log(`✅ Created ${zipFile}\n`);

  // Summary
  console.log('✨ Package Summary:');
  console.log(`   Version: ${version}`);
  console.log(`   Files: ${filesWithMeta.length}`);
  console.log(`   Total Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Package: ${zipFile}`);
  console.log('\n✅ Packaging complete!\n');
}

main().catch(console.error);
