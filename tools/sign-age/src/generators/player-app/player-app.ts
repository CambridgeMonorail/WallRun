import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { formatFiles, joinPathFragments, logger, Tree, workspaceRoot } from '@nx/devkit';
import { PlayerAppGeneratorSchema } from './schema';

const TEMPLATE_APP_NAME = 'player-minimal';
const TEMPLATE_DIR = resolve(workspaceRoot, 'apps', TEMPLATE_APP_NAME);
const PORT_RANGE_START = 4200;
const PORT_RANGE_END = 4299;
const TEXT_FILE_EXTENSIONS = new Set([
  '.brs',
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.mts',
  '.ts',
  '.tsx',
]);
const PLAYER_APP_NAME_PATTERN = /^player-[a-z0-9]+(?:-[a-z0-9]+)*$/;

type DisplayOrientation = NonNullable<
  PlayerAppGeneratorSchema['displayOrientation']
>;

type NormalizedOptions = {
  name: string;
  force: boolean;
  port: number;
  displayOrientation: DisplayOrientation;
  noStatusPage: boolean;
  tags: string[];
};

export async function playerAppGenerator(
  tree: Tree,
  options: PlayerAppGeneratorSchema,
) {
  const normalized = normalizeOptions(options);
  const targetRoot = joinPathFragments('apps', normalized.name);

  if (!existsSync(TEMPLATE_DIR)) {
    throw new Error(`Template directory not found: ${TEMPLATE_DIR}`);
  }

  if (tree.exists(targetRoot) || existsSync(resolve(workspaceRoot, targetRoot))) {
    if (normalized.force) {
      tree.delete(targetRoot);
    } else {
      throw new Error(
        `Target app already exists: ${targetRoot}. Choose a different app name or rerun with --force.`,
      );
    }
  }

  copyTemplateApp(tree, normalized, targetRoot);
  writeReadme(tree, targetRoot, normalized);

  logger.info(`Created ${targetRoot}`);
  logger.info(`Port: ${normalized.port}`);
  if (normalized.noStatusPage) {
    logger.info('Optional cleanup: removed src/app/StatusPage.tsx');
  }

  await safeFormatFiles(tree);
}

export default playerAppGenerator;

function normalizeOptions(
  options: PlayerAppGeneratorSchema,
): NormalizedOptions {
  const name = validatePlayerAppName(options.name);
  const usedPorts = getUsedPorts(options.force ? name : undefined);
  const port = options.port ?? getNextAvailablePort(usedPorts);

  if (options.port !== undefined) {
    validatePort(options.port);
    ensurePortIsAvailable(options.port, usedPorts);
  }

  return {
    name,
    force: options.force ?? false,
    port,
    displayOrientation: options.displayOrientation ?? 'portrait-right',
    noStatusPage: options.noStatusPage ?? false,
    tags: normalizeTags(options.tags),
  };
}

function validatePlayerAppName(appName?: string): string {
  if (!appName) {
    throw new Error('Missing required app name.');
  }

  if (!PLAYER_APP_NAME_PATTERN.test(appName)) {
    throw new Error(
      'App name must use kebab-case segments and start with "player-", for example "player-menu-board".',
    );
  }

  if (appName === TEMPLATE_APP_NAME) {
    throw new Error(
      `App name must not reuse the template name "${TEMPLATE_APP_NAME}".`,
    );
  }

  return appName;
}

function validatePort(port: number): void {
  if (
    !Number.isInteger(port) ||
    port < PORT_RANGE_START ||
    port > PORT_RANGE_END
  ) {
    throw new Error(
      `Invalid port: ${port}. Expected an integer between ${PORT_RANGE_START} and ${PORT_RANGE_END}.`,
    );
  }
}

function normalizeTags(tags?: string): string[] {
  if (!tags) {
    return [];
  }

  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getUsedPorts(ignoreAppName?: string): Set<number> {
  const appsDir = resolve(workspaceRoot, 'apps');
  const usedPorts = new Set<number>();

  for (const appEntry of readdirSync(appsDir)) {
    if (appEntry === ignoreAppName) {
      continue;
    }

    const appDir = join(appsDir, appEntry);
    if (!statSync(appDir).isDirectory()) {
      continue;
    }

    for (const configName of ['vite.config.mts', 'vite.config.ts']) {
      const configPath = join(appDir, configName);
      if (!existsSync(configPath)) {
        continue;
      }

      const content = readFileSync(configPath, 'utf8');
      for (const match of content.matchAll(/\bport:\s*(\d{2,5})\b/g)) {
        const parsedPort = Number.parseInt(match[1], 10);
        if (Number.isInteger(parsedPort)) {
          usedPorts.add(parsedPort);
        }
      }
    }
  }

  return usedPorts;
}

function getNextAvailablePort(usedPorts: Set<number>): number {
  for (let port = PORT_RANGE_START; port <= PORT_RANGE_END; port += 1) {
    if (!usedPorts.has(port)) {
      return port;
    }
  }

  throw new Error(
    `No available ports found in range ${PORT_RANGE_START}-${PORT_RANGE_END}.`,
  );
}

function ensurePortIsAvailable(port: number, usedPorts: Set<number>): void {
  if (usedPorts.has(port)) {
    throw new Error(`Port ${port} is already used by another app Vite config.`);
  }
}

function copyTemplateApp(
  tree: Tree,
  normalized: NormalizedOptions,
  targetRoot: string,
): void {
  for (const filePath of collectTemplateFiles(TEMPLATE_DIR)) {
    const relativePath = relative(TEMPLATE_DIR, filePath).replace(/\\/g, '/');

    if (shouldSkipTemplateFile(relativePath, normalized)) {
      continue;
    }

    const targetPath = joinPathFragments(targetRoot, relativePath);
    const fileBuffer = readFileSync(filePath);

    if (!TEXT_FILE_EXTENSIONS.has(extname(filePath))) {
      tree.write(targetPath, fileBuffer);
      continue;
    }

    const updatedContent = buildTextFileContent(
      relativePath,
      fileBuffer.toString('utf8'),
      normalized,
    );
    tree.write(targetPath, updatedContent);
  }
}

function collectTemplateFiles(dirPath: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(dirPath)) {
    const entryPath = join(dirPath, entry);
    const entryStat = statSync(entryPath);

    if (entryStat.isDirectory()) {
      files.push(...collectTemplateFiles(entryPath));
      continue;
    }

    files.push(entryPath);
  }

  return files;
}

function shouldSkipTemplateFile(
  relativePath: string,
  normalized: NormalizedOptions,
): boolean {
  if (relativePath === 'TEMPLATE_CONTRACT.md' || relativePath === 'README.md') {
    return true;
  }

  if (normalized.noStatusPage && relativePath === 'src/app/StatusPage.tsx') {
    return true;
  }

  return false;
}

function buildTextFileContent(
  relativePath: string,
  content: string,
  normalized: NormalizedOptions,
): string {
  const replacements: Array<[RegExp, string]> = [
    [/player-minimal/g, normalized.name],
    [/PlayerMinimal/g, toCompactTitle(normalized.name)],
    [/port:\s*4200/g, `port: ${normalized.port}`],
    [/http:\/\/localhost:4200/g, `http://localhost:${normalized.port}`],
  ];

  let updatedContent = replacements.reduce(
    (currentContent, [pattern, replacement]) =>
      currentContent.replace(pattern, replacement),
    content,
  );

  if (relativePath === 'src/config.ts') {
    updatedContent = updatedContent.replace(
      /displayOrientation:\s*'[^']+'/,
      `displayOrientation: '${normalized.displayOrientation}'`,
    );
  }

  if (relativePath === 'project.json') {
    const projectConfiguration = JSON.parse(updatedContent) as {
      tags?: string[];
    };
    projectConfiguration.tags = normalized.tags;
    updatedContent = `${JSON.stringify(projectConfiguration, null, 2)}\n`;
  }

  return updatedContent;
}

function writeReadme(
  tree: Tree,
  targetRoot: string,
  normalized: NormalizedOptions,
): void {
  const title = toTitleCase(normalized.name);
  const readmeContent = `# ${title}\n\nA BrightSign-ready player app scaffolded from \`${TEMPLATE_APP_NAME}\`. This app starts with the repository's minimal React 19 + Vite + Tailwind v4 player baseline and is intended to be customized for signage content.\n\n## Development\n\n\`\`\`bash\npnpm nx serve ${normalized.name}\n# Opens on http://localhost:${normalized.port}\n\`\`\`\n\n## Validation\n\n\`\`\`bash\npnpm nx run ${normalized.name}:type-check\npnpm nx build ${normalized.name}\npnpm nx run ${normalized.name}:package\n\`\`\`\n\n## Notes\n\n- Generated from the ${TEMPLATE_APP_NAME} template contract in \`apps/player-minimal/TEMPLATE_CONTRACT.md\`.\n- Update \`src/app/app.tsx\` with app-specific signage content.\n- Adjust \`src/config.ts\` for display orientation before deployment if needed.\n`;

  tree.write(joinPathFragments(targetRoot, 'README.md'), `${readmeContent}\n`);
}

async function safeFormatFiles(tree: Tree): Promise<void> {
  if (process.env.JEST_WORKER_ID) {
    return;
  }

  try {
    await formatFiles(tree);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes('--experimental-vm-modules')) {
      logger.warn(
        'Skipping generator file formatting because the current runtime does not support the formatter loader.',
      );
      return;
    }

    throw error;
  }
}

function toTitleCase(appName: string): string {
  return appName
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function toCompactTitle(appName: string): string {
  return appName
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}
