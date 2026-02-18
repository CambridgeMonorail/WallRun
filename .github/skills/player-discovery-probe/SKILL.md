---
name: player-discovery-probe
description: Probe a single IP address for BrightSign Diagnostic Web Server (DWS) and print diagnostics. Use when asked to check whether a specific player is reachable.
argument-hint: "<ip> e.g. 192.168.1.50 [--port 80|8008|8080]"
user-invokable: true
---

# Player Discovery Probe

## Purpose
Quickly verify that a specific host responds and looks like a BrightSign player.

## Safety and boundaries
- Only probe the explicit IP provided by the user.
- Do not scan CIDR ranges in this skill.
- Do not store secrets.

## Commands to run
Probe a player (choose port if needed):

```bash
nx run player-discovery:probe -- --ip <IP>
```

Optional port override:

```bash
nx run player-discovery:probe -- --ip <IP> --port 80
```

## Output expectations
- Show whether the player was found and which endpoint responded
- Show a short, human-readable diagnostics block

## Troubleshooting guidance
If probe fails:
- Suggest trying different ports (`--port 80`, `--port 8080`, `--port 8008`)
- Ask about VLAN/subnet mismatch
- Remind that Local DWS may be disabled
- Remind that firewalls may block inbound HTTP
