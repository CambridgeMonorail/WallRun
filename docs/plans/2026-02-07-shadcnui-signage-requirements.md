# Signage Components Library Requirements

**Status:** Active baseline reference

**Scope note:** This document captures the original baseline requirements for the first phase of `@wallrun/shadcnui-signage`. The current library has expanded beyond this initial scope, including additional components and behaviour primitives. Keep using this file for foundational constraints and design intent, not as the complete current inventory.

## Purpose

Create a React component library for building digital signage screens using shadcn/ui and Tailwind CSS v4, optimized for fixed-aspect displays, distance readability, and predictable layouts.

The library is intended for developers building content closer to PowerPoint slides than web apps, with occasional interactivity.

This library must integrate cleanly into WallRun's existing Nx monorepo and sit on top of our current shadcn foundations.

## Existing libraries

The repository already contains:

### `libs/shadcnui`

Base shadcn/ui components organized by category (data-display, feedback, input-controls, layout, navigation, utilities). Uses Tailwind v4 tokens and theme configuration. This is the source of truth for primitives.

**Import path:** `@wallrun/shadcnui`

### `libs/shadcnui-blocks`

Generic higher-level UI compositions built from `libs/shadcnui` (action-buttons, charts, pricing, stats, etc.). These are not signage-specific.

**Import path:** `@wallrun/shadcnui-blocks`

## New library to create

### Library name

`libs/shadcnui-signage`

**Import path:** `@wallrun/shadcnui-signage`

This library will contain signage-specific primitives, layouts, and blocks.

## Dependency rules

These rules are strict and align with WallRun monorepo conventions:

### `libs/shadcnui` dependencies

- No dependencies on other internal libraries
- Only depends on external packages (Radix UI, Tailwind CSS, etc.)

### `libs/shadcnui-blocks` dependencies

- May depend on `@wallrun/shadcnui`
- May depend on `common-tailwind`

### `libs/shadcnui-signage` dependencies

- May depend on `@wallrun/shadcnui`
- May depend on `@wallrun/shadcnui-blocks` (only where appropriate)
- May depend on `common-tailwind`

### Import rules

**Consuming apps must import only from public entry points:**

- ✅ `import { Component } from '@wallrun/shadcnui-signage'`
- ❌ `import { Component } from '@wallrun/shadcnui-signage/lib/primitives'`

**All public exports must come from `src/index.ts` using named exports only (no default exports).**

## Non-goals

- Not a CMS
- Not a drag-and-drop editor
- Not a runtime layout engine
- Not a replacement for shadcn/ui
- No animation system beyond basic CSS if required

## Design principles

### Shadcn compatible

Use existing components, tokens, and patterns from `@wallrun/shadcnui` rather than re-implementing them.

### Screen first

Optimized for fixed aspect ratios and known resolutions.

### Predictable

Layouts must render deterministically at target resolutions.

### Legible at distance

Strong typography defaults, clamping, and spacing.

### Data friendly

Components must handle API-driven content safely.

### Low magic

Simple React functional components with TypeScript, no hidden runtime behavior.

### Accessibility first

Follow WallRun's accessibility baseline: semantic HTML, keyboard navigation, ARIA attributes, WCAG AA contrast.

## Folder structure

Following WallRun's library organization patterns:

```
libs/shadcnui-signage/
├── src/
│   ├── lib/
│   │   ├── primitives/
│   │   │   ├── ScreenFrame.tsx
│   │   │   ├── ScreenFrame.spec.tsx
│   │   │   ├── ScreenFrame.stories.tsx
│   │   │   └── SafeAreaOverlay.tsx (internal, optional)
│   │   ├── layouts/
│   │   │   ├── SplitScreen.tsx
│   │   │   ├── SplitScreen.spec.tsx
│   │   │   └── SplitScreen.stories.tsx
│   │   ├── blocks/
│   │   │   ├── FullscreenHero.tsx
│   │   │   ├── FullscreenHero.spec.tsx
│   │   │   ├── FullscreenHero.stories.tsx
│   │   │   ├── InfoCardGrid.tsx
│   │   │   ├── InfoCardGrid.spec.tsx
│   │   │   └── InfoCardGrid.stories.tsx
│   │   ├── types/
│   │   │   └── signage.types.ts
│   │   └── utils/
│   │       ├── clamp.ts
│   │       ├── clamp.spec.ts
│   │       ├── resolution.ts
│   │       └── resolution.spec.ts
│   └── index.ts
├── README.md
├── project.json
├── tsconfig.json
├── tsconfig.lib.json
├── tsconfig.spec.json
├── vite.config.ts
└── eslint.config.js
```

