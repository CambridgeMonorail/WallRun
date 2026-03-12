# Player App Scaffolding Improvements

**Date:** 2026-03-11
**Author:** GitHub Copilot
**Status:** In Progress

## Context

Creating a new BrightSign player app currently depends on copying `apps/player-minimal` by hand and then renaming project-specific references across config, output paths, and docs. The attached learnings are consistent with the current repository state:

- `apps/player-minimal/project.json` has no explicit `type-check` or packaging targets.
- `apps/player-minimal/vite.config.mts` hardcodes port `4200`, cache paths, dist paths, and coverage paths.
- `scripts/package-player.mjs` is hardcoded to build and package `player-minimal` only.
- `apps/player-minimal/README.md` is demo-specific, which makes copy-based scaffolding drift immediately.

The main workflow gap is not just speed; it is repeatability. Manual copy-and-replace makes it easy to miss project names, ports, or packaging paths, which then leaks into verification and deployment steps.

## Review Summary

The suggested improvements are directionally correct, but they should be implemented in phases:

1. A scaffold script is the highest-value change and should come before an Nx generator. The repo does not currently have a local Nx plugin or generator infrastructure, so a script is the smallest reliable step.
2. Port allocation should be automatic, but it should remain overridable so apps can still pin a known port when needed.
3. Missing `type-check` support is a real workflow bug because `pnpm verify` depends on affected `type-check` targets.
4. App-specific packaging is worth doing, but it is better expressed as an app-aware packaging script plus Nx targets rather than a growing list of root-level per-app scripts.
5. README drift is a symptom of using a demo app as a template without template tokens or a dedicated template contract.

## Goals

- Add a repeatable way to scaffold a new player app from the current BrightSign-ready baseline.
- Eliminate manual renaming of project identifiers, output paths, and port assignments.
- Ensure newly scaffolded player apps participate cleanly in Nx verification, especially `type-check`.
- Make packaging and deployment target a specific player app without breaking existing workflows.
- Document the scaffolded app contract so future template changes stay intentional.

## Non-Goals

- Building a full custom Nx plugin or published generator in the first iteration.
- Redesigning the runtime architecture of player apps.
- Refactoring unrelated apps or libraries.
- Solving fleet deployment or release management in this change set.

## Recommended Approach

Use `apps/player-minimal` as the initial template source, but make that role explicit by introducing a script-driven scaffold flow and replacing fragile copy-and-edit work with deterministic token updates.

Phase the work so the repo gets value quickly:

- First normalize the template surface: add the missing Nx targets, identify which files are required for all player apps, and decide which demo-specific files should be optional.
- Then add `scripts/scaffold-player-app.mjs` to copy the template, assign a port, replace project-specific references, and optionally remove demo-only files such as `StatusPage.tsx`.
- After scaffolding works, generalize packaging so `package-player.mjs` and deployment commands can target any player app by name.
- Finish by documenting the workflow and validation steps.

If this flow proves stable and more scaffolds are needed later, it can be moved behind a formal Nx generator. That should be a second-step optimization, not the initial delivery.

## Tasks

- [x] Task 1: Define the player-app template contract
  - Acceptance criteria: the team has an explicit list of which files in `apps/player-minimal` are mandatory template inputs, which files are optional demo content, and which strings are canonical replacement targets.
  - Files affected: `apps/player-minimal/project.json`, `apps/player-minimal/vite.config.mts`, `apps/player-minimal/README.md`, `apps/player-minimal/src/**/*`, `apps/player-minimal/public/**/*`
  - Commands to run:
    - `rg -n "player-minimal|4200|dist/apps/player-minimal|coverage/apps/player-minimal" apps/player-minimal`
  - Expected result: a complete inventory of scaffold-time substitutions and cleanup decisions.

- [x] Task 2: Add missing Nx targets to the player app template
  - Acceptance criteria: `player-minimal` exposes at least `type-check`, and preferably app-local `package` and `deploy-local` run-command targets that future scaffolds inherit.
  - Files affected: `apps/player-minimal/project.json`, possibly `package.json` if compatibility wrappers are needed
  - Commands to run:
    - `pnpm nx show project player-minimal`
    - `pnpm nx run player-minimal:type-check`
  - Expected result: new player apps work with affected verification and do not require special-case knowledge.

- [x] Task 3: Implement a script-first scaffolder
  - Acceptance criteria: `scripts/scaffold-player-app.mjs` can create a new app directory from the template, rename project references, update README placeholders, and choose the next available dev port automatically.
  - Files affected: `scripts/scaffold-player-app.mjs`, `package.json`
  - Commands to run:
    - `node scripts/scaffold-player-app.mjs --name player-sample`
    - `node scripts/scaffold-player-app.mjs --name player-sample --port 4207`
  - Expected result: a newly generated app contains correct Nx/Vite/docs references with no manual search-and-replace step.

