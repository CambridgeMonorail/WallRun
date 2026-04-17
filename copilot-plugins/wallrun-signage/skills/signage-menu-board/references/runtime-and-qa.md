# Runtime and QA Guide

Menu boards are signage software. Plan for operational realism, not just a pretty mock-up.

## Runtime Assumptions

Document:

- target hardware or playback environment
- whether content is static or data-driven
- how mode changes happen
- what happens if an image is missing
- what happens if an item becomes unavailable

## Runtime Rules

- prefer static or local assets unless live data is necessary
- keep motion subtle and loop-safe
- avoid carousels unless the use case genuinely requires them
- make missing-image states look intentional
- keep the board useful if one data field is absent

## Stress Cases

Check at least these cases:

1. long item names
2. unusually wide prices
3. unavailable items
4. missing hero image
5. portrait layout with one extra category added
6. promo removed while the core list remains

## QA Checklist

- item names scan faster than descriptions
- prices remain visually attached to their items
- repeated blocks align predictably
- imagery style is consistent across the board
- footer content does not steal prime focus
- the board still works when one asset is missing
- the board still reads clearly on a busy wall

## Failure Patterns

Common failures:

- document-style density
- mixed photography styles
- inconsistent price formats
- promo overload
- portrait screens carrying landscape density
- runtime dependencies without a fallback plan

When several of these appear, simplify the content or split the screen system before implementation.
