# Enhancement Plan: shadcnui-signage Developer Documentation

> Archived on 2026-03-08 as a historical implementation record. Inventories and route counts in this file describe the documentation scope at that time and do not represent the full current component surface.

**Date:** 2026-02-08  
**Status:** ✅ Completed  
**Type:** Enhancement (Non-Breaking)

## Overview

Enhance the existing demo site with developer-focused documentation for `libs/shadcnui-signage` components. This is an **additive enhancement** that preserves all existing content while adding new developer-experience features requested by the architect.

## Context

### What We Currently Have (To Preserve)

- **Gallery page** (`/gallery`) - Full-screen signage examples (6 examples)
- **Library page** (`/library`) - High-level overview of both libraries
- **Getting Started** page - Installation and basic usage
- **Signage Examples** - Individual example pages (Welcome, Menu, Directory, KPI Dashboard, Announcements, Event Schedule)
- **Working Storybook** - Component props and visual testing
- **Functional navigation** - Sidebar with Documentation and Signage Examples sections

### What's Missing (To Add)

Per the architect's requirements document:

1. **Component-centric documentation pages** - One page per `shadcnui-signage` component
2. **"Built On" sections** - Explicit dependencies on shadcn primitives
3. **Copyable code snippets** - Installation and usage examples
4. **Clear installation paths** - shadcn registry or copy-source
5. **Signage-specific guidance** - Behavior notes, long-running constraints
6. **Better discovery** - Component index, search/filtering

## Inventory: shadcnui-signage Public Components

From `libs/shadcnui-signage/src/index.ts`:

### Primitives (4 components)

1. `ScreenFrame` - Base frame for signage content
2. `MetricCard` - KPI/metric display cards
3. `EventCard` - Event information cards
4. `AnnouncementCard` - Announcement cards

### Layouts (3 components)

5. `SplitScreen` - Two-panel layouts
6. `SignageContainer` - Full-screen container with ambient effects
7. `SignageHeader` - Standard signage header

### Blocks (2 components)

8. `FullscreenHero` - Hero sections for signage
9. `InfoCardGrid` - Grid layouts for info cards

**Total: 9 components requiring documentation pages**

## Goals

1. ✅ Create dedicated documentation page for each of the 9 components
2. ✅ Add "Built On" sections explaining shadcn dependencies
3. ✅ Provide copyable installation and usage snippets
4. ✅ Create a Components section in navigation
5. ✅ Build reusable `CodeSnippet` component
6. ✅ Keep existing Gallery and examples intact
7. ✅ Maintain Storybook integration via deep links

## Non-Goals

- ❌ Replacing or removing existing Gallery
- ❌ Removing existing Library overview page
- ❌ Changing Storybook deployment
- ❌ Creating shadcn registry (future enhancement)
- ❌ Documenting `@tsa/shadcnui` components (standard shadcn)
- ❌ Adding search functionality (future enhancement)

## Architecture Decision

### Approach: Extend Existing Demo Site

**Decision:** Add new component documentation pages to the existing `apps/client` structure.

**Rationale:**

- Minimal disruption to working site
- Reuse existing routing and navigation infrastructure
- Leverage existing Layout and shell components
- Gradual enhancement path
- No GitHub Pages reconfiguration needed

**Alternative Considered:** Separate docs app in Nx

- **Rejected:** Adds complexity, requires separate deployment, duplicates navigation/shell
- **Future consideration:** If docs grow significantly beyond components

### New Route Structure

Add new routes under `/components/*`:

```
/components                    # Component index/overview
/components/primitives/screen-frame
/components/primitives/metric-card
/components/primitives/event-card
/components/primitives/announcement-card
/components/layouts/split-screen
/components/layouts/signage-container
/components/layouts/signage-header
/components/blocks/fullscreen-hero
/components/blocks/info-card-grid
```

### Navigation Changes

Update sidebar configuration to add new "Components" section:

