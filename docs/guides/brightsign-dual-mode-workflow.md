# BrightSign Development & Deployment Guide

This guide covers **two deployment modes** for BrightSign players: fast development iteration and production deployment.

---

## Prerequisites

**Before using this guide**, ensure your BrightSign player is set up and connected to your network:

📖 **[BrightSign Initial Setup Guide](./brightsign-initial-setup.md)** - Complete player setup from scratch

**Required**:

- ✅ Player configured with BrightAuthor:connected setup
- ✅ Player on network with known IP address
- ✅ Local Diagnostic Web Server (LDWS) enabled
- ✅ Admin credentials set (username: `admin`, password: your secure password)
- ✅ Player added to `.brightsign/players.json` configuration

**Quick verification**:

```bash
# Test player connectivity
curl --digest -u admin:YOUR_PASSWORD -k https://PLAYER_IP/api/v1/files/sd/

# Should return JSON with SD card contents
```

---

## Table of Contents

1. [Development Mode (Network Loading)](#development-mode-network-loading)
2. [Production Mode (SD Card Deployment)](#production-mode-sd-card-deployment)
3. [Player Configuration](#player-configuration)
4. [Remote Debugging](#remote-debugging)
5. [Troubleshooting](#troubleshooting)

---

## Development Mode (Network Loading)

**Best for**: Rapid iteration during development  
**Speed**: Edit → Save → Refresh (< 5 seconds)  
**Requirements**: Player and dev machine on same network

### How It Works

The player loads your React app directly from your Vite dev server over the network:

```
Player → http://YOUR_DEV_MACHINE_IP:5173 → Vite Dev Server
```

No build, package, or upload needed. Just save your code and refresh the page on the player display.

### One-Time Setup

1. **Edit the dev-mode autorun.brs**:

   ```bash
   # Open tools/brightsign-test-files/autorun-dev.brs
   # Change DEV_SERVER_IP to your machine's LAN IP
   ```

2. **Deploy dev-mode bootstrap to player**:

   ```bash
   pnpm deploy:dev-mode
   ```

Notes:

- `deploy:dev-mode` verifies HTTPS certificates by default.
- For a trusted local certificate, set `BRIGHTSIGN_CA_CERT=/path/to/player-ca.pem`.
- For a one-off local development exception with a self-signed cert, set `BRIGHTSIGN_TLS_INSECURE=1`.

3. **Start your dev server** (binds to network):

   ```bash
   pnpm dev:brightsign
   ```

4. **Player will automatically load** from your dev server

### Daily Development Workflow

```bash
# Terminal 1: Start dev server
pnpm dev:brightsign

# Terminal 2: Make changes to your React app
# Player refreshes when you save (in most cases)
```

### What Gets Loaded

- **From your dev machine**: All React code, components, assets
- **From player SD card**: Only the tiny autorun.brs bootstrap

### Advantages

✅ **Instant feedback** - See changes in ~2 seconds  
✅ **Hot Module Replacement** - May work depending on Chromium version  
✅ **Remote debugging** - Full Chrome DevTools access  
✅ **Real hardware testing** - Test on actual BrightSign, not just browser

### Limitations

⚠️ **Requires network** - Player and dev machine must be on same LAN  
⚠️ **Not for production** - Dev server must stay running  
⚠️ **Inspector overhead** - Uses more memory, only enable during dev

---

## Production Mode (SD Card Deployment)

**Best for**: Final deployment, fleet updates, production content  
**Speed**: Build → Package → Upload → Reboot (~2-3 minutes)  
**Requirements**: None (works offline once deployed)

### Full Deployment Workflow (Normal Development)

**Always use this when you've changed source code:**

```bash
# Build, package, and deploy in one command
pnpm deploy:player
```

This runs:

1. `nx build player-minimal` - Build React app
2. Package into BrightSign-compatible structure
3. Upload all files via LDWS API
4. Reboot player to load new content

### Quick Re-upload (Advanced - Rarely Needed)

**Only use this if package is already current and you just want to re-upload:**

```bash
# Deploy existing package without rebuilding
# ⚠️ If you changed source code, this will NOT include your changes!
pnpm deploy:local
```

The script will warn you if source files are newer than the package.

### Ultra-Fast Deployment (Direct Upload)

Uses curl directly without ZIP packaging:

```bash
# Upload files directly from dist/
pnpm deploy:quick
```

Notes:

- `deploy:quick` verifies HTTPS certificates by default.
- For a trusted local certificate, set `BRIGHTSIGN_CA_CERT=/path/to/player-ca.pem`.
- For a one-off local development exception with a self-signed cert, set `BRIGHTSIGN_TLS_INSECURE=1`.

### Manual Deployment Steps

For more control:

```bash
# 1. Build the app
nx build player-minimal

# 2. Package for BrightSign
pnpm package:player

# 3. Deploy to player
pnpm deploy:local
```

### What Gets Deployed

- `autorun.brs` - BrightScript bootstrap
- `index.html` - Entry point
- `assets/` - JavaScript bundles, CSS, fonts
- `manifest.json`, `favicon.ico` - PWA assets

### Advantages

✅ **Production-ready** - Minified, optimized bundles  
✅ **Offline operation** - Works without network  
✅ **Fleet deployment** - Can deploy to multiple players  
✅ **Versioned releases** - Packages stored in `dist/packages/`

---

## Player Configuration

### Adding New Players

```bash
# Add a player (interactive)
pnpm player add <name> <ip>

# Add with options
pnpm player add lab-player 192.168.1.100 --port 443 --model CL435
```

### Listing Players

```bash
pnpm player list
```

### Configuration File

Players are stored in `.brightsign/players.json` (gitignored):

```json
{
  "players": [
    {
      "name": "dev-player",
      "ip": "192.168.0.51",
      "port": 443,
      "username": "admin",
      "password": "your-password",
      "model": "CL435",
      "tags": ["dev", "office"]
    }
  ],
  "default": "dev-player"
}
```

### Important Security Notes

- **Credentials stored locally** - `.brightsign/players.json` is in `.gitignore`
- **Never commit credentials** - Use environment variables for CI/CD
- **Digest authentication required** - BrightSign uses HTTP Digest, not Basic Auth
- **Self-signed certificates** - HTTPS uses self-signed certs (expected and safe for LAN)

---

## Remote Debugging

### Enable Inspector

Already enabled in dev-mode autorun.brs. The production bootstrap does not expose the inspector:

```brightscript
inspector_server: { port: 2999 }
```

### Access Chrome DevTools

1. Open Chrome/Edge on your dev machine
2. Navigate to: `chrome://inspect/devices`
3. Click "Configure..." and add: `PLAYER_IP:2999`
4. Click "inspect" when your player appears

### What You Can Debug

- Console logs
- DOM inspection
- Network requests
- JavaScript breakpoints
- Performance profiling

### Important Notes

⚠️ **Development only** - Inspector increases memory usage  
⚠️ **Security risk** - Exposes player internals over network  
⚠️ **Production default** - `apps/player-minimal/public/autorun.brs` keeps inspector access disabled

---

## Troubleshooting

### Player Not Found / Connection Refused

**Symptoms**: `Cannot reach player at 192.168.0.51`

**Solutions**:

1. Verify player is on and connected to network
2. Check IP address hasn't changed (DHCP)
3. Try different ports: `443`, `80`, `8008`, `8080`
4. Check firewall isn't blocking connections
5. Verify LDWS is enabled in player settings

### 401 Unauthorized

**Symptoms**: `HTTP 401: Unauthorized`

**Solutions**:

1. Verify credentials in `.brightsign/players.json`
2. Check you're using correct case (e.g., `admin` not `Admin`)
3. Verify password doesn't have trailing spaces
4. Remember: BrightSign uses **digest auth**, not basic auth

### SSL Certificate Errors

**Symptoms**: `self-signed certificate` errors

**Expected behavior**: BrightSign often uses self-signed HTTPS certificates for local communication.

**Solutions**:

- Prefer trusting the player certificate locally and using `BRIGHTSIGN_CA_CERT=/path/to/player-ca.pem pnpm deploy:dev-mode`
- For a one-off local development exception, use `BRIGHTSIGN_TLS_INSECURE=1 pnpm deploy:dev-mode`
- If manually testing in a terminal, use `curl --cacert /path/to/player-ca.pem ...` when possible

### Dev Server Not Accessible From Player

**Symptoms**: Player shows blank screen or "cannot connect"

**Solutions**:

1. Verify dev server binds to network: `pnpm dev:brightsign`
2. Check firewall allows connections on port 5173
3. Verify dev machine IP in autorun-dev.brs is correct
4. Test from another device: `http://YOUR_IP:5173`

### Files Upload But Player Shows Nothing

**Symptoms**: Upload succeeds but screen is black

**Solutions**:

1. Check player rebooted successfully
2. Verify autorun.brs exists on SD card
3. Check LDWS logs for errors
4. Try manual reboot via web interface
5. Verify HTML content is valid

### HMR / Hot Reload Not Working

**Expected**: Hot Module Replacement may not work perfectly on BrightSign Chromium.

**Workaround**: Manual page refresh is more reliable. Use remote debugging to refresh page.

---

## Quick Reference

### Development Mode Commands

```bash
pnpm dev:brightsign           # Start dev server (network accessible)
pnpm deploy:dev-mode          # Upload dev-mode bootstrap (once)
```

### Production Deployment Commands

```bash
pnpm deploy:player            # Full build + package + deploy
pnpm deploy:local             # Deploy existing package
pnpm deploy:quick             # Fast deploy (no package)
```

For `deploy:quick`, TLS verification is on by default. Use `BRIGHTSIGN_CA_CERT` for trusted local certs or `BRIGHTSIGN_TLS_INSECURE=1` only as a one-off development exception.

### Player Management Commands

```bash
pnpm player list              # List configured players
pnpm player add <name> <ip>   # Add new player
pnpm player remove <name>     # Remove player
```

### Discovery Commands

```bash
pnpm discover:scan            # Scan network for players
pnpm discover:probe --ip <ip> # Test specific IP
```

---

## Workflow Recommendations

### During Active Development

Use **development mode** for maximum speed:

```bash
# One-time setup
pnpm deploy:dev-mode

# Daily workflow
pnpm dev:brightsign
# Make changes, save, refresh player
```

### Before Committing / Testing

Deploy to **production mode** to verify build works:

```bash
pnpm deploy:player
```

### For Production / Fleet Deployment

Use **full deployment**:

```bash
pnpm deploy:player
```

Or create a release and deploy via BSN.cloud for fleet-wide updates.

---

## Additional Resources

- [BrightSign HTML5 State Documentation](https://docs.brightsign.biz/user-guides/html5-state)
- [BrightSign Debugging Webpages](https://docs.brightsign.biz/developers/debugging-webpages)
- [BrightSign LDWS REST API](https://docs.brightsign.biz/developers/ldws-rest-api)

---

**Last Updated**: 2026-03-07
