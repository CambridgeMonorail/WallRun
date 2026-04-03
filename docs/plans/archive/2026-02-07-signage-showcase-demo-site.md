# Implementation Plan: Signage Showcase Demo Site

> Archived on 2026-03-08 as a historical implementation record. References to current site structure, page inventory, and task status are a snapshot from the planning period.

**Created:** 2026-02-07  
**Status:** ✅ Complete  
**Related:** [shadcnui-signage Library](./2026-02-07-shadcnui-signage-library.md)

## Goal

Transform the `apps/client` demo site from a generic SPA boilerplate showcase into a digital signage showcase that demonstrates the capabilities of WallRun project. The site should present a landing page that explains the project purpose, followed by a directory/gallery of full-screen signage examples that users can navigate to experience what digital signage content looks like.

## Context

### Current State

- **apps/client** currently showcases generic SPA features from the original template
- Landing page describes "The Boilerplate That Speeds Up SPA Development"
- Navigation includes: Landing, Dashboard, About, Features, Pricing, FAQ, Contact, Blog, Terms, StatusBoard, Library, Color Palette
- Current content does not reflect WallRun's digital signage purpose
- Project README.md clearly states: "Digital signage as a software platform"
- `@wallrun/shadcnui-signage` library has been created with ScreenFrame, SplitScreen, FullscreenHero, InfoCardGrid components

### Why This Work

The demo site is the first impression for anyone visiting the project. Currently it:

- ❌ Misrepresents the project as a "boilerplate that speeds up SPA development"
- ❌ Shows generic web app pages that don't demonstrate signage concepts
- ❌ Doesn't showcase the signage-specific components in `@wallrun/shadcnui-signage`
- ❌ Misses opportunity to demonstrate distance-readable typography, fixed-aspect layouts, and deterministic rendering

The demo should:

- ✅ Clearly communicate the project's digital signage focus
- ✅ Provide interactive examples of signage screens
- ✅ Demonstrate the signage components in realistic contexts
- ✅ Be visually compelling and appropriate for the use case

### User Experience Flow

```
[Landing Page]
     |
     | User clicks "View Examples" or "Explore Gallery"
     v
[Gallery/Directory Page]
     |
     | User clicks on signage example tile
     v
[Full-Screen Signage Example]
     |
     | User uses browser back button
     v
[Gallery/Directory Page]
```

## Architecture Decisions

### URL Structure

```
/                          → Landing page (explains project)
/gallery                   → Directory of signage examples
/signage/welcome           → Example: Welcome screen
/signage/menu              → Example: Restaurant menu
/signage/wayfinding        → Example: Office directory/wayfinding
/signage/dashboard         → Example: KPI dashboard
/signage/announcements     → Example: Announcements board
/signage/event-schedule    → Example: Event schedule
```

### Layout Strategy

**Landing page:** Uses existing `@wallrun/landing` components with updated content

**Gallery page:** Custom grid layout with preview cards, uses Layout component with sidebar for navigation

**Signage examples:** Full-screen (no Layout/sidebar), uses `@wallrun/shadcnui-signage` components directly

### Component Reuse

- **Landing:** Reuse HeroSection, FeaturesSection, CTASection, Footer from `@wallrun/landing`
- **Gallery:** Custom component using Card from `@wallrun/shadcnui`
- **Signage examples:** Use ScreenFrame, SplitScreen, FullscreenHero, InfoCardGrid from `@wallrun/shadcnui-signage`

### Navigation Pattern

**Landing → Gallery:** Explicit navigation button/link

**Gallery → Signage:** Click on example card

**Signage → Gallery:** Browser back button (no chrome/navigation in signage view)

**Alternative navigation:** Could add a small "Back to Gallery" button in top corner of signage examples (optional)

## Task Breakdown

### Phase 1: Update Landing Page Content ⬜ Not Started

**Objective:** Transform landing page to accurately represent WallRun project.

**Tasks:**