### `src/index.ts`

- Named exports only (no default exports)
- No wildcard exports
- Colocate tests with implementation: `Component.tsx` + `Component.spec.tsx`
- Colocate Storybook stories: `Component.tsx` + `Component.stories.tsx`

## v0.1 components to implement

### 1. ScreenFrame

**Purpose:**

Provides a predictable preview container for signage screens by enforcing a fixed resolution and aspect ratio. Used primarily in Storybook and demo views.

**Props:**

```typescript
type ScreenFrameProps = {
  resolution: '1080p' | '4k' | 'portrait-1080p';
  scale?: number; // default 1
  showSafeArea?: boolean;
  children: ReactNode;
  className?: string;
};
```

**Behavior:**

- Enforces exact aspect ratios:
  - `1080p`: 1920 × 1080
  - `4k`: 3840 × 2160
  - `portrait-1080p`: 1080 × 1920
- Uses CSS scaling to fit inside Storybook viewports
- Optional safe area overlay for QA and review
- Must not allow content to overflow the frame

**Acceptance criteria:**

- ✅ Resolution switching changes aspect ratio correctly
- ✅ Content remains clipped within the frame
- ✅ Safe area overlay can be toggled in Storybook
- ✅ Unit tests cover resolution logic
- ✅ Storybook stories demonstrate all resolutions

### 2. SplitScreen

**Purpose:**

A deterministic two-zone layout for common signage compositions.

**Props:**

```typescript
type SplitScreenProps = {
  direction?: 'row' | 'column'; // default "row"
  ratio?: '50-50' | '60-40' | '70-30' | '80-20'; // default "70-30"
  primary: ReactNode;
  secondary: ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
};
```

**Behavior:**

- Uses CSS grid or flex with fixed ratios
- Zones fill the available width or height
- Secondary content must not collapse at narrow sizes

**Acceptance criteria:**

- ✅ All ratios render as expected in Storybook
- ✅ No overflow for reasonable content
- ✅ Unit tests cover layout logic
- ✅ Stories demonstrate all ratios and directions

### 3. FullscreenHero

**Purpose:**

A classic signage hero screen for announcements, notices, or welcome screens.

**Props:**

```typescript
type FullscreenHeroProps = {
  title: string;
  subtitle?: string;
  body?: string;
  cta?: { label: string; hint?: string };
  variant?: 'light' | 'dark';
  backgroundImageUrl?: string;
  logo?: ReactNode;
  className?: string;
};
```

**Behavior:**

- Enforces strong typography hierarchy
- Text clamping rules:
  - Title: max 2 lines
  - Subtitle: max 2 lines
  - Body: max 4 lines
- Background image must include an overlay to preserve contrast

**Acceptance criteria:**

- ✅ Long text never overflows
- ✅ Light and dark variants remain readable (WCAG AA contrast)
- ✅ Background image does not reduce legibility
- ✅ Unit tests cover text clamping classes
- ✅ Stories demonstrate normal, long text, and background image variants

### 4. InfoCardGrid

**Purpose:**

A signage-friendly grid for menus, promos, KPIs, or summary tiles.

**Props:**

```typescript
type InfoCardItem = {
  title: string;
  value?: string;
  description?: string;
  meta?: string;
};

type InfoCardGridProps = {
  items: InfoCardItem[];
  columns?: 2 | 3 | 4; // default 3
  density?: 'comfortable' | 'compact';
  highlightIndex?: number;
  className?: string;
};
```

**Behavior:**

- Cards are equal height and aligned
- Titles and descriptions are clamped
- Highlighted card uses emphasis without changing layout

**Acceptance criteria:**

- ✅ Grid renders correctly at 1080p
- ✅ Highlight does not break alignment
- ✅ Compact and comfortable density behave predictably
- ✅ Unit tests cover item count and column logic
- ✅ Stories demonstrate 2, 3, 4 columns and density variants

## Styling requirements

