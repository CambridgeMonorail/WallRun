# Industry Coverage Roadmap For shadcnui-signage

**Date:** 2026-05-04
**Author:** GitHub Copilot
**Status:** Planning

## Context

The current `@wallrun/shadcnui-signage` library already covers the core fixed-layout signage surface well: KPI dashboards, announcements, directories, menu boards, schedules, timing, paging, and operational runtime states.

A gap review against common cross-industry signage use cases identified four missing first-class capabilities, now tracked as:

- #88: Add social proof components for testimonials and star ratings
- #89: Add media-forward signage block for image and video-led content
- #90: Add meeting-room availability and door-sign components
- #91: Add map-based wayfinding block for clinics, hospitals, and large venues

These issues should not be implemented in arbitrary order. Some are smaller, lower-risk extensions of existing library patterns, while others introduce new runtime, performance, or information-design complexity.

## Goals

- Define a recommended implementation order for issues #88-#91.
- Prioritize the highest-value and lowest-risk additions first.
- Sequence work so each phase builds useful patterns for later phases.
- Reduce the chance of starting with the most operationally complex component family.

## Non-Goals

- Implementing the components in this plan.
- Redesigning the existing signage library taxonomy.
- Expanding scope into full GIS navigation, CMS tooling, or complex video pipelines.
- Treating every industry example as a separate component family.

## Recommended Order

### Phase 1: Issue #90

#### Add meeting-room availability and door-sign components

Why first:

- This is the smallest and cleanest extension of the current library.
- It builds directly on patterns the repo already has: `MeetingRow`, `EventCard`, `SignagePanel`, `SignageHeader`, and schedule-oriented composition.
- It closes a specific corporate signage gap with clear product value.
- It is largely a state and layout problem, not a media/runtime problem.
- It can establish a stronger pattern for status-led operational cards, which may help future healthcare and facilities screens too.

Expected output:

- A compact room-status primitive or block such as `RoomStatusCard` or `MeetingRoomSign`
- Status variants such as vacant, occupied, starting soon, unavailable
- A corridor or door-screen demo example

### Phase 2: Issue #88

#### Add social proof components for testimonials and star ratings

Why second:

- This unlocks both retail and restaurant use cases with relatively low implementation risk.
- It is primarily a typography, hierarchy, and card-composition problem.
- It does not depend on new runtime infrastructure.
- It benefits from any status/badge/compact metadata patterns clarified in Phase 1.
- It rounds out the library's promotional and persuasion-oriented content surface quickly.

Expected output:

- A testimonial or review card pattern
- Optional avatar/photo support
- Optional star rating or score display
- Retail and restaurant demo/story coverage

### Phase 3: Issue #91

#### Add map-based wayfinding block for clinics, hospitals, and large venues

Why third:

- This is strategically important for healthcare and large-campus signage.
- It is more complex than Phases 1 and 2 because it introduces layered spatial content, overlays, labels, and visual conflict management.
- It should follow the simpler content-card phases so the team is not solving typography, metadata, and layout conventions at the same time as map composition.
- It expands the current directory surface from list-based wayfinding into visual orientation.

Expected output:

- A `WayfindingMap` or similar floorplan-oriented block
- Current-location and destination emphasis
- Safe text overlays and legend treatment
- Healthcare and campus examples

### Phase 4: Issue #89

#### Add media-forward signage block for image and video-led content

Why last:

- This has the highest implementation and verification risk.
- Video and rich media introduce BrightSign/runtime concerns that the other three issues do not: autoplay constraints, fallback poster states, asset weight, degraded connectivity behavior, and performance budgets.
- The library already has a partial stopgap in `FullscreenHero` background imagery, so this is less urgent than the other uncovered use cases.
- This phase benefits from first clarifying content hierarchy and overlay rules in the earlier phases.

Expected output:

- A media-led block such as `MediaPanel`, `MediaHero`, or `VideoSpotlight`
- Stable fallback behavior when media is missing or delayed
- Explicit guidance for when to use it instead of `FullscreenHero`
- Careful BrightSign-oriented validation for video usage

## Approach

Implement the roadmap as four small feature branches rather than one large cross-cutting effort.

For each issue:

1. define the public API narrowly
2. add the library component in `libs/shadcnui-signage`
3. add Storybook examples that prove the intended industry fit
4. add unit tests for the main states
5. add or update one client signage demo only when it materially improves documentation

This keeps each addition reviewable and prevents the library from accumulating broad but shallow primitives.

## Tasks

- [ ] Phase 1: Implement issue #90 room-status and door-sign components
  - Acceptance criteria: room availability states are explicit, readable, and test-covered
  - Files affected: `libs/shadcnui-signage/src/lib/primitives/**/*` or `blocks/**/*`, related stories/tests, one demo/doc example
- [ ] Phase 2: Implement issue #88 testimonial and rating components
  - Acceptance criteria: quote, attribution, optional image, and optional rating all work without layout breakage
  - Files affected: `libs/shadcnui-signage/src/lib/primitives/**/*` or `blocks/**/*`, related stories/tests, one demo/doc example
- [ ] Phase 3: Implement issue #91 map-based wayfinding block
  - Acceptance criteria: current-location and destination emphasis remain legible over map artwork
  - Files affected: `libs/shadcnui-signage/src/lib/blocks/**/*`, related stories/tests, one healthcare or campus demo/doc example
- [ ] Phase 4: Implement issue #89 media-forward signage block
  - Acceptance criteria: image-led mode is stable first, video support is validated against signage runtime constraints before broadening scope
  - Files affected: `libs/shadcnui-signage/src/lib/blocks/**/*`, related stories/tests, one demo/doc example

## Validation Strategy

For each implementation phase:

- `pnpm test:shadcnui-signage`
- `pnpm type-check:affected`
- `pnpm lint:affected`

For Phase 4 specifically:

- validate image-only mode first
- validate fallback behavior with missing media
- if video support lands, verify against BrightSign packaging/runtime expectations before marking complete

## Risks And Trade-Offs

- Shipping Phase 4 too early risks producing a component that looks good in Storybook but behaves poorly on signage hardware.
- Shipping Phase 3 too early risks solving map rendering before the library's metadata and supporting content conventions are stable.
- Delaying Phase 2 too long leaves retail and restaurant persuasion content underrepresented despite being easy to support.
- Keeping each issue narrow may produce a few overlapping components; that is preferable to a single oversized “universal signage card.”

## Dependencies

- Existing signage primitives and blocks in `libs/shadcnui-signage`
- Existing demo/docs surfaces in `apps/client`
- BrightSign runtime guidance for any video-capable phase

## Open Questions

- Should Phase 1 produce a primitive plus a composed block, or only one block-level abstraction?
- Should Phase 2 keep testimonials and ratings as separate primitives or combine them into one review-oriented card API?
- For Phase 3, should the first version accept only static artwork plus overlays, with route drawing explicitly deferred?
- For Phase 4, should the initial scope be image-first with video documented as a follow-up instead of part of v1?

## Rollback Plan

If any phase expands beyond a narrow, reviewable component addition:

- stop after the library component and tests
- defer extra demos or secondary variants into follow-up issues
- revert that phase independently rather than coupling multiple issue implementations together

## Recommendation Summary

Recommended implementation order:

1. #90 meeting-room availability and door-sign components
2. #88 social proof components for testimonials and star ratings
3. #91 map-based wayfinding block
4. #89 media-forward image/video block

This order maximizes value early, keeps risk controlled, and leaves the highest runtime-complexity work until the library has already gained the simpler missing industry patterns.
