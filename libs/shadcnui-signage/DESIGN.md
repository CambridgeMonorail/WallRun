---
name: WallRun Signage Component Design
scope:
  include:
    - libs/shadcnui-signage/**
    - signage player app surfaces
  exclude:
    - apps/client demo website chrome
    - marketing pages
    - mouse-driven admin UI
---

# WallRun Signage Component Design

This is the design contract for reusable digital signage UI.

Signage components are not web app components scaled up. They are fixed-format
display surfaces designed for known resolutions, viewing distance, unattended
runtime, and constrained hardware.

## Core Principles

- Distance readability beats visual density.
- Fixed composition beats responsive webpage flow.
- Stable layout beats interactive affordance.
- Explicit safe areas beat edge-to-edge assumptions.
- Operational states must remain legible.
- Motion must be loop-safe and restrained.

## Layout

- Design for known screen sizes and aspect ratios.
- Use fixed-format containers such as `ScreenFrame` and `SignageContainer`.
- Preserve safe areas for overscan, bezels, and installation variance.
- Avoid hover-only interactions.
- Avoid scroll as a primary content strategy.
- Clamp text and page long lists instead of allowing overflow.

## Typography

- Size type for viewing distance, not desktop density.
- Prefer clear sans-serif typefaces.
- Use large headings, strong hierarchy, and tabular numerals for data.
- Keep line lengths short.
- Avoid small muted text for essential information.

## Colour And Contrast

- Use high-contrast foreground/background pairs.
- Treat muted text carefully; it must still be readable from distance.
- Use colour to encode state only when paired with text or iconography.
- Avoid low-contrast decorative layers behind text.

## Motion

- Use motion to transition content, not to decorate.
- Prefer fade/crossfade and simple directional transitions.
- Keep loops smooth and predictable.
- Respect reduced motion.
- Avoid bounce, spring, rapid flashing, or attention-fatiguing effects.

## Data And Runtime States

Always design for:

- loading
- stale data
- offline fallback
- empty schedules or lists
- oversized content
- clock/timezone clarity
- long-running unattended operation

## Relationship To Demo App

`apps/client/DESIGN.md` does not apply here except when signage components are
being displayed inside demo website chrome. The signage component itself should
follow this file and `libs/common-tailwind/DESIGN.md`.
