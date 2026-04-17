---
name: signage-menu-board
description: Build food and service menu-board systems for large displays using clear templates, price hierarchy rules, structured inputs, and screen planning. Use when creating restaurant, cafe, concessions, or service signage where menu items and prices must read clearly from distance.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '2.0'
---

# Signage Menu Board Skill

## Purpose

Use this skill to design menu-board signage as a small screen system rather than a single overloaded layout.

This skill exists because menu boards have different hierarchy needs from generic signage. Prices, offer grouping, product imagery, service notes, and mode changes need a predictable system rather than a generic card grid.

## When to Use

Use this skill when you need to:

- build a restaurant or cafe menu board
- create a concessions or quick-service pricing board
- design a service board with named offers and prices
- transform a wireframe into a signage-ready menu composition
- define a believable venue and brand before building a menu-board screen
- plan a multi-screen or multi-mode menu-board set

## Do Not Use When

Do not use this skill when:

- the screen is not fundamentally menu- or price-driven
- the primary content is operational status, dashboards, or wayfinding
- the layout is a web ordering UI with heavy interaction
- the task is only to polish an already-finalised menu without revisiting structure

## Core Principle

**The viewer should identify what is sold, what it costs, and what is featured within seconds.**

Treat menu boards as glanceable retail signage, not document pages.

## Required Inputs

Confirm or invent these before doing detailed layout work:

1. venue profile: name, concept, cuisine, service model, price position
2. brand profile: palette, typography direction, image style, tone
3. menu mode assumptions: breakfast, lunch, dinner, all-day, drinks, seasonal
4. screen context: landscape or portrait, number of screens, static or rotating
5. service and compliance needs: allergens, ordering notes, opening hours, QR prompt
6. runtime assumptions: static assets only or dynamic data with fallbacks

If several of these are missing, define them first instead of jumping into templates.

## Workflow Summary

Follow this order unless the inputs are already settled:

1. **Define venue** — produce a concise venue profile that makes the menu believable.
2. **Define brand system** — produce a small brand profile that guides typography, colour, imagery, and price styling.
3. **Model menu data** — produce structured categories, items, prices, tags, and mode assumptions.
4. **Plan screen inventory** — decide whether the result is one screen or a small set of related screens.
5. **Choose templates** — assign a template to each screen and state why.
6. **Check capacity and legibility** — simplify before shrinking text or density.
7. **Plan assets** — define logo direction, image needs, and placeholder strategy.
8. **Produce implementation guidance** — define components, data shape, runtime notes, and exclusions.
9. **Validate** — check readability, consistency, and failure cases before final output.

See the reference files for detailed examples and expanded guidance.

## Core Templates

Choose one of these templates and state it:

### 1. Feature Pair + Hero

Best for a small number of featured items.

- left: one or two featured menu cards
- right top: brand or category label
- right center: hero image or offer panel
- right bottom: service detail, phone, hours, or CTA

### 2. Category Columns

Best for broader menus with several items per category.

- top: brand and category band
- center: two to four columns by category
- bottom: service notes, allergens, or ordering detail

### 3. Promo Strip + Core Menu

Best when one promoted item must dominate without hiding the core menu.

- top or side: promo zone
- main field: compact category list
- footer: service and compliance notes

## Portrait Variants

When the display is portrait (9:16), adapt the landscape templates:

### Portrait: Feature Pair + Hero

- top: brand or category label
- center: hero image or offer panel (full width)
- bottom: one or two featured menu cards stacked vertically

### Portrait: Category Columns

- top: brand and category band
- center: single column of categories, stacked vertically
- bottom: service notes, allergens, or ordering detail

For two or fewer categories, stack them. For three or more, use two narrow columns.

### Portrait: Promo Strip + Core Menu

- top: promo zone (full width, landscape-cropped image)
- center: compact category list (single column)
- footer: service and compliance notes

Portrait is less forgiving than landscape. Reduce item count sooner.

## Capacity Guidelines

- **Maximum items per category:** 8–12 for landscape, 6–8 for portrait.
- If a category exceeds the limit, split it or paginate with timed rotation.
- More items per screen reduces legibility — see `signage-distance-legibility` for minimum text sizes.

## Price Hierarchy Rules

