# Mobile Responsive Audit

**Branch:** `fix/mobile-responsive-audit`
**Date:** 2026-04-07
**Device reference:** Pixel 9 (412 × 924 CSS pixels, viewport width 412px)
**Target:** `http://localhost:4200/`
**Feedback:** "The site has too many things that don't render neatly on my mobile view"

## How to Work This Audit

> **IMPORTANT — Work in small incremental chunks.**
>
> Previous attempts failed because taking screenshots of every page in one session
> causes the message context to exceed size limits. Follow this workflow instead:
>
> 1. **Pick ONE page** (or 2-3 small related pages) per session.
> 2. **Diagnose and fix first** using text notes, DOM inspection, and targeted code references.
> 3. **Use screenshots only when necessary** and cap them at **one mobile screenshot per page**.
> 4. **Update this document** — mark the page status, log findings, and commit.
> 5. **Start a new chat session** for the next page.
>
> Do NOT attempt to screenshot or audit all pages in a single conversation.
> Do NOT collect "before/after" galleries for routine fixes inside chat.
> The goal is steady incremental progress with a persistent written record.
>
> ### Evidence budget per page
>
> - Default: **0 screenshots**
> - Allowed when needed: **1 screenshot** showing the current mobile issue or final verification state
> - Always prefer brief written evidence: route, viewport, issue, fix, verification result
>
> ### Status key
>
> - ⬜ Not started
> - 🔍 Audited — issues logged below
> - 🔧 Fix in progress
> - ✅ Fixed and verified
> - ➖ Skipped (not applicable on mobile)

## Prioritisation

Mobile is often the first way people discover the site. Pages are ordered by likelihood of a mobile visitor encountering them.

**Priority 1 — First impressions (landing & navigation)**
These are what a mobile visitor sees first. Broken layouts here = immediate bounce.

**Priority 2 — Main content pages (with sidebar layout)**
Documentation, guides, gallery — the content people navigate to. The sidebar/header shell must work well at 412px.

**Priority 3 — Component documentation**
Lower traffic but still reachable. Mostly prose + code examples — should be straightforward.

**Priority 4 — Signage example screens**
These are designed for large displays, not mobile. However, mobile visitors _will_ tap into them from the gallery. They should at minimum not break or be completely unusable.

---

## Pages to Review

### Priority 1 — First Impressions

| # | Route | Page | Status |
| --- | --- | --- | --- |
| 1 | `/` | Landing Page | ✅ Fixed and verified |
| 2 | (shell) | Sidebar + Header (Layout) | ✅ Fixed and verified |
| 3 | `*` (404) | Not Found | ⬜ Not started |

### Priority 2 — Main Content Pages

| # | Route | Page | Status |
| --- | --- | --- | --- |
| 4 | `/getting-started` | Getting Started | ✅ Fixed and verified |
| 5 | `/gallery` | Gallery | ✅ Fixed and verified |
| 6 | `/tooling` | Tooling | ✅ Fixed and verified |
| 7 | `/skills` | Skills | ✅ Fixed and verified |
| 8 | `/color-palette` | Color Palette | ✅ Fixed and verified |
| 9 | `/library` | Library | ✅ Fixed and verified |
| 10 | `/how-to` | How-To Index | ✅ Fixed and verified |
| 11 | `/how-to/custom-agents` | Custom Agents Guide | ✅ Fixed and verified |
| 12 | `/how-to/design-brief` | Design Brief Guide | ✅ Fixed and verified |
| 13 | `/how-to/build-signage` | Build Signage Guide | ✅ Fixed and verified |
| 14 | `/how-to/deploy-brightsign` | Deploy BrightSign Guide | ✅ Fixed and verified |

### Priority 3 — Component Documentation

