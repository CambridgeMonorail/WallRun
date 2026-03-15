---
name: brightsign-deploy-local
description: Deploy React apps to local BrightSign OS 9.x players via HTTP API for rapid development iteration. Use when testing on real hardware during active development.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.1'
  internal: true
---

# BrightSign Local Deploy Skill

Deploy packaged React applications to BrightSign OS 9.x players on your local network via the LDWS REST API.

## When to Use This Skill

Use this skill when you need to:

- deploy to a development/test player during active development
- iterate quickly with "build → deploy → test" cycles
- upload app packages via network (no SD card swapping)
- trigger player reboots programmatically
- test on real hardware before fleet release

## Do Not Use When

- deploying to multiple players (use `brightsign-fleet-deploy`)
- packaging an app without deploying (use `brightsign-package`)
- debugging a player issue (use `brightsign-debug`)

## Prerequisites

- BrightSign player on same network as development machine
- Player IP address known (find via `player-discovery-scan` or router DHCP)
- BrightSign Local Diagnostic Web Server (LDWS) enabled — port 443 (HTTPS)
- HTTP Digest Authentication credentials (username: `admin`)
- Packaged app ready (see `brightsign-package` skill)

## Workflow

### Step 1: Find player IP address

Three methods:

1. **Player menu**: Setup → Network → Status
2. **Router DHCP table**: look for "BrightSign" hostname
3. **Network scan**: use `player-discovery-scan` skill or `nmap -p 443 192.168.1.0/24`

### Step 2: Verify player accessibility

Test authenticated access to the LDWS REST API. See [API and commands reference](references/api-and-commands.md) for curl examples and expected responses.

### Step 3: Deploy

**Automated (recommended):**

| Command              | When to Use                                  | What It Does                            |
| -------------------- | -------------------------------------------- | --------------------------------------- |
| `pnpm deploy:player` | After changing source code (most common)     | Rebuilds → Packages → Uploads → Reboots |
| `pnpm deploy:local`  | Package already built, just re-upload (rare) | Uploads existing package → Reboots      |

```bash
# This is what you want 99% of the time
pnpm deploy:player
```

The script will:

1. Detect if package is stale and warn you
2. Build the app (if using `deploy:player`)
3. Package with autorun.brs
4. Upload to configured player
5. Reboot player

**Manual upload** for troubleshooting is documented in [API and commands reference](references/api-and-commands.md).

### Step 4: Verify deployment

- Check device uptime is low (confirms reboot)
- Open remote inspector at `http://<player-ip>:2999`
- Confirm app renders correctly on display

## Output Format

When executing a local deploy, produce:

1. Player IP and model/firmware confirmed
2. Build and package status
3. Upload status for each file
4. Reboot confirmation
5. Remote inspector URL for debugging

## Safety Controls

- `deploy:local` does NOT rebuild — if you changed source code, use `deploy:player`
- Always verify player connectivity before starting upload
- Player reboots automatically after upload — ensure no other deploy is in progress

## Troubleshooting

See [troubleshooting guide](references/troubleshooting.md) for common issues:

- Connection refused
- Upload fails
- App doesn't start after upload
- Player reboot hangs
- Can't find player IP
- Storage full

## Reference Files

- [API and commands reference](references/api-and-commands.md) — LDWS endpoints, curl examples, manual upload, reboot, verification
- [Troubleshooting](references/troubleshooting.md) — common deployment issues and solutions

## Constraints

- LDWS uses self-signed certificates — always use `-k` with curl
- HTTP Digest auth required — never use basic auth
- Each file uploads individually (no bulk endpoint)
- Player needs 30-60 seconds to reboot after upload
- BrightSign OS 9.x minimum
