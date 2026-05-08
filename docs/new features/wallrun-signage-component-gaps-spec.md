# WallRun Signage Component Gaps Spec

## Purpose

This spec turns the component gap review into an implementation brief for expanding WallRun's signage component library.

WallRun already has useful signage primitives, layouts, blocks, and behaviours. The next layer should help creators build complete signage systems: playlists, screen-role templates, calls to action, live data states, operational fallbacks, physical screen validation, and governed publishing patterns.

The goal is not to copy a CMS feature list. The goal is to add React components that make signage-specific decisions explicit in code.

## Current Baseline

The existing signage library already covers:

- fixed-format framing: `ScreenFrame`
- layout shells: `SignageContainer`, `SplitScreen`, `SignageHeader`
- content primitives: `MetricCard`, `EventCard`, `AnnouncementCard`, `DirectoryCard`, `FloorBadge`, `LocationIndicator`, `MenuItem`, `MenuSection`, `SignagePanel`, `MeetingRow`, `InfoList`
- composed blocks: `FullscreenHero`, `InfoCardGrid`, `MenuBoard`
- runtime behaviours: `Clock`, `Countdown`, `ContentRotator`, `AutoPagingList`, `ScheduleGate`, `StaleDataIndicator`, `SignageTransition`, `OfflineFallback`

The missing layer is not more generic UI. It is signage-native workflow support.

## Design Principles

- Treat signage as a timed surface, not a web page.
- Make screen role, dwell context, and schedule explicit.
- Prefer one dominant message with subordinate support.
- Make CTA, QR, freshness, and expiry states hard to forget.
- Support real display constraints: portrait, overscan, bezels, reach zones, and viewing distance.
- Components should be deterministic at known resolutions.
- Components should ship with Storybook examples, registry entries, and tests.

## Priority Roadmap

### Phase 1: Core Runtime and Message Clarity

Build these first because they affect almost every signage project.

- `PlaylistTimeline`
- `PlaylistItem`
- `LoopProgress`
- `PriorityTakeover`
- `QRCodeCallout`
- `ShortUrlCallout`
- `ActionStrip`
- `OneMessageFrame`
- `NoContentFallback`
- `ContentExpiredWarning`
- `LastUpdatedStamp`

### Phase 2: Creator Starting Points

Build these once the runtime primitives exist.

- `ArrivalBoard`
- `WayfindingBoard`
- `WaitingRoomBoard`
- `DecisionBoard`
- `OperationalStatusBoard`
- `WorkplaceShiftBoard`
- `RestaurantMenuBoard`
- `EventScheduleBoard`

### Phase 3: Real-Screen QA and Operations

Build these to support deployment confidence and production review.

- `BezelGrid`
- `OverscanGuide`
- `ReachZoneOverlay`
- `ViewingDistancePreview`
- `OrientationSwitcher`
- `PlayerHealthPanel`
- `DeploymentVersionBadge`
- `ReconnectingState`

### Phase 4: Interactive and Governance Patterns

Build these after the static and timed-signage path is solid.

- `KioskHome`
- `TouchNav`
- `IdleReset`
- `BackHomeControls`
- `QRHandoff`
- `MessageApprovalBadge`
- `ContentOwnerLabel`
- `ExpiryDateBadge`
- `LocalOverrideSlot`

## Component Specs

### PlaylistTimeline

Purpose: visualize and drive a signage loop with explicit durations, priorities, and current item state.

Recommended API:

```ts
type PlaylistTimelineProps = {
  items: Array<{
    id: string
    label: string
    durationMs: number
    priority?: 'normal' | 'important' | 'takeover'
    startsAt?: Date | string
    endsAt?: Date | string
  }>
  activeId?: string
  showDurations?: boolean
  variant?: 'compact' | 'full'
}
```

Acceptance criteria:

- clearly shows what is live now and what is next
- supports short loops without visual clutter
- marks expired or future items distinctly
- uses tabular timing where durations are visible
- has Storybook stories for announcement loop, menu dayparts, and emergency takeover

### PlaylistItem

Purpose: wrap one timed piece of signage content with duration, priority, and metadata.

Recommended API:

```ts
type PlaylistItemProps = {
  durationMs: number
  priority?: 'normal' | 'important' | 'takeover'
  label?: string
  children: React.ReactNode
}
```

Acceptance criteria:

- works with `ContentRotator` or a future playlist controller
- exposes metadata without forcing visible chrome
- supports testable duration values

