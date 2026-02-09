---
name: brightsign-fleet-deploy
description: Publish versioned React apps to GitHub Releases for fleet-wide BrightSign player updates
---

# BrightSign Fleet Deploy Skill

Publish production-ready React applications to GitHub Releases for fleet-wide deployment to BrightSign OS 9.x players.

## When to Use This Skill

Use this skill when you need to:

- Deploy to multiple BrightSign players simultaneously
- Version and track releases semantically (semver)
- Provide downloadable packages for player update systems
- Enable players to poll for and self-update
- Maintain rollback capabilities with versioned releases

## Fleet Deployment Overview

Fleet deployment follows this pattern:

1. **Build & version** - Create production bundle with semantic version
2. **Package** - Zip bundle with manifest.json (version, checksum, URL)
3. **Publish** - Upload to GitHub Releases as downloadable artifact
4. **Notify** - Update manifest endpoint for player polling
5. **Rollout** - Players check version, download if newer, install and reboot

## Step 1: Version Your Release

Follow semantic versioning (MAJOR.MINOR.PATCH):

```bash
# View current version
cat package.json | grep version

# Increment version (choose one)
npm version patch   # 1.0.0 → 1.0.1 (bug fixes)
npm version minor   # 1.0.1 → 1.1.0 (new features)
npm version major   # 1.1.0 → 2.0.0 (breaking changes)

# Or manual edit
# Edit package.json: "version": "1.2.3"
```

**Version guidelines:**

- **Patch** (1.0.x) - Bug fixes, no new features, safe to auto-update
- **Minor** (1.x.0) - New features, backward compatible
- **Major** (x.0.0) - Breaking changes, requires manual approval

## Step 2: Build Production Bundle

Build optimized production bundle:

```bash
# Production build with optimizations
nx build player-minimal --configuration=production

# Verify bundle size
du -sh dist/apps/player-minimal/
ls -lh dist/apps/player-minimal/assets/*.js
```

**Production checklist:**

- ✅ Bundle size < 200KB gzipped
- ✅ Source maps disabled or separate
- ✅ console.log removed
- ✅ Environment variables set correctly
- ✅ API endpoints point to production

## Step 3: Create Release Manifest

Generate manifest.json with version metadata:

```bash
# Read version from package.json
VERSION=$(cat package.json | grep '"version"' | cut -d'"' -f4)
COMMIT=$(git rev-parse --short HEAD)
BUILD_TIME=$(date -Iseconds)

# Create manifest
cat > dist/brightsign-package/manifest.json << EOF
{
  "name": "player-minimal",
  "version": "${VERSION}",
  "commit": "${COMMIT}",
  "buildTime": "${BUILD_TIME}",
  "minOSVersion": "9.0.0",
  "checksum": "",
  "downloadUrl": "https://github.com/CambridgeMonorail/TheSignAge/releases/download/v${VERSION}/player-minimal-v${VERSION}.zip",
  "releaseNotes": "Release v${VERSION}",
  "changelog": []
}
EOF

# Calculate checksum (SHA256)
cd dist/brightsign-package
CHECKSUM=$(find . -type f ! -name 'manifest.json' -exec sha256sum {} \; | sort | sha256sum | cut -d' ' -f1)
cd ../..

# Update manifest with checksum
sed -i "s/\"checksum\": \"\"/\"checksum\": \"${CHECKSUM}\"/" dist/brightsign-package/manifest.json
```

**Manifest fields:**

- `version` - Semantic version (x.y.z)
- `commit` - Git commit SHA for traceability
- `buildTime` - ISO 8601 timestamp
- `minOSVersion` - Minimum BrightSign OS version required
- `checksum` - SHA256 hash of package contents (for integrity verification)
- `downloadUrl` - GitHub Releases download URL
- `releaseNotes` - Human-readable summary
- `changelog` - Array of changes since last version

## Step 4: Create Release Package

Package everything into a zip file:

