Here is a **repo-ready markdown file** you can drop straight into:

```text
docs/tooling/copilot-agent-plugin-spec.md
```

It includes concrete starter content for `plugin.json`, `wallrun-deploy.agent.md`, and `hooks.json`, plus just enough instruction to build without ambiguity.

---

# Copilot Agent Plugin Spec — WallRun

## Overview

This document defines how to package WallRun as a **GitHub Copilot / VS Code agent-plugin**.

WallRun already contains:

* Source-of-truth skills in `/skills`
* Generated `.github/skills/` mirror
* Existing agents under `.github/agents`
* BrightSign packaging and deployment scripts
* Workspace MCP configuration in `.vscode/mcp.json`

This spec adds a **plugin packaging layer** without modifying those systems.

---

## Goal

Create a generated plugin at:

```text
copilot-plugins/wallrun-signage/
```

This plugin must:

* expose curated WallRun skills
* include agents for architecture and deployment
* support local installation in VS Code
* optionally include hooks and MCP config
* be reproducible via a build script

---

## Non-goals

Do not:

* move or rewrite `/skills`
* modify `.github/skills` workflow
* embed secrets or environment config
* implement real remote deployment actions
* publish to marketplace (yet)

---

## Final Plugin Structure

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
      signage-animation-system/
      signage-menu-board/
      signage-distance-legibility/
      signage-safe-layout/
      signage-state-machine/
      signage-data-refresh-patterns/
      signage-performance-budget/
      signage-content-fallbacks/
      brightsign-runtime/
      brightsign-package/
      brightsign-deploy-local/
      brightsign-fleet-deploy/
      brightsign-debug/
```

---

## Build Pipeline

### Script

```text
scripts/build-copilot-plugin.mjs
```

### Responsibilities

* delete existing plugin directory
* recreate structure
* copy curated skills from `/skills`
* copy agents from `.github/agents`
* generate:

  * `plugin.json`
  * `hooks.json`
  * `.mcp.json`
  * `README.md`
* validate required files exist
* exit non-zero on failure

### Determinism

Running twice with same inputs must produce identical output.

---

## Validation Script

```text
scripts/check-copilot-plugin.mjs
```

### Checks

* `plugin.json` exists
* name is kebab-case
* `skills/` exists and contains `SKILL.md` per folder
* `agents/` exists
* declared paths resolve
* hooks + MCP files exist if declared
* no secrets present

---

## package.json Scripts

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

## plugin.json (starter)

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
  "keywords": [
    "digital-signage",
    "react",
    "brightsign",
    "frontend"
  ],
  "agents": "agents/",
  "skills": "skills/",
  "hooks": "hooks.json",
  "mcpServers": ".mcp.json"
}
```

---

## Agent: wallrun-deploy.agent.md

```md
---
name: wallrun-deploy
description: Plan, validate, and guide packaging and deployment of WallRun signage applications to BrightSign players.
tools: []
---

You are a deployment-focused agent for WallRun.

Your job is to help developers move from "working UI" to "running on a screen".

## Responsibilities

- Identify deployment mode:
  - local preview
  - local BrightSign player
  - packaged output
  - fleet deployment

- Recommend correct workflow using WallRun:
  - brightsign-runtime
  - brightsign-package
  - brightsign-deploy-local
  - brightsign-fleet-deploy

- Run preflight thinking:
  - orientation
  - resolution
  - autoplay assumptions
  - offline fallback
  - startup state
  - asset constraints

## Behaviour rules

- Never claim deployment success without real execution
- Never invent credentials, devices, or endpoints
- Prefer explicit steps over vague summaries
- Ask for missing deployment context when needed

## Tone

Calm, practical, slightly sceptical.

You are not impressed by “it works on my laptop”.
```

---

## hooks.json (starter)

```json
{
  "hooks": {
    "postPrompt": [
      {
        "name": "wallrun-preflight",
        "description": "Validate signage and deployment assumptions",
        "command": "node scripts/plugin-hooks/wallrun-preflight.mjs"
      }
    ]
  }
}
```

---

## Hook Behaviour

The hook must flag:

* missing orientation
* missing resolution
* no safe area handling
* no fallback content
* unclear autoplay assumptions
* unrealistic asset sizes
* claims of deployment without proof
* hardcoded device config

The hook must NOT:

* rewrite code
* execute deployment
* inject content silently

---

## .mcp.json (starter)

```json
{
  "mcpServers": {
    "brightdeveloper": {
      "url": "https://brightdeveloper-mcp.bsn.cloud/mcp"
    }
  }
}
```

### Notes

* mirrors existing workspace MCP
* keeps plugin portable
* no destructive operations in v1

---

## Skills Packaging Rules

* copy from `/skills` only
* do not modify content
* do not hand-edit plugin copies
* curated subset only

---

## Local Installation

Add to VS Code settings:

```json
"chat.pluginLocations": {
  "/absolute/path/to/WallRun/copilot-plugins/wallrun-signage": true
}
```

Then:

* reload VS Code
* ensure plugins enabled
* open Copilot chat
* confirm plugin appears

---

## Acceptance Criteria

The implementation is complete when:

* plugin builds successfully
* plugin validates successfully
* plugin installs locally in VS Code
* agents are usable in chat
* skills are discoverable
* deploy workflows are supported conceptually
* no secrets are committed
* repo structure remains unchanged

---

## Implementation Order

### PR1 — scaffolding

* build script
* plugin.json
* README

### PR2 — skills packaging

### PR3 — agents

* add deploy agent

### PR4 — hooks

### PR5 — MCP

---

## Final Note

This plugin is not “more documentation”.

It is a **bridge between frontend thinking and signage reality**:

* skills → how to build
* agents → how to think
* plugin → how to install
* deploy → how it actually ends up on a wall

Without deploy, it is a nice demo.

With deploy, it becomes a system.

---

If you want next step, I’d suggest:

👉 generating `build-copilot-plugin.mjs` and `check-copilot-plugin.mjs` so your developer can literally copy-paste and run.
