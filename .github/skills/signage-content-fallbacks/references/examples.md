# Content Fallback Implementation Examples

TypeScript patterns for implementing the fallback chain described in [SKILL.md](../SKILL.md).

## Component-Level Fallback

Each content zone should handle its own fallbacks using a typed container:

```typescript
type ZoneContent<T> = {
  live: T | null;
  cached: T | null;
  static?: T | null; // Preferably present — bundled with app, but optional for removable zones
};

function resolveContent<T>(content: ZoneContent<T>): T | null {
  return content.live ?? content.cached ?? content.static ?? null;
}
```

## Image Fallback

A signage-safe image component that never shows a broken image icon:

```typescript
import { useEffect, useState } from 'react';

function SignageImage({
  src,
  fallbackSrc,
  alt,
  className,
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  // Reset when the upstream src or fallback changes (CMS update, content rotation)
  useEffect(() => {
    setCurrentSrc(src);
    setHasErrored(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasErrored) {
      setHasErrored(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
```

## Service Worker Caching

For offline resilience on signage hardware, register a service worker that caches API responses and images:

```typescript
// sw.ts — minimal cache-first strategy for signage
const CACHE_NAME = 'signage-v1';
const CACHED_PATHS = ['/api/menu', '/api/schedule'];

self.addEventListener('fetch', (event: FetchEvent) => {
  const url = new URL(event.request.url);
  if (!CACHED_PATHS.some((p) => url.pathname.startsWith(p))) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const response = await fetch(event.request);
        cache.put(event.request, response.clone());
        return response;
      } catch {
        const cached = await cache.match(event.request);
        return cached ?? new Response('{}', { status: 503 });
      }
    }),
  );
});
```

## Offline Testing

Verify fallback chains by testing with network disabled:

1. Load the signage app with live data, confirm content renders.
2. Disconnect network (or block API host via DevTools).
3. Confirm cached data appears with no visible disruption.
4. Wait beyond the cache TTL — confirm static fallback activates.
5. Reconnect network — confirm live data resumes automatically.

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
