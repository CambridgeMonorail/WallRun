# BrightSign Package Code Examples

## autorun.brs Template (OS 9.x)

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
- **No setter methods**: Don't use `SetRectangle()`, `SetUrl()`, `EnableJavaScript()` — use config object
- **Dynamic resolution**: Use `roVideoMode.GetResX()/GetResY()` instead of hardcoded values
- **Config object**: All settings (URL, JavaScript, message port) in config

**Key configuration:**

- **URL**: Must use `file:///sd:/index.html` (lowercase `sd:`, triple slash)
- **Resolution**: Dynamic via `roVideoMode.GetResX()/GetResY()`
- **JavaScript**: `javascript_enabled: true` required for React apps
- **Message Port**: `config.port` enables HTML widget event logging

## Vite Configuration for BrightSign

The example below matches the current `apps/player-minimal/vite.config.mts` build section. Use it as a starting point for new BrightSign apps:

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

  base: './',

  build: {
    outDir: '../../dist/apps/player-minimal',
    emptyOutDir: true,
    reportCompressedSize: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // BrightSign OS 9.1.92+ = Chrome 120; for older 9.x use ['chrome98', 'es2020']
    target: ['chrome120', 'es2022'],
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: false, // Single CSS file
    modulePreload: false, // Avoid module preload behavior
    rollupOptions: {
      output: {
        format: 'iife', // IIFE format for file:// compatibility
        inlineDynamicImports: true, // Single bundle for predictable deployment
        generatedCode: {
          constBindings: true,
        },
        // Fixed filenames for BrightSign (no hashes needed)
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/app.js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? '';
          if (name.endsWith('.css')) return 'assets/app.css';
          return 'assets/[name][extname]';
        },
      },
    },
    chunkSizeWarningLimit: 200, // Adjusted for single bundle approach
  },
});
```

**Critical BrightSign requirements:**

1. **IIFE format required**: `format: 'iife'` — ES modules fail because `file://` protocol doesn't provide MIME types
2. **Strip type="module"**: Custom plugin replaces with `defer` attribute
3. **Match target to firmware**: repo baseline is `['chrome120', 'es2022']` for OS 9.1.92+; use `['chrome98', 'es2020']` for older 9.x
4. **CSS handling**: Tailwind CSS may not load from `file://` — consider inlining critical CSS

## Build and Package Commands

```bash
# Production build
nx build player-minimal --configuration=production

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

## Bundle Size Optimization

### Reduce initial bundle size

1. **Code splitting by route:**

   ```typescript
   const Home = lazy(() => import('./pages/Home'));
   ```

2. **Dynamic imports:**

   ```typescript
   const loadCharts = () => import('recharts');
   ```

3. **Tree-shaking:** Import specific components, avoid barrel imports of large libraries

4. **Remove unused dependencies:** `npx vite-bundle-visualizer`

### Optimize images and assets

- Use WebP format (30-50% smaller than PNG)
- Inline small SVGs (<5KB)
- Lazy-load images below the fold

### Chromium compatibility

The Chromium version depends on BrightSign OS firmware:

- **OS 9.1.92+** (Chromium 120) — supports CSS container queries, `:has()`, `Array.at()`, top-level await (though top-level await requires ES modules, which are not used in IIFE builds)
- **OS 9.0.0–9.1.91** (Chromium 98) — avoid CSS container queries, `:has()`, import assertions, `Array.at()` (use `array[array.length - 1]`)

Always match your `build.target` to the oldest firmware in your fleet.

## Local Testing

```bash
cd dist/brightsign-package
python3 -m http.server 8080
# Open in Chrome with DevTools device emulation (1920x1080)
```

## Common Issues

| Issue | Solution |
|---|---|
| Bundle too large (>500KB) | Enable code splitting, remove unused deps, check bundle analyzer |
| White screen on player | Check console for errors, verify relative asset paths, no CDN URLs |
| App doesn't start | Verify `autorun.brs` in root, check `file:///sd:/index.html` path |
