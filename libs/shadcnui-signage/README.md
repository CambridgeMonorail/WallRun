# shadcnui-signage

`@tsa/shadcnui-signage` is WallRun's React component library for building full-screen digital signage.

It is designed for screens that live on walls, run for long periods, and need to communicate clearly from a distance. Instead of treating signage like a responsive web page, this library treats it like a fixed-format software surface with explicit layout, readable typography, predictable timing, and operational safeguards.

## What It Is

This library provides signage-specific primitives, layouts, blocks, and behaviours for building screens such as:

- welcome screens
- menu boards
- announcements boards
- schedules and event listings
- KPI dashboards
- lobby and status displays

The goal is not to reproduce a generic app component library. The goal is to give you the building blocks for software that is meant to be seen across a room on known hardware.

## What It Gives You

Out of the box, this library gives you:

- fixed-aspect layout primitives for known screen sizes
- distance-readable content patterns for headings, metrics, and structured information
- full-screen composition blocks for common signage use cases
- timing and rotation behaviours for always-on displays
- scheduling, offline, and stale-data utilities for operational screens
- a shared model for building predictable, deterministic signage UIs

## Why It Is Valuable

Most web UI libraries assume fluid layouts, close viewing distance, and user-driven interaction. Signage has different constraints.

This library is useful because it is built around those constraints from the start:

- screens have known resolutions and fixed aspect ratios
- content must be readable quickly and from distance
- layouts must remain stable over long runtimes
- motion must be controlled and loop-safe
- data-driven screens need clear handling for freshness, paging, scheduling, and connectivity

In short, this library helps you build signage as software rather than approximating signage with generic web components.

## Relationship to the Rest of WallRun

This library builds on WallRun's broader component foundations:

- **`@tsa/shadcnui`** for base shadcn/ui components
- **`@tsa/shadcnui-blocks`** for more general UI compositions
- **`common-tailwind`** for shared Tailwind v4 configuration and theme tokens

`@tsa/shadcnui-signage` adds the signage-specific layer: full-screen composition, fixed-format layout, timing logic, and operational UI patterns.

## Component Categories

### Primitives

Core building blocks for signage content:

- **ScreenFrame** - Preview container enforcing fixed resolutions and aspect ratios with optional safe area guides
- **MetricCard** - Display KPIs and metrics with values, change indicators, and icons
- **EventCard** - Event information with time, title, speaker, location, and track
- **AnnouncementCard** - Announcement cards with glass morphism effects

### Layouts

Container components for structuring signage content:

- **SplitScreen** - Two-panel layout with configurable ratio and direction
- **SignageContainer** - Full-screen container with gradient backgrounds and ambient orb effects (8 color variants)
- **SignageHeader** - Standard signage header with optional tag badge, title, and subtitle

### Blocks

Higher-level composed components for complete content sections:

- **FullscreenHero** - Hero section for welcome screens and main messages (light/dark variants)
- **InfoCardGrid** - Grid layout for displaying informational cards with icons and descriptions

### Behaviours

Components that add timing logic, transitions, gating, and operational behaviour:

- **Clock** - Displays current time with configurable format and timezone (minute-aligned updates)
- **Countdown** - Counts down to a target date/time with configurable format
- **ContentRotator** - Cycles through children at fixed intervals with transitions (fade/slide)
- **AutoPagingList** - Renders long lists as pages with automatic advancement
- **ScheduleGate** - Conditionally renders content based on weekday and time windows
- **StaleDataIndicator** - Visual indicator for data freshness with configurable thresholds
- **SignageTransition** - Declarative transitions (none, crossfade, slide-left, slide-up) for content changes
- **OfflineFallback** - Gracefully handles offline state with configurable UI

## Key Capabilities

### Time-Based Logic

- **useTicker** - Drift-resistant ticker hook for timed rerenders (second/minute alignment)
- Native `Intl.DateTimeFormat` API for timezone-aware formatting
- `date-fns-tz` integration for complex timezone scheduling
- Minute-aligned updates for clock components (efficient battery usage)

### Transitions and Motion

- **SignageTransition** - Declarative transition effects (none, crossfade, slide-left, slide-up)
- Automatic `prefers-reduced-motion` detection via `usePrefersReducedMotion` hook
- Configurable durations with sensible defaults

