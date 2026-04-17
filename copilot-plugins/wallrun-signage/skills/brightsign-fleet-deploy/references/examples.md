# Fleet Deploy Code Examples

## Player-Side Update Checker

Add to your React app so players can poll for and self-install updates:

```typescript
// apps/player-minimal/src/app/UpdateChecker.tsx

import { useEffect, useState } from 'react';

const MANIFEST_URL = 'https://cambridgemonorail.github.io/WallRun/releases/latest-manifest.json';
const CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour

export function UpdateChecker() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState('');

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await fetch(MANIFEST_URL);
        const manifest = await response.json();

        const currentVersion = import.meta.env.VITE_APP_VERSION || '0.0.0';

        if (isNewerVersion(manifest.version, currentVersion)) {
          setLatestVersion(manifest.version);
          setUpdateAvailable(true);

          await downloadAndInstall(manifest);
        }
      } catch (error) {
        console.error('Update check failed:', error);
      }
    };

    checkForUpdates();
    const interval = setInterval(checkForUpdates, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  async function downloadAndInstall(manifest: { downloadUrl: string; checksum: string }) {
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

    // Signal update readiness — actual file deployment and reboot
    // are handled externally via LDWS API (PUT /api/v1/control/reboot).
    // The player-side app detects the update; a management script or
    // CI pipeline pushes files and triggers the reboot.
    console.log(`Update v${manifest.version} verified. Ready for deployment.`);
    setUpdateAvailable(true);
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

```typescript
// scripts/deploy-fleet.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function deployFleet(version?: string) {
  try {
    if (!version) {
      const { stdout } = await execAsync('cat package.json');
      const pkg = JSON.parse(stdout);
      version = pkg.version;
      console.log(`Using current version: ${version}`);
    }

    console.log('Building production bundle...');
    await execAsync('nx build player-minimal --configuration=production');

    console.log('Creating release package...');
    await execAsync('./scripts/package-player.sh');

    console.log(`Publishing to GitHub Releases...`);
    await execAsync(`gh release create "v${version}" \
      --title "Player Minimal v${version}" \
      --notes "Release v${version}" \
      dist/player-minimal-v${version}.zip`);

    console.log('Updating manifest endpoint...');
    await fs.copyFile('dist/brightsign-package/manifest.json', 'docs/releases/latest-manifest.json');
    await execAsync('git add docs/releases/latest-manifest.json');
    await execAsync(`git commit -m "chore: update manifest to v${version}"`);
    await execAsync('git push');

    console.log(`\n✓ Fleet deployment complete!`);
    console.log(`Version: ${version}`);
    console.log(`Download: https://github.com/CambridgeMonorail/WallRun/releases/download/v${version}/player-minimal-v${version}.zip`);
  } catch (error) {
    console.error('Fleet deployment failed:', error);
    process.exit(1);
  }
}

const version = process.argv[2];
deployFleet(version);
```

## Package.json Scripts

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
