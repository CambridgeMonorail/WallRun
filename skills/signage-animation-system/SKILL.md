---
name: signage-animation-system
description: Generate animations suitable for large public displays. Use when designing motion for dashboards, menu boards, status screens, or information displays that run continuously, and produce animation guidance or code that is slow, legible, loop-safe, and readable from distance.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
---

# Signage Animation System Skill

## Purpose

Use this skill to design motion for digital signage screens where animation should guide attention without reducing readability or causing fatigue.

This skill exists to prevent wall-screen motion from being generated like marketing-site animation, app micro-interactions, or attention-grabbing effects that become distracting during long playback.

## When to Use

Use this skill when you need to:

- add ambient motion to a signage layout
- create transitions between content zones or states on a public display
- highlight important information without relying on user interaction
- design loop-safe motion for always-on screens
- make a static signage layout feel alive without compromising legibility

## Do Not Use When

Do not use this skill when:

- designing interaction-heavy motion for desktop or mobile apps
- building gesture-driven or game-like animation systems
- the best solution is no motion at all because the content already reads clearly

## Core Principle

**Motion on a wall should support comprehension, not compete with it.**

Optimize for calm, readable, repeatable movement that can run for long periods without becoming irritating or visually noisy.

## Motion Rules

1. Prefer slow ambient motion over rapid or frequent movement.
2. Use animation to reinforce hierarchy, freshness, or change of state.
3. Keep the number of simultaneously moving elements low.
4. Design transitions that remain readable from across the room.
5. Make loop boundaries invisible or gentle.
6. Favor continuity and stability over novelty.
7. Remove motion that does not improve comprehension.

## Attention and Pacing

- Use motion to guide the eye toward high-priority changes, not every element.
- Prefer staggered or isolated emphasis over full-screen movement.
- Keep durations long enough to read the content during the transition.
- Allow periods of stillness so the screen can settle.
- Treat animation as a secondary layer, not the main message.

## Loop and Playback Constraints

- Assume the screen may run unattended for hours or days.
- Avoid loops with visible resets, jumps, or timing drift.
- Avoid flashing, jitter, and rapid oscillation.
- Prefer deterministic loops that degrade gracefully on constrained hardware.
- Test whether the motion still feels acceptable after repeated viewing.

## Readability Constraints

- Do not animate core text in ways that reduce reading speed.
- Avoid moving large amounts of text at once unless it is essential to the format.
- Keep important information stable long enough to be scanned and understood.
- Avoid competing motion in adjacent zones.
- Respect the fact that viewers may only glance at the screen for a few seconds.

## Implementation Guidance

- Prefer simple CSS transforms and opacity changes over expensive effects.
- Avoid animation patterns that require constant layout recalculation.
- Use restrained easing and predictable timing.
- Keep motion systems simple enough to remain stable on embedded playback hardware.
- When in doubt, reduce motion rather than increasing it.

## Starter CSS Patterns

Reusable CSS animation patterns safe for continuous signage playback.

### Crossfade (content rotation)

```css
.signage-crossfade-enter {
  animation: signage-fade-in 1.5s ease-in-out forwards;
}
.signage-crossfade-exit {
  animation: signage-fade-out 1.5s ease-in-out forwards;
}
@keyframes signage-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes signage-fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}
```

### Opacity Pulse (subtle "alive" indicator)

```css
.signage-pulse {
  animation: signage-pulse 4s ease-in-out infinite;
}
@keyframes signage-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.7; }
}
```

### Background Shift (ambient motion)

```css
.signage-bg-shift {
  animation: signage-bg-shift 30s linear infinite;
  background-size: 200% 200%;
}
@keyframes signage-bg-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### GPU Layer Promotion

For any animated element on embedded hardware, promote to its own compositor layer to avoid repainting the entire screen:

```css
.signage-animated {
  will-change: opacity, transform;
  /* Remove will-change after animation completes on one-shot animations */
}
```

Use `will-change` sparingly — each promoted layer consumes GPU memory. On BrightSign HD-series players, limit to 2–3 promoted layers.

## Output Contract

When responding with guidance or code, produce:

1. the motion intent for each animated element or zone
2. recommended timing, pacing, and loop behavior
3. animation guidance or code appropriate for continuous signage playback
4. notes on what motion was intentionally avoided to protect readability and stability

## Evaluation Checklist

Before finalizing, check whether the result:

- remains readable from distance while motion is active
- avoids rapid or fatiguing motion
- can loop for extended periods without obvious seams
- uses motion to clarify rather than decorate
- is simple enough to run reliably on signage hardware

## Related Skills

- Use `signage-layout-system` to shape the screen structure and hierarchy first.
- Use `signage-performance-budget` to validate animation complexity against hardware capabilities.
- Use `signage-data-refresh-patterns` when motion reflects data freshness or live updates.
- Use `brightsign-runtime` for specific browser engine and GPU constraints on BrightSign players.