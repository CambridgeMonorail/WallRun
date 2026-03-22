# Food Image Prompt Templates

Use these templates to keep menu-board imagery consistent across hero panels, featured dishes, and supporting category images.

## Prompt Rules

- keep camera angle consistent across a screen set
- keep lighting consistent across all food images
- avoid text baked into imagery
- avoid cluttered props or surreal garnish
- keep the background neutral or brand-aligned
- prefer plated food over packaging unless the venue concept requires packaging

## Hero Image Template

```text
High-quality food photography for digital menu signage.
Venue: {{venue_name}}.
Concept: {{venue_concept}}.
Dish or offer: {{dish_name}}.
Tone: {{brand_tone}}.
Palette cues: {{palette_notes}}.
Shot type: hero image, clean composition, strong focal dish, studio-lit or soft daylight, high contrast, consistent angle, no text, no hands, no visible brand labels unless requested, background aligned with {{surface_style}}.
```

## Featured Item Template

```text
Realistic plated food photography for a featured menu-board item.
Venue: {{venue_name}}.
Dish: {{dish_name}}.
Cuisine: {{cuisine_type}}.
Visual tone: {{brand_tone}}.
Camera angle: {{camera_angle}}.
Lighting: {{lighting_style}}.
Composition: single hero dish, clean plate presentation, minimal props, no text, no hands, high legibility for signage use.
```

## Category-Supporting Template

```text
Supporting food image for digital menu signage.
Venue: {{venue_name}}.
Category: {{category_name}}.
Representative dish: {{dish_name}}.
Style: consistent with the rest of the image set, simplified composition, high contrast, signage-friendly framing, no text, no packaging unless requested, no crowded table scene.
```

## Prompt Pack Output Format

```markdown
## Image prompt pack

### Hero image

- Purpose: Breakfast feature panel
- Prompt: ...

### Featured items

1. Smoked Bacon Bap: ...
2. Brown Crab Roll: ...

### Supporting category image

- Coffee and Pastry: ...
```
