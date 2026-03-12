import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const DEFAULT_PLAYER_APP = 'player-minimal';

export function getVersion() {
  return process.env.npm_package_version || '0.1.0';
}

export function getAppNameFromArgs(argv) {
  const appNameIndex = argv.indexOf('--app');

  if (appNameIndex === -1) {
    return DEFAULT_PLAYER_APP;
  }

  const appName = argv[appNameIndex + 1];
  if (!appName) {
    throw new Error('Missing app name after --app');
  }

  return appName;
}

export function getPlayerAppPaths(rootDir, appName, version = getVersion()) {
  return {
    appDir: join(rootDir, 'apps', appName),
    autorunSrc: join(rootDir, 'apps', appName, 'public', 'autorun.brs'),
    distDir: join(rootDir, 'dist', 'apps', appName),
    packageDir: join(rootDir, 'dist', 'packages', appName),
    packageFileName: `${appName}-v${version}.zip`,
    packagePath: join(
      rootDir,
      'dist',
      'packages',
      `${appName}-v${version}.zip`,
    ),
    version,
  };
}

export function assertPlayerAppExists(rootDir, appName) {
  const appDir = join(rootDir, 'apps', appName);
  if (!existsSync(appDir)) {
    throw new Error(`Player app not found: apps/${appName}`);
  }
}