| # | Route | Page | Status |
| --- | --- | --- | --- |
| 15 | `/components` | Component Index | ✅ Fixed and verified |
| 16 | `/components/primitives/metric-card` | Metric Card Doc | ✅ Fixed and verified |
| 17 | `/components/primitives/screen-frame` | Screen Frame Doc | ✅ Fixed and verified |
| 18 | `/components/primitives/event-card` | Event Card Doc | ✅ Fixed and verified |
| 19 | `/components/primitives/announcement-card` | Announcement Card Doc | ✅ Fixed and verified |
| 20 | `/components/layouts/split-screen` | Split Screen Doc | ✅ Fixed and verified |
| 21 | `/components/layouts/signage-container` | Signage Container Doc | ⬜ Not started |
| 22 | `/components/layouts/signage-header` | Signage Header Doc | ⬜ Not started |
| 23 | `/components/blocks/fullscreen-hero` | Fullscreen Hero Doc | ⬜ Not started |
| 24 | `/components/blocks/info-card-grid` | Info Card Grid Doc | ⬜ Not started |
| 25-31 | `/components/behaviour/*` | Behaviour Docs (7 pages) | ⬜ Not started |

### Priority 4 — Signage Example Screens

| # | Route | Page | Status |
| --- | --- | --- | --- |
| 32 | `/signage/welcome` | Welcome Screen | ⬜ Not started |
| 33 | `/signage/menu` | Restaurant Menu | ⬜ Not started |
| 34 | `/signage/wayfinding` | Office Directory | ⬜ Not started |
| 35 | `/signage/dashboard` | KPI Dashboard | ⬜ Not started |
| 36 | `/signage/announcements` | Announcements Board | ⬜ Not started |
| 37 | `/signage/event-schedule` | Event Schedule | ⬜ Not started |
| 38 | `/signage/office-lobby-loop` | Office Lobby Loop | ⬜ Not started |
| 39 | `/signage/daypart-menu` | Daypart Menu | ⬜ Not started |

---

## Common Mobile Issues to Check

- [ ] Text overflow / horizontal scrolling
- [ ] Touch targets too small (< 44px)
- [ ] Fixed-width elements exceeding viewport
- [ ] Sidebar behaviour at mobile breakpoint
- [ ] Images not responsive (missing max-w-full)
- [ ] Grid layouts not collapsing to single column
- [ ] Padding/margin too large for small screens
- [ ] Font sizes too large or too small
- [ ] Buttons/cards not stacking on narrow viewports
- [ ] Code blocks overflowing without scroll

---

## Findings Log

### Page 1 — Landing Page (`/`)

**Status:** ✅ Fixed and verified
**Severity:** High

**Issues found:**

1. **No mobile navigation visible** — On phone-width viewports there was no hamburger menu or any navigation affordance. Users landing on `/` had no way to navigate to other pages without knowing URLs.

**Fix applied:**

- Created `LandingNav` component ([apps/client/src/app/pages/landing/LandingNav.tsx](../../apps/client/src/app/pages/landing/LandingNav.tsx))
- Sticky header with `WallRun` wordmark (left) and hamburger (right) on mobile (`< md`)
- Desktop: inline links (Get Started, Gallery, Tooling, Library, GitHub icon)
- Mobile: tap hamburger → dropdown with all links, tap X or link to close
- Semi-transparent backdrop-blur matches B2B SaaS style guide
- Verified at 412 × 924 (Pixel 9) — hamburger visible, menu opens/closes, links navigate
- Verified at 1440 × 900 (desktop) — inline links visible, no hamburger
- Remaining layout issues (overflow, spacing, etc.) can be picked up in a follow-up pass

---

### Page 2 — Sidebar + Header (shell)

**Status:** ✅ Fixed and verified
**Severity:** High

**Issues found:**

1. **Header touch targets too small on mobile** — the sidebar trigger rendered at ~28px and the theme/GitHub controls at 36px, below the 44px touch target baseline.
2. **Header chrome too dense at 412px** — the divider between the trigger and breadcrumb spent horizontal space without adding much value on mobile.

**Fix applied:**

- Mobile shell state uses `useIsMobile` instead of `window.innerWidth` for sidebar default-open behaviour
- Header chrome is flush to the viewport on small screens with reduced height
- `SidebarInset` includes `min-w-0` to reduce horizontal overflow risk
- Storybook icon is hidden on small screens to reduce header crowding
- Mobile-specific `.chrome-shell` overrides were added in global styles
- Sidebar trigger now uses a 44px mobile hit area
- Theme and GitHub controls now use 44px mobile hit areas
- Header separator is hidden on small screens to preserve space for the breadcrumb

