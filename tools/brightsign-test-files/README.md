# BrightSign Test Files

**Purpose:** Minimal files to verify local autorun control on a BrightSign player.

## Files

- **autorun.brs** - Minimal BrightScript to load HTML widget
- **index.html** - Simple black screen with white text

## Usage

### Step 1: Format SD Card

1. Remove SD card from BrightSign player
2. Format as **FAT32** on your computer
3. Keep SD card mounted

### Step 2: Copy Test Files

Copy both files to the **root** of the SD card:

```
SD:\
├── autorun.brs
└── index.html
```

**Do NOT** put them in a subfolder.

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

---

## Next Steps After Success

Once you confirm the "HELLO" screen displays:

1. **Option A: Deploy via LDWS**
   ```bash
   pnpm deploy:player --player dev-player
   ```

2. **Option B: Deploy via SD Card**
   - Copy files from `dist/apps/player-minimal/` to SD root
   - Replace `index.html` with React build
   - Update `autorun.brs` if needed (add inspector, logging)

---

## Troubleshooting

### Still See BSN Content

- Player may still be registered to BSN.cloud
- Follow [Un-register BSN Player Guide](../docs/guides/unregister-bsn-player-for-dev.md)

### Black Screen with Backlight On (No Text Displayed)

This is the most common first-time issue. Here's how to diagnose:

**Step 1: Check LDWS Access (Even Offline)**

Even with Ethernet disconnected, the LDWS REST API should respond if you reconnect briefly:

1. **Reconnect Ethernet temporarily** (just to check LDWS)
2. Open browser: `http://192.168.0.51/api/v1/info/`
3. Should see JSON with player info
4. **Disconnect Ethernet again** after checking

If LDWS works, player is booting - the issue is with autorun execution.

**Step 2: Use Debug Autorun**

Replace `autorun.brs` with `autorun-debug.brs` (from this folder):

```bash
# On SD card, rename files:
autorun.brs → autorun-backup.brs
autorun-debug.brs → autorun.brs
```

The debug version writes a log file: `SD:/boot-debug.txt`

**Step 3: Reboot and Check Log**

1. Reboot player (power cycle)
2. Wait 60 seconds
3. Reconnect Ethernet temporarily
4. Check log: `http://192.168.0.51/api/v1/files/sd/boot-debug.txt?contents`

**What the log tells you:**

- **No log file (404):** autorun.brs is not executing at all
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
- [BrightSign Deployment Guide](../docs/guides/brightsign-deployment.md)
- [Black Screen Troubleshooting](../docs/troubleshooting/brightsign-black-screen-issue.md)
