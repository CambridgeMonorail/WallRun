# Implementation Plan: Copilot Agent Plugin for WallRun

**Branch:** `copilot-plugins`
**Date:** 2026-04-17
**Source docs:** `docs/new features/copilot-plugin/`

---

## Accuracy Review — Spec vs. Repo Reality

Before implementation, the architect's spec was cross-referenced against the actual repo state. Below are the discrepancies and decisions required.

### ✅ Confirmed accurate

| Claim | Reality |
|---|---|
| `skills/` is source of truth, `.github/skills/` is generated mirror | Correct — `sync:skills` and `check:skills` scripts exist |
| All 14 curated skills exist in `skills/` | Confirmed — every skill directory and SKILL.md is present |
| `signage-architect.agent.md` exists in `.github/agents/` | Confirmed |
| `.vscode/mcp.json` has `brightdeveloper` server | Confirmed — uses `"type": "http"` + `"url"` |
| `package.json` has `sync:skills`, `deploy:local`, `deploy:player` | Confirmed |
| `copilot-plugins/` does not exist yet | Confirmed |
| No `plugin:copilot:*` scripts in `package.json` yet | Confirmed |

### ⚠️ Discrepancies requiring decisions

| # | Issue | Detail | Recommendation |
|---|---|---|---|
| D1 | **Existing deploy agent overlap** | Spec says create new `wallrun-deploy.agent.md`. But `.github/agents/brightsign-deploy.agent.md` already exists with significant overlap (packaging, local deploy, fleet deploy, debugging). | **RESOLVED:** Created `wallrun-deploy.agent.md` as a **triage/guidance agent** that identifies the right deployment path and hands off to the existing `BrightSign Deploy` agent for execution. This avoids duplication — wallrun-deploy plans, brightsign-deploy executes. |
| D2 | **Agent frontmatter fields** | Existing `signage-architect.agent.md` has `tools`, `model`, `target`, and `handoffs` fields. The spec doesn't mention whether these should be preserved or stripped for the plugin copy. | **Recommend:** Preserve as-is during copy. If plugin format doesn't support them, they'll be ignored. Stripping them risks losing behaviour. |
| D3 | **MCP config shape mismatch** | Spec's `.mcp.json` uses `{ "mcpServers": { "brightdeveloper": { "url": "..." } } }`. Actual `.vscode/mcp.json` uses `{ "servers": { "brightdeveloper": { "type": "http", "url": "..." } } }`. | **Recommend:** Use the plugin format (`mcpServers` key) as specified — this is the plugin-scoped schema, not the workspace schema. Correct as written. |
| D4 | **`copilot-plugins/` not in `.gitignore`** | Spec says the plugin is a generated artefact. Generated outputs should typically be gitignored. But the spec also implies it should be committed (for local install). | **RESOLVED:** Committed to the repo. The plugin must be committed so it can be installed via VS Code's "Install Plugin From Source" (which clones the repo) and via marketplace distribution (which references plugin dirs by relative path). After regenerating, commit the output. |
| D5 | **Hooks are speculative** | `hooks.json` references `postPrompt` hooks with a `command` field. The VS Code plugin hook API shape is preview and may change. The starter script is a no-op stub. | **Recommend:** Implement as written (it's harmless), but flag as experimental in README. Don't block other work on hook correctness. |
| D6 | **`verify` script not updated** | Spec doesn't mention adding `plugin:copilot:check` to the `verify` or `precommit` pipeline. | **Recommend:** Don't add to `verify` yet. The plugin is optional. Add a note in README about manual validation. |

---

## Phased Implementation Plan

### Phase 0: Pre-work (blockers for everything else)

**Parallel:** No — must be done first.
**Effort:** Small

| Task | Description | Status |
|---|---|---|
| 0.1 | Resolve D1 — decide deploy agent strategy | ✅ |
| 0.2 | Resolve D4 — decide gitignore strategy | ✅ |
| 0.3 | Create branch (done: `copilot-plugins`) | ✅ |

---

### Phase 1: Build Pipeline + Manifest (FR1, FR3, FR4)

**Depends on:** Phase 0
**Parallel with:** Nothing — this is the foundation

| Task | File | Description | Status |
|---|---|---|---|
| 1.1 | `scripts/build-copilot-plugin.mjs` | Build script: clean, scaffold dirs, copy skills + agents, generate plugin.json / README / hooks.json / .mcp.json | ✅ |
| 1.2 | `scripts/clean-copilot-plugin.mjs` | Clean script: `rm -rf copilot-plugins/wallrun-signage` | ✅ |
| 1.3 | `package.json` | Add `plugin:copilot:build`, `plugin:copilot:check`, `plugin:copilot:clean` scripts | ✅ |
| 1.4 | `.gitignore` | Add `copilot-plugins/` entry (if D4 resolved as gitignore) | ✅ |
| 1.5 | Run build, verify output structure | Manual smoke test | ✅ |

**PR1 could ship here** — build + clean + manifest.

---

### Phase 2: Validation Pipeline (FR2)

**Depends on:** Phase 1 (needs build output to validate against)
**Parallel with:** Phase 3 (agents can be worked on in parallel if build script is done)

| Task | File | Description | Status |
|---|---|---|---|
| 2.1 | `scripts/check-copilot-plugin.mjs` | Validation: plugin.json exists, kebab-case name, skills have SKILL.md, agents exist, hooks/mcp files exist if declared, no secrets | ✅ |
| 2.2 | Run `pnpm plugin:copilot:check` against build output | Verify it passes cleanly | ✅ |
| 2.3 | Introduce intentional errors, verify check catches them | Negative testing | ☐ |

**PR2 could ship here** — validation script.

---

### Phase 3: Deploy Agent (FR7)

**Depends on:** Phase 0 (D1 decision)
**Parallel with:** Phase 2

| Task | File | Description | Status |
|---|---|---|---|
| 3.1 | `.github/agents/wallrun-deploy.agent.md` | Create or adapt deploy agent (based on D1 decision) | ✅ |
| 3.2 | Update `curatedAgentNames` in build script | Ensure agent is included in build | ✅ |
| 3.3 | Rebuild + revalidate | Verify agent appears in plugin output | ✅ |

**PR3 could ship here** — deploy agent.

---

### Phase 4: Hooks (FR8)

**Depends on:** Phase 1 (build script generates hooks.json)
**Parallel with:** Phase 5

| Task | File | Description | Status |
|---|---|---|---|
| 4.1 | `scripts/plugin-hooks/wallrun-preflight.mjs` | Advisory-only preflight stub | ✅ |
| 4.2 | Verify hooks.json references correct path | Check build output | ✅ |
| 4.3 | Flag as experimental in README | Documentation | ✅ |

**PR4 could ship here** — hooks support.

---

### Phase 5: MCP Config (FR9)

**Depends on:** Phase 1 (build script generates .mcp.json)
**Parallel with:** Phase 4

| Task | File | Description | Status |
|---|---|---|---|
| 5.1 | Verify `.mcp.json` in build output matches spec | Confirm `mcpServers` shape | ✅ |
| 5.2 | Add relationship note to README | Explain `.mcp.json` vs `.vscode/mcp.json` | ✅ |

**PR5 could ship here** — MCP config.

---

### Phase 6: Integration + README (FR10)

**Depends on:** All above phases
**Parallel:** No

| Task | File | Description | Status |
|---|---|---|---|
| 6.1 | Verify full `pnpm plugin:copilot:build && pnpm plugin:copilot:check` passes | End-to-end | ✅ |
| 6.2 | Test local install via `chat.pluginLocations` in VS Code | Manual verification | ☐ |
| 6.3 | Final README review | Covers build, validate, install, relationship to source skills | ✅ |
| 6.4 | Determinism test — run build twice, diff output | Must be identical | ✅ |

---

## Dependency Graph

```
Phase 0 (decisions)
  │
  ├──► Phase 1 (build + manifest)
  │      │
  │      ├──► Phase 2 (validation)    ─┐
  │      ├──► Phase 4 (hooks)          │── can run in parallel
  │      └──► Phase 5 (MCP)           ─┘
  │
  └──► Phase 3 (deploy agent) ← needs D1 decision + build script from Phase 1
         │
         └──► Phase 6 (integration)  ← needs all above
```

---

## PR Strategy

The spec suggests 5 PRs. Given the dependency graph, I recommend:

| PR | Content | Phases | Can merge independently? |
|---|---|---|---|
| PR1 | Build script + clean script + manifest + package.json scripts + .gitignore | 1 | ✅ Yes |
| PR2 | Validation script | 2 | ✅ Yes (needs PR1 merged first) |
| PR3 | Deploy agent + build script update | 3 | ✅ Yes (needs PR1 merged first) |
| PR4 | Hooks stub | 4 | ✅ Yes (needs PR1 merged first) |
| PR5 | Integration test + README polish + MCP docs | 5, 6 | ✅ Yes (needs all above) |

PRs 2, 3, and 4 can be developed in parallel after PR1 merges.

---

## What the starter code gets right

The starter files in `starter files.md` are well-structured and mostly copy-paste ready. Specifically:

- `build-copilot-plugin.mjs` — solid, handles skill validation, frontmatter checks, idempotent rebuild
- `check-copilot-plugin.mjs` — good coverage, secrets scanning is a nice touch
- `clean-copilot-plugin.mjs` — trivial, correct
- `wallrun-deploy.agent.md` — reasonable but see D1 above
- `wallrun-preflight.mjs` — correctly conservative stub
- `plugin.json` shape — matches documented format

## What needs adjustment before using starter code

1. **D1 deploy agent** — existing `brightsign-deploy.agent.md` is richer; use it as the base
2. **Build script hardcodes `wallrun-deploy.agent.md`** — agent may not exist yet if D1 changes the name
3. **No test coverage** — spec doesn't mention tests for the build/check scripts; recommend at minimum a smoke test that builds and validates in CI
4. **`copilot-plugins/` not in `.gitignore`** — must be added if we treat it as generated

---

## Progress Tracking

This plan lives at `docs/plans/2026-04-17-copilot-plugin.md`.

Update the status column (☐ → 🔄 → ✅) as tasks complete. Each PR should reference this plan and note which phase/tasks it addresses.

Phase 0 decisions should be resolved before any code is written.
