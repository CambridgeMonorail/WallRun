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

```text
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

---

## Use Case 2: Development Mode Workflow

Load your React app directly from your dev machine's Vite server over the network (no build/deploy cycle).

### Setup

1. **Deploy dev mode bootstrap**:

   ```bash
   pnpm deploy:dev-mode
   ```

   The script auto-detects the LAN IP used to reach the player and injects it into a temporary `autorun.brs` before upload.
   If auto-detection fails, rerun with `DEV_SERVER_IP=<your-lan-ip>`.

2. **Start dev server** (binds to network):

   ```bash
   pnpm dev:brightsign
   ```

3. **Player loads from your dev server** - changes reflect immediately

4. **Attach Chrome DevTools**:

   - Open `chrome://inspect/devices`
   - Add `<player-ip>:2999`
   - Click `inspect`

5. **Optional SSH console access**:

   Uncomment the SSH block in `autorun-dev.brs`, set a password, deploy again, then connect with `ssh brightsign@<player-ip>`.

See [BrightSign Dual Mode Workflow Guide](../../docs/guides/brightsign-dual-mode-workflow.md) for details.

---

## Troubleshooting

### Local Autorun Verification

1. **Check LDWS access**:
   - Browse to `https://<player-ip>/api/v1/info/`
   - You should see JSON with player model, serial, and firmware version

2. **Verify SD card files via LDWS**:
   - Browse to `https://<player-ip>/api/v1/files/sd/`
   - Confirm `autorun.brs` and `index.html` are present
   - If missing, re-copy the files to the SD card root

3. **Check file encoding**:
   - `autorun.brs` must be UTF-8 or ASCII
   - `index.html` must be UTF-8
   - No BOM (byte order mark)

4. **Try the production autorun**:
   - Use `apps/player-minimal/public/autorun.brs` instead
   - It has more robust error handling and logging

### Common Failure Modes

- **Player does not start the test content**:
  - Check the SD card is inserted fully
  - Verify the card is formatted as FAT32
  - Re-copy `autorun.brs` and `index.html` to the SD root

- **Log says `roHtmlWidget creation FAILED`**:
  - Check OS version via `/api/v1/info/` and inspect `version`
  - The player may need a firmware update

- **Log says `Widget shown` but the screen is black**:
  - Check `index.html` encoding and confirm it is UTF-8
  - Verify the file is not corrupted
  - Try a smaller HTML file without extra CSS

### Verify SD Card File Listing

Via LDWS: `https://<player-ip>/api/v1/files/sd/`

Expected entries:

```json
{"name": "autorun.brs", "size": ...}
{"name": "index.html", "size": ...}
```

If files are missing or in the wrong location, re-copy them to the SD root.

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

- [BrightSign Deployment Guide](../../docs/guides/brightsign-deployment.md) - Full production workflow
- [BrightSign Dual Mode Workflow](../../docs/guides/brightsign-dual-mode-workflow.md) - Dev mode details
- [BrightSign Initial Setup](../../docs/guides/brightsign-initial-setup.md) - First-time player setup
- [Un-register BSN Player](../../docs/guides/unregister-bsn-player-for-dev.md) - Remove BSN cloud management
