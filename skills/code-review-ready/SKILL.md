---
name: code-review-ready
description: Prepare a change set for pull request review by checking scope, reviewability, verification evidence, screenshots, and PR description quality. Use when a branch is nearly ready to merge or when a user asks whether a PR is reviewable, and produce a concrete readiness checklist plus missing items.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
---

# Code Review Ready Skill

## Purpose

Use this skill to decide whether a branch is ready for review and to close the gaps that make PRs slow or difficult to review.

## When to Use This Skill

Use this skill when you need to:

- Prepare a pull request for review
- Check if your changes are reviewable
- Write a clear PR description
- Break down large changes into reviewable chunks

## Do Not Use When

Do not use this skill when:

- performing a full correctness review of the implementation
- debugging a production issue
- writing feature code that is still actively changing scope

## Inputs

Gather or infer:

- the change scope and affected areas
- whether the change includes UI or UX changes
- what verification has already been run
- what screenshots, videos, or manual test notes exist
- whether the branch is too large for a single review

## Core Principle

**Make it easy for reviewers.** Small, focused, well-documented PRs get reviewed faster and have fewer issues.

## Review Procedure

1. Assess whether the change is one logical unit of work.
2. Check whether the diff is small enough to review comfortably or should be split.
3. Verify that the PR description explains what changed, why, and how it was validated.
4. Check whether UI changes include visual evidence.
5. Confirm that verification evidence is complete enough for the affected scope.
6. Flag blockers, missing evidence, and recommended next actions.

## Reviewable PR Checklist

✅ **Keep it small** - Target < 500 lines changed
✅ **One logical change** - Single feature, bug fix, or refactoring
✅ **Clear description** - What, why, and how
✅ **Visual evidence** - Screenshots for UI changes
✅ **Verification passed** - Include verification command output (e.g., `pnpm verify`, `npm test`, `make check`)

## Output Contract

Produce:

1. a review-readiness assessment
2. the missing artifacts or evidence, if any
3. a short PR description outline or improvement notes
4. split recommendations if the change is too large
5. clear blockers versus non-blocking polish

## Constraints

- Focus on reviewability and evidence, not a full code review, unless the user asks for both.
- Prefer concrete missing items over abstract advice.
- Treat oversized PRs as a reviewability issue even when the code is correct.

## References

- See [detailed code review guide](references/detailed-guide.md) for complete examples

For complete examples and tips for breaking down large PRs, see the [detailed code review guide](references/detailed-guide.md).
