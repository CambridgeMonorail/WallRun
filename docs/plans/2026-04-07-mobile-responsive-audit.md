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
| 4 | `/getting-started` | Getting Started | ⬜ Not started |
| 5 | `/gallery` | Gallery | ⬜ Not started |
| 6 | `/tooling` | Tooling | ⬜ Not started |
| 7 | `/skills` | Skills | ⬜ Not started |
| 8 | `/color-palette` | Color Palette | ⬜ Not started |
| 9 | `/library` | Library | ⬜ Not started |
| 10 | `/how-to` | How-To Index | ⬜ Not started |
| 11 | `/how-to/custom-agents` | Custom Agents Guide | ⬜ Not started |
| 12 | `/how-to/design-brief` | Design Brief Guide | ⬜ Not started |
| 13 | `/how-to/build-signage` | Build Signage Guide | ⬜ Not started |
| 14 | `/how-to/deploy-brightsign` | Deploy BrightSign Guide | ⬜ Not started |

### Priority 3 — Component Documentation

| # | Route | Page | Status |
| --- | --- | --- | --- |
| 15 | `/components` | Component Index | ⬜ Not started |
| 16 | `/components/primitives/metric-card` | Metric Card Doc | ⬜ Not started |
| 17 | `/components/primitives/screen-frame` | Screen Frame Doc | ⬜ Not started |
| 18 | `/components/primitives/event-card` | Event Card Doc | ⬜ Not started |
| 19 | `/components/primitives/announcement-card` | Announcement Card Doc | ⬜ Not started |
| 20 | `/components/layouts/split-screen` | Split Screen Doc | ⬜ Not started |
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
