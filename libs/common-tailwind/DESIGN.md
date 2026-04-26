---
name: WallRun Common Tailwind Design
scope:
  include:
    - libs/common-tailwind/**
    - shared theme tokens consumed by signage/player apps
  exclude:
    - apps/client demo website branding
    - customer-specific signage themes
    - app-specific marketing surfaces
colors:
  background: "#1C1E21"
  foreground: "#E6E6E6"
  mutedForeground: "#A0A4A8"
  structuralAccent: "#6E7681"
fonts:
  sans: "Inter, system-ui, sans-serif"
  heading: "Inter, system-ui, sans-serif"
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace"
---

# WallRun Common Tailwind Design

This is the design contract for the shared `common-tailwind` package.

`common-tailwind` is a generic foundation for WallRun apps and libraries. It is
allowed to be consumed by digital signage player apps, signage component
libraries, Storybook, and the demo website. Because of that, it must never carry
the demo website's app-specific branding.

The demo website brand contract lives in `apps/client/DESIGN.md`.

## Intent

The shared theme should be signage-safe by default:

- high contrast
- dark-mode first
- predictable fixed-format surfaces
- legible typography at distance
- restrained neutral tokens
- no product-specific mark, colour, or marketing style

It should not look like a web landing page. It should not impose WallRun demo
branding on signage projects.

## Colour

Shared colours are neutral and operational.

- Use dark backgrounds by default.
- Keep foreground contrast high.
- Treat muted text as still readable from distance.
- Use accent colours structurally, not decoratively.
- Do not introduce the WallRun demo purple as a shared global default.
- Do not use gradients, glow, or brand-specific colour systems in the shared
  theme.

App-specific or customer-specific signage themes may override these tokens at
the app layer.

## Typography

Shared font defaults should optimise for readability.

- Use Inter/system sans for body and headings.
- Do not use decorative or condensed heading faces as shared defaults.
- Use mono fonts only for code, timestamps, diagnostics, or compact technical
  labels.
- Signage apps should size type according to viewing distance, not web page
  hierarchy.

## Signage Heuristics

Anything generic should support digital signage constraints:

- known resolutions and aspect ratios
- explicit safe areas and overscan margins
- large readable type
- stable layout with no unexpected reflow
- clear hierarchy from across a room
- controlled motion that loops safely
- offline and stale-data states that remain legible
- no hover-dependent interactions for public-display content

## Relationship To Apps

- `apps/client` may override these tokens for the demo website.
- signage player apps may override these tokens for venue/customer branding.
- shared libraries should consume tokens and avoid app-specific hard-coded
  colours.
- generic utilities should not assume mouse, scroll, or close viewing distance.

## Review Checklist

Before changing `common-tailwind`, ask:

- Would this still work on a 1080p or 4K signage screen viewed from distance?
- Does this avoid demo website branding?
- Does this preserve high contrast?
- Does this avoid web-only assumptions such as hover-first behaviour?
- Can app-specific themes override this cleanly?
