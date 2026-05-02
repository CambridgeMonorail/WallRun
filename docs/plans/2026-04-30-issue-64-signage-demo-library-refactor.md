# Issue 64 Signage Demo Library Refactor

**Date:** 2026-04-30
**Status:** In Progress

## Goal

Refactor the client signage demo pages so they demonstrate the
`shadcnui-signage` component library instead of duplicating the same UI with
page-local raw HTML, while keeping the existing visual output stable.

## Context

Issue #64 is driven by the audit in
`docs/reviews/signage-demo-pages-audit.md`, which found that only 3 of 8 demo
pages are good examples of the component library.

The issue is explicitly blocked by component work tracked in issues #47-#63.
That means this effort should proceed in two stages:

- confirm which blocker issues are already resolved in `libs/shadcnui-signage`
- refactor each demo page only after the required primitives or block
  enhancements exist

## Blocker Audit

Based on the current `libs/shadcnui-signage/src/index.ts` exports and the
component implementations in the library, the blocker list currently breaks
down like this:

### Present Or Sufficiently Landed

- `#62 SignageHeader subtitle` is already represented by the existing
      `SignageHeader.subtitle` API.

### Partial

- `#55 AmbientOrbs` is partially covered by `SignageContainer.showAmbientOrbs`,
      but not as a standalone exported primitive.
- `#54 GridOverlay` is partially covered by `SignageContainer.showGrid`, but
      not as a standalone exported primitive or customizable overlay.
- `#61 FullscreenHero enhancements` is partially covered by the existing
      `FullscreenHero`, but it still lacks the visual hooks needed for the current
      `WelcomeScreen` implementation.

### Still Missing From The Library Surface

- `#47 MenuBoard`
- `#48 MenuItem`
- `#49 MenuSection`
- `#50 DirectoryCard`
- `#51 LocationIndicator`
- `#52 SignagePanel`
- `#53 CTABanner`
- `#56 GradientText`
- `#57 TagBadge`
- `#58 MeetingRow`
- `#59 FloorBadge`
- `#60 InfoList`
- `#63 InfoCardGrid render props`

## Immediate Sequence

1. Use `WelcomeScreen.tsx` as the first refactor target because it is the
       smallest high-priority page and the library already has partial support via
       `SignageContainer` and `FullscreenHero`.
2. Land the smallest `FullscreenHero` and decorative-surface enhancements
       needed to reproduce `WelcomeScreen` without page-local raw HTML.
3. Validate that slice before moving on to directory and menu components, which
       still require clearly missing primitives.

## Task Breakdown

- [x] Confirm blocker status for issues #47-#63 against the current library.
- [x] Map each page to the concrete component changes still required.
- [x] Land missing library work needed for high-priority and medium-priority
      pages.
- [x] Refactor `WelcomeScreen.tsx` to use `FullscreenHero` and supporting
      decorative primitives instead of page-local markup.
- [x] Refactor `OfficeDirectory.tsx` to use library directory and location
      components instead of custom cards and badges.
- [x] Refactor `RestaurantMenu.tsx` to use menu board library components.
- [x] Refactor `DaypartMenu.tsx` to replace remaining raw menu markup with menu
      board library components.
- [x] Refactor `OfficeLobbyLoop.tsx` to replace custom panel/list markup with
      signage library components.
- [ ] Apply low-risk cleanup passes to `AnnouncementsBoard.tsx`,
      `EventSchedule.tsx`, and `KPIDashboard.tsx` where the library now covers
      duplicated page-local markup.
- [x] Add or update tests for new library behavior and page integrations.
- [ ] Run affected validation and then `pnpm verify` before closing the issue.

## Progress Summary

Completed library additions and page refactors:

- `FullscreenHero` enhancements plus improved Storybook docs and stories
- `DirectoryCard`, `FloorBadge`, and `LocationIndicator`
- `MenuBoard`, `MenuSection`, and `MenuItem`
- `SignagePanel`, `MeetingRow`, and `InfoList`
- page refactors for `WelcomeScreen`, `OfficeDirectory`, `RestaurantMenu`,
  `DaypartMenu`, and `OfficeLobbyLoop`

Remaining work is now concentrated in the low-priority cleanup tier, where the
demo pages still depend on missing or only-partial library surfaces.

## Page Groups

### High Priority

- `apps/client/src/app/pages/signage/WelcomeScreen.tsx`
- `apps/client/src/app/pages/signage/OfficeDirectory.tsx`
- `apps/client/src/app/pages/signage/RestaurantMenu.tsx`

#### Current Mapping

- `WelcomeScreen.tsx`: blocked by `#61` and functionally by `#56`; may also use
      the partial `#54` and `#55` surfaces if enhancing `FullscreenHero` is enough.
- `OfficeDirectory.tsx`: blocked by `#50`, `#51`, and `#59`.
- `RestaurantMenu.tsx`: blocked by `#47`, `#48`, `#49`, and likely `#57`.

### Medium Priority

- `apps/client/src/app/pages/signage/DaypartMenu.tsx`
- `apps/client/src/app/pages/signage/OfficeLobbyLoop.tsx`

#### Current Mapping

- `DaypartMenu.tsx`: blocked by the same menu component set as
      `RestaurantMenu.tsx` (`#47`, `#48`, `#49`).
- `OfficeLobbyLoop.tsx`: blocked by `#52`, `#58`, and `#60`.

### Low Priority

- `apps/client/src/app/pages/signage/AnnouncementsBoard.tsx`
- `apps/client/src/app/pages/signage/EventSchedule.tsx`
- `apps/client/src/app/pages/signage/KPIDashboard.tsx`

#### Current Mapping

- `AnnouncementsBoard.tsx`: optional cleanup once `#54` is fully solved.
- `EventSchedule.tsx`: optional cleanup once `#53` and `#54` are fully solved.
- `KPIDashboard.tsx`: optional cleanup once `#53` and `#63` are fully solved.

## Current Validation Evidence

- focused `WelcomeScreen` page and component tests passed
- focused `OfficeDirectory` page and primitive tests passed
- focused `RestaurantMenu` and `DaypartMenu` page tests plus menu component
      tests passed
- focused `OfficeLobbyLoop` page and primitive tests passed
- combined scoped regression run across touched signage pages and new component
      specs passed

## Likely Files To Change

- `apps/client/src/app/pages/signage/*.tsx`
- `libs/shadcnui-signage/src/lib/blocks/*.tsx`
- `libs/shadcnui-signage/src/lib/layouts/*.tsx`
- `libs/shadcnui-signage/src/lib/primitives/*.tsx`
- `libs/shadcnui-signage/src/lib/behaviour/*.tsx`
- `libs/shadcnui-signage/src/index.ts`
- colocated tests and stories for any new or expanded library components

## Validation Plan

- `pnpm run test:affected`
- `pnpm run lint:affected`
- `pnpm run type-check:affected`
- `pnpm verify`

## Expected Result

All eight signage demo pages showcase the shared signage component library,
avoid duplicating library functionality in page-local HTML, preserve their
current appearance, and remain covered by passing tests and verification.