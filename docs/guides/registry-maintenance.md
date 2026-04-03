# Component Registry Maintenance Guide

## Overview

The shadcn-compatible registry at `apps/client/public/registry/registry.json` enables external users to install signage components via the shadcn CLI:

```bash
npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json component-name
```

This guide provides detailed procedures for maintaining accurate registry entries.

## Registry Entry Structure

Each component entry requires:

- **name** - Component name (kebab-case)
- **type** - `"registry:component"` for components, `"registry:lib"` for utilities/hooks
- **description** - What the component does (must match actual behavior)
- **dependencies** - NPM packages the component imports (excluding React and workspace packages)
- **files** - All files needed to install the component (including transitive dependencies)

## Verification Workflow

### Step 1: Identify All Component Files

1. Open the component source file
2. Note all relative imports (`./`, `../`)
3. List the component file itself
4. List all imported hooks, utilities, and types

**Example:** For `Clock.tsx`:

- Main file: `Clock.tsx`
- Hook: `useTicker.ts` (imported)
- Types: `time.types.ts` (imported by `useTicker.ts`)

### Step 2: Check Import Statements

For each file in the component:

1. Open the file
2. Read all `import` statements at the top
3. Identify third-party packages (not from `react`, `@tsa/*`, or relative paths)
4. Add each package to the `dependencies` array

**Example imports:**

```typescript
import { useMemo } from 'react'; // ❌ Don't include (React assumed)
import { Button } from '@tsa/shadcnui'; // ❌ Don't include (workspace package)
import { formatDistance } from 'date-fns'; // ✅ Include "date-fns"
import { Calendar } from 'lucide-react'; // ✅ Include "lucide-react"
import { cn } from '../utils/cn'; // Check if cn.ts is in files[]
```

### Step 3: Trace Transitive Dependencies

For each imported file (hooks, utilities, types):

1. Open the imported file
2. Check its imports
3. Add any new files to the `files[]` array
4. Repeat until no new imports found

**Critical:** This is the most common mistake. Missing transitive files break installation.

**Example:** `useTicker.ts` imports `time.types.ts` → both must be in `files[]`

### Step 4: Verify Descriptions Match Behavior

1. Read the component implementation
2. Identify what it actually does (not what you think it should do)
3. Write description based on actual behavior
4. Don't copy descriptions from similar components

**Bad description examples:**

- "Shows elapsed time" (when component clamps at zero, not negative)
- "Displays countdown with zoom effect" (when zoom transition doesn't exist)
- Generic description copied from another component

**Good description examples:**

- "Displays time remaining until target. Stops at zero when target is reached."
- "Rotates through child elements on interval with crossfade transition."

### Step 5: Set Correct File Types

Each file in `files[]` needs a type:

- `"registry:component"` - React components (`.tsx` files that export components)
- `"registry:lib"` - Utilities, hooks, types (`.ts` files, non-component `.tsx`)

### Step 6: Test Installation Locally

Before committing:

```bash
# Build the registry
cd apps/client
pnpm build

# Serve locally
pnpm preview

# Test install (in another directory)
npx shadcn@latest add http://localhost:4173/registry/registry.json component-name
```

Verify:

- All files copied correctly
- No missing imports
- Component runs without errors

## Common Mistakes and How to Avoid Them

### Mistake 1: Copying Dependency Lists

❌ **Wrong:**

```json
{
  "name": "countdown",
  "dependencies": ["date-fns", "date-fns-tz"] // Copied from another component
}
```

✅ **Correct:**

```json
{
  "name": "countdown",
  "dependencies": [] // Checked imports, uses only React and Intl API
}
```

**Solution:** Always read actual import statements. Don't assume.

### Mistake 2: Missing Transitive Dependencies

❌ **Wrong:**

```json
{
  "files": [
    { "path": ".../Clock.tsx", "type": "registry:component" },
    { "path": ".../useTicker.ts", "type": "registry:lib" }
    // Missing time.types.ts imported by useTicker!
  ]
}
```

✅ **Correct:**

```json
{
  "files": [
    { "path": ".../Clock.tsx", "type": "registry:component" },
    { "path": ".../useTicker.ts", "type": "registry:lib" },
    { "path": ".../time.types.ts", "type": "registry:lib" }
  ]
}
```

**Solution:** Trace through ALL relative imports in every file.

### Mistake 3: Wrong File Types

❌ **Wrong:**

```json
{
  "files": [
    { "path": ".../useTicker.ts", "type": "registry:component" } // It's a hook!
  ]
}
```

✅ **Correct:**

```json
{
  "files": [{ "path": ".../useTicker.ts", "type": "registry:lib" }]
}
```

**Solution:** Components export JSX. Everything else is `registry:lib`.

### Mistake 4: Inaccurate Descriptions

❌ **Wrong:**

```json
{
  "description": "Shows time remaining with negative values when expired"
}
```

When actual code:

```typescript
const remaining = Math.max(0, targetMs - nowMs); // Clamps at zero!
```

✅ **Correct:**

```json
{
  "description": "Shows time remaining until target. Stops at zero when reached."
}
```

**Solution:** Read the implementation. Don't guess.

## Verification Checklist

Before committing registry changes:

- [ ] Opened each file in `files[]`
- [ ] Checked all `import` statements
- [ ] Traced all relative imports (`../`, `./`)
- [ ] Verified no transitive files missing
- [ ] Confirmed dependencies list only includes actual NPM packages
- [ ] Excluded React and `@tsa/*` workspace packages
- [ ] Read component implementation
- [ ] Verified description matches actual behavior
- [ ] Set correct type for each file
- [ ] Tested installation locally (optional but recommended)

## Installation Command Format

### Correct Format

Always use this format in documentation:

```bash
npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json component-name
```

**Key points:**

- Full registry URL with `/registry.json`
- Component name after the URL (not in URL path)
- Space-separated for multiple components

### Multiple Components

```bash
npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json clock countdown metric-card
```

### Incorrect Patterns

❌ Don't use:

- Two-step process: `shadcn add registry` then `shadcn add component`
- Individual JSON URLs: `.../registry/clock.json`
- Missing `/registry.json`: `.../registry`
- Multi-line with backslashes (harder to copy-paste)

## Registry JSON Template

Use this template for new entries:

```json
{
  "name": "component-name",
  "type": "registry:component",
  "description": "Brief description of what it actually does",
  "dependencies": [],
  "files": [
    {
      "path": "libs/shadcnui-signage/src/lib/category/ComponentName.tsx",
      "type": "registry:component"
    }
  ]
}
```

Add dependencies and files as needed following the verification workflow above.

## Troubleshooting

### Users Report Missing Dependencies

**Symptom:** `Cannot find module 'package-name'`

**Cause:** Package not in `dependencies` array

**Fix:** Add the package to `dependencies`:

```json
"dependencies": ["package-name"]
```

### Users Report Missing Files

**Symptom:** `Cannot resolve './utils/helper'`

**Cause:** Transitive dependency not in `files[]`

**Fix:** Trace imports and add missing files with correct paths and types

### Installation Fails Silently

**Symptom:** No error, but files not copied

**Cause:** Wrong registry URL format

**Fix:** Ensure URL ends with `/registry.json` and component name is after URL

## Maintenance Schedule

- **After adding component:** Verify registry entry before PR
- **Monthly:** Review recent entries for accuracy
- **Quarterly:** Full registry audit with test installations

## Related Documentation

- [shadcn CLI Documentation](https://ui.shadcn.com/docs/cli)
- [Component Registry Protocol](https://ui.shadcn.com/docs/components-json)
- [Repository Basics](../../.github/instructions/00-repo-basics.instructions.md)
