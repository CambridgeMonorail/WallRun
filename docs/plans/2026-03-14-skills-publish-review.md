# Skills Review: Reusability Classification & Publishing Readiness

**Date:** 2026-03-14
**Branch:** `chore/skills-review-and-publish`
**Goal:** Classify all 20 skills by reusability tier, identify spec compliance gaps, and prepare publishable skills for the `vercel-labs/skills` ecosystem via `npx skills add`.

---

## Publishing Target

Skills will be published as an installable collection:

```bash
npx skills add CambridgeMonorail/WallRun --list          # browse
npx skills add CambridgeMonorail/WallRun --skill signage-layout-system  # install one
```

Consumers install via the [vercel-labs/skills CLI](https://github.com/vercel-labs/skills) which reads `skills/*/SKILL.md`. The format follows the [Agent Skills specification](https://agentskills.io/specification).

---

## Reusability Classification

### Tier 1 — Universal (publish as-is or with minor polish)

These skills contain **zero repo-specific references**. Any team can install and use them immediately.

| Skill                            | Lines | Summary                                                                   | Fine-tune notes                                                                                                                     |
| -------------------------------- | ----- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **signage-layout-system**        | 112   | Full-screen signage layout rules: zoning, hierarchy, distance readability | Cross-reference to `brightsign-runtime` is soft (mention only). Remove or generalize to "embedded runtime constraints".             |
| **signage-animation-system**     | 102   | Motion design for wall displays: slow, legible, loop-safe                 | Same soft cross-ref to `brightsign-runtime`. Generalize.                                                                            |
| **signage-menu-board**           | 164   | Menu board zone templates, price hierarchy, content shapes                | "BrightSign Considerations" section references `brightsign-signage-build`. Move to a note or make it conditional.                   |
| **signage-placeholder-images**   | 491   | Placeholder image planning, naming, sizing for signage                    | No repo-specific refs. At 491 lines, borderline on the 500-line recommendation — could split reference tables into `references/`.   |
| **chrome-devtools-webapp-debug** | 64    | Browser debugging via Chrome DevTools MCP                                 | Fully generic. No changes needed.                                                                                                   |
| **systematic-debugging**         | 70    | 6-step debugging methodology                                              | Single soft ref to AGENTS.md. Remove the path ref, keep the methodology.                                                            |
| **instructions-detox**           | 81    | Audit Copilot instruction files for bloat/overlap                         | References `.instructions.md` and `AGENTS.md` as file _patterns_ (which is the point of the skill), not repo paths. Fully portable. |

### Tier 2 — Portable with light edits (methodology is generic, examples need generalizing)

These skills have **strong transferable cores** but contain repo-specific paths, commands, or tooling references that need parameterizing.

| Skill                         | Lines | Repo-specific refs                                   | Required changes                                                                                          |
| ----------------------------- | ----- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **planning**                  | 86    | `docs/plans/` path, AGENTS.md ref                    | Generalize path to "a plans directory" or make it configurable.                                           |
| **code-review-ready**         | 81    | `pnpm verify` command, AGENTS.md ref                 | Replace with example verification command; add note that teams should substitute their own.               |
| **verification**              | 79    | `pnpm verify`, Nx "affected" concepts, AGENTS.md ref | Same — parameterize the verification command. "Affected" is a useful concept beyond Nx.                   |
| **shadcnui-component-review** | 72    | `libs/shadcnui/src/lib` paths, Storybook checks      | Rebrand as generic "component-library-review" or keep shadcn-specific (useful for any shadcn/ui project). |

### Tier 3 — Domain-specific / BrightSign ecosystem (repo-bound)

These skills are **tightly coupled to WallRun's BrightSign player infrastructure**. They reference specific scripts, Nx targets, player apps, and repository structure. Useful only for BrightSign digital signage projects using this codebase or forks.

| Skill                        | Lines | Key couplings                                                                                 |
| ---------------------------- | ----- | --------------------------------------------------------------------------------------------- |
| **brightsign-debug**         | 524   | BrightSign OS 9.x DWS APIs, Chromium 98 specifics, `autorun.brs`. Over 500-line limit.        |
| **brightsign-deploy-local**  | 411   | `scripts/deploy-local.mjs`, `apps/player-minimal`, Nx build targets                           |
| **brightsign-fleet-deploy**  | 426   | `CambridgeMonorail/WallRun` GitHub repo, `player-minimal` naming, S3/GitHub Releases          |
| **brightsign-package**       | 332   | `apps/player-minimal`, `nx build player-minimal`, `autorun-template.brs` companion file       |
| **brightsign-runtime**       | 112   | Cross-refs to other brightsign-\* skills, BrightSign Chromium 98 constraints                  |
| **brightsign-signage-build** | 113   | Coordinator skill referencing brightsign-runtime, brightsign-package, brightsign-deploy-local |
| **player-discovery-scan**    | 51    | `nx run player-discovery:scan`, `tools/player-discovery/`                                     |
| **player-discovery-probe**   | 46    | `nx run player-discovery:probe`, BrightSign DWS                                               |
| **player-discovery-export**  | 39    | `nx run player-discovery:export`, `dist/players.json`                                         |

---

## Spec Compliance Audit

### Frontmatter

| Check                                                   | Status      | Notes                                                                                                        |
| ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `name` present on all 20                                | **PASS**    | All names are lowercase-hyphenated, match directory names                                                    |
| `description` present on all 20                         | **PASS**    | Good "what + when to use" pattern                                                                            |
| `name` format (lowercase, hyphens, no consecutive `--`) | **PASS**    | All compliant                                                                                                |
| `name` matches parent directory                         | **PASS**    | All match                                                                                                    |
| Non-standard fields                                     | **WARN**    | 3 player-discovery skills use `argument-hint` and `user-invokable` — not in spec. Move to `metadata:` block. |
| `license` field                                         | **MISSING** | None of the skills declare a license. Required for public publishing.                                        |
| `metadata` field                                        | **MISSING** | Consider adding `metadata.author: CambridgeMonorail` and `metadata.version`.                                 |

### Size Limits (spec recommends < 500 lines, < 5000 tokens)

| Skill                      | Lines | Status                                                       |
| -------------------------- | ----- | ------------------------------------------------------------ |
| brightsign-debug           | 524   | **OVER** — split detailed troubleshooting into `references/` |
| signage-placeholder-images | 491   | Borderline — consider moving lookup tables to `references/`  |
| brightsign-fleet-deploy    | 426   | OK but large                                                 |
| brightsign-deploy-local    | 411   | OK but large                                                 |
| All others                 | < 350 | OK                                                           |

### Directory Structure

| Check                             | Status                              | Notes                                                                            |
| --------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------- |
| `workflows/` subdirectories       | 7 skills                            | Non-standard name — spec uses `references/`. Consider renaming to `references/`. |
| `templates/` subdirectory         | 1 skill (shadcnui-component-review) | Non-standard — spec uses `assets/`. Consider renaming.                           |
| `autorun-template.brs` loose file | 1 skill (brightsign-package)        | Should be in `assets/` or `scripts/`.                                            |

---

## Recommended Actions

### For immediate publishing (Tier 1 skills)

These 7 skills can ship with minimal changes:

1. **Add `license` and `metadata` frontmatter** to all:

   ```yaml
   license: MIT
   metadata:
     author: CambridgeMonorail
     version: '1.0'
   ```

2. **Generalize soft cross-references** in signage-layout-system, signage-animation-system, signage-menu-board, and systematic-debugging — replace `brightsign-runtime` or `AGENTS.md` path refs with generic guidance or conditional notes.

3. **Split `signage-placeholder-images`** — move lookup/dimension tables into `references/dimensions.md` to get SKILL.md under 400 lines.

4. **No changes needed** for chrome-devtools-webapp-debug and instructions-detox.

### For Tier 2 skills

5. **Parameterize tooling commands** — replace `pnpm verify` with `<your-verify-command>` pattern or add a "Configuration" section where teams set their own.

6. **Consider renaming `shadcnui-component-review`** to `component-library-review` for broader appeal, or keep it as a shadcn-specific skill (still useful for the many shadcn/ui projects).

### For Tier 3 skills

7. **Mark as internal** for now using `metadata.internal: true` so they don't appear in public skill discovery but are still available to WallRun forks.

8. **Long-term:** Extract the generic BrightSign development knowledge from brightsign-runtime into a publishable `embedded-signage-runtime` skill that doesn't reference WallRun-specific paths.

### Structural cleanup (all skills)

9. **Move `argument-hint` / `user-invokable`** into `metadata:` block per spec.
10. **Rename `workflows/` → `references/`** and **`templates/` → `assets/`** to align with spec conventions.

---

## Publishable Skills Summary

For consumers evaluating which skills are useful **outside this repo**:

| Skill                          | Category   | Audience                           | Portable?             |
| ------------------------------ | ---------- | ---------------------------------- | --------------------- |
| signage-layout-system          | Design     | Anyone building digital signage    | **Yes**               |
| signage-animation-system       | Design     | Anyone building digital signage    | **Yes**               |
| signage-menu-board             | Design     | Restaurant/retail signage builders | **Yes**               |
| signage-placeholder-images     | Design     | Signage prototyping teams          | **Yes**               |
| chrome-devtools-webapp-debug   | Debugging  | Any web developer                  | **Yes**               |
| systematic-debugging           | Debugging  | Any developer                      | **Yes**               |
| instructions-detox             | Tooling    | Any Copilot-configured repo        | **Yes**               |
| planning                       | Workflow   | Any engineering team               | **Yes** (light edits) |
| code-review-ready              | Workflow   | Any PR-based team                  | **Yes** (light edits) |
| verification                   | Workflow   | Any CI/CD team                     | **Yes** (light edits) |
| shadcnui-component-review      | Review     | Any shadcn/ui project              | **Yes** (scoped)      |
| brightsign-\* (6 skills)       | BrightSign | WallRun forks only                 | **No**                |
| player-discovery-\* (3 skills) | BrightSign | WallRun forks only                 | **No**                |
