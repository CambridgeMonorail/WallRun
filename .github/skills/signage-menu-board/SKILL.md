---
name: signage-menu-board
description: Build food and service menu boards for large displays using clear zone templates, price hierarchy rules, and common content shapes. Use when creating restaurant, cafe, concessions, or service signage where menu items and prices must read clearly from distance.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
---

# Signage Menu Board Skill

## Purpose

Use this skill to create menu-board signage that is readable at distance, visually ordered, and structured for food or service offerings.

This skill exists because menu boards have different hierarchy needs from generic signage. Prices, offer grouping, product imagery, and service details need a predictable layout system rather than general dashboard patterns.

## When to Use

Use this skill when you need to:

- build a restaurant or cafe menu board
- create a concessions or quick-service pricing board
- design a service board with named offers and prices
- transform a wireframe into a signage-ready menu composition

## Do Not Use When

Do not use this skill when:

- the screen is not fundamentally menu- or price-driven
- the primary content is operational status, dashboards, or wayfinding
- the layout is a web ordering UI with heavy interaction

## Core Principle

**The viewer should identify the offer, the category, and the price within seconds.**

Treat menu boards as glanceable retail signage, not document pages.

## Recommended Zone Templates

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

## Price Hierarchy Rules

1. Price is usually the second-most important visual element after the item name.
2. Keep the price close to the item it belongs to.
3. Use a consistent price position within repeated item blocks.
4. Avoid decorative price treatments that reduce legibility.
5. Use stronger weight or scale for price only when it helps scan speed.
6. If multiple prices appear in one area, align them predictably.

## Menu Content Shapes

Prefer small, explicit data shapes.

### Featured Item Shape

```ts
type FeaturedMenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  note?: string;
  imageLabel?: string;
  imageSrc?: string;
  accentTone?: 'warm' | 'fresh' | 'neutral';
};
```

### Category Menu Shape

```ts
type MenuCategory = {
  id: string;
  title: string;
  items: Array<{
    id: string;
    name: string;
    description?: string;
    price: string;
    tags?: string[];
  }>;
};
```

### Board-Level Shape

```ts
type MenuBoardContent = {
  brandName: string;
  offerLabel?: string;
  categories?: MenuCategory[];
  featuredItems?: FeaturedMenuItem[];
  contact?: {
    phoneNumber?: string;
    hours?: string;
  };
};
```

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

Produce:

1. the selected menu-board template
2. the zone breakdown and visual hierarchy
3. price treatment rules used in the design
4. a recommended data shape or React UI code
5. notes on what was excluded to protect readability

## Evaluation Checklist

Before finalizing, check whether the result:

- makes item names and prices easy to find quickly
- uses a predictable repeated structure
- avoids document-style density
- preserves strong spacing and alignment
- would still work on a busy wall-mounted screen

## Related Files

- See `references/detailed-guide.md` for menu-board-specific implementation guidance.
- Use `brightsign-signage-build` when the menu board must also be packaged and verified as a BrightSign app.