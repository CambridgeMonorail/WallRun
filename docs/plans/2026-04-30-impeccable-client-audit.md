# Impeccable Client Audit

**Date:** 2026-04-30
**Status:** Complete

## Goal

Try Impeccable against `apps/client` to identify useful design polish
opportunities without letting it override WallRun's app-scoped design contract.

## Context

WallRun now has scoped design authority:

- `apps/client/DESIGN.md` for the demo app brand
- `docs/design/STYLE_GUIDE.md` for expanded demo-site rationale
- `libs/common-tailwind/DESIGN.md` for shared signage-safe defaults
- `libs/shadcnui-signage/DESIGN.md` for reusable signage components

Impeccable should be used as a reviewer and critique aid, not as a replacement
source of truth.

## Task Breakdown

- [x] Run an Impeccable audit against `apps/client`.
- [x] Review findings for compatibility with the WallRun demo design contract.
- [x] Apply only scoped, low-risk improvements.
- [x] Run focused validation.

## Completion Notes

Impeccable reported nine anti-patterns in signage demo pages:

- generic purple/cyan gradient surfaces
- decorative gradient text on large signage headings
- pure `bg-black/20` translucent panels

Applied only small, scoped cleanups in `apps/client/src/app/pages/signage`.
The follow-up Impeccable run reported no remaining anti-patterns.

## Files To Change

Unknown until findings are reviewed. Expected scope is `apps/client/**` and
possibly demo-only landing components consumed by `apps/client`.

## Commands To Run

- `npx impeccable detect apps/client/src`
- `pnpm run type-check:client`

## Expected Result

A small, reviewable branch with either documented findings or targeted
improvements that make the demo site feel more polished while preserving the
current branding and avoiding shared signage theme drift.
