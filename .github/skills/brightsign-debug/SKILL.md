---
name: brightsign-debug
description: Debug BrightSign OS 9.x players using device info APIs, remote inspector, and diagnostic tools
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

## Common Issues and Solutions

### Issue: White Screen / Blank Display

**Symptoms:**

- Display shows nothing or white screen
- No errors in logs

**Diagnostic Steps:**

1. **Check if HTML widget is loading:**

   ```bash
   curl http://<player-ip>:8008/logs | grep "HTML Widget"
   # Should see: "HTML Widget started successfully"
   ```

2. **Verify autorun.brs:**

   ```bash
   curl http://<player-ip>:8008/files?path=/sd:/autorun.brs
   # Check file:///sd:/index.html path is correct
   ```

3. **Check JavaScript errors:**
   - Open remote inspector
   - Look for console errors
   - Common: Module load failures, syntax errors

**Solutions:**

- Ensure autorun.brs exists in SD card root
- Verify base path in Vite config is `'./'`
- Check all asset paths are relative
- Rebuild with production optimizations

### Issue: App Crashes or Restarts

**Symptoms:**

- App loads briefly then crashes
- Player reboots repeatedly
- Low uptime (<60 seconds)

**Diagnostic Steps:**

1. **Check uptime:**

   ```bash
   while true; do
     curl -s http://<player-ip>:8008/GetDeviceInfo | grep uptime
     sleep 5
   done
   # If uptime keeps resetting, app is crashing
   ```

2. **Monitor memory usage:**
   - Open remote inspector → Memory tab
   - Take heap snapshot
   - Look for memory leaks (growing heap)

3. **Check temperature:**
   ```bash
   curl -s http://<player-ip>:8008/GetDeviceInfo | grep temperature
   # >70°C indicates overheating
   ```

**Solutions:**

- Fix JavaScript errors causing crashes
- Reduce memory usage (smaller bundles, cleanup intervals)
- Improve ventilation if overheating
- Disable animations/transitions that tax CPU

### Issue: Assets Not Loading

**Symptoms:**

- Images show as broken
- CSS not applied
- JavaScript files 404

**Diagnostic Steps:**

1. **Check network tab in remote inspector:**
   - Look for 404 errors
   - Note which resources fail

2. **Verify asset paths:**

   ```bash
   # List deployed assets
   curl http://<player-ip>:8008/files?path=/sd:/assets/
   ```

3. **Check index.html:**
   ```bash
   curl http://<player-ip>:8008/files?path=/sd:/index.html
   # Verify <script src=> and <link href=> paths
   ```

**Solutions:**

- Use relative paths (not absolute `/` paths)
- Vite config: `base: './'` not `base: '/TheSignAge/'`
- Rebuild and redeploy with correct base path

### Issue: Network Requests Fail

**Symptoms:**

- API calls fail
- CORS errors in console
- fetch() returns network error

**Diagnostic Steps:**

1. **Check network connectivity:**

   ```bash
   # From player, ping external host
   ssh brightsign@<player-ip> "ping -c 3 8.8.8.8"
   ```

2. **Verify DNS resolution:**

   ```bash
   ssh brightsign@<player-ip> "nslookup api.example.com"
   ```

3. **Check firewall rules:**
   - Corporate networks may block outbound HTTP/HTTPS
   - Check with IT department

**Solutions:**

