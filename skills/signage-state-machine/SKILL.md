---
name: signage-state-machine
description: Generate state machine patterns for digital signage screens that run 24/7 with boot, loading, content, fallback, and offline states. Use when building signage apps that must handle startup sequences, data loading, error recovery, and network loss gracefully.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.0'
---

# Signage State Machine Skill

## Purpose

Use this skill to model signage screens as state machines that handle real-world operational conditions.

Web developers assume network availability and user-initiated page loads. Signage screens boot unattended, load data from unreliable networks, and must display something useful at all times. This skill encodes the state patterns that keep a screen operational 24/7.

## When to Use

Use this skill when you need to:

- model the lifecycle of a signage screen from boot to content display
- handle data loading, errors, and network loss in a signage app
- design fallback and recovery flows for always-on displays
- ensure a screen never shows a blank page, spinner, or error message to the public
- implement graceful degradation when external dependencies fail

## Do Not Use When

Do not use this skill when:

- building interactive web apps where users control navigation and retry
- the screen has no external data dependencies and displays only static content
- the task is about layout or visual design (use other signage skills)

## Core Principle

**A signage screen must always show content. Blank screens, spinners, and error messages are failures.**

The screen must transition through states deterministically and recover without human intervention.

## Standard State Model

Every signage screen should implement these states:

```
boot → loading → content → (refresh cycle)
                    ↓
              data-error → fallback-content
                    ↓
               offline → cached-content / static-fallback
```

### State Definitions

| State          | Description                                          | What the Viewer Sees                                |
| -------------- | ---------------------------------------------------- | --------------------------------------------------- |
| **Boot**       | App initializing, player starting                    | Branded splash or blank (< 3 seconds)               |
| **Loading**    | First data fetch in progress                         | Branded splash or last-known content                |
| **Content**    | Live data displayed normally                         | The intended signage content                        |
| **Refreshing** | Background data refresh in progress                  | Current content (unchanged until new data is ready) |
| **Data Error** | API returned an error or bad data                    | Last-known good content or static fallback          |
| **Offline**    | Network unreachable                                  | Cached content or static fallback                   |
| **Idle**       | No content scheduled (e.g., outside operating hours) | Branded idle screen or screen-off signal            |

### Critical Rules

1. **Never show a loading spinner to the public.** Use branded splash during boot, then show content.
2. **Never show an error message to the public.** Fall back to cached or static content.
3. **Never show a blank screen.** Every state must render something.
4. **Refresh data in the background.** Do not replace visible content until new data is validated.
5. **Degrade gracefully.** Stale data is better than no data. Static fallback is better than an error.

## State Transition Patterns

### Boot → Loading → Content

```typescript
type SignageState = { status: 'boot' } | { status: 'loading' } | { status: 'content'; data: ContentData } | { status: 'refreshing'; data: ContentData } | { status: 'data-error'; lastGoodData: ContentData | null } | { status: 'offline'; cachedData: ContentData | null } | { status: 'idle' };
```

### Background Refresh Pattern

```
content (visible)
  └→ fetch new data (background)
       ├→ success → validate → swap content
       └→ failure → keep current content, log, retry later
```

### Recovery Pattern

```
offline
  └→ periodic connectivity check
       ├→ connected → fetch fresh data → content
       └→ still offline → keep showing cached/fallback
```

## Implementation Guidance

### State Container

Use a single state discriminator rather than multiple boolean flags:

```typescript
// ✅ Good: single discriminated union
const [state, setState] = useState<SignageState>({ status: 'boot' });

// ❌ Bad: multiple booleans that can conflict
const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(false);
const [isOffline, setIsOffline] = useState(false);
```

### Rendering by State

Map each state to a visual output. No state should render nothing:

```typescript
switch (state.status) {
  case 'boot':
  case 'loading':
    return <BrandedSplash />;
  case 'content':
  case 'refreshing':
    return <SignageContent data={state.data} />;
  case 'data-error':
    return state.lastGoodData
      ? <SignageContent data={state.lastGoodData} />
      : <StaticFallback />;
  case 'offline':
    return state.cachedData
      ? <SignageContent data={state.cachedData} />
      : <StaticFallback />;
  case 'idle':
    return <IdleScreen />;
}
```

### Data Caching

- Cache the last-known-good data in memory and optionally in localStorage.
- On boot, check for cached data before fetching fresh data.
- Validate cached data age — stale-but-present is better than empty.

## Output Contract

When generating or reviewing a signage app, produce:

1. the state model with all states and transitions
2. what the viewer sees in each state (no blank screens, no spinners, no errors)
3. the fallback chain: live data → cached data → static fallback
4. recovery behaviour for network restoration
5. any states that are missing or have undefined visual output

## Evaluation Checklist

Before finalizing, verify:

- [ ] Every state renders visible content
- [ ] No loading spinner is shown to the public
- [ ] No error message is shown to the public
- [ ] Background refresh does not flash or flicker visible content
- [ ] Offline state displays cached or static fallback
- [ ] Recovery from offline to online is automatic
- [ ] Boot sequence completes in under 3 seconds to first visual

## Constraints

- Do not use boolean flag combinations for state — use a discriminated union.
- Do not show application-level errors to the viewer.
- Do not assume network is available at boot time.
- Do not leave any state without a visual output definition.
