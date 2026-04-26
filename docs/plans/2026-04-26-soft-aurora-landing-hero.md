# Soft Aurora Landing Hero

**Date:** 2026-04-26
**Status:** Complete

## Goal

Make the landing hero feel more visually alive in the first viewport while
staying aligned with the new WallRun demo app brand.

## Context

The current landing hero has strong copy and improved brand assets, but the
large black grid field reads too empty at desktop sizes. The user referenced a
soft aurora-style background as a good fit for the purple generative branding.

## Task Breakdown

- [x] Add a local CSS-only aurora treatment behind the hero content.
- [x] Keep the treatment scoped to the demo landing hero, not common signage
      theming.
- [x] Respect reduced-motion preferences.
- [x] Slightly increase hero visual presence without changing routing or copy.
- [x] Run focused type-check validation.

## Files To Change

- `libs/landing/src/lib/components/hero-section/index.tsx`
- `apps/client/src/styles.css`

## Commands To Run

- `pnpm run type-check:client`

## Expected Result

The first viewport should feel more like the brand guide: dark, generative,
purple-led, and screen-oriented, with the hero content still readable and the
controls still using restrained token-based styling.
