---
name: player-discovery-scan
description: Scan a local subnet to discover BrightSign players via DWS fingerprinting and update .brightsign/players.json. Use when asked to find players on a LAN or scan a CIDR range.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '2.0'
  internal: true
  argument-hint: '[--cidr 192.168.0.0/24]'
  user-invokable: true
---

# Player Discovery Scan

## Purpose

Discover BrightSign players on the local network via DWS fingerprinting and write results to `.brightsign/players.json`.

## Safety and boundaries

- Without `--cidr`, the tool auto-detects local private subnets (safe).
- With `--cidr`, only the user-provided range is scanned.
- `.brightsign/players.json` is gitignored — never commit it.
- Prefer `--host <ip>` before scanning a full subnet when debugging.

## Workflow

1. If the user provides a CIDR, use it. Otherwise auto-detect.
2. Run the discover command.
3. Report the number of players found.
4. Confirm `.brightsign/players.json` was updated.

## Commands to run

Auto-detect and scan:

```bash
pnpm discover
```

Scan explicit subnet:

```bash
pnpm discover --cidr <CIDR>
```

Results are written to `.brightsign/players.json` (gitignored).

## Output Format

- Print a summary table: IP, model, serial, firmware, name
- Confirm output path: `.brightsign/players.json`
- Show number of players found

## Troubleshooting guidance

If zero results:

- Ask whether the developer is on the same VLAN/subnet as the players
- Remind that Local DWS may be disabled or blocked by firewall rules
- Suggest running `pnpm discover --host <IP> --verbose` for a known player first
