# Add Player App Generator

**Date:** 2026-03-12
**Author:** GitHub Copilot
**Status:** Implemented

## Context

The repository now has a working script-based scaffold for BrightSign player apps built around `apps/player-minimal`, but a new architecture request asks for an Nx-native generator. The original request document assumed a more generic signage-app workflow and referenced a non-existent `player-minimal-demo` base app.

The current repo shape matters:

- player apps are template-driven and BrightSign-specific
- `scripts/scaffold-player-app.mjs` already encodes project naming, port assignment, README generation, and optional cleanup
- `apps/player-minimal/project.json` now includes app-local `package`, `deploy-local`, `deploy`, and `type-check` targets
- player runtime configuration currently uses `src/config.ts` with `displayOrientation`, not `screen.config.ts` with `orientation`/`rotation`/`resolution`
- `@nx/plugin` is not currently installed

The generator should therefore fit the existing player scaffold model instead of replacing it with a generic React application workflow that would drift immediately.

## Goals

- Add a repo-local Nx generator for creating new BrightSign player apps.
- Keep generated apps consistent with the existing `player-minimal` scaffold contract.
- Preserve current BrightSign-specific behavior: build config, package/deploy targets, README generation, and port assignment.
- Avoid duplicating business logic between the Nx generator and the existing script-based scaffold.
- Document the final generator usage so architects and developers can use it without knowing the repo internals.

## Non-Goals

- Replacing the player runtime config model with a new `screen.config.ts` system in v1.
- Introducing a generic signage-app abstraction that ignores current `player-*` conventions.
- Removing the existing `pnpm scaffold:player` script immediately.
- Solving layout presets, CMS integration, or full signage design-system generation in the first pass.

## Approach

Create a repo-local Nx plugin and add a `player-app` generator that produces the same app shape as the current script scaffold.

The generator should be opinionated around the current repository conventions:

- app names must follow `player-*`
- the template source remains `apps/player-minimal`
- port selection follows the current 42xx strategy
- `project.json` targets match the package/deploy model already in the repo
- runtime config continues to use `displayOrientation`

Rather than generating a fresh React app through `@nx/react:application` and then trying to retrofit BrightSign-specific behavior, the generator should scaffold from the current player template contract or shared template helpers derived from it.

The existing CLI scaffold should remain in place during rollout. If practical, shared normalization and replacement logic should be extracted into reusable helpers so both the CLI and the Nx generator stay aligned.

## Tasks

- [x] Task 1: Introduce Nx plugin support for a local player-app generator
  - Acceptance criteria: `@nx/plugin` is installed and a repo-local plugin exists in `tools/` for internal generator code.
  - Files affected: `package.json`, `pnpm-lock.yaml`, generated plugin files under `tools/`
  - Commands to run:
    - `pnpm nx add @nx/plugin`
    - `pnpm nx g @nx/plugin:plugin tools/wallrun`
  - Expected result: the workspace can host a first-class local Nx generator.

- [x] Task 2: Define the generator API that matches the current player scaffold
  - Acceptance criteria: the generator schema uses repo-accurate options and names, with `name` required and player-specific options aligned to current runtime behavior.
  - Files affected: plugin generator schema files under `tools/wallrun/**`, supporting docs
  - Commands to run:
    - `pnpm nx g <local-plugin>:player-app --help`
  - Expected result: the generator exposes an API that fits the repo as it exists today.

- [x] Task 3: Extract or centralize shared scaffold normalization logic
  - Acceptance criteria: app-name validation, path rules, port selection, and template replacement rules are not duplicated in incompatible ways between the CLI scaffold and the Nx generator.
  - Files affected: `scripts/scaffold-player-app.mjs`, `scripts/player-app-utils.mjs`, new shared helpers as needed, plugin generator files
  - Commands to run:
    - `pnpm scaffold:player --help`
    - `pnpm nx g <local-plugin>:player-app --help`
  - Expected result: both entry points produce equivalent normalized inputs.

