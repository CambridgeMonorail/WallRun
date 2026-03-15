# Content Fallback Implementation Examples

TypeScript patterns for implementing the fallback chain described in [SKILL.md](../SKILL.md).

## Component-Level Fallback

Each content zone should handle its own fallbacks using a typed container:

```typescript
type ZoneContent<T> = {
  live: T | null;
  cached: T | null;
  static: T;           // Always present — bundled with app
};

function resolveContent<T>(content: ZoneContent<T>): T {
  return content.live ?? content.cached ?? content.static;
}
```

## Image Fallback

```typescript
function SignageImage({ src, fallbackSrc, alt }: {
  src: string;
  fallbackSrc: string;
  alt: string;
}) {
  // Renders src, falls back to fallbackSrc on error
  // Never renders a broken image icon
}
```

## Zone-Level Visibility

If a zone has no content at any fallback level, hide it and redistribute space rather than showing an empty area:

```typescript
// If the weather zone has no data at any level, expand the main content zone
const showWeatherZone = resolveContent(weatherContent) !== null;
```

## Example Review Output

When reviewing fallback coverage, produce output like this:

```
Content Fallback Review

Zone: Menu Items
• Live: ✅ API endpoint configured
• Cached: ✅ localStorage cache with 1-hour TTL
• Static: ❌ No bundled fallback menu
• Emergency: ❌ No placeholder

Zone: Hero Image
• Live: ✅ CMS image URL
• Cached: ❌ No image caching
• Static: ✅ Bundled placeholder image
• Emergency: ✅ CSS gradient background

Gaps:
• Menu zone has no static fallback — cold start offline shows blank
• Hero image has no cache layer — API failure shows placeholder immediately

Recommendations:
• Add default-menu.json to fallback/ directory
• Implement service worker or localStorage image caching for hero
```
