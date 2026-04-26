# WallRun Copilot agent-plugin implementation spec

## Objective

Package WallRun’s existing skills, agents, and BrightSign deployment workflows as a **GitHub Copilot / VS Code agent-plugin** that can be installed locally, and later published more broadly, without disrupting the repo’s current structure or skill workflow. WallRun already has the raw ingredients: a top-level `skills/` source tree, a generated `.github/skills/` mirror, at least one existing custom agent, deploy scripts, and a workspace MCP setup. What it does not yet have is the plugin wrapper itself: `plugin.json`, plugin-scoped hooks, plugin-scoped MCP config, and a reproducible build process for the plugin artefact. ([GitHub][1])

## Why this matters

WallRun currently helps with the creative and technical side of signage development, but the plugin should also surface the operational half: packaging, local deployment, and fleet deployment. The repo already advertises packaging and deploy workflows for BrightSign players, and the skills catalogue already includes `brightsign-package`, `brightsign-deploy-local`, and `brightsign-fleet-deploy`. The plugin should expose these as first-class capabilities rather than leaving them buried in scripts and markdown. ([GitHub][1])

## Current repo reality

The implementation must respect the repo as it exists today.

WallRun is a monorepo with top-level directories including `.github`, `.vscode`, `apps`, `docs`, `libs`, `scripts`, `skills`, and `tools`. The repo README describes WallRun as a developer-first workspace for digital signage with BrightSign-focused packaging and deploy workflows. Repo docs state clearly that `skills/` is the source of truth and that `.github/skills/` is a generated mirror created via `pnpm sync:skills` and checked with `pnpm check:skills`. The repo also includes a workspace MCP configuration in `.vscode/mcp.json`, currently documenting the `brightdeveloper` server. Package scripts already include `sync:skills`, `deploy:local`, and `deploy:player`. ([GitHub][1])

This means the plugin work must be **additive**, not destructive.

## Required design decision

Do **not** try to turn the repo root into the plugin root.

Instead, create a dedicated plugin output directory inside the repo:

```text
copilot-plugins/wallrun-signage/
```

This keeps the Nx workspace, source skills, generated GitHub mirror, scripts, and docs intact, while giving us a clean installable plugin package. VS Code supports local plugin registration via `chat.pluginLocations`, and both VS Code and Copilot plugin docs describe a plugin as a self-contained directory rooted by `plugin.json`. ([Visual Studio Code][2])

## Target outcome

After implementation, the developer should be able to:

- run a build script that generates `copilot-plugins/wallrun-signage/`
- register that folder locally in VS Code via `chat.pluginLocations`
- use WallRun as an installable agent-plugin with:
  - curated signage skills
  - BrightSign runtime and deploy skills
  - a signage architecture agent
  - a deployment-focused agent
  - optional preflight hooks
  - optional plugin-scoped MCP config. ([Visual Studio Code][2])

---

# Scope

## In scope for v1

Implement a generated plugin with:

- `plugin.json`
- curated `skills/`
- `agents/`
- `README.md`
- a build script
- a validation script
- package.json scripts to build and check the plugin
- optional `hooks.json`
- optional `.mcp.json`

## Out of scope for v1

Do not attempt:

- marketplace publication
- automatic live deployment to customer environments
- secrets, credentials, or device-specific config inside the plugin
- replacing the repo’s existing `.vscode/mcp.json`
- moving or rewriting the existing source `skills/` model. ([GitHub][3])

---

# Required plugin structure

Generate this directory:

```text
copilot-plugins/
  wallrun-signage/
    plugin.json
    hooks.json
    .mcp.json
    README.md
    agents/
      signage-architect.agent.md
      wallrun-deploy.agent.md
    skills/
      signage-layout-system/
        SKILL.md
      signage-animation-system/
        SKILL.md
      signage-menu-board/
        SKILL.md
      signage-distance-legibility/
        SKILL.md
      signage-safe-layout/
        SKILL.md
      signage-state-machine/
        SKILL.md
      signage-data-refresh-patterns/
        SKILL.md
      signage-performance-budget/
        SKILL.md
      signage-content-fallbacks/
        SKILL.md
      brightsign-runtime/
        SKILL.md
      brightsign-package/
        SKILL.md
      brightsign-deploy-local/
        SKILL.md
      brightsign-fleet-deploy/
        SKILL.md
      brightsign-debug/
        SKILL.md
```

