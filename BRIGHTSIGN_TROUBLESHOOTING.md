# BrightSign Deployment Troubleshooting - Need Help

## Goal
Deploy a React application to a BrightSign CL435 player running OS 9.x (firmware 9.1.92) using an `autorun.brs` bootstrap script that launches the React app in a Chromium HTML widget.

## Hardware & Firmware
- **Model**: BrightSign CL435
- **Serial**: C5D51K000056
- **Firmware**: BrightSign OS 9.1.92
- **IP**: 192.168.0.51
- **Access**: LDWS REST API on port 443 (HTTPS) with HTTP Digest auth

## Current Problem
Player is stuck in a boot loop. The `autorun.brs` script keeps crashing with:

```
Script runtime error: Member function not found in BrightScript Component or interface. (runtime error &hf4) in SD:/autorun.brs(13)
```

Line 13 is trying to get display resolution, which we need for logging purposes.

## What We've Tried

### Attempt 1: roVideoMode.GetResolution()
```brightscript
videoMode = CreateObject("roVideoMode")
resolution = videoMode.GetResolution()
```
**Result**: "Member function not found" error

### Attempt 2: roDeviceInfo.GetDisplaySize()
```brightscript
deviceInfo = CreateObject("roDeviceInfo")
displaySize = deviceInfo.GetDisplaySize()
displayWidth = displaySize.w
displayHeight = displaySize.h
```
**Result**: "Member function not found" error

### Attempt 3: Asked ChatGPT
ChatGPT said to use:
```brightscript
videoMode = CreateObject("roVideoMode")
displayWidth = videoMode.GetResX()
displayHeight = videoMode.GetResY()
```
**Result**: Not tested yet - player stuck in boot loop from previous attempts

## Current autorun.brs Code

```brightscript
' BrightSign OS 9.x Bootstrap Script for The Sign Age
' This script launches the React application in a Chromium widget

Sub Main()
    ' Create message port for events
    msgPort = CreateObject("roMessagePort")
    
    ' Log file for debugging
    logPath = "SD:/autorun-react-log.txt"
    
    ' Get display dimensions (using CORRECT BrightSign OS 9.x API)
    videoMode = CreateObject("roVideoMode")
    displayWidth = videoMode.GetResX()
    displayHeight = videoMode.GetResY()
    
    ' Create HTML widget for the React app
    config = {
        port: msgPort
        url: "file:/SD:/index.html"
        inspector_server: {
            port: 2999
            enabled: true
        }
        ' Enable JavaScript and local storage
        javascript_enabled: true
        local_storage_enabled: true
        storage_path: "SD:"
        storage_quota: 52428800  ' 50MB quota
    }
    
    htmlWidget = CreateObject("roHtmlWidget", config)
    htmlWidget.Show()
    
    ' Log startup
    AppendLine(logPath, "The Sign Age player started successfully")
    AppendLine(logPath, "URL: " + htmlWidget.GetUrl())
    AppendLine(logPath, "Display resolution: " + displayWidth.ToStr() + "x" + displayHeight.ToStr())
    
    diagnostics = CreateObject("roSystemLog")
    diagnostics.SendLine("The Sign Age player started successfully")
    diagnostics.SendLine("Display resolution: " + displayWidth.ToStr() + "x" + displayHeight.ToStr())
    
    ' Main event loop
    while true
        msg = wait(0, msgPort)
        if type(msg) = "roHtmlWidgetEvent" then
            eventData = msg.GetData()
            if eventData.reason = "load-error" or eventData.reason = "load-aborted" then
                errMsg = "ERROR: Failed to load application - " + eventData.message
                diagnostics.SendLine(errMsg)
                AppendLine(logPath, errMsg)
            else if eventData.reason = "load-finished" then
                successMsg = "Application loaded successfully"
                diagnostics.SendLine(successMsg)
                AppendLine(logPath, successMsg)
            end if
            AppendLine(logPath, "HtmlWidgetEvent: " + eventData.reason)
        end if
    end while
End Sub

Sub AppendLine(path As String, line As String)
    f = CreateObject("roAppendFile", path)
    if f <> invalid then
        f.SendLine(line)
        f.Close()
    end if
End Sub
```

## Files Being Deployed
1. `autorun.brs` - Bootstrap script (crashes on line 13)
2. `index.html` - React app entry point
3. `assets/index-*.js` - React JavaScript bundle
4. `assets/index-*.css` - Styles
5. `assets/vendor-*.js` - React/vendor libraries
6. `manifest.json` - Package manifest
7. `favicon.ico` - Icon

## Questions for ChatGPT

### Question 1: Display Resolution API
**For BrightSign OS 9.1.92**, what is the CORRECT BrightScript code to get display width and height?

We need working code that will not throw "Member function not found" errors.

### Question 2: Minimal Bootstrap
Can you provide a **minimal working `autorun.brs`** for BrightSign OS 9.x that:
1. Creates an roHtmlWidget pointing to `file:/SD:/index.html`
2. Shows the widget fullscreen
3. Enables Chrome DevTools inspector on port 2999 (optional)
4. Has a basic event loop
5. **Does NOT crash** - strip out ANYTHING that might cause errors

### Question 3: Config Object Syntax
Is our `config` object syntax correct for BrightSign OS 9.x? Specifically:
- `inspector_server` with `port` and `enabled` properties
- `javascript_enabled`, `local_storage_enabled`, `storage_path`, `storage_quota`
- Are these the exact property names that work in roHtmlWidget config?

### Question 4: Recovery
The player is now stuck in a boot loop because autorun.brs keeps crashing. Options:
1. Factory reset and start over (painful)
2. Delete autorun.brs via player menu before it loads
3. Upload a working autorun.brs that doesn't crash

Which is most reliable?

## What We Need
A **bulletproof, tested `autorun.brs`** example that will:
- Work on BrightSign OS 9.1.92 without errors
- Launch a local HTML file in fullscreen
- Enable remote debugging if possible
- Not use ANY deprecated or non-existent APIs

## Context
- We've already factory reset once due to boot loops
- Every failed attempt requires power cycling and potentially another reset
- We're deploying via LDWS REST API (PUT requests to upload files)
- The React app itself works fine (tested in browser)
- The problem is 100% in the BrightScript bootstrap code

---

**Please provide working BrightScript code that we can trust won't crash the player.**