1. **Update HeroSection content** ⬜
   - File: `apps/client/src/app/pages/landing/Landing.tsx`
   - Change title from "The Boilerplate That Speeds Up SPA Development" to "Digital Signage as a Software Platform"
   - Update subtitle to reflect signage focus: "Build deterministic, data-driven content for always-on displays using modern web technologies"
   - Update description to mention BrightSign, fixed-aspect layouts, distance readability
   - Update CTA buttons: "View Examples" (→ /gallery), "Read Documentation" (→ /docs or external)
   - Verify: Landing page renders with new content

2. **Update FeaturesSection** ⬜
   - File: `apps/client/src/app/pages/landing/Landing.tsx`
   - Replace generic SPA features with signage-specific features:
     - "Fixed-Aspect Layouts" - Deterministic rendering for known resolutions
     - "Distance-Readable Typography" - Optimized for viewing from across the room
     - "Signage Components" - ScreenFrame, SplitScreen, FullscreenHero, InfoCardGrid
     - "BrightSign-Focused" - Designed with BrightSign devices in mind
     - "Offline-First" - Built for always-on, unattended operation
     - "Developer Experience" - React 19, Vite, TypeScript, Tailwind CSS v4
   - Update icons to match new features (use lucide-react icons)
   - Verify: Features section accurately represents project

3. **Update AboutSection** ⬜
   - File: `apps/client/src/app/pages/landing/Landing.tsx`
   - Update content to explain: "This is a working notebook for building signage software, not a CMS or marketing tool"
   - Mention: Component library, tooling reference, living documentation
   - Verify: About section reflects README.md intent

4. **Update StepsSection** ⬜
   - File: `apps/client/src/app/pages/landing/Landing.tsx`
   - Replace generic onboarding steps with signage workflow:
     1. "Explore Examples" - Browse signage screens in the gallery
     2. "Review Components" - Check out the signage component library
     3. "Build Your Own" - Use primitives, layouts, and blocks to create screens
   - Verify: Steps guide users through the demo experience

5. **Update Footer** ⬜
   - File: `apps/client/src/app/pages/landing/Landing.tsx`
   - Keep existing Footer from `@wallrun/landing`
   - Verify links point to correct locations (GitHub repo, etc.)
   - Verify: Footer renders correctly

**Acceptance Criteria:**

- ✅ Landing page clearly communicates digital signage focus
- ✅ Hero section has compelling signage-oriented copy
- ✅ Features section lists signage-specific capabilities
- ✅ No references to "boilerplate" or generic SPA development
- ✅ Visual appeal maintained with appropriate imagery
- ✅ CTA button navigates to `/gallery`

**Files to Change:**

- `apps/client/src/app/pages/landing/Landing.tsx`

---

### Phase 2: Create Gallery/Directory Page ⬜ Not Started

**Objective:** Build a directory page showing signage examples with preview cards.

**Tasks:**

1. **Create Gallery page component** ⬜
   - File: `apps/client/src/app/pages/gallery/Gallery.tsx`
   - Use Layout component with sidebar for navigation
   - Create grid of example cards (3-4 columns responsive)
   - Each card shows: thumbnail/icon, title, description, aspect ratio indicator
   - Verify: Page renders with grid layout

2. **Define signage examples data** ⬜
   - File: `apps/client/src/app/pages/gallery/signageExamples.ts`
   - Create array of example definitions:
     ```ts
     {
       id: string;
       title: string;
       description: string;
       aspectRatio: '16:9' | '9:16' | '16:10';
       resolution: '1080p' | '4k' | 'portrait-1080p';
       path: string;
       thumbnailIcon: LucideIcon;
       category: 'welcome' | 'wayfinding' | 'dashboard' | 'menu' | 'announcements';
     }
     ```
   - Initial examples: Welcome Screen, Restaurant Menu, Office Directory, KPI Dashboard, Announcements Board, Event Schedule
   - Verify: Data structure is complete and consistent

3. **Create ExampleCard component** ⬜
   - File: `apps/client/src/app/pages/gallery/components/ExampleCard.tsx`
   - Use Card from `@wallrun/shadcnui`
   - Display: icon, title, description, aspect ratio badge, resolution badge
   - Click handler navigates to example path
   - Hover effect to indicate interactivity
   - Verify: Cards render correctly and navigate on click

