#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const pluginRoot = path.join(repoRoot, 'copilot-plugins', 'wallrun-signage');
const pluginSkillsDir = path.join(pluginRoot, 'skills');
const pluginAgentsDir = path.join(pluginRoot, 'agents');

const sourceSkillsDir = path.join(repoRoot, 'skills');
const sourceAgentsDir = path.join(repoRoot, '.github', 'agents');

const curatedSkillNames = [
  'signage-layout-system',
  'signage-animation-system',
  'signage-menu-board',
  'signage-distance-legibility',
  'signage-safe-layout',
  'signage-state-machine',
  'signage-data-refresh-patterns',
  'signage-performance-budget',
  'signage-content-fallbacks',
  'brightsign-runtime',
  'brightsign-package',
  'brightsign-deploy-local',
  'brightsign-fleet-deploy',
  'brightsign-debug',
];

const curatedAgentNames = [
  'signage-architect.agent.md',
  'wallrun-deploy.agent.md',
];

function log(message) {
  console.log(`[plugin:copilot:build] ${message}`);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function removeDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeText(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents, 'utf8');
}

function copyFile(sourcePath, targetPath) {
  ensureDir(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
}

function copyDirRecursive(sourceDir, targetDir) {
  if (!exists(sourceDir)) {
    throw new Error(`Source directory does not exist: ${sourceDir}`);
  }

  ensureDir(targetDir);

  for (const entry of fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(sourcePath, targetPath);
    } else if (entry.isFile()) {
      copyFile(sourcePath, targetPath);
    }
  }
}

