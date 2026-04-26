---
name: 'Demo App Design Compliance'
description: 'Visual style and interaction standards for the WallRun demo website'
applyTo: 'apps/client/src/**/*.{ts,tsx}'
---

# Demo App Design Compliance

## Scope

Follow `apps/client/DESIGN.md` for the WallRun demo website.

This applies to:

- landing page
- documentation shell
- navigation
- app chrome
- demo website controls
- social/SEO assets consumed by the demo app

This does not apply to:

- reusable package defaults
- generated signage/player apps
- customer signage surfaces
- `libs/shadcnui-signage` design rules

For generic shared theming, follow `libs/common-tailwind/DESIGN.md`.
For signage components, follow `libs/shadcnui-signage/DESIGN.md`.

Do not put WallRun demo branding into shared packages.

## Brand Direction

The demo app should feel like signage software:

- dark, high contrast, developer-focused
- solid purple WallRun mark
- off-white text on black/charcoal surfaces
- IBM Plex Mono for metadata, code, and technical detail
- restrained purple generative artwork for hero/social/signage previews
- thin frames and 8px radii

Avoid:

- the old cyan/pink outlined WR mark
- generic SaaS gradients
- glow on buttons or controls
- decorative motion
- app-icon notification badge treatments

## Theme Location

The demo app overrides shadcn tokens in `apps/client/src/styles.css`.

`libs/common-tailwind/src/shadcn-theme.css` is a shared base and must not be used
as the WallRun demo brand source of truth.

## Components

Use shared semantic classes where available:

- `brand-frame`
- `demo-panel`
- `demo-panel-soft`
- `generative-field`
- `brand-cta-primary`
- `brand-cta-secondary`

Prefer shared classes over long one-off arbitrary Tailwind strings.

## Buttons

- Use `brand-cta-primary` and `brand-cta-secondary` for landing CTAs.
- Prefer `variant="secondary"` for primary actions.
- Prefer `variant="outline"` or `variant="ghost"` for secondary actions.
- Do not add glow, gradients, or lift animation to controls.

Purple fill is allowed for the primary CTA, but it should remain calm.

## Drift Checklist

Before approving demo app UI changes, ask:

- Does this follow `apps/client/DESIGN.md`?
- Is this scoped to `apps/client`?
- Is the solid purple mark used?
- Are shadcn tokens overridden in the app stylesheet, not shared libs?
- Are controls quieter than the generative artwork?
- Would this still feel like software for real display systems?
