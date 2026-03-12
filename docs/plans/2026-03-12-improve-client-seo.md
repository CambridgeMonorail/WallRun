# Improve Client SEO

## Goal

Improve discoverability and indexability for the client demo by adding crawl infrastructure, route-level metadata, structured data, and clean public URLs suitable for search engines.

## Context

The current client app is a SPA served from GitHub Pages with one shared HTML shell. It has baseline social metadata and Google verification, but it is missing route-level metadata, robots and sitemap files, structured data, and clean route URLs. The app also currently uses hash-based routing, which limits how well search engines can index distinct pages.

## Tasks

### 1. Add route-level SEO metadata management

- Files to change:
  - `apps/client/src/app/app.tsx`
  - `apps/client/src/app/constants/navigationConfig.ts`
  - new SEO helper/component files under `apps/client/src/app/`
- Expected result:
  - Key public routes set their own title, description, canonical URL, social tags, and structured data.
- Acceptance criteria:
  - Home, getting started, tooling, library, gallery, and component index have distinct metadata.
  - Not found route is marked `noindex`.

### 2. Move the client app to clean URLs on GitHub Pages

- Files to change:
  - `apps/client/src/main.tsx`
  - `apps/client/index.html`
  - `apps/client/public/404.html`
- Expected result:
  - The deployed site can use browser-history URLs with a GitHub Pages fallback.
- Acceptance criteria:
  - Router uses a basename-aware browser router.
  - Direct navigation remains recoverable through the fallback page.

### 3. Add static crawl assets

- Files to change:
  - `apps/client/public/robots.txt`
  - `apps/client/public/sitemap.xml`
  - `apps/client/index.html`
- Expected result:
  - Search engines can discover the sitemap and understand the preferred canonical host.
- Acceptance criteria:
  - Sitemap lists the primary public routes.
  - `robots.txt` points to the sitemap.

### 4. Validate the affected client code

- Commands to run:
  - file diagnostics for changed files
  - targeted unit tests for the SEO helper logic
- Expected result:
  - No client diagnostics regressions introduced by the SEO work.

## Risks And Assumptions

- GitHub Pages does not provide native SPA fallback, so the router migration depends on the 404 redirect pattern.
- Search engines will benefit immediately from crawl files and clean URLs, but full static prerendering is still a later enhancement.

## Verification

- Confirm key routes produce distinct title and canonical metadata.
- Confirm `robots.txt`, `sitemap.xml`, and `404.html` are present in the client public output inputs.
- Run targeted tests and diagnostics for the changed files.