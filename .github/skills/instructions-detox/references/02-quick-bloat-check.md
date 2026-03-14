# Workflow 2: Quick Bloat Check

**Duration:** 10-15 minutes  
**Frequency:** Before adding new instructions  
**Agent:** Instructions Detox

## Purpose

Fast scan for obvious bloat without deep analysis. Use this before adding new instruction content to ensure you're not compounding existing problems.

## When to run

- Before adding new instruction rules
- Monthly quick check
- When a file grows beyond 100 lines
- After team member adds content

## Process

### 1. Line Count Check (2 min)

**Quick command:**

```bash
wc -l .github/instructions/*.instructions.md | sort -rn
```

**Red flags:**

- Any file over 200 lines → Immediate review needed
- Any file over 150 lines → Schedule full review
- Total instruction lines over 1,000 → Context bloat critical

**Action:** List files exceeding thresholds.

### 2. Pattern Count (3 min)

**Search for bloat indicators:**

```bash
# Count "benefits" sections
grep -i "benefit\|advantage\|why this" .github/instructions/*.md | wc -l

# Count examples (excessive if > 10 per file)
grep -c "// ✅\|// ❌" .github/instructions/*.md

# Count explanation paragraphs
grep -c "This ensures\|This improves\|This helps" .github/instructions/*.md
```

**Red flags:**

- More than 5 "benefits/why" mentions
- More than 10 examples per file
- More than 8 explanatory phrases

**Action:** Flag files with high counts for cleanup.

### 3. Repeated Content (3 min)

**Look for duplicates:**

1. Search for common phrases across multiple files:

   - "Use TypeScript"
   - "Import from @tsa/shadcnui"
   - "Run pnpm commands"

2. Check if same pattern explained differently

**Red flag:** Same constraint appears in 2+ files with different wording.

**Action:** Recommend consolidation or deletion.

### 4. Scope Overlap (2 min)

**Quick check:**

```bash
# List all applyTo patterns
grep "applyTo:" .github/instructions/*.instructions.md
```

**Red flags:**

- Multiple files targeting same glob
- Very broad patterns (`apps/**/*`)
- No `applyTo` (global rules)

**Action:** Note overlaps for scope audit.

### 5. Recent Additions (3 min)

**Check what was added recently:**

```bash
git log --since="1 month ago" --oneline .github/instructions/
```

For each recent change:

- Is it additive or a replacement?
- Did line count increase significantly?
- Was anything deleted?

**Red flag:** Only additions, no deletions in past 3 months.

**Action:** Recommend deletion pass.

### 6. Quick Recommendation (2 min)

Based on findings, provide one of three recommendations:

**Green:** Healthy state

- All files under 150 lines
- No obvious duplication
- Recent deletions visible in history
- Minimal bloat indicators

**Yellow:** Schedule full review

- 1-2 files over 150 lines
- Some bloat indicators present
- No deletions in 2+ months

**Red:** Immediate action needed

- Multiple files over 150 lines
- High bloat indicator counts
- No deletions in 3+ months
- Scope overlap issues

## Output Format

```markdown
# Quick Bloat Check - [Date]

## Status: [Green/Yellow/Red]

## Metrics

- Files reviewed: X
- Total lines: X
- Largest file: [name] (X lines)
- Files over 150 lines: X
- Bloat indicators: X mentions

## Red Flags

- [ ] File over 200 lines: [name]
- [ ] No deletions in 3+ months
- [ ] Excessive examples: [file] (X examples)
- [ ] Scope overlap: [files]

## Recommendation

[Green: No action needed / Yellow: Schedule full review / Red: Immediate cleanup]

## Next Steps

[Specific action if Yellow or Red]
```

## Success criteria

Check complete when:

- Line counts verified
- Bloat indicators counted
- Recent changes reviewed
- Clear recommendation provided