### Data Freshness

- **StaleDataIndicator** - Visual feedback when data age exceeds thresholds
- Configurable warning (yellow) and stale (red) durations
- Useful for API-driven content with known update frequencies

### Offline Support

- **OfflineFallback** - Graceful degradation when network is unavailable
- Built-in connectivity detection managed internally by OfflineFallback
- Configurable fallback UI with message and retry actions

## Core Concepts

### Resolution

Components are designed for specific target resolutions:

- `1080p`: 1920 × 1080 (landscape)
- `4k`: 3840 × 2160 (landscape)
- `portrait-1080p`: 1080 × 1920 (portrait)

### Safe Area

Optional overlay for previewing content margins and safe zones during development and QA.

### Text Clamping

Ensures text never overflows by limiting to a maximum number of lines, maintaining layout predictability.

### Deterministic Layouts

All layout components use fixed sizing and explicit aspect ratios. There are no responsive breakpoints here because signage knows its screen size at build time.

## Installation

This library is part of WallRun monorepo. Import components using the workspace path:

```typescript
import { ScreenFrame, SplitScreen, FullscreenHero, InfoCardGrid } from '@tsa/shadcnui-signage';
```

If you are exploring the public demo, this is the library behind the signage examples and the component documentation pages.

## Usage Examples

### Basic Clock Display

```typescript
import { Clock } from '@tsa/shadcnui-signage';

export function Header() {
  return <Clock format="HH:mm" className="text-6xl tabular-nums" />;
}
```

### Content Rotation

```typescript
import { ContentRotator } from '@tsa/shadcnui-signage';

export function AnnouncementRotator() {
  return (
    <ContentRotator intervalMs={10_000} transition="fade">
      <Announcement1 />
      <Announcement2 />
      <Announcement3 />
    </ContentRotator>
  );
}
```

### Schedule-Based Content

```typescript
import { ScheduleGate } from '@tsa/shadcnui-signage';

export function BreakfastMenu() {
  return (
    <ScheduleGate
      windows={[
        { days: ['mon', 'tue', 'wed', 'thu', 'fri'], start: '06:00', end: '11:00' }
      ]}
      fallback={<LunchMenu />}
    >
      <MenuGrid items={breakfastItems} />
    </ScheduleGate>
  );
}
```

### Full-Screen Hero

```typescript
import { FullscreenHero, SignageContainer } from '@tsa/shadcnui-signage';

export function WelcomeScreen() {
  return (
    <SignageContainer variant="midnight">
      <FullscreenHero
        title="Welcome to Our Office"
        subtitle="Check in at the front desk"
        variant="dark"
      />
    </SignageContainer>
  );
}
```

### Auto-Paging List

```typescript
import { AutoPagingList } from '@tsa/shadcnui-signage';

export function EventSchedule({ events }) {
  return (
    <AutoPagingList
      items={events}
      itemsPerPage={8}
      pageDwellMs={15_000}
      renderItem={(event) => <EventCard {...event} />}
    />
  );
}
```

## Typical Build Pattern

A common way to use this library is:

1. Start with `SignageContainer` or `ScreenFrame` to establish the display surface.
2. Use layout components like `SplitScreen` and `SignageHeader` to define structure.
3. Fill the screen with primitives and blocks such as `MetricCard`, `EventCard`, `FullscreenHero`, or `InfoCardGrid`.
4. Add operational behaviours like `ContentRotator`, `AutoPagingList`, `ScheduleGate`, `OfflineFallback`, or `StaleDataIndicator` where needed.

That gives you a screen that is visually legible, structurally stable, and better suited to unattended operation.

## Testing

Run unit tests for this library:

```bash
pnpm test:shadcnui-signage
```

Run with coverage:

```bash
pnpm test:shadcnui-signage --coverage
```

## Development

Build the library:

```bash
pnpm build:shadcnui-signage
```

Type check:

```bash
pnpm type-check:shadcnui-signage
```

Lint:

```bash
pnpm lint:shadcnui-signage
```

## Storybook

All components include Storybook stories for interactive documentation. View them in the main Storybook instance:

```bash
pnpm storybook
```

## License

See LICENSE file in repository root.
