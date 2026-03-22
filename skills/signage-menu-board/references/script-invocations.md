# Script Invocations

Use these exact commands when working with the menu-board helper scripts from the repository root.

## Generate A Starter Seed Pack

```bash
node skills/signage-menu-board/scripts/generate-menu-seed.mjs --output-dir tmp/menu-board-seed --name "Signal & Salt" --concept "Fast casual lunch bar with premium flatbreads and grain bowls." --modes breakfast,lunch,dinner
```

This writes venue, brand, and menu JSON files into `tmp/menu-board-seed/`.

For convenience, the workspace also exposes this as:

```bash
pnpm run menu-board:seed-example
```

## Stress Test A Known Bad Menu

```bash
node skills/signage-menu-board/scripts/stress-test-menu-content.mjs --file skills/signage-menu-board/assets/menu-board-stress-data/menu-portrait-overflow.example.json
```

This should report several issues, including portrait overflow, long names, long descriptions, and inconsistent price formats.

For convenience, the workspace also exposes this as:

```bash
pnpm run menu-board:stress-example
```

## Stress Test A Promo-Overload Menu Without Category Overflow

```bash
node skills/signage-menu-board/scripts/stress-test-menu-content.mjs --file skills/signage-menu-board/assets/menu-board-stress-data/menu-promo-overload.example.json
```

This should report issues such as an overlong offer label, too many featured items, too many legal notes, and an overlong QR label, while keeping category counts under portrait capacity.

For convenience, the workspace also exposes this as:

```bash
pnpm run menu-board:stress-promo-example
```

## Stress Test A Quiet Structural Failure Menu

```bash
node skills/signage-menu-board/scripts/stress-test-menu-content.mjs --file skills/signage-menu-board/assets/menu-board-stress-data/menu-quiet-structural-wrong.example.json
```

This should report structural issues such as too many categories and too many similar category titles even though the prices are consistently formatted and the item names look superficially reasonable.

For convenience, the workspace also exposes this as:

```bash
pnpm run menu-board:stress-quiet-example
```

## Stress Test A Runtime-Fragile Menu

```bash
node skills/signage-menu-board/scripts/stress-test-menu-content.mjs --file skills/signage-menu-board/assets/menu-board-stress-data/menu-runtime-fragile.example.json
```

This should report missing featured-item images, unavailable featured items, too many unavailable items, and incomplete fallback content.

For convenience, the workspace also exposes this as:

```bash
pnpm run menu-board:stress-runtime-example
```

## Generate An Image Prompt Pack

```bash
node skills/signage-menu-board/scripts/generate-image-prompt-pack.mjs --venue skills/signage-menu-board/assets/menu-board-seed-data/venue-profile.example.json --brand skills/signage-menu-board/assets/menu-board-seed-data/brand-profile.example.json --menu skills/signage-menu-board/assets/menu-board-seed-data/menu-lunch.example.json --output tmp/menu-board-seed/prompt-pack-lunch.md
```

This writes a markdown prompt pack that can be used for first-pass logo and imagery planning.

To regenerate the example file in docs, run:

```bash
node skills/signage-menu-board/scripts/generate-image-prompt-pack.mjs --venue skills/signage-menu-board/assets/menu-board-seed-data/venue-profile.example.json --brand skills/signage-menu-board/assets/menu-board-seed-data/brand-profile.example.json --menu skills/signage-menu-board/assets/menu-board-seed-data/menu-lunch.example.json --output docs/guides/menu-board-prompt-pack.generated.md
```