- [x] Task 4: Implement port discovery and override rules
  - Acceptance criteria: the scaffolder scans existing player app Vite configs, selects the next free port in the repository’s chosen range, and allows `--port` to override auto-assignment.
  - Files affected: `scripts/scaffold-player-app.mjs`, documentation for the workflow
  - Commands to run:
    - `rg -n "port:" apps/*/vite.config.*`
    - `node scripts/scaffold-player-app.mjs --name player-port-check`
  - Expected result: new apps do not collide on `serve` or `preview` by default.

- [x] Task 5: Generalize packaging and deployment to target an app name
  - Acceptance criteria: packaging accepts an app/project argument, derives source and dist paths from that app, and can be invoked through Nx targets such as `nx run <app>:package`.
  - Files affected: `scripts/package-player.mjs`, `scripts/deploy-local.mjs`, `apps/player-minimal/project.json`, scaffold output for new apps, possibly `package.json` for backward-compatible root scripts
  - Commands to run:
    - `node scripts/package-player.mjs --app player-minimal`
    - `pnpm nx run player-minimal:package`
  - Expected result: packaging is no longer locked to one demo app, while existing root commands can continue to default to `player-minimal` if needed.

- [x] Task 6: Reduce README and demo-content drift
  - Acceptance criteria: the scaffold flow writes an app-appropriate README from placeholders or a template fragment, and optional demo-only files can be excluded by flag instead of manual deletion.
  - Files affected: `apps/player-minimal/README.md`, `scripts/scaffold-player-app.mjs`, optional template metadata file if needed
  - Commands to run:
    - `node scripts/scaffold-player-app.mjs --name player-menu --no-status-page`
  - Expected result: generated apps start from neutral documentation and content rather than inheriting a stale demo description.

- [x] Task 7: Document and verify the workflow
  - Acceptance criteria: repository docs explain how to scaffold, verify, package, and deploy a player app; targeted validation passes for both the template app and one generated example.
  - Files affected: `README.md`, `apps/player-minimal/README.md`, `apps/player-minimal/project.json`, relevant docs under `docs/`
  - Commands to run:
    - `pnpm nx run player-minimal:type-check`
    - `pnpm verify`
    - `pnpm nx run <generated-app>:type-check`
    - `pnpm nx build <generated-app>`
  - Expected result: the new workflow is documented, testable, and ready for future app creation without ad hoc tribal knowledge.

## Testing Strategy

- Use the scaffold script to generate a disposable sample app and confirm project-name replacement, path replacement, and port assignment.
- Run targeted Nx validation on the generated app: `type-check`, `build`, and, if present, `test`.
- Run packaging for both `player-minimal` and one generated app to confirm the generalized script does not regress the current default path.
- Run `pnpm verify` before merge so affected lint, type-check, test, and build workflows are exercised.

## Risks and Trade-offs

- Using `apps/player-minimal` as both a runnable demo and a template source can still cause drift if the app becomes more specialized. The initial mitigation is to define the template contract clearly; the later fallback is a dedicated template directory.
- String replacement can become brittle if project identifiers are embedded in new files without being added to the scaffold inventory. A constrained replacement list is safer than blind repo-wide replacement.
- Packaging changes touch deployment workflow, so backward compatibility matters. Root scripts should either keep default behavior for `player-minimal` or fail with a clear missing-app message.
- Optional cleanup flags such as `--no-status-page` are useful, but too many flags will turn the scaffold script into an unmaintainable template engine. Keep the first version narrow.

## Dependencies

- Current inferred Nx build and serve targets for Vite-based apps remain available.
- `player-minimal` stays the baseline until a dedicated player template is justified.
- The packaging workflow continues to rely on the existing BrightSign build output structure under `dist/apps/<app>`.

## Open Questions

- Should the first version scaffold only from `player-minimal`, or should the repository introduce a dedicated hidden template directory immediately?
- Should app-aware packaging be exposed only as Nx targets, or should root-level convenience scripts also accept `--app` for direct use?
- Is `StatusPage.tsx` the only demo-specific file worth making optional, or should the first version keep all content and limit itself to naming, ports, and targets?

## Rollback Plan

- Revert the scaffold script and any packaging argument changes.
- Keep `player-minimal` runnable with its existing root scripts.
- If app-aware packaging proves unstable, preserve the default `player-minimal` packaging path and defer generalized targeting to a follow-up.

## Completion Notes

- Added an explicit `type-check` target to `apps/player-minimal/project.json` so player apps can participate in affected verification.
- Documented the current template contract in `apps/player-minimal/TEMPLATE_CONTRACT.md` to make scaffold-time substitutions and optional demo content explicit before script work begins.
- Added `scripts/scaffold-player-app.mjs` and `pnpm scaffold:player` to create new player apps from `player-minimal` with deterministic name/path replacement.
- The scaffold flow now auto-selects the next free 42xx Vite port, supports explicit `--port` overrides, generates a neutral app README, and can remove `StatusPage.tsx` with `--no-status-page`.
- Generalized package and deploy scripts to accept `--app`, added app-local Nx `package`, `deploy-local`, and `deploy` targets, and kept the root deploy entrypoint available through `pnpm deploy:player`.
- Updated the core BrightSign docs to show app-aware package and deploy commands, plus CLI help output for the new script interfaces.
