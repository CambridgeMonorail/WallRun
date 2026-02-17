# BrightSign Deployment Testing Guide

Step-by-step testing checklist for the BrightSign deployment workflow.

## Prerequisites

- [ ] Node.js 22+ installed
- [ ] pnpm 9.15+ installed
- [ ] All dependencies installed (`pnpm install`)
- [ ] Clean working directory (`git status` shows no uncommitted changes)

## Phase 1: Build Testing

### 1.1 Test Production Build

```bash
pnpm nx build player-minimal
```

**Expected Output:**
- ✅ Vite build completes without errors
- ✅ Output directory: `dist/apps/player-minimal/`
- ✅ Build time: ~5-15 seconds (depending on hardware)

**Verify build output:**

```bash
ls -la dist/apps/player-minimal/
```

**Expected files:**
```
dist/apps/player-minimal/
├── index.html               # Entry point
├── favicon.ico              # Icon
├── assets/                  # JS/CSS bundles
│   ├── index-[hash].js      # Main application bundle
│   ├── vendor-[hash].js     # React + dependencies  
│   └── index-[hash].css     # Styles (if extracted)
```

**Check bundle sizes:**

```bash
du -sh dist/apps/player-minimal/assets/*.js
```

**Expected:**
- Main bundle: < 50KB (gzipped target: < 25KB)
- Vendor bundle: < 150KB (React + react-dom, gzipped: < 50KB)

### 1.2 Verify Build Configuration

Check that assets use relative paths:

```bash
grep -o 'src="[^"]*"' dist/apps/player-minimal/index.html
```

**Expected:** All paths should be relative (e.g., `assets/index-abc123.js`, NOT `/assets/...`)

**Check for critical imports:**

```bash
grep -i "tailwindcss\|styles.css" dist/apps/player-minimal/assets/index-*.js
```

**Expected:** Should find references to Tailwind styles

### 1.3 Test Build with Production Flag

```bash
pnpm nx build player-minimal --configuration=production
```

**Note:** This may fail if `production` configuration is not defined in `project.json`. That's OK - the default build already uses production mode.

---

## Phase 2: Package Testing

### 2.1 Run Package Script

```bash
pnpm package:player
```

**Expected Console Output:**

```
📦 Packaging BrightSign Player App

1️⃣  Building player-minimal app...
✅ Built player-minimal

2️⃣  Creating package directory...
✅ Created dist/packages/brightsign

3️⃣  Copying autorun.brs...
✅ Copied autorun.brs

4️⃣  Copying application files...
✅ Copied application files

5️⃣  Generating manifest...
✅ Generated manifest.json

6️⃣  Creating deployment package...
✅ Created dist/packages/brightsign-player-v0.0.0.zip

✨ Package Summary:
   Version: 0.0.0
   Files: [count]
   Total Size: [size] MB
```

**If step fails:** Check error message and verify:
- `apps/player-minimal/public/autorun.brs` exists
- `dist/apps/player-minimal/` has build output
- Write permissions on `dist/packages/` directory

### 2.2 Verify Package Structure

Check unpacked package contents:

```bash
ls -laR dist/packages/brightsign/
```

**Expected structure:**

```
dist/packages/brightsign/
├── autorun.brs              # REQUIRED - BrightSign bootstrap
├── index.html               # Entry point
├── manifest.json            # Version metadata
├── favicon.ico
├── assets/
│   ├── index-[hash].js      # Main bundle
│   ├── vendor-[hash].js     # React bundle
│   └── index-[hash].css     # Styles (if extracted)
```

**Critical file check:**

```bash
# Verify autorun.brs exists and contains correct URL
cat dist/packages/brightsign/autorun.brs | grep "file:///sd:/index.html"
```

**Expected:** Should find the line with `url: "file:///sd:/index.html"`

### 2.3 Verify Manifest

Check manifest.json contents:

```bash
cat dist/packages/brightsign/manifest.json | jq .
```

**Expected fields:**
```json
{
  "name": "the-sign-age-player",
  "version": "0.0.0",
  "buildTimestamp": "2026-02-17T...",
  "files": [
    {
      "path": "index.html",
      "size": 1234,
      "checksum": "sha256-..."
    },
    ...
  ],
  "totalSize": 123456
}
```

### 2.4 Verify Deployment Zip

Check that zip file was created:

```bash
ls -lh dist/packages/brightsign-player-*.zip
```

**Expected:** File exists and size is reasonable (< 500KB for minimal app)

**Verify zip contents:**

```bash
unzip -l dist/packages/brightsign-player-v0.0.0.zip
```

**Expected:** Should list all files from `dist/packages/brightsign/`

---

## Phase 3: Local Development Testing (Optional)

### 3.1 Test Development Server

```bash
pnpm serve:player
```

**Expected:**
- Vite dev server starts on http://localhost:4200
- No TypeScript errors
- No build errors

**Manual verification:**
1. Open http://localhost:4200 in browser
2. Should see "The Sign Age" title
3. Should see "Player Status Monitor" subtitle
4. Should show current time updating
5. Should show uptime counter incrementing
6. Network status should show "ONLINE"

### 3.2 Verify Styling

**Check visual elements:**
- [ ] Dark gradient background (purple/blue tones)
- [ ] Glass morphism cards with blur effect
- [ ] Cards have hover effects (translate up slightly)
- [ ] Text is white/light colored
- [ ] Gradient text on title (blue gradient)

**Check responsiveness:**
- [ ] Resize browser window
- [ ] Cards should reflow (grid layout)
- [ ] Text remains readable

---

## Phase 4: Deployment Testing (Requires BrightSign Hardware)

**⚠️ WARNING:** This requires an actual BrightSign player on your network

### 4.1 Find BrightSign Player IP

**Option A: Player Menu**
1. Access player menu (button sequence varies by model)
2. Navigate to Setup → Network → Status
3. Note IPv4 address

**Option B: Network Scan**

```bash
# Scan for port 8008 (BrightSign diagnostic server)
nmap -p 8008 --open 192.168.1.0/24
```

**Option C: Router DHCP leases**
- Check router admin for "BrightSign" hostname

### 4.2 Verify Player Accessibility

```bash
# Replace <player-ip> with actual IP
curl http://<player-ip>:8008/GetDeviceInfo
```

**Expected Response:**
```json
{
  "model": "XD1035",
  "serial": "ABC...",
  "firmware": "9.x.xx",
  "uptime": 12345
}
```

**If fails:**
- Verify player is on same network
- Check firewall rules (allow port 8008)
- Ping player IP first

### 4.3 Run Deployment Script

```bash
pnpm deploy:local
```

**Script will prompt:**
```
🚀 BrightSign Local Deploy

📦 Package: brightsign-player-v0.0.0.zip

   (Discovery not yet implemented - please enter IP manually)
Enter BrightSign player IP address: 
```

**Enter player IP and press Enter**

**Expected output:**
```
🔍 Checking player at <ip>:8008...
✅ Player reachable (Model: XD1035, Firmware: 9.1.35)

📤 Uploading package to <ip>...
✅ Upload successful

🔄 Rebooting player...
✅ Reboot triggered

✅ Deployment complete!

📺 Check the player display to verify the app is running
🔍 Debug inspector: http://<ip>:2999
```

### 4.4 Verify Deployment on Player

**Physical verification:**
1. Wait 15-30 seconds for player to reboot
2. Check display - should show StatusPage
3. Verify title: "The Sign Age"
4. Verify subtitle: "Player Status Monitor"
5. Verify uptime counter is incrementing
6. Verify current time is updating

**Remote inspector verification:**

```bash
# Open inspector in Chrome
# Visit: http://<player-ip>:2999
```

In Chrome DevTools:
- [ ] Console shows no errors
- [ ] Network tab shows all assets loaded
- [ ] Elements tab shows React app rendered
- [ ] Application tab shows no storage errors

### 4.5 Test Remote Debugging

1. Open Chrome on your development machine
2. Navigate to `chrome://inspect/#devices`
3. Click "Configure..."
4. Add `<player-ip>:2999`
5. Your React app should appear under "Remote Target"
6. Click "inspect" to open DevTools

**Verify:**
- [ ] Can see React component tree
- [ ] Can inspect DOM elements
- [ ] Can view console output
- [ ] Can set breakpoints in code

---

## Phase 5: Error Testing

### 5.1 Test Missing autorun.brs

```bash
# Temporarily rename autorun.brs
mv apps/player-minimal/public/autorun.brs apps/player-minimal/public/autorun.brs.bak

# Try to package
pnpm package:player
```

**Expected:** Should fail with clear error message

```bash
# Restore autorun.brs
mv apps/player-minimal/public/autorun.brs.bak apps/player-minimal/public/autorun.brs
```

### 5.2 Test Invalid Build

```bash
# Delete build output
rm -rf dist/apps/player-minimal

# Try to package without building
pnpm package:player
```

**Expected:** Should rebuild automatically OR fail with clear error

### 5.3 Test Deployment Without Package

```bash
# Delete package
rm -rf dist/packages/brightsign-player-*.zip

# Try to deploy
pnpm deploy:local
```

**Expected:** Should fail with "Package not found" error

---

## Success Criteria

### Build Phase ✅
- [x] Build completes without errors
- [x] Output directory contains index.html and assets
- [x] Bundle sizes are reasonable (< 200KB total uncompressed)
- [x] Assets use relative paths

### Package Phase ✅
- [x] Package script completes without errors
- [x] autorun.brs is included in package
- [x] manifest.json is valid JSON with correct version
- [x] Zip file is created and contains all necessary files
- [x] Package size is reasonable (< 500KB)

### Deployment Phase (If tested) ✅
- [x] Player is discoverable on network
- [x] Upload succeeds via HTTP API
- [x] Player reboots successfully
- [x] App displays on player screen
- [x] Remote inspector is accessible
- [x] No console errors in inspector

---

## Common Issues and Solutions

### Issue: Build fails with "Cannot find module './styles.css'"

**Solution:**
- Verify `apps/player-minimal/src/main.tsx` imports `'./styles.css'`
- Verify `apps/player-minimal/src/styles.css` exists
- Verify `styles.css` contains `@import 'tailwindcss';`

### Issue: Package script fails with "autorun.brs not found"

**Solution:**
- Verify file exists at `apps/player-minimal/public/autorun.brs`
- Check file permissions

### Issue: Player shows black screen after deployment

**Solutions:**
1. Check remote inspector console for errors
2. Verify autorun.brs URL is `file:///sd:/index.html`
3. Verify index.html paths are relative
4. Check that styles.css is imported in main.tsx

### Issue: Deployment script can't find player

**Solutions:**
1. Verify player is powered on and booted
2. Check network connectivity (ping IP)
3. Ensure player is on same subnet
4. Try accessing diagnostic web interface in browser: `http://<ip>:8008`

### Issue: "CORS error" in remote inspector

**Solution:**
- This is expected for `file://` URLs
- Not a blocker for local file access
- Check that assets are loaded despite CORS warning

---

## Next Steps After Successful Testing

1. **Document your player IP** for future deploys
2. **Create deploy alias** in `.bashrc` or `.zshrc`:
   ```bash
   alias deploy-brightsign="pnpm deploy:player && echo 'Deployed to 192.168.1.100'"
   ```
3. **Test iterative development:**
   - Make small change to StatusPage.tsx
   - Run `pnpm deploy:player`
   - Verify change on screen (~30 seconds)
4. **Explore BrightSign APIs:**
   - Add BrightSign-specific features (GPIO, video, etc.)
   - Test advanced capabilities

---

## Cleanup

After testing completes:

```bash
# Optional: Clean build artifacts
pnpm nx reset
rm -rf dist/

# Optional: Clean package artifacts
rm -rf dist/packages/

# Keep source code changes
git status
```

**Do NOT delete:**
- Source code in `apps/player-minimal/src/`
- Configuration files (`vite.config.mts`, `tailwind.config.js`)
- Documentation (`docs/guides/brightsign-deployment.md`)
