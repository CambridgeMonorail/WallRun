import { existsSync } from 'node:fs';
import { isAbsolute, relative, resolve } from 'node:path';

export const DEFAULT_PLAYER_APP = 'player-minimal';
const PLAYER_APP_NAME_PATTERN = /^player-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getVersion() {
  return process.env.npm_package_version || '0.1.0';
}

export function validatePlayerAppName(appName, options = {}) {
  const {
    allowTemplate = true,
    argumentName = '--app',
    templateAppName = DEFAULT_PLAYER_APP,
  } = options;

  if (!appName) {
    throw new Error(`Missing app name after ${argumentName}`);
  }

  if (!PLAYER_APP_NAME_PATTERN.test(appName)) {
    throw new Error(
      'App name must use kebab-case segments, start with "player-", and contain only lowercase letters, numbers, and hyphens.',
    );
  }

  if (!allowTemplate && appName === templateAppName) {
    throw new Error(
      `App name must not reuse the template name "${templateAppName}".`,
    );
  }

  return appName;
}

function assertPathWithinRoot(rootDir, targetPath, label) {
  const resolvedRoot = resolve(rootDir);
  const resolvedTargetPath = resolve(targetPath);
  const pathRelativeToRoot = relative(resolvedRoot, resolvedTargetPath);

  if (
    pathRelativeToRoot.startsWith('..') ||
    isAbsolute(pathRelativeToRoot)
  ) {
    throw new Error(`${label} resolves outside the expected root.`);
  }

  return resolvedTargetPath;
}

export function getAppNameFromArgs(argv) {
  const appNameIndex = argv.indexOf('--app');

  if (appNameIndex === -1) {
    return DEFAULT_PLAYER_APP;
  }

  const appName = argv[appNameIndex + 1];
  return validatePlayerAppName(appName);
}

export function getPlayerAppPaths(rootDir, appName, version = getVersion()) {
  const validatedAppName = validatePlayerAppName(appName);
  const appsRoot = resolve(rootDir, 'apps');
  const distAppsRoot = resolve(rootDir, 'dist', 'apps');
  const distPackagesRoot = resolve(rootDir, 'dist', 'packages');
  const appDir = assertPathWithinRoot(
    appsRoot,
    resolve(appsRoot, validatedAppName),
    'App directory path',
  );
  const autorunSrc = assertPathWithinRoot(
    appDir,
    resolve(appDir, 'public', 'autorun.brs'),
    'autorun path',
  );
  const distDir = assertPathWithinRoot(
    distAppsRoot,
    resolve(distAppsRoot, validatedAppName),
    'Build output path',
  );
  const packageDir = assertPathWithinRoot(
    distPackagesRoot,
    resolve(distPackagesRoot, validatedAppName),
    'Package directory path',
  );
  const packagePath = assertPathWithinRoot(
    distPackagesRoot,
    resolve(distPackagesRoot, `${validatedAppName}-v${version}.zip`),
    'Package archive path',
  );

  return {
    appDir,
    autorunSrc,
    distDir,
    packageDir,
    packageFileName: `${validatedAppName}-v${version}.zip`,
    packagePath,
    version,
  };
}

export function assertPlayerAppExists(rootDir, appName) {
  const { appDir } = getPlayerAppPaths(rootDir, appName);
  if (!existsSync(appDir)) {
    throw new Error(`Player app not found: apps/${appName}`);
  }
}