```bash
# Package with version in filename
VERSION=$(cat package.json | grep '"version"' | cut -d'"' -f4)
cd dist/brightsign-package

zip -r ../player-minimal-v${VERSION}.zip .

# Verify package
cd ../..
unzip -l dist/player-minimal-v${VERSION}.zip

# Should contain:
# - autorun.brs
# - index.html
# - assets/ directory
# - manifest.json
```

## Step 5: Publish to GitHub Releases

### Option A: Manual (GitHub Web UI)

1. Go to https://github.com/CambridgeMonorail/TheSignAge/releases
2. Click "Draft a new release"
3. Tag: `v1.2.3` (matches package.json version)
4. Title: `Player Minimal v1.2.3`
5. Description: Release notes and changelog
6. Attach: `player-minimal-v1.2.3.zip`
7. Click "Publish release"

### Option B: Automated (GitHub CLI)

```bash
# Install GitHub CLI if needed
# brew install gh (macOS)
# apt install gh (Linux)
# https://cli.github.com/

# Authenticate
gh auth login

# Create release with package
VERSION=$(cat package.json | grep '"version"' | cut -d'"' -f4)

gh release create "v${VERSION}" \
  --title "Player Minimal v${VERSION}" \
  --notes "Release v${VERSION} - See CHANGELOG.md for details" \
  dist/player-minimal-v${VERSION}.zip
```

### Option C: Automated (GitHub API)

```bash
# Using curl and GitHub API
VERSION=$(cat package.json | grep '"version"' | cut -d'"' -f4)
GITHUB_TOKEN="your_personal_access_token"

# Create release
RELEASE_DATA=$(cat <<EOF
{
  "tag_name": "v${VERSION}",
  "name": "Player Minimal v${VERSION}",
  "body": "Release v${VERSION}",
  "draft": false,
  "prerelease": false
}
EOF
)

RELEASE_RESPONSE=$(curl -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "${RELEASE_DATA}" \
  https://api.github.com/repos/CambridgeMonorail/TheSignAge/releases)

# Extract upload URL
UPLOAD_URL=$(echo "${RELEASE_RESPONSE}" | grep -Po '"upload_url": "\K[^"]*' | sed 's/{?name,label}//')

# Upload asset
curl -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Content-Type: application/zip" \
  --data-binary "@dist/player-minimal-v${VERSION}.zip" \
  "${UPLOAD_URL}?name=player-minimal-v${VERSION}.zip"
```

## Step 6: Update Manifest Endpoint

Publish the latest manifest.json for player polling:

```bash
# Option 1: Add to GitHub Pages
cp dist/brightsign-package/manifest.json docs/releases/latest-manifest.json
git add docs/releases/latest-manifest.json
git commit -m "chore: update manifest to v${VERSION}"
git push

# Players will poll: https://cambridgemonorail.github.io/TheSignAge/releases/latest-manifest.json
```

```bash
# Option 2: Upload to S3/CDN
aws s3 cp dist/brightsign-package/manifest.json s3://your-bucket/player-minimal/latest-manifest.json
```

```bash
# Option 3: GitHub Gist (simple, public)
gh gist create dist/brightsign-package/manifest.json --public
# Note the gist URL for player configuration
```

## Step 7: Configure Players for Auto-Update

Players need update logic to poll manifest and install:

**Player-side update checker (add to React app):**

