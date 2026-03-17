---
name: player-discovery-probe
description: Diagnose connectivity to a single BrightSign player by probing its Diagnostic Web Server (DWS) endpoint. Use when asked to check whether a specific player is reachable.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '2.0'
  internal: true
  argument-hint: '<ip> e.g. 192.168.0.42'
  user-invokable: true
---

# Player Discovery Probe

## Purpose

Quickly verify that a specific host responds and looks like a BrightSign player.

## Safety and boundaries

- Only probe the explicit IP provided by the user.
- Do not scan CIDR ranges in this skill.
- Do not store secrets.

## Workflow

1. Confirm the user has provided an explicit IP address
2. Run the probe command
3. Report whether the player was found and which endpoint responded
4. Show device info (model, serial, firmware) if available

## Commands to run

Probe a player:

```bash
pnpm discover --host <IP>
```

With verbose failure details:

```bash
pnpm discover --host <IP> --verbose
```

Override ports:

```bash
pnpm discover --host <IP> --ports 80,8008,8080
```

## Output Format

- Show whether the player was found and which endpoint responded
- Show device info table (model, serial, firmware)
- Updates `.brightsign/players.json` with the probed player

## Troubleshooting guidance

If probe fails:

- Add `--verbose` to see connection failure details per port/endpoint
- All four ports (8008, 8080, 80, 443) are tried by default
- Ask about VLAN/subnet mismatch
- Remind that Local DWS may be disabled
- Remind that firewalls may block inbound HTTP
