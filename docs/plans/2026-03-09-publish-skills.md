# Publish Skills Outside The Repo

**Date:** 2026-03-09
**Author:** GitHub Copilot
**Status:** Complete

## Context

The repository currently stores Copilot skills only under `.github/skills/`, which works for GitHub-native discovery but is awkward for portable `SKILL.md` consumers. We want the skills to be installable from outside the repository via the open skills CLI while preserving GitHub Copilot compatibility.

## Goals

- Introduce a top-level `skills/` directory as the canonical skill source.
- Keep `.github/skills/` available as a mirrored output for GitHub Copilot.
- Document the supported install path with `npx skills add CambridgeMonorail/TheSignAge`.
- Avoid manual dual-maintenance of two skill trees.

## Non-Goals

- Changing the content or behavior of individual skills.
- Converting the repository into an npm package for skill distribution.
- Refactoring unrelated AI tooling docs.

## Approach

Move the existing skill folders to `skills/`, add a small sync script that mirrors them into `.github/skills/`, run the sync once, and update the main docs to describe the new canonical layout and install flow.

## Tasks

- [x] Create the canonical `skills/` directory structure from the current `.github/skills/` contents.
  - Acceptance criteria: all current skill folders exist under `skills/` with matching files.
  - Files affected: `skills/**`
- [x] Add an automated sync step to mirror `skills/` into `.github/skills/`.
  - Acceptance criteria: a documented command rebuilds `.github/skills/` from `skills/`.
  - Files affected: `scripts/sync-skills.mjs`, `package.json`
- [x] Update repository docs to explain the portable skill model and install command.
  - Acceptance criteria: key docs reference `skills/` as canonical, `.github/skills/` as generated mirror, and `npx skills add CambridgeMonorail/TheSignAge`.
  - Files affected: `README.md`, `.github/AI-TOOLING.md`, `docs/tooling/github-copilot-tooling.md`, `docs/ai/target-operating-model.md`
- [x] Verify the sync script and review the resulting tree.
  - Acceptance criteria: sync command completes successfully and `.github/skills/` matches the root skill set.
  - Files affected: `.github/skills/**`

## Testing Strategy

- Run the sync script locally.
- Inspect git diff to confirm the mirror reflects the canonical source.
- Run targeted validation only if script changes introduce lint or runtime concerns.

## Risks and Trade-offs

- Moving the source of truth changes many paths at once, so doc updates must be deliberate.
- Generated mirrors increase the number of tracked files, but they remove ambiguity about which directory is authoritative.

## Dependencies

- Existing `.github/skills/` content remains the source for the initial migration.

## Open Questions

- None.

## Rollback Plan

Revert the branch or restore `.github/skills/` as the only source of truth and remove the sync script.

## Completion Notes

- Added `skills/` as the canonical portable skill source.
- Added `scripts/sync-skills.mjs` and `pnpm sync:skills` to regenerate `.github/skills/`.
- Added `pnpm check:skills` and a CI gate to fail when `.github/skills/` is out of sync.
- Verified the sync script runs successfully with `node scripts/sync-skills.mjs`.
- Updated core documentation and agent guidance to describe the new install and mirroring workflow.