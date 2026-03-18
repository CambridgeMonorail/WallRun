# Player Discovery

Scan your local network for BrightSign players and write the results to `.brightsign/players.json` so deployment scripts can use them.

This is **developer tooling** for local discovery — not a production inventory system.

---

## Quick Start

```bash
# Scan local network, update .brightsign/players.json
pnpm discover

# Scan a specific subnet
pnpm discover --cidr 192.168.0.0/24

# Probe a single player
pnpm discover --host 192.168.0.42

# Print raw JSON to stdout (no file write)
pnpm discover --json

# Debug connection failures
pnpm discover --verbose

# See all options
pnpm discover help
```

A new developer should only need `pnpm discover` — the tool auto-detects local subnets, probes BrightSign DWS ports (8008, 8080, 80, 443), and writes discovered players to `.brightsign/players.json`.

---

## How It Works

1. **Auto-detect subnets** — reads local network interfaces and scans every private /24
2. **Probe BrightSign ports** — tries 8008 first (modern DWS), then 8080, 80, 443
3. **Fingerprint responses** — matches BrightSign-specific markers (server header, DWS HTML, `bsp.js`, API JSON, 401 auth)
4. **Enrich with device info** — hits `/api/v1/info`, `/GetDeviceInfo`, `/GetID` for model, serial, firmware
5. **Write players.json** — merges with existing entries, marks offline players, uses schema-valid kebab-case names

---

## Output

Results are written to `.brightsign/players.json` following the schema in `.brightsign/players.schema.json`:

```json
{
  "$schema": "./players.schema.json",
  "players": [
    {
      "name": "player-42",
      "ip": "192.168.0.42",
      "port": 8008,
      "model": "XD1035",
      "serial": "XDB00212345",
      "firmware": "9.0.159",
      "tags": ["discovered"]
    }
  ],
  "default": "player-42"
}
```

Existing entries are preserved on re-scan — user-set names, tags, and descriptions are kept. Players that were previously discovered but are now offline get an `offline` tag.

---

## Integration with Player Config

After discovery, use the player config tool to manage the registry:

```bash
pnpm player:list          # List registered players
pnpm player:add <name> <ip>  # Manually add a player
pnpm player:remove <name>    # Remove a player
```

Deployment scripts (`scripts/deploy-*.mjs`) read from `.brightsign/players.json`.

---

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--cidr <subnet>` | CIDR range to scan | Auto-detect local subnets |
| `--host <ip>` | Probe a single IP | — |
| `--ports <list>` | Comma-separated ports | `8008,8080,80,443` |
| `--timeout <ms>` | Probe timeout | `1500` |
| `--concurrency <n>` | Parallel probes | `32` |
| `--output <path>` | Override output file | `.brightsign/players.json` |
| `--json` | Print JSON to stdout, skip file write | — |
| `--verbose` | Show per-host failure details | — |

---

## Troubleshooting

Discovery will miss players if:

- **Different VLAN** — Players must be on the same network segment as your machine
- **Firewall blocking** — Inbound HTTP to the player must be allowed
- **Local DWS disabled** — The Diagnostic Web Server must be enabled on the player
- **Wi-Fi isolation** — Some networks block client-to-client traffic

Debug with `pnpm discover --host <ip> --verbose` to see exactly why a specific player isn't being found.

---

## Nx Integration

Registered as the `player-discovery` Nx project:

```bash
nx run player-discovery:discover    # Scan and write players.json
nx run player-discovery:probe -- --host <ip>  # Probe single host
```

Pass `--host <ip>` after the `--` separator so Nx forwards the arguments to the
underlying discovery script.

pnpm shortcuts:

```bash
pnpm discover               # Full scan
pnpm discover:probe <ip>    # Single host
```