**Code references:**

- [apps/client/src/styles.css](../../apps/client/src/styles.css)
- [libs/shell/src/lib/layouts/Layout.tsx](../../libs/shell/src/lib/layouts/Layout.tsx)

**Verification:**

- Route tested: `/getting-started`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- Sidebar opens as a modal sheet on mobile and locks body scroll while open
- Header remains full-width and unclipped on mobile
- Mobile control sizes verified at 44px for sidebar, theme, and GitHub actions after fix

---

### Page 4 — Getting Started (`/getting-started`)

**Status:** ✅ Fixed and verified
**Severity:** Medium

**Issues found:**

1. **Some content actions used buttons for navigation** — external documentation actions inside prose were implemented as buttons with `window.open`, which is the wrong interaction model and weakens accessibility.
2. **Primary content CTAs needed mobile-sized hit areas** — page-level action buttons were visually acceptable but needed explicit 44px sizing to satisfy the mobile touch target baseline consistently.
3. **Bottom CTA group needed mobile-safe wrapping** — the final action row relied on horizontal spacing rather than a wrapping layout.

**Fix applied:**

- Replaced prose navigation buttons with semantic external links for Storybook and the signage architect agent document
- Linked the signage architect reference to the actual GitHub file path rather than the repository root
- Set page-level CTA buttons to 44px height on mobile
- Changed the bottom CTA group to a wrapping flex layout with gaps for narrow viewports

**Code references:**

- [apps/client/src/app/pages/getting-started/GettingStarted.tsx](../../apps/client/src/app/pages/getting-started/GettingStarted.tsx)

**Verification:**

- Route tested: `/getting-started`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- Page-level CTAs verified at 44px height after fix
- External documentation actions now render as links with `_blank` and `rel="noopener noreferrer"`

---

### Page 5 — Gallery (`/gallery`)

**Status:** ✅ Fixed and verified
**Severity:** Medium

**Issues found:**

1. **Example cards were not semantic navigation elements** — gallery cards navigated via `onClick` on a `Card`, so they did not expose proper link semantics for keyboard, accessibility, or touch affordances.
2. **Gallery footer copy was mouse-centric** — the instruction text used "Click" rather than neutral wording that also fits touch devices.

**Fix applied:**

- Replaced clickable card surfaces with semantic `Link` wrappers
- Added accessible `aria-label` text for each example card
- Added visible focus-ring support for keyboard navigation
- Kept the hover scale effect desktop-only and preserved the mobile single-column layout
- Updated footer copy to use touch-neutral wording

**Code references:**

- [apps/client/src/app/pages/gallery/components/ExampleCard.tsx](../../apps/client/src/app/pages/gallery/components/ExampleCard.tsx)
- [apps/client/src/app/pages/gallery/Gallery.tsx](../../apps/client/src/app/pages/gallery/Gallery.tsx)

**Verification:**

- Route tested: `/gallery`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- All example cards render as links with route targets and `aria-label` text
- No undersized interactive elements found in the gallery grid after the fix

---

### Page 6 — Tooling (`/tooling`)

**Status:** ✅ Fixed and verified
**Severity:** Medium

**Issues found:**

1. **Page-level CTAs were undersized on mobile** — deployment, discovery, skills, and footer actions rendered at 36px height, below the 44px touch target baseline.

**Fix applied:**

- Set all page-level CTA buttons on the Tooling page to 44px height
- Preserved existing link semantics for internal and external destinations
- Kept the existing wrapping layouts for narrow viewports

**Code references:**

- [apps/client/src/app/pages/tooling/Tooling.tsx](../../apps/client/src/app/pages/tooling/Tooling.tsx)

**Verification:**

- Route tested: `/tooling`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- All page-level CTAs verified at 44px height after fix

---

### Page 7 — Skills (`/skills`)

**Status:** ✅ Fixed and verified
**Severity:** Medium

**Issues found:**

