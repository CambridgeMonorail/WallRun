---
name: planning
description: Create a structured implementation plan for multi-step engineering work such as new features, multi-file refactors, or complex bug fixes. Use when the work needs sequencing, acceptance criteria, and file-level scope, and produce a plan with tasks, commands, risks, and expected outcomes.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
---

# Planning Skill

## Purpose

Use this skill to turn ambiguous or multi-step work into a concrete implementation plan that can be executed incrementally.

## When to Use

Use this skill when you need to:

- Plan new features with multiple components
- Structure refactoring work across multiple files
- Break down complex bug fixes
- Make architectural decisions

## Do Not Use When

Do not use this skill when:

- the change is trivial and can be completed safely without sequencing
- the task is a small typo, rename, or one-line fix
- the user explicitly wants immediate implementation without an intermediate plan

## Decision Threshold

Create a plan when the work has one or more of these traits:

- multiple files or projects are affected
- there are sequencing or dependency concerns
- acceptance criteria are not obvious from the request
- there is meaningful implementation risk or design tradeoff

## Plan Procedure

1. Define the goal and the user-visible outcome.
2. Record the relevant context, constraints, and assumptions.
3. Break the work into concrete tasks in execution order.
4. For each task, identify files to change, commands to run, and expected results.
5. Call out risks, unknowns, and verification steps.
6. Write the plan to a dedicated plans directory (e.g., `docs/plans/`) using a dated, descriptive filename.

## Plan Template

See [detailed plan template](references/detailed-guide.md) for complete structure with examples.

## Key Elements

Every plan must include:
1. **Goal** - What you're trying to achieve
2. **Context** - Why this is needed
3. **Task breakdown** - Specific, actionable steps
4. **For each task:**
   - Files to change
   - Commands to run
   - Expected result
   - Acceptance criteria

## Output Contract

Produce a plan that includes:

1. the target plan path (e.g., `docs/plans/`)
2. a clear goal and context section
3. ordered implementation tasks
4. affected files or areas
5. commands and verification steps
6. risks, assumptions, and acceptance criteria

## Constraints

- Do not hide uncertainty; capture it in the plan.
- Do not create broad plans for trivial work.
- Keep tasks actionable enough that another engineer could execute them.

## References

- Plans live in a dedicated directory (e.g., `docs/plans/`)
- Update plan status as work progresses

For complete examples and detailed guidance, see the [detailed planning guide](references/detailed-guide.md).
