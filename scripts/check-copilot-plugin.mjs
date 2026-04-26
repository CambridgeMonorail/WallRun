#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const pluginRoot = path.join(repoRoot, 'copilot-plugins', 'wallrun-signage');

let hasErrors = false;

function fail(message) {
  console.error(`[plugin:copilot:check] FAIL: ${message}`);
  hasErrors = true;
}

function ok(message) {
  console.log(`[plugin:copilot:check] OK: ${message}`);
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    fail(`Invalid JSON in ${path.relative(repoRoot, filePath)}: ${e.message}`);
    return null;
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertExists(filePath, label) {
  if (!exists(filePath)) {
    fail(`Missing ${label}: ${filePath}`);
    return false;
  }
  return true;
}

function assertKebabCase(value, label) {
  if (!/^[a-z0-9-]+$/.test(value)) {
    fail(`${label} must be plain kebab-case: ${value}`);
    return false;
  }
  return true;
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
      const isLikelyText = ['.md', '.json', '.txt', '.js', '.mjs', '.ts', '.yml', '.yaml', '.sh', '.brs', '.cfg', '.html', '.css', ''].includes(ext);

      if (!isLikelyText) {
        continue;
      }

      const contents = readText(entryPath);

      for (const pattern of suspiciousPatterns) {
        pattern.lastIndex = 0;
        if (pattern.test(contents)) {
          findings.push({
            file: path.relative(pluginRoot, entryPath),
            pattern: String(pattern),
          });
        }
      }
    }
  }

  walk(dirPath);
  return findings;
}

function validateSkillsDir(skillsDir) {
  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
  const skillDirs = entries.filter((entry) => entry.isDirectory());

  if (skillDirs.length === 0) {
    fail(`No skills found in: ${skillsDir}`);
    return;
  }

  for (const entry of skillDirs) {
    const skillDirPath = path.join(skillsDir, entry.name);
    const skillFilePath = path.join(skillDirPath, 'SKILL.md');

    if (!assertExists(skillFilePath, `SKILL.md for skill '${entry.name}'`)) {
      continue;
    }

    const contents = readText(skillFilePath);
    const frontmatterName = extractSkillNameFrontmatter(contents);

    if (!frontmatterName) {
      fail(`Skill '${entry.name}' is missing a valid 'name' frontmatter field`);
      continue;
    }

    assertKebabCase(frontmatterName, `Skill name for '${entry.name}'`);

    if (frontmatterName !== entry.name) {
      fail(`Skill directory '${entry.name}' does not match frontmatter name '${frontmatterName}'`);
    }
  }

  ok(`${skillDirs.length} skills validated`);
}

function validateAgentsDir(agentsDir) {
  const entries = fs.readdirSync(agentsDir, { withFileTypes: true });
  const agentFiles = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith('.agent.md')
  );

  if (agentFiles.length === 0) {
    fail(`No .agent.md files found in: ${agentsDir}`);
    return;
  }

  ok(`${agentFiles.length} agents found`);
}

function validatePluginManifest() {
  const pluginJsonPath = path.join(pluginRoot, 'plugin.json');
  if (!assertExists(pluginJsonPath, 'plugin.json')) {
    return;
  }

  const pluginJson = readJson(pluginJsonPath);
  if (!pluginJson) {
    return;
  }

  if (!pluginJson.name) {
    fail(`plugin.json is missing 'name'`);
  } else {
    assertKebabCase(pluginJson.name, 'Plugin name');
    ok(`Plugin name: ${pluginJson.name}`);
  }

  if (pluginJson.skills) {
    const skillPaths = Array.isArray(pluginJson.skills) ? pluginJson.skills : [pluginJson.skills];
    for (const relativeSkillPath of skillPaths) {
      const fullSkillPath = path.join(pluginRoot, relativeSkillPath);
      if (assertExists(fullSkillPath, `skills path '${relativeSkillPath}'`)) {
        validateSkillsDir(fullSkillPath);
      }
    }
  }

  if (pluginJson.agents) {
    const agentPaths = Array.isArray(pluginJson.agents) ? pluginJson.agents : [pluginJson.agents];
    for (const relativeAgentPath of agentPaths) {
      const fullAgentPath = path.join(pluginRoot, relativeAgentPath);
      if (assertExists(fullAgentPath, `agents path '${relativeAgentPath}'`)) {
        validateAgentsDir(fullAgentPath);
      }
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

function main() {
  if (!assertExists(pluginRoot, 'plugin root directory')) {
    console.error('[plugin:copilot:check] Plugin not found. Run: pnpm plugin:copilot:build');
    process.exit(1);
  }

  validatePluginManifest();

  const suspiciousFindings = scanForSuspiciousSecrets(pluginRoot);
  if (suspiciousFindings.length > 0) {
    fail(
      `Suspicious secret-like content found:\n${suspiciousFindings
        .map((finding) => `  - ${finding.file} matched ${finding.pattern}`)
        .join('\n')}`
    );
  } else {
    ok('No suspicious secrets detected');
  }

  if (hasErrors) {
    console.error('\n[plugin:copilot:check] Validation FAILED — see errors above');
    process.exit(1);
  }

  console.log('\n[plugin:copilot:check] All checks passed');
}

main();