```typescript
// apps/player-minimal/src/app/UpdateChecker.tsx

import { useEffect, useState } from 'react';

const MANIFEST_URL = 'https://cambridgemonorail.github.io/TheSignAge/releases/latest-manifest.json';
const CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour

export function UpdateChecker() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState('');

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await fetch(MANIFEST_URL);
        const manifest = await response.json();

        const currentVersion = process.env.NX_APP_VERSION || '0.0.0';

        if (isNewerVersion(manifest.version, currentVersion)) {
          setLatestVersion(manifest.version);
          setUpdateAvailable(true);

          // Auto-download and install
          await downloadAndInstall(manifest);
        }
      } catch (error) {
        console.error('Update check failed:', error);
      }
    };

    // Check on mount and periodically
    checkForUpdates();
    const interval = setInterval(checkForUpdates, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  async function downloadAndInstall(manifest: any) {
    // Download package
    const response = await fetch(manifest.downloadUrl);
    const blob = await response.blob();

    // Verify checksum
    const arrayBuffer = await blob.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex !== manifest.checksum) {
      console.error('Checksum mismatch! Aborting update.');
      return;
    }

    // Save to local storage for Node.js script to extract
    localStorage.setItem('pending-update', await blob.text());

    // Trigger reboot (player will install on next boot)
    window.location.href = 'http://localhost:8008/reboot';
  }

  function isNewerVersion(remote: string, local: string): boolean {
    const [rMajor, rMinor, rPatch] = remote.split('.').map(Number);
    const [lMajor, lMinor, lPatch] = local.split('.').map(Number);

    if (rMajor > lMajor) return true;
    if (rMajor === lMajor && rMinor > lMinor) return true;
    if (rMajor === lMajor && rMinor === lMinor && rPatch > lPatch) return true;
    return false;
  }

  if (!updateAvailable) return null;

  return (
    <div className="update-banner">
      Update available: v{latestVersion}
    </div>
  );
}
```

## Fleet Deploy Script

Automate the entire fleet deploy process:

**scripts/deploy-fleet.ts:**

```typescript
#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function deployFleet(version?: string) {
  try {
    // 1. Version bump (if not provided)
    if (!version) {
      const { stdout } = await execAsync('cat package.json');
      const pkg = JSON.parse(stdout);
      version = pkg.version;
      console.log(`Using current version: ${version}`);
    }

    // 2. Build production bundle
    console.log('Building production bundle...');
    await execAsync('nx build player-minimal --configuration=production');

    // 3. Package with manifest
    console.log('Creating release package...');
    await execAsync('./scripts/package-player.sh');

    // 4. Publish to GitHub Releases
    console.log(`Publishing to GitHub Releases...`);
    await execAsync(`gh release create "v${version}" \
      --title "Player Minimal v${version}" \
      --notes "Release v${version}" \
      dist/player-minimal-v${version}.zip`);

    // 5. Update manifest endpoint
    console.log('Updating manifest endpoint...');
    await fs.copyFile('dist/brightsign-package/manifest.json', 'docs/releases/latest-manifest.json');
    await execAsync('git add docs/releases/latest-manifest.json');
    await execAsync(`git commit -m "chore: update manifest to v${version}"`);
    await execAsync('git push');

    console.log(`\n✓ Fleet deployment complete!`);
    console.log(`Version: ${version}`);
    console.log(`Download: https://github.com/CambridgeMonorail/TheSignAge/releases/download/v${version}/player-minimal-v${version}.zip`);
  } catch (error) {
    console.error('Fleet deployment failed:', error);
    process.exit(1);
  }
}

// Parse CLI args
const version = process.argv[2];
deployFleet(version);
```

**Add to package.json:**

```json
{
  "scripts": {
    "deploy:fleet": "ts-node scripts/deploy-fleet.ts",
    "deploy:fleet:patch": "npm version patch && pnpm deploy:fleet",
    "deploy:fleet:minor": "npm version minor && pnpm deploy:fleet",
    "deploy:fleet:major": "npm version major && pnpm deploy:fleet"
  }
}
```

## Rollback Strategy

If a release has issues, rollback to previous version:

```bash
# 1. Identify last good version
gh release list

# 2. Update manifest to point to previous version
# Edit docs/releases/latest-manifest.json
# Change "version" and "downloadUrl" to previous release

# 3. Commit and push
git add docs/releases/latest-manifest.json
git commit -m "chore: rollback to v1.0.0"
git push

# 4. Players will download previous version on next update check
```

## Resources

Reference scripts in this skill:

- [deploy-fleet.ts](./deploy-fleet.ts) - Complete fleet deployment script
- [manifest-template.json](./manifest-template.json) - Manifest structure
- [update-checker.tsx](./update-checker.tsx) - Player-side update logic

For more information:

- GitHub Releases API documentation
- Semantic versioning specification (semver.org)