```typescript
{
  title: 'Components',
  url: '/components',
  icon: Blocks, // or appropriate icon
  items: [
    { title: 'Overview', url: '/components' },
    {
      title: 'Primitives',
      items: [
        { title: 'ScreenFrame', url: '/components/primitives/screen-frame' },
        { title: 'MetricCard', url: '/components/primitives/metric-card' },
        // ... etc
      ]
    },
    // ... layouts, blocks
  ]
}
```

Keep existing "Documentation" and "Signage Examples" sections unchanged.

## Implementation Tasks

### Phase 1: Infrastructure (Foundation)

#### Task 1.1: Create CodeSnippet Component

- **File:** `apps/client/src/app/components/CodeSnippet.tsx`
- **Features:**
  - Syntax highlighting (use Prism or highlight.js - client-side only)
  - Copy-to-clipboard button
  - Optional filename label
  - Support for TypeScript/TSX
- **Testing:** Unit tests for copy functionality
- **Acceptance:** Can display and copy TSX code with proper formatting

#### Task 1.2: Create Component Page Template

- **File:** `apps/client/src/app/components/ComponentDocPage.tsx`
- **Purpose:** Reusable template/layout for component docs
- **Sections:**
  1. Header (name, description)
  2. Built On (required)
  3. Live Example
  4. Installation
  5. Usage
  6. Behavior Notes
  7. Links (Storybook, GitHub)
- **Acceptance:** Template renders all sections with proper styling

#### Task 1.3: Create Component Index Page

- **File:** `apps/client/src/app/pages/components/ComponentIndex.tsx`
- **Content:**
  - Brief introduction to shadcnui-signage
  - Grid or list of all 9 components with:
    - Component name
    - One-line description
    - Link to detailed page
    - Category badge (Primitive/Layout/Block)
- **Acceptance:** All 9 components listed with working links

### Phase 2: Component Documentation Pages (9 pages)

For each component, create:

- **Location:** `apps/client/src/app/pages/components/{category}/{component-name}.tsx`
- **Required Content:**
  - Overview section
  - Built On section (explicit shadcn dependencies)
  - Live example (imported from lib)
  - Installation instructions
  - Usage code snippet
  - Signage-specific notes
  - Links to Storybook and GitHub source

#### Task 2.1: Primitive Components (4 pages)

1. ScreenFrame → `/components/primitives/screen-frame`
2. MetricCard → `/components/primitives/metric-card`
3. EventCard → `/components/primitives/event-card`
4. AnnouncementCard → `/components/primitives/announcement-card`

#### Task 2.2: Layout Components (3 pages)

5. SplitScreen → `/components/layouts/split-screen`
6. SignageContainer → `/components/layouts/signage-container`
7. SignageHeader → `/components/layouts/signage-header`

#### Task 2.3: Block Components (2 pages)

8. FullscreenHero → `/components/blocks/fullscreen-hero`
9. InfoCardGrid → `/components/blocks/info-card-grid`

**Acceptance Criteria (Per Page):**

- ✅ Built On section lists shadcn dependencies
- ✅ Live example renders correctly
- ✅ Code snippet is copyable and valid
- ✅ Installation path is clear
- ✅ Storybook link works
- ✅ GitHub source link works
- ✅ Page matches design consistency with rest of site

### Phase 3: Navigation Integration

#### Task 3.1: Update Navigation Config

- **File:** `apps/client/src/app/constants/navigationConfig.ts`
- **Changes:**
  - Add new "Components" section
  - Add routes for all 9 component pages
  - Add component index route
  - Keep existing sections unchanged

#### Task 3.2: Update Routing

- **File:** `apps/client/src/app/app.tsx` (if needed)
- **Changes:** Add routes for new component pages

**Acceptance:**

- ✅ New "Components" section appears in sidebar
- ✅ All component pages are accessible via navigation
- ✅ Existing "Documentation" and "Signage Examples" unchanged
- ✅ All routes work with direct URL access

### Phase 4: Content Enhancement

#### Task 4.1: Research Built On Dependencies

For each component, document:

- Which shadcn/ui primitives are used
- Why they were chosen
- What behavior is extended/constrained for signage

**Example for MetricCard:**