This follows the documented plugin layout where `plugin.json` is required and `agents/`, `skills/`, `hooks.json`, and `.mcp.json` are optional but supported. ([GitHub Docs][4])

---

# Source of truth rules

These rules are non-negotiable:

- `skills/` at repo root remains the source of truth
- `.github/skills/` remains a generated mirror
- the new plugin directory is also a generated artefact
- developers must not hand-edit the generated plugin skill copies
- plugin content should be assembled from repo-native sources by script. ([GitHub][3])

In plain English: one source, many consumers. Otherwise this turns into a three-way drift factory.

---

# Functional requirements

## FR1: Add plugin build pipeline

Create a build script:

```text
scripts/build-copilot-plugin.mjs
```

Responsibilities:

- remove any existing `copilot-plugins/wallrun-signage/`
- recreate the target directory structure
- copy selected skills from repo root `skills/`
- copy selected agents from `.github/agents/` or another agreed source location
- generate `plugin.json`
- generate `README.md`
- generate `hooks.json` if hooks are enabled
- generate `.mcp.json` if plugin MCP is enabled
- fail the build if required source files are missing

The build must be deterministic.

## FR2: Add plugin validation pipeline

Create a validation script:

```text
scripts/check-copilot-plugin.mjs
```

Checks must include:

- `plugin.json` exists
- plugin name is valid kebab-case
- all referenced paths exist
- every packaged skill directory contains `SKILL.md`
- every packaged agent file exists
- if `hooks` is declared, `hooks.json` exists
- if `mcpServers` is declared, `.mcp.json` exists
- no unexpected secrets or machine-specific values are present

VS Code documentation explicitly notes that an invalid plugin `name` can silently fail to load, so this check matters more than it should in a sane universe. ([Visual Studio Code][2])

## FR3: Add package.json scripts

Add the following scripts to `package.json`:

```json
{
  "scripts": {
    "plugin:copilot:build": "node scripts/build-copilot-plugin.mjs",
    "plugin:copilot:check": "node scripts/check-copilot-plugin.mjs",
    "plugin:copilot:clean": "node scripts/clean-copilot-plugin.mjs"
  }
}
```

These should sit alongside the existing `sync:skills`, `deploy:local`, and `deploy:player` scripts rather than replacing them. ([GitHub][5])

## FR4: Add plugin manifest

Generate:

```text
copilot-plugins/wallrun-signage/plugin.json
```

Initial manifest:

```json
{
  "name": "wallrun-signage",
  "description": "WallRun agents and skills for designing, building, packaging, and deploying programmable digital signage with React and BrightSign.",
  "version": "0.1.0",
  "author": {
    "name": "Cambridge Monorail",
    "url": "https://github.com/CambridgeMonorail/WallRun"
  },
  "license": "MIT",
  "keywords": ["digital-signage", "react", "frontend", "brightsign", "wallrun"],
  "agents": "agents/",
  "skills": "skills/",
  "hooks": "hooks.json",
  "mcpServers": ".mcp.json"
}
```

This matches the documented plugin manifest shape used by VS Code and Copilot plugin docs. ([Visual Studio Code][2])

## FR5: Package a curated subset of existing skills

Do not package everything. Package a coherent subset that supports real workflows.

### Required v1 skills

General signage/design:

- `signage-layout-system`
- `signage-animation-system`
- `signage-menu-board`
- `signage-distance-legibility`
- `signage-safe-layout`
- `signage-state-machine`
- `signage-data-refresh-patterns`
- `signage-performance-budget`
- `signage-content-fallbacks`

BrightSign/runtime/deploy:

- `brightsign-runtime`
- `brightsign-package`
- `brightsign-deploy-local`
- `brightsign-fleet-deploy`
- `brightsign-debug`

These align with the existing repo skills inventory and the BrightSign packaging/deploy workflows already described by the repo. ([GitHub][6])

## FR6: Package existing signage architect agent

Reuse the existing `signage-architect.agent.md` as the first packaged agent. The repo already contains it under `.github/agents/`, so use that rather than inventing a duplicate. ([GitHub][1])

## FR7: Add a new deployment-focused agent

Create:

