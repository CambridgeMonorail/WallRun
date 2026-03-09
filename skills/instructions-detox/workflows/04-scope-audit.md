# Workflow 4: Scope Audit

**Duration:** 10 minutes  
**Frequency:** When adding new instruction files or quarterly  
**Agent:** Instructions Detox

## Purpose

Verify `applyTo` patterns are minimal, intentional, and non-overlapping. Prevent rules from leaking into wrong file types.

## When to run

- Before adding new `.instructions.md` file
- Quarterly maintenance
- When scope-related issues appear (UI rules affecting backend files)
- After monorepo structure changes

## Process

### 1. List All Scopes (2 min)

**Extract all `applyTo` patterns:**

```bash
grep -A 1 "applyTo:" .github/instructions/*.instructions.md
```

**Also check for unscoped (global) rules:**

```bash
# Files without applyTo are global
grep -L "applyTo:" .github/instructions/*.instructions.md
```

**Output:** Table of all scopes

```
| File | applyTo Pattern | Type |
|------|----------------|------|
| 00-repo-basics | apps/**/*.{ts,tsx,js,jsx}, libs/**/*.{ts,tsx,js,jsx} | Broad |
| ui-and-accessibility | **/*.tsx | File-type |
| testing-and-quality | **/*.test.{ts,tsx} | File-type |
| nextjs-app-router | apps/{control-panel-ui,player-cloud-control}/**/*.{ts,tsx} | Narrow |
```

### 2. Check Breadth (2 min)

**Classify each scope:**

- **Global:** No `applyTo` (applies everywhere)
- **Broad:** Matches many directories (`apps/**/*`, `libs/**/*`)
- **Narrow:** Specific apps or folders (`apps/specific-app/**/*`)
- **File-type:** Targets specific extensions (`**/*.test.tsx`)

**Red flags:**

- Multiple global scopes
- Many broad scopes
- UI rules with broad scope
- Test rules without file-type restriction

**Preferred state:**

- 0-1 global files
- Most files narrow or file-type specific
- UI/accessibility rules scoped to `**/*.tsx` only
- Test rules scoped to `**/*.test.*` only

### 3. Detect Overlaps (3 min)

**Find files matched by multiple instruction files:**

```bash
# Example: Check if a typical component file matches multiple scopes
# apps/control-panel-ui/src/components/Button.tsx

# Which instructions apply to this file?
```

Manually test a few representative files:

- `apps/control-panel-ui/src/app/page.tsx` (Next.js page)
- `libs/common-ui/src/Button.tsx` (UI component)
- `apps/control-panel-ui/src/utils/helper.test.ts` (Test file)

**For each, count matching scopes:**

- 1 scope: ✅ Good
- 2-3 scopes: ⚠️ Acceptable if non-conflicting
- 4+ scopes: 🔴 Too much context

**Red flag:** Same file matched by 4+ instruction files

### 4. Check Mismatches (2 min)

**Verify rules apply to intended file types:**

Look for:

- UI rules with `applyTo` including `.ts` (non-UI files)
- Test rules applying to non-test files
- Backend rules applying to frontend
- Mobile rules applying to web apps

**Examples of mismatches:**

```yaml
# ❌ Bad: UI rules applying to non-UI TypeScript
applyTo: '**/*.{ts,tsx}'  # Includes backend .ts files

# ✅ Good: UI rules only for TSX
applyTo: '**/*.tsx'

# ❌ Bad: Test rules too broad
applyTo: '**/*'

# ✅ Good: Test rules scoped to test files
applyTo: '**/*.test.{ts,tsx}, **/*.spec.{ts,tsx}'
```

### 5. Recommend Tightening (1 min)

**For each overly broad scope, recommend narrower alternative:**

```yaml
# Current (too broad)
applyTo: 'apps/**/*.tsx'

# Recommended (specific apps)
applyTo: 'apps/{control-panel-ui,player-cloud-control}/**/*.tsx'

# Or (exclude certain paths)
applyTo: 'apps/**/*.tsx, !apps/legacy-app/**'
```

## Output Format

```markdown
# Scope Audit Report - [Date]

## Summary

- Total instruction files: X
- Global scopes: X
- Broad scopes: X
- Narrow scopes: X
- File-type scopes: X

## Scope Classification

### Global (0-1 expected)

- [file name] - No applyTo

### Broad (minimize these)

- [file name] - `apps/**/*` - Applies to X files

### Narrow (preferred)

- [file name] - `apps/control-panel-ui/**/*.tsx` - Applies to X files

### File-type (good)

- [file name] - `**/*.test.tsx` - Applies to test files only

## Overlap Analysis

Representative file: `apps/control-panel-ui/src/components/Button.tsx`
Matched by:

1. 00-repo-basics.instructions.md
2. nextjs-app-router.instructions.md
3. ui-and-accessibility.instructions.md
   Total: 3 scopes (Acceptable)

## Issues Found

### High Priority

**[file name] - Scope too broad**

- Current: `apps/**/*.{ts,tsx}`
- Issue: UI rules applying to backend files
- Recommendation: `apps/**/*.tsx` (TSX only)

### Medium Priority

**[file name] - Overlapping scopes**

- Overlaps with: [other file]
- Potential conflicts: [describe]
- Recommendation: Consolidate or narrow

### Low Priority

**[file name] - Consider narrowing**

- Current: `**/*.tsx`
- Alternative: `apps/{app1,app2}/**/*.tsx`
- Benefit: Reduce context for other apps

## Recommendations

1. **Tighten:** [X scopes] - [Specific recommendations]
2. **Consolidate:** [X files] - [Merge into one]
3. **Split:** [X file] - [Too many concerns, split by scope]

## Ideal State Target

- Global files: 1 (copilot-instructions.md)
- Broad scopes: 2-3 max
- Narrow/file-type: All others
- Max scopes per file: 3

## Next Steps

1. Update applyTo in [file]
2. Test with representative files
3. Verify no rules lost
```

## Success criteria

Audit complete when:

- All scopes inventoried
- Overlaps identified with examples
- Mismatches flagged
- Specific tightening recommendations provided
- Target scope distribution defined