```markdown
## Built On

- **No shadcn primitives** - Built with native HTML/CSS
- Uses Lucide icons for change indicators
- Gradient styling inspired by shadcn Card but customized for distance readability
```

#### Task 4.2: Write Signage-Specific Notes

For each component, document:

- Long-running behavior considerations
- Distance readability features
- Fixed-aspect layout constraints
- Performance notes
- Typical usage patterns on signage displays

**Acceptance:**

- ✅ Every component page has "Built On" section
- ✅ Every component has signage-specific guidance
- ✅ Content is developer-focused, not marketing

### Phase 5: Polish and Quality

#### Task 5.1: Verify All Links

- Storybook deep links work
- GitHub source links point to correct files
- Internal navigation works
- External links open in new tabs

#### Task 5.2: Responsive Testing

- Component doc pages work on mobile/tablet
- Code snippets don't overflow
- Examples render appropriately

#### Task 5.3: Documentation Quality Check

- Spelling and grammar
- Code examples are valid
- Consistent terminology
- No broken internal references

#### Task 5.4: Run Verification

```bash
pnpm verify
```

**Acceptance:**

- ✅ All links functional
- ✅ Pages responsive
- ✅ No lint/type errors
- ✅ All tests pass

## File Changes Summary

### New Files

```
apps/client/src/app/components/
  - CodeSnippet.tsx
  - CodeSnippet.test.tsx
  - ComponentDocPage.tsx

apps/client/src/app/pages/components/
  - ComponentIndex.tsx
  - primitives/
    - ScreenFrame.tsx
    - MetricCard.tsx
    - EventCard.tsx
    - AnnouncementCard.tsx
  - layouts/
    - SplitScreen.tsx
    - SignageContainer.tsx
    - SignageHeader.tsx
  - blocks/
    - FullscreenHero.tsx
    - InfoCardGrid.tsx
```

### Modified Files

```
apps/client/src/app/constants/navigationConfig.ts
  - Add Components section
  - Add 10 new routes (index + 9 components)
```

### Unchanged Files (Explicitly Preserved)

```
apps/client/src/app/pages/
  - gallery/Gallery.tsx ✅ Keep
  - library/Library.tsx ✅ Keep
  - getting-started/GettingStarted.tsx ✅ Keep
  - signage/* ✅ Keep all examples
```

## Success Metrics

1. **Coverage:** All 9 components have documentation pages
2. **Discoverability:** Developer can find any component in < 10 seconds
3. **Clarity:** Every page has "Built On" section
4. **Usability:** Code snippets are copyable and valid
5. **Integration:** Storybook links work
6. **Quality:** No lint/type errors, tests pass
7. **Preservation:** All existing content remains functional

## Example: MetricCard Documentation Page

```tsx
// apps/client/src/app/pages/components/primitives/MetricCard.tsx

export const MetricCardDoc = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Primitives</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">MetricCard</h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">Display KPIs and metrics with value, change indicators, and icons. Optimized for distance readability on signage displays.</p>
      </div>

      {/* Built On */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with native HTML and Tailwind CSS.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses Lucide icons for visual indicators</li>
            <li>Gradient styling inspired by shadcn Card but customized for distance readability</li>
            <li>Large typography (7xl value, 3xl labels) for 10-foot viewing distance</li>
            <li>High-contrast color scheme for ambient lighting conditions</li>
          </ul>
        </div>
      </section>

      {/* Live Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="bg-slate-950 p-8 rounded-lg">
          <MetricCard title="Total Revenue" value="$1.2M" change="+12.5%" isPositive={true} icon={<DollarSign className="w-14 h-14" />} />
        </div>
      </section>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <CodeSnippet language="bash" code="pnpm add @tsa/shadcnui-signage" />
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Dashboard.tsx"
          code={`import { MetricCard } from '@tsa/shadcnui-signage';
import { DollarSign } from 'lucide-react';

