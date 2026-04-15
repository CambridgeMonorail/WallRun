# Local Code Health Agent Wrapper

## Status

Reviewed and revised for the actual WallRun repository structure on 2026-04-14.

## Purpose

Define a repo-local, developer-invoked code health workflow for this Nx + pnpm monorepo that surfaces:

- dead code and stale dependencies via Knip
- duplicated code via jscpd
- a single merged report that Copilot can read and summarize safely

This specification keeps the first release read-only and local-first. It is intended to be implementable inside the existing repository conventions rather than as a generic monorepo add-on.

## Why This Revision Was Needed

The original draft had the right goal, but several parts did not match how this repository is organized:

- this repo uses explicit Nx projects under `tools/*/project.json`; it does not define arbitrary root-level Nx targets without a project
- there is no existing `tools/code-health` project yet, so the spec must require one
- `reports/` is a generated output convention in this repo, not a pre-existing tracked folder
- Copilot prompts already exist in `.github/prompts/`, but a new skill should not be required in phase 1 unless the workflow proves stable enough to justify it
- for a multi-step reporting tool, TypeScript in a proper tool project is a better fit here than several loose `.mjs` scripts with no tests

## Goals

- detect dead code, unused exports, and unused dependencies early
- detect high-signal duplication worth cleanup
- normalize raw tool output into one stable report shape
- make the result easy for developers and Copilot to interpret
- keep phase 1 safe, local, and non-destructive
- fit existing Nx, pnpm, and Copilot customization patterns already used in this repo

## Non-Goals

- no automatic file deletion or refactoring
- no CI enforcement in phase 1
- no PR blocking in phase 1
- no attempt to auto-fix findings
- no requirement to scan only affected projects in the first release

## Recommended Rollout

### Phase 1: Local tool + prompt

Implement the repo-local tool, package scripts, report generation, and one Copilot prompt that reads the generated report.

### Phase 2: Optional Copilot skill

Add a dedicated skill only after the team has seen enough real findings to document:

- common false positives
- interpretation rules specific to this monorepo
- a stable review workflow worth packaging as a reusable skill

This follows the repo's existing Copilot guidance: use prompts for a focused repeatable task, and use a skill only when the workflow has meaningful reusable guidance and supporting assets.

## High-Level Architecture

```text
Developer or Copilot prompt
            |
            v
Package scripts / Nx targets
            |
            v
tools/code-health CLI
            |
            +--> pnpm exec knip
            |
            +--> pnpm exec jscpd
            |
            v
reports/code-health/*.json
            |
            v
summary.md + console summary
```

## Repository-Fit Design

### Tooling project

Create a dedicated Nx tool project:

```text
tools/
  code-health/
    project.json
    README.md
    src/
      cli.ts
      run-knip.ts
      run-jscpd.ts
      merge-findings.ts
      summarise-findings.ts
      types.ts
      config.ts
      utils/
        fs.ts
        process.ts
      __tests__/
        merge-findings.test.ts
        summarise-findings.test.ts
```

Rationale:

- this mirrors the repo's existing `tools/player-discovery` and `tools/wallrun` patterns
- it gives the workflow a real Nx identity instead of scattering ad hoc scripts at the root
- it allows type-safe parsing and testing of normalized output

### Generated reports

Generated output should go to:

```text
reports/code-health/
  knip.json
  jscpd.json
  unified.json
  summary.md
```

`reports/code-health/` should be treated as generated output. The implementation should create it on demand. Do not require a committed `.gitkeep`.

Update `.gitignore` to exclude `reports/code-health/` if the broader `reports/` tree is not already ignored.

### Documentation location

User-facing documentation for the finished workflow should live under:

```text
docs/tooling/local-code-health.md
```

That fits the existing docs structure better than introducing a new `docs/code-quality/` section.

## Dependencies

Add the following dev dependencies at the workspace root:

```bash
pnpm add -D knip jscpd
```

No additional runtime dependency should be introduced unless implementation needs it. Prefer built-in Node APIs and existing workspace tooling first.

## CLI Contract

Implement a single entry point under `tools/code-health/src/cli.ts` with subcommands.

Recommended command surface:

```bash
pnpm code-health:knip
pnpm code-health:jscpd
pnpm code-health:run
pnpm code-health:summary
```

Mapped CLI behavior:

- `code-health:knip` runs Knip and writes `reports/code-health/knip.json`
- `code-health:jscpd` runs jscpd and writes `reports/code-health/jscpd.json`
- `code-health:run` runs both tools and writes `unified.json`
- `code-health:summary` reads `unified.json`, prints a console summary, and writes `summary.md`

`code-health:run` may call summary generation automatically, but the implementation should keep the internal steps separable for debugging.

## Package Scripts

Add root scripts to `package.json` using the repo's existing naming style for tool entry points:

```json
{
  "scripts": {
    "code-health:knip": "tsx tools/code-health/src/cli.ts knip",
    "code-health:jscpd": "tsx tools/code-health/src/cli.ts jscpd",
    "code-health:run": "tsx tools/code-health/src/cli.ts run",
    "code-health:summary": "tsx tools/code-health/src/cli.ts summary"
  }
}
```

Avoid the original `quality:*` naming. `code-health:*` is more specific and consistent with other repo-local tool scripts such as `skill-lint:*` and `player:*`.

## Nx Project Definition

Create `tools/code-health/project.json` and define explicit targets there.

Recommended shape:

```json
{
  "name": "code-health",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "tools/code-health/src",
  "projectType": "application",
  "targets": {
    "knip": {
      "executor": "nx:run-commands",
      "options": {
        "command": "tsx tools/code-health/src/cli.ts knip"
      }
    },
    "jscpd": {
      "executor": "nx:run-commands",
      "options": {
        "command": "tsx tools/code-health/src/cli.ts jscpd"
      }
    },
    "run": {
      "executor": "nx:run-commands",
      "options": {
        "command": "tsx tools/code-health/src/cli.ts run"
      }
    },
    "summary": {
      "executor": "nx:run-commands",
      "options": {
        "command": "tsx tools/code-health/src/cli.ts summary"
      }
    }
  },
  "tags": ["type:tool", "scope:quality"]
}
```

Do not describe these as root-level Nx targets. In this repo, they must belong to an actual project.

## Tool Responsibilities

### 1. Knip runner

Implement a Knip runner that:

- executes `pnpm exec knip --reporter json`
- captures stdout
- writes normalized raw output to `reports/code-health/knip.json`
- fails with a clear message if Knip exits unexpectedly

Use `pnpm exec` rather than `npx` to stay aligned with the workspace package manager.

### 2. jscpd runner

Implement a jscpd runner that:

- executes `pnpm exec jscpd . --reporters json --output reports/code-health`
- locates the generated JSON report
- rewrites or copies it to `reports/code-health/jscpd.json`
- preserves enough metadata for later interpretation

The wrapper should hide jscpd's output-path quirks from downstream consumers so the merged step reads a stable filename.

### 3. Merge step

Implement a merge step that:

- reads Knip and jscpd outputs
- converts them into one stable report shape
- includes metadata needed for later prompt and agent use

Suggested unified shape:

```json
{
  "meta": {
    "generatedAt": "",
    "workspace": "WallRun",
    "toolVersions": {
      "knip": "",
      "jscpd": ""
    }
  },
  "deadCode": {
    "files": [],
    "exports": [],
    "dependencies": [],
    "unlistedDependencies": []
  },
  "duplication": {
    "blocks": [],
    "statistics": {}
  },
  "summary": {
    "deadCodeCount": 0,
    "duplicationBlockCount": 0,
    "highConfidenceActions": 0
  }
}
```

The exact fields may evolve, but the tool must normalize the data into domain-friendly sections rather than dumping raw tool output unchanged.

### 4. Summary step

Implement a summary step that:

- prints a compact console summary for developers
- writes `reports/code-health/summary.md`
- groups findings into confidence buckets

Recommended output buckets:

- safe cleanup
- likely cleanup
- needs review

This is more useful than a flat list because Knip and jscpd both produce some noise.

## Ignore Rules

The workflow must exclude generated and non-actionable areas. Start with:

```text
node_modules/
dist/
coverage/
tmp/
.nx/
storybook-static/
```

Also exclude low-signal file categories unless a later review shows they are valuable:

```text
**/*.stories.tsx
**/*.spec.ts
**/*.spec.tsx
**/*.test.ts
**/*.test.tsx
```

The implementation should keep Knip and jscpd ignore rules explicit and documented instead of relying on hidden defaults.

## Copilot Integration

### Phase 1 prompt

Create:

```text
.github/prompts/code-health-review.prompt.md
```

The prompt should be a focused task, matching how prompts are already used in this repo.

Suggested prompt content:

```md
# Code Health Review

**Description**: run the local code health workflow and summarize the findings without modifying code.

**Prompt**:
1. Run `pnpm code-health:run`.
2. Read `reports/code-health/unified.json` and `reports/code-health/summary.md` if present.
3. Group findings into:
   - safe cleanup
   - likely cleanup
   - needs review
4. Highlight the top 5 actions by impact and confidence.
5. Do not modify source files unless I explicitly ask for fixes.
```

### Phase 2 optional skill

Only add `.github/skills/code-health-review/SKILL.md` after the team has enough repo-specific guidance to justify a skill.

If phase 2 is pursued, the skill should contain:

- purpose and trigger phrases in frontmatter description
- clear interpretation rules for common Knip and jscpd false positives in this monorepo
- small supporting docs under `references/`
- optional scripts only if they are actually reused

Do not create a skill shell with placeholder guidance just to mirror the original draft.

## Developer Documentation

Add a concise usage guide at `docs/tooling/local-code-health.md` covering:

- what Knip checks in this repo
- what jscpd checks in this repo
- which folders and file types are intentionally ignored
- how to run `pnpm code-health:run`
- how to interpret `safe cleanup`, `likely cleanup`, and `needs review`
- examples of findings that should usually be fixed
- examples of findings that are often false positives

## Testing Requirements

Because this is a new repo-local tool, tests should cover the merge and summary logic.

Minimum test coverage:

- parsing representative Knip JSON fixtures
- parsing representative jscpd JSON fixtures
- merging both into the unified schema
- producing stable summary buckets from known inputs

Unit tests are sufficient for phase 1. There is no need for browser or end-to-end coverage.

## Validation Workflow

Before considering the implementation complete, verify with:

```bash
pnpm code-health:run
pnpm verify
```

`pnpm verify` remains the repo-wide definition-of-done check. The code health workflow itself should not be added to `verify` in phase 1.

## Acceptance Criteria

- `pnpm code-health:knip` generates `reports/code-health/knip.json`
- `pnpm code-health:jscpd` generates `reports/code-health/jscpd.json`
- `pnpm code-health:run` generates `reports/code-health/unified.json`
- `pnpm code-health:summary` prints a concise console summary and writes `reports/code-health/summary.md`
- `nx run code-health:run` works via `tools/code-health/project.json`
- the unified report shape is stable and documented
- the prompt in `.github/prompts/code-health-review.prompt.md` works against the generated report
- no source code is modified by the tool itself
- generated output is ignored from version control

## Definition of Done

- `tools/code-health` exists as a proper Nx project
- root package scripts are wired and documented
- reports are created consistently under `reports/code-health/`
- merge and summary logic have unit tests
- developer documentation exists in `docs/tooling/local-code-health.md`
- prompt file exists and follows current repo prompt format
- `pnpm verify` passes after the implementation is added

## Future Enhancements

- add repo-specific confidence rules for common false positives
- support scoped analysis for changed or affected projects
- export markdown tables for PR descriptions
- add optional CI reporting without blocking merges
- add a dedicated Copilot skill once interpretation guidance is mature
- explore remediation suggestions after report quality is proven trustworthy

## Implementation Notes for the Developer

- prefer TypeScript and `tsx` over untyped multi-file `.mjs` wrappers for this feature
- use `pnpm exec`, not `npx`
- keep the first version read-only
- keep the report schema intentionally small and stable
- optimize for low-noise output over maximum raw detail
- do not wire this into CI or `verify` until the false-positive rate is understood
