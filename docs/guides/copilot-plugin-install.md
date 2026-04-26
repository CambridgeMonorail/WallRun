# Installing the WallRun Copilot Agent Plugin

The WallRun Copilot agent plugin bundles 14 curated signage skills and 2 specialized agents into a package you can install into any VS Code workspace — no need to clone the full monorepo.

## What's included

| Category | Contents |
|----------|----------|
| **Agents** | `signage-architect` (premium signage design), `wallrun-deploy` (deployment triage) |
| **Skills** | Layout system, animation, menu boards, distance legibility, safe layout, state machine, data refresh, content fallbacks, performance budget, placeholder images, BrightSign runtime/packaging/deployment/debugging |
| **Hooks** | Advisory preflight check (experimental) |
| **MCP** | BrightSign Player Tools server (discover, probe, list, add, remove players) + BrightDeveloper docs |

## Prerequisites

- **VS Code Insiders** — Copilot agent plugins are a preview feature currently available only in [VS Code Insiders](https://code.visualstudio.com/insiders/). This may change as the feature matures.
- GitHub Copilot Chat enabled
- Copilot agent plugin support enabled in settings

## Installation methods

### Option A: Local path (already have the repo)

If you've cloned WallRun, point VS Code at the plugin directory:

1. Open VS Code Settings (JSON)
2. Add:

```json
"chat.pluginLocations": {
  "/absolute/path/to/WallRun/copilot-plugins/wallrun-signage": true
}
```

3. Reload VS Code

### Option B: Install from repo URL

Use the built-in command to install directly from GitHub:

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Run **Chat: Install Plugin From Source**
3. Enter the repo URL: `https://github.com/CambridgeMonorail/WallRun`
4. VS Code clones the repo and discovers the plugin automatically

### Option C: Install portable skills only

If you only want the skills (without agents or hooks), use the open skills CLI:

```bash
npx skills add CambridgeMonorail/WallRun
```

## Verifying the installation

After installing, open GitHub Copilot Chat and try:

```text
@signage-architect Build a 3-zone layout for 1080p with a ticker and hero
```

If the agent responds with signage-specific guidance, the plugin is working.

## Updating the plugin

The plugin is regenerated from source skills and agents. After pulling new changes:

```bash
pnpm plugin:copilot:build
```

If you installed via **Install Plugin From Source**, VS Code manages updates when you pull the repo.

## Relationship to workspace agents

| Mechanism | Scope | Use when... |
|-----------|-------|-------------|
| Workspace agents (`.github/agents/`) | This repo only | Working inside the WallRun monorepo |
| Copilot plugin (`copilot-plugins/wallrun-signage/`) | Any workspace | Building signage in your own project |
| Portable skills (`npx skills add`) | Any workspace | You only need the skill workflows |

## Further reading

- [Plugin README](../../copilot-plugins/wallrun-signage/README.md) — Full plugin structure and maintenance guide
- [GitHub Copilot Tooling](../tooling/github-copilot-tooling.md) — All agents, skills, and instructions
- [Plugin architecture specs](../new%20features/copilot-plugin/) — Internal design documents
