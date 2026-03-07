# BrightSign roHtmlWidget URL Mystery - SOLVED ✅

## ✅ COMPLETE SOLUTION (Updated: March 7, 2026)

**Working Configuration:**

```brightscript
url: "file:///sd:/index.html"
```

**Final Status:**
- ✅ React 19 renders successfully on BrightSign OS 9.1.92 + Chrome 120
- ✅ Inline styles work perfectly (gradients, colors, flexbox)
- ✅ CSS inlined in HTML `<style>` tag works
- ❌ Tailwind v4 utility classes don't render (use inline styles instead)

**Key Discoveries:**

1. **URL Format**: Use `file:///sd:/index.html` (lowercase, triple slash before sd:) ✅
2. **Build Format**: Must use IIFE, not ES modules (file:// doesn't provide MIME types) ✅  
3. **Script Loading**: Use `defer` attribute, not `type="module"` ✅
4. **CSS Solution**: Inline CSS into HTML `<style>` tag (not external files) ✅
5. **Chrome 120 Required**: Set via registry: `html/widget type = chromium120` ✅
6. **Tailwind v4 Issue**: Utility classes don't apply styles (root cause unknown) ❌

**Final Working Configuration:**

**Working autorun.brs:**

```brightscript
sub Main()
    msgPort = CreateObject("roMessagePort")
    vm = CreateObject("roVideoMode")
    rect = CreateObject("roRectangle", 0, 0, vm.GetResX(), vm.GetResY())

    config = {
        port: msgPort
        url: "file:///sd:/index.html"
        javascript_enabled: true
    }

    html = CreateObject("roHtmlWidget", rect, config)
    html.Show()

    while true
        msg = wait(0, msgPort)
        if type(msg) = "roHtmlWidgetEvent" then
            ? msg.GetData()
        end if
    end while
end sub
```

**Working Vite config:**

- `format: 'iife'` in rollupOptions.output
- Custom plugin to strip `type="module"` and add `defer` attribute
- See `apps/player-minimal/vite.config.mts` for full config

---

## Original Problem Summary (Preserved for Reference)

When we pass `"SD:/index.html"` as the URL to roHtmlWidget, the player logs show it as `SD:///index.html` (triple slash). This happens on **TWO different players** with different models and firmware:

- **Player 1**: CL435, Firmware 9.1.92, IP 192.168.0.51
- **Player 2**: XT1145, Firmware 9.0.157, IP 192.168.0.62

Screen is black on both players.

## Current Code

```brightscript
sub Main()
    msgPort = CreateObject("roMessagePort")
    vm = CreateObject("roVideoMode")
    rect = CreateObject("roRectangle", 0, 0, vm.GetResX(), vm.GetResY())

    config = {
        port: msgPort
        url: "SD:/index.html"
        javascript_enabled: true
    }

    html = CreateObject("roHtmlWidget", rect, config)
    html.Show()

    while true
        msg = wait(0, msgPort)
    end while
end sub
```

## Player Logs Show

```
[   15.382] Loading 'SD:/autorun.brs' (67749cb4686b69656cd063de13a30651b1d7836b)
[   16.170] ******* ERROR eglCreateContext: Failed to resolve m_eglGetSyncValuesCHROMIUM *******
[   16.186] ******* ERROR eglCreateContext: Failed to resolve m_eglGetSyncValuesCHROMIUM *******
[   16.557] BSPLAY: SD:///index.html
```

## Path Format Attempts (All Failed)

We've tried **9 different path formats**, all resulted in black screen:

1. `"file:/sd/index.html"` → corrupted in logs
2. `"file:///sd/index.html"` → `ERR_FILE_NOT_FOUND`
3. `"file:///storage/sd/index.html"` → `ERR_FILE_NOT_FOUND`
4. `"file:/SD:/index.html"` → showed as `file:///SD:/index.html` in logs
5. `"index.html"` → showed as `://index.html` in logs (completely broken)
6. `"SD:/index.html"` → showed as `SD:///index.html` in logs (current)

## Files Confirmed on SD Card

```bash
curl --digest -u "admin:BrightSign23!" "http://192.168.0.62:80/api/v1/files/sd/"
```

Shows:

- `sd/index.html` ✅ exists (540 bytes)
- `sd/autorun.brs` ✅ exists (558 bytes)
- `sd/assets/index-*.js` ✅ exists
- `sd/assets/index-*.css` ✅ exists
- `sd/assets/vendor-*.js` ✅ exists

Files are definitely on the SD card.

## Questions for ChatGPT

### Question 1: Why the Triple Slash?

When we specify `url: "SD:/index.html"` in the config object, why does it appear in logs as `SD:///index.html`? Is BrightScript modifying the URL somehow?

### Question 2: Correct roHtmlWidget URL Format

For **BrightSign OS 9.0.x and 9.1.x**, what is the **documented, correct** URL format to load a local HTML file from the SD card in roHtmlWidget?

Options we need clarity on:

- `"file:/SD:/index.html"` (BrightScript-style with file:// prefix)
- `"SD:/index.html"` (BrightScript-style without prefix)
- `"file:///storage/sd/index.html"` (Linux/Node.js filesystem path)
- Something else entirely?

### Question 3: eglCreateContext Errors

```
******* ERROR eglCreateContext: Failed to resolve m_eglGetSyncValuesCHROMIUM *******
```

What do these errors mean? Are they:

- Normal/expected and can be ignored?
- Indicating a graphics/OpenGL problem preventing HTML rendering?
- Related to Chromium not starting properly?

### Question 4: Minimal Working Example

Can you provide a **verified, tested** minimal autorun.brs for OS 9.x that:

1. Successfully loads a local HTML file from SD card
2. Displays it fullscreen
3. Has been confirmed to work on real hardware (not just documentation)

We need code that **you know works**, not just what the docs say should work.

### Question 5: Debug Strategy

How can we debug why the HTML widget is not rendering?

- Are there log files we should check? (we see `BSPLAY: SD:///index.html` in system log)
- How to verify Chromium is actually loading?
- How to access JavaScript console errors?
- Is there a way to test HTML rendering without autorun.brs?

### Question 6: roHtmlWidget Constructor

We're passing roRectangle as the first parameter:

```brightscript
rect = CreateObject("roRectangle", 0, 0, vm.GetResX(), vm.GetResY())
html = CreateObject("roHtmlWidget", rect, config)
```

Is this correct for OS 9.x? Or should it be:

```brightscript
html = CreateObject("roHtmlWidget", config)
```

### Question 7: Config Object Properties

Are these property names correct for OS 9.x roHtmlWidget config?

```brightscript
config = {
    port: msgPort
    url: "???"
    javascript_enabled: true
}
```

Specifically:

- Is it `javascript_enabled` or `javascriptEnabled`?
- Do we need `security_params` or other properties?
- Is `port` the correct way to set the message port?

## What We Know Works

- LDWS REST API: ✅ Can upload files successfully
- autorun.brs loads: ✅ Logs show it loading
- Player boots: ✅ Both players boot normally
- Files on SD card: ✅ Confirmed via API

## What Doesn't Work

- Display shows: ❌ Black screen on both players
- URL format: ❌ All 9 attempts show corruption or errors
- HTML rendering: ❌ No evidence Chromium is rendering

## Hardware Context

- **Player 1 (CL435)**: BrightSign OS 9.1.92, Serial C5D51K000056, 192.168.0.51:443 HTTPS
- **Player 2 (XT1145)**: BrightSign OS 9.0.157, Serial USD38M000017, 192.168.0.62:80 HTTP
- Both players have factory default settings
- Both players have BSN cloud disabled (DISABLE_BSN_CLOUD set)
- Both have Local DWS enabled
- React app works fine in browser (not a React/build issue)

## Expected Behavior

We expect to see the React app (a simple "Hello World" UI) displayed fullscreen on the BrightSign display.

## Actual Behavior

Black screen. No errors in autorun.brs execution. URL appears corrupted in logs.

---

## NEW QUESTIONS FOR CHATGPT (CSS MIME Type Issue)

### Question 8: CSS Loading from file:// Protocol

We confirmed React is rendering (green screen with inline styles works). However, when we extract CSS to a separate file and reference it with `<link rel="stylesheet" href="./assets/style-[hash].css">`, the screen goes black.

**Working:**

```html
<div style={{backgroundColor: '#00ff00', ...}}>React is Working!</div>
```

Result: ✅ Bright green screen renders

**Not Working:**

```html
<head>
  <link rel="stylesheet" href="./assets/style-rsTEeX90.css">
</head>
```

Result: ❌ Black screen (CSS not loading)

**Questions:**

1. Does BrightSign Chromium have MIME type restrictions for CSS loaded via file:// protocol?
2. Is this the same issue as JavaScript modules (missing MIME types)?
3. What are our options:
   - Inline all CSS into JavaScript bundle?
   - Use `<style>` tags in HTML?
   - Configure Chromium to accept CSS from file://?
   - Use a different URL scheme?

**Build output shows CSS was extracted:**

```
style-rsTEeX90.css   21.07 kB │ gzip:  5.84 kB
index-Cp6idg68.js   190.43 kB │ gzip: 59.88 kB
```

### Question 9: Inline CSS Strategy

If external CSS files won't load from file://, what's the best approach for Tailwind CSS?

**Option A: Inline CSS in JS bundle**

```typescript
// vite.config.mts
build: {
  cssCodeSplit: false,
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        if (assetInfo.name.endsWith('.css')) {
          return 'inline-styles.js'; // Force CSS into JS?
        }
        return 'assets/[name]-[hash][extname]';
      }
    }
  }
}
```

**Option B: Use Vite's CSS injection**

- Can Vite inject CSS into `<style>` tags instead of `<link>` tags?
- Is there a plugin for this?

**Option C: Manual CSS inlining**

- Extract CSS, read it, inject into index.html as `<style>` tag
- Post-build script to inline critical CSS

Which approach works best for BrightSign OS 9.x with file:// protocol?

### Question 10: HTML Widget Security Settings

Are there security_params or other config options that allow CSS loading from file://?

```brightscript
config = {
    port: msgPort
    url: "file:///sd:/index.html"
    javascript_enabled: true
    security_params: {
        // Allow local CSS files?
        allow_local_file_css: true  // Does this exist?
    }
}
```

### Question 11: Alternative Approaches

If file:// protocol is too restrictive, are there alternatives?

**Option A: Local HTTP Server**

- Run lightweight HTTP server on the player (Node.js, Python)
- Serve from `http://localhost:8080/index.html`
- Proper MIME types for CSS and JS

**Option B: Data URIs**

- Inline CSS as data URI in HTML
- `<link rel="stylesheet" href="data:text/css;base64,...">`

**Option C: Chromium Inspector Server**

- Use the inspector server (port 2999) to serve files?
- Not sure if this is possible

Which approach is most reliable for production BrightSign deployments?

---

**Please provide definitive answers with code you know works on real OS 9.x hardware.**