### LoopProgress

Purpose: provide a subtle progress cue for the current loop or current item.

Recommended API:

```ts
type LoopProgressProps = {
  value: number
  max?: number
  label?: string
  position?: 'top' | 'bottom' | 'inline'
  tone?: 'subtle' | 'visible'
}
```

Acceptance criteria:

- does not compete with the main message
- can be hidden from final production screens when used only for preview
- supports reduced-motion preferences

### PriorityTakeover

Purpose: temporarily override the normal loop for urgent, operational, or event-critical content.

Recommended API:

```ts
type PriorityTakeoverProps = {
  active: boolean
  reason?: string
  tone?: 'urgent' | 'service' | 'maintenance' | 'neutral'
  children: React.ReactNode
  fallback?: React.ReactNode
}
```

Acceptance criteria:

- takeover content is visually unmistakable
- normal fallback content remains available
- supports emergency, delay, closure, and maintenance examples

### QRCodeCallout

Purpose: show a scan-safe QR code with a clear instruction and destination label.

Recommended API:

```ts
type QRCodeCalloutProps = {
  value: string
  label: string
  instruction?: string
  shortUrl?: string
  size?: 'sm' | 'md' | 'lg'
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
}
```

Acceptance criteria:

- QR code stays large enough for common viewing distances
- destination text is visible so the action is not mysterious
- supports light and dark backgrounds
- includes a story for poster-style CTA and side-zone CTA

### ShortUrlCallout

Purpose: provide a non-QR fallback for calls to action.

Recommended API:

```ts
type ShortUrlCalloutProps = {
  url: string
  label?: string
  prefix?: string
  variant?: 'inline' | 'panel' | 'strip'
}
```

Acceptance criteria:

- URL is readable from distance
- optional label explains the destination
- pairs cleanly with `QRCodeCallout`

### ActionStrip

Purpose: reserve a clear CTA area without overloading the primary message.

Recommended API:

```ts
type ActionStripProps = {
  message: string
  action?: React.ReactNode
  position?: 'bottom' | 'right' | 'left'
  tone?: 'brand' | 'neutral' | 'urgent'
}
```

Acceptance criteria:

- keeps one primary action visually dominant
- does not shrink the main content below legibility thresholds
- works in landscape and portrait examples

### OneMessageFrame

Purpose: enforce the "one main point, one next step" signage pattern.

Recommended API:

```ts
type OneMessageFrameProps = {
  headline: string
  supportingText?: string
  action?: React.ReactNode
  media?: React.ReactNode
  utility?: React.ReactNode
}
```

Acceptance criteria:

- headline remains the dominant element
- supporting text clamps to a safe line count
- action area is optional but visually clear when present

### NoContentFallback

Purpose: prevent blank screens when a playlist, feed, or schedule has nothing valid to show.

Recommended API:

```ts
type NoContentFallbackProps = {
  title?: string
  message?: string
  owner?: string
  lastCheckedAt?: Date | string
  variant?: 'public-safe' | 'operator-debug'
}
```

Acceptance criteria:

- public-safe mode avoids exposing technical internals
- operator-debug mode can show enough information for diagnosis
- works with `OfflineFallback` and `StaleDataIndicator`

### ContentExpiredWarning

Purpose: mark content that is beyond its scheduled or approved display window.

Recommended API:

```ts
type ContentExpiredWarningProps = {
  expiredAt: Date | string
  label?: string
  variant?: 'badge' | 'panel' | 'overlay'
}
```

Acceptance criteria:

- badge mode is suitable for admin preview
- overlay mode is suitable for QA, not public playback by default
- pairs with governed content metadata

### LastUpdatedStamp

Purpose: show data freshness without making every screen feel like a dashboard.

Recommended API:

```ts
type LastUpdatedStampProps = {
  updatedAt: Date | string
  staleAfterMs?: number
  format?: 'relative' | 'absolute' | 'time'
}
```

Acceptance criteria:

- relative format reads clearly at distance
- stale state can be styled without relying on color alone
- supports timezone-safe formatting

## Screen Role Blocks

### ArrivalBoard

Use for entrance, reception, lobby, and check-in contexts.

Must support:

- welcome message
- current time or event cue
- one primary orientation item
- optional QR or short URL action
- optional secondary service notice

### WayfindingBoard

Use for directions and local navigation.

Must support:

- current location
- destination cards
- floor or zone indicators
- optional map slot
- optional accessibility note