1. **Footer CTA cluster was undersized on mobile** — the page-level actions at the bottom of the Skills page rendered at 36px height, below the 44px touch target baseline.

**Fix applied:**

- Set the footer CTA buttons to 44px height on mobile
- Preserved existing internal and external link semantics
- Kept the wrapping footer layout for narrow viewports

**Code references:**

- [apps/client/src/app/pages/skills/Skills.tsx](../../apps/client/src/app/pages/skills/Skills.tsx)

**Verification:**

- Route tested: `/skills`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- Footer CTA cluster verified at 44px height after fix

---

### Page 8 — Color Palette (`/color-palette`)

**Status:** ✅ Fixed and verified
**Severity:** Medium

**Issues found:**

1. **Tab triggers were undersized on mobile** — the two primary tab controls rendered at 28px height, below the 44px touch target baseline.
2. **Theme resource links were undersized on mobile** — the main external links near the top of the page rendered at 40px height.

**Fix applied:**

- Increased both tab triggers to a 44px minimum height on mobile
- Added mobile-safe sizing to the theme resource links
- Preserved the existing two-column tab layout and page structure

**Code references:**

- [apps/client/src/app/pages/color-palette/ColorPalette.tsx](../../apps/client/src/app/pages/color-palette/ColorPalette.tsx)

**Verification:**

- Route tested: `/color-palette`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- Tab triggers verified at 44px height after fix
- Theme resource links verified at 44px height after fix

---

### Page 9 — Library (`/library`)

**Status:** ✅ Fixed and verified
**Severity:** Medium

**Issues found:**

1. **Page-level CTAs were undersized on mobile** — GitHub, Storybook, resource, and footer actions rendered at 36px height, below the 44px touch target baseline.
2. **Footer CTA row relied on a non-wrapping flex layout** — narrow screens were safe in this viewport, but the layout should not depend on that remaining true at slightly smaller widths.

**Fix applied:**

- Set all page-level CTA buttons on the Library page to 44px height
- Changed the footer CTA row to a wrapping flex layout with gaps for narrow viewports
- Preserved existing internal and external link semantics

**Code references:**

- [apps/client/src/app/pages/library/Library.tsx](../../apps/client/src/app/pages/library/Library.tsx)

**Verification:**

- Route tested: `/library`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- All page-level CTAs verified at 44px height after fix

---

### Page 10 — How-To Index (`/how-to`)

**Status:** ✅ Fixed and verified
**Severity:** Low

**Issues found:**

1. **More Resources links were undersized on mobile** — the inline footer resource links for Skills and Tooling rendered at 21px height, below the 44px touch target baseline.

**Fix applied:**

- Converted the More Resources block from prose-style inline links into a clearer list of mobile-sized resource links
- Set each resource link to a 44px minimum height on mobile
- Preserved the existing guide-card layout and route structure

**Code references:**

- [apps/client/src/app/pages/how-to/HowTo.tsx](../../apps/client/src/app/pages/how-to/HowTo.tsx)

**Verification:**

- Route tested: `/how-to`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- Workflow guide cards remain full-size links
- More Resources links verified at 44px height after fix

---

### Page 11 — Custom Agents Guide (`/how-to/custom-agents`)

**Status:** ✅ Fixed and verified
**Severity:** Medium

**Issues found:**

1. **Inline guide links were undersized on mobile** — the linked agent names in the Available Agents section rendered at 19px height, below the 44px touch target baseline.
2. **Invocation examples did not declare horizontal scrolling** — the longer preformatted example exceeded the visible width of its container without an explicit overflow rule.

**Fix applied:**

- Increased the linked agent references to 44px minimum height on mobile
- Added explicit horizontal scrolling to both invocation example blocks
- Preserved the existing section layout and route structure

**Code references:**

- [apps/client/src/app/pages/how-to/CustomAgents.tsx](../../apps/client/src/app/pages/how-to/CustomAgents.tsx)

**Verification:**

- Route tested: `/how-to/custom-agents`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- Linked agent references verified at 44px height after fix
- Long invocation example scrolls horizontally within its code block

---

### Page 12 — Design Brief Guide (`/how-to/design-brief`)

