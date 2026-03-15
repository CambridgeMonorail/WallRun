# Context-Specific Placeholder Rules

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

## Example Use Cases

### Example 1: restaurant menu board

Input:
A landscape menu board with two smaller food cards on the left and a large promotional hero area on the right.

Output:

- `menu-left-item-1-image-800x800.png`
- `menu-left-item-2-image-800x800.png`
- `menu-featured-dish-image-1920x1080.png`

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
