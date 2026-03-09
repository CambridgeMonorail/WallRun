# Instructions Detox Skill

Systematic review process for Copilot instruction files to eliminate bloat, identify rot, and maintain predictable AI behavior.

## Purpose

This skill provides repeatable workflows for:

- Auditing instruction file health
- Identifying context waste
- Maintaining lean, behavioral-focused instructions
- Preventing instruction drift over time

## When to use

- Quarterly maintenance reviews
- After major framework updates
- When Copilot suggestions feel "off"
- Before adding new instruction files
- After multiple instruction additions without deletions

## Core principle

**Context is scarce. Every instruction must earn its place.**

Instructions are guard rails, not a knowledge base. If it doesn't change Copilot's behavior measurably, delete it.

## Success metrics

A healthy instruction ecosystem has:

- All files under 150 lines
- Clear, narrow `applyTo` scopes
- Constraint-based rules (not philosophical)
- No repeated patterns with different wording
- Negative constraints to prevent unwanted behavior
- Alignment with actual codebase patterns

## Workflows

1. [Full Detox Review](workflows/01-full-detox-review.md) - Complete 8-step audit process
2. [Quick Bloat Check](workflows/02-quick-bloat-check.md) - Fast bloat scan (< 15 min)
3. [Rot Detection](workflows/03-rot-detection.md) - Verify instructions match reality
4. [Scope Audit](workflows/04-scope-audit.md) - Review applyTo patterns
5. [Maintenance Review](workflows/05-maintenance-review.md) - Quarterly check-in

## Output

All workflows produce a structured markdown report with:

- Evidence-based findings
- Specific line numbers and quotes
- Before/after recommendations
- Prioritized action items
- Success metrics

## Agent

Use the **Instructions Detox** agent (`@instructions-detox`) to run these workflows.
