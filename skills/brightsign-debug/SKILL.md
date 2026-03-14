---
name: brightsign-debug
description: Debug BrightSign OS 9.x players using device info APIs, remote inspector, and diagnostic tools
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
  internal: true
---

# BrightSign Debug Skill

Diagnose and troubleshoot issues on BrightSign OS 9.x digital signage players.

## When to Use This Skill

Use this skill when you need to:

- Diagnose why an app isn't starting or displaying
- Check player hardware and network status
- Access console logs and error messages
- Debug JavaScript issues remotely
- Verify file deployment and integrity
- Troubleshoot performance problems

## Quick Diagnostics Checklist

When a player isn't working correctly, follow this systematic approach:

1. ✅ **Player is powered and booted**
2. ✅ **Display is connected and receiving signal**
3. ✅ **Network connectivity established**
4. ✅ **Player IP address known**
5. ✅ **Diagnostic web server accessible (port 8008)**
6. ✅ **autorun.brs present on SD card**
7. ✅ **index.html and assets deployed**
8. ✅ **Console shows no JavaScript errors**

## Find Player IP Address

### Method 1: Player On-Screen Display

- Access player menu (button sequence varies by model)
- Navigate to: **Setup → Network → Status**
- Note the IPv4 address

### Method 2: Check Router DHCP Table

- Log into router admin interface
- Look for "BrightSign" hostname in DHCP leases
- Note assigned IP address

### Method 3: Network Scan

```bash
# Scan for BrightSign diagnostic servers (port 8008)
nmap -p 8008 --open 192.168.1.0/24

# Or use this faster script
for i in {1..254}; do
  timeout 1 bash -c "echo > /dev/tcp/192.168.1.$i/8008" 2>/dev/null && echo "192.168.1.$i"
done
```

### Method 4: mDNS/Bonjour Discovery

```bash
# On macOS/Linux with avahi
avahi-browse -t _http._tcp | grep BrightSign

# Returns: brightsign-ABC123._http._tcp local
```

## Access Diagnostic Web Server

Once you have the IP address:

```bash
# Open diagnostic interface in browser
open http://<player-ip>:8008

# Or use curl for API access
curl http://<player-ip>:8008/GetDeviceInfo
```

**Diagnostic interface provides:**

- Device information and status
- File browser (SD card contents)
- Log viewer
- System utilities
- Remote inspector link

## Query Device Information

Get comprehensive device details:

```bash
# Get device info (JSON)
curl -s http://<player-ip>:8008/GetDeviceInfo | jq .

# Example response:
{
  "model": "XD1035",
  "serial": "ABC123456789",
  "firmware": "9.1.35",
  "bootVersion": "9.1.35",
  "uptime": 3600,
  "temperature": 45,
  "voltage": 12.0,
  "network": {
    "ipAddress": "192.168.1.100",
    "macAddress": "00:11:22:33:44:55",
    "hostname": "brightsign-ABC123",
    "gateway": "192.168.1.1"
  },
  "storage": {
    "totalMB": 8192,
    "usedMB": 512,
    "freeMB": 7680
  }
}
```

**Key fields to check:**

- `firmware` - Ensure OS 9.x or later
- `uptime` - Low uptime may indicate crash loops
- `temperature` - High temp (>70°C) indicates cooling issues
- `storage.freeMB` - Low storage causes deployment failures

## Access Remote Inspector (Chrome DevTools)

Debug JavaScript in real-time using Chrome DevTools:

### Step 1: Enable Remote Debugging

Remote debugging is typically enabled by default in autorun.brs:

```brightscript
' In autorun.brs
htmlWidget.EnableRemoteDebugger(true)
```

### Step 2: Open Chrome DevTools

```bash
# Get inspector URL
curl http://<player-ip>:8008/inspector

# Or open directly in Chrome
open "chrome://inspect/#devices"
```

### Step 3: Configure DevTools

1. Open Chrome on your development machine
2. Navigate to `chrome://inspect`
3. Click "Configure..."
4. Add: `<player-ip>:8008`
5. Your React app should appear under "Remote Target"
6. Click "inspect" to open DevTools

### Step 4: Debug Application

Use DevTools as normal:

- **Console** - View console.log, errors, warnings
- **Sources** - Set breakpoints, step through code
- **Network** - Inspect API calls and resource loading
- **Performance** - Profile rendering and CPU usage
- **Memory** - Check for memory leaks

## View Player Logs

Access system logs for low-level diagnostics:

```bash
# Get logs (text format)
curl http://<player-ip>:8008/logs

# Or download logs
curl http://<player-ip>:8008/logs > player-logs.txt

# Filter for errors
curl http://<player-ip>:8008/logs | grep -i error
```

**Common log patterns:**

```
ERROR: Failed to load resource: net::ERR_FILE_NOT_FOUND
→ Missing asset file (check paths in index.html)

ERROR: Uncaught ReferenceError: React is not defined
→ Bundle dependency issue (check vendor chunks)

WARNING: Application Cache is deprecated
→ Ignore (BrightSign Chromium quirk)

INFO: HTML Widget started successfully
→ Good - widget initialized correctly
```

## Verify File Deployment

Check that files were uploaded correctly:

```bash
# List SD card contents
curl http://<player-ip>:8008/files?path=/sd:/

# Check specific file exists
curl -I http://<player-ip>:8008/files?path=/sd:/index.html

# Download file for inspection
curl http://<player-ip>:8008/files?path=/sd:/index.html > index.html

# Verify bundle integrity
curl http://<player-ip>:8008/files?path=/sd:/assets/index-abc123.js > bundle.js
sha256sum bundle.js
```

## Troubleshooting

See [troubleshooting guide](references/troubleshooting.md) for detailed diagnostics covering:

- White screen / blank display
- App crashes or restarts
- Assets not loading
- Network requests failing
- Performance degradation
- Debug overlay component
- Diagnostic scripts

## Resources

For more information:

- BrightSign OS 9.x Diagnostic Web Server API
- Chrome DevTools Protocol documentation
- BrightSign troubleshooting guides
