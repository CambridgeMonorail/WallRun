# Placeholder Visual Styles and Code Examples

## Placeholder Visual Style Guidance

During development, placeholder images need to be *visible* in the layout so developers can verify sizing, spacing, and zone hierarchy. Use one of these strategies, listed from simplest to most polished:

### 1. Solid colour blocks (simplest)

Use a Tailwind `bg-*` utility with centred label text. No external files needed.

```tsx
<div className="flex h-full w-full items-center justify-center bg-muted">
  <span className="text-2xl font-semibold tracking-wide text-muted-foreground">
    HERO FOOD IMAGE
  </span>
</div>
```

Best for: early prototyping, layout scaffolding, component tests.

### 2. Labelled SVG placeholders (recommended default)

Generate a simple inline SVG with dimensions, label, and a subtle crosshatch or diagonal-line pattern so it is clearly a placeholder at a glance.

```tsx
<svg
  viewBox="0 0 1920 1080"
  className="h-full w-full"
  role="img"
  aria-label="Placeholder for background hero food image"
>
  <rect width="100%" height="100%" fill="#e5e7eb" />
  <line x1="0" y1="0" x2="100%" y2="100%" stroke="#d1d5db" strokeWidth="2" />
  <line x1="100%" y1="0" x2="0" y2="100%" stroke="#d1d5db" strokeWidth="2" />
  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
    fill="#6b7280" fontSize="48" fontFamily="system-ui">
    HERO FOOD IMAGE · 1920×1080
  </text>
</svg>
```

Best for: design reviews, stakeholder demos, Storybook stories.

### 3. Placeholder service URLs (external dependency)

Use a deterministic URL service when you need a raster image file. Example patterns:

```
https://placehold.co/1920x1080/e5e7eb/6b7280?text=HERO+FOOD+IMAGE
https://placehold.co/800x800/e5e7eb/6b7280?text=MENU+ITEM
```

Best for: integration tests that require real image URLs, quick demos that cannot use inline SVG.

> **Caution:** External placeholder services are a network dependency. Do not rely on them for BrightSign-targeted builds or offline scenarios. Prefer inline SVG or bundled static files for anything that runs on a player.

### Choosing a strategy

| Context | Recommended strategy |
|---|---|
| Component unit tests | Solid colour block (no external deps) |
| Storybook stories | Labelled SVG |
| Design review / stakeholder demo | Labelled SVG |
| Integration tests needing `<img>` src | Static file in `public/placeholders/` or placeholder service |
| BrightSign player builds | Static file in `public/placeholders/` (never external URL) |

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