4. **Style Gallery page** ⬜
   - File: `apps/client/src/app/pages/gallery/Gallery.tsx`
   - Add page header: "Signage Examples Gallery"
   - Add description: "Full-screen examples demonstrating digital signage layouts and components"
   - Use Tailwind grid utilities for responsive layout
   - Add spacing, typography hierarchy
   - Verify: Page is visually appealing and functional

5. **Add Gallery to navigation** ⬜
   - File: `apps/client/src/app/constants/navigationConfig.ts`
   - Add Gallery to paths: `gallery: '/gallery'`
   - Add route: `createRoute(paths.gallery, GalleryPage)`
   - Add to sidebar navigation under new "Signage" section
   - Verify: Gallery accessible from navigation

**Acceptance Criteria:**

- ✅ Gallery page displays grid of signage examples
- ✅ Each card shows clear title, description, and metadata
- ✅ Clicking card navigates to full-screen example
- ✅ Page is accessible from landing page CTA and sidebar
- ✅ Responsive layout works on different screen sizes
- ✅ Aspect ratio and resolution information visible

**Files to Change:**

- `apps/client/src/app/pages/gallery/Gallery.tsx` (new)
- `apps/client/src/app/pages/gallery/signageExamples.ts` (new)
- `apps/client/src/app/pages/gallery/components/ExampleCard.tsx` (new)
- `apps/client/src/app/constants/navigationConfig.ts`

---

### Phase 3: Create Signage Example Pages ⬜ Not Started

**Objective:** Build full-screen signage examples using `@wallrun/shadcnui-signage` components.

**Tasks:**

1. **Create base SignageExample component** ⬜
   - File: `apps/client/src/app/pages/signage/components/SignageExample.tsx`
   - Wrapper component that renders full-screen (no Layout)
   - Optional "Back to Gallery" button in top-left corner (small, unobtrusive)
   - Uses ScreenFrame to enforce aspect ratio and resolution
   - Verify: Component renders full-screen correctly

2. **Create Welcome Screen example** ⬜
   - File: `apps/client/src/app/pages/signage/WelcomeScreen.tsx`
   - Route: `/signage/welcome`
   - Uses FullscreenHero component from `@wallrun/shadcnui-signage`
   - Content: "Welcome to [Company Name]" with large, distance-readable typography
   - Background: Simple gradient or image
   - Verify: Renders as full-screen welcome screen

3. **Create Restaurant Menu example** ⬜
   - File: `apps/client/src/app/pages/signage/RestaurantMenu.tsx`
   - Route: `/signage/menu`
   - Uses SplitScreen component (left: categories, right: featured items)
   - Or uses InfoCardGrid for menu items
   - Content: Sample menu items with prices and descriptions
   - Verify: Readable from distance, visually appealing

4. **Create Office Directory/Wayfinding example** ⬜
   - File: `apps/client/src/app/pages/signage/OfficeDirectory.tsx`
   - Route: `/signage/wayfinding`
   - Uses SplitScreen or custom layout
   - Content: Floor map, directory list, "You are here" indicator
   - Typography optimized for quick scanning
   - Verify: Clear hierarchy, easy to parse

5. **Create KPI Dashboard example** ⬜
   - File: `apps/client/src/app/pages/signage/KPIDashboard.tsx`
   - Route: `/signage/dashboard`
   - Uses InfoCardGrid for metrics
   - Content: Sample KPIs with numbers, charts (using recharts if needed)
   - Colorful, data-driven display
   - Verify: Professional dashboard appearance

6. **Create Announcements Board example** ⬜
   - File: `apps/client/src/app/pages/signage/AnnouncementsBoard.tsx`
   - Route: `/signage/announcements`
   - Uses SplitScreen or custom layout
   - Content: Company announcements, upcoming events, employee highlights
   - Typography: Large headings, scannable content
   - Verify: Engaging and informative

