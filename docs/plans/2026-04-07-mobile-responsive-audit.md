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
> 1. **Pick ONE page** per session.
> 2. **Diagnose and fix first** using text notes, DOM inspection, and targeted code references.
> 3. **Use screenshots only when necessary** and cap them at **one mobile screenshot per page**.
> 4. **Update this document** — mark the page status, add a brief note, and commit.
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
| 3 | `*` (404) | Not Found | ✅ Fixed and verified |

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
| 21 | `/components/layouts/signage-container` | Signage Container Doc | ✅ Fixed and verified |
| 22 | `/components/layouts/signage-header` | Signage Header Doc | ✅ Fixed and verified |
| 23 | `/components/blocks/fullscreen-hero` | Fullscreen Hero Doc | ✅ Fixed and verified |
| 24 | `/components/blocks/info-card-grid` | Info Card Grid Doc | ✅ Fixed and verified |
| 25 | `/components/behaviour/content-rotator` | Content Rotator Doc | ✅ Fixed and verified |
| 26 | `/components/behaviour/schedule-gate` | Schedule Gate Doc | ✅ Fixed and verified |
| 27 | `/components/behaviour/auto-paging-list` | Auto Paging List Doc | ✅ Fixed and verified |
| 28 | `/components/behaviour/signage-transition` | Signage Transition Doc | ✅ Fixed and verified |
| 29 | `/components/behaviour/clock` | Clock Doc | ✅ Fixed and verified |
| 30 | `/components/behaviour/countdown` | Countdown Doc | ✅ Fixed and verified |
| 31 | `/components/behaviour/offline-fallback` | Offline Fallback Doc | ✅ Fixed and verified |
| 32 | `/components/behaviour/stale-data-indicator` | Stale Data Indicator Doc | ⬜ Not started |

### Priority 4 — Signage Example Screens

| # | Route | Page | Status |
| --- | --- | --- | --- |
| 33 | `/signage/welcome` | Welcome Screen | ⬜ Not started |
| 34 | `/signage/menu` | Restaurant Menu | ⬜ Not started |
| 35 | `/signage/wayfinding` | Office Directory | ⬜ Not started |
| 36 | `/signage/dashboard` | KPI Dashboard | ⬜ Not started |
| 37 | `/signage/announcements` | Announcements Board | ⬜ Not started |
| 38 | `/signage/event-schedule` | Event Schedule | ⬜ Not started |
| 39 | `/signage/office-lobby-loop` | Office Lobby Loop | ⬜ Not started |
| 40 | `/signage/daypart-menu` | Daypart Menu | ⬜ Not started |

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

## Progress Snapshot

**Current progress:** 32 / 40 pages complete (80%)

### Completion by priority

| Priority | Scope | Complete | Remaining |
| --- | --- | ---: | ---: |
| 1 | First impressions | 3 / 3 | 0 |
| 2 | Main content pages | 11 / 11 | 0 |
| 3 | Component documentation | 17 / 18 | 1 |
| 4 | Signage example screens | 0 / 8 | 8 |

### Main patterns found so far

1. Mobile touch targets were consistently undersized, especially footer CTAs, example controls, and inline resource links.
2. A smaller but repeated class of issues came from horizontal overflow in code blocks, props tables, and long command examples.
3. Several pages relied on desktop-oriented semantics or wording, such as clickable cards without link semantics or mouse-centric instructions.

### Detailed completed-page notes

Detailed findings for Pages 1-28 were moved to [2026-04-07-mobile-responsive-audit-log-pages-01-28.md](./2026-04-07-mobile-responsive-audit-log-pages-01-28.md) so future sessions do not need to load a 900-line running transcript before starting new work.

## Session Log

### Page 3 — `*` (404)

- Status: `✅`
- Issue: the recovery link was only 24px high on mobile, and long missing routes could trigger horizontal overflow when the full path rendered inline.
- Fix: rebuilt the page as a constrained card layout, switched the attempted path to a wrapped mono block, and replaced the lone text link with two 44px recovery actions.
- Verification: route `/does-not-exist` and a long missing route at 412 × 924 both reported `scrollWidth === viewportWidth`, and both recovery links measured 44px height.
- Evidence: `none`

### Page 29 — `/components/behaviour/clock`

- Status: `✅`
- Issue: the inline installation source link measured 19px high on mobile, and both footer CTA links measured 36px high.
- Fix: promoted the inline source link to an inline-flex 44px target and raised both footer CTA buttons to 44px.
- Verification: route `/components/behaviour/clock` at 412 × 924 reported `scrollWidth === viewportWidth`; inline source link, footer links, and copy buttons all measured 44px height.
- Evidence: `none`

### Page 30 — `/components/behaviour/countdown`

- Status: `✅`
- Issue: the inline installation source link measured 19px high on mobile, and both footer CTA links measured 36px high.
- Fix: promoted the inline source link to an inline-flex 44px target and raised both footer CTA buttons to 44px.
- Verification: route `/components/behaviour/countdown` at 412 × 924 reported `scrollWidth === viewportWidth`; inline source link, footer links, and copy buttons all measured 44px height.
- Evidence: `none`

### Page 31 — `/components/behaviour/offline-fallback`

- Status: `✅`
- Issue: the inline installation source link measured 19px high on mobile, the example toggle button measured 36px, and both footer CTA links measured 36px.
- Fix: promoted the inline source link to an inline-flex 44px target and raised the example toggle and both footer CTA buttons to 44px.
- Verification: route `/components/behaviour/offline-fallback` at 412 × 924 reported `scrollWidth === viewportWidth`; inline source link, example toggle, footer links, and copy buttons all measured 44px height.
- Evidence: `none`

## Remaining Pages

### Next highest-priority pages

1. `/components/behaviour/stale-data-indicator` — Stale Data Indicator Doc
2. `/signage/welcome` — Welcome Screen
3. `/signage/menu` — Restaurant Menu
4. `/signage/wayfinding` — Office Directory
5. `/signage/dashboard` — KPI Dashboard

### Final batch after docs are complete

1. `/signage/welcome`
2. `/signage/menu`
3. `/signage/wayfinding`
4. `/signage/dashboard`
5. `/signage/announcements`
6. `/signage/event-schedule`
7. `/signage/office-lobby-loop`
8. `/signage/daypart-menu`

## Low-Context Audit Protocol

This plan must stay lightweight. Do not turn it back into a full transcript.

### Per-session limits

- Audit exactly 1 page per session by default.
- Use 0 screenshots by default.
- If visual evidence is necessary, use 1 screenshot total for that page.
- Prefer DOM inspection and text snapshots over screenshots.
- Do not paste before/after galleries into chat.
- Do not re-read the archive file unless you need historical detail for a page already completed.

### What to record in this main file for a newly completed page

- Change the status in the table.
- Add a 3-5 line note under a short session log section.
- If a page needs more detail, put that detail in a separate archive note instead of expanding this control document.

### Recommended chat workflow

1. Read only the top of this file plus the specific page implementation files.
2. Diagnose with text evidence first.
3. Fix the code.
4. Verify with viewport width and `scrollWidth` checks.
5. Capture one screenshot only if the defect cannot be adequately described in text.
6. Update status and add a brief note.
7. End the session and start a new chat for the next page.

## Session Log Template

Use this compact format for all remaining pages.

### Page XX — Route

- Status: `🔍`, `🔧`, `✅`, or `➖`
- Issue: one sentence
- Fix: one sentence
- Verification: route + viewport + overflow result + touch target result
- Evidence: `none` or `1 screenshot`
