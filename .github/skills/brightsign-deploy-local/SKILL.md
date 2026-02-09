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
- BrightSign diagnostic web server enabled (default: port 8008)
- Packaged app (see #brightsign-package skill)

## BrightSign OS 9.x Diagnostic API

BrightSign players expose a web-based API on port 8008 for:

- File uploads
- Device information queries
- Remote diagnostics
- Player reboot commands

**Base URL:** `http://<player-ip>:8008`

### Available Endpoints

- `GET /` - Diagnostic web interface (browser access)
- `GET /GetDeviceInfo` - Device details (model, serial, firmware)
- `POST /upload` - Upload files to player storage
- `GET /reboot` - Reboot the player
- `GET /logs` - Retrieve system logs
- `GET /inspector` - Chrome DevTools remote debugging

## Step 1: Find Player IP Address

### Method 1: Player Menu (Manual)

1. On the player, press the physical button sequence to access menu
2. Navigate to Network → Status
3. Note the IP address (e.g., 192.168.1.100)

### Method 2: Network Scan (Automated)

```bash
# Scan local network for BrightSign players (port 8008)
nmap -p 8008 192.168.1.0/24 | grep -B 4 "8008/tcp open"

# Or using curl (faster for known subnet)
for i in {1..254}; do
    (curl -s --connect-timeout 1 http://192.168.1.$i:8008/GetDeviceInfo > /dev/null && echo "192.168.1.$i") &
done
wait
```

### Method 3: Check Router DHCP Leases

- Log into your router admin interface
- Check DHCP client list for "BrightSign" hostname
- Note assigned IP address

## Step 2: Verify Player Accessibility

Test the diagnostic API:

```bash
# Get device info
curl http://<player-ip>:8008/GetDeviceInfo

# Expected response (JSON):
# {
#   "model": "XD1035",
#   "serial": "ABC123456789",
#   "firmware": "9.1.35",
#   "uptime": 3600
# }
```

If this fails:

- Check firewall rules (allow port 8008)
- Verify player is on same subnet
- Ensure diagnostic web server is enabled in player settings

## Step 3: Upload Package to Player

Upload your packaged app to the player's SD card:

```bash
# Package location (from brightsign-package skill)
PACKAGE_ZIP="dist/player-minimal-deploy.zip"
PLAYER_IP="192.168.1.100"

# Upload via multipart form POST
curl -X POST \
  -F "file=@${PACKAGE_ZIP}" \
  -F "path=/sd:/" \
  http://${PLAYER_IP}:8008/upload

# Expected response:
# {"status": "success", "message": "File uploaded to /sd:/"}
```

**Upload options:**

- Path: `/sd:/` for root directory
- Overwrite: Existing files are replaced automatically
- Max size: Typically 100MB per upload

## Step 4: Extract Package (if needed)

If you uploaded a zip file, extract it on the player:

```bash
# Trigger extraction via SSH (if enabled)
ssh brightsign@${PLAYER_IP} "cd /sd:/ && unzip -o player-minimal-deploy.zip"

# Or use the diagnostic API extraction endpoint (if available)
curl -X POST \
  http://${PLAYER_IP}:8008/extract \
  -d '{"file": "/sd:/player-minimal-deploy.zip", "dest": "/sd:/"}'
```

**Alternative:** Upload files individually (slower but more reliable):

```bash
# Upload each file separately
for file in dist/brightsign-package/*; do
    curl -X POST \
      -F "file=@${file}" \
      -F "path=/sd:/" \
      http://${PLAYER_IP}:8008/upload
done
```

## Step 5: Reboot Player

Trigger a reboot to start the new app:

```bash
# Reboot via diagnostic API
curl http://${PLAYER_IP}:8008/reboot

# Player will restart in ~10-15 seconds
# App should auto-launch via autorun.brs
```

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
