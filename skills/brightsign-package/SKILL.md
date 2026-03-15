---
name: brightsign-package
description: Package React apps for BrightSign OS 9.x players with optimized bundles and autorun.brs bootstrap
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
  internal: true
---

# BrightSign Package Skill

Package React applications for deployment to BrightSign OS 9.x digital signage players.

## When to Use This Skill

Use this skill when you need to:

- Create a BrightSign-ready package from a React app build
- Generate the autorun.brs bootstrap file for HTML widgets
- Optimize Vite configuration for embedded device constraints
- Reduce bundle size for resource-limited players
- Structure files correctly for BrightSign SD card deployment

## BrightSign OS 9.x File Structure

A properly packaged BrightSign app has this structure:

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

## Step 1: Generate autorun.brs

Create the bootstrap file that BrightSign OS 9.x uses to launch your app:

**autorun.brs template for HTML widget (OS 9.x modern API):**

```brightscript
' BrightSign OS 9.x HTML Widget Bootstrap
' Launches React app in fullscreen Chromium

sub Main()
    ' Create message port for event handling
    msgPort = CreateObject("roMessagePort")

    ' Get display resolution dynamically
    vm = CreateObject("roVideoMode")
    rect = CreateObject("roRectangle", 0, 0, vm.GetResX(), vm.GetResY())

    ' Configure HTML widget
    config = {
        port: msgPort
        url: "file:///sd:/index.html"
        javascript_enabled: true
    }

    ' Create HTML widget (OS 9.x constructor requires rect + config)
    html = CreateObject("roHtmlWidget", rect, config)
    html.Show()

    ' Event loop to keep app running
    while true
        msg = wait(0, msgPort)
        if type(msg) = "roHtmlWidgetEvent" then
            ? msg.GetData()  ' Print HTML widget events to console
        end if
    end while
end sub
```

**Key differences from OS 8.x:**

- **Constructor**: OS 9.x uses `CreateObject("roHtmlWidget", rect, config)` (rect and config required)
- **No setter methods**: Don't use `SetRectangle()`, `SetUrl()`, `EnableJavaScript()` - use config object
- **Dynamic resolution**: Use `roVideoMode.GetResX()/GetResY()` instead of hardcoded values
- **Config object**: All settings (URL, JavaScript, message port) in config

**Key configuration options:**

- **URL Format**: **MUST use `file:///sd:/index.html`** (lowercase `sd:`, triple slash)
  - ❌ Wrong: `SD:/index.html`, `file:/sd/`, `file:///storage/sd/`
  - ✅ Correct: `file:///sd:/index.html`
- **Resolution**: Dynamic via `roVideoMode.GetResX()/GetResY()` (works for all player models)
- **JavaScript**: `javascript_enabled: true` required for React apps
- **Message Port**: config.port enables HTML widget event logging

## Step 2: Optimize Vite Configuration

Configure Vite for aggressive optimization and BrightSign compatibility:

**apps/player-minimal/vite.config.mts:**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),

    // CRITICAL: Strip type="module" for BrightSign
    {
      name: 'remove-module-type',
      transformIndexHtml(html) {
        return html.replace(/<script type="module"/g, '<script defer').replace(/<script crossorigin/g, '<script defer crossorigin');
      },
    },
  ],

  // Use relative paths (no base URL)
  base: './',

  build: {
    // Target Chromium 98 (BrightSign OS 9.x embedded browser)
    target: 'es2020',

    // Output location
    outDir: '../../dist/apps/player-minimal',
    emptyOutDir: true,

    // Aggressive optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug'],
      },
    },

    // CRITICAL: Use IIFE format, not ES modules
    rollupOptions: {
      output: {
        format: 'iife', // file:// protocol doesn't provide MIME types
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 100, // 100KB limit
  },
});
```

**Critical BrightSign requirements:**

1. **IIFE format required**: `format: 'iife'`
   - ❌ ES modules (`type="module"`) fail: file:// doesn't provide MIME types
   - ✅ IIFE format works: single-file bundles compatible with file:// protocol
2. **Strip type="module" attribute**: Custom plugin required
   - Vite adds `type="module"` by default
   - BrightSign Chromium rejects modules without proper MIME types
   - Plugin replaces with `defer` attribute for proper DOM timing
3. **Target es2020**: BrightSign OS 9.x uses Chromium 98
   - Supports modern ES features (optional chaining, nullish coalescing)
   - Avoid ES2022+ features (top-level await, private fields)

4. **CSS handling**:
   - ⚠️ Tailwind CSS may not load from file:// (MIME type issues)
   - Consider inlining critical CSS or using inline styles
   - Test thoroughly on real hardware

## Step 3: Build the App

Use Nx to build the player app:

```bash
# Production build
nx build player-minimal --prod

