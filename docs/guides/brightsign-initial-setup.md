# BrightSign Player Initial Setup Guide

This guide walks you through setting up a BrightSign player from scratch for local development and deployment.

---

## Prerequisites

- **BrightSign Player** (e.g., CL435, XD1034, etc.)
- **Blank microSD card** (4GB+ recommended)
- **Computer with BrightAuthor:connected** installed
- **Local network** (Ethernet recommended for initial setup)
- **Display** (HDMI monitor/TV)

---

## Overview

The setup process has three main steps:

1. **Create a Setup in BrightAuthor:connected** - Configure network and diagnostics
2. **Boot the player with Setup SD card** - Player auto-configures
3. **Verify connectivity and API access** - Test LDWS REST API

---

## Step 1: Create Setup in BrightAuthor:connected

### 1.1 Open BrightAuthor:connected

Launch BrightAuthor:connected on your computer (download from brightsign.biz if needed).

### 1.2 Create a New Setup

1. Go to **File** → **New** → **Setup**
2. Select your player model (e.g., CL435)
3. Choose **Local Network** as the publishing mode

### 1.3 Configure Network Settings

**In the Network tab:**

1. **Connection Type**: Select **Ethernet (DHCP)**
   - This lets the player automatically get an IP from your router
   - Alternatively, use Static IP if you need a fixed address

2. **Enable Local Web Server**: ✅ Check this box
   - Required for BrightAuthor:connected publishing
   - Allows you to publish content over the network

### 1.4 Enable Local Diagnostic Web Server (LDWS)

**This is critical for REST API access and our deployment scripts.**

**In the Diagnostic Web Server tab:**

1. **Enable Diagnostic Web Server**: ✅ Check this box

2. **Set Authentication**:
   - Username: `admin` (always, cannot be changed)
   - Password: Choose a **strong password** (BrightSign enforces complexity rules)

   **Password Requirements**:
   - Minimum 8 characters
   - Must include: uppercase, lowercase, number, special character
   - Example: `BrightSign23!`

3. **Enable REST API**: ✅ Make sure this is enabled
   - This allows programmatic access via curl/scripts

### 1.5 Optional: Additional Settings

**Security Settings**:

- **Enable JavaScript Console** (for development only)
- **Enable Web Inspector** on port 2999 only if you are actively using the development bootstrap

⚠️ **Warning**: Only enable inspector for development. It increases memory usage and creates a security risk in production.

**Display Settings**:

- Configure rotation if using portrait orientation
- Set video mode (usually Auto is fine)

### 1.6 Save Setup to SD Card

1. Insert your **blank microSD card** into your computer
2. In BrightAuthor:connected, click **Publish**
3. Select **Setup** as the target
4. Choose the SD card drive
5. Click **Publish** to write the setup to the card

**What gets written**:

- `setup.bsfw` - Setup configuration file
- Required system files

---

## Step 2: Boot Player with Setup SD Card

### 2.1 Insert SD Card and Power On