**Status:** ✅ Fixed and verified
**Severity:** Low

**Issues found:**

1. **The inline handoff link was undersized on mobile** — the link to the Build Signage guide rendered at 21px height, below the 44px touch target baseline.

**Fix applied:**

- Increased the Build Signage handoff link to a 44px minimum height on mobile
- Preserved the existing page structure and example blocks

**Code references:**

- [apps/client/src/app/pages/how-to/DesignBrief.tsx](../../apps/client/src/app/pages/how-to/DesignBrief.tsx)

**Verification:**

- Route tested: `/how-to/design-brief`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- Build Signage handoff link verified at 44px height after fix

---

### Page 13 — Build Signage Guide (`/how-to/build-signage`)

**Status:** ✅ Fixed and verified
**Severity:** Low

**Issues found:**

- No mobile-specific defects found at the target viewport during this pass.

**Fix applied:**

- No code changes required.

**Code references:**

- [apps/client/src/app/pages/how-to/BuildSignage.tsx](../../apps/client/src/app/pages/how-to/BuildSignage.tsx)

**Verification:**

- Route tested: `/how-to/build-signage`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- Inline handoff links already rendered at mobile-safe sizes
- Code examples fit within their containers at this viewport

---

### Page 14 — Deploy BrightSign Guide (`/how-to/deploy-brightsign`)

**Status:** ✅ Fixed and verified
**Severity:** Low

**Issues found:**

1. **Manual deployment commands did not declare horizontal scrolling** — the longest command slightly exceeded its container width on mobile, but the `pre` blocks relied on default overflow behavior.

**Fix applied:**

- Added explicit horizontal scrolling to all command and invocation code blocks on the page
- Preserved existing layout and typography

**Code references:**

- [apps/client/src/app/pages/how-to/DeployBrightSign.tsx](../../apps/client/src/app/pages/how-to/DeployBrightSign.tsx)

**Verification:**

- Route tested: `/how-to/deploy-brightsign`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- All command blocks explicitly support horizontal scrolling after fix

---

### Page 15 — Component Index (`/components`)

**Status:** ✅ Fixed and verified
**Severity:** Low

**Issues found:**

1. **Inline resource links were undersized on mobile** — the intro and footer links for shadcn/ui, Getting Started, and Storybook rendered below the 44px touch target baseline.

**Fix applied:**

- Increased the small inline resource links to a 44px minimum height on mobile
- Preserved the existing component card layout and navigation structure

**Code references:**

- [apps/client/src/app/pages/components/ComponentIndex.tsx](../../apps/client/src/app/pages/components/ComponentIndex.tsx)

**Verification:**

- Route tested: `/components`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- Component cards remain full-size links
- Intro and footer resource links verified at 44px height after fix

---

### Page 16 — Metric Card Doc (`/components/primitives/metric-card`)

**Status:** ✅ Fixed and verified
**Severity:** Medium

**Issues found:**

1. **Code snippet copy buttons were undersized on mobile** — each `Copy` control rendered at 32px height, below the 44px touch target baseline.
2. **Doc resource links were undersized on mobile** — the source file link and footer CTA links rendered below the 44px touch target baseline.

**Fix applied:**

- Increased the shared `CodeSnippet` copy button to a 44px mobile touch target
- Increased the Metric Card doc source link to a 44px minimum height on mobile
- Increased the footer CTA buttons to 44px height on mobile

**Code references:**

- [apps/client/src/app/components/CodeSnippet.tsx](../../apps/client/src/app/components/CodeSnippet.tsx)
- [apps/client/src/app/pages/components/primitives/MetricCardDoc.tsx](../../apps/client/src/app/pages/components/primitives/MetricCardDoc.tsx)

**Verification:**

- Route tested: `/components/primitives/metric-card`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No horizontal overflow (`scrollWidth === viewport width`)
- All `Copy` buttons verified at 44px height after fix
- Source and footer resource links verified at 44px height after fix

---

### Page 17 — Screen Frame Doc (`/components/primitives/screen-frame`)

**Status:** ✅ Fixed and verified
**Severity:** Medium

**Issues found:**

