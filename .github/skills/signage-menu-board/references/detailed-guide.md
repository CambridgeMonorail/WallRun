# Signage Menu Board Workflow

This workflow is for building menu boards that present food or service offers clearly on large screens.

## Step 1: Classify the Menu Surface

Identify which of these the screen is closest to:

- small feature board
- multi-category board
- promo-led board
- service menu or pricing board

This determines whether the screen should emphasize imagery, categories, or pricing alignment.

## Step 2: Choose a Zone Template

Pick one of the built-in templates:

1. Feature Pair + Hero
2. Category Columns
3. Promo Strip + Core Menu

Do not mix templates unless the user clearly needs a hybrid composition.

## Step 3: Decide Hierarchy

For each repeated item, the viewer should be able to scan in this order:

1. item name
2. price
3. supporting note or short description

If imagery is present, it should support the offer rather than compete with the text.

## Step 4: Keep Content Tight

Recommended limits:

- item title: ideally 2 to 5 words
- description: 1 short line, or 2 short lines at most
- notes: short labels such as `fresh today` or `served until 14:00`

If the copy exceeds those limits, simplify or move detail out of the primary offer zone.

## Step 5: Price Layout Rules

- Keep price placement consistent within a row or card system.
- Align repeated prices vertically or horizontally.
- Use tabular alignment only when it improves scan speed.
- Avoid scattering currency or decimals in different positions.

## Step 6: Build the Data Shape

Prefer one of these patterns:

- `featuredItems` for hero-led boards
- `categories` for broader menu lists
- both only when the promo and core menu are clearly separated

Keep the content structure small and editable. Static data or local JSON is usually the right starting point.

## Step 7: BrightSign-Safe Delivery

If the menu board is for BrightSign:

- keep imagery local or conservative
- avoid expensive visual effects
- make missing content states intentional
- ensure the screen still works if one image asset fails

## Suggested Final Response Shape

- chosen template
- zones and rationale
- data shape
- price hierarchy rules applied
- implementation summary
- readability trade-offs