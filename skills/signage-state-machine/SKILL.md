---
name: signage-state-machine
description: Generate state machine patterns for digital signage screens that run 24/7 with boot, loading, content, fallback, and offline states. Use when building signage apps that must handle startup sequences, data loading, error recovery, and network loss gracefully.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.1'
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

- building interactive web apps where users control navigation and retry
- the screen has no external data dependencies and displays only static content
- the task is about layout or visual design (use other signage skills)

## Core Principle

**A signage screen must always show content. Blank screens, spinners, and error messages are failures.**

## Standard State Model

```
boot → loading → content → (refresh cycle)
                    ↓
              data-error → fallback-content
                    ↓
               offline → cached-content / static-fallback
```

### State Definitions

| State          | What the Viewer Sees                                |
| -------------- | --------------------------------------------------- |
| **Boot**       | Branded splash screen (< 3 seconds)                 |
| **Loading**    | Branded splash or last-known content                |
| **Content**    | The intended signage content                        |
| **Refreshing** | Current content (unchanged until new data is ready) |
| **Data Error** | Last-known good content or static fallback          |
| **Offline**    | Cached content or static fallback                   |
| **Idle**       | Branded idle screen or screen-off signal            |

### Critical Rules

1. **Never show a loading spinner to the public.** Use branded splash during boot, then show content.
2. **Never show an error message to the public.** Fall back to cached or static content.
3. **Never show a blank screen.** Every state must render something.
4. **Refresh data in the background.** Do not replace visible content until new data is validated.
5. **Degrade gracefully.** Stale data is better than no data. Static fallback is better than an error.

## State Transition Patterns

### Boot → Loading → Content

Initial startup sequence. Show branded splash during boot and loading, transition to content once data is available.

### Background Refresh

```
content (visible)
  └→ fetch new data (background)
       ├→ success → validate → swap content
       └→ failure → keep current content, log, retry later
```

### Recovery from Offline

```
offline
  └→ periodic connectivity check
       ├→ connected → fetch fresh data → content
       └→ still offline → keep showing cached/fallback
```

## Implementation Guidance

- **Use a single state discriminator** — discriminated union, not multiple boolean flags
- **Map every state to a visual output** — no state should render nothing
- **Cache last-known-good data** in memory and optionally localStorage
- **On boot, check for cached data** before fetching fresh
- **Validate cached data age** — stale-but-present is better than empty

See [code examples](references/examples.md) for the complete `SignageState` type, `useSignageState` reducer hook, rendering patterns, and caching utilities.

## Output Contract

When generating or reviewing a signage app, produce:

1. The state model with all states and transitions
2. What the viewer sees in each state (no blank screens, no spinners, no errors)
3. The fallback chain: live data → cached data → static fallback
4. Recovery behaviour for network restoration
5. Any states that are missing or have undefined visual output

## Evaluation Checklist

- [ ] Every state renders visible content
- [ ] No loading spinner shown to the public
- [ ] No error message shown to the public
- [ ] Background refresh does not flash or flicker visible content
- [ ] Offline state displays cached or static fallback
- [ ] Recovery from offline to online is automatic
- [ ] Boot sequence completes in under 3 seconds to first visual

## Reference Files

- [Code examples](references/examples.md) — SignageState type, useSignageState reducer hook with exhaustive action handling, rendering patterns, data caching utilities

## Constraints

- Do not use boolean flag combinations for state — use a discriminated union
- Do not show application-level errors to the viewer
- Do not assume network is available at boot time
- Do not leave any state without a visual output definition
