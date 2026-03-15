---
name: brightsign-package
description: Build and package React apps for BrightSign OS 9.x players with autorun.brs bootstrap, IIFE bundles, and optimised Vite configuration. Use when creating deployment-ready packages for BrightSign hardware.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.1"
  internal: true
---

# BrightSign Package Skill

Package React applications for deployment to BrightSign OS 9.x digital signage players.

## When to Use This Skill

Use this skill when you need to:

- create a BrightSign-ready package from a React app build
- generate the autorun.brs bootstrap file for HTML widgets
- optimise Vite configuration for embedded device constraints
- reduce bundle size for resource-limited players
- structure files correctly for BrightSign SD card deployment

## Do Not Use When

- deploying to a player (use `brightsign-deploy-local` or `brightsign-fleet-deploy`)
- debugging a player issue (use `brightsign-debug`)
- designing a signage layout (use signage layout/animation skills)

## Package Structure

A properly packaged BrightSign app. This example reflects the **current** build output for `apps/player-minimal` in this repo:

```
brightsign-package/
├── autorun.brs          # Bootstrap script (REQUIRED)
├── index.html           # Entry point HTML
├── assets/
│   ├── app.js           # Single IIFE bundle (all code + vendor)
│   └── app.css          # Styles
└── manifest.json        # Optional: Version metadata
```

The exact filenames and chunking strategy are **app-specific**. The `apps/player-minimal` build uses fixed filenames (`app.js`, `app.css`) with `inlineDynamicImports: true` to produce a single bundle. Other apps may be configured to emit hashed filenames (e.g. `index-[hash].js`) or split vendor code into a separate chunk. Always check the actual Vite build output for the specific app.

## Workflow

### Step 1: Generate autorun.brs

The bootstrap script launches your React app in fullscreen Chromium on OS 9.x. See [code examples](references/examples.md) for the complete template and OS 8.x vs 9.x differences.

Critical requirements:

- URL must be `file:///sd:/index.html` (lowercase `sd:`, triple slash)
- `javascript_enabled: true` required for React
- Dynamic resolution via `roVideoMode`

### Step 2: Configure Vite for BrightSign

Three critical build requirements:

1. **IIFE format** — ES modules fail on `file://` protocol (no MIME types)
2. **Strip `type="module"`** — custom Vite plugin replaces with `defer`
3. **Match build target to firmware** — see matrix below

The Chromium version embedded in BrightSign OS 9.x varies by firmware:

| BrightSign OS | Embedded Chromium | Recommended `build.target` |
|---|---|---|
| 9.0.0 – 9.1.91 | 98 | `['chrome98', 'es2020']` |
| 9.1.92+ | 120 | `['chrome120', 'es2022']` |

This repo's `apps/player-minimal` targets **OS 9.1.92+** (`['chrome120', 'es2022']`). If you must support older 9.x firmware, lower the target to `['chrome98', 'es2020']` and avoid ES2022+ features.

See [code examples](references/examples.md) for the complete Vite config.

### Step 3: Build the app

```bash
nx build player-minimal --configuration=production
```

Bundle size target: <100KB gzipped for main bundle.

### Step 4: Create deployment package

```bash
pnpm package:player
```

Or manually: copy build output + autorun.brs into package directory, zip. See [code examples](references/examples.md) for manual steps.

### Step 5: Verify package

```bash
unzip -l dist/player-minimal-deploy.zip

# Must contain:
# - autorun.brs (required)
# - index.html (entry point)
# - assets/ directory with JS/CSS
# - manifest.json (optional)
```

## Output Format

When packaging an app, produce:

1. Package file path and size
2. Bundle size breakdown (main vs vendor)
3. Confirmation that autorun.brs is included
4. Any size warnings (>100KB gzipped main bundle)

## Safety Controls

- Always verify autorun.brs URL uses `file:///sd:/index.html`
- Always check bundle size against 100KB gzipped target
- Never include source maps in production packages
- Never include CDN or external URLs in production builds
- Test locally before deploying to hardware

## Reference Files

- [Code examples](references/examples.md) — autorun.brs template, Vite config, build commands, optimisation tips, Chromium compatibility
- [autorun-template.brs](assets/autorun-template.brs) — complete autorun.brs template file

## Constraints

- BrightSign OS 9.x minimum
- Chromium version depends on OS firmware (98 for <9.1.92, 120 for 9.1.92+)
- Repo baseline is OS 9.1.92+ / Chrome 120 / es2022 — adjust if targeting older firmware
- `file://` protocol — no ES module imports, no dynamic import() unless bundled
- SD card storage — bundle size matters
