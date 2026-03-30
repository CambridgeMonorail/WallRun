# Menu Board Stress Cases

This page maps each stress-data file to the specific failure mode it is meant to demonstrate.

## Files And Failure Modes

### Portrait Overflow

- File: `skills/signage-menu-board/assets/menu-board-stress-data/menu-portrait-overflow.example.json`
- Main failure mode: obvious density overload
- Typical checker output: portrait overflow, long names, long descriptions, inconsistent prices

### Promo Overload

- File: `skills/signage-menu-board/assets/menu-board-stress-data/menu-promo-overload.example.json`
- Main failure mode: too many competing messages
- Typical checker output: long offer label, long QR label, too many featured items, too many legal notes

### Quiet Structural Failure

- File: `skills/signage-menu-board/assets/menu-board-stress-data/menu-quiet-structural-wrong.example.json`
- Main failure mode: weak hierarchy from fragmented categories
- Typical checker output: too many categories, too many similar category titles

### Runtime Fragility

- File: `skills/signage-menu-board/assets/menu-board-stress-data/menu-runtime-fragile.example.json`
- Main failure mode: technically valid data that breaks down under runtime conditions
- Typical checker output: unavailable featured items, missing featured images, incomplete fallback content, empty fallback image fields

## Convenience Commands

```bash
pnpm run menu-board:stress-example
pnpm run menu-board:stress-promo-example
pnpm run menu-board:stress-quiet-example
pnpm run menu-board:stress-runtime-example
```

## Related Skill Reference

See `skills/signage-menu-board/references/stress-case-guide.md` for the skill-local version of the same mapping.
