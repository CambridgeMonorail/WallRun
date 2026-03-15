# Local Deploy API Reference

## BrightSign OS 9.x LDWS REST API

BrightSign OS 9.x players expose a REST API on **port 443 (HTTPS)** for file management, status queries, and reboot control.

**Base URL:** `https://<player-ip>:443` (self-signed cert, use `-k` with curl)

**Authentication:** HTTP Digest (username: `admin`, password set during setup)

### Available Endpoints

| Endpoint                           | Method | Purpose                                                       |
| ---------------------------------- | ------ | ------------------------------------------------------------- |
| `/api/v1/info/`                    | GET    | Player information (model, serial, firmware, uptime, network) |
| `/api/v1/files/sd/`                | GET    | List SD card contents                                         |
| `/api/v1/files/sd/`                | PUT    | Upload files to SD card (form data)                           |
| `/api/v1/files/download/sd/<path>` | GET    | Download file from SD card                                    |
| `/api/v1/files/sd/<path>`          | DELETE | Delete file from SD card                                      |
| `/api/v1/control/reboot`           | PUT    | Reboot the player                                             |

Chrome DevTools Inspector: `http://<player-ip>:2999` (if enabled in autorun.brs)

### Connectivity Check Strategy

- **Primary**: Use `/api/v1/files/sd/` — tests what you actually need (authenticated file access)
- **Optional**: Use `/api/v1/info/` for richer diagnostics (model, serial, firmware)
- **Resilience**: Don't fail deployment if info endpoint is unavailable during transient states (reboot)

### Verify Player Accessibility

```bash
# Primary check: List SD card contents (tests authenticated file access)
curl -k --digest -u admin:YOUR_PASSWORD https://<player-ip>:443/api/v1/files/sd/

# Expected response (JSON):
# {
#   "data": {
#     "result": {
#       "files": [
#         {"name": "autorun.brs", "type": "file", "size": 2398},
#         {"name": "index.html", "type": "file", "size": 540}
#       ]
#     }
#   }
# }

# Optional: Get player info for diagnostics
curl -k --digest -u admin:YOUR_PASSWORD https://<player-ip>:443/api/v1/info/

# Expected response:
# {
#   "data": {
#     "result": {
#       "serial": "C5D51K000056",
#       "model": "CL435",
#       "FWVersion": "9.1.92",
#       "upTime": "5 minutes"
#     }
#   }
# }
```

If this fails:

- Check credentials (password is case-sensitive)
- Ensure you're using `--digest` flag (not basic auth)
- Ensure `-k` flag is present (ignores self-signed certificate)
- Verify LDWS is enabled in BrightAuthor:connected setup
- Player may be rebooting (wait 30-60 seconds and retry)

## Manual Upload (Advanced/Debugging)

For troubleshooting or when automation fails, use curl directly:

```bash
PACKAGE_ZIP="dist/player-minimal-deploy.zip"
PLAYER_IP="192.168.1.100"
PASSWORD="your-password"

# Extract ZIP locally
unzip $PACKAGE_ZIP -d extracted/

# Upload each file via REST API
for file in extracted/**/*; do
  if [ -f "$file" ]; then
    rel_path=${file#extracted/}
    dir_path=$(dirname "$rel_path")

    if [ "$dir_path" = "." ]; then
      curl -k --digest -u "admin:$PASSWORD" -X PUT \
        -F "file=@$file" \
        "https://$PLAYER_IP:443/api/v1/files/sd/"
    else
      curl -k --digest -u "admin:$PASSWORD" -X PUT \
        -F "file=@$file" \
        "https://$PLAYER_IP:443/api/v1/files/sd/$dir_path/"
    fi
    echo "Uploaded: $rel_path"
  fi
done

rm -rf extracted/
```

**Notes:**

- Each file is uploaded individually (no bulk upload endpoint)
- Directory structure is preserved via endpoint path
- `-k` ignores self-signed certificate errors
- `--digest` required for HTTP Digest authentication
- Use PUT method with `-F "file=@filename"`

## Reboot Player

```bash
# Reboot via REST API (requires digest auth)
curl -k --digest -u "admin:$PASSWORD" -X PUT \
  "https://$PLAYER_IP:443/api/v1/control/reboot"

# Player will restart in ~30-60 seconds
# App should auto-launch via autorun.brs
```

## Verify Deployment

```bash
# 1. Check device uptime (should be low after reboot)
curl -k --digest -u admin:$PASSWORD https://$PLAYER_IP:443/api/v1/info/ | grep uptime

# 2. Open remote inspector (Chrome DevTools)
# Open in Chrome: http://<player-ip>:2999

# 3. View player logs
curl -k --digest -u admin:$PASSWORD https://$PLAYER_IP:443/api/v1/info/
```
