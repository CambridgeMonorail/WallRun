---
name: signage-content-fallbacks
description: Ensure digital signage screens always display content by implementing fallback chains for API failures, missing data, and feed outages. Use when building signage apps that depend on external data sources, and produce fallback patterns that prevent blank or broken screens.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.0'
---

# Signage Content Fallbacks Skill

## Purpose

Use this skill to ensure signage screens always have something to show, even when every external data source fails.

APIs fail. Menu feeds break. Weather services go down. Image CDNs become unreachable. In web development, you show an error page and the user retries. In signage, a broken screen is visible to the public 24/7 with no one to click "retry". This skill encodes the patterns that guarantee content is always present.

## When to Use

Use this skill when you need to:

- design fallback content for a signage screen with external data dependencies
- review whether a signage app handles data source failures gracefully
- implement static fallback content for API-dependent screens
- ensure no zone on a signage screen can ever be blank
- plan the fallback chain from live data to last resort

## Do Not Use When

Do not use this skill when:

- the screen displays only static, bundled content with no external dependencies
- the task is about data refresh timing and polling (use `signage-data-refresh-patterns`)
- the task is about the overall app state machine (use `signage-state-machine`)

## Core Principle

**Content must always exist. A signage screen with a blank zone, a missing image, or an error message is broken, even if the code ran without exceptions.**

## The Fallback Chain

Every piece of dynamic content must have a fallback chain with at least three levels:

```
1. Live data (API, feed, CMS)
   ↓ (failure)
2. Cached data (last successful fetch, stored locally)
   ↓ (unavailable or expired)
3. Static fallback (bundled with the app, always available)
   ↓ (should never reach here, but...)
4. Emergency placeholder (branded "content coming soon" or minimal branded screen)
```

### Fallback Level Definitions

| Level         | Source                                | Freshness            | Availability                    |
| ------------- | ------------------------------------- | -------------------- | ------------------------------- |
| **Live**      | API / feed / CMS                      | Real-time            | Depends on network and service  |
| **Cached**    | localStorage, IndexedDB, or in-memory | Minutes to hours old | Available if previously fetched |
| **Static**    | Bundled JSON, images, or markup       | Shipped with build   | Always available                |
| **Emergency** | Hardcoded branded placeholder         | N/A                  | Always available                |

## Content-Type Fallback Patterns

### Menu / Product Data

```
Live menu from API
  → Cached menu from last successful fetch
    → Static default menu bundled with app
      → "Menu available shortly" branded card
```

### Images

```
Live image from CDN / API
  → Cached image (if using service worker or local storage)
    → Bundled placeholder image (correct aspect ratio, branded)
      → CSS gradient or solid-colour background
```

### Weather / Transit / Live Feeds

```
Live feed data
  → Cached feed (with visible "Updated X minutes ago" indicator)
    → Generic zone content ("Weather information temporarily unavailable")
      → Hide zone entirely and redistribute space
```

### Promotional Content

```
Scheduled promotion from CMS
  → Default promotion bundled with app
    → Brand message or logo
```

## Implementation Patterns

### Component-Level Fallback

Each content zone should use a typed `ZoneContent<T>` container with `live`, `cached`, and `static` fields. A `resolveContent()` helper picks the first non-null value. See [implementation examples](references/examples.md) for the TypeScript pattern.

### Image Fallback

Wrap images in a component that renders a `fallbackSrc` on load error — never show a broken image icon. See [implementation examples](references/examples.md) for the component signature.

### Zone-Level Visibility

If a zone has no content at any fallback level, hide it and redistribute space rather than showing an empty area. See [implementation examples](references/examples.md) for the pattern.

## Static Fallback Requirements

Every signage app must ship with static fallback content:

| Content Type | Requirement                                                         |
| ------------ | ------------------------------------------------------------------- |
| Text content | Default JSON or hardcoded data covering all required fields         |
| Images       | Placeholder images at correct aspect ratio, bundled in the build    |
| Layout       | Every zone must have a rendering path that uses only bundled assets |
| Branding     | Logo, colours, and brand elements available without network         |

### Building Static Fallbacks

- Include a `fallback/` directory in the app with default content.
- Generate static fallback data at build time from a known-good snapshot.
- Test the app with network disabled to verify all fallbacks render correctly.

## Testing Fallback Behaviour

Test each level of the fallback chain:

| Test                   | Method                                                   |
| ---------------------- | -------------------------------------------------------- |
| Live data works        | Normal operation                                         |
| API failure → cached   | Block API, verify cached content displays                |
| App cold start offline | Clear cache, disable network, verify static fallback     |
| Image CDN failure      | Block image URLs, verify placeholder images              |
| Partial data failure   | Return incomplete API response, verify graceful handling |
| Sustained outage       | Run offline for 30+ minutes, verify stable display       |

## Output Contract

When reviewing or generating fallback patterns, produce:

1. the fallback chain for each content zone (live → cached → static → emergency)
2. what the viewer sees at each fallback level
3. whether static fallback content exists and is bundled with the build
4. identified gaps where a zone could be blank or broken
5. recommendations for missing fallback levels

## Example Output Format

A fallback review lists each zone's coverage at each fallback level (Live / Cached / Static / Emergency), identifies gaps where a zone could be blank, and gives concrete fix recommendations.

See [implementation examples](references/examples.md) for a complete example.

## Constraints

- Do not approve a signage app where any zone can render blank under any failure scenario.
- Do not rely on network availability for fallback content — static fallbacks must be bundled.
- Do not show error objects, stack traces, or technical messages as fallback content.
- Do not use broken image icons as an acceptable fallback — always provide a replacement.
- Do not hide data freshness — if showing stale cached data, indicate the age.

## Related Skills

- Use `signage-state-machine` to model boot/offline/error states that trigger fallback chains.
- Use `signage-placeholder-images` for consistent placeholder artwork in static fallback screens.
- Use `signage-data-refresh-patterns` for the polling and backoff logic that detects failures.