```text
agents/wallrun-deploy.agent.md
```

Purpose:

- guide packaging and deployment for BrightSign
- distinguish between local dev, local player deployment, and fleet deployment
- invoke or recommend `brightsign-runtime`, `brightsign-package`, `brightsign-deploy-local`, and `brightsign-fleet-deploy` when relevant
- refuse to bluff around unavailable credentials, devices, or deployment state

This agent is the missing operational half of the plugin.

### Behaviour requirements for `wallrun-deploy`

It should:

- ask or infer the deployment target
- confirm whether the task is:
  - local preview
  - local BrightSign player iteration
  - staged package generation
  - fleet publication

- recommend the correct WallRun workflow
- guide the user through preflight checks before deploy
- never claim a deploy succeeded unless backed by a real tool result
- prefer build/package guidance over fantasy automation

This agent should be slightly dull in the best possible way. Signage deployment is not the place for improv theatre.

## FR8: Add optional plugin hooks

If included in v1, hooks must be **non-destructive** and advisory only.

Generate:

```text
copilot-plugins/wallrun-signage/hooks.json
```

The VS Code docs specify that for Copilot plugins, `hooks.json` lives at plugin root. ([Visual Studio Code][2])

### Hook purpose

Provide preflight checks for signage and deployment guidance.

### Hook checks

The hook should flag missing or weak assumptions such as:

- target orientation not declared
- resolution or aspect ratio not declared
- no safe-area or overscan handling
- no offline fallback state
- no empty-data fallback state
- vague autoplay assumptions
- implausible asset or media assumptions
- claims of successful deploy without evidence
- hard-coded device details or secrets

The hook should report concerns. It should not silently rewrite code or docs.

## FR9: Add optional plugin-scoped MCP config

WallRun already has a workspace `.vscode/mcp.json` with a documented `brightdeveloper` server. The plugin may also include `.mcp.json` so the same documentation tooling travels with the plugin when installed elsewhere. ([GitHub][3])

Generate:

```text
copilot-plugins/wallrun-signage/.mcp.json
```

Initial v1 content should be conservative:

```json
{
  "mcpServers": {
    "brightdeveloper": {
      "url": "https://brightdeveloper-mcp.bsn.cloud/mcp"
    }
  }
}
```

For v1, this should remain documentation/research-focused. Do not wire destructive deploy actions into plugin MCP yet.

## FR10: Add plugin README

Generate:

```text
copilot-plugins/wallrun-signage/README.md
```

It must cover:

- what the plugin is
- what it packages from WallRun
- how to build it
- how to validate it
- how to install it locally in VS Code
- how it relates to `skills/`, `.github/skills/`, and `.vscode/mcp.json`
- what it does not do yet

---

# Local installation requirements

Document this exact pattern in the plugin README:

```json
"chat.pluginLocations": {
  "/absolute/path/to/WallRun/copilot-plugins/wallrun-signage": true
}
```

VS Code docs show `chat.pluginLocations` as the mechanism for local plugin registration. They also note that plugin support must be enabled and that invalid `name` values can cause silent load failures. ([Visual Studio Code][2])

Also document:

- reload VS Code if the plugin does not appear
- confirm `chat.plugins.enabled` is allowed in the environment
- bump plugin version when testing changes that should be picked up by update logic. ([Visual Studio Code][2])

---

# Non-functional requirements

## NFR1: No breaking changes to existing WallRun workflows

Do not alter:

- repo root `skills/` ownership
- `.github/skills/` mirror process
- existing deploy scripts
- existing workspace MCP config
- existing agent/discovery patterns unless needed for packaging. ([GitHub][3])

## NFR2: No secrets in generated plugin output

The plugin must not include:

- IP addresses
- credentials
- tokens
- customer endpoints
- environment-specific deployment state

## NFR3: Deterministic output

Given unchanged sources, `pnpm plugin:copilot:build` must generate the same plugin artefacts every time.

## NFR4: Narrow, useful scope

Do not try to package every skill in WallRun. The plugin should be coherent, not encyclopaedic.

---

# Implementation plan

## Phase 1: Scaffolding

Build the plugin output directory and manifest generation.

Deliverables:

- `scripts/build-copilot-plugin.mjs`
- `scripts/check-copilot-plugin.mjs`
- `scripts/clean-copilot-plugin.mjs`
- package.json scripts
- generated `plugin.json`
- generated `README.md`

## Phase 2: Curated skills packaging

Copy selected skills from repo `skills/` into the generated plugin.

Deliverables:

- plugin `skills/` directory with curated set
- validation that every included skill has `SKILL.md`

## Phase 3: Agent packaging

Package the existing signage architect agent and add the new deploy agent.

Deliverables:

- `agents/signage-architect.agent.md`
- `agents/wallrun-deploy.agent.md`

## Phase 4: Hooks

Add preflight review hook configuration.

Deliverables:

- `hooks.json`
- optional supporting script under `scripts/plugin-hooks/`

## Phase 5: MCP

Add plugin-scoped `.mcp.json` mirroring the documented `brightdeveloper` server.

Deliverables:

- `.mcp.json`
- documentation explaining its relationship to `.vscode/mcp.json`

---

# Acceptance criteria

This work is done when all of the following are true:

1. `copilot-plugins/wallrun-signage/plugin.json` exists and validates against the documented plugin structure. ([Visual Studio Code][2])
2. `copilot-plugins/wallrun-signage/skills/` contains the curated WallRun skills listed in this spec. ([GitHub][6])
3. `copilot-plugins/wallrun-signage/agents/` contains:
   - `signage-architect.agent.md`
   - `wallrun-deploy.agent.md`

4. `pnpm plugin:copilot:build` generates the plugin deterministically.
5. `pnpm plugin:copilot:check` fails on missing manifest, invalid names, missing agents, missing skills, or broken references.
6. The plugin can be registered locally using `chat.pluginLocations`. ([Visual Studio Code][2])
7. The plugin supports both:
   - signage design and implementation workflows
   - BrightSign packaging and deployment workflows. ([GitHub][1])

8. Existing WallRun `skills/` and `.github/skills/` workflows remain unchanged. ([GitHub][3])
9. No secrets or environment-specific deployment data are committed.

---

# Recommended developer notes

A few opinionated notes for whoever draws the short straw:

- Treat the plugin as a **generated package**, not an authoring surface.
- Keep `wallrun-deploy` strict and practical. It should help people ship to screens, not narrate a fantasy where the screens have already obeyed.
- Keep hooks advisory at first. Nobody enjoys an overconfident robot editor, especially one meddling with deployment guidance.
- Keep plugin MCP conservative. Documentation access is useful. Surprise fleet actions are less charming.

---

# Concise delivery brief

Build a generated Copilot agent-plugin under `copilot-plugins/wallrun-signage/` that packages WallRun’s existing signage and BrightSign skills, reuses the existing signage architect agent, adds a new deployment-focused agent, and optionally includes plugin hooks and plugin-scoped MCP config. Keep repo root `skills/` as source of truth, preserve the `.github/skills/` mirror workflow, and add local scripts to build and validate the plugin. The finished plugin must install locally in VS Code via `chat.pluginLocations` and cover both the creative side of WallRun and the deployment side, because the repo already contains BrightSign packaging and deploy workflows and the plugin should expose them as a coherent tool. ([Visual Studio Code][2])

If you want, I can turn this into a repo-ready markdown file with starter contents for `plugin.json`, `wallrun-deploy.agent.md`, and `hooks.json`.

[1]: https://github.com/CambridgeMonorail/WallRun 'GitHub - CambridgeMonorail/WallRun: Software that lives on walls. · GitHub'
[2]: https://code.visualstudio.com/docs/copilot/customization/agent-plugins 'Agent plugins in VS Code (Preview)'
[3]: https://github.com/CambridgeMonorail/WallRun/blob/main/docs/tooling/github-copilot-tooling.md 'WallRun/docs/tooling/github-copilot-tooling.md at main · CambridgeMonorail/WallRun · GitHub'
[4]: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating 'Creating a plugin for GitHub Copilot CLI - GitHub Docs'
[5]: https://github.com/CambridgeMonorail/WallRun/blob/main/package.json 'WallRun/package.json at main · CambridgeMonorail/WallRun · GitHub'
[6]: https://github.com/CambridgeMonorail/WallRun/blob/main/skills/README.md 'WallRun/skills/README.md at main · CambridgeMonorail/WallRun · GitHub'
