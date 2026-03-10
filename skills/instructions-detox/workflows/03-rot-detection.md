# Workflow 3: Rot Detection

**Duration:** 15-20 minutes  
**Frequency:** After framework updates or when suggestions feel off  
**Agent:** Instructions Detox

## Purpose

Verify that instructions match current codebase reality. Detect rules encoding patterns you no longer use.

## When to run

- After major framework updates (React, Next.js, etc.)
- When Copilot confidently suggests deprecated patterns
- After architectural changes
- When team coding standards shift

## Process

### 1. Extract Claimed Patterns (5 min)

**Read all instruction files and list specific claims:**

Look for directive language:

- "Always use X"
- "Never use Y"
- "Prefer X over Y"
- "Use X instead of Y"
- "Import from X"
- "Files should be named X"

**Output:** List of claimed patterns

Example:

```
- "Always use named exports" (00-repo-basics.instructions.md)
- "Never use default exports" (00-repo-basics.instructions.md)
- "Import shadcn from @tsa/shadcnui" (ui-and-accessibility.instructions.md)
- "Use .test.tsx for tests" (testing-and-quality.instructions.md)
```

### 2. Verify Each Pattern (10 min)

**For each claimed pattern, search codebase:**

#### "Always use X" verification:

```bash
# Example: "Always use named exports"
# Search for counter-examples (default exports)
grep -r "export default" apps/ libs/ --include="*.ts" --include="*.tsx" | wc -l
```

**Expected:** 0-5 violations (only Next.js pages, config files)  
**Red flag:** 10+ violations

#### "Never use Y" verification:

```bash
# Example: "Never use any type"
grep -r ": any" apps/ libs/ --include="*.ts" --include="*.tsx" | wc -l
```

**Expected:** 0 violations  
**Red flag:** Any violations

#### "Prefer X over Y" verification:

```bash
# Count instances of X vs Y
# Example: "Prefer const over let"
X_count=$(grep -r "^const " apps/ | wc -l)
Y_count=$(grep -r "^let " apps/ | wc -l)
# X should be >> Y
```

**Expected:** X usage 10x or more than Y  
**Red flag:** Y usage comparable to X

#### Import path verification:

```bash
# Example: Import from @tsa/shadcnui
grep -r "from '@tsa/shadcnui'" apps/ --include="*.tsx" | wc -l
```

**Expected:** Multiple matches  
**Red flag:** 0 matches (path is wrong)

#### File naming verification:

```bash
# Example: "Components named ComponentName.tsx"
find apps/ libs/ -name "*.tsx" -type f | grep -v "[a-z]" | wc -l
```

**Expected:** Consistent with claim  
**Red flag:** Many violations

### 3. Check Framework Versions (2 min)

**Verify framework assumptions:**

```bash
# Check package.json for versions
cat package.json | grep -A 1 "react\|next\|@tanstack/react-query"
```

Compare to instructions:

- Do instructions mention specific versions?
- Do patterns assume old API?
- Are deprecated APIs referenced?

**Red flags:**

- Instructions reference React 17, package.json shows 19
- Next.js App Router instructions but Pages Router in use
- Deprecated API patterns mentioned

### 4. Architectural Alignment (3 min)

**Check folder structure claims:**

```bash
# Example: "Put components in components/"
find apps/control-panel-ui -type d -name "components" | wc -l
```

Verify instructions match:

- Actual folder structure
- Current monorepo organization
- Import path conventions

**Red flags:**

- Instruction says "Put X in folder Y", folder Y doesn't exist
- Instruction references old folder structure
- Import paths don't match current tsconfig paths

### 5. Categorize Findings (2 min)

**For each pattern, classify:**

✅ **Aligned:** Pattern verified in codebase, instruction accurate  
⚠️ **Partial rot:** Pattern mostly followed but violations exist  
🔴 **Full rot:** Pattern not found or contradicted by codebase

## Output Format

````markdown
# Rot Detection Report - [Date]

## Summary

- Patterns checked: X
- Aligned: X
- Partial rot: X
- Full rot: X

## Full Rot (Fix Immediately)

### [Instruction file] - "[Quoted rule]"

- **Claim:** "Always use X"
- **Reality:** Found Y violations in codebase
- **Evidence:**
  ```bash
  grep -r "pattern" apps/ | wc -l
  # Output: 47 violations
  ```
````

- **Recommendation:** Remove rule or update to match reality

## Partial Rot (Review)

### [Instruction file] - "[Quoted rule]"

- **Claim:** "Prefer X over Y"
- **Reality:** Y used 30% of the time
- **Evidence:** [search results]
- **Recommendation:** Soften rule or enforce more strictly

## Aligned (Keep)

### [Instruction file] - "[Quoted rule]"

- **Verified:** ✅ Pattern consistent in codebase
- **Evidence:** [search results]

## Framework Version Check

- React: [version] - Instructions assume: [version] - Status: [OK/Mismatch]
- Next.js: [version] - Instructions assume: [version] - Status: [OK/Mismatch]
- etc.

## Recommendations

1. **Delete:** [X rules with full rot]
2. **Update:** [X rules with partial rot]
3. **Keep:** [X aligned rules]

## Next Steps

1. [Specific file edits needed]
2. [Framework assumption updates]
3. [Folder structure corrections]

```

## Success criteria

Detection complete when:
- All claimed patterns searched
- Evidence provided for each
- Clear rot vs aligned classification
- Specific recommendations for fixes
- Framework versions verified
```
