# Plan: Behaviour Components for shadcnui-signage (Option A)

Date: 2026-02-08

Status: Complete

## Goal

Add a small, opinionated set of signage-first **behaviour primitives** to `libs/shadcnui-signage` that reduce boilerplate for real, always-on signage screens.

Deliverables:

- 8 new behaviour components (see Scope)
- Storybook stories for every component (including edge cases)
- Demo site (`apps/client`) documentation pages for every component
- Exactly **two** realistic example screens proving composition:
  - Office Lobby Loop
  - Daypart Menu

## Decisions (confirmed)

- Docs approach: **Option A** — evolve the existing demo site in `apps/client` (no new Nx docs app)
- Example screens: **2 total** (Office Lobby Loop, Daypart Menu)
- Timezone/day-of-week handling: add a small dependency for robustness: **`date-fns-tz`** (note: `date-fns` already exists)
- Transitions: keep **slide direction standardized** (choose one direction initially; expand later)
- Reuse: keep behaviour components minimally styled and **controlled via props**
- `OfflineFallback`: add **`isHealthy?: boolean`** (default `true`) and show fallback when `isHealthy === false`

Offline precedence (proposed):

- If `isOnline === false` (explicit) OR `navigator.onLine === false` (implicit), render `fallback` regardless of `isHealthy`.
- If online, render `fallback` only when `isHealthy === false`.

## Scope

Implement these components in this order:

1. `ContentRotator`
2. `ScheduleGate`
3. `AutoPagingList`
4. `SignageTransition`
5. `Clock`
6. `Countdown`
7. `OfflineFallback`
8. `StaleDataIndicator`

Add a new category in both Storybook and demo site:

- **Behaviour**: rotation, scheduling, transitions, freshness, offline

## Cross-cutting Requirements

- Determinism/timing
  - Avoid timer drift.
  - Prefer scheduling that corrects using `Date.now()` deltas.
  - All time-dependent components accept `now?: () => number`.
- Accessibility
  - Respect `prefers-reduced-motion`.
  - Status indicators are readable without relying only on color.
- Styling/composability
  - Tailwind-only.
  - Minimal default styling; `className` hooks for key regions.
- Types/exports
  - Strict TypeScript.
  - Named exports.
  - Props types exported.
- Testing
  - Unit tests for scheduling/paging logic where practical.
  - Avoid brittle animation snapshot tests.

## Pre-flight Checklist (must be done before coding)

- Confirm `libs/shadcnui-signage` structure, naming, exports.
- Confirm Storybook setup and nav ordering.
- Confirm demo site component docs patterns and how new sections are added.
- Confirm runtime target assumptions (browser-only vs BrightSign WebView constraints).

PR description must include a short checklist summary of what was validated.

## Implementation Steps

1. **Pre-flight repo reality check**
   - Identify existing conventions for library folder structure and exports.
   - Identify existing demo site component docs pages and navigation patterns.
   - Identify Storybook story sorting rules and where to insert Behaviour.

2. **Dependency + shared helpers**
   - Add `date-fns-tz`.
   - Create small shared helpers/hooks in `libs/shadcnui-signage`:
     - `NowProvider` type
     - drift-resistant interval/ticker utility
     - schedule parsing helpers for `ScheduleGate`

3. **Implement components (in required order)**
   - Add `src/lib/behaviour/` folder.
   - Keep components prop-driven and minimally styled.
   - Standardize slide direction (recommend: left).

4. **Unit tests**
   - `ScheduleGate` window matching (including overnight windows + timezone).
   - `AutoPagingList` paging math and item-change retention behavior.
   - `Countdown` clamp-to-zero + single `onComplete` call.

5. **Storybook**
   - Add `Behaviour/` stories for each component:
     - default
     - at least two behavioural/edge-case stories
     - controls wired
     - time simulation via `now`
   - Update Storybook ordering to include `Behaviour` alongside `Primitives`, `Layouts`, `Blocks`.

6. **Demo site (apps/client) docs + navigation**
   - Add Behaviour category to components index.
   - Create per-component docs pages mirroring existing doc patterns.
   - Each page includes:
     - what it solves
     - prop/API notes
     - 1–2 realistic examples
     - signage notes (timing, long-running, reduced motion)
     - link to Storybook

7. **Two example screens**
   - **Office lobby loop**: `Clock` + `ContentRotator` + `SignageTransition` + `StaleDataIndicator`
   - **Daypart menu**: `ScheduleGate` switching breakfast/lunch/dinner

8. **Verification**
   - Run `pnpm verify` (affected) and fix relevant issues.

## Acceptance Criteria

- All 8 components exist in `libs/shadcnui-signage` with named exports
- Storybook includes stories for each, including edge cases under `Behaviour/`
- Demo site documents each component and includes exactly 2 example screens
- Reduced motion supported where relevant
- Strict TS, props documented, examples compile
- Pre-flight validation notes included in PR description

## Out of Scope

- Complex recurrence rules
- Drag/drop editors
- CMS authoring UI
- Media player wrappers beyond simple offline signaling

## Completion Notes

- Implemented all 8 planned behaviour components in `libs/shadcnui-signage/src/lib/behaviour/`.
- Added behaviour component docs pages under `apps/client/src/app/pages/components/behaviour/`.
- Added the two planned example screens: `OfficeLobbyLoop` and `DaypartMenu`.
- Kept the file as reference because it documents the behaviour scope and cross-cutting constraints that still apply.
