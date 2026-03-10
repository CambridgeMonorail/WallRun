# Workflow 5: Maintenance Review

**Duration:** 15 minutes  
**Frequency:** Quarterly  
**Agent:** Instructions Detox

## Purpose

Lightweight quarterly check to catch drift before it becomes bloat. Use this between full detox reviews.

## When to run

- Q1 (March), Q2 (June), Q3 (September), Q4 (December)
- Or: Every 3 months from last full review
- After major releases
- When new team members join

## Prerequisites

- Last full detox review completed
- Changes since last review tracked

## Process

### 1. Quick Metrics (3 min)

**Compare to last review:**

```bash
# Line counts
wc -l .github/instructions/*.instructions.md | tail -1

# Git changes since last review
git log --since="3 months ago" --oneline .github/instructions/
```

**Track:**

- Total line count (now vs last review)
- Number of commits to instruction files
- Files added or deleted
- Net change (additions - deletions)

**Red flags:**

- Line count increased >10%
- Only additions, no deletions
- 5+ commits without full review

### 2. Growth Check (3 min)

**For each file changed since last review:**

```bash
# See what changed
git diff HEAD~10 .github/instructions/[file].md
```

**Evaluate each addition:**

- Is it a constraint or explanation?
- Does it replace existing content or add to it?
- Could it be expressed more tersely?

**Questions:**

- What prompted this addition?
- Has Copilot behavior improved because of it?
- Would deleting it cause problems?

### 3. Alignment Spot Check (5 min)

**Pick 3 random rules added since last review:**

For each:

1. Search codebase for the pattern
2. Verify it's actually being used
3. Check if Copilot was suggesting wrong patterns before the rule

**Example:**

```
Rule added: "Use ApiResponse<T> for server actions"

Verify:
- grep -r "ApiResponse<" apps/ | wc -l
- Check recent PRs for server actions using this pattern
- Ask: Did this rule change behavior or document existing?
```

**Red flag:** Rule added but pattern not found in codebase

### 4. Recent Copilot Behavior (2 min)

**Review recent PR suggestions:**

Look at last 5 PRs:

- Did Copilot suggest anything that violated instructions?
- Did Copilot suggest anything that followed instructions too literally?
- Any patterns that needed correction?

**Actions:**

- If violations: Instruction not working (strengthen or remove)
- If too literal: Instruction too prescriptive (soften)
- If corrections needed: Missing negative constraint

### 5. Housekeeping (2 min)

**Quick maintenance tasks:**

1. **Date tracking:** Update last-reviewed dates in files
2. **Remove unused:** Flag rules not referenced in last quarter
3. **Consolidate:** Merge similar rules if found
4. **Update examples:** Fix outdated code examples

**Tracking pattern:**

```markdown
<!-- Last verified: 2026-Q1 -->
<!-- Added: 2025-Q4 - Reason: Copilot suggesting API routes over server actions -->
<!-- Usage: Referenced in PR #123, #145, #167 -->
```

## Output Format

```markdown
# Maintenance Review - Q[X] 2026

## Metrics vs Last Review

| Metric      | Last Review | Current | Change    |
| ----------- | ----------- | ------- | --------- |
| Total lines | 748         | 795     | +47 (+6%) |
| Files       | 7           | 7       | 0         |
| Commits     | N/A         | 8       | N/A       |
| Additions   | N/A         | 12      | N/A       |
| Deletions   | N/A         | 2       | N/A       |

## Status: [Green/Yellow/Red]

**Green:** On track, minor growth acceptable  
**Yellow:** Growth trending up, watch closely  
**Red:** Significant bloat, schedule full review

## Changes Since Last Review

### Added

- [file]: [rule summary] - [reason] - [X lines]

### Modified

- [file]: [what changed] - [X lines]

### Deleted

- None ⚠️ (deletion bias not active)

## Alignment Spot Checks

**Rule 1:** "[quote]"

- ✅ Verified in codebase (X instances found)
- Behavior changed: Yes/No
- Keep/Review/Delete: Keep

**Rule 2:** "[quote]"

- ⚠️ Pattern not found
- Possibly rot or too new
- Keep/Review/Delete: Review in next full audit

**Rule 3:** "[quote]"

- ✅ Verified, frequently referenced
- Keep/Review/Delete: Keep

## Copilot Behavior Notes

Recent PRs reviewed: [#X, #Y, #Z]

- Violations: [X - describe]
- Improvements: [Y - describe]
- New patterns emerging: [Z - describe]

## Recommendations

### Immediate

- [ ] None / [specific action]

### Next Quarter

- [ ] Schedule full review if growth continues
- [ ] Add negative constraint for [observed pattern]
- [ ] Update example in [file] (uses old API)

### Next Full Review

- [ ] Deep dive on [file] - grew 20+ lines
- [ ] Investigate [pattern] - possible rot

## Next Maintenance Review

Date: [Q, Year]
Owner: [name]
```