- Use **Tailwind CSS v4** for layout and spacing (note: CSS-first config, not JS)
- Use shadcn/ui tokens from `common-tailwind` for colors, borders, radius, and typography
- Avoid custom CSS unless strictly necessary
- No hardcoded colors outside token usage
- Follow WallRun's utility-first approach
- Use `cn()` utility from `@wallrun/shadcnui` for conditional classes

## Storybook requirements

Storybook 10.2.0 is the primary demo surface for component documentation.

### For each component

- Story renders inside `ScreenFrame` component
- Controls exposed for key props using Storybook args
- Examples must use realistic signage content (not lorem ipsum)
- Follow naming convention: `ComponentName.stories.tsx`
- Stories located adjacent to component: `ComponentName.tsx` + `ComponentName.stories.tsx`

### Required stories

#### ScreenFrame

- Resolution switcher (1080p, 4k, portrait-1080p)
- Safe area toggle demonstration

#### SplitScreen

- All ratios (50-50, 60-40, 70-30, 80-20)
- Row and column directions
- Different gap sizes

#### FullscreenHero

- Normal content
- Long text (demonstrating clamping)
- Background image with overlay
- Light and dark variants

#### InfoCardGrid

- 2, 3, 4 columns
- Highlight example
- Density variants (comfortable, compact)
- Various content lengths

## Accessibility requirements

Following WallRun's accessibility baseline (WCAG AA minimum):

- Use semantic HTML elements (section, article, header, etc.)
- Proper heading hierarchy (h1, h2, h3)
- Ensure sufficient color contrast (WCAG AA minimum: 4.5:1 for normal text, 3:1 for large text)
- Interactive elements must be keyboard accessible
- Provide ARIA labels where semantic HTML is insufficient
- Maintain logical focus order
- Provide text alternatives for non-text content

## Testing requirements

### Unit tests (Vitest 4.0.0)

Colocate tests with implementation: `ComponentName.tsx` + `ComponentName.spec.tsx`

Minimum 80% coverage for new code.

Use `@testing-library/react` for component tests.

**Required test coverage:**

- `ScreenFrame`: rendering, resolution logic, aspect ratio calculation
- `SplitScreen`: layout logic, ratio calculations, gap handling
- `FullscreenHero`: text clamping classes, variant rendering
- `InfoCardGrid`: item count, column logic, highlight behavior
- Utility functions: `clamp.ts`, `resolution.ts`

### Visual regression (Optional)

If Playwright 1.55.1 is configured:

- Capture screenshots of Storybook stories at 1080p
- Store in `apps/client-e2e/` following existing E2E patterns

## Documentation requirements

### README.md

Create `libs/shadcnui-signage/README.md` including:

- **Purpose**: What this library is for
- **Relationship**: How it relates to `@wallrun/shadcnui` and `@wallrun/shadcnui-blocks`
- **Components**: List of v0.1 components
- **Concepts**: Resolution and safe area explanation
- **Usage examples**: Matching public exports from `@wallrun/shadcnui-signage`
- **Installation**: How to use in consuming apps
- **Testing**: How to run unit tests (`pnpm test:shadcnui-signage`)

### Component documentation

- Each component file should include JSDoc comments describing:
  - Intended usage
  - Props description
  - Examples
- Follow TypeScript strict mode conventions
- Use named exports only (no default exports)

## Definition of done

- ✅ Library created with Nx: `npx nx g @nx/react:lib shadcnui-signage`
- ✅ TypeScript path mapping added to `tsconfig.base.json`: `"@wallrun/shadcnui-signage": ["libs/shadcnui-signage/src/index.ts"]`
- ✅ `libs/shadcnui-signage` builds successfully: `pnpm build:shadcnui-signage`
- ✅ Public API exports the four v0.1 components from `src/index.ts` (named exports only)
- ✅ Storybook stories exist and render in Storybook 10.2.0
- ✅ Unit tests pass with Vitest: `pnpm test:shadcnui-signage`
- ✅ Minimum 80% test coverage
- ✅ Linting passes: `pnpm lint:shadcnui-signage`
- ✅ Type checking passes: `pnpm type-check:shadcnui-signage`
- ✅ No duplication of shadcn primitives or tokens
- ✅ Components are visually credible at signage resolutions
- ✅ Accessibility requirements met (WCAG AA)
- ✅ `README.md` documentation complete
- ✅ CI passes: `pnpm verify` (format, lint, type-check, test, build)
