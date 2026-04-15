# Local Code Health Tool

**Date:** 2026-04-15  
**Author:** GitHub Copilot  
**Status:** Planning

## Context

The repository needs a developer-invoked code health workflow that surfaces dead code (via Knip) and duplicated code (via jscpd) in a merged, low-noise report. An external architect drafted initial requirements that did not fit the existing repo conventions, so those were revised into [docs/new-features/local-code-health-agent-wrapper.md](../new-features/local-code-health-agent-wrapper.md).

This plan turns that revised spec into actionable implementation tasks.

## Goals

- Add Knip and jscpd as dev dependencies.
- Create a proper Nx tool project under `tools/code-health` with TypeScript sources.
- Implement four CLI subcommands: `knip`, `jscpd`, `run`, and `summary`.
- Generate normalized reports to `reports/code-health/`.
- Add root package scripts (`code-health:*`) and Nx targets.
- Add a Copilot prompt that reads the generated report.
- Add developer documentation under `docs/tooling/`.
- Write unit tests for merge and summary logic.

## Non-Goals

- CI enforcement or PR blocking in phase 1.
- Automatic code modification.
- Copilot skill—only add after phase 1 experience proves it valuable.

## Approach

1. Install dependencies.
2. Scaffold the `tools/code-health` project structure.
3. Implement each runner, then the merge and summary steps.
4. Wire root package scripts and Nx targets.
5. Add gitignore exclusion for `reports/code-health/`.
6. Add the Copilot prompt.
7. Write the developer docs page.
8. Add unit tests and verify with `pnpm verify`.

## Tasks

### Phase 1: Foundation

- [x] Task 1: Install Knip and jscpd as dev dependencies
  - Acceptance criteria: `pnpm exec knip --version` and `pnpm exec jscpd --version` succeed.
  - Commands to run: `pnpm add -D knip jscpd`
  - Files affected: `package.json`, `pnpm-lock.yaml`

- [x] Task 2: Scaffold `tools/code-health` project
  - Acceptance criteria: `tools/code-health/project.json` exists and `nx show project code-health` lists expected targets.
  - Files affected:
    - `tools/code-health/project.json`
    - `tools/code-health/README.md`
    - `tools/code-health/tsconfig.json`
    - `tools/code-health/src/cli.ts`
    - `tools/code-health/src/types.ts`
    - `tools/code-health/src/config.ts`
    - `tools/code-health/src/utils/fs.ts`
    - `tools/code-health/src/utils/process.ts`

### Phase 2: Tool Implementation

- [x] Task 3: Implement `run-knip.ts`
  - Acceptance criteria: `pnpm code-health:knip` writes `reports/code-health/knip.json` with valid Knip JSON output.
  - Files affected: `tools/code-health/src/run-knip.ts`

- [x] Task 4: Implement `run-jscpd.ts`
  - Acceptance criteria: `pnpm code-health:jscpd` writes `reports/code-health/jscpd.json` with valid jscpd JSON output.
  - Files affected: `tools/code-health/src/run-jscpd.ts`

- [x] Task 5: Implement `merge-findings.ts`
  - Acceptance criteria: `reports/code-health/unified.json` contains dead code, duplication, and meta sections after running both tools.
  - Files affected: `tools/code-health/src/merge-findings.ts`

- [x] Task 6: Implement `summarise-findings.ts`
  - Acceptance criteria: `pnpm code-health:summary` prints a console summary and writes `reports/code-health/summary.md`. Findings are grouped into `safe cleanup`, `likely cleanup`, and `needs review` buckets.
  - Files affected: `tools/code-health/src/summarise-findings.ts`

- [x] Task 7: Wire CLI entry point (`cli.ts`) with four subcommands
  - Acceptance criteria: `tsx tools/code-health/src/cli.ts --help` shows `knip`, `jscpd`, `run`, and `summary` subcommands.
  - Files affected: `tools/code-health/src/cli.ts`

### Phase 3: Integration

- [x] Task 8: Add root package scripts
  - Acceptance criteria: `pnpm code-health:run` executes both tools, merges, and summarizes.
  - Files affected: `package.json`
  - Scripts to add:
    - `"code-health:knip": "tsx tools/code-health/src/cli.ts knip"`
    - `"code-health:jscpd": "tsx tools/code-health/src/cli.ts jscpd"`
    - `"code-health:run": "tsx tools/code-health/src/cli.ts run"`
    - `"code-health:summary": "tsx tools/code-health/src/cli.ts summary"`

- [x] Task 9: Add `.gitignore` entry for `reports/code-health/`
  - Acceptance criteria: generated reports are not committed.
  - Files affected: `.gitignore`

- [x] Task 10: Add Copilot prompt `.github/prompts/code-health.prompt.md`
  - Acceptance criteria: prompt file exists and follows current repo prompt format.
  - Files affected: `.github/prompts/code-health.prompt.md`

### Phase 4: Documentation and Testing

- [x] Task 11: Add developer documentation `docs/guides/code-health.md`
  - Acceptance criteria: document explains what Knip and jscpd check, how to run the workflow, and how to interpret findings.
  - Files affected: `docs/guides/code-health.md`

- [x] Task 12: Add unit tests for merge and summary logic
  - Acceptance criteria: tests cover parsing Knip/jscpd fixtures, merging into unified schema, and producing stable summary buckets.
  - Files affected:
    - `tools/code-health/src/__tests__/categorize-findings.test.ts`
    - `tools/code-health/src/__tests__/config.test.ts`
    - `tools/code-health/src/__tests__/counters.test.ts`

- [x] Task 13: Final validation
  - Acceptance criteria: `pnpm code-health:run` succeeds end-to-end, and `pnpm verify` passes.
  - Commands to run:
    - `pnpm code-health:run`
    - `pnpm verify`

## Testing Strategy

- Run `pnpm code-health:knip` and `pnpm code-health:jscpd` against the current workspace to confirm JSON output is valid.
- Compare unified report against expected schema.
- Run summary command and inspect console output and markdown file for correct categorization.
- Run `pnpm nx test code-health` to execute unit tests.
- After all tasks, run `pnpm verify` to confirm no regressions.

## Risks and Trade-offs

- Knip and jscpd may have version-specific output formats; the merge logic must handle them gracefully or fail early with clear errors.
- Without production-like test fixtures the summary confidence buckets may need tuning after phase 1 rollout.
- jscpd writes its own report filename (`jscpd-report.json`), so the wrapper must normalize that consistently.

## Dependencies

- `tsx` is already available in the workspace for running TypeScript scripts.
- Knip and jscpd must be installed before any other task proceeds.

## Open Questions

- Should the Knip and jscpd ignore rules be colocated in `tools/code-health/` or remain in common config files at the root?
- What threshold of duplication (LOC) counts as "safe cleanup"?

## Rollback Plan

- Revert the `tools/code-health` project and package script additions.
- Remove the Copilot prompt since it is non-functional without the tool.
- Uninstall Knip and jscpd dependencies.