1. Price is usually the second-most important visual element after the item name.
2. Keep the price close to the item it belongs to.
3. Use a consistent price position within repeated item blocks.
4. Avoid decorative price treatments that reduce legibility.
5. Use stronger weight or scale for price only when it helps scan speed.
6. If multiple prices appear in one area, align them predictably.

## Data Guidance

Prefer small, explicit data structures over freeform copy blobs.

At minimum, define:

- categories
- items
- prices
- tags or notes if needed
- featured items only when they are visually separated from the core list

See the references and seed JSON examples for fuller shapes.

## Layout Constraints

- Keep menu item titles short and scannable.
- Avoid dense paragraph descriptions.
- Prefer one to three lines of supporting copy.
- Use imagery only when it reinforces the item hierarchy.
- Keep legal or service notes out of the primary focal area.

## Embedded Signage Hardware Considerations

When the target is embedded signage hardware (e.g., BrightSign, ChromeOS kiosk, Raspberry Pi):

- prefer local or static image assets
- avoid carousels unless explicitly requested
- keep motion minimal and loop-safe
- ensure empty or missing-image states still look intentional

## Output Contract

Produce, in order:

1. venue profile
2. brand profile
3. menu data shape
4. screen inventory
5. chosen template per screen
6. zone breakdown and hierarchy
7. price treatment rules used
8. asset brief or placeholder plan
9. UI component or implementation plan
10. runtime and fallback notes
11. exclusions made to protect readability

Do not skip directly to code unless the venue, brand, and data assumptions are already clear.

## Evaluation Checklist

Before finalizing, check whether the result:

- makes item names and prices easy to find quickly
- uses a predictable repeated structure
- avoids document-style density
- preserves strong spacing and alignment
- would still work on a busy wall-mounted screen

## Failure Conditions

Stop and simplify if:

- too many categories are being forced onto one screen
- portrait density is drifting toward landscape density
- price formatting is inconsistent
- brand tone and imagery clash
- multiple promos compete for attention
- the design only works by shrinking text too far
- one screen is being asked to carry content that should be split into a set

## Reference Files

- [Detailed workflow and examples](references/detailed-guide.md) — end-to-end flow, worked example, portrait example, simplification pattern
- [Venue and brand guide](references/venue-and-brand.md) — venue profile and brand-system decisions before layout
- [Screen-system planning](references/screen-system-planning.md) — screen inventory, template choice, mode planning, exclusions
- [Runtime and QA guide](references/runtime-and-qa.md) — fallbacks, stress cases, review checklist
- `assets/menu-board-seed-data/` — example venue, brand, and menu JSON files
- `assets/menu-board-stress-data/` — deliberately bad content for testing portrait overflow, promo overload, quieter structural failures, and runtime-fragile data
- [Stress case guide](references/stress-case-guide.md) — maps each stress file to its intended end-to-end failure mode and review workflow
- `assets/menu-board-stress-data/README.md` — explains what each stress-case file is meant to test and which issues are automated versus manual review
- `assets/prompt-templates/food-image-prompts.md` — reusable prompt structure for hero, featured-item, and category-supporting imagery
- `assets/prompt-templates/logo-direction-prompts.md` — reusable prompt structure for venue wordmark and logo direction briefs
- `scripts/generate-menu-seed.mjs` — generate a starter venue, brand, and menu JSON pack
- `scripts/stress-test-menu-content.mjs` — detect long names, inconsistent prices, category overflow, and promo-overload signals before layout work
- `scripts/generate-image-prompt-pack.mjs` — turn venue, brand, and menu JSON into a prompt pack for imagery planning
- [Script invocations](references/script-invocations.md) — exact example commands for the helper scripts

## Related Skills

- Use `brightsign-signage-build` when the menu board must also be packaged and verified as a BrightSign app.
- Use `signage-distance-legibility` for minimum text sizes — especially price and item name sizing.
- Use `signage-safe-layout` to ensure menu content respects safe margins on unknown displays.
- Use `signage-content-fallbacks` when menu data comes from an API that may fail.

## Constraints

- Do not treat menu boards like dashboards or marketing landing pages.
- Do not rely on dense descriptions to explain the offer.
- Do not force all categories into one composition if the screen set should be split.
- Do not use promotional imagery that fights the item and price hierarchy.