export function Dashboard() {
  return (
    <MetricCard
      title="Total Revenue"
      value="$1.2M"
      change="+12.5% vs last month"
      isPositive={true}
      icon={<DollarSign className="w-14 h-14" />}
    />
  );
}`}
        />
      </section>

      {/* Signage Notes */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong>Distance Readability:</strong> Uses 7xl font for values and 3xl for labels, optimized for viewing from 10+ feet away.
          </p>
          <p>
            <strong>High Contrast:</strong> Dark background with bright text ensures readability under various ambient lighting conditions.
          </p>
          <p>
            <strong>Long-Running Display:</strong> Static content with no animations that could cause screen burn-in on long-term displays.
          </p>
          <p>
            <strong>Data Updates:</strong> Values should be updated via props. Consider wrapping with a data-fetching component for real-time metrics.
          </p>
        </div>
      </section>

      {/* Links */}
      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <a href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/primitives-metriccard--docs" target="_blank">
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/MetricCard.tsx" target="_blank">
              View Source
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};
```

## Timeline Estimate

- **Phase 1 (Infrastructure):** 1-2 days
- **Phase 2 (Component Pages):** 3-4 days (9 pages)
- **Phase 3 (Navigation):** 1 day
- **Phase 4 (Content Enhancement):** 2 days
- **Phase 5 (Polish):** 1 day

**Total: 8-10 days**

## Risks and Mitigations

| Risk                                     | Mitigation                                            |
| ---------------------------------------- | ----------------------------------------------------- |
| Breaking existing routes                 | Keep all existing routes unchanged, only add new ones |
| Sidebar too crowded                      | Use collapsible sections, keep top-level items clear  |
| Code snippets don't work in static build | Use client-side syntax highlighting (Prism.js)        |
| Component examples break                 | Import directly from library, test rendering          |
| Storybook links outdated                 | Generate links programmatically from component names  |

## Future Enhancements (Out of Scope)

1. **Search functionality** - Component search/filter
2. **shadcn registry** - Custom registry for `npx shadcn add`
3. **Patterns section** - Higher-level usage patterns
4. **Interactive playground** - Live prop editing
5. **Accessibility testing results** - Document a11y compliance
6. **Performance metrics** - Document render performance

## Definition of Done

