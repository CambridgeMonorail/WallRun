# Workflow 1: Full Detox Review

**Duration:** 30-45 minutes  
**Frequency:** Quarterly or after major changes  
**Agent:** Instructions Detox

## Purpose

Complete audit of all Copilot instruction files following the 8-step detox process.

## When to run

- Quarterly (March, June, September, December)
- After major framework upgrades
- When multiple new instructions added
- When Copilot suggestions feel unpredictable

## Prerequisites

- No pending instruction file changes
- Recent pull requests reviewed (to see what Copilot has been suggesting)

## Process

### Step 1: Inventory (5 min)

**Objective:** Map the instruction ecosystem.

**Actions:**

1. List all files matching:
   - `.github/copilot-instructions.md`
   - `.github/instructions/*.instructions.md`
   - `.github/agents/*.agent.md`
2. For each file, record:
   - Scope (global vs targeted `applyTo`)
   - Stated purpose (from frontmatter/header)
   - Line count
   - Last git commit date

**Output:** Inventory table

### Step 2: Identify Bloat (10 min)

**Objective:** Find content that doesn't change behavior.

**Actions:**

1. For each file over 100 lines:
   - Count examples (flag if more than 2 per pattern)
   - Identify "Benefits", "Why", "Rationale" sections
   - Find repeated explanations
   - Locate philosophical guidance
2. For all files:
   - Search for justification language ("This improves...", "This ensures...", "This helps...")
   - Identify multi-paragraph explanations

**Red flags:**

- File over 200 lines
- More than 3 examples of same pattern
- Sections explaining benefits
- Historical context ("We used to...", "Previously...")

**Output:** Bloat findings with specific quotes and line numbers

### Step 3: Identify Rot (10 min)

**Objective:** Find instructions that don't match current reality.

**Actions:**

1. Extract patterns mentioned in instructions (e.g., "use `export default`")
2. Search codebase for actual usage:
   ```
   For "prefer X over Y" → search for Y instances
   For "always use X" → verify X is actually used
   For "avoid X" → check if X exists
   ```
3. Check framework versions match instructions
4. Verify import paths still correct

**Red flags:**

- Pattern mentioned but not found in codebase
- Instruction says "never" but examples exist
- Framework version assumptions (e.g., "React 17 patterns")
- Deprecated APIs mentioned

**Output:** Rot findings with search evidence

### Step 4: Check Scope Discipline (5 min)

**Objective:** Verify `applyTo` patterns are minimal and intentional.

**Actions:**

1. List all `applyTo` patterns
2. Check for:
   - Overly broad patterns (`**/*`)
   - Overlapping scopes (same files matched by multiple rules)
   - Rules applying to wrong file types
   - Global rules (no `applyTo` at all)

**Preferred state:**

- Narrow globs: `apps/specific-app/**/*.{ts,tsx}`
- File-type specific: `**/*.test.{ts,tsx}`
- No catch-all `**/*` patterns
- Few truly global rules

**Output:** Scope issues with recommendations

### Step 5: Rewrite for Constraint (5 min)

**Objective:** Convert verbose rules to constraints.

**Actions:**

1. For each bloated section identified in Step 2:
   - Extract the core constraint
   - Remove justification
   - Remove examples beyond 1 good + 1 bad
   - Rewrite in plain language

**Pattern:**

```
Before (verbose):
"Server Actions are preferred over API routes because they provide
better type safety, automatic serialization, and improved security.
This approach ensures..."

After (constraint):
"Prefer server actions over API routes."
```

**Output:** Before/after rewrites with line count reduction

### Step 6: Add Negative Space (3 min)

**Objective:** Identify missing "do not" rules.

**Actions:**

1. Review recent PRs for unwanted Copilot suggestions
2. Identify patterns of:
   - Unwanted refactoring
   - Scope creep in changes
   - Framework misuse
3. Propose "do not" rules to prevent them

**Examples:**

- "Do not refactor unrelated code"
- "Do not create new abstractions without request"
- "Do not modify package.json without explicit instruction"

**Output:** List of recommended negative constraints

### Step 7: Move to Docs (2 min)

**Objective:** Identify content better suited for architecture docs.

**Actions:**

1. Flag sections covering:
   - Coding philosophy
   - Trade-off discussions
   - "Why we chose X" explanations
   - Variable strategies ("it depends on...")

**Target destinations:**

- `docs/architecture/` - Patterns and decisions
- `docs/testing/` - Testing philosophy
- `docs/ui/` - Design system rationale

**Output:** Content to move with proposed locations

### Step 8: Maintenance Plan (2 min)

**Objective:** Prevent future bloat.

**Actions:**

1. Recommend review cadence (quarterly, monthly, per-sprint)
2. Assign ownership (tech lead, senior engineer)
3. Establish deletion bias ("if in doubt, take it out")

**Tracking suggestion:**

```markdown
<!-- Added: 2026-Q1 - Reason: Copilot suggesting wrong API patterns -->
<!-- Last verified: 2026-Q2 - PR #123 -->
<!-- Remove if not referenced by 2026-Q3 -->
```

**Output:** Maintenance recommendations

## Final Report

Combine all outputs into structured markdown report:

```markdown
# Instructions Detox Report - [Date]

## Executive Summary

- Files reviewed: X
- Total lines: X
- Recommended deletions: X lines (X%)
- Rot issues: X
- Scope issues: X

## High Priority Actions

1. [Delete X lines from file Y]
2. [Fix rot in file Z]

## Medium Priority

...

## Low Priority

...

## Success Metrics

- [ ] All files under 150 lines
- [ ] X lines removed
- [ ] X rot issues fixed
      ...

## Next Review: [Date]
```

## Handoff

Present report to team for:

1. Review and approval
2. Implementation (manual or via Copilot)
3. Validation (test Copilot suggestions after changes)

## Success criteria

Review complete when:

- All 8 steps executed with evidence
- Specific line numbers and quotes provided
- Action items prioritized
- Success metrics defined
- Next review scheduled
