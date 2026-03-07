# BrightSign + Tailwind v4 - THE SOLUTION ✅

**Date:** March 7, 2026  
**Player:** BrightSign XT1145 (Series 5)  
**Firmware:** BrightSign OS 9.1.92  
**Chromium:** Version 120.0.6099.225  
**Status:** ✅ **FULLY WORKING**

## Executive Summary

**Tailwind v4 works perfectly on BrightSign Chrome 120!**

The problem was **NOT** BrightSign, CSS support, or file:// loading. The problem was **missing the `@tailwindcss/vite` plugin**, which meant Tailwind directives weren't being compiled.

## The Root Cause

Without the Tailwind v4 Vite plugin, the CSS file contained **unprocessed directives**:

```css
/* ❌ This was shipped to the browser */
@tailwind utilities;
@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

The browser couldn't understand `@tailwind` or `@apply`, so utility classes like `bg-gradient-to-br` had no CSS rules and didn't render.

## The Solution

### 1. Add Tailwind v4 Vite Plugin

```typescript
// apps/player-minimal/vite.config.mts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← This compiles Tailwind directives!
    // ... other plugins
  ],
  // ... rest of config
});
```

### 2. Use BrightSign-Safe Vite Config

```typescript
build: {
  target: ['chrome120', 'es2022'],
  minify: 'esbuild',
  sourcemap: false,
  cssCodeSplit: false,  // Single CSS file
  modulePreload: false,
  rollupOptions: {
    output: {
      format: 'iife',  // For file:// compatibility
      inlineDynamicImports: true,
      entryFileNames: 'assets/app.js',
      chunkFileNames: 'assets/app.js',
      assetFileNames: (assetInfo) => {
        if (assetInfo.name?.endsWith('.css')) return 'assets/app.css';
        return 'assets/[name][extname]';
      },
    },
  },
},
```

### 3. Fix @apply Directives

```css
/* apps/player-minimal/src/styles.css */
@import 'tailwindcss';

@layer base {
  body {
    /* ✅ Use direct CSS instead of @apply */
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}
```

## CSS Feature Support on BrightSign Chrome 120

All modern CSS features are **fully supported**:

| Feature | Supported | Notes |
|---------|-----------|-------|
| `oklch()` colors | ✅ YES | Tailwind v4's default color format |
| `:where()` selector | ✅ YES | Used by Tailwind for specificity |
| `@layer` directive | ✅ YES | Tailwind's cascade control |
| CSS variables | ✅ YES | `var(--background)` works |
| Container queries | ✅ YES | Modern responsive design |
| Flexbox gap | ✅ YES | `gap: 1rem` works |
| Grid | ✅ YES | Full support |

**Verification command:**
```javascript
// In Web Inspector console
CSS.supports('color', 'oklch(0.7 0.1 240)')  // → true
CSS.supports('selector(:where(*))')          // → true
CSS.supports('color', 'var(--test)')         // → true
```

## What Works ✅

### React & JavaScript
- React 19.0.0 (full support)
- ES2022 features (native, no polyfills)
- IIFE bundles
- file:// URLs from SD card
- Web Inspector on port 2999

### Tailwind v4
- All utility classes (`bg-gradient-to-br`, `text-gray-200`, etc.)
- oklch() colors
- Custom properties
- @layer directives
- Responsive classes
- Dark mode classes

### CSS
- External CSS files (assets/app.css)
- Linear gradients
- RGBA/OKLCH colors
- Flexbox, Grid
- Border radius, shadows
- Modern transforms

### Build & Deployment
- Vite 7.1.3
- Tailwind v4.1.18
- HTTPS REST API (port 443)
- Automatic reboot after deploy

## Configuration Files

###  Vite Config (Complete)

```typescript
// apps/player-minimal/vite.config.mts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: import.meta.dirname,
  base: './',
  
  plugins: [
    react(),
    tailwindcss(),  // CRITICAL: Compiles Tailwind directives
    nxViteTsPaths(),
    {
      name: 'remove-module-type',
      transformIndexHtml(html) {
        return html.replace(/<script type="module"/g, '<script defer');
      },
    },
  ],
  
  build: {
    outDir: '../../dist/apps/player-minimal',
    emptyOutDir: true,
    target: ['chrome120', 'es2022'],
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: false,
    modulePreload: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/app.js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? '';
          if (name.endsWith('.css')) return 'assets/app.css';
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
```

### BrightScript Bootstrap

```brightscript
' apps/player-minimal/public/autorun.brs
sub Main()
    ' Enable Chrome 120 runtime
    reg = CreateObject("roRegistrySection", "html")
    reg.Write("enable_web_inspector", "1")
    reg.Write("widget type", "chromium120")
    reg.Flush()
    
    msgPort = CreateObject("roMessagePort")
    vm = CreateObject("roVideoMode")
    rect = CreateObject("roRectangle", 0, 0, vm.GetResX(), vm.GetResY())

    config = {
        port: msgPort
        url: "file:///sd:/index.html"
        javascript_enabled: true
        inspector_server: { port: 2999 }
    }

    html = CreateObject("roHtmlWidget", rect, config)
    html.Show()
    
    while true
        msg = wait(0, msgPort)
        if type(msg) = "roHtmlWidgetEvent" then
            print msg.GetData()
        end if
    end while
end sub
```

## Deployment Commands

```bash
# Build + package + deploy in one command
pnpm deploy:player

# Or separately
pnpm package:player  # Build IIFE, create ZIP
pnpm deploy:local    # Upload via REST API
```

## Key Learnings

1. **Tailwind v4 requires the Vite plugin** - Without it, directives remain uncompiled
2. **BrightSign Chrome 120 is fully modern** - Supports all Tailwind v4 features
3. **External CSS files work fine** - file:// can load CSS (contrary to initial theory)
4. **IIFE format is required** - ES modules don't work with file:// URLs
5. **Chrome 120 must be enabled** - Via registry key `html/widget type = chromium120`

## Debugging Journey

| Attempt | Configuration | Result |
|---------|---------------|--------|
| 1 | OS 9.0.157 + Tailwind classes | ❌ Black screen (Chrome 98 too old) |
| 2 | OS 9.0.157 + Inline styles | ✅ Green screen (React works!) |
| 3 | OS 9.1.92 + Tailwind classes | ❌ Black screen (still!) |
| 4 | OS 9.1.92 + CSS inlining plugin | ❌ Black screen (Tailwind still broken) |
| 5 | CSS diagnostics test | ✅ All CSS features supported! |
| 6 | External CSS file (no inlining) | ❌ Black screen (directives uncompiled) |
| 7 | **Added @tailwindcss/vite plugin** | ✅ **SUCCESS! Full Tailwind v4 rendering** |

## Next Steps

1. ✅ Tailwind v4 confirmed working
2. ⏳ Update all project apps to use Tailwind v4 properly
3. ⏳ Create signage content templates
4. ⏳ Test performance with large Tailwind apps
5. ⏳ Document best practices for BrightSign + Tailwind

## References

- [Tailwind CSS v4 Beta Docs](https://tailwindcss.com/docs)
- [Tailwind CSS Vite Plugin](https://github.com/tailwindlabs/tailwindcss-vite)
- [BrightSign Chromium 120 Guide](https://docs.brightsign.biz/how-tos/upgrade-to-chromium-110120)
- [BrightSign HTML Widget Docs](https://docs.brightsign.biz/developers/htmlwidget)

---

**TL;DR:**  
Add `import tailwindcss from '@tailwindcss/vite'` and `tailwindcss()` to plugins. Tailwind v4 works perfectly on BrightSign Chrome 120.
