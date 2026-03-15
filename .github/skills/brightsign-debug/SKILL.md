---
name: brightsign-debug
description: Diagnose and troubleshoot BrightSign OS 9.x player issues using device info APIs, remote Chrome DevTools inspector, log analysis, and file verification. Use when a player app is not starting, displaying incorrectly, or exhibiting performance problems.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.1"
  internal: true
---

# BrightSign Debug Skill

Diagnose and troubleshoot issues on BrightSign OS 9.x digital signage players.

## When to Use This Skill

Use this skill when you need to:

- diagnose why an app isn't starting or displaying
- check player hardware and network status
- access console logs and error messages
- debug JavaScript issues remotely via Chrome DevTools
- verify file deployment and integrity
- troubleshoot performance problems

## Do Not Use When

- deploying an app (use `brightsign-deploy-local` or `brightsign-fleet-deploy`)
- packaging an app (use `brightsign-package`)
- designing a signage layout (use signage layout skills)

## Quick Diagnostics Checklist

When a player isn't working correctly, follow this systematic approach:

1. Player is powered and booted
2. Display is connected and receiving signal
3. Network connectivity established
4. Player IP address known
5. Diagnostic web server accessible (port 8008)
6. `autorun.brs` present on SD card
7. `index.html` and assets deployed
8. Console shows no JavaScript errors

## Workflow

### Step 1: Find player IP address

- **Player menu**: Setup → Network → Status
- **Router DHCP table**: look for "BrightSign" hostname
- **Network scan**: see [diagnostic commands](references/diagnostic-commands.md)

### Step 2: Access diagnostic web server

Open `http://<player-ip>:8008` in a browser, or use curl for API access.

The diagnostic interface provides: device information, file browser (SD card), log viewer, system utilities, and remote inspector link.

### Step 3: Query device information

Check firmware version, uptime, temperature, and storage. See [diagnostic commands](references/diagnostic-commands.md) for curl examples and key fields to monitor.

### Step 4: Open remote inspector (Chrome DevTools)

Connect Chrome DevTools to `<player-ip>:8008` for live JavaScript debugging: console, sources, network, performance, and memory tabs. See [diagnostic commands](references/diagnostic-commands.md) for setup steps.

### Step 5: Review logs

Check player logs for error patterns. Common issues include missing assets (`ERR_FILE_NOT_FOUND`), bundle dependency errors, and widget initialization failures.

### Step 6: Verify file deployment

Confirm all expected files are on the SD card with correct sizes and checksums. See [diagnostic commands](references/diagnostic-commands.md) for verification commands.

### Step 7: Apply fix and test

Based on findings, apply the appropriate fix and redeploy. Common troubleshooting scenarios are covered in [troubleshooting guide](references/troubleshooting.md).

## Output Format

When debugging a player issue, produce:

1. **Findings** — what was observed (errors, missing files, wrong config)
2. **Root cause** — what is causing the issue
3. **Fix** — specific actions to resolve
4. **Verification** — how to confirm the fix worked

## Reference Files

- [Diagnostic commands](references/diagnostic-commands.md) — IP discovery, device info queries, remote inspector setup, log analysis, file verification
- [Troubleshooting guide](references/troubleshooting.md) — common issues (white screen, crashes, missing assets, network failures, performance)

## Constraints

- Diagnostic web server must be enabled on the player
- Remote inspector requires Chrome browser on development machine
- Port 8008 must be accessible from development machine network
- BrightSign OS 9.x minimum