7. **Create Event Schedule example** ⬜
   - File: `apps/client/src/app/pages/signage/EventSchedule.tsx`
   - Route: `/signage/event-schedule`
   - Uses custom layout or InfoCardGrid
   - Content: Conference schedule, room assignments, time slots
   - Table or card-based layout
   - Verify: Easy to read and navigate visually

8. **Add all signage routes to navigation** ⬜
   - File: `apps/client/src/app/constants/navigationConfig.ts`
   - Add paths for all signage examples
   - Add routes with `useLayout: false` to render full-screen
   - Verify: All signage pages accessible via direct URL

**Acceptance Criteria:**

- ✅ At least 4-6 signage examples implemented
- ✅ Each example uses components from `@wallrun/shadcnui-signage`
- ✅ Examples render full-screen without Layout/sidebar
- ✅ Typography is distance-readable (large, high contrast)
- ✅ Layouts are deterministic and fixed-aspect
- ✅ Examples demonstrate different signage use cases
- ✅ Browser back button returns to gallery

**Files to Change:**

- `apps/client/src/app/pages/signage/components/SignageExample.tsx` (new)
- `apps/client/src/app/pages/signage/WelcomeScreen.tsx` (new)
- `apps/client/src/app/pages/signage/RestaurantMenu.tsx` (new)
- `apps/client/src/app/pages/signage/OfficeDirectory.tsx` (new)
- `apps/client/src/app/pages/signage/KPIDashboard.tsx` (new)
- `apps/client/src/app/pages/signage/AnnouncementsBoard.tsx` (new)
- `apps/client/src/app/pages/signage/EventSchedule.tsx` (new)
- `apps/client/src/app/constants/navigationConfig.ts`

---

### Phase 4: Deprecate/Remove Old Template Pages ⬜ Not Started

**Objective:** Clean up pages from the original template that don't fit the signage showcase.

**Tasks:**

1. **Identify pages to remove** ⬜
   - Review current navigation: Landing, Dashboard, About, Features, Pricing, FAQ, Contact, Blog, Terms, StatusBoard, Library, Color Palette
   - Keep: Landing (updated), Gallery (new), Library (useful for component docs), Color Palette (useful for design system)
   - Consider keeping: StatusBoard (could be repurposed as signage example)
   - Remove: Dashboard (generic), About, Features, Pricing, FAQ, Contact, Blog, Terms
   - Rationale: These are generic web app pages that don't demonstrate signage concepts

2. **Remove deprecated pages** ⬜
   - Delete page components in `apps/client/src/app/pages/`
   - Remove from navigationConfig.ts paths and routes
   - Remove from sidebar navigation
   - Verify: No broken links or imports

3. **Update sidebar navigation structure** ⬜
   - File: `apps/client/src/app/constants/navigationConfig.ts`
   - New structure:
     ```
     Signage Examples
       └─ Gallery
       └─ Welcome Screen
       └─ Restaurant Menu
       └─ Office Directory
       └─ KPI Dashboard
       └─ Announcements
       └─ Event Schedule
     Components
       └─ Shadcn/ui Library
       └─ Color Palette
     ```
   - Verify: Navigation is clean and focused

4. **Update home route** ⬜
   - File: `apps/client/src/app/constants/navigationConfig.ts`
   - Change `paths.home` to redirect to `/` (landing) instead of `/dashboard`
   - Verify: Home route goes to landing page

**Acceptance Criteria:**

- ✅ Old template pages removed from codebase
- ✅ Navigation only shows signage-relevant pages
- ✅ No broken links or 404 errors
- ✅ Home route defaults to landing page
- ✅ Sidebar navigation is clean and logical

**Files to Change:**

- `apps/client/src/app/pages/` (delete multiple directories)
- `apps/client/src/app/constants/navigationConfig.ts`

---

### Phase 5: Testing and Polish ⬜ Not Started

**Objective:** Ensure all pages work correctly and provide a polished experience.

**Tasks:**

1. **Manual testing** ⬜
   - Test navigation: Landing → Gallery → Signage example → Back to Gallery
   - Test all signage examples render correctly
   - Test browser back button functionality
   - Test responsive behavior on Gallery page
   - Verify full-screen signage examples (no scrollbars, no overflow)
   - Test on different screen sizes
   - Verify: All user flows work as expected