### WaitingRoomBoard

Use for dwell-heavy spaces where reassurance matters.

Must support:

- current status or wait expectation
- calm primary message
- optional rotating information
- optional service reminder or QR handoff

### DecisionBoard

Use near ordering, purchasing, selection, or queue moments.

Must support:

- one dominant choice or offer
- price or availability metadata
- CTA strip
- optional supporting comparison

### OperationalStatusBoard

Use for warehouses, transport, venues, factories, service counters, or incident displays.

Must support:

- status summary
- severity tone
- key metrics
- last-updated stamp
- fallback or stale-data states

### WorkplaceShiftBoard

Use for staff-facing screens around shift changes and internal communication.

Must support:

- shift or team context
- current priorities
- safety or operational notes
- date/time
- message owner or source

## Display QA Components

### BezelGrid

Purpose: overlay video-wall panel boundaries so designers avoid placing important content across bezels.

Acceptance criteria:

- supports rows, columns, and gap width
- can be used inside `ScreenFrame`
- visually distinct in preview mode only

### OverscanGuide

Purpose: show safe margins for displays that may crop edges.

Acceptance criteria:

- supports percentage and pixel margins
- can show warning zones
- does not ship as visible production chrome by default

### ReachZoneOverlay

Purpose: preview touch reach constraints on portrait and kiosk screens.

Acceptance criteria:

- supports mounting height and screen size assumptions
- marks comfortable, stretch, and avoid zones
- includes examples for portrait 1080p and 4k landscape touch

### ViewingDistancePreview

Purpose: help developers validate type scale for known viewing distances.

Acceptance criteria:

- accepts viewing distance in metres or feet
- flags text below recommended minimum sizes
- works as a Storybook QA wrapper

## Governance Components

### MessageApprovalBadge

Purpose: show whether content is draft, approved, scheduled, live, expired, or rejected.

Recommended statuses:

- `draft`
- `approved`
- `scheduled`
- `live`
- `expired`
- `rejected`

### ContentOwnerLabel

Purpose: identify who owns a message or feed.

Recommended fields:

- owner name
- department
- contact or escalation label
- optional source system

### ExpiryDateBadge

Purpose: make stale campaigns less likely by displaying content expiry in preview and admin surfaces.

### LocalOverrideSlot

Purpose: give local teams a controlled area without breaking mandatory global content.

Acceptance criteria:

- slot can be empty without collapsing the layout
- mandatory content remains dominant
- local override has visible ownership metadata in preview mode

## Interactive Components

### KioskHome

Purpose: starting screen for touch signage.

Must support:

- large touch-safe navigation choices
- optional language selector
- persistent home context
- idle reset integration

### TouchNav

Purpose: signage-sized navigation for shallow touch flows.

Acceptance criteria:

- no more than four primary choices by default
- large touch targets
- visible selected state
- supports portrait reach zones

### IdleReset

Purpose: return abandoned sessions to a known state.

Recommended API:

```ts
type IdleResetProps = {
  timeoutMs: number
  warningMs?: number
  onReset: () => void
  children: React.ReactNode
}
```

### BackHomeControls

Purpose: provide obvious recovery on touch screens.

Acceptance criteria:

- home and back controls are always reachable
- controls are large enough for public touch use
- works with `IdleReset`

### QRHandoff

Purpose: move a task from public screen to personal device.

Acceptance criteria:

- includes QR and short URL options
- explains what continues on the phone
- supports privacy-safe copy for public spaces

## Storybook Requirements

Every new component should include:

- default story
- dark and light or high-contrast story where relevant
- 1080p landscape story
- portrait story when layout-sensitive
- stale, empty, expired, or offline state stories where relevant
- realistic signage examples, not placeholder lorem ipsum

## Registry Requirements

Every public component should get:

- registry entry
- install command example
- dependency list
- usage snippet
- screenshot or Storybook preview link

Recommended registry names should use kebab case:

- `playlist-timeline`
- `qr-code-callout`
- `one-message-frame`
- `no-content-fallback`
- `arrival-board`
- `operational-status-board`
- `bezel-grid`
- `idle-reset`

## Testing Requirements

Component tests should cover:

- render without crashing
- required labels and content appear
- expired, stale, offline, and empty states
- time-sensitive behaviour with deterministic timers
- accessibility basics for interactive components
- no uncontrolled layout overflow in common resolutions where practical

Visual QA should cover:

- 1920x1080 landscape
- 3840x2160 landscape for dense components
- 1080x1920 portrait for touch and role blocks
- reduced motion where animated

## Non-Goals

- Do not build a full CMS.
- Do not build asset upload, user permissions, or billing UI here.
- Do not make generic dashboard components unless they are adapted for wall-screen use.
- Do not make every vertical block fully data-integrated at first. Static and prop-driven examples are enough for the first pass.
- Do not expose technical error details on public playback screens by default.

## Definition Of Done

A component is ready when:

- it solves a named signage job
- its props make signage-specific context explicit
- it behaves predictably at fixed display resolutions
- it has Storybook coverage with realistic content
- it has a registry entry
- it has basic unit tests
- it has documented empty, stale, expired, or offline states when those states apply

## Suggested First Pull Request

Implement the Phase 1 CTA and fallback set:

- `QRCodeCallout`
- `ShortUrlCallout`
- `ActionStrip`
- `OneMessageFrame`
- `NoContentFallback`
- `LastUpdatedStamp`
- `ContentExpiredWarning`

Why this first:

- it improves almost every signage composition
- it is smaller than playlist orchestration
- it gives creators immediate building blocks for clearer screens
- it creates the metadata patterns needed by later governance and operations components

## Delivery Strategy

Use grouped workstreams rather than one issue per component. The roadmap is broad enough that 30-plus single-component issues would create tracking noise before implementation starts.

Each workstream issue should:

- name the components included in scope
- describe the shared signage job the group solves
- include Storybook, tests, registry, and docs requirements
- define any dependencies on earlier primitives
- stay reviewable as one pull request or a short sequence of tightly related pull requests

## Cross-Cutting Build Rules

Every implementation issue in this roadmap should assume the following unless it explicitly says otherwise:

- components live in `libs/shadcnui-signage`
- new public components ship with exports and registry entries
- stories use realistic signage data, not lorem ipsum or dashboard filler
- time-sensitive behaviour uses deterministic timers in tests
- interactive components include keyboard and focus handling where applicable
- preview-only QA overlays do not leak into production defaults
- public playback states avoid raw technical diagnostics unless a debug variant is requested

## Dependency Notes

- `PlaylistItem`, `PlaylistTimeline`, `LoopProgress`, and `PriorityTakeover` should land before board templates that need loop awareness
- `QRCodeCallout`, `ShortUrlCallout`, `ActionStrip`, and `OneMessageFrame` should land before most promotional and decision-oriented boards
- freshness and fallback primitives should land before live-data and operations boards
- QA overlays can ship independently, but they become more useful once role blocks exist in Storybook
- interactive kiosk patterns should depend on the reach-zone and idle-reset primitives rather than inventing separate touch rules

## Issue Breakdown

### Roadmap Epic

Proposed title:

- `feat(shadcnui-signage): Implement signage component gaps roadmap`

Purpose:

- track the overall roadmap
- link the grouped implementation issues
- keep the spec, sequencing, and follow-up decisions in one place

### Workstream 1: Playlist Runtime Primitives

Proposed title:

- `feat(shadcnui-signage): Add playlist runtime primitives for timed signage loops`

In scope:

- `PlaylistTimeline`
- `PlaylistItem`
- `LoopProgress`
- `PriorityTakeover`

Exit criteria:

- timed-loop metadata is modeled explicitly in component props
- active, next, expired, and takeover states are all demonstrated in Storybook
- the work establishes the base contract for later playlist orchestration

### Workstream 2: CTA and Handoff Primitives

Proposed title:

- `feat(shadcnui-signage): Add CTA and QR handoff primitives for signage actions`

In scope:

- `QRCodeCallout`
- `ShortUrlCallout`
- `ActionStrip`
- `QRHandoff`

Exit criteria:

- CTA patterns remain readable from distance
- QR and short URL treatments work together cleanly
- poster-style, side-zone, and footer CTA examples exist

Related issue notes:

- align with or supersede the narrower CTA banner work already tracked in issue `#53`

### Workstream 3: Message Clarity and Freshness States

Proposed title:

- `feat(shadcnui-signage): Add message clarity, fallback, and freshness primitives`

In scope:

- `OneMessageFrame`
- `NoContentFallback`
- `ContentExpiredWarning`
- `LastUpdatedStamp`
- `ReconnectingState`

Exit criteria:

- creators can build a safe public fallback path without custom glue
- stale, empty, expired, and reconnecting states are all documented and tested
- preview or operator variants are separated from public-safe defaults

### Workstream 4: Arrival and Decision Templates

Proposed title:

- `feat(shadcnui-signage): Add arrival, waiting, and decision board templates`

In scope:

- `ArrivalBoard`
- `WaitingRoomBoard`
- `DecisionBoard`

Exit criteria:

- each template demonstrates one dominant message plus one next step
- optional QR and service notices fit without collapsing readability
- landscape and portrait examples exist where the template meaningfully changes

### Workstream 5: Wayfinding and Navigation Templates

Proposed title:

- `feat(shadcnui-signage): Add wayfinding board templates for navigational signage`

In scope:

- `WayfindingBoard`
- optional integration point for map-based or floorplan content

Exit criteria:

- list-based and map-slot wayfinding compositions are both supported
- current location and destination emphasis are clearly modeled
- accessibility notes and floor or zone metadata have a defined place in the layout

Related issue notes:

- coordinate with the existing map-based wayfinding request in issue `#91`

### Workstream 6: Operational and Schedule Boards

Proposed title:

- `feat(shadcnui-signage): Add operational, schedule, and shift board templates`

In scope:

- `OperationalStatusBoard`
- `WorkplaceShiftBoard`
- `EventScheduleBoard`
- `RestaurantMenuBoard`

Exit criteria:

- boards combine existing primitives with the new freshness and fallback states
- examples cover at least one live-data style screen and one menu-style screen
- ownership, timing, and severity cues are built into the component contracts

### Workstream 7: Screen QA and Physical Display Overlays

Proposed title:

- `feat(shadcnui-signage): Add screen QA overlays for physical display validation`

In scope:

- `BezelGrid`
- `OverscanGuide`
- `ReachZoneOverlay`
- `ViewingDistancePreview`
- `OrientationSwitcher`

Exit criteria:

- overlays are useful in Storybook and preview environments
- they stay opt-in and hidden in production defaults
- the work creates repeatable QA patterns for landscape, portrait, and touch validation

### Workstream 8: Governance and Content Lifecycle Metadata

Proposed title:

- `feat(shadcnui-signage): Add governance metadata components for signage content lifecycle`

In scope:

- `MessageApprovalBadge`
- `ContentOwnerLabel`
- `ExpiryDateBadge`
- `LocalOverrideSlot`
- `DeploymentVersionBadge`

Exit criteria:

- approval, ownership, expiry, and override state can be shown consistently in preview and admin-oriented surfaces
- local override patterns never displace mandatory content by default
- deployment or version metadata has a clear operator-facing treatment

### Workstream 9: Player and Runtime Operations States

Proposed title:

- `feat(shadcnui-signage): Add player health and runtime operations states`

In scope:

- `PlayerHealthPanel`
- integration with `ReconnectingState`, `LastUpdatedStamp`, and fallback primitives

Exit criteria:

- operator-facing states are available without exposing noisy diagnostics to public playback
- the work defines a reusable operational status surface for demos and internal tooling

### Workstream 10: Touch and Kiosk Foundations

Proposed title:

- `feat(shadcnui-signage): Add touch and kiosk foundation components`

In scope:

- `KioskHome`
- `TouchNav`
- `IdleReset`
- `BackHomeControls`

Exit criteria:

- touch-safe navigation is consistent across portrait kiosks and shallow flows
- idle reset and home recovery are demonstrated in Storybook
- reach-zone guidance informs default placement and sizing

## Recommended Delivery Order

1. Workstream 2: CTA and Handoff Primitives
2. Workstream 3: Message Clarity and Freshness States
3. Workstream 1: Playlist Runtime Primitives
4. Workstream 7: Screen QA and Physical Display Overlays
5. Workstream 4: Arrival and Decision Templates
6. Workstream 5: Wayfinding and Navigation Templates
7. Workstream 6: Operational and Schedule Boards
8. Workstream 8: Governance and Content Lifecycle Metadata
9. Workstream 9: Player and Runtime Operations States
10. Workstream 10: Touch and Kiosk Foundations

## Issue Creation Notes

When creating GitHub issues from this spec:

- create one parent roadmap issue and link each workstream to it
- use GitHub `Feature` issue type
- keep issue bodies grounded in signage jobs, not just component names
- reference existing overlapping issues instead of silently duplicating them
- call out whether an issue can land as one pull request or should be delivered as a short stack