1. **Power off the player** (if it's on)
2. **Insert the microSD card** with setup files
3. **Connect Ethernet cable** to your network
4. **Connect HDMI cable** to display
5. **Power on the player**

### 2.2 Setup Process

The player will:

1. **Read the setup** from the SD card (~10 seconds)
2. **Apply network configuration** (DHCP request)
3. **Display the IP address** on screen

**Expected screen output**:

```
BrightSign Setup Complete
IP Address: 192.168.0.51
Network: Connected (Ethernet)
```

**Note the IP address** - you'll need this for all future deployments!

### 2.3 Verify Network Connectivity

From your dev machine, ping the player:

```bash
ping 192.168.0.51
```

You should see replies confirming network connectivity.

---

## Step 3: Verify LDWS API Access

### 3.1 Test Web Interface

1. Open a browser and go to: `https://PLAYER_IP/`
   - Example: `https://192.168.0.51/`

2. You'll see a **certificate warning** (expected - BrightSign uses self-signed certificates)
   - Click "Advanced" → "Proceed to 192.168.0.51 (unsafe)"
   - This is safe on a local network

3. **Log in** with your credentials:
   - Username: `admin`
   - Password: (what you set in BrightAuthor:connected)

4. You should see the **BrightSign Diagnostic Web Server** interface
   - Player info, logs, screenshots, controls

### 3.2 Test REST API Access

**From terminal** (bash/PowerShell):

```bash
curl --digest -u admin:YOUR_PASSWORD -k https://192.168.0.51/api/v1/files/sd/
```

**Expected response** (JSON):

```json
{
  "data": {
    "result": {
      "files": [
        {"name": "autorun.brs", "type": "file", ...},
        {"name": "index.html", "type": "file", ...}
      ]
    }
  }
}
```

**If you get `401 Unauthorized`**:

- Double-check password (case-sensitive)
- Verify you're using `--digest` flag (not basic auth)
- Ensure LDWS is enabled in player setup

**If you get connection errors**:

- Check player IP is correct
- Verify LDWS is enabled
- Check firewall isn't blocking connections

---

## Step 4: Configure Player in Project

Now add the player to your project's configuration:

```bash
# From project root
pnpm player add dev-player 192.168.0.51 --port 443 --model CL435 --default
```

Or manually edit `.brightsign/players.json`:

```json
{
  "$schema": "./players.schema.json",
  "players": [
    {
      "name": "dev-player",
      "ip": "192.168.0.51",
      "port": 443,
      "username": "admin",
      "password": "YOUR_PASSWORD",
      "model": "CL435",
      "description": "Development player",
      "tags": ["dev"]
    }
  ],
  "default": "dev-player"
}
```

**Security Note**: This file is in `.gitignore` - your credentials are not committed to Git.

---

## Step 5: Test Deployment

### Test Full Deployment

```bash
# Build, package, and deploy
pnpm deploy:player
```

**Expected output**:

```
🚀 BrightSign Local Deploy

📦 Package: brightsign-player-v0.0.0.zip

📺 Using default player: dev-player (192.168.0.51)
🔍 Checking player at 192.168.0.51:443...
✅ Player found: CL435 (C5D51K000056)
📤 Uploading package to 192.168.0.51...
  ✅ autorun.brs
  ✅ index.html
  ✅ assets/...
✅ All files uploaded successfully
🔄 Rebooting player...
✅ Reboot command sent
✅ Deployment complete!
```

### Verify on Display

After reboot (~30 seconds), your React app should appear on the connected display.

---

## Common Setup Issues

### Issue: Player doesn't get IP address

**Solutions**:

- Verify Ethernet cable is connected
- Check router has DHCP enabled
- Try static IP configuration instead
- Ensure network port isn't VLAN-restricted

### Issue: IP address not showing on screen

**Solutions**:

- Wait 30-60 seconds for full boot
- Check HDMI cable is connected properly
- Try different display output settings
- Access via serial console if available

### Issue: Can access web UI but API returns 401

**Cause**: BrightSign uses **HTTP Digest authentication**, not Basic auth.

**Solution**: Always use `--digest` flag with curl:

```bash
curl --digest -u admin:password -k https://PLAYER_IP/api/v1/files/sd/
```

### Issue: "Local DWS not enabled" error

**Solutions**:

- Re-create setup in BrightAuthor:connected
- Ensure "Enable Diagnostic Web Server" is checked
- Ensure "Enable REST API" is checked
- Re-publish setup to SD card
- Reboot player with updated setup

### Issue: Certificate errors in browser/curl

**Expected behavior**: BrightSign uses self-signed HTTPS certificates.

**Solutions**:

- Browser: Click "Advanced" → "Proceed anyway"
- curl: Use `-k` or `--insecure` flag
- Scripts: Use `rejectUnauthorized: false` in Node.js

This is safe on a local network.

---

## Network Port Reference

| Port | Service                     | Protocol | Usage                   |
| ---- | --------------------------- | -------- | ----------------------- |
| 80   | Local Web Server (LWS)      | HTTP     | BrightAuthor publishing |
| 443  | Diagnostic Web Server (DWS) | HTTPS    | Web UI, REST API        |
| 8008 | Local DWS (alternate)       | HTTP     | Older firmware          |
| 8080 | Local DWS (alternate)       | HTTP     | Some setups             |
| 2999 | JavaScript Inspector        | HTTP     | Remote debugging        |

**For deployment scripts**, use **port 443** (HTTPS with digest auth).

---

## Authentication Summary

### Web Interface (Browser)

- URL: `https://PLAYER_IP/`
- Username: `admin`
- Password: Set in BrightAuthor:connected setup
- Protocol: HTTP Digest Authentication (handled by browser)

### REST API (curl/scripts)

- Endpoint: `https://PLAYER_IP/api/v1/*`
- Authentication: `--digest -u admin:password`
- Certificate: Use `-k` flag for self-signed cert
- **Important**: Must use `--digest` flag (Basic auth fails with 401)

### Example API Calls

```bash
# List SD card contents
curl --digest -u admin:password -k https://PLAYER_IP/api/v1/files/sd/

# Upload file
curl --digest -u admin:password -k -X PUT \
  -F "file=@index.html" \
  https://PLAYER_IP/api/v1/files/sd/

# Reboot player
curl --digest -u admin:password -k -X POST \
  https://PLAYER_IP/api/v1/control/reboot
```

---

## Next Steps

Once your player is set up and you've verified connectivity:

1. **For Development**: Set up dev-mode workflow
   - See: [BrightSign Dual-Mode Workflow Guide](./brightsign-dual-mode-workflow.md)
   - Quick start: `pnpm deploy:dev-mode`

2. **For Production**: Deploy your app
   - See: [BrightSign Deployment Guide](./brightsign-deployment.md)
   - Quick start: `pnpm deploy:player`

3. **Enable Remote Debugging** (optional, development only)
   - Chrome DevTools: `chrome://inspect/devices`
   - Add: `PLAYER_IP:2999`

---

## Additional Resources

- [BrightSign Local Network Setup](https://docs.brightsign.biz/user-guides/local-network-setup)
- [BrightSign Diagnostic Web Server](https://docs.brightsign.biz/developers/ldws-overview)
- [BrightSign REST API Reference](https://docs.brightsign.biz/developers/ldws-rest-api)
- [BrightAuthor:connected Download](https://www.brightsign.biz/resources/software-downloads)

---

**You're now ready to deploy React apps to your BrightSign player!** 🎉

**Last Updated**: 2026-03-07
