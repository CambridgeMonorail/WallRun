---
name: brightsign-package
description: Package React apps for BrightSign OS 9.x players with optimized bundles and autorun.brs bootstrap
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

**autorun.brs template for HTML widget:**

```brightscript
' BrightSign OS 9.x HTML Widget Bootstrap
' Launches React app in fullscreen Chromium

Sub Main()
    ' Create HTML widget for displaying web content
    htmlWidget = CreateObject("roHtmlWidget")

    ' Set widget rectangle (fullscreen 1920x1080)
    rect = CreateObject("roRectangle", 0, 0, 1920, 1080)
    htmlWidget.SetRectangle(rect)

    ' Enable JavaScript and local storage
    htmlWidget.EnableJavaScript(true)
    htmlWidget.SetLocalStorageEnabled(true)

    ' Set URL to local index.html
    htmlWidget.SetUrl("file:///sd:/index.html")

    ' Show the widget
    htmlWidget.Show()

    ' Event loop to keep app running
    msgPort = CreateObject("roMessagePort")
    htmlWidget.SetPort(msgPort)

    while true
        msg = wait(0, msgPort)
        if type(msg) = "roHtmlWidgetEvent" then
            eventData = msg.GetData()
            print "HTML Widget Event: "; eventData
        end if
    end while
End Sub
```

**Key configuration options:**

- Resolution: Adjust rect coordinates for player resolution (1920x1080, 3840x2160, etc.)
- Storage: `SetLocalStorageEnabled(true)` for persistent data
- URL: Always use `file:///sd:/index.html` for local files

## Step 2: Optimize Vite Configuration

Configure Vite for aggressive optimization and BrightSign compatibility:

**apps/player-minimal/vite.config.ts:**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  // Use relative paths (no base URL)
  base: './',

  build: {
    // Target older Chromium (BrightSign uses Chromium 98)
    target: ['chrome98'],

    // Output to dist for Nx
    outDir: '../../dist/apps/player-minimal',
    emptyOutDir: true,

    // Aggressive optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug'],
      },
    },

    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting
        manualChunks: {
          // Separate vendor bundle
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        // Smaller chunk size warnings
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 100, // 100KB limit
  },

  // Resolve aliases (match tsconfig.base.json)
  resolve: {
    alias: {
      '@tsa/shadcnui-signage': path.resolve(__dirname, '../../libs/shadcnui-signage/src/index.ts'),
    },
  },
});
```

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

- [autorun-template.brs](./autorun-template.brs) - Complete autorun.brs template
- [vite.config.example.ts](./vite.config.example.ts) - Full Vite config
- [package-script.sh](./package-script.sh) - Automated packaging script

For more information:

- BrightSign OS 9.x HTML Widget documentation
- Vite build optimization guide
- Chromium 98 compatibility table
