# Player Discovery Tooling

## What this is for

This tooling exists to help developers **discover BrightSign players on a local network** during development, testing, and on-site diagnostics.

It is **not** a production inventory system and it is **not** a replacement for BSN.cloud.

The goals are:

- Quickly answer "what players are on this LAN right now?"
- Give developers a **friendly terminal experience**, not a pile of scripts
- Produce **machine-readable discovery data** that other tools can consume
- Keep sensitive network and device data **out of Git**

This is developer tooling, not a product feature.

---

## Quick Start

```bash
# Interactive discovery with prompts
pnpm discover

# Quick scan with defaults (192.168.0.0/24)
pnpm discover:scan

# Scan specific subnet
pnpm discover:scan --cidr 10.0.1.0/24

# Thorough scan (more ports)
pnpm discover:scan --thorough

# Probe a specific player
pnpm discover:probe 192.168.0.51

# Probe on different port
pnpm discover:probe 192.168.0.51 --port 8080

# Export existing results to JSON + CSV
pnpm discover:export
```

---

## How it works

The discovery tool:

1. Scans a specified subnet (e.g., `192.168.0.0/24`)
2. Probes common BrightSign ports (80, 8080, optionally 443, 8008)
3. Fingerprints hosts that respond like BrightSign Diagnostic Web Server (DWS)
4. Outputs discovered players to `dist/players.json` (gitignored)

Optional enhancements:
- Enrich results using Local DWS APIs if enabled
- Fetch device info (model, serial, firmware)
- Export to CSV for sharing

---

## Output Files

Discovery results are written to:

- `dist/players.json` - Primary output (machine-readable)
- `dist/players.csv` - Optional CSV export

**These files are gitignored** - they contain internal IP addresses and device identifiers.

Example `dist/players.json`:

```json
[
  {
    "ip": "192.168.0.51",
    "port": 80,
    "evidence": "body:diagnostic web server",
    "discoveredAt": "2026-02-17T18:30:00.000Z",
    "deviceInfo": {
      "model": "CL435",
      "serial": "C5D51K000056",
      "firmware": "9.1.92"
    }
  }
]
```

---

## Integration with Player Config

Discovery output can be imported into the player registry:

```bash
# Discover players
pnpm discover:scan

# Add discovered player to registry
pnpm player add dev-player 192.168.0.51 --model CL435 --default
```

Future enhancement: `pnpm player import dist/players.json`

---

## Known Limitations

Discovery will miss players if:

- **Different VLAN** - Players must be on same network segment
- **Firewall blocking** - Inbound HTTP must be allowed
- **Local DWS disabled** - Diagnostic Web Server must be enabled on player
- **Wi-Fi isolation** - Some networks block client-to-client communication

This is expected behavior, not a bug. Discovery is **best effort**.

---

## What it does NOT do

- Does not magically find players across VLANs
- Does not bypass firewalls or disabled Local DWS
- Does not talk to BSN.cloud
- Does not store or persist inventory long term
- Does not authenticate or modify player settings

For reliable fleet management, use BSN.cloud or deploy self-reporting apps to players.

---

## Nx Integration

The discovery tool is registered as an Nx project with three targets:

- `nx run player-discovery:discover` - Interactive mode
- `nx run player-discovery:scan` - Non-interactive scan
- `nx run player-discovery:probe` - Single player probe

These are also exposed as pnpm scripts for convenience:

- `pnpm discover`
- `pnpm discover:scan`
- `pnpm discover:probe`

---

## Troubleshooting

### No players found

1. **Check network**: Are you on the same network?
2. **Check DWS**: Is Local Diagnostic Web Server enabled?
3. **Check power**: Are the players powered on?
4. **Check firewall**: Are ports 80/8080 accessible?
5. **Try thorough scan**: `pnpm discover:scan --thorough`

### Wrong subnet

Use `--cidr` to specify your network:

```bash
pnpm discover:scan --cidr 10.0.1.0/24
```

### Probe shows nothing

Try different ports:

```bash
pnpm discover:probe 192.168.0.51 --port 80
pnpm discover:probe 192.168.0.51 --port 8080
pnpm discover:probe 192.168.0.51 --port 8008
```

---

## Security Considerations

**Never commit discovery output to git.**

The `.gitignore` file excludes:
- `dist/players.json`
- `dist/players.csv`
- `dist/player-discovery/`

If you need to share results:
- Share manually via secure channel
- Redact IP addresses and serials
- Use temporary sharing (Slack, email, etc.)

---

## Future Enhancements

Potential improvements (not yet implemented):

- **Import to registry**: `pnpm player import dist/players.json`
- **CSV export**: `--format csv` option
- **Network discovery**: `pnpm discover:network` to suggest subnets
- **Health checks**: Ping discovered players for uptime
- **Fleet comparison**: Compare discovery vs. expected inventory

For production inventory, consider:
- Deploy self-reporting app to players
- Players POST identity to central service
- Use discovery only for debugging/edge cases

---

## Summary

This tool helps you find BrightSign players on your local network quickly and safely:

✅ Interactive and scriptable modes  
✅ Machine-readable output  
✅ Git-safe (sensitive data excluded)  
✅ Nx-integrated  
✅ Clear limitations and expectations  

If discovery finds nothing but you expected players, always ask:
**"Am I on the same network, and is Local DWS enabled?"**
