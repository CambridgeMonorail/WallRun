# Diagnostic Commands Reference

BrightSign players expose two diagnostic interfaces:

- **DWS** (port 8008, HTTP) — unauthenticated, browser-friendly. Commands below use this port.
- **LDWS** (port 443, HTTPS, digest auth) — used by `scripts/deploy-local.mjs` for REST API operations.

For interactive debugging, DWS on port 8008 is typically the easiest path. For scripted/automated access, the LDWS on port 443 is preferred (see `brightsign-deploy-local` skill).

## Find Player IP Address

### Method 1: Network Scan

```bash
# Scan for BrightSign diagnostic servers (port 8008)
nmap -p 8008 --open 192.168.1.0/24

# Faster script
for i in {1..254}; do
  timeout 1 bash -c "echo > /dev/tcp/192.168.1.$i/8008" 2>/dev/null && echo "192.168.1.$i"
done
```

### Method 2: mDNS/Bonjour Discovery

```bash
# On macOS/Linux with avahi
avahi-browse -t _http._tcp | grep BrightSign
```

## Query Device Information

```bash
# Get device info (JSON)
curl -s http://<player-ip>:8008/GetDeviceInfo | jq .

# Example response:
# {
#   "model": "XD1035",
#   "serial": "ABC123456789",
#   "firmware": "9.1.35",
#   "uptime": 3600,
#   "temperature": 45,
#   "network": {
#     "ipAddress": "192.168.1.100",
#     "macAddress": "00:11:22:33:44:55"
#   },
#   "storage": {
#     "totalMB": 8192,
#     "usedMB": 512,
#     "freeMB": 7680
#   }
# }
```

**Key fields to check:**

| Field            | Concern                                |
| ---------------- | -------------------------------------- |
| `firmware`       | Must be OS 9.x or later                |
| `uptime`         | Low uptime may indicate crash loops    |
| `temperature`    | >70°C indicates cooling issues         |
| `storage.freeMB` | Low storage causes deployment failures |

## Remote Inspector (Chrome DevTools)

The JavaScript inspector runs on **port 2999** (separate from DWS on 8008). It is enabled in the dev-mode autorun.brs via the `inspector_server` config; the production bootstrap does not expose it.

### Step 1: Enable Remote Debugging

Enabled in dev-mode autorun.brs:

```brightscript
inspector_server: { port: 2999 }
```

### Step 2: Configure Chrome DevTools

1. Open Chrome on your development machine
2. Navigate to `chrome://inspect`
3. Click "Configure..."
4. Add: `<player-ip>:2999`
5. Your React app should appear under "Remote Target"
6. Click "inspect" to open DevTools

### Step 3: Use DevTools

- **Console** — view errors, warnings, console.log output
- **Sources** — set breakpoints, step through code
- **Network** — inspect API calls and resource loading
- **Performance** — profile rendering and CPU usage
- **Memory** — check for memory leaks

## View Player Logs

```bash
# Get logs
curl http://<player-ip>:8008/logs

# Download logs
curl http://<player-ip>:8008/logs > player-logs.txt

# Filter for errors
curl http://<player-ip>:8008/logs | grep -i error
```

**Common log patterns:**

| Log                                                       | Meaning                            |
| --------------------------------------------------------- | ---------------------------------- |
| `ERROR: Failed to load resource: net::ERR_FILE_NOT_FOUND` | Missing asset file — check paths   |
| `ERROR: Uncaught ReferenceError: React is not defined`    | Bundle dependency issue            |
| `WARNING: Application Cache is deprecated`                | Ignore (BrightSign Chromium quirk) |
| `INFO: HTML Widget started successfully`                  | Widget initialized correctly       |

## Verify File Deployment

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
