# The Sign Age

Digital signage as software. Nx + pnpm monorepo using React 19, Tailwind v4, shadcn/ui, and Vite to build reusable signage-oriented UI primitives, layouts, and blocks.

## Git Workflow - ALWAYS USE BRANCHES

**CRITICAL: Never commit directly to `main`** - Main is a protected branch that requires pull requests.

### Branch Workflow

1. **Before starting work**, create a feature branch from up-to-date main:

   ```bash
   git checkout main
   git pull
   git checkout -b feat/your-feature-name
   # or: git checkout -b fix/bug-description
   # or: git checkout -b chore/task-description
   ```

2. **Work in your branch** - commit regularly with conventional commit messages:

   ```bash
   git add -A
   git commit -m "feat(scope): description"
   # repeat as you work; keep commits small and focused
   ```

3. **Create pull request** - push to your branch and open PR to main:

   ```bash
   git push -u origin feat/your-feature-name
   ```

4. **Never push commits directly to `main`** - always check `git branch` before pushing

### Branch Naming Convention

- `feat/` - New features (e.g., `feat/brightsign-deploy`)
- `fix/` - Bug fixes (e.g., `fix/router-state-loss`)
- `chore/` - Maintenance tasks (e.g., `chore/update-deps`)
- `docs/` - Documentation updates (e.g., `docs/deployment-guide`)
- `refactor/` - Code refactoring (e.g., `refactor/optimize-bundle`)

## Global TypeScript Conventions

- Use strict TypeScript with no `any` (use `unknown` with type guards)
- Prefer `type` for object shapes, unions, intersections
- Use `interface` only when extending or merging definitions
- Named exports only (no default exports)
- Colocate types with usage or in adjacent `*.types.ts` files

## Global React Conventions

- Use functional components exclusively
- Import hooks directly: `import { FC, useState } from 'react'` not `React.FC`
- Use hooks for state management: `useState`, `useMemo`, `useEffect`, `useCallback`
- Write JSDoc comments for public component APIs
- Ensure ARIA attributes, keyboard navigation, and focus management

## Global Testing Expectations

- Write tests for all new features and bug fixes
- Vitest for unit and component tests
- Use `@testing-library/react` for component tests
- Colocate tests with implementation: `Component.tsx` + `Component.test.tsx`
- Minimum 80% coverage for new code
- Playwright E2E tests for critical user flows in `apps/client`

## Global Accessibility Baseline

- All interactive elements must be keyboard accessible
- Form inputs require associated labels
- Use semantic HTML elements (button, nav, main, etc.)
- Maintain logical focus order
- Provide text alternatives for non-text content
- Ensure sufficient color contrast (WCAG AA minimum)

## Nx and Monorepo Guidance

- **Use Nx affected commands to determine impacted scope** - do not guess which apps are affected
  - Commands: `pnpm run build:affected`, `pnpm run test:affected`, `pnpm run lint:affected`
- Prefer existing pnpm scripts defined in `package.json` - do not invent new scripts
- Avoid broad refactors unless explicitly requested
- Use workspace imports for cross-project: `@tsa/shadcnui`, `@tsa/shell`, `@tsa/landing`
- Use relative imports within same project: `../../components/Button`
- Apps import from libs; libs never import from apps
- Path mappings in `tsconfig.base.json`

## Library Structure

- **shadcnui** - Core shadcn/ui components organized by category
  - Data Display (avatar, badge, calendar, card, carousel, chart, progress, skeleton, table)
  - Feedback (alert, alert-dialog, dialog, drawer, hover-card, popover, toast, tooltip)
  - Input Controls (button, checkbox, input, radio, select, slider, switch, textarea, toggle)
  - Layout (aspect-ratio, collapsible, resizable, scroll-area, separator, sheet, sidebar)
  - Navigation (accordion, breadcrumb, command, context-menu, dropdown-menu, menubar, navigation-menu, pagination, tabs)
  - Utilities (form, label, sonner)
- **shadcnui-blocks** - Higher-level composed components (action-buttons, charts, features, hero, pricing, stats, etc.)
- **shell** - Application shell components (layouts, navigation, sidebar)
- **landing** - Landing page sections (hero, features, CTA, footer, etc.)
- **common-tailwind** - Shared Tailwind v4 configuration and theme

## Technology Stack

- **React** (major version pinned in `package.json`)
- **TypeScript** (strict mode)
- **Nx** (monorepo tooling)
- **Vite** (build/dev)
- **Vitest** + **Testing Library** (unit/component tests)
- **Playwright** (E2E tests)
- **Tailwind CSS v4** + **shadcn/ui** (UI)
- **Storybook** (component docs)
- **pnpm** (package manager)

Source of truth for exact versions:

- `package.json`
- `pnpm-lock.yaml`

## App-Specific Rules

App-specific conventions, patterns, and tooling guidance are in `.github/instructions/*.instructions.md` with `applyTo` scoping.

Currently available:

- Repository basics and monorepo conventions (`00-repo-basics.instructions.md`)
- React SPA and routing patterns (`react-spa-router.instructions.md`)
- Testing and quality workflows (`testing-and-quality.instructions.md`)
- UI and accessibility patterns (`ui-and-accessibility.instructions.md`)
- Style guide compliance for demo website (`style-guide-compliance.instructions.md`)

## Design Philosophy

The demo website **chrome/shell** (navigation, layouts, UI in `apps/client`) follows `docs/design/STYLE_GUIDE.md`: Premium B2B SaaS aesthetic - calm, confident internal tooling, not marketing-led. If it feels eager or looks like a landing page, it's wrong.

**Signage content** being demonstrated follows signage design rules (10-foot rule, high visibility), not the website style guide.
