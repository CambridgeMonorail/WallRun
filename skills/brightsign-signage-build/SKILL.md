---
name: brightsign-signage-build
description: Build a BrightSign-targeted digital signage app by combining full-screen layout design, BrightSign runtime constraints, packaging expectations, and verification into one repeatable workflow. Use when creating or substantially changing a signage screen that will be packaged for BrightSign players.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
  internal: true
---

# BrightSign Signage Build Skill

## Purpose

Use this skill to take a BrightSign signage request from concept to a reviewable, player-oriented implementation path.

This skill exists to reduce the gap between signage composition work and BrightSign delivery work. It combines the concerns that usually get split across layout, runtime, packaging, and verification so an agent can execute them in a reliable order.

## When to Use

Use this skill when you need to:

- create a new BrightSign signage app or screen
- significantly redesign an existing BrightSign signage view
- implement a signage feature that must remain compatible with BrightSign packaging and deployment
- make sure signage UI decisions are shaped by player constraints before code is finalized

## Do Not Use When

Do not use this skill when:

- the target is browser-only and not intended for BrightSign deployment
- the task is only about packaging or local upload of an already-built app
- the task is only about player diagnostics or device debugging
- the work is a small docs-only or copy-only update

## Core Principle

**Build the signage like it will ship to a player, not like it will stay on a laptop.**

Layout, runtime, packaging, and verification decisions should reinforce each other instead of being handled as separate afterthoughts.

## Inputs

Gather or infer:

- the target app or whether a new player app should be created
- screen orientation, resolution, and approximate viewing distance
- content type and source: static, JSON, or API
- whether packaging or on-device deployment is part of the requested outcome
- any existing design reference, wireframe, or screenshot

## Workflow

Follow this sequence unless the user explicitly narrows the scope:

1. **Classify the work**
   - Decide whether this is a new BrightSign signage app, an update to an existing player app, or a review of existing code.
   - Clarify the target app if the request could reasonably affect an existing app.

2. **Shape the screen composition**
   - Apply `signage-layout-system` principles first.
   - Define named zones, hierarchy, and what the viewer must understand at a glance.
   - Keep loading, empty, and error states explicit.

3. **Apply BrightSign runtime constraints**
   - Apply `brightsign-runtime` before finalizing architecture.
   - Prefer static content, low timer churn, conservative dependencies, and deterministic rendering.
   - Avoid browser assumptions that are risky on an embedded player.

4. **Implement the smallest viable screen**
   - Prefer a clear, full-screen composition over feature breadth.
   - Keep the app structure predictable: player app source, bootstrap assets, concise config, tests.
   - Add data shapes or sample content close to usage.

5. **Confirm packaging readiness**
   - Apply `brightsign-package` expectations when build output or deployment artifacts matter.
   - Ensure the app can be statically built, packaged, and launched with the existing player workflow.

6. **Verify the result**
   - Apply `verification` expectations.
   - Run the narrowest relevant checks first.
   - Separate checks that passed from checks not run.

## Skill Composition

This skill is a coordinator. It should be used together with these skills as needed:

- `signage-layout-system` for zone structure and distance readability
- `brightsign-runtime` for embedded runtime constraints
- `brightsign-package` when packaging details matter
- `brightsign-deploy-local` when local player deployment is requested
- `verification` to validate the changed scope before handoff

## Output Contract

Produce:

1. the chosen assumptions and target app decision
2. the screen composition with named zones
3. implementation guidance or code shaped for BrightSign deployment
4. BrightSign-specific constraints applied or risky assumptions removed
5. packaging implications and whether packaging readiness was checked
6. verification evidence or an explicit list of checks still pending

## Acceptance Checklist

Before finalizing, check whether the result:

- is clearly a signage screen rather than a website or dashboard shell
- is suitable for static BrightSign packaging
- avoids unnecessary runtime churn
- includes explicit loading, empty, and error states when relevant
- can be validated with existing Nx and pnpm workflows

## Related Files

- See `references/detailed-guide.md` for the full execution pattern.
- Use `signage-menu-board` when the request is specifically for food or service menu boards.