# WallRun Signage Copilot Plugin

This is the generated Copilot agent-plugin for WallRun.

## What it includes

- Curated WallRun signage skills (design, layout, animation, menu boards, distance legibility, etc.)
- BrightSign runtime, packaging, and deployment skills
- The `signage-architect` agent — builds premium signage content
- The `wallrun-deploy` agent — guides deployment workflow selection and preflight checks
- Optional plugin hooks (experimental)
- Optional plugin-scoped MCP configuration

## Source of truth

**Do not edit this directory by hand.**

Generated from:
- `/skills` — source skills
- `/.github/agents` — source agents
- `/scripts/build-copilot-plugin.mjs` — build script

Rebuild with:
```bash
pnpm plugin:copilot:build
```

Validate with:
```bash
pnpm plugin:copilot:check
```

Clean with:
```bash
pnpm plugin:copilot:clean
```

## Local install in VS Code

Add this to your VS Code settings:

```json
"chat.pluginLocations": {
  "/absolute/path/to/WallRun/copilot-plugins/wallrun-signage": true
}
```

Then reload VS Code.

## Install from repo

In VS Code, run **Chat: Install Plugin From Source** from the Command Palette and enter the WallRun repo URL. VS Code will clone the repo and discover the plugin.

## Keeping the plugin up to date

This directory is committed to the repo so it can be installed directly from the repository. After changing source skills or agents, regenerate and commit:

```bash
pnpm plugin:copilot:build
pnpm plugin:copilot:check
git add copilot-plugins/
git commit -m "chore: regenerate copilot plugin"
```

## Relationship to other files

| File/Directory | Role |
|---|---|
| `skills/` (repo root) | Source of truth for all skills |
| `.github/skills/` | Generated mirror for GitHub Copilot (via `pnpm sync:skills`) |
| `copilot-plugins/wallrun-signage/skills/` | Generated subset for the plugin (via `pnpm plugin:copilot:build`) |
| `.vscode/mcp.json` | Workspace MCP config (used during development) |
| `copilot-plugins/wallrun-signage/.mcp.json` | Plugin-scoped MCP config (travels with the plugin) |

## Notes

- **VS Code Insiders required** — Copilot agent plugins are a preview feature currently available only in [VS Code Insiders](https://code.visualstudio.com/insiders/). This requirement may change as the feature graduates to stable.
- Bump `version` in `plugin.json` when testing update behaviour
- Keep plugin name and skill names in plain kebab-case
- The hooks feature is experimental — the `postPrompt` hook runs an advisory-only preflight script

## What this plugin does NOT do (yet)

- Publish to the VS Code marketplace
- Execute real remote deployments
- Include secrets, credentials, or environment-specific config
- Replace the repo's existing `.vscode/mcp.json` or skill sync workflow