# Or with configuration
nx build player-minimal --configuration=production
```

**Expected output:**

- Location: `dist/apps/player-minimal/`
- Bundle size target: <100KB gzipped for index.js
- Vendor chunk: Separate bundle for React libs

## Step 4: Create Deployment Package

Package the build output with autorun.brs:

```bash
# Create package directory
mkdir -p dist/brightsign-package

# Copy build output
cp -r dist/apps/player-minimal/* dist/brightsign-package/

# Copy autorun.brs
cp apps/player-minimal/public/autorun.brs dist/brightsign-package/

# Create manifest (optional)
cat > dist/brightsign-package/manifest.json << EOF
{
  "name": "player-minimal",
  "version": "1.0.0",
  "buildTime": "$(date -Iseconds)",
  "commit": "$(git rev-parse --short HEAD)"
}
EOF

# Create deployment zip
cd dist/brightsign-package
zip -r ../player-minimal-deploy.zip .
cd ../..
```

## Step 5: Verify Package Structure

Check that your package has the correct structure:

```bash
# List package contents
unzip -l dist/player-minimal-deploy.zip

# Should show:
# - autorun.brs (required)
# - index.html (entry point)
# - assets/ directory with JS/CSS
# - manifest.json (optional)
```

## Bundle Size Optimization Tips

### Reduce Initial Bundle Size

1. **Code splitting by route:**

   ```typescript
   const Home = lazy(() => import('./pages/Home'));
   const About = lazy(() => import('./pages/About'));
   ```

2. **Dynamic imports:**

   ```typescript
   // Only load when needed
   const loadCharts = () => import('recharts');
   ```

3. **Tree-shaking:**
   - Import specific components: `import { Button } from '@tsa/shadcnui'`
   - Avoid barrel imports of large libraries

4. **Remove unused dependencies:**
   ```bash
   # Analyze bundle
   npx vite-bundle-visualizer
   ```

### Optimize Images and Assets

- Use WebP format (30-50% smaller than PNG)
- Inline small SVGs (<5KB)
- Lazy-load images below the fold
- Use responsive images with srcset

### Target Chromium 98

BrightSign OS 9.x uses Chromium 98. Avoid:

- CSS container queries
- CSS :has() selector
- Import assertions
- Array.at() method (use array[array.length - 1])

Use polyfills or transpile down to ES2020.

## Testing Package Locally

Before deploying to a player, test locally:

```bash
# Serve the package
cd dist/brightsign-package
python3 -m http.server 8080

# Open in Chrome
# Test with DevTools device emulation (1920x1080)
```

## Common Issues

### Issue: Bundle too large (>500KB)

**Solution:**

- Enable code splitting
- Remove unused dependencies
- Check bundle analyzer for large imports

### Issue: White screen on player

**Solution:**

- Check browser console for errors
- Verify all asset paths are relative
- Ensure no CDN/external URLs in production build

### Issue: App doesn't start on player

**Solution:**

- Verify autorun.brs is in root directory
- Check file:///sd:/index.html path in autorun.brs
- Ensure HTML widget is enabled in player settings

## Resources

Reference files in this skill:

- [autorun-template.brs](assets/autorun-template.brs) - Complete autorun.brs template

For more information:

- BrightSign OS 9.x HTML Widget documentation
- Vite build optimization guide
- Chromium 98 compatibility table
