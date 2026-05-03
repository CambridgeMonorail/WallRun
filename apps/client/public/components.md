# WallRun Components

This file is the machine-readable component catalogue for the installable WallRun signage surface.

## How To Use This File

- Use this file when you need the install command, source path, runtime dependencies, or component fit.
- Use `library.md` for high-level context about how the libraries relate.
- Use the published registry JSON as the executable install source.

Registry JSON:

- `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

Install command pattern:

```bash
npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json <component-name>
```

## Catalogue

### Metric Card

- Name: `metric-card`
- Category: Primitive
- Purpose: KPI and numeric status display for dashboards and operations screens.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json metric-card`
- Usage guidance: use for concise values, deltas, and icon-backed metric highlights.
- Do not use for: long narrative copy, schedules, or multi-row lists.
- Dependencies: `clsx`, `lucide-react`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/MetricCard.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Screen Frame

- Name: `screen-frame`
- Category: Primitive
- Purpose: preview container with aspect-ratio and safe-area guides for development and QA.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json screen-frame`
- Usage guidance: use in demos, previews, QA tools, and authoring workflows.
- Do not use for: the real production screen shell of a deployed signage app.
- Dependencies: none
- Source path: `libs/shadcnui-signage/src/lib/primitives/ScreenFrame.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Event Card

- Name: `event-card`
- Category: Primitive
- Purpose: event, schedule, and conference slot card with time, speaker, and location metadata.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json event-card`
- Usage guidance: use for schedule boards and venue/event programming.
- Do not use for: KPI summaries or alert-heavy fallback states.
- Dependencies: `clsx`, `lucide-react`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/EventCard.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Announcement Card

- Name: `announcement-card`
- Category: Primitive
- Purpose: headline-and-description announcement card for notices and updates.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json announcement-card`
- Usage guidance: use for announcements, alerts, and short informational messages.
- Do not use for: dense tabular content or operational lists.
- Dependencies: `clsx`, `lucide-react`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/AnnouncementCard.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Directory Card

- Name: `directory-card`
- Category: Primitive
- Purpose: wayfinding card with department, floor, room, and contact metadata.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json directory-card`
- Usage guidance: use for directory walls, office lobbies, and room-finding screens.
- Do not use for: menu boards or event timeline cards.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/DirectoryCard.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Floor Badge

- Name: `floor-badge`
- Category: Primitive
- Purpose: compact floor or zone label for wayfinding overlays.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json floor-badge`
- Usage guidance: use as supporting location metadata inside wayfinding layouts.
- Do not use for: primary page titles or large CTA states.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/FloorBadge.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Location Indicator

- Name: `location-indicator`
- Category: Primitive
- Purpose: current-location marker with pin-style iconography for maps and directories.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json location-indicator`
- Usage guidance: use as contextual location state inside wayfinding UIs.
- Do not use for: destination lists or schedule rows.
- Dependencies: `clsx`, `lucide-react`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/LocationIndicator.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Menu Item

- Name: `menu-item`
- Category: Primitive
- Purpose: menu row with name, price, and optional description.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json menu-item`
- Usage guidance: use inside restaurant, cafe, and concessions menu sections.
- Do not use for: generic ecommerce cards or schedule cards.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/MenuItem.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Menu Section

- Name: `menu-section`
- Category: Primitive
- Purpose: grouped section wrapper for menu categories.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json menu-section`
- Usage guidance: use to group related menu items with a visible heading and divider.
- Do not use for: dashboards or directory panels.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/MenuSection.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Signage Panel

- Name: `signage-panel`
- Category: Primitive
- Purpose: bordered content panel for grouped supporting information.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json signage-panel`
- Usage guidance: use for side panels, support zones, and secondary information blocks.
- Do not use for: full-screen hero messaging.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/SignagePanel.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Meeting Row

- Name: `meeting-row`
- Category: Primitive
- Purpose: agenda-style row for room booking and meeting schedules.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json meeting-row`
- Usage guidance: use in operational schedules and office lobby meeting lists.
- Do not use for: hero states or menu pricing.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/MeetingRow.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Info List

- Name: `info-list`
- Category: Primitive
- Purpose: large-format list for notices, visitor instructions, and operational notes.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json info-list`
- Usage guidance: use for short, glanceable bullet-style information.
- Do not use for: metric-heavy dashboards or event grids.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/primitives/InfoList.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Split Screen

