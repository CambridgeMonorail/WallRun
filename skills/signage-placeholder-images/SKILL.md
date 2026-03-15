---
name: signage-placeholder-images
description: Generate consistent placeholder image plans with naming, sizing, labels, alt text, and replacement notes for digital signage layouts. Use when building signage screens before final artwork is available.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.1'
---

# Signage Placeholder Images

This skill helps generate deterministic, developer-friendly placeholder image references for digital signage applications.

## When to Use

Use this skill when:

- a signage screen includes one or more image zones
- real creative assets do not yet exist
- the developer needs sensible placeholder file names or URLs
- a React component needs temporary image references
- a layout needs image dimensions inferred from context
- a prototype needs to communicate intended content to stakeholders

## Do Not Use When

- final brand-approved imagery already exists
- the task is to generate polished production artwork
- the screen is entirely typographic and has no image zones
- the user explicitly asks for a real illustration rather than a placeholder

## Primary Goal

For each image zone in a signage layout, produce:

1. a sensible placeholder purpose
2. appropriate dimensions
3. a clear file name
4. placeholder label text
5. alt text
6. a short developer note describing the intended final asset

## Core Principles

1. **Prefer deterministic over clever** — use predictable naming and sizing, not decorative concepts.
2. **Design for signage, not the web** — large-format display, distance viewing, clear hierarchy, safe aspect ratios.
3. **Be explicit about purpose** — labels like `BACKGROUND HERO FOOD IMAGE`, not `IMAGE` or `PHOTO`.
4. **Keep labels short and legible** — concise uppercase phrases visible in large mock-ups.
5. **Favour consistency** — same naming rules, size rules, and label conventions throughout the project.

## Standard Placeholder Types

| Type               | Examples                                                              |
| ------------------ | --------------------------------------------------------------------- |
| Hero               | `HERO IMAGE`, `BACKGROUND HERO FOOD IMAGE`, `SEASONAL CAMPAIGN IMAGE` |
| Supporting content | `PROMO IMAGE`, `LIFESTYLE IMAGE`, `SUPPORTING PRODUCT IMAGE`          |
| Menu board         | `FOOD IMAGE HERE`, `DRINK IMAGE HERE`, `MENU ITEM IMAGE`              |
| Brand              | `BRAND LOGO HERE`, `PARTNER LOGO HERE`                                |
| UI/demo            | `SCREENSHOT HERE`, `APP PREVIEW IMAGE`, `DASHBOARD PREVIEW`           |

## Standard Dimensions

### Full-screen signage

| Format       | Dimensions |
| ------------ | ---------- |
| Landscape HD | 1920×1080  |
| Portrait HD  | 1080×1920  |
| Landscape 4K | 3840×2160  |
| Portrait 4K  | 2160×3840  |

### Common image zones

| Zone                   | Dimensions            |
| ---------------------- | --------------------- |
| Hero landscape         | 1920×1080             |
| Hero portrait          | 1080×1920             |
| Wide promo panel       | 1600×900              |
| Half-screen promo      | 960×1080              |
| Square menu tile       | 800×800               |
| Portrait product card  | 900×1200              |
| Landscape product card | 1200×675              |
| Featured dish panel    | 1200×1200 or 1600×900 |

Match placeholder dimensions to the intended rendered area when the layout is a zone inside a larger screen.

## File Naming Rules

Use kebab case: `[screen-or-section]-[zone-purpose]-[dimensions].[ext]`

Examples:

- `home-hero-food-image-1920x1080.png`
- `menu-featured-dish-image-1200x1200.png`
- `breakfast-promo-image-1600x900.png`
- `brand-logo-placeholder-800x400.png`

Include screen/section, zone purpose, and dimensions. Add a stable slot key for repeated zones when each placeholder should be distinct.

## Placeholder Label Rules

Use uppercase, short phrases:

- `HERO FOOD IMAGE`
- `MENU ITEM IMAGE`
- `BRAND LOGO HERE`

Avoid vague one-word labels, lorem ipsum, jokey labels, or overly long phrases.

## Alt Text Rules

Describe the role of the placeholder, not imaginary final imagery:

- Good: `Placeholder for hero food image`
- Bad: `Delicious fish and chips on a plate`

## Developer Note Rules

Include a short note explaining the intended final asset:

- `Replace with approved hero image for fish and chips campaign`
- `Replace with square food photography for menu item`

## Output Format

Return image placeholder planning in this structure:

```markdown
### Placeholder assets

1. **Hero image**
   - Purpose: Background hero food image
   - Dimensions: 1920x1080
   - File name: `home-hero-food-image-1920x1080.png`
   - Label: `BACKGROUND HERO FOOD IMAGE`
   - Alt text: `Placeholder for background hero food image`
   - Note: Replace with approved hero photography for the featured dish
```

If writing code, also insert the placeholder reference directly into the component.

## Workflow

1. Inspect the layout or component structure
2. Identify all image zones
3. Infer each zone's purpose
4. Assign sensible placeholder dimensions
5. Generate consistent file names
6. Generate label text, alt text, and replacement notes
7. Insert or suggest code references where appropriate

If the user only asks for one image placeholder, do not overproduce a full asset plan. If the screen has no image zones, say so plainly.

## Reference Files

- [Visual styles and code examples](references/visual-styles-and-code.md) — solid colour blocks, labelled SVG, placeholder service URLs, strategy comparison table, React integration patterns
- [Context rules and examples](references/context-rules-and-examples.md) — menu boards, promo screens, multi-zone, kiosk naming rules, worked examples

## Tone and Style

Keep outputs practical, calm, and implementation-focused. Prefer British English in explanatory text. Do not over-explain or treat placeholders like final creative.

## Success Criteria

- Developers can quickly scaffold signage layouts without waiting for final artwork
- Placeholder file names are predictable
- Dimensions are sensible
- Alt text is honest
- Labels clearly communicate intended content to reviewers
