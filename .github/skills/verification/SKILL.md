---
name: verification
description: Verify a change set before review by running the appropriate checks, collecting evidence, and summarizing results for a pull request. Use when a feature, fix, or refactor is ready for validation, and produce a concise verification report covering format, lint, type-check, tests, build scope, and manual checks where relevant.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
---

# Verification Skill

## Purpose

Use this skill to validate a change set and turn the results into a concise verification record for review.

## When to Use This Skill

Use this skill when you need to:

- Prepare verification evidence for a PR
- Format PR verification sections
- Understand manual testing expectations

## Inputs

Gather or infer:

- the affected projects or packages
- whether the change is a feature, fix, refactor, or docs-only update
- whether UI behavior changed
- what validation has already been run

## Constraints

- Prefer affected-scope validation over broad full-repo runs when the repo supports it.
- Do not claim a change is verified without actual command or manual evidence.
- Separate passing checks, failing checks, and checks not run.

## Core Principle

**Prove your changes work before asking for review.**

## Verification Procedure

1. Identify the smallest valid verification scope for the changed areas.
2. Run the required automated checks.
3. Add targeted manual verification when behavior is visual, interactive, or environment-dependent.
4. Record what passed, what failed, and what was intentionally skipped.
5. Summarize the evidence in a format that can be copied into a PR.

## Required Verification

1. **Format check**
2. **Lint**
3. **Type check**
4. **Tests**

Add build and manual checks when the change requires them.

### The Verification Command

Run your project's verification command. Examples:

```bash
# Monorepo with pnpm
pnpm verify

# npm-based projects
npm test && npm run lint && npm run typecheck

# Make-based projects
make check
```

Use narrower affected-scope commands when they provide equivalent coverage for the change.

## Output Contract

Produce:

1. the commands run
2. a pass or fail summary for each check
3. manual verification notes when relevant
4. any gaps, skips, or unresolved risks
5. a concise PR-ready verification summary

## References

- See [detailed verification guide](references/detailed-guide.md) for complete templates

For complete verification requirements and templates, see the [detailed verification guide](references/detailed-guide.md).
