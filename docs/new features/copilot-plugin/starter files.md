Below are the **starter scripts and files** I would hand to the developer.

They follow the current plugin shape where `plugin.json` is required at plugin root, with optional `agents/`, `skills/`, `hooks.json`, and `.mcp.json`, and local installation via `chat.pluginLocations`. ([Visual Studio Code][1])

---

## 1) `scripts/build-copilot-plugin.mjs`

```js
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

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
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
    throw new Error(`Could not find 'name' in frontmatter for skill: ${skillName}`);
  }

  if (frontmatterName !== skillName) {
    throw new Error(
      `Skill directory '${skillName}' does not match frontmatter name '${frontmatterName}'`
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
          command: 'node scripts/plugin-hooks/wallrun-preflight.mjs',
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
    },
  };
}

function buildPluginReadme() {
  return `# WallRun Signage Copilot Plugin

This is the generated Copilot agent-plugin for WallRun.

## What it includes

- Curated WallRun signage skills
- BrightSign runtime, packaging, and deployment skills
- The \`signage-architect\` agent
- The \`wallrun-deploy\` agent
- Optional plugin hooks
- Optional plugin MCP configuration

## Source of truth

Do not edit this directory by hand.

Generated from:

- \`/skills\`
- \`/.github/agents\`
- \`/scripts/build-copilot-plugin.mjs\`

## Local install in VS Code

Add this to your VS Code settings:

\`\`\`json
"chat.pluginLocations": {
  "/absolute/path/to/WallRun/copilot-plugins/wallrun-signage": true
}
\`\`\`

Then reload VS Code.

## Notes

- Plugin support must be enabled in your environment
- Bump \`version\` in \`plugin.json\` when testing update behaviour
- Keep plugin name and skill names in plain kebab-case
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
    `${JSON.stringify(buildPluginManifest(), null, 2)}\n`
  );

  log('Writing hooks.json');
  writeText(
    path.join(pluginRoot, 'hooks.json'),
    `${JSON.stringify(buildHooksConfig(), null, 2)}\n`
  );

  log('Writing .mcp.json');
  writeText(
    path.join(pluginRoot, '.mcp.json'),
    `${JSON.stringify(buildMcpConfig(), null, 2)}\n`
  );

  log('Writing README.md');
  writeText(path.join(pluginRoot, 'README.md'), buildPluginReadme());

  log('Done');
}

try {
  main();
} catch (error) {
  console.error(
    `[plugin:copilot:build] Failed: ${error instanceof Error ? error.message : String(error)}`
  );
  process.exit(1);
}
```

---

## 2) `scripts/check-copilot-plugin.mjs`

