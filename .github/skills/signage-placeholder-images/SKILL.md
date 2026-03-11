---
name: signage-placeholder-images
description: Use this skill when building or editing digital signage apps that need consistent placeholder image planning, naming, sizing and insertion before final artwork is available.
---

# Signage Placeholder Images

This skill helps generate deterministic, developer-friendly placeholder image references for digital signage applications.

Use it when creating or updating:

- full-screen signage layouts
- menu boards
- promotional screens
- multi-zone displays
- kiosk screens
- portrait posters
- branded signage components
- demo and prototype layouts awaiting final creative assets

This skill does not generate final artwork.

Its purpose is to help the developer move quickly by choosing the right placeholder dimensions, labels, file names, alt text, and replacement notes so layouts can be built properly before real assets arrive.

---

## When to Use

Use this skill when:

- a signage screen includes one or more image zones
- real creative assets do not yet exist
- the developer needs sensible placeholder file names or URLs
- a React component needs temporary image references
- a layout needs image dimensions inferred from context
- placeholder labels need to be clear and consistent
- a prototype needs to communicate intended content to stakeholders

Do not use this skill when:

- final brand-approved imagery already exists
- the task is to generate polished production artwork
- the screen is entirely typographic and has no image zones
- the user explicitly asks for a real illustration rather than a placeholder

---

## Primary Goal

For each image zone in a signage layout, produce:

1. a sensible placeholder purpose
2. appropriate dimensions
3. a clear file name
4. placeholder label text
5. alt text
6. a short developer note describing the intended final asset

---

## Core Principles

### 1. Prefer deterministic over clever

Use predictable placeholder naming and sizing.
Do not invent decorative image concepts unless asked.

### 2. Design for signage, not the web

Placeholders should reflect the needs of digital signage:

- large-format display
- distance viewing
- clear hierarchy
- screen zones
- safe aspect ratios
- obvious replacement intent

### 3. Be explicit about purpose

A placeholder should tell the developer and reviewer what belongs there.

Good:

- `BACKGROUND HERO FOOD IMAGE`
- `PROMO PRODUCT IMAGE`
- `BRAND LOGO HERE`

Bad:

- `IMAGE`
- `PHOTO`
- `TEMP`

### 4. Keep labels short and legible

Assume placeholders may appear in large visible mock-ups.
Use concise, readable labels in uppercase unless the design context clearly suggests otherwise.

### 5. Favour consistency across the codebase

Use the same naming rules, size rules, and label conventions throughout the project.

---

## Standard Placeholder Types

Use these placeholder purposes where relevant.

### Hero placeholders

For the dominant visual area of a screen.

Examples:

- `HERO IMAGE`
- `BACKGROUND HERO FOOD IMAGE`
- `HERO PRODUCT IMAGE`
- `SEASONAL CAMPAIGN IMAGE`

### Supporting content placeholders

For secondary promotional or informational visuals.

Examples:

- `PROMO IMAGE`
- `LIFESTYLE IMAGE`
- `SUPPORTING PRODUCT IMAGE`

### Menu board placeholders

For food and drink item imagery.

Examples:

- `FOOD IMAGE HERE`
- `DRINK IMAGE HERE`
- `MENU ITEM IMAGE`
- `BACKGROUND HERO FOOD IMAGE`

### Brand placeholders

For logos and visual identity assets.

Examples:

- `BRAND LOGO HERE`
- `PARTNER LOGO HERE`

### UI/demo placeholders

For prototypes and component demos.

Examples:

- `SCREENSHOT HERE`
- `APP PREVIEW IMAGE`
- `DASHBOARD PREVIEW`

---

## Standard Dimensions

Use these defaults unless the layout clearly indicates something more appropriate.

### Full-screen signage

- Landscape HD: `1920x1080`
- Portrait HD: `1080x1920`
- Landscape 4K: `3840x2160`
- Portrait 4K: `2160x3840`

### Common signage image zones

- Hero landscape: `1920x1080`
- Hero portrait: `1080x1920`
- Wide promo panel: `1600x900`
- Half-screen promo: `960x1080`
- Square menu tile: `800x800`
- Portrait product card: `900x1200`
- Landscape product card: `1200x675`
- Logo lockup area: size based on container, usually exported with transparent background later

### Menu board guidance

For menu boards, use:

- item cards: `800x800`
- featured dish panel: `1200x1200` or `1600x900` depending on layout
- full background food hero: `1920x1080`

If the layout is clearly a zone inside a larger screen, match the placeholder dimensions to the intended rendered area as closely as practical.

---

## Placeholder Label Rules

Use placeholder text that clearly describes the image purpose.

### Preferred label format

Use uppercase, short phrases, for example:

- `HERO FOOD IMAGE`
- `BACKGROUND HERO FOOD IMAGE`
- `MENU ITEM IMAGE`
- `PROMO IMAGE`
- `BRAND LOGO HERE`
- `LIFESTYLE IMAGE HERE`

### Avoid

- vague one-word labels
- lorem ipsum in image zones
- jokey labels in production-oriented code
- overly long phrases that would wrap awkwardly

---

## File Naming Rules

Use kebab case.

Structure:

```text
[screen-or-section]-[zone-purpose]-[dimensions].[ext]
```

Examples:

```text
home-hero-food-image-1920x1080.png
menu-featured-dish-image-1200x1200.png
menu-item-fish-and-chips-800x800.png
breakfast-promo-image-1600x900.png
brand-logo-placeholder-800x400.png
kiosk-product-card-image-900x1200.png
```

### Naming guidance

- include the screen or section where useful
- include the zone purpose
- include dimensions
- use `placeholder` in the name only when the context is ambiguous
- prefer names that can later be replaced with real assets predictably

