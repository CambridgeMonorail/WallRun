# BrightSign Deployment Guide

Complete guide for deploying React applications to BrightSign OS 9.x digital signage players.

## Overview

This repository includes a complete workflow for packaging and deploying the `player-minimal` React app to BrightSign players. The workflow supports both local development iteration and production fleet deployments.

## Prerequisites

- **BrightSign Player**: OS 9.x or later with HTML widget support
- **Network Access**: Player must be on same network as development machine
- **Player IP Address**: Use player menu or network scanning to find IP
- **Node.js 22+** and **pnpm 9.15+** installed

## Quick Start

### 1. Package the Player App

Build and package the app for BrightSign:

```bash
pnpm package:player
```

This command:
- Builds `player-minimal` in production mode
- Creates deployment package structure
- Generates `autorun.brs` bootstrap script
- Creates manifest.json with version and checksums
- Outputs to `dist/packages/brightsign-player-v<version>.zip`

**Output location:** `dist/packages/brightsign-player-v0.0.0.zip`

### 2. Deploy to Local Player

Upload package to a BrightSign player on your network:

```bash
pnpm deploy:local
```

The script will:
1. Prompt for player IP address (or discover automatically)
2. Check player status via HTTP API
3. Upload package to `/sd:/` directory
4. Trigger player reboot
5. Verify deployment

**Alternative:** Deploy in one step:

```bash
pnpm deploy:player
```

This runs both `package:player` and `deploy:local` sequentially.

## Detailed Workflow

### Step 1: Find Your Player's IP Address

#### Method A: Player Menu (Manual)

1. On the BrightSign player, press the physical button to access the menu
2. Navigate to: **Setup → Network → Status**
3. Note the IPv4 address (e.g., `192.168.1.100`)

#### Method B: Network Scan (Automated)

Scan your local network for BrightSign players:

```bash
# Using nmap
nmap -p 8008 --open 192.168.1.0/24

# Using curl (faster)
for i in {1..254}; do
  (curl -s --connect-timeout 1 http://192.168.1.$i:8008/GetDeviceInfo > /dev/null && echo "192.168.1.$i") &
done
wait
```

BrightSign players run a diagnostic web server on port 8008 by default.

#### Method C: Check Router DHCP Leases

- Log into your router admin interface
- Look for "BrightSign" hostname in DHCP client list
- Note the assigned IP address

### Step 2: Verify Player Accessibility

Test the diagnostic API:

```bash
curl http://<player-ip>:8008/GetDeviceInfo
```

Expected response:

```json
{
  "model": "XD1035",
  "serial": "ABC123456789",
  "firmware": "9.1.35",
  "uptime": 3600
}
```

If this fails:
- Verify player is powered on and network-connected
- Check firewall rules (allow port 8008)
- Ensure player is on same subnet as your machine

### Step 3: Build the Player App

Build `player-minimal` for production:

```bash
# Via Nx directly
pnpm nx build player-minimal --configuration=production

# Via package script (recommended)
pnpm package:player
```

**Build output:** `dist/apps/player-minimal/`

The production build is optimized for BrightSign:
- Relative asset paths (`base: './'` in vite.config.mts)
- Aggressive code-splitting (vendor chunk separation)
- esbuild minification (faster than terser)
- Target: ES2020 (BrightSign OS 9.x Chromium support)

### Step 4: Package for Deployment

The `package:player` script creates a BrightSign-ready deployment package:

```bash
pnpm package:player
```

**Package structure:**

```
dist/packages/brightsign/
├── autorun.brs          # Bootstrap script (REQUIRED)
├── index.html           # Entry point HTML
├── assets/              # JS, CSS, images
│   ├── index-[hash].js  # Main bundle
│   ├── vendor-[hash].js # React + dependencies
│   └── *.css            # Stylesheets
└── manifest.json        # Version metadata
```

**autorun.brs** is the bootstrap script that BrightSign OS 9.x uses to launch your HTML widget:

```brightscript
' BrightSign OS 9.x HTML Widget Bootstrap
Sub Main()
    msgPort = CreateObject("roMessagePort")
    htmlWidget = CreateObject("roHtmlWidget", {
        port: msgPort,
        url: "file:///sd:/index.html",
        nodejs_enabled: false,
        inspector_server: { port: 2999 }
    })
    
    while true
        msg = wait(0, msgPort)
    end while
End Sub
```

### Step 5: Deploy to Player

Upload the package via HTTP API:

```bash
pnpm deploy:local
```

The deployment script:

1. **Finds latest package** - Reads version from package.json
2. **Prompts for IP** - Or uses discovered players
3. **Checks player status** - Verifies reachability via `/GetDeviceInfo`
4. **Uploads package** - HTTP POST to `/upload` endpoint with `multipart/form-data`
5. **Reboots player** - GET request to `/reboot` endpoint
6. **Confirms deployment** - Provides inspector URL for debugging

**Manual upload** (if script fails):

```bash
# Upload zip via curl
curl -X POST \
  -F "file=@dist/packages/brightsign-player-v0.0.0.zip" \
  -F "path=/sd:/" \
  http://<player-ip>:8008/upload

# Reboot player
curl http://<player-ip>:8008/reboot
```

### Step 6: Verify Deployment

After reboot (typically 15-30 seconds):

1. **Check display** - Player should show StatusPage component
2. **Access inspector** - Open `http://<player-ip>:2999` in Chrome
3. **Check logs** - Use Chrome DevTools console for errors

## Development Iteration

For rapid iteration during development:

1. **Make code changes** in `apps/player-minimal/src/`
2. **Package:** `pnpm package:player`
3. **Deploy:** `pnpm deploy:local --ip=<player-ip>`
4. **Verify on screen** - Changes visible in ~30 seconds

**Pro tip:** Create a shell alias for your player:

```bash
# In .bashrc or .zshrc
alias deploy-brightsign="pnpm deploy:player && echo 'Deployed to 192.168.1.100'"
```

## Troubleshooting

### Player Not Reachable

**Symptom:** `curl http://<player-ip>:8008/GetDeviceInfo` times out

**Solutions:**
- Verify player is powered on and booted
- Check network connectivity (ping player IP)
- Ensure player and development machine are on same subnet
- Check firewall rules on development machine

### Upload Fails

**Symptom:** HTTP POST to `/upload` returns error or times out

**Solutions:**
- Verify package size < 100MB (BrightSign limit)
- Check SD card has free space (min 500MB recommended)
- Ensure package is valid zip file
- Try manual upload via diagnostic web interface (`http://<player-ip>:8008`)

### Player Shows Black Screen

**Symptom:** Player reboots but display remains black

**Solutions:**
1. **Check autorun.brs** - Verify file exists at root of SD card
2. **Check URL in autorun.brs** - Must be `file:///sd:/index.html`
3. **Check console logs** - Open inspector at `http://<player-ip>:2999`
4. **Verify HTML paths** - All asset paths must be relative (no absolute URLs)

**Common issues:**
- Incorrect base URL in Vite config (must be `'./'`)
- Missing styles.css import in main.tsx
- JavaScript errors (check console)
- Missing Tailwind CSS import

### Console Errors: Module Not Found

**Symptom:** Browser console shows import errors

**Solutions:**
- Ensure `main.tsx` imports `'./styles.css'` (not workspace package)
- Verify `styles.css` contains `@import 'tailwindcss';`
- Check that `tailwind.config.js` exists in `apps/player-minimal/`
- Rebuild after fixing imports: `pnpm package:player`

### Inspector Not Accessible

**Symptom:** `http://<player-ip>:2999` not reachable

**Solutions:**
- Verify `inspector_server: { port: 2999 }` in autorun.brs
- Check player firewall settings (may block non-8008 ports)
- Try default inspector port: `http://<player-ip>:8008/inspector`

## Advanced Topics

### Custom Build Configurations

Override default build settings:

```bash
# Build with source maps
pnpm nx build player-minimal --configuration=production --sourceMap=true

# Build with custom base URL
pnpm nx build player-minimal --base=/custom-path/
```

**Note:** BrightSign file:// protocol requires `base: './'` for relative paths.

### Version Management

Versions are read from package.json:

```json
{
  "name": "TheSignAge",
  "version": "1.2.3"
}
```

Update version:

```bash
# Increment patch (1.2.3 → 1.2.4)
npm version patch

# Increment minor (1.2.4 → 1.3.0)
npm version minor

# Increment major (1.3.0 → 2.0.0)
npm version major
```

### Fleet Deployment (Coming Soon)

For deploying to multiple players:

1. **Version and package** - Semantic versioning
2. **Publish to GitHub Releases** - Automated via CI/CD
3. **Player polling** - Players check for updates and self-update
4. **Rollback support** - Maintain previous versions

**Status:** Planned for Q2 2026 (see ROADMAP.md)

## Scripts Reference

### Package Scripts (package.json)

```json
{
  "package:player": "node scripts/package-player.mjs",
  "deploy:local": "node scripts/deploy-local.mjs",
  "deploy:player": "pnpm package:player && pnpm deploy:local",
  "serve:player": "nx serve player-minimal"
}
```

### Nx Build Targets

```bash
# Build player-minimal
pnpm nx build player-minimal

# Production build
pnpm nx build player-minimal --configuration=production

# Development build with watch mode
pnpm nx serve player-minimal
```

## Files Reference

### Key Files

- **apps/player-minimal/vite.config.mts** - Vite build configuration
- **apps/player-minimal/public/autorun.brs** - BrightSign bootstrap script
- **scripts/package-player.mjs** - Packaging script
- **scripts/deploy-local.mjs** - Local deployment script

### Build Output

- **dist/apps/player-minimal/** - Vite build output
- **dist/packages/brightsign/** - Final deployment package (unpacked)
- **dist/packages/brightsign-player-v\*.zip** - Deployment package (zipped)

## Related Documentation

### Skills (AI Context)

The repository includes specialized skills for AI-assisted development:

- **`.github/skills/brightsign-package/`** - Packaging React apps for BrightSign
- **`.github/skills/brightsign-deploy-local/`** - Local player deployment
- **`.github/skills/brightsign-fleet-deploy/`** - Fleet-wide releases (planned)
- **`.github/skills/brightsign-debug/`** - Debugging player issues

### Guides

- **[Creating Signage Content](./creating-signage-content.md)** - Building signage screens
- **[Project Goals](../getting-started/project-goals.md)** - Repository intent and philosophy

### External Resources

- **[BrightSign OS 9.x Documentation](https://docs.brightsign.biz/)** - Official platform docs
- **[BrightDev MCP Server](https://github.com/BrightDevelopers/BrightDev)** - AI context for BrightSign development
- **[HTML Widget API Reference](https://docs.brightsign.biz/display/DOC/roHtmlWidget)** - BrightScript API

## Support

For issues or questions:

- **Bug reports:** [GitHub Issues](https://github.com/CambridgeMonorail/TheSignAge/issues)
- **Discussions:** [GitHub Discussions](https://github.com/CambridgeMonorail/TheSignAge/discussions)
- **Contributing:** [docs/contributing/CONTRIBUTING.md](../contributing/CONTRIBUTING.md)