- [x] Task 4: Implement the player-app generator using the current template contract
  - Acceptance criteria: the generator creates a new `apps/player-*` app that matches the current player template expectations, including README, Vite config, runtime config, and app-local Nx targets.
  - Files affected: generator implementation under `tools/wallrun/**`, possibly `apps/player-minimal/TEMPLATE_CONTRACT.md` if clarifications are needed
  - Commands to run:
    - `pnpm nx g <local-plugin>:player-app --name player-generator-smoke`
  - Expected result: Nx-native generation produces the same effective scaffold shape as the existing script.

- [x] Task 5: Decide and implement coexistence with the existing CLI scaffold
  - Acceptance criteria: either the script remains a supported parallel entry point or becomes a compatibility wrapper around the generator, with docs reflecting the chosen ownership model.
  - Files affected: `scripts/scaffold-player-app.mjs`, `package.json`, plugin docs, generator docs
  - Commands to run:
    - `pnpm scaffold:player --name player-cli-smoke`
    - `pnpm nx g <local-plugin>:player-app --name player-nx-smoke`
  - Expected result: users have a clear, non-conflicting way to scaffold apps.

- [x] Task 6: Document the generator and validate both scaffold paths
  - Acceptance criteria: docs explain when to use the Nx generator versus the CLI script, and smoke-generated apps can type-check, build, and package successfully.
  - Files affected: `docs/new-features/generator.md`, `README.md`, player scaffolding docs, plugin README if generated
  - Commands to run:
    - `pnpm nx g <local-plugin>:player-app --name player-docs-smoke`
    - `pnpm nx run player-docs-smoke:type-check`
    - `pnpm nx build player-docs-smoke`
    - `pnpm nx run player-docs-smoke:package`
  - Expected result: the generator is documented, demonstrable, and aligned with current repo workflows.

## Testing Strategy

- Generate at least one disposable player app through the Nx generator and verify the app directory, port assignment, README, and `project.json` targets.
- Compare a generator-produced app against one created through `pnpm scaffold:player` to confirm the scaffold shapes are equivalent where intended.
- Run `type-check`, `build`, and `package` for the generated app.
- Run `pnpm verify` before the feature is considered ready for review.

## Implementation Notes

- Added a repo-local Nx plugin at `tools/wallrun` with a `player-app` generator.
- Implemented generator output by copying from `apps/player-minimal` and applying repo-specific replacements for app name, port, tags, README, and `displayOrientation`.
- Converted `scripts/scaffold-player-app.mjs` into a compatibility wrapper around `pnpm nx g wallrun:player-app`.
- Preserved `--force` behavior and fixed forced regeneration so it reuses the existing target app's auto-selected port.
- Updated packaging and scaffold wrapper scripts to invoke the local pnpm CLI through Node for reliable Windows execution.
- Validated the generator with `pnpm nx test sign-age`, direct generator smoke generation, `type-check`, `build`, `package`, and wrapper-based regeneration.

## Risks and Trade-offs

- If the generator composes `@nx/react:application` directly, it will likely drift from the BrightSign-specific scaffold and create ongoing maintenance debt.
- If the generator and the existing script each keep their own copy of normalization logic, they will diverge over time.
- If v1 tries to introduce `screen.config.ts`, `resolution`, and a new orientation model at the same time, the scope will widen into a runtime redesign rather than a generator feature.
- Adding a local Nx plugin introduces workspace codegen complexity, but that is the correct trade-off if the team wants `nx g` support.

## Dependencies

- `@nx/plugin` must be added to the workspace.
- The current `player-minimal` template contract remains the source of truth until a dedicated template directory is deliberately introduced.
- The package/deploy script contract added in the recent scaffold work remains stable.

## Open Questions

- What should the final generator collection name be after Nx scaffolds the local plugin?
- Should the CLI script remain first-class, or should it eventually become a thin wrapper around `nx g`?
- Do architects want `orientation`/`rotation`/`resolution` preserved as generator inputs immediately, or should v1 stick to the existing `displayOrientation` runtime model?

## Rollback Plan

- Revert the local Nx plugin and generator files.
- Keep `pnpm scaffold:player` as the primary supported scaffold path.
- Remove any docs that advertise the new generator if rollout needs to be deferred.
