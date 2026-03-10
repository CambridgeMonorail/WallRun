---
name: brightsign-deploy-local
description: Deploy React apps to local BrightSign OS 9.x players via HTTP API for rapid development iteration
---

# BrightSign Local Deploy Skill

Deploy packaged React applications to BrightSign OS 9.x players on your local network via HTTP API.

## When to Use This Skill

Use this skill when you need to:

- Deploy to a development/test player during active development
- Iterate quickly with "build → deploy → test" cycles
- Upload app packages via network (no SD card swapping)
- Trigger player reboots programmatically
- Test on real hardware before fleet release

## Prerequisites

- BrightSign player on same network as development machine
- Player IP address (find via network scan or player menu)
- BrightSign Local Diagnostic Web Server (LDWS) enabled
  - **Port 443 (HTTPS)** with self-signed certificate
  - **HTTP Digest Authentication** required (username: `admin`)
- Packaged app (see #brightsign-package skill)

## BrightSign OS 9.x LDWS REST API

BrightSign OS 9.x players expose a REST API on **port 443 (HTTPS)** for:

- File uploads/downloads
- SD card file management
- Player reboot commands
- Remote debugging (Chrome DevTools on port 2999)

**Base URL:** `https://<player-ip>:443` (self-signed cert, use `-k` with curl)

**Authentication:** HTTP Digest (username: `admin`, password set during setup)

### Available Endpoints

- `GET /api/v1/info/` - Player information (model, serial, firmware, uptime, network)
- `GET /api/v1/files/sd/` - List SD card contents
- `PUT /api/v1/files/sd/` with form data - Upload files to SD card
- `GET /api/v1/files/download/sd/<path>` - Download file from SD card
- `DELETE /api/v1/files/sd/<path>` - Delete file from SD card
- `PUT /api/v1/control/reboot` - Reboot the player
- Chrome DevTools Inspector: `http://<player-ip>:2999` (if enabled in autorun.brs)

**Pragmatic recommendation for connectivity checks:**

- Primary: Use `/api/v1/files/sd/` - tests what you actually need (authenticated file access)
- Optional: Use `/api/v1/info/` for richer diagnostics (model, serial, firmware)
- Don't fail deployment if info endpoint is unavailable during transient states (reboot)

## Step 1: Find Player IP Address

### Method 1: Player Menu (Manual)

1. On the player, press the physical button sequence to access menu
2. Navigate to Network → Status
3. Note the IP address (e.g., 192.168.1.100)

### Method 2: Network Scan (Automated)

```bash
# Scan local network for BrightSign LDWS (port 443)
nmap -p 443 192.168.1.0/24

# Or try known IPs with curl
for i in {1..254}; do
    (curl -k --digest -u admin:password -s --connect-timeout 1 \
      https://192.168.1.$i:443/api/v1/files/sd/ > /dev/null 2>&1 && \
      echo "Found player at 192.168.1.$i") &
done
wait
```

### Method 3: Check Router DHCP Leases

- Log into your router admin interface
- Check DHCP client list for "BrightSign" hostname
- Note assigned IP address

## Step 2: Verify Player Accessibility

Test the LDWS REST API:

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

## Step 3: Choose Your Deployment Method

### Automated Deployment (Recommended)

**CRITICAL:** Choose the right command based on what changed:

| Command              | When to Use                                  | What It Does                            |
| -------------------- | -------------------------------------------- | --------------------------------------- |
| `pnpm deploy:player` | **After changing source code** (most common) | Rebuilds → Packages → Uploads → Reboots |
| `pnpm deploy:local`  | Package already built, just re-upload (rare) | Uploads existing package → Reboots      |

**For normal development workflow:** Always use `pnpm deploy:player`

```bash
# This is what you want 99% of the time
pnpm deploy:player
```

The script will:

1. Detect if package is stale and warn you
2. Build the app (if using deploy:player)
3. Package with autorun.brs
4. Upload to configured player
5. Reboot player

**Why this matters:** `deploy:local` does NOT rebuild your app. If you changed source code and use `deploy:local`, your changes won't be deployed. The script now detects this and warns you.

### Manual Upload (Advanced/Debugging)

For troubleshooting or when automation fails, use curl directly:

Upload your packaged app to the player's SD card using the LDWS REST API:

```bash
# Package location (from brightsign-package skill)
PACKAGE_ZIP="dist/player-minimal-deploy.zip"
PLAYER_IP="192.168.1.100"
PASSWORD="your-password"

# Extract ZIP locally
unzip $PACKAGE_ZIP -d extracted/

# Upload each file via REST API
for file in extracted/**/*; do
  if [ -f "$file" ]; then
    # Get relative path
    rel_path=${file#extracted/}
    dir_path=$(dirname "$rel_path")

    # Upload with digest auth
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

# Clean up
rm -rf extracted/
```

**Important notes:**

- Each file is uploaded individually (no bulk upload endpoint)
- Directory structure is preserved via endpoint path
- `-k` flag ignores self-signed certificate errors
- `--digest` flag required for HTTP Digest authentication
- Use PUT method with `-F "file=@filename"`

## Step 4: Reboot Player

After uploading all files, reboot the player to run the new autorun.brs:

````bash
# Upload each file separately
## Step 4: Reboot Player

After uploading all files, reboot the player to run the new autorun.brs:

```bash
# Reboot via REST API (requires digest auth)
curl -k --digest -u "admin:$PASSWORD" -X PUT \
  "https://$PLAYER_IP:443/api/v1/control/reboot"

# Player will restart in ~30-60 seconds
# App should auto-launch via autorun.brs
````

**Reboot wait:**

```bash
# Wait for player to come back online
sleep 15

# Verify player is back
curl http://${PLAYER_IP}:8008/GetDeviceInfo
```

## Step 6: Verify Deployment

Check that the app is running correctly:

```bash
# 1. Check device uptime (should be low after reboot)
curl http://${PLAYER_IP}:8008/GetDeviceInfo | grep uptime

# 2. Open remote inspector (Chrome DevTools)
# Open in Chrome: http://<player-ip>:8008/inspector
# Connect to your React app to see console output

# 3. View player logs
curl http://${PLAYER_IP}:8008/logs
```

## Automated Deploy Script

Create a Node.js script for automated deployment:

**scripts/deploy-local.ts:**

```typescript
#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import readline from 'readline';

const execAsync = promisify(exec);

async function deployLocal() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt: string): Promise<string> => new Promise((resolve) => rl.question(prompt, resolve));

  try {
    // Get player IP
    const playerIp = await question('Enter player IP address: ');

    // Verify player is accessible
    console.log('Verifying player connectivity...');
    await execAsync(`curl -s --connect-timeout 5 http://${playerIp}:8008/GetDeviceInfo`);
    console.log('✓ Player is online');

    // Build the app
    console.log('Building player-minimal app...');
    await execAsync('nx build player-minimal --prod');
    console.log('✓ Build complete');

    // Package the app
    console.log('Creating deployment package...');
    await execAsync('./scripts/package-player.sh');
    console.log('✓ Package created');

    // Upload to player
    console.log(`Uploading to player at ${playerIp}...`);
    await execAsync(`curl -X POST -F "file=@dist/player-minimal-deploy.zip" -F "path=/sd:/" http://${playerIp}:8008/upload`);
    console.log('✓ Upload complete');

    // Reboot player
    console.log('Rebooting player...');
    await execAsync(`curl -s http://${playerIp}:8008/reboot`);
    console.log('✓ Reboot initiated');

    console.log('\nDeployment complete!');
    console.log(`View remote inspector: http://${playerIp}:8008/inspector`);
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

deployLocal();
```

**Add to package.json:**

```json
{
  "scripts": {
    "deploy:local": "ts-node scripts/deploy-local.ts",
    "deploy:local:watch": "nodemon --watch apps/player-minimal/src --exec 'pnpm deploy:local'"
  }
}
```

## Watch Mode for Development

Enable automatic redeployment on file changes:

```bash
# Start watch mode
pnpm deploy:local:watch --ip=192.168.1.100

# On every save in apps/player-minimal/src:
# 1. Rebuild app
# 2. Package files
# 3. Upload to player
# 4. Reboot player
# 5. Ready to test in ~30 seconds
```

## Troubleshooting

### Connection refused or endpoint not responding

**Cause:** Player is rebooting or LDWS temporarily unavailable
**Solution:**

- Wait 30-60 seconds after reboot for LDWS to start
- `/api/v1/info/` may be unavailable during transient states
- Use `/api/v1/files/sd/` as primary connectivity check (more reliable)
- Player responds to ping before LDWS is fully ready

### Upload fails with "Connection refused"

**Cause:** Diagnostic web server not enabled
**Solution:**

- Access player menu
- Enable "Diagnostic Web Server" in settings
- Reboot player

### Upload succeeds but app doesn't start

**Cause:** Missing or incorrect autorun.brs
**Solution:**

- Verify autorun.brs is in package root
- Check file:///sd:/index.html path in autorun.brs
- View logs: `curl http://<player-ip>:8008/logs`

### Player reboot hangs

**Cause:** Player may be busy writing to storage
**Solution:**

- Wait 30 seconds
- If still hung, power cycle player manually
- Check logs after restart

### Can't find player IP

**Cause:** Player on different subnet or DHCP not configured
**Solution:**

- Use static IP in player network settings
- Check router DHCP reservations
- Connect player directly to dev machine (crossover)

### Files upload but overwrite fails

**Cause:** Player storage is full
**Solution:**

- Check storage: `curl http://<player-ip>:8008/GetDeviceInfo` (look for storage stats)
- Delete old files via SSH or diagnostic API
- Use smaller bundles (see #brightsign-package optimization tips)

## Resources

Reference scripts in this skill:

- [deploy-local.ts](./deploy-local.ts) - Full deployment script
- [find-players.sh](./find-players.sh) - Network discovery script
- [verify-deployment.sh](./verify-deployment.sh) - Post-deploy checks

For more information:

- BrightSign OS 9.x Diagnostic Web Server API documentation
- BrightSign network configuration guide