function extractSkillNameFrontmatter(markdown) {
  const frontmatterMatch = markdown.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (!frontmatterMatch) {
    return null;
  }

  const body = frontmatterMatch[1];
  const nameMatch = body.match(/^\s*name:\s*["']?([a-z0-9-]+)["']?\s*$/m);
  return nameMatch ? nameMatch[1] : null;
}

function validateSkillSource(skillName) {
  const skillDir = path.join(sourceSkillsDir, skillName);
  const skillFile = path.join(skillDir, 'SKILL.md');

  if (!exists(skillDir)) {
    throw new Error(`Missing source skill directory: ${skillDir}`);
  }

  if (!exists(skillFile)) {
    throw new Error(`Missing SKILL.md for source skill: ${skillName}`);
  }

  const frontmatterName = extractSkillNameFrontmatter(readText(skillFile));
  if (!frontmatterName) {
    throw new Error(
      `Could not find 'name' in frontmatter for skill: ${skillName}`,
    );
  }

  if (frontmatterName !== skillName) {
    throw new Error(
      `Skill directory '${skillName}' does not match frontmatter name '${frontmatterName}'`,
    );
  }
}

function validateAgentSource(agentFileName) {
  const agentPath = path.join(sourceAgentsDir, agentFileName);

  if (!exists(agentPath)) {
    throw new Error(`Missing source agent: ${agentPath}`);
  }
}

function buildPluginManifest() {
  return {
    name: 'wallrun-signage',
    description:
      'WallRun agents and skills for designing, building, packaging, and deploying programmable digital signage with React and BrightSign.',
    version: '0.1.0',
    author: {
      name: 'Cambridge Monorail',
      url: 'https://github.com/CambridgeMonorail/WallRun',
    },
    license: 'MIT',
    keywords: ['digital-signage', 'react', 'frontend', 'brightsign', 'wallrun'],
    agents: 'agents/',
    skills: 'skills/',
    hooks: 'hooks.json',
    mcpServers: '.mcp.json',
  };
}

function buildHooksConfig() {
  return {
    hooks: {
      postPrompt: [
        {
          name: 'wallrun-preflight',
          description: 'Validate signage and deployment assumptions',
          command: 'node scripts/wallrun-preflight.mjs',
        },
      ],
    },
  };
}

function buildMcpConfig() {
  return {
    mcpServers: {
      brightdeveloper: {
        url: 'https://brightdeveloper-mcp.bsn.cloud/mcp',
      },
      'brightsign-player-tools': {
        command: 'node',
        args: ['servers/player-tools.mjs'],
      },
    },
  };
}

function buildPluginReadme() {
  return `# WallRun Signage Copilot Plugin

This is the generated Copilot agent-plugin for WallRun.

## What it includes

- Curated WallRun signage skills (design, layout, animation, menu boards, distance legibility, etc.)
- BrightSign runtime, packaging, and deployment skills
- The \`signage-architect\` agent — builds premium signage content
- The \`wallrun-deploy\` agent — guides deployment workflow selection and preflight checks
- Optional plugin hooks (experimental)
- Optional plugin-scoped MCP configuration

## Source of truth

**Do not edit this directory by hand.**

Generated from:
- \`/skills\` — source skills
- \`/.github/agents\` — source agents
- \`/scripts/build-copilot-plugin.mjs\` — build script

Rebuild with:
\`\`\`bash
pnpm plugin:copilot:build
\`\`\`

Validate with:
\`\`\`bash
pnpm plugin:copilot:check
\`\`\`

Clean with:
\`\`\`bash
pnpm plugin:copilot:clean
\`\`\`

## Local install in VS Code

Add this to your VS Code settings:

\`\`\`json
"chat.pluginLocations": {
  "/absolute/path/to/WallRun/copilot-plugins/wallrun-signage": true
}
\`\`\`

Then reload VS Code.

## Install from repo

In VS Code, run **Chat: Install Plugin From Source** from the Command Palette and enter the WallRun repo URL. VS Code will clone the repo and discover the plugin.

## Keeping the plugin up to date

This directory is committed to the repo so it can be installed directly from the repository. After changing source skills or agents, regenerate and commit:

\`\`\`bash
pnpm plugin:copilot:build
pnpm plugin:copilot:check
git add copilot-plugins/
git commit -m "chore: regenerate copilot plugin"
\`\`\`

## Relationship to other files

| File/Directory | Role |
|---|---|
| \`skills/\` (repo root) | Source of truth for all skills |
| \`.github/skills/\` | Generated mirror for GitHub Copilot (via \`pnpm sync:skills\`) |
| \`copilot-plugins/wallrun-signage/skills/\` | Generated subset for the plugin (via \`pnpm plugin:copilot:build\`) |
| \`.vscode/mcp.json\` | Workspace MCP config (used during development) |
| \`copilot-plugins/wallrun-signage/.mcp.json\` | Plugin-scoped MCP config (travels with the plugin) |

## Notes

- Plugin support must be enabled in your VS Code environment
- Bump \`version\` in \`plugin.json\` when testing update behaviour
- Keep plugin name and skill names in plain kebab-case
- The hooks feature is experimental — the \`postPrompt\` hook runs an advisory-only preflight script

## What this plugin does NOT do (yet)

- Publish to the VS Code marketplace
- Execute real remote deployments
- Include secrets, credentials, or environment-specific config
- Replace the repo's existing \`.vscode/mcp.json\` or skill sync workflow
`;
}

function main() {
  log('Cleaning old plugin output');
  removeDir(pluginRoot);

  log('Creating plugin directory structure');
  ensureDir(pluginSkillsDir);
  ensureDir(pluginAgentsDir);

  log('Validating curated source skills');
  for (const skillName of curatedSkillNames) {
    validateSkillSource(skillName);
  }

  log('Validating curated source agents');
  for (const agentFileName of curatedAgentNames) {
    validateAgentSource(agentFileName);
  }

  log('Copying curated skills');
  for (const skillName of curatedSkillNames) {
    const sourceDir = path.join(sourceSkillsDir, skillName);
    const targetDir = path.join(pluginSkillsDir, skillName);
    copyDirRecursive(sourceDir, targetDir);
  }

  log('Copying curated agents');
  for (const agentFileName of curatedAgentNames) {
    const sourcePath = path.join(sourceAgentsDir, agentFileName);
    const targetPath = path.join(pluginAgentsDir, agentFileName);
    copyFile(sourcePath, targetPath);
  }

  log('Writing plugin.json');
  writeText(
    path.join(pluginRoot, 'plugin.json'),
    `${JSON.stringify(buildPluginManifest(), null, 2)}\n`,
  );

  log('Copying hook scripts');
  const sourceHookScript = path.join(
    repoRoot,
    'scripts',
    'plugin-hooks',
    'wallrun-preflight.mjs',
  );
  const targetHookScript = path.join(
    pluginRoot,
    'scripts',
    'wallrun-preflight.mjs',
  );
  if (!exists(sourceHookScript)) {
    throw new Error(`Missing hook script: ${sourceHookScript}`);
  }
  copyFile(sourceHookScript, targetHookScript);

  log('Copying MCP server');
  const sourceMcpServer = path.join(
    repoRoot,
    'tools',
    'player-mcp-server',
    'server.mjs',
  );
  const targetMcpServer = path.join(pluginRoot, 'servers', 'player-tools.mjs');
  if (!exists(sourceMcpServer)) {
    throw new Error(`Missing MCP server: ${sourceMcpServer}`);
  }
  copyFile(sourceMcpServer, targetMcpServer);

  log('Writing hooks.json');
  writeText(
    path.join(pluginRoot, 'hooks.json'),
    `${JSON.stringify(buildHooksConfig(), null, 2)}\n`,
  );

  log('Writing .mcp.json');
  writeText(
    path.join(pluginRoot, '.mcp.json'),
    `${JSON.stringify(buildMcpConfig(), null, 2)}\n`,
  );

  log('Writing README.md');
  writeText(path.join(pluginRoot, 'README.md'), buildPluginReadme());

  log('Done — plugin built at copilot-plugins/wallrun-signage/');
}

try {
  main();
} catch (error) {
  console.error(
    `[plugin:copilot:build] Failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(1);
}
