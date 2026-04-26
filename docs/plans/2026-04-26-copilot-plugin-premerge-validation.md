# Pre-Merge Validation Plan: Copilot Plugin Branch

**Branch:** `copilot-plugins`
**Date:** 2026-04-26
**Compared against:** `main`

---

## Goal

Establish a merge gate for the Copilot plugin branch that proves:

- the plugin can be rebuilt from source without manual patching
- the committed plugin output matches its source files
- the new MCP server starts and behaves safely
- the client documentation pages render correctly
- the branch passes the repo's required validation commands

---

## Current Findings

### Merge blockers

1. **Plugin build is currently broken**
   - `pnpm plugin:copilot:build` fails with `SyntaxError: Identifier 'sourceMcpServer' has already been declared`
   - Root cause: duplicated MCP server copy block in `scripts/build-copilot-plugin.mjs`

2. **Repo verification is currently failing before lint/test/build**
   - `pnpm verify` stops at `pnpm format:check`
   - This is a merge blocker because repo policy requires `verify` before completion

### Validation gaps

1. **No automated tests were added in this branch**
   - The branch adds build scripts, validation scripts, a plugin package, an MCP server, and UI/docs changes, but no `*.test.*` or `*.spec.*` files changed

2. **Plugin structural validation is necessary but insufficient**
   - `pnpm plugin:copilot:check` passes
   - It validates structure and obvious secret patterns, but it does not prove the build script runs successfully or that runtime entrypoints can start

3. **Generated output drift must be checked explicitly**
   - The plugin bundles generated copies of agents, skills, hooks, and the MCP server
   - A clean rebuild plus diff check is required before merge

---

## Risk Areas

### 1. Packaging pipeline

Files:

- `scripts/build-copilot-plugin.mjs`
- `scripts/check-copilot-plugin.mjs`
- `scripts/clean-copilot-plugin.mjs`
- `package.json`

Primary risks:

- build script syntax or path errors
- generated manifest shape drifting from VS Code expectations
- plugin output not matching source-of-truth skills and agents

### 2. MCP server runtime

Files:

- `tools/player-mcp-server/server.mjs`
- `copilot-plugins/wallrun-signage/servers/player-tools.mjs`
- `copilot-plugins/wallrun-signage/.mcp.json`

Primary risks:

- stdio server fails to start under Node
- tool contract mismatch in plugin copy
- path assumptions fail when installed from plugin directory

### 3. Hook wiring

Files:

- `scripts/plugin-hooks/wallrun-preflight.mjs`
- `copilot-plugins/wallrun-signage/scripts/wallrun-preflight.mjs`
- `copilot-plugins/wallrun-signage/hooks.json`

Primary risks:

- hook path mismatch
- script exits non-zero unexpectedly in plugin context

### 4. Client documentation surface

Files:

- `apps/client/src/app/pages/how-to/CustomAgents.tsx`
- `apps/client/src/app/pages/tooling/Tooling.tsx`

Primary risks:

- broken links or layout regressions on the docs pages
- stale product claims about plugin contents or install steps

---

## Validation Sequence

### Phase 1: Restore a green packaging path

This phase must pass before any manual install testing.

Commands:

```bash
pnpm plugin:copilot:build
pnpm plugin:copilot:check
```

Acceptance criteria:

- `plugin:copilot:build` exits 0
- `plugin:copilot:check` exits 0 immediately after a clean build
- `copilot-plugins/wallrun-signage/plugin.json` exists and still references `agents/`, `skills/`, `hooks.json`, and `.mcp.json`

### Phase 2: Prove generated output is deterministic

Commands:

```bash
pnpm plugin:copilot:clean
pnpm plugin:copilot:build
git diff --exit-code -- copilot-plugins/wallrun-signage
```

Acceptance criteria:

- rebuild produces no diff in `copilot-plugins/wallrun-signage`
- generated plugin copy of the MCP server matches `tools/player-mcp-server/server.mjs`
- generated plugin hook script matches `scripts/plugin-hooks/wallrun-preflight.mjs`

### Phase 3: Validate repo-level merge gate

Commands:

```bash
pnpm verify
```

Acceptance criteria:

- format check passes
- affected lint passes
- affected type-check passes
- affected tests pass
- affected build passes

Note:

- If `verify` fails only because the affected graph misses the plugin scripts, keep `verify` as required and retain the plugin-specific checks from Phases 1 and 2 as an additional merge gate.

### Phase 4: Runtime smoke for MCP server

Commands:

```bash
node tools/player-mcp-server/server.mjs
node copilot-plugins/wallrun-signage/servers/player-tools.mjs
```

Acceptance criteria:

- both entrypoints start without immediate syntax or import failures
- both processes can be terminated cleanly after startup smoke
- plugin copy does not rely on repo-only relative paths for startup

Recommended follow-up smoke:

- exercise one safe, local-only MCP request against each server entrypoint if an MCP client is available
- confirm no credentials are emitted in normal error output

### Phase 5: VS Code install and UX smoke

Manual checks:

1. Install the plugin from local path using `chat.pluginLocations`
2. Reload VS Code and confirm the plugin is discovered
3. Confirm both bundled agents appear
4. Confirm curated skills are available
5. Confirm the plugin-scoped MCP configuration is recognized
6. Confirm the advisory hook does not interrupt normal chat flow

Acceptance criteria:

- plugin is discoverable from the committed directory
- agents and skills are visible and usable
- no startup errors from the plugin MCP server
- no blocking hook failures

### Phase 6: Client docs smoke

Commands:

```bash
pnpm serve:client
```

Manual checks:

1. Open `/how-to/custom-agents`
2. Open `/tooling`
3. Verify the new Copilot plugin section renders cleanly on desktop and mobile width
4. Verify external documentation links resolve correctly
5. Verify the text claims match the current plugin contents: 14 skills, 2 agents, hooks, MCP server guide

Acceptance criteria:

- no runtime errors in the client app for these pages
- layout remains readable and accessible
- docs copy matches the shipped plugin contents

---

## Recommended Merge Gate

Do not merge until all of the following are true:

1. `pnpm plugin:copilot:build` passes
2. `pnpm plugin:copilot:check` passes after a fresh build
3. rebuild is deterministic with no diff in `copilot-plugins/wallrun-signage`
4. `pnpm verify` passes
5. both MCP server entrypoints start successfully
6. plugin install smoke passes in VS Code Insiders
7. client docs smoke passes for `/how-to/custom-agents` and `/tooling`

---

## Execution Order

1. Fix the packaging blocker in `scripts/build-copilot-plugin.mjs`
2. Re-run Phases 1 and 2
3. Fix any `pnpm verify` failures
4. Run MCP runtime smoke
5. Run VS Code plugin install smoke
6. Run client docs smoke
7. Merge only after all gates are green

---

## Evidence To Capture In The PR

- output of `pnpm plugin:copilot:build`
- output of `pnpm plugin:copilot:check`
- proof that rebuild is deterministic
- output of `pnpm verify`
- note confirming MCP server startup smoke passed
- screenshots or short notes for the two client docs pages
- note confirming VS Code Insiders plugin install succeeded