- Name: `split-screen`
- Category: Layout
- Purpose: two-panel layout with configurable ratio and direction.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json split-screen`
- Usage guidance: use for paired content zones on known display resolutions.
- Do not use for: highly dynamic responsive webpage layouts.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/layouts/SplitScreen.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Signage Container

- Name: `signage-container`
- Category: Layout
- Purpose: full-screen container with variant styling, ambient orbs, and optional grid treatment.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json signage-container`
- Usage guidance: use as the main app-facing shell for real signage screens.
- Do not use for: preview-only framing; use `screen-frame` for that.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/layouts/SignageContainer.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Signage Header

- Name: `signage-header`
- Category: Layout
- Purpose: standard signage header with tag, title, and subtitle support.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json signage-header`
- Usage guidance: use for page-level framing and hierarchy at the top of a screen.
- Do not use for: compact card headers inside dense grids.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/layouts/SignageHeader.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Fullscreen Hero

- Name: `fullscreen-hero`
- Category: Block
- Purpose: hero section for welcome states, alerts, and dominant messages.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json fullscreen-hero`
- Usage guidance: use for main-message states where one headline dominates the screen.
- Do not use for: multi-card dashboards or dense schedules.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/blocks/FullscreenHero.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Info Card Grid

- Name: `info-card-grid`
- Category: Block
- Purpose: grid for small informational cards with values, descriptions, and meta text.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json info-card-grid`
- Usage guidance: use for grouped promotional or summary cards where each item follows the same structure.
- Do not use for: freeform card layouts with custom render requirements.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/blocks/InfoCardGrid.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Menu Board

- Name: `menu-board`
- Category: Block
- Purpose: full-screen menu shell for restaurant and daypart signage.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json menu-board`
- Usage guidance: use as the top-level shell for menu screens.
- Do not use for: generic web page layouts or office dashboards.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/blocks/MenuBoard.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Auto Paging List

- Name: `auto-paging-list`
- Category: Behaviour
- Purpose: paginate long lists without scrollbars, advancing automatically between pages.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json auto-paging-list`
- Usage guidance: use when content exceeds a fixed display area but still needs calm unattended playback.
- Do not use for: user-driven scrolling UIs.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/behaviour/AutoPagingList.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Content Rotator

- Name: `content-rotator`
- Category: Behaviour
- Purpose: rotate through children on a fixed interval with signage-safe transitions.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json content-rotator`
- Usage guidance: use for whole-state rotations such as lobby loops, promos, and announcement sequences.
- Do not use for: fine-grained animation of individual inline elements.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/behaviour/ContentRotator.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Schedule Gate

- Name: `schedule-gate`
- Category: Behaviour
- Purpose: weekday and time-window gating for daypart content.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json schedule-gate`
- Usage guidance: use to swap or hide content based on known time windows and timezones.
- Do not use for: arbitrary business rules unrelated to time/day scheduling.
- Dependencies: `clsx`, `date-fns-tz`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/behaviour/ScheduleGate.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Signage Transition

- Name: `signage-transition`
- Category: Behaviour
- Purpose: wrap a single child in signage-appropriate crossfade or slide transitions.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json signage-transition`
- Usage guidance: use for explicit content-state transitions that should respect reduced motion.
- Do not use for: continuous decorative motion.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/behaviour/SignageTransition.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Clock

- Name: `clock`
- Category: Behaviour
- Purpose: current-time display with signage-friendly update cadence.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json clock`
- Usage guidance: use for lobby, office, and status screens that need a visible clock.
- Do not use for: countdown or elapsed-time flows.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/behaviour/Clock.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Countdown

- Name: `countdown`
- Category: Behaviour
- Purpose: countdown to a target date/time with clamped zero state.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json countdown`
- Usage guidance: use for events, deadlines, and timed launches.
- Do not use for: current-time display.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/behaviour/Countdown.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Offline Fallback

- Name: `offline-fallback`
- Category: Behaviour
- Purpose: fallback boundary for unhealthy or offline content.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json offline-fallback`
- Usage guidance: use around network-backed content where a stable degraded state matters.
- Do not use for: static content with no health or connectivity state.
- Dependencies: `clsx`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/behaviour/OfflineFallback.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`

### Stale Data Indicator

- Name: `stale-data-indicator`
- Category: Behaviour
- Purpose: freshness indicator when a feed exceeds an allowed age threshold.
- Install: `npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json stale-data-indicator`
- Usage guidance: use beside live metrics, schedules, and operational feeds.
- Do not use for: primary alert messaging; pair with more visible fallback UI when the whole screen is unhealthy.
- Dependencies: `clsx`, `lucide-react`, `tailwind-merge`
- Source path: `libs/shadcnui-signage/src/lib/behaviour/StaleDataIndicator.tsx`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`
