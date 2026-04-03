# Nx Generator Request Review

## Status

This request is directionally valid, but the original proposal is not fully aligned with the current state of the repository.

The repository now already has a working player-app scaffold flow based on `apps/player-minimal` and the following supporting pieces:

- `scripts/scaffold-player-app.mjs` for script-driven app creation
- `apps/player-minimal/TEMPLATE_CONTRACT.md` describing the template boundary
- app-aware packaging and deployment scripts
- app-local Nx targets for `package`, `deploy-local`, `deploy`, and `type-check`

Because of that, the right generator for this repo is not a fresh React/Vite app generator layered with generic signage files. It should be an Nx-native front end for the existing BrightSign player-app scaffold model.

## Corrections To The Original Request

### Template Source

The existing template app is `apps/player-minimal`, not `player-minimal-demo`.

### Current Runtime Model

The player scaffold currently uses `src/config.ts` with `displayOrientation` values:

- `landscape`
- `portrait-left`
- `portrait-right`
- `inverted`

The repo does not currently use a `screen.config.ts` file or a width/height `resolution` model in the player runtime.

### Existing Scaffolding Logic

The current scaffold flow already handles repo-specific concerns that a generic Nx React generator would miss:

- project naming rules (`player-*`)
- Vite cache, build, and coverage paths
- auto-selected dev ports in the 42xx range
- player README generation
- optional demo-file cleanup
- BrightSign package and deploy wiring
- app-local Nx targets in `project.json`

### Nx Plugin State

Nx local plugins are a good fit here, but `@nx/plugin` is not currently installed in the workspace. That needs to be introduced as part of the feature.

## Recommended Generator Direction

Implement a repo-local Nx generator, but make it fit the existing player-app model.

### Generator Purpose

The generator should create a new `apps/player-*` BrightSign player app that matches the current scaffolded app shape already supported by the repository.

### Recommended V1 Generator Name

Use a player-specific generator name such as `player-app`, not a generic `signage-app` name.

That matches the current app naming and packaging/deployment model:

- apps are named `player-*`
- the template is `player-minimal`
- the existing CLI is `scaffold:player`

### Recommended V1 Inputs

Use options that map cleanly onto the current codebase:

- `name` required, validated as `player-*`
- `port` optional, otherwise auto-assign from the current 42xx strategy
- `displayOrientation` optional, defaulting to the current player template default
- `noStatusPage` optional, matching the current scaffold script behavior
- `tags` optional, if the team wants Nx tags on generated apps

### Inputs To Defer Or Reframe

The original `orientation`, `rotation`, and `resolution` proposal is not a clean fit for the current runtime yet.

- `rotation` currently maps to `displayOrientation`, not a separate runtime field
- `resolution` is not used anywhere in the current player app scaffold
- adding `screen.config.ts` would be a separate runtime/model decision, not just a generator feature

If the architect wants those concepts preserved, they should be treated as a follow-up design task or translated into the current `displayOrientation` model explicitly.

## Recommended Implementation Shape

### Plugin

Create a repo-local Nx plugin under `tools/wallrun` or a similarly named internal workspace plugin.

### Generator Strategy

The generator should be built around the existing `player-minimal` template contract rather than around `@nx/react:application` output.

That means:

1. reuse the current player template model
2. preserve the BrightSign-safe Vite config and packaging hooks
3. preserve app-local Nx targets
4. preserve port assignment and README generation

### Compatibility Strategy

Do not remove `scripts/scaffold-player-app.mjs` immediately.

The likely clean migration path is:

1. implement the Nx generator
2. extract or share the normalization/template logic where practical
3. keep the existing script as a compatibility wrapper or parallel entry point until the generator proves stable

## Recommended V1 Outcome

The repo should support both of these flows:

```bash
pnpm scaffold:player --name player-arrivals
pnpm nx g <local-plugin>:player-app --name player-arrivals
```

Both should produce a player app consistent with the current `player-minimal` scaffold expectations.

## Summary

The request should proceed, but the implementation should be a repo-local Nx generator for the existing BrightSign player-app scaffold, not a generic fresh React app generator layered with signage ideas.
