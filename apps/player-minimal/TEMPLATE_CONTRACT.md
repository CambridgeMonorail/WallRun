# Player Minimal Template Contract

This document defines which parts of `apps/player-minimal` are treated as the baseline contract for scaffolding new BrightSign player apps.

## Purpose

`player-minimal` currently serves two roles:

- a runnable BrightSign demo app
- the source template for new player-oriented apps

The scaffold workflow must treat only a known subset of files and values as template inputs. That avoids accidental drift when the demo evolves.

## Required Template Files

These files should be copied into every newly scaffolded player app unless the template model changes:

- `project.json`
- `index.html`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.spec.json`
- `tailwind.config.js`
- `vite.config.mts`
- `public/autorun.brs`
- `public/favicon.ico`
- `src/main.tsx`
- `src/styles.css`
- `src/config.ts`
- `src/components/**/*`
- `src/assets/**/*`
- `src/app/app.tsx`

## Optional Demo Content

These files represent demo-specific content and should be explicitly kept or removed by a scaffolding step instead of being treated as mandatory template files:

- `src/app/StatusPage.tsx`
- `src/app/app.spec.tsx`
- `README.md`

## Canonical Scaffold Replacements

The first scaffold implementation should replace only these known values:

### Project identity

- `player-minimal`
  - Used for the Nx project name
  - Used in cache, dist, and coverage paths
  - Used in serve and packaging references

### Port assignment

- `4200`
  - Used in `server.port`
  - Used in `preview.port`
  - Mentioned in developer documentation

### Output and cache paths

- `../../node_modules/.vite/apps/player-minimal`
- `../../dist/apps/player-minimal`
- `../../coverage/apps/player-minimal`

### Documentation content that must not be copied verbatim

- Demo title text such as `Player Minimal - BrightSign React Demo`
- Demo-specific instructions that assume the app is still a clock/status sample
- Any mention of `player-minimal` as the target app in command examples

## Current Template Inventory

The scaffold script should assume these player-specific behaviors are part of the contract:

- BrightSign-safe Vite build settings in `vite.config.mts`
- Static-file deployment via `public/autorun.brs`
- Display orientation control through `src/config.ts`
- Full-screen React bootstrap through `src/main.tsx`

## Validation Checklist For Scaffold Changes

When the template changes, verify at minimum:

1. `rg -n "player-minimal|4200|dist/apps/player-minimal|coverage/apps/player-minimal" apps/player-minimal`
2. `pnpm nx run player-minimal:type-check`
3. `pnpm nx build player-minimal`

If new project-specific strings are introduced, add them here before they are relied on by a scaffold script.
