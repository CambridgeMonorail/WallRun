---
name: WallRun Demo App Design
scope:
  include:
    - apps/client/**
  exclude:
    - libs/shadcnui-signage/**
    - generated signage/player apps
    - reusable package defaults unless rendered inside apps/client
colors:
  black: "#080B0E"
  charcoal: "#17171A"
  offWhite: "#F5F5F7"
  purple: "#885CF6"
  cyan: "#22D3EE"
  lavender: "#A78BFA"
  pink: "#F472B6"
  green: "#34D399"
  amber: "#FBBF24"
fonts:
  display: "Satoshi, Inter, system-ui, sans-serif"
  body: "Inter, system-ui, sans-serif"
  mono: "IBM Plex Mono, ui-monospace, monospace"
---

# WallRun Demo App Design

This file is the app-scoped design contract for the WallRun demo website in
`apps/client`.

It applies only to the demo website, its documentation shell, landing page,
navigation, UI controls, social assets, and demo chrome. It must not be applied
globally to reusable libraries, signage player apps, generated customer signage,
or unrelated packages unless those surfaces are being rendered as part of the
demo website.

Generic shared packages and signage libraries follow their own design contracts:

- `libs/common-tailwind/DESIGN.md`
- `libs/shadcnui-signage/DESIGN.md`

The longer human-readable style guide lives at
`docs/design/STYLE_GUIDE.md`. If there is a conflict, this app-local
`DESIGN.md` wins for `apps/client`.

## Product Feel

WallRun is digital signage as software. The demo site should feel like a
developer tool for real display systems: dark, precise, technical, and visually
alive only where the screen medium calls for it.

Use this direction:

- dark high-contrast surfaces
- solid purple WallRun mark
- off-white typography
- IBM Plex Mono for metadata, code, dimensions, and detail
- restrained generative purple artwork
- thin frames and 8px radii
- software/product confidence, not marketing gloss

Avoid:

- the old cyan/pink outlined WR mark
- generic SaaS gradients
- large cyan or magenta surfaces
- glow on buttons or controls
- glossy sci-fi wallpaper
- app badge or notification-bubble logo treatments
- applying this brand theme outside `apps/client`

## Logo

Use `apps/client/src/assets/images/wallrun-mark.svg` for compact brand marks.

Rules:

- Use the solid purple mark.
- Use wordmark text only where there is enough room.
- Do not use `new-logo.svg` on the demo website unless explicitly comparing
  legacy artwork.
- Do not wrap the logo in a colourful app icon.

## Colour

Core colours:

- Black: `#080B0E`
- Charcoal: `#17171A`
- Off white: `#F5F5F7`
- Purple: `#885CF6`

Accent colours:

- Cyan: `#22D3EE`
- Lavender: `#A78BFA`
- Pink: `#F472B6`
- Green: `#34D399`
- Amber: `#FBBF24`

Use purple as the primary brand signal. Use the accent colours only for data,
small UI details, charts, or generative artwork.

The app-level shadcn variables are defined in `apps/client/src/styles.css`.
Do not put demo-app branding into `libs/common-tailwind`; that package is a
shared base.

## Typography

- Display: Satoshi if available, with Inter fallback.
- Body/UI: Inter.
- Code/detail: IBM Plex Mono.

Rules:

- No negative tracking.
- Large headings use normal letter spacing.
- Mono detail may use small uppercase tracking.
- Avoid heavy weights inside cards and controls.

## Surfaces

Use shared semantic classes from `apps/client/src/styles.css`:

- `demo-panel`
- `demo-panel-soft`
- `brand-frame`
- `generative-field`

Surface rules:

- radius at or below 8px
- thin borders
- restrained structural shadow only
- no nested cards
- no decorative orbs or bokeh backgrounds

## Buttons

Use shared CTA classes:

- `brand-cta-primary`
- `brand-cta-secondary`

Rules:

- Primary CTAs may use purple fill.
- Buttons and controls must not glow.
- No gradients on controls.
- Prefer `variant="secondary"` for primary actions and `variant="outline"` or
  `variant="ghost"` for secondary actions.
- Use `variant="default"` sparingly and only with a shared visual class.

## Generative Artwork

Generative art is allowed for hero previews, social cards, and signage showcase
surfaces.

Allowed:

- purple particle fields
- code/data fragments
- thin wave or orbital lines
- subtle grids

Avoid:

- lens flares
- busy neon streaks
- generic cyber backgrounds
- making text unreadable

## Review Checklist

Before merging demo-app UI changes, check:

- Does this stay inside `apps/client` scope?
- Is the solid purple WallRun mark used?
- Are shadcn tokens overridden in `apps/client/src/styles.css`, not shared libs?
- Are CTA/control styles shared instead of one-off?
- Is glow limited to artwork, not controls?
- Does the page still feel like signage software rather than a generic landing page?
