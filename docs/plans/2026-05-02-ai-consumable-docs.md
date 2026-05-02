# AI-Consumable Docs Plan

## Goal

Improve the public WallRun site so AI tools can discover, fetch, and interpret the main documentation and component entry points more reliably.

## Initial Hypothesis

The current public docs surface sends mixed signals about the canonical component entry point.

- The app exposes both `/library` and `/components`
- the sitemap includes both routes
- the home page and getting-started flows prefer `/library`
- there is no curated AI-oriented documentation index such as `/llms.txt`

That combination is likely enough to confuse fetch-based tools even before route-hosting quirks are considered.

## Cheap Discriminating Checks

- confirm whether route config, SEO metadata, and sitemap agree on canonical component and docs entry points
- confirm whether static public files currently expose any machine-readable AI index beyond `robots.txt` and `sitemap.xml`
- confirm whether likely AI entry routes can be fetched as stable HTML without relying on sidebar discovery

## Scope

Start with the public docs entry surface rather than broad content rewrites:

- canonical docs and component URLs
- route alias or redirect strategy for `/components` and `/library`
- AI-oriented public metadata files in `apps/client/public`
- any minimal discoverability links needed from the main docs surfaces

## Proposed First Slice

1. Audit route config, SEO entries, sitemap, and public docs copy for conflicting canonical paths.
2. Add a minimal machine-readable index for AI consumers if the audit supports it.
3. Align canonical links and public references around the intended component/docs entry points.
4. Validate with direct fetches and browser navigation for the highest-value routes.

## Validation

- verify the intended canonical routes render locally
- verify static public files are emitted for AI/fetch consumers
- verify `robots.txt`, `sitemap.xml`, and any new AI index point to the correct public URLs
- run a narrow affected validation for `apps/client`

## Expected Result

WallRun exposes one clearer public documentation surface for both humans and AI tools, with a fetchable index that reduces ambiguity about where component docs, setup docs, Storybook, registry installs, and repo resources live.
