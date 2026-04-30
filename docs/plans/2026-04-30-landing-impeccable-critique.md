# Landing Impeccable Critique

**Date:** 2026-04-30
**Status:** Complete

## Goal

Use the Impeccable critique workflow to assess whether the landing page
communicates WallRun's repository value clearly, compellingly, and in a visual
direction that matches the new demo app brand.

## Context

The landing page now looks much stronger, but the critique should test whether
the first viewport and page flow clearly explain why a developer should care
about WallRun:

- signage-specific React components
- BrightSign packaging and deployment
- player discovery and git-safe player configuration
- fixed-aspect, distance-readable display systems
- not a CMS, not slideware

## Task Breakdown

- [x] Inspect the live landing page at `http://localhost:4200/`.
- [x] Run Impeccable detection against landing-related source.
- [x] Compare landing copy against repository value proposition.
- [x] Apply a small critique-driven improvement pass if clear.
- [x] Run focused validation.

## Completion Notes

Impeccable's deterministic detector returned no landing anti-patterns. The
human critique found that the hero looked strong but undersold the concrete repo
value. The landing copy now names the practical reasons to use WallRun earlier:

- signage-specific React components
- fixed-aspect screen layouts
- BrightSign packaging and deployment
- player discovery and git-safe configuration

The first viewport now communicates both the brand idea and the developer
workflow more directly.

## Files To Change

- `apps/client/src/app/pages/landing/Landing.tsx`
- possibly landing component files under `libs/landing/src/lib/components`

## Commands To Run

- `npx impeccable --json apps/client/src/app/pages/landing libs/landing/src/lib/components`
- `pnpm run type-check:client`

## Expected Result

A clearer landing page that preserves the new visual language while making the
repo's practical value obvious faster.