---

## Alt Text Rules

Placeholder alt text should describe the role of the placeholder, not pretend the final asset exists.

Good:

- `Placeholder for hero food image`
- `Placeholder for featured menu item image`
- `Placeholder for brand logo`
- `Placeholder for promotional lifestyle image`

Bad:

- `Delicious fish and chips on a plate`
- `Fresh seasonal burger with chips`

Do not describe imaginary final imagery as if it were already real.

---

## Developer Note Rules

For each placeholder, include a short note that explains what the real asset should eventually be.

Examples:

- `Replace with approved hero image for fish and chips campaign`
- `Replace with final product cutout from brand team`
- `Replace with square food photography for menu item`
- `Replace with partner logo in transparent PNG or SVG`

Keep these notes practical and implementation-focused.

---

## Output Format

When using this skill, return image placeholder planning in a structured way.

Preferred format:

```markdown
### Placeholder assets

1. **Hero image**
   - Purpose: Background hero food image
   - Dimensions: 1920x1080
   - File name: `home-hero-food-image-1920x1080.png`
   - Label: `BACKGROUND HERO FOOD IMAGE`
   - Alt text: `Placeholder for background hero food image`
   - Note: Replace with approved hero photography for the featured dish

2. **Menu item card**
   - Purpose: Menu item image
   - Dimensions: 800x800
   - File name: `menu-item-image-800x800.png`
   - Label: `FOOD IMAGE HERE`
   - Alt text: `Placeholder for menu item image`
   - Note: Replace with square menu photography
```

If writing code, also insert the placeholder reference directly into the component.

---

## Code Integration Guidance

When editing React signage components:

- use the planned placeholder asset path consistently
- keep placeholder usage obvious and easy to search for later
- where helpful, add a short code comment indicating intended replacement

Example:

```tsx
<img
  src="/placeholders/menu/home-hero-food-image-1920x1080.png"
  alt="Placeholder for background hero food image"
  className="h-full w-full object-cover"
/>
```

Optional comment:

```tsx
{/* Replace with approved campaign hero image */}
```

Do not add unnecessary comments if the file naming already makes the intent obvious.

---

## Signage-Specific Reasoning Rules

When deciding placeholder sizes and purposes:

### Menu boards

- prioritise food item imagery and featured offers
- keep supporting card placeholders consistent in shape
- use square placeholders for item tiles unless the layout clearly indicates otherwise
- use one larger featured placeholder for hero offer zones

### Promo screens

- prioritise hero image, campaign image, product image, and logo placement
- use large landscape placeholders for dominant campaign visuals

### Multi-zone displays

- identify each zone first
- assign placeholders by role, not simply by position
- keep naming tied to purpose, such as `weather-panel-image` only if an image truly belongs there

### Kiosks

- use product-oriented naming
- prefer more granular placeholder naming because kiosk screens often reuse components

---

## Behaviour Rules for Copilot

When this skill is invoked:

1. inspect the layout or component structure
2. identify all image zones
3. infer each zone's purpose
4. assign sensible placeholder dimensions
5. generate consistent file names
6. generate label text for placeholder artwork
7. generate realistic placeholder alt text
8. provide replacement notes
9. insert or suggest code references where appropriate

If the user only asks for one image placeholder, do not overproduce a full asset plan.

If the screen clearly has no image zones, say so plainly and do not invent any.

---

## Preferred Placeholder Labels by Context

### Food and beverage

- `FOOD IMAGE HERE`
- `DRINK IMAGE HERE`
- `BACKGROUND HERO FOOD IMAGE`
- `FEATURED DISH IMAGE`

### Retail

- `PRODUCT IMAGE HERE`
- `PROMO PRODUCT IMAGE`
- `LIFESTYLE IMAGE HERE`

### Corporate signage

- `BRAND IMAGE HERE`
- `OFFICE IMAGE HERE`
- `TEAM PHOTO HERE`

### Software demo signage

- `APP SCREENSHOT HERE`
- `DASHBOARD PREVIEW`
- `UI IMAGE HERE`

---

## Example Use Cases

### Example 1: restaurant menu board

Input:
A landscape menu board with two smaller food cards on the left and a large promotional hero area on the right.

Output:

- `menu-item-image-800x800.png`
- `menu-item-image-800x800.png`
- `featured-hero-food-image-1920x1080.png`

Labels:

- `FOOD IMAGE HERE`
- `FOOD IMAGE HERE`
- `BACKGROUND HERO FOOD IMAGE`

### Example 2: retail promo screen

Input:
A full-screen promotional layout with a large product visual, brand logo, and smaller supporting lifestyle panel.

Output:

- `promo-product-image-1600x900.png`
- `brand-logo-placeholder-800x400.png`
- `supporting-lifestyle-image-1200x675.png`

### Example 3: portrait kiosk

Input:
A portrait screen with a top hero image, product card carousel, and footer brand mark.

Output:

- `kiosk-hero-image-1080x900.png`
- `kiosk-product-card-image-900x1200.png`
- `brand-logo-placeholder-600x240.png`

---

## Tone and Style

Keep outputs practical, calm, and implementation-focused.

Do not:

- over-explain
- invent unnecessary design fiction
- treat placeholders like final creative
- use American spellings unless they are required by code or existing project conventions

Prefer British English in explanatory text.

---

## Success Criteria

This skill is successful when:

- developers can quickly scaffold signage layouts without waiting for final artwork
- placeholder file names are predictable
- dimensions are sensible
- alt text is honest
- replacement intent is obvious
- the resulting codebase is easier to update once final assets arrive