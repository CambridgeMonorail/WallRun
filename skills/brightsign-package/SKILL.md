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

A properly packaged BrightSign app:

```
brightsign-package/
├── autorun.brs          # Bootstrap script (REQUIRED)
├── index.html           # Entry point HTML
├── assets/              # JS, CSS, images
│   ├── index-[hash].js  # Main bundle (<100KB gzipped target)
│   ├── vendor-[hash].js # Vendor chunk (React, libraries)
│   └── *.css            # Stylesheets
└── manifest.json        # Optional: Version metadata
```

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
3. **Target es2020** — BrightSign OS 9.x embeds Chromium 98

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

- [Code examples](references/examples.md) — autorun.brs template, Vite config, build commands, optimisation tips, Chromium 98 compatibility
- [autorun-template.brs](assets/autorun-template.brs) — complete autorun.brs template file

## Constraints

- BrightSign OS 9.x minimum
- Chromium 98 embedded browser — no CSS container queries, `:has()`, or ES2022+ features
- `file://` protocol — no ES module imports, no dynamic import() unless bundled
- SD card storage — bundle size matters
