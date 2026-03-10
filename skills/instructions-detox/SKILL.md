---
name: instructions-detox
description: Audit Copilot instruction files for bloat, overlap, stale rules, and weak applyTo scope. Use when reviewing or refactoring .instructions.md, AGENTS.md, copilot-instructions.md, or SKILL.md files, and produce a prioritized markdown report with findings, line references, and recommended deletions or rewrites.
---

# Instructions Detox Skill

## Purpose

Use this skill to review instruction files as behavioral guard rails rather than passive documentation. The goal is to remove context waste, detect drift, and keep instruction loading predictable.

## When to Use

Use this skill when:

- instruction files have accumulated over time without cleanup
- Copilot suggestions feel inconsistent, noisy, or off-pattern
- you are adding new instruction files and want to avoid overlap
- you are reviewing `applyTo` scope quality
- you need a maintenance audit before merging instruction changes

## Do Not Use When

Do not use this skill when:

- debugging application runtime issues
- implementing product features
- fixing lint, test, or build failures unrelated to instruction quality

## Core Principle

**Context is scarce. Every instruction must earn its place.**

If an instruction does not measurably change agent behavior, tighten it or delete it.

## Review Procedure

1. Inventory the instruction surface and identify canonical versus generated files.
2. Check whether each file has a narrow purpose and a clear trigger or scope.
3. Remove or flag duplicated guidance, philosophical prose, and stale rules.
4. Audit `applyTo` patterns for over-broad matching and gaps.
5. Compare the instructions with the current codebase and workflow reality.
6. Produce a prioritized remediation report with the highest-risk problems first.

## Success Metrics

A healthy instruction ecosystem has:

- small, focused files with one job each
- clear and narrow `applyTo` scopes
- constraints that prevent bad behavior
- minimal duplication across files
- wording that matches actual repository workflows

## Output Contract

Produce a markdown report containing:

1. severity-ordered findings
2. exact file references and line references
3. quoted examples of bloated, stale, or duplicated guidance
4. recommended rewrites, deletions, or scope changes
5. a short action plan for remediation

## Constraints

- Prefer deletion or consolidation over adding more instruction text.
- Do not rewrite generated mirrors before updating the canonical source.
- Do not propose vague style advice without evidence from the files.

## Workflows

1. [Full Detox Review](workflows/01-full-detox-review.md) - Complete 8-step audit process
2. [Quick Bloat Check](workflows/02-quick-bloat-check.md) - Fast bloat scan (< 15 min)
3. [Rot Detection](workflows/03-rot-detection.md) - Verify instructions match reality
4. [Scope Audit](workflows/04-scope-audit.md) - Review applyTo patterns
5. [Maintenance Review](workflows/05-maintenance-review.md) - Quarterly check-in

## Agent

Use the **Instructions Detox** agent (`@instructions-detox`) to run these workflows.