2. **Update tests** ⬜
   - Update tests for Landing page (new content)
   - Add tests for Gallery page
   - Add tests for signage example pages
   - Remove tests for deleted pages
   - Verify: `pnpm test:client` passes

3. **Update README.md** ⬜
   - File: `README.md` (root)
   - Update "What This Repo Contains" to mention demo site
   - Add note: "Visit the demo at http://localhost:4200/WallRun/ to see signage examples"
   - Verify: README accurately describes project

4. **Run verification** ⬜
   - Command: `pnpm verify`
   - Ensure: Format, lint, type-check, tests, build all pass
   - Fix any issues
   - Verify: All checks green

**Acceptance Criteria:**

- ✅ All user flows tested and working
- ✅ Tests updated and passing
- ✅ README.md updated
- ✅ `pnpm verify` passes
- ✅ No console errors or warnings
- ✅ Professional appearance and polish

**Files to Change:**

- `apps/client/src/app/**/*.test.tsx` (multiple)
- `README.md`

---

## Expected Results

### Before

- Landing page describes "boilerplate that speeds up SPA development"
- Demo site shows generic web app pages (Dashboard, About, Pricing, etc.)
- No demonstration of digital signage concepts
- Misaligned with project purpose

### After

- Landing page clearly communicates digital signage focus
- Gallery page provides directory of signage examples
- Multiple full-screen signage examples using `@wallrun/shadcnui-signage` components
- Demonstrates distance-readable typography, fixed-aspect layouts, deterministic rendering
- Clean navigation focused on signage showcase
- Aligned with project purpose as stated in README.md

## Success Metrics

- [ ] Landing page accurately represents WallRun project
- [ ] Gallery page displays at least 4-6 signage examples
- [ ] Each signage example uses components from `@wallrun/shadcnui-signage`
- [ ] Signage examples render full-screen without Layout
- [ ] Browser back button works correctly
- [ ] No references to "boilerplate" or generic SPA concepts
- [ ] `pnpm verify` passes
- [ ] Demo site provides clear value to visitors understanding the project

## Open Questions

1. **Branding/imagery:** Do we need custom images/graphics for landing page hero? Or use simple gradients?
2. **Back button in signage examples:** Should we add a small "Back to Gallery" button, or rely solely on browser back button?
3. **Signage example content:** Should we use realistic placeholder content (e.g., actual restaurant menu items) or keep it generic/abstract?
4. **Animation/transitions:** Should signage examples have any transitions or animations (slide-in, fade-in) to demonstrate time-based content?
5. **Gallery organization:** Should examples be organized by category (Welcome, Wayfinding, Dashboards, etc.) or presented as flat list?

## Notes

- This work depends on `@wallrun/shadcnui-signage` components being functional (ScreenFrame, SplitScreen, FullscreenHero, InfoCardGrid)
- If signage components are not ready, Phase 3 can use placeholder implementations with TODO comments
- Consider adding a "Work in Progress" badge to signage examples that are not fully polished
- Gallery page could be enhanced later with filtering, search, aspect ratio toggle
- Signage examples could be enhanced later with live data integration, real-time updates, interactive elements

## Timeline Estimate

- **Phase 1:** 2-3 hours (landing page content update)
- **Phase 2:** 3-4 hours (gallery page creation)
- **Phase 3:** 6-8 hours (signage examples, varies by complexity)
- **Phase 4:** 1-2 hours (cleanup old pages)
- **Phase 5:** 2-3 hours (testing and polish)

**Total:** 14-20 hours

## Related Documentation

- [Project Goals](../getting-started/project-goals.md)
- [Statement of Intent](../getting-started/statement-of-intent.md)
- [shadcnui-signage Requirements](../2026-02-07-shadcnui-signage-requirements.md)
- [shadcnui-signage Implementation Plan](./2026-02-07-shadcnui-signage-library.md)

## Approval

- [ ] Plan reviewed and approved
- [ ] Dependencies confirmed (signage library status)
- [ ] Open questions resolved
- [ ] Ready to start implementation
