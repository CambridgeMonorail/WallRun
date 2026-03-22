# Stress Case Guide

Use this guide to pick the right bad input for the failure mode you want to demonstrate end to end.

## Portrait Overflow

File:

- `assets/menu-board-stress-data/menu-portrait-overflow.example.json`

What it demonstrates:

- category overflow in portrait
- overlong names and descriptions
- inconsistent prices
- obvious density failure before implementation

Use when:

- you want the stress checker to fail loudly
- you want a clear example of content that obviously needs splitting or simplification

## Promo Overload

File:

- `assets/menu-board-stress-data/menu-promo-overload.example.json`

What it demonstrates:

- overlong offer labels
- overlong QR labels
- too many featured items
- too many legal or service notes
- message overload without category overflow

Use when:

- the board structure is technically compact enough
- the real problem is too many competing messages and priorities

## Quiet Structural Failure

File:

- `assets/menu-board-stress-data/menu-quiet-structural-wrong.example.json`

What it demonstrates:

- too many categories for one board
- several near-duplicate category groups
- weak hierarchy with superficially tidy content

Use when:

- the board looks calm at first glance
- the failure is in the information architecture rather than noisy copy or broken prices

## Runtime Fragility

File:

- `assets/menu-board-stress-data/menu-runtime-fragile.example.json`

What it demonstrates:

- unavailable items still present in active content
- unavailable featured items
- featured items missing image sources
- incomplete fallback content
- empty fallback image fields
- no usable fallback image for featured content

Use when:

- the JSON is technically valid
- the main risk is operational behaviour after deployment rather than visible content density alone

## Suggested Commands

```bash
pnpm run menu-board:stress-example
pnpm run menu-board:stress-promo-example
pnpm run menu-board:stress-quiet-example
pnpm run menu-board:stress-runtime-example
```
