# BrightSign Test Files

**Purpose:** Minimal test files for BrightSign player development workflows.

## Files

- **autorun-minimal.brs** - Minimal "hello world" test (loads local HTML)
- **autorun-dev.brs** - Development mode (loads from network dev server)
- **index.html** - Simple test page for verification

## Use Case 1: Simple Verification Test

Verify that your BrightSign player can run local autorun scripts.

### Usage

### Step 1: Format SD Card

1. Remove SD card from BrightSign player
2. Format as **FAT32** on your computer
3. Keep SD card mounted

### Step 2: Copy Test Files

Copy these files to the **root** of the SD card:

```
SD:\
├── autorun.brs (copy from autorun-minimal.brs)
└── index.html
```

**Important:**

- Rename `autorun-minimal.brs` to `autorun.brs` on the SD card
- Do NOT put them in a subfolder

### Step 3: First Boot (No Network)

1. **Disconnect network** from player (unplug Ethernet)
2. Insert SD card into player
3. Power on player
4. Wait 30-60 seconds

**Expected result:** Black screen with white text "HELLO FROM LOCAL AUTORUN"

### Step 4: Verify with Network

1. Reconnect Ethernet to player
2. Reboot player
3. Wait 60-90 seconds

**Expected result:** Same "HELLO" screen (should NOT switch to BSN content)

---

## What This Proves

✅ Player respects local `autorun.brs` on SD card  
✅ BrightScript HTML widget is working  
✅ BSN cloud management is NOT overriding local content  
✅ Player is ready for React app deployment

## What This Does NOT Prove

❌ React app will work (build may have issues)  
❌ LDWS deployment will work (network/API may have issues)  
❌ Inspector/debugging tools work (not enabled in minimal autorun)

---Use Case 2: Development Mode Workflow

Load your React app directly from your dev machine's Vite server over the network (no build/deploy cycle).

### Setup

1. **Edit `autorun-dev.brs`**:

   ```brightscript
   DEV_SERVER_IP = "192.168.0.100"  ' <<< Change to your dev machine's LAN IP
   ```

2. **Deploy dev mode bootstrap**:

   ```bash
   pnpm deploy:dev-mode
   ```

3. **Start dev server** (binds to network):

   ```bash
   pnpm dev:brightsign
   ```

4. **Player loads from your dev server** - changes reflect immediately

See [BrightSign Dual Mode Workflow Guide](../../docs/guides/brightsign-dual-mode-workflow.md) for details.

---

1. **Check LDWS access** - Verify player is booting:
   - Browse to `http://<player-ip>/api/v1/info/`
   - Should see JSON with player model, serial, firmware version

2. **Verify SD card files via LDWS**:
   - Browse to `http://<player-ip>/api/v1/files/sd/`
   - Should show `autorun.brs` and `index.html`
   - If missing, re-copy to SD card root

3. **Check file encoding**:
   - `autorun.brs` must be UTF-8 or ASCII
   - `index.html` must be UTF-8
   - No BOM (byte order mark)

4. **Try production autorun**:
   - Use `apps/player-minimal/public/autorun.brs` instead
   - Has better error handling and logging

- Check SD card is inserted fully
- Verify FAT32 format
- Try re-copying files
- **Log exists but says "roHtmlWidget creation FAILED":** Widget can't be created
  - Check OS version (`/api/v1/info/` → `version`)
  - May need firmware update

- **Log says "Widget shown" but screen is black:** HTML rendering issue
  - Check `index.html` encoding (must be UTF-8)
  - Verify file is not corrupted
  - Try minimal HTML without CSS

**Step 4: Verify SD Card File Listing**

Via LDWS: `http://192.168.0.51/api/v1/files/sd/`

Should show:

```json
{"name": "autorun.brs", "size": ...}
{"name": "index.html", "size": ...}
```

If files are missing or in wrong location, re-copy to SD root.

### Black Screen (No Backlight/Signal)

- Check HDMI cable connection
- Verify display is on correct input
- Try different HDMI port or display
- Check player power LED is on

### Player Boots to Setup Screen

- This is normal for un-registered players
- Skip setup, player should eventually show "HELLO" screen
- Or manually trigger autorun via player OSD menu

---

## File Specifications

### autorun.brs

- **Encoding:** UTF-8 or ASCII
- **Line endings:** LF or CRLF (both work)
- **Size:** ~200 bytes
- **Purpose:** Loads HTML widget only, no extras

### index.html

- **Encoding:** UTF-8
- **Size:** ~340 bytes
- **Purpose:** Simple visual confirmation, no JavaScript

---

## Related Documentation

- [Un-register BSN Player for Dev](../docs/guides/unregister-bsn-player-for-dev.md)

---

## Related Documentation

- [BrightSign Deployment Guide](../../docs/guides/brightsign-deployment.md) - Full production workflow
- [BrightSign Dual Mode Workflow](../../docs/guides/brightsign-dual-mode-workflow.md) - Dev mode details
- [BrightSign Initial Setup](../../docs/guides/brightsign-initial-setup.md) - First-time player setup
- [Un-register BSN Player](../../docs/guides/unregister-bsn-player-for-dev.md) - Remove BSN cloud management