```js
#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const pluginRoot = path.join(repoRoot, 'copilot-plugins', 'wallrun-signage');

function fail(message) {
  console.error(`[plugin:copilot:check] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[plugin:copilot:check] ${message}`);
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertExists(filePath, label) {
  if (!exists(filePath)) {
    fail(`Missing ${label}: ${filePath}`);
  }
}

function assertKebabCase(value, label) {
  if (!/^[a-z0-9-]+$/.test(value)) {
    fail(`${label} must be plain kebab-case: ${value}`);
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

function scanForSuspiciousSecrets(dirPath) {
  const suspiciousPatterns = [
    /ghp_[A-Za-z0-9_]+/g,
    /github_pat_[A-Za-z0-9_]+/g,
    /AKIA[0-9A-Z]{16}/g,
    /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
    /password\s*[:=]\s*.+/i,
    /token\s*[:=]\s*.+/i,
  ];

  const findings = [];

  function walk(currentPath) {
    for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(entryPath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const ext = path.extname(entry.name).toLowerCase();
      const isLikelyText =
        [
          '.md',
          '.json',
          '.txt',
          '.js',
          '.mjs',
          '.ts',
          '.yml',
          '.yaml',
          '.sh',
          '',
        ].includes(ext);

      if (!isLikelyText) {
        continue;
      }

      const contents = readText(entryPath);

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(contents)) {
          findings.push({
            file: entryPath,
            pattern: String(pattern),
          });
        }
      }
    }
  }

  walk(dirPath);
  return findings;
}

function validatePluginManifest() {
  const pluginJsonPath = path.join(pluginRoot, 'plugin.json');
  assertExists(pluginJsonPath, 'plugin.json');

  const pluginJson = readJson(pluginJsonPath);

  if (!pluginJson.name) {
    fail(`plugin.json is missing 'name'`);
  }

  assertKebabCase(pluginJson.name, 'Plugin name');

  if (pluginJson.skills) {
    const skillPaths = Array.isArray(pluginJson.skills)
      ? pluginJson.skills
      : [pluginJson.skills];

    for (const relativeSkillPath of skillPaths) {
      const fullSkillPath = path.join(pluginRoot, relativeSkillPath);
      assertExists(fullSkillPath, `skills path '${relativeSkillPath}'`);
      validateSkillsDir(fullSkillPath);
    }
  }

  if (pluginJson.agents) {
    const agentPaths = Array.isArray(pluginJson.agents)
      ? pluginJson.agents
      : [pluginJson.agents];

    for (const relativeAgentPath of agentPaths) {
      const fullAgentPath = path.join(pluginRoot, relativeAgentPath);
      assertExists(fullAgentPath, `agents path '${relativeAgentPath}'`);
      validateAgentsDir(fullAgentPath);
    }
  }

  if (pluginJson.hooks) {
    if (typeof pluginJson.hooks === 'string') {
      assertExists(path.join(pluginRoot, pluginJson.hooks), `hooks file '${pluginJson.hooks}'`);
    }
  }

  if (pluginJson.mcpServers) {
    if (typeof pluginJson.mcpServers === 'string') {
      assertExists(
        path.join(pluginRoot, pluginJson.mcpServers),
        `MCP file '${pluginJson.mcpServers}'`
      );
    }
  }
}

function validateSkillsDir(skillsDir) {
  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
  const skillDirs = entries.filter((entry) => entry.isDirectory());

  if (skillDirs.length === 0) {
    fail(`No skills found in: ${skillsDir}`);
  }

  for (const entry of skillDirs) {
    const skillDirPath = path.join(skillsDir, entry.name);
    const skillFilePath = path.join(skillDirPath, 'SKILL.md');

    assertExists(skillFilePath, `SKILL.md for skill '${entry.name}'`);

    const contents = readText(skillFilePath);
    const frontmatterName = extractSkillNameFrontmatter(contents);

    if (!frontmatterName) {
      fail(`Skill '${entry.name}' is missing a valid 'name' frontmatter field`);
    }

    assertKebabCase(frontmatterName, `Skill name for '${entry.name}'`);

    if (frontmatterName !== entry.name) {
      fail(
        `Skill directory '${entry.name}' does not match frontmatter name '${frontmatterName}'`
      );
    }
  }
}

function validateAgentsDir(agentsDir) {
  const entries = fs.readdirSync(agentsDir, { withFileTypes: true });
  const agentFiles = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith('.agent.md')
  );

  if (agentFiles.length === 0) {
    fail(`No .agent.md files found in: ${agentsDir}`);
  }
}

function main() {
  assertExists(pluginRoot, 'plugin root');

  validatePluginManifest();

  const suspiciousFindings = scanForSuspiciousSecrets(pluginRoot);
  if (suspiciousFindings.length > 0) {
    fail(
      `Suspicious secret-like content found:\n${suspiciousFindings
        .map((finding) => `- ${finding.file} matched ${finding.pattern}`)
        .join('\n')}`
    );
  }

  ok('Plugin looks valid');
}

main();
```

---

## 3) `scripts/clean-copilot-plugin.mjs`

```js
#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const pluginRoot = path.join(process.cwd(), 'copilot-plugins', 'wallrun-signage');

fs.rmSync(pluginRoot, { recursive: true, force: true });
console.log(`[plugin:copilot:clean] Removed ${pluginRoot}`);
```

---

## 4) `.github/agents/wallrun-deploy.agent.md`

This assumes you want the source-of-truth agent to live with your existing repo agents, then be copied into the generated plugin.