1. **Manual installation source link was undersized on mobile** — the direct source file link rendered at 40px height, below the 44px touch target baseline.
2. **Footer CTA buttons were undersized on mobile** — “View in Storybook” and “View Source” rendered at 36px height.
3. **Props table was clipped on narrow screens** — the table content exceeded the viewport width, but its container hid overflow instead of allowing horizontal scroll.

**Fix applied:**

- Increased the direct source file link to a 44px minimum height on mobile
- Increased the footer CTA buttons to 44px height on mobile
- Changed the props table wrapper to horizontal scrolling so all columns remain reachable on narrow viewports

**Code references:**

- [apps/client/src/app/pages/components/primitives/ScreenFrameDoc.tsx](../../apps/client/src/app/pages/components/primitives/ScreenFrameDoc.tsx)

**Verification:**

- Route tested: `/components/primitives/screen-frame`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No page-level horizontal overflow (`scrollWidth === viewport width`)
- Manual installation source link verified at 44px height after fix
- Footer CTA buttons verified at 44px height after fix
- Props table remains accessible on mobile via horizontal scrolling instead of clipping

---

### Page 18 — Event Card Doc (`/components/primitives/event-card`)

**Status:** ✅ Fixed and verified
**Severity:** Low

**Issues found:**

1. **Manual installation source link was undersized on mobile** — the direct source file link rendered at 40px height, below the 44px touch target baseline.
2. **Footer CTA buttons were undersized on mobile** — “View in Storybook” and “View Source” rendered at 36px height.

**Fix applied:**

- Increased the direct source file link to a 44px minimum height on mobile
- Increased the footer CTA buttons to 44px height on mobile

**Code references:**

- [apps/client/src/app/pages/components/primitives/EventCardDoc.tsx](../../apps/client/src/app/pages/components/primitives/EventCardDoc.tsx)

**Verification:**

- Route tested: `/components/primitives/event-card`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No page-level horizontal overflow (`scrollWidth === viewport width`)
- Manual installation source link verified at 44px height after fix
- Footer CTA buttons verified at 44px height after fix

---

### Page 19 — Announcement Card Doc (`/components/primitives/announcement-card`)

**Status:** ✅ Fixed and verified
**Severity:** Low

**Issues found:**

1. **Manual installation source link was undersized on mobile** — the direct source file link rendered at 40px height, below the 44px touch target baseline.
2. **Footer CTA buttons were undersized on mobile** — “View in Storybook” and “View Source” rendered at 36px height.

**Fix applied:**

- Increased the direct source file link to a 44px minimum height on mobile
- Increased the footer CTA buttons to 44px height on mobile

**Code references:**

- [apps/client/src/app/pages/components/primitives/AnnouncementCardDoc.tsx](../../apps/client/src/app/pages/components/primitives/AnnouncementCardDoc.tsx)

**Verification:**

- Route tested: `/components/primitives/announcement-card`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No page-level horizontal overflow (`scrollWidth === viewport width`)
- Manual installation source link verified at 44px height after fix
- Footer CTA buttons verified at 44px height after fix

---

### Page 20 — Split Screen Doc (`/components/layouts/split-screen`)

**Status:** ✅ Fixed and verified
**Severity:** Low

**Issues found:**

1. **Manual installation source link was undersized on mobile** — the direct source file link rendered at 40px height, below the 44px touch target baseline.
2. **Footer CTA buttons were undersized on mobile** — “View in Storybook” and “View Source” rendered at 36px height.

**Fix applied:**

- Increased the direct source file link to a 44px minimum height on mobile
- Increased the footer CTA buttons to 44px height on mobile

**Code references:**

- [apps/client/src/app/pages/components/layouts/SplitScreenDoc.tsx](../../apps/client/src/app/pages/components/layouts/SplitScreenDoc.tsx)

**Verification:**

- Route tested: `/components/layouts/split-screen`
- Viewport tested: 412 × 924 CSS px (mobile emulation)
- No page-level horizontal overflow (`scrollWidth === viewport width`)
- Manual installation source link verified at 44px height after fix
- Footer CTA buttons verified at 44px height after fix

---
