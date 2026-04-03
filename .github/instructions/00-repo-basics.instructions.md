---
name: 'Repository Basics'
description: 'Fundamental monorepo conventions and contribution guidelines'
applyTo: 'apps/**/*.{ts,tsx,js,jsx}, libs/**/*.{ts,tsx,js,jsx}'
---

# Repository Basics

## Shared Code Location

- **shadcnui** - Core shadcn/ui components organized by category (data-display, feedback, input-controls, layout, navigation, utilities)
- **shadcnui-blocks** - Higher-level composed components (charts, features, pricing, stats, etc.)
- **shell** - Application shell components (layouts, navigation, sidebar, nav-user, team-switcher)
- **landing** - Landing page sections (hero, features, CTA, about, footer, header, steps)
- **common-tailwind** - Shared Tailwind v4 configuration, theme, and CSS utilities
- **storybook-host** - Storybook configuration and documentation

## Naming and Folder Conventions

- Component files: `ComponentName.tsx` + `ComponentName.test.tsx` colocated
- Type files: `feature.types.ts` adjacent to usage
- Hooks: `useFeatureName.ts` in `hooks/` folder
- Utils: `featureUtils.ts` in `utils/` folder
- Constants: `constants.ts` or `feature.constants.ts`
- Named exports only - no default exports
- Story files: `ComponentName.stories.tsx` colocated

## React and JSX Best Practices

### Component Structure

- Use functional components exclusively
- Import hooks directly: `import { useState } from 'react'` not `React.useState`
- Write JSDoc comments for public component APIs
- Keep component files focused (under 300 lines when possible)

### JSX Patterns

- **Avoid useless fragments**: Return single elements directly
  - ❌ Bad: `return <>{singleElement}</>`
  - ✅ Good: `return singleElement`
  - ✅ Good: `return null` when no content
- **Use fragments only when necessary**:
  - Multiple sibling elements
  - Returning multiple elements from a ternary
  - Adding keys to grouped elements
- **Conditional rendering**:
  - Use ternary for two branches: `{condition ? <A /> : <B />}`
  - Use logical AND for single branch: `{condition && <A />}`
  - Return null/undefined for no content (not empty fragments)
- **Props spreading**: Use sparingly and document what props are being spread

### Hooks Best Practices

- Follow Rules of Hooks (top level, no conditionals)
- Ensure exhaustive dependencies in effect/callback/memo hooks
- Use `useCallback` for event handlers passed as props to memoized components
- Use `useMemo` for expensive computations only
- Consider custom hooks for reusable stateful logic

### Event Handler Patterns

**Extract handlers for reused logic or external calls:**

✅ **Good - Named handlers for external calls**:

```typescript
export function MyPage() {
  const handleGitHubClick = () => {
    window.open('https://github.com/...', '_blank', 'noopener,noreferrer');
  };

  const handleReadmeClick = () => {
    window.open('https://github.com/.../README.md', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Button onClick={handleGitHubClick}>GitHub</Button>
      <Button onClick={handleReadmeClick}>Docs</Button>
    </>
  );
}
```

❌ **Avoid - Duplicated inline handlers**:

```typescript
{/* Repeats window.open boilerplate, harder to maintain */}
<Button onClick={() => window.open('url1', '_blank', 'noopener,noreferrer')}>
  Link 1
</Button>
<Button onClick={() => window.open('url2', '_blank', 'noopener,noreferrer')}>
  Link 2
</Button>
```

**When inline handlers are acceptable:**

- Simple navigation: `onClick={() => navigate('/path')}`
- State updates: `onClick={() => setOpen(true)}`
- Callbacks with arguments: `onClick={() => handleSelect(item.id)}`

**useCallback Usage:**

```typescript
// ❌ Not needed: callback only used within same component
const handleClick = () => {
  doSomething(data);
};

// ✅ Needed: callback passed as prop to memoized child
const handleClick = useCallback(() => {
  doSomething(data);
}, [data]);
```

**Hook Dependencies:**

- Destructure object props first, list primitives in dependency array
- Don't use `useMemo` to force re-evaluation (let state changes trigger renders)
- Use `useMemo` only for expensive computations
- Follow ESLint `exhaustive-deps` warnings

## Component Organization in shadcnui

Components are organized by category in subdirectories:

- `data-display/` - Visual presentation of data (avatar, badge, calendar, card, chart, etc.)
- `feedback/` - User feedback mechanisms (alert, dialog, toast, tooltip, etc.)
- `input-controls/` - Form elements and inputs (button, checkbox, input, select, etc.)
- `layout/` - Layout and structural components (aspect-ratio, resizable, scroll-area, etc.)
- `navigation/` - Navigation elements (breadcrumb, command, dropdown-menu, tabs, etc.)
- `utilities/` - Helper components (form, label, sonner)

## Do NOT

- Don't copy registry entries from similar components without verifying dependencies
- Don't document APIs that aren't exported in `index.ts`
- Don't hardcode version numbers or component counts in marketing copy
- Don't use default exports (use named exports only)
- Don't commit terminal output files (`*-output.txt`, `*-complete.txt`)

## Component Registry Requirements

When updating `apps/client/public/registry/registry.json`:

- List only packages the component actually imports (check `import` statements)
- Include all transitive files (if component uses `useTicker.ts`, include `time.types.ts` too)
- Exclude React and workspace packages (`@tsa/*`)
- Use `"type": "registry:component"` for components, `"registry:lib"` for utilities
- Descriptions must match actual behavior (read the code, don't copy from similar components)
- Installation format: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json component-name`

### Library Documentation

When updating library README files (`libs/*/README.md`):

- Only document APIs exported in `index.ts`
- Verify component props and types match actual implementation
- Don't document internal implementation details
- Don't copy feature lists from similar components without verification

### Marketing Copy

When updating marketing pages, landing copy, or `ROADMAP.md`:

- Don't hardcode component counts (they become stale)
- Verify example component names exist in `index.ts`
- Use descriptive qualifiers: "comprehensive set of components", "see README for current list"

### Component Documentation

When updating component doc pages (`apps/client/src/app/pages/components/**/*Doc.tsx`):

- Match "Built On" text to actual imports in component source
- Verify all documented exports exist in `index.ts`
- Don't document internal hooks that aren't exported

## What Makes a Good PR

- **Scope:** One logical change per PR (avoid mixing features, refactors, and fixes)
- **Size:** Keep PRs reviewable (< 500 lines changed when possible)
- **Tests:** Include tests for new features and bug fixes
- **Validation:** Run `typecheck`, `lint`, and `test` commands before pushing
- **Description:** Explain what changed and why
- **Conventional Commits:** Use conventional commit format (feat:, fix:, docs:, etc.)
- **No breaking builds:** Never commit code that fails validation
- **Affected projects:** Use Nx affected commands to validate only changed projects
- **No terminal logs:** Never commit terminal output files (verification logs, lint output, etc.)
  - ❌ Bad: Committing `verification-complete.txt`, `lint-output.txt`, `validation-output.txt`
  - ✅ Good: Include verification evidence in PR description as markdown code blocks
  - Files matching `*-output.txt` and `*-complete.txt` are gitignored
