---
name: signage-data-refresh-patterns
description: Generate polling, backoff, and non-blocking data update patterns for digital signage that refreshes content without page reloads or visual disruption. Use when building signage apps that consume live data feeds, APIs, or dynamic content sources.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.0'
---

# Signage Data Refresh Patterns Skill

## Purpose

Use this skill to implement data refresh strategies that keep signage content live without disrupting the viewer experience.

Web developers rely on page reloads, loading spinners, and error boundaries. Signage screens must refresh data silently in the background, never flash, never blank, and degrade gracefully when APIs fail. This skill encodes the patterns that make continuous data updates invisible to the viewer.

## When to Use

Use this skill when you need to:

- implement periodic data polling for a signage screen
- refresh content without visible loading states
- handle API failures during background refresh
- implement retry and backoff strategies for unreliable data sources
- swap content smoothly when new data arrives

## Do Not Use When

Do not use this skill when:

- the signage screen displays only static content with no external data
- the task is about the initial boot/load sequence (use `signage-state-machine`)
- the task is about what to show when data is missing (use `signage-content-fallbacks`)

## Core Principle

**Data refresh must be invisible to the viewer. The screen should never flash, blank, or stutter during an update.**

## Refresh Strategy Rules

### Polling Intervals

| Content Type                     | Recommended Interval | Notes                          |
| -------------------------------- | -------------------- | ------------------------------ |
| Real-time data (stocks, transit) | 15–30 seconds        | Balance freshness vs. API load |
| Menu / pricing                   | 60–120 seconds       | Changes are infrequent         |
| Weather / news                   | 300–600 seconds      | Slow-changing content          |
| Promotional content              | 600–3600 seconds     | Often schedule-driven          |
| Static configuration             | On boot + hourly     | Emergency overrides            |

### Refresh Timing

- Stagger refresh intervals when multiple data sources are polled to avoid simultaneous network bursts.
- Add jitter (±10% of interval) to prevent thundering herd if multiple players poll the same API.
- Align refresh cycles with content rotation timing when possible.

## Non-Blocking Update Pattern

The viewer must never see the refresh happening.

```
Current content visible
  └→ Background fetch starts
       ├→ Success:
       │    └→ Validate new data
       │         ├→ Valid → Stage new data → Swap on next render cycle
       │         └→ Invalid → Keep current data, log warning
       └→ Failure:
            └→ Keep current data, schedule retry with backoff
```

### Key Rules

1. **Never unmount visible content to show a loading state during refresh.**
2. **Validate new data before swapping.** Bad data is worse than stale data.
3. **Stage new data in memory before rendering.** Avoid partial updates.
4. **Use transitions when swapping content.** A subtle fade or crossfade prevents jarring visual changes.

## Retry and Backoff Strategy

When a data fetch fails, use exponential backoff with a ceiling:

| Attempt    | Delay                 | Notes                                 |
| ---------- | --------------------- | ------------------------------------- |
| 1st retry  | 5 seconds             | Quick retry for transient errors      |
| 2nd retry  | 15 seconds            |                                       |
| 3rd retry  | 30 seconds            |                                       |
| 4th retry  | 60 seconds            |                                       |
| 5th+ retry | 120 seconds (ceiling) | Continue retrying at ceiling interval |

### Backoff Rules

- Reset backoff counter on successful fetch.
- Do not retry immediately on failure — even a 1-second delay prevents tight failure loops.
- Log failures with timestamps for diagnostics but do not surface errors to the viewer.
- After sustained failure (e.g., 10 minutes), transition to `signage-state-machine` offline/fallback state.

## Implementation Patterns

### Basic Polling Hook

```typescript
function useSignageData<T>(
  fetcher: () => Promise<T>,
  options: {
    interval: number; // milliseconds
    validate?: (data: T) => boolean;
    onError?: (error: unknown) => void;
  },
) {
  // Maintains current data while fetching
  // Validates before swapping
  // Implements backoff on failure
  // Never returns undefined after first successful fetch
}
```

### Data Swap Pattern

```typescript
// ✅ Good: stage and swap
const newData = await fetchData();
if (isValid(newData)) {
  setData(newData); // Single state update, no flicker
}

// ❌ Bad: clear and reload
setData(null); // Viewer sees blank/loading
const newData = await fetchData();
setData(newData); // Viewer sees content return
```

### Multi-Source Coordination

When a screen depends on multiple data sources:

- Fetch independently on offset intervals.
- Render with whatever data is available — do not wait for all sources.
- Show placeholder or last-known data for any source that is stale.
- Update each zone independently as its data arrives.

## Freshness Indicators

- Optionally display a subtle timestamp or freshness indicator (e.g., "Updated 2 min ago").
- Use this to build confidence that the screen is live, not frozen.
- Keep the indicator small and in a metadata zone — not a primary content element.

## Output Contract

When generating or reviewing data refresh patterns, produce:

1. the refresh strategy with intervals per data source
2. the non-blocking update flow (no visible loading states)
3. retry and backoff configuration
4. validation rules for incoming data
5. what happens during sustained failure (fallback transition)

## Constraints

- Do not clear visible content before new data is ready.
- Do not retry failed requests in a tight loop without backoff.
- Do not assume API availability — every fetch must have a failure path.
- Do not poll more frequently than needed — respect API rate limits and player resources.
- Do not use `window.location.reload()` as a refresh strategy.