- ✅ All 9 components have dedicated documentation pages
- ✅ Every page includes "Built On" section
- ✅ CodeSnippet component implemented and tested
- ✅ All code snippets are copyable and valid
- ✅ Navigation updated with Components section
- ✅ All Storybook and GitHub links work
- ✅ Existing Gallery and examples preserved
- ✅ Site works on local dev server (tested at http://localhost:4200/WallRun/)
- ✅ TypeScript type-check passes
- ✅ All tests pass (13/13 passing)
- ✅ No breaking changes to existing content

## Implementation Summary

**Completed:** 2026-02-08

### What Was Built

#### Phase 1: Infrastructure ✅

1. **CodeSnippet Component** - Reusable component with syntax highlighting and copy-to-clipboard
   - Full test coverage (9 tests passing)
   - Supports multiple languages (tsx, typescript, bash, json, etc.)
   - Optional filename display and line numbers
2. **Component Index Page** - Central hub listing all 9 components
   - Organized by category (Primitives, Layouts, Blocks)
   - Visual badges and icons for each category
   - Links to detailed documentation pages

#### Phase 2: Component Documentation Pages ✅

Created 9 comprehensive documentation pages:

**Primitives (4):**

- MetricCard - KPI display cards
- ScreenFrame - Preview container with aspect ratio enforcement
- EventCard - Event information cards
- AnnouncementCard - Announcement cards with icons

**Layouts (3):**

- SplitScreen - Two-panel layouts with configurable ratios
- SignageContainer - Full-screen container with ambient effects
- SignageHeader - Standard signage header

**Blocks (2):**

- FullscreenHero - Hero sections for signage
- InfoCardGrid - Grid layouts for info cards

Each page includes:

- Category and component name
- Description optimized for signage use
- **Built On** section (mandatory, explains shadcn dependencies)
- Live rendered examples
- Installation instructions
- Usage code snippets (copyable)
- Signage-specific considerations
- Props documentation (where applicable)
- Links to Storybook and GitHub source

#### Phase 3: Navigation Integration ✅

- Added new "Components" section to sidebar navigation
- 10 new routes (1 index + 9 component pages)
- Preserved existing "Documentation" and "Signage Examples" sections
- All routes working with proper breadcrumbs

#### Phase 4: Content Quality ✅

- Every component has detailed "Built On" section
- Clear explanation of shadcn primitive usage (or lack thereof)
- Signage-specific guidance for each component
- Distance readability notes
- Long-running display considerations
- Performance implications

#### Phase 5: Verification ✅

- ✅ TypeScript: No type errors
- ✅ Tests: 13/13 passing (including new CodeSnippet tests)
- ✅ Local testing: Site verified at http://localhost:4200/WallRun/
- ✅ Navigation: All links working correctly
- ✅ Existing content: Gallery and examples preserved and functional
- ✅ Component pages: All 9 pages rendering correctly
- ✅ Code snippets: Copy functionality working
- ✅ Live examples: Components rendering in documentation

### Files Created

**New Files (14 total):**

```
apps/client/src/app/components/
  - CodeSnippet.tsx (156 lines)
  - CodeSnippet.test.tsx (88 lines)

apps/client/src/app/pages/components/
  - ComponentIndex.tsx (208 lines)

  primitives/
    - MetricCardDoc.tsx (185 lines)
    - ScreenFrameDoc.tsx (178 lines)
    - EventCardDoc.tsx (97 lines)
    - AnnouncementCardDoc.tsx (100 lines)

  layouts/
    - SplitScreenDoc.tsx (118 lines)
    - SignageContainerDoc.tsx (111 lines)
    - SignageHeaderDoc.tsx (98 lines)

  blocks/
    - FullscreenHeroDoc.tsx (103 lines)
    - InfoCardGridDoc.tsx (114 lines)
```

**Modified Files (1):**

```
apps/client/src/app/constants/navigationConfig.ts
  - Added Components section to navigation
  - Added 10 new routes
  - Updated paths configuration
```

### Key Decisions

1. **No separate docs app** - Enhanced existing demo site to avoid deployment complexity
2. **Flat navigation structure** - All components listed directly under "Components" (no nested categories)
3. **Built On sections mandatory** - Ensures transparency about shadcn dependencies
4. **Live examples on every page** - Developers can see components in action
5. **Copy-paste code snippets** - Reduces friction for developers

### What Was Preserved

All existing functionality remains intact:

- ✅ Gallery page with 6 signage examples
- ✅ Library overview page
- ✅ Getting Started page
- ✅ Individual signage example pages (Welcome, Menu, Directory, KPI, Announcements, Schedule)
- ✅ Storybook integration and links
- ✅ Existing navigation structure

### Developer Experience Improvements

Before this enhancement:

- Developers had to navigate to Storybook for component details
- No clear documentation of shadcn dependencies
- Installation instructions scattered or missing
- No signage-specific guidance

After this enhancement:

- Component documentation is primary, Storybook is secondary
- Clear "Built On" sections explain dependencies
- Copy-paste installation and usage examples
- Signage considerations prominently displayed
- All 9 components discoverable in < 10 seconds

### Testing Evidence

**TypeScript:**

```bash
pnpm type-check:client
✅ No errors
```

**Unit Tests:**

```bash
pnpm test:client --run
✅ 13/13 tests passing
✅ CodeSnippet component: 9/9 tests passing
```

**Manual Testing:**

- ✅ Component Index loads correctly
- ✅ All 9 component pages render
- ✅ Navigation expands/collapses properly
- ✅ Code snippets display and copy
- ✅ Live examples render correctly
- ✅ External links work (Storybook, GitHub)
- ✅ Existing Gallery page unaffected
- ✅ Breadcrumbs work correctly

### Architecture Notes

The enhancement follows the existing demo site architecture:

- React 19 + React Router for routing
- Tailwind v4 for styling
- Same Layout component from @tsa/shell
- Consistent with existing page patterns
- No new dependencies added (except @testing-library/jest-dom for tests)

All component documentation pages follow a consistent structure, making it easy to add new components in the future by following the established pattern.
