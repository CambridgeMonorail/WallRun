---
name: systematic-debugging
description: Diagnose complex bugs by reproducing the issue, gathering evidence, isolating root cause, and verifying the fix. Use when behavior is unexpected, intermittent, cross-cutting, or not obviously explained by the code, and produce a debugging record with repro steps, findings, root cause, fix, and regression checks.
---

# Systematic Debugging Skill

## Purpose

Use this skill to debug problems methodically so the fix addresses the root cause instead of masking symptoms.

## When to Use This Skill

Use this skill when you need to:

- Debug complex or non-obvious issues
- Investigate performance problems
- Find the root cause of unexpected behavior
- Verify a bug fix actually works

## Do Not Use When

Do not use this skill when:

- the failure is obvious and the fix is mechanical
- the user only wants a quick best-effort suggestion
- there is no need to preserve a debugging record or evidence trail

## Evidence Required

Capture as much of the following as is relevant:

- reproduction steps
- failing state or error output
- logs, traces, or screenshots
- scope of impact
- confirmation of the post-fix behavior

## The 6-Step Process

1. **Understand the Problem** - Define the expected behavior, actual behavior, and impact.
2. **Reproduce Reliably** - Find stable steps, inputs, or conditions that trigger the issue.
3. **Find Root Cause** - Investigate evidence until the failure mechanism is understood; do not guess.
4. **Fix the Root Cause** - Change the code or configuration at the source of the failure.
5. **Verify the Fix** - Confirm the bug is gone and likely regressions are covered.
6. **Document** - Record the repro, evidence, root cause, fix, and verification.

## Output Contract

Produce:

1. the reproduction steps
2. the evidence gathered
3. the root cause statement
4. the fix applied or proposed
5. the verification result
6. regression risks or follow-up checks

## Constraints

- Do not jump to solutions before evidence exists.
- Prefer a failing test or reproducible case when practical.
- If the issue cannot be reproduced, say so and list the remaining unknowns.

## Integration

- Referenced from [AGENTS.md](../../../AGENTS.md) debugging section
- See [detailed debugging guide](workflows/detailed-guide.md) for complete examples

For complete examples and debugging techniques, see the [detailed debugging guide](workflows/detailed-guide.md).