- Configure proxy settings in player network config
- Use local API endpoints on player (see #brightsign-package for Node.js server)
- Implement offline-first with cached data

### Issue: Performance Degradation

**Symptoms:**

- Slow rendering
- Choppy animations
- UI unresponsive

**Diagnostic Steps:**

1. **Profile with DevTools:**
   - Open remote inspector → Performance tab
   - Record 10 seconds of activity
   - Look for long tasks (>50ms)

2. **Check CPU usage:**
   - Look for JavaScript execution time
   - Identify expensive operations (re-renders, calculations)

3. **Monitor memory:**
   - Check for memory leaks (growing heap over time)
   - Look for detached DOM nodes

**Solutions:**

- Optimize React renders (React.memo, useMemo, useCallback)
- Reduce bundle size (code-splitting, lazy loading)
- Simplify animations (use CSS transforms, not layout changes)
- Implement virtual scrolling for long lists

## Debug Overlay Component

Add an on-screen debug overlay to your React app:

```typescript
// libs/shadcnui-signage/src/lib/behaviour/DebugOverlay.tsx

import { useEffect, useState } from 'react';

export function DebugOverlay() {
  const [visible, setVisible] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    // Toggle with Ctrl+Shift+D
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setVisible(v => !v);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Fetch device info
    fetch('http://localhost:8008/GetDeviceInfo')
      .then(r => r.json())
      .then(setDeviceInfo)
      .catch(console.error);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 text-white p-8 font-mono text-sm z-50">
      <h2 className="text-2xl mb-4">Debug Overlay (Ctrl+Shift+D to close)</h2>

      <div className="space-y-2">
        <p><strong>Version:</strong> {process.env.NX_APP_VERSION || 'unknown'}</p>
        <p><strong>Build Time:</strong> {process.env.NX_BUILD_TIME || 'unknown'}</p>
        <p><strong>Uptime:</strong> {deviceInfo?.uptime ? `${Math.floor(deviceInfo.uptime / 60)} minutes` : 'N/A'}</p>
        <p><strong>Model:</strong> {deviceInfo?.model || 'N/A'}</p>
        <p><strong>Firmware:</strong> {deviceInfo?.firmware || 'N/A'}</p>
        <p><strong>IP Address:</strong> {deviceInfo?.network?.ipAddress || 'N/A'}</p>
        <p><strong>Storage Free:</strong> {deviceInfo?.storage?.freeMB ? `${deviceInfo.storage.freeMB} MB` : 'N/A'}</p>
        <p><strong>Temperature:</strong> {deviceInfo?.temperature ? `${deviceInfo.temperature}°C` : 'N/A'}</p>
      </div>

      <div className="mt-4">
        <strong>Memory Usage:</strong>
        <pre className="mt-2 text-xs">
          {JSON.stringify(performance.memory, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## Diagnostic Scripts

Create helper scripts for common debug tasks:

**scripts/player-debug.sh:**

```bash
#!/bin/bash
# BrightSign player diagnostic script

PLAYER_IP="${1:-192.168.1.100}"

echo "=== BrightSign Diagnostics ==="
echo "Player IP: $PLAYER_IP"
echo ""

# 1. Check connectivity
echo "1. Checking connectivity..."
if curl -s --connect-timeout 5 http://$PLAYER_IP:8008/GetDeviceInfo > /dev/null; then
  echo "✓ Player is online"
else
  echo "✗ Cannot connect to player"
  exit 1
fi

# 2. Device info
echo ""
echo "2. Device Information:"
curl -s http://$PLAYER_IP:8008/GetDeviceInfo | jq '{model, serial, firmware, uptime, temperature, storage}'

# 3. Check deployed files
echo ""
echo "3. Deployed Files:"
curl -s http://$PLAYER_IP:8008/files?path=/sd:/ | jq '.files[] | .name'

# 4. Recent logs
echo ""
echo "4. Recent Errors:"
curl -s http://$PLAYER_IP:8008/logs | grep -i error | tail -10

# 5. Remote inspector
echo ""
echo "5. Remote Inspector:"
echo "Open: http://$PLAYER_IP:8008/inspector"
echo "Or: chrome://inspect (add $PLAYER_IP:8008)"

echo ""
echo "=== Diagnostics Complete ==="
```

Make it executable:

```bash
chmod +x scripts/player-debug.sh

# Run diagnostics
./scripts/player-debug.sh 192.168.1.100
```

## Resources

Reference files in this skill:

- [DebugOverlay.tsx](./DebugOverlay.tsx) - On-screen debug overlay component
- [player-debug.sh](./player-debug.sh) - Diagnostic script
- [common-issues.md](./common-issues.md) - Extended troubleshooting guide

For more information:

- BrightSign OS 9.x Diagnostic Web Server API
- Chrome DevTools Protocol documentation
- BrightSign troubleshooting guides
