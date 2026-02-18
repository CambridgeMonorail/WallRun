---
name: player-discovery-scan
description: Discover BrightSign players on a local subnet by running the player discovery scan and writing results to dist/players.json. Use when asked to find players on a LAN or scan a CIDR range.
argument-hint: "<cidr> e.g. 192.168.0.0/24"
user-invokable: true
---

# Player Discovery Scan

## Purpose
Run the Nx-based player discovery scan against a developer-provided CIDR to find BrightSign players via Diagnostic Web Server (DWS) fingerprinting.

## Safety and boundaries
- Never scan without an explicit CIDR provided by the user.
- Never widen the scan beyond what the user asked for.
- Outputs are sensitive. Always write to `dist/` and never commit results.
- Prefer probing a known IP before scanning a full subnet when debugging.

## Commands to run
Run a scan (scriptable):

```bash
nx run player-discovery:scan -- --cidr <CIDR>
```

This writes results to:
- `dist/players.json` (gitignored)

Optional thorough scan (more ports):

```bash
nx run player-discovery:scan -- --cidr <CIDR> --thorough
```

## Output expectations
- Print a short summary: number of players found
- Confirm output path: `dist/players.json`
- Remind: `dist/players.json` is gitignored and must not be committed

## Troubleshooting guidance
If zero results:
- Ask whether the developer is on the same VLAN/subnet as the players
- Remind that Local DWS may be disabled or blocked by firewall rules
- Suggest running `/player-discovery-probe <IP>` for a known player first
