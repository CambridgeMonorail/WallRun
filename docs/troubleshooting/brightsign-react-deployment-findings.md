# BrightSign React Deployment Findings

**Date:** March 7, 2026  
**Player:** BrightSign XT1145 (Series 5)  
**Firmware:** BrightSign OS 9.1.92  
**Chromium:** Version 120.0.6099.225  

## Executive Summary

✅ **React 19 works perfectly on BrightSign OS 9.1.92 with Chrome 120 runtime**  
✅ **Tailwind v4 works perfectly with proper Vite plugin configuration**  
✅ **Chrome 120 supports all modern CSS features (oklch, @layer, :where, CSS variables)**  
⚠️ **CRITICAL: Must use `@tailwindcss/vite` plugin for Tailwind v4 to compile correctly**  

## What Works ✅

### JavaScript & React
- **React 19.0.0** - Full support, no compatibility issues
- **ES2022 features** - Native support in Chrome 120 (no polyfills needed)
- **IIFE bundles** - Work perfectly with Vite
- **file:/// URLs** - Load correctly from SD card
- **React DevTools** - Web Inspector works on port 2999

### CSS Features (Inline Styles)
- **Linear gradients** - `linear-gradient(135deg, #1e293b 0%, #334155 100%)`
- **RGBA colors** - `rgba(255, 255, 255, 0.1)`
- **Flexbox** - Full support
- **Border radius, shadows, etc.** - All modern CSS properties work

### Build & Deployment
- **Vite 7.1.3** - Works perfectly
- **IIFE format** - Required for file:// URLs
- **CSS inlining** - HTML `<style>` tags work
- **REST API deployment** - HTTPS (port 443) with Digest auth
- **Web Inspector** - Enabled via registry: `html/enable_web_inspector = 1`
- **Chrome 120 runtime** - Enabled via registry: `html/widget type = chromium120`

## What Doesn't Work ❌

### Tailwind v4 CSS Classes
**Problem:** Tailwind CSS utility classes exist in DOM but don't apply styles.

**Example:**
```html
<!-- Class exists in DOM -->
<div class="bg-gradient-to-br from-background to-card">

<!-- But computed styles show -->
background: rgba(0, 0, 0, 0)  /* transparent, not the gradient */
```

**Likely causes:**
1. **`@layer` directive** - Tailwind v4 uses `@layer theme,base,components,utilities`
2. **`oklch()` colors** - Tailwind v4 defaults to oklch color syntax
3. **CSS custom properties syntax** - Uses bare HSL values: `--background: 220 13% 12%` (no `hsl()` wrapper)

**Evidence:**
- 21KB of CSS successfully inlined in HTML `<style>` tag
- CSS contains `@layer` directives and `oklch()` colors
- Chrome 120 should support these features, but BrightSign's implementation may not

## Configuration That Works

### Vite Build Config
```typescript
// apps/player-minimal/vite.config.mts
export default defineConfig({
  build: {
    target: ['chrome120', 'es2022'],
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
});
```

### BrightScript Bootstrap
```brightscript
' apps/player-minimal/public/autorun.brs
sub Main()
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
end sub
```

### Player Configuration
```json
// .brightsign/players.json
{
  "name": "dev-player",
  "ip": "192.168.0.62",
  "port": 443,  // HTTPS for REST API
  "username": "admin",
  "password": "BrightSign23!",
  "model": "XT1145",
  "serial": "USD38M000017"
}
```

## Deployment Workflow

### Working Commands
```bash
# Package and deploy in one command
pnpm deploy:player

# Or separately
pnpm package:player  # Build IIFE bundle, create ZIP
pnpm deploy:local    # Upload to player via REST API
```

### Deployment Process
1. Vite builds React app as IIFE bundle
2. CSS inlined into HTML `<style>` tag
3. Files packaged into ZIP: index.html, assets/*.js, autorun.brs
4. Uploaded to player via HTTPS REST API (port 443)
5. Player reboots and runs autorun.brs
6. autorun.brs sets Chrome 120 registry key and launches HTML widget

## Recommendations

### For Current Project (Immediate)

**Option 1: Use inline styles everywhere** ✅ Proven to work
```tsx
<div style={{
  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  padding: '40px',
  // ... all styles inline
}}>
```

**Option 2: Downgrade to Tailwind v3** (not tested yet)
- Tailwind v3 uses traditional CSS without `@layer` or `oklch()`
- May work better on BrightSign
- Needs testing

**Option 3: Use vanilla CSS** (not utility classes)
```css
.card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  padding: 40px;
}
```

### For Future Investigation

1. **Test Tailwind v3.x** - Does the older version work?
2. **Test CSS Modules** - Do scoped styles work?
3. **Test styled-components** - Does CSS-in-JS work?
4. **Report to BrightSign** - Is this a known issue with Chrome 120?
5. **Check Chromium flags** - Are there flags to enable missing CSS features?

## Debugging Tools

### Web Inspector
- **URL:** http://192.168.0.62:2999 (or chrome://inspect/#devices)
- **Console logging:** All `console.log()` appears in DevTools
- **User Agent:** Shows Chrome version
- **Computed styles:** Shows why Tailwind classes don't apply

### Player Logs
- **URL:** https://192.168.0.62/ (local DWS)
- **Shows:** BrightScript print statements, JavaScript console logs
- **Useful for:** Debugging when Web Inspector won't connect

### Diagnostic Commands
```javascript
// In Web Inspector Console
navigator.userAgent  // Verify Chrome version
getComputedStyle(element).backgroundColor  // Check applied styles
document.styleSheets  // Verify CSS loaded
```

## Key Learnings

1. **BrightSign OS 9.1.92 = Chrome 120** (not Chrome 98 as initially thought)
2. **Chrome 120 runtime requires registry key** (`html/widget type = chromium120`)
3. **React 19 is fully compatible** with BrightSign
4. **Modern CSS features work** but Tailwind v4 utility classes don't
5. **Inline styles are reliable** for BrightSign deployment
6. **REST API requires HTTPS** (port 443) not HTTP (port 80)

## Timeline Summary

| Date | Firmware | Result |
|------|----------|--------|
| Initial | OS 9.0.157 (Chrome 98) | Black screen with Tailwind classes |
| Initial | OS 9.0.157 (Chrome 98) | Inline styles worked (green screen test) |
| Upgrade | OS 9.1.92 (Chrome 120) | Still black with Tailwind classes |
| Fix | OS 9.1.92 (Chrome 120) | **✅ Inline styles work perfectly** |

## Next Steps

1. ✅ **Document findings** (this file)
2. ⏳ **Update deployment guide** with inline styles approach
3. ⏳ **Test Tailwind v3** as alternative
4. ⏳ **Create inline-styles template** for signage content
5. ⏳ **Report Tailwind v4 issue** to BrightSign support

## References

- [BrightSign Chromium 110/120 Upgrade Guide](https://docs.brightsign.biz/how-tos/upgrade-to-chromium-110120)
- [BrightSign HTML Widget Documentation](https://docs.brightsign.biz/developers/htmlwidget)
- [BrightSign LDWS API Documentation](https://docs.brightsign.biz/developers/ldws-general-endpoints)
- [Chromium Downloads by OS Version](https://docs.brightsign.biz/releases/chromium-downloads)