```md
---
name: wallrun-deploy
description: Plan, validate, and guide packaging and deployment of WallRun signage applications to BrightSign players.
tools: []
---

You are a deployment-focused WallRun agent.

Your job is to help developers move from a working frontend to a reliable signage deployment.

## Use this agent when

- the user wants to package a WallRun application for BrightSign
- the user wants to deploy to a local BrightSign player
- the user wants to prepare for fleet deployment
- the user wants deployment preflight checks
- the user wants help choosing the right WallRun deployment path

## Core responsibilities

- Identify the deployment mode:
  - local preview
  - local BrightSign player
  - packaged output
  - fleet deployment

- Recommend the appropriate WallRun capability:
  - brightsign-runtime
  - brightsign-package
  - brightsign-deploy-local
  - brightsign-fleet-deploy
  - brightsign-debug

- Perform preflight reasoning around:
  - orientation
  - resolution
  - safe areas
  - autoplay assumptions
  - offline and empty-data fallback states
  - startup behaviour after reboot or power loss
  - asset size and playback constraints

## Behaviour rules

- Never claim deployment has succeeded unless there is a real tool result proving it
- Never invent credentials, device addresses, player state, or fleet state
- Prefer explicit deployment steps over vague summaries
- Call out missing information clearly
- Be practical and slightly sceptical
- Optimise for reliability on a wall, not elegance on a laptop

## Style

Write like a calm, experienced frontend engineer who understands that signage is software running on a player, not a website with delusions of grandeur.
```

---

## 5) `scripts/plugin-hooks/wallrun-preflight.mjs`

This is deliberately simple. It gives you a real file for `hooks.json` to point at, without pretending to know the eventual hook payload shape in more detail than the public docs currently guarantee.

```js
#!/usr/bin/env node

/**
 * Minimal advisory hook for WallRun plugin output.
 *
 * This starter intentionally stays conservative:
 * - exits 0
 * - prints reminders
 * - avoids mutating anything
 *
 * Replace with richer parsing once the team has settled how hook input
 * is passed through in your actual Copilot / VS Code environment.
 */

const reminders = [
  'Confirm target orientation and resolution are explicit.',
  'Confirm safe-area or overscan handling is defined.',
  'Confirm offline and empty-data fallback states exist.',
  'Confirm autoplay and startup assumptions are realistic.',
  'Confirm no deploy success is claimed without evidence.',
  'Confirm no credentials or machine-specific device details are embedded.',
];

for (const reminder of reminders) {
  console.log(`[wallrun-preflight] ${reminder}`);
}

process.exit(0);
```

---

## 6) package.json additions

```json
{
  "scripts": {
    "plugin:copilot:build": "node scripts/build-copilot-plugin.mjs",
    "plugin:copilot:check": "node scripts/check-copilot-plugin.mjs",
    "plugin:copilot:clean": "node scripts/clean-copilot-plugin.mjs"
  }
}
```

---

## 7) how I would tell the developer to wire this up

1. Add the three scripts under `scripts/`.
2. Add `wallrun-deploy.agent.md` under `.github/agents/`.
3. Add the package.json scripts.
4. Run:

```bash
pnpm plugin:copilot:build
pnpm plugin:copilot:check
```

5. Register the generated plugin in VS Code with:

```json
"chat.pluginLocations": {
  "/absolute/path/to/WallRun/copilot-plugins/wallrun-signage": true
}
```

VS Code’s docs say local plugins are registered via `chat.pluginLocations`, and Copilot-format plugins expect `plugin.json` at plugin root, with `hooks.json` at root too. Invalid plugin or skill names can silently fail if they are not plain kebab-case. ([Visual Studio Code][1])

## 8) one pragmatic note

I would treat the hook script above as a **starter stub**, not the finished article. The plugin structure and file locations are documented, but the safer first move is to ship a non-destructive advisory hook, prove the plugin loads, and only then make the hook more intelligent. The docs confirm the shape and locations of plugin components, but not every practical nuance of how your specific environment will pass hook context, so a conservative starter is the least silly way to begin. ([Visual Studio Code][1])

If you want, the next sensible step is for me to turn this into a single copy-paste markdown file with all paths and code blocks arranged exactly as a developer handoff.

[1]: https://code.visualstudio.com/docs/copilot/customization/agent-plugins "Agent plugins in VS Code (Preview)"
