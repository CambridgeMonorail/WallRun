# Issue #53: CTABanner primitive

## Goal

Add a reusable signage footer callout primitive for help text, support instructions, and promotional banners.

## Context

- Multiple demo pages currently hand-roll large footer banners with similar spacing, typography, and glass/gradient styling.
- The component should live in `libs/shadcnui-signage/src/lib/primitives` and be exported from the package root.
- The issue requires Storybook coverage and unit tests.

## Scope

1. Add `CTABanner` primitive with variant support, optional icon, and optional action link.
2. Add Storybook stories for the supported variants.
3. Add unit tests covering rendering, variants, icon, and link behavior.
4. Refactor the demo pages that currently duplicate the footer banner pattern to use the new primitive.

## Validation

- `pnpm test:shadcnui-signage`
- `pnpm type-check:affected`

## Expected Outcome

The signage library exposes a reusable CTA banner primitive, and the demo pages consume it instead of repeated footer banner markup.