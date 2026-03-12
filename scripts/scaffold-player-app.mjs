#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePlayerAppName } from './player-app-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const APPS_DIR = join(ROOT_DIR, 'apps');
const TEMPLATE_APP_NAME = 'player-minimal';
const TEMPLATE_DIR = join(APPS_DIR, TEMPLATE_APP_NAME);
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

function printUsage() {
  console.log(`
Usage:
  pnpm scaffold:player --name <app-name> [--port <4200-4299>] [--no-status-page]

Options:
  --name            Required. New Nx app name, for example: player-menu-board
  --port            Optional. Explicit dev/preview port. Auto-selects next free 42xx port when omitted.
  --no-status-page  Optional. Removes src/app/StatusPage.tsx from the generated app.
  --force           Optional. Recreate the target app directory if it already exists.
`);
}

function parseArgs(argv) {
  const options = {
    force: false,
    noStatusPage: false,
    port: undefined,
    name: undefined,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    switch (arg) {
      case '--name':
        options.name = argv[index + 1];
        index += 1;
        break;

      case '--port':
        options.port = parsePort(argv[index + 1]);
        index += 1;
        break;

      case '--no-status-page':
        options.noStatusPage = true;
        break;

      case '--force':
        options.force = true;
        break;

      case '--help':
      case '-h':
        printUsage();
        process.exit(0);
        break;

      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function parsePort(value) {
  const port = Number.parseInt(String(value), 10);
  if (
    !Number.isInteger(port) ||
    port < PORT_RANGE_START ||
    port > PORT_RANGE_END
  ) {
    throw new Error(
      `Invalid port: ${value}. Expected an integer between ${PORT_RANGE_START} and ${PORT_RANGE_END}.`,
    );
  }

  return port;
}

function validateAppName(appName) {
  validatePlayerAppName(appName, {
    allowTemplate: false,
    argumentName: '--name',
    templateAppName: TEMPLATE_APP_NAME,
  });
}

function toTitleCase(appName) {
  return appName
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function toCompactTitle(appName) {
  return appName
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

function getAppDirectories() {
  return readdirSync(APPS_DIR)
    .map((entry) => join(APPS_DIR, entry))
    .filter((entryPath) => statSync(entryPath).isDirectory());
}

function extractPortsFromViteConfig(configContent) {
  return Array.from(configContent.matchAll(/\bport:\s*(\d{2,5})\b/g), (match) =>
    Number.parseInt(match[1], 10),
  ).filter((port) => Number.isInteger(port));
}

function getUsedPorts() {
  const usedPorts = new Set();

  for (const appDir of getAppDirectories()) {
    for (const configName of ['vite.config.mts', 'vite.config.ts']) {
      const configPath = join(appDir, configName);
      if (!existsSync(configPath)) {
        continue;
      }

      const content = readFileSync(configPath, 'utf8');
      for (const port of extractPortsFromViteConfig(content)) {
        usedPorts.add(port);
      }
    }
  }

  return usedPorts;
}

function getNextAvailablePort(usedPorts) {
  for (let port = PORT_RANGE_START; port <= PORT_RANGE_END; port += 1) {
    if (!usedPorts.has(port)) {
      return port;
    }
  }

  throw new Error(
    `No available ports found in range ${PORT_RANGE_START}-${PORT_RANGE_END}.`,
  );
}

function ensurePortIsAvailable(port, usedPorts) {
  if (usedPorts.has(port)) {
    throw new Error(`Port ${port} is already used by another app Vite config.`);
  }
}

function collectTextFiles(dirPath) {
  const files = [];

  for (const entry of readdirSync(dirPath)) {
    const entryPath = join(dirPath, entry);
    const entryStat = statSync(entryPath);

    if (entryStat.isDirectory()) {
      files.push(...collectTextFiles(entryPath));
      continue;
    }

    if (TEXT_FILE_EXTENSIONS.has(extname(entryPath))) {
      files.push(entryPath);
    }
  }

  return files;
}

function replaceInFile(filePath, replacements) {
  const originalContent = readFileSync(filePath, 'utf8');
  const updatedContent = replacements.reduce(
    (content, [pattern, replacement]) => content.replace(pattern, replacement),
    originalContent,
  );

  if (updatedContent !== originalContent) {
    writeFileSync(filePath, updatedContent, 'utf8');
  }
}

function writeReadme(targetDir, appName, port) {
  const title = toTitleCase(appName);

  const content = `# ${title}\n\nA BrightSign-ready player app scaffolded from \`${TEMPLATE_APP_NAME}\`. This app starts with the repository's minimal React 19 + Vite + Tailwind v4 player baseline and is intended to be customized for signage content.\n\n## Development\n\n\`\`\`bash\npnpm nx serve ${appName}\n# Opens on http://localhost:${port}\n\`\`\`\n\n## Validation\n\n\`\`\`bash\npnpm nx run ${appName}:type-check\npnpm nx build ${appName}\n\`\`\`\n\n## Notes\n\n- Generated from the ${TEMPLATE_APP_NAME} template contract in \`apps/player-minimal/TEMPLATE_CONTRACT.md\`.\n- Update \`src/app/app.tsx\` with app-specific signage content.\n- Adjust \`src/config.ts\` for display orientation before deployment if needed.\n`;

  writeFileSync(join(targetDir, 'README.md'), `${content}\n`, 'utf8');
}

function scaffoldApp(options) {
  validateAppName(options.name);

  if (!existsSync(TEMPLATE_DIR)) {
    throw new Error(`Template directory not found: ${TEMPLATE_DIR}`);
  }

  const targetDir = join(APPS_DIR, options.name);
  if (existsSync(targetDir)) {
    if (!options.force) {
      throw new Error(
        `Target app already exists: apps/${options.name}. Use --force to replace it.`,
      );
    }

    rmSync(targetDir, { recursive: true, force: true });
  }

  const usedPorts = getUsedPorts();
  const port = options.port ?? getNextAvailablePort(usedPorts);

  if (options.port !== undefined) {
    ensurePortIsAvailable(port, usedPorts);
  }

  cpSync(TEMPLATE_DIR, targetDir, { recursive: true });

  rmSync(join(targetDir, 'TEMPLATE_CONTRACT.md'), { force: true });
  rmSync(join(targetDir, 'README.md'), { force: true });

  if (options.noStatusPage) {
    rmSync(join(targetDir, 'src', 'app', 'StatusPage.tsx'), { force: true });
  }

  const replacements = [
    [/player-minimal/g, options.name],
    [/PlayerMinimal/g, toCompactTitle(options.name)],
    [/port:\s*4200/g, `port: ${port}`],
    [/http:\/\/localhost:4200/g, `http://localhost:${port}`],
  ];

  for (const filePath of collectTextFiles(targetDir)) {
    replaceInFile(filePath, replacements);
  }

  writeReadme(targetDir, options.name, port);

  return { port, targetDir };
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    validateAppName(options.name);

    const result = scaffoldApp(options);

    console.log(`✅ Created apps/${options.name}`);
    console.log(`   Port: ${result.port}`);
    if (options.noStatusPage) {
      console.log('   Optional cleanup: removed src/app/StatusPage.tsx');
    }
    console.log(`   Next: pnpm nx run ${options.name}:type-check`);
    console.log(`   Then: pnpm nx serve ${options.name}`);
  } catch (error) {
    console.error(`❌ ${error.message}`);
    printUsage();
    process.exit(1);
  }
}

main();
