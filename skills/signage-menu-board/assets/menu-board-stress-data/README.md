# Menu Board Stress Data

This directory contains deliberately bad menu-board inputs for testing helper scripts and review workflows.

## Files

### `menu-portrait-overflow.example.json`

Use this file to test:

- portrait category overflow
- overlong item names
- overlong descriptions
- inconsistent price formatting
- overloaded service and QR labels

This file is intended to produce automated failures in `scripts/stress-test-menu-content.mjs`.

### `menu-promo-overload.example.json`

Use this file to test:

- overlong offer label
- too many featured items
- too many legal or service notes
- overlong QR label
- promo overload without category overflow

This file is intended to produce automated failures in `scripts/stress-test-menu-content.mjs` while keeping item counts under portrait capacity.

### `menu-quiet-structural-wrong.example.json`

Use this file to test:

- too many categories for one board
- too many similar category titles
- weak hierarchy caused by splitting similar offers into separate near-duplicate categories
- structurally wrong content that can look tidy at a glance but still reads poorly in signage use

This file is intended to produce automated category-structure warnings while keeping prices and individual item lengths mostly consistent.

### `menu-runtime-fragile.example.json`

Use this file to test:

- featured items missing image sources
- unavailable items still present in the active menu
- unavailable featured items
- incomplete fallback content
- empty fallback image fields
- missing usable fallback image for featured content
- data that is technically valid JSON but operationally brittle at runtime

This file is intended to produce automated runtime-fragility warnings in `scripts/stress-test-menu-content.mjs`.

### `brand-profile.example.json`

Use this file with `menu-portrait-overflow.example.json` when you want a loud, inconsistent creative direction that amplifies the density problems.

### `brand-profile-brand-inconsistency.example.json`

Use this file with `menu-promo-overload.example.json` when you want to test manual review of brand inconsistency, such as mismatched typography, conflicting colour logic, and inconsistent image direction.

This brand inconsistency is mainly for qualitative review. The current stress checker focuses on menu-content risks rather than subjective creative assessment.

### `venue-profile.example.json`

Generic stress-case venue profile used alongside the portrait-overflow scenario.

### `venue-profile-brand-mismatch.example.json`

Venue profile that pairs with the promo-overload and brand-inconsistency scenario.

### `venue-profile-quiet-structural.example.json`

Venue profile that pairs with the quiet structural failure scenario.

### `venue-profile-runtime-fragile.example.json`

Venue profile that pairs with the runtime-fragile scenario.

## Suggested Commands

```bash
pnpm run menu-board:stress-example
pnpm run menu-board:stress-promo-example
pnpm run menu-board:stress-quiet-example
pnpm run menu-board:stress-runtime-example
node skills/signage-menu-board/scripts/stress-test-menu-content.mjs --file skills/signage-menu-board/assets/menu-board-stress-data/menu-promo-overload.example.json
node skills/signage-menu-board/scripts/stress-test-menu-content.mjs --file skills/signage-menu-board/assets/menu-board-stress-data/menu-quiet-structural-wrong.example.json
node skills/signage-menu-board/scripts/stress-test-menu-content.mjs --file skills/signage-menu-board/assets/menu-board-stress-data/menu-runtime-fragile.example.json
```
