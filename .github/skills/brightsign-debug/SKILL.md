---
name: brightsign-debug
description: Diagnose and troubleshoot BrightSign OS 9.x player issues using device info APIs, remote Chrome DevTools inspector, log analysis, and file verification. Use when a player app is not starting, displaying incorrectly, or exhibiting performance problems.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.1'
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
5. Diagnostic web server accessible (DWS on port 8008, or LDWS on port 443)
6. `autorun.brs` present on SD card
7. `index.html` and assets deployed
8. Console shows no JavaScript errors

## Workflow

### Step 1: Find player IP address

- **Player menu**: Setup → Network → Status
- **Router DHCP table**: look for "BrightSign" hostname
- **Network scan**: see [diagnostic commands](references/diagnostic-commands.md)

### Step 2: Access diagnostic web server

BrightSign exposes two diagnostic interfaces:

- **DWS** (port 8008, HTTP) — browser-based diagnostic UI, remote inspector, log viewer. Best for interactive debugging.
- **LDWS** (port 443, HTTPS, digest auth) — REST API used by this repo's deploy scripts (`scripts/deploy-local.mjs`). Best for automated/scripted access.

For debugging, open `http://<player-ip>:8008` in a browser. For API operations, use `https://<player-ip>/api/v1/` with digest auth (see deploy-local skill).

### Step 3: Query device information

Check firmware version, uptime, temperature, and storage. See [diagnostic commands](references/diagnostic-commands.md) for curl examples and key fields to monitor.

### Step 4: Open remote inspector (Chrome DevTools)

Connect Chrome DevTools to `<player-ip>:2999` for live JavaScript debugging: console, sources, network, performance, and memory tabs. The inspector port (2999) is separate from the DWS port (8008). See [diagnostic commands](references/diagnostic-commands.md) for setup steps.

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

- Diagnostic web server must be enabled on the player (DWS on port 8008, and/or LDWS on port 443)
- Remote inspector requires Chrome browser on development machine
- DWS port 8008 or LDWS port 443 must be accessible from development machine network
- BrightSign OS 9.x minimum
