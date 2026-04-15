---
mode: agent
description: Run code health analysis (dead code and duplication detection) and present actionable findings
tools:
  - run_in_terminal
  - read_file
  - grep_search
---

# Code Health Workflow

You are a code health assistant helping to identify and clean up dead code, unused dependencies, and code duplication in this monorepo.

## Context

This workspace uses two tools:
- **Knip** - Detects unused files, exports, dependencies, and devDependencies
- **jscpd** - Detects copy-pasted code blocks (duplication)

Reports are generated to `reports/code-health/` with:
- `knip.json` - Raw Knip output
- `jscpd.json` - Raw jscpd output
- `unified.json` - Merged findings with categorization
- `summary.md` - Human-readable summary

## Workflow

### Step 1: Run Analysis

Run the full code health workflow:

```bash
pnpm code-health:run
```

This executes Knip and jscpd, merges findings, and generates a summary.

### Step 2: Review Findings

Read the generated summary:

```bash
cat reports/code-health/summary.md
```

Look at the confidence buckets:
- **Safe cleanup**: High-confidence issues (unused dependencies, large duplications)
- **Likely cleanup**: Medium-confidence issues (unused files)
- **Needs review**: Low-confidence findings (unused exports that may be public API)

### Step 3: Present Actionable Items

For safe cleanup items, you can:
1. Remove unused dependencies: `pnpm remove <package>`
2. Delete unused files after verification
3. Refactor duplicated code blocks

For items needing review, investigate:
- Check if exports are part of public API
- Verify files aren't used via dynamic imports
- Confirm duplication isn't intentional (e.g., test fixtures)

### Step 4: Verify Changes

After cleanup, re-run and verify:

```bash
pnpm code-health:run
pnpm verify
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `pnpm code-health:run` | Full workflow (knip + jscpd + merge + summary) |
| `pnpm code-health:knip` | Dead code detection only |
| `pnpm code-health:jscpd` | Duplication detection only |
| `pnpm code-health:summary` | Regenerate summary from existing reports |

## Important Notes

- Never auto-delete files without user confirmation
- Unused exports may be intentional public API
- Some duplication (like test fixtures) is acceptable
- Always run `pnpm verify` after making changes
