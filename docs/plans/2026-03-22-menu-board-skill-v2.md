# Menu Board Skill V2 Plan

## Goal

Upgrade the `signage-menu-board` skill from layout-only guidance into a stronger developer-facing workflow without turning `SKILL.md` into a monolithic document.

## Context

The current skill has solid menu-board layout guidance but lacks:

- required pre-layout inputs
- stage-based workflow outputs
- explicit failure conditions
- system-level screen planning guidance
- practical companion artefacts for examples and seed data

Repository conventions for skills require progressive disclosure:

- keep `SKILL.md` compact and reviewable
- put deep guidance into `references/`
- put reusable examples into `assets/`
- use `scripts/` only for genuine automation helpers

## Scope

In scope:

- update `skills/signage-menu-board/SKILL.md`
- expand `skills/signage-menu-board/references/detailed-guide.md`
- add new reference files for venue/brand, screen planning, and runtime/QA
- add example JSON seed assets
- regenerate `.github/skills/` mirror

Out of scope:

- adding executable scripts in this pass
- changing application code or demos
- creating a new skill

## Planned Changes

1. Refactor `SKILL.md` into a compact orchestration contract with:
   - required inputs
   - workflow summary
   - output contract
   - failure conditions
   - clear links to companion files
2. Expand the reference layer with:
   - a detailed workflow and worked examples
   - venue and brand guidance
   - screen-system planning guidance
   - runtime and QA guidance
3. Add menu-board seed JSON examples for venue, brand, and menu modes.
4. Run `pnpm sync:skills` to update `.github/skills/`.
5. Validate with `pnpm check:skills` and file error checks.

## Files To Change

- `skills/signage-menu-board/SKILL.md`
- `skills/signage-menu-board/references/detailed-guide.md`
- `skills/signage-menu-board/references/venue-and-brand.md`
- `skills/signage-menu-board/references/screen-system-planning.md`
- `skills/signage-menu-board/references/runtime-and-qa.md`
- `skills/signage-menu-board/assets/menu-board-seed-data/venue-profile.example.json`
- `skills/signage-menu-board/assets/menu-board-seed-data/brand-profile.example.json`
- `skills/signage-menu-board/assets/menu-board-seed-data/menu-breakfast.example.json`
- `skills/signage-menu-board/assets/menu-board-seed-data/menu-lunch.example.json`
- `skills/signage-menu-board/assets/menu-board-seed-data/menu-dinner.example.json`
- generated mirror under `.github/skills/signage-menu-board/`

## Acceptance Criteria

- `SKILL.md` remains concise and focused on orchestration
- deep guidance is split into companion files instead of inlined
- the skill exposes required inputs, stage outputs, and failure conditions
- example assets exist for realistic menu-board workflows
- `.github/skills/` mirror is in sync

## Validation

- `pnpm sync:skills`
- `pnpm check:skills`
- error check for changed skill files
