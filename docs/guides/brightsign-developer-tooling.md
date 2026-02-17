# BrightSign Developer Tooling

This document outlines the developer tooling available for BrightSign deployment workflows.

## Developer-Friendly Features

### ✅ No IP Addresses in Git

All player configuration is stored in files that are git-ignored:
- `.brightsign/players.json` - Local player configurations
- `.env` - Environment variables (optional)

Only example files are committed:
- `.brightsign/players.example.json`
- `.env.example`

### ✅ Multiple Configuration Methods

Choose the approach that works best for your workflow:

1. **Player Registry** (Recommended for teams)
   ```bash
   pnpm player add dev-player 192.168.0.51 --model CL435 --default
   pnpm deploy:local --player dev-player
   ```

2. **Interactive Prompt** (Simplest for ad-hoc testing)
   ```bash
   pnpm deploy:local
   # Enter IP when prompted
   ```

3. **Default Player** (Fastest for daily development)
   ```bash
   pnpm player default dev-player
   pnpm deploy:local  # Uses default automatically
   ```

### ✅ Player Management CLI

Convenient commands for managing BrightSign players:

```bash
# List all configured players
pnpm player list

# Add a new player
pnpm player add my-player 192.168.0.100

# Add with details
pnpm player add lobby-display 192.168.1.50 \
  --model XD1034 \
  --serial ABC123 \
  --description "Lobby display - Floor 1" \
  --tags "prod,lobby" \
  --default

# Remove a player
pnpm player remove my-player

# Set default player
pnpm player default lobby-display

# Get player config as JSON
pnpm player get dev-player
```

### ✅ Rich Player Metadata

Store helpful information with each player:

```json
{
  "name": "lobby-west",
  "ip": "192.168.1.100",
  "port": 8008,
  "model": "XD1034",
  "serial": "C5D51K000123",
  "description": "West lobby - 55\" Samsung display - 1080p",
  "tags": ["prod", "lobby", "floor1"]
}
```

Benefits:
- Know which player is which without memorizing IPs
- Track model and serial for inventory management
- Organize by tags (dev, test, prod, location)
- Document display details and resolution

## Deployment Workflows

### Scenario 1: First-Time Setup

```bash
# Initialize your player configuration
pnpm player add dev-player 192.168.0.51 --model CL435 --default

# Deploy
pnpm deploy:player
```

### Scenario 2: Multiple Players

```bash
# Add all your players once
pnpm player add dev-desk 192.168.0.51 --tags "dev" --default
pnpm player add test-lab 192.168.0.52 --tags "test"
pnpm player add prod-lobby1 192.168.1.100 --tags "prod,lobby"
pnpm player add prod-lobby2 192.168.1.101 --tags "prod,lobby"

# Deploy to specific player
pnpm deploy:local --player test-lab

# Deploy to default
pnpm deploy:local
```

### Scenario 3: Shared Player Configuration

Team members can share non-sensitive player metadata:

```bash
# Export player configurations (without sharing .brightsign/players.json)
pnpm player list > team-players.txt

# Team member creates their own .brightsign/players.json manually
# or uses the example and updates IPs based on team-players.txt
```

**Future enhancement:** Import/export commands
```bash
# Not yet implemented
pnpm player export > players-export.json
pnpm player import players-export.json
```

## Player Discovery

Auto-discover BrightSign players on your local network:

```bash
# Interactive discovery with prompts
pnpm discover

# Quick scan with defaults (192.168.0.0/24)
pnpm discover:scan

# Scan specific subnet
pnpm discover:scan --cidr 10.0.1.0/24

# Thorough scan (more ports: 80, 443, 8008, 8080)
pnpm discover:scan --thorough

# Probe a specific player
pnpm discover:probe 192.168.0.51 --port 8008
```

**How it works:**
- Scans specified subnet for BrightSign players
- Probes common ports (80, 8080, 8008, 443)
- Fingerprints responses from Diagnostic Web Server (DWS)
- Outputs results to `dist/players.json` (gitignored)

**Limitations:**
- Players must be on same network/VLAN
- Local Diagnostic Web Server must be enabled
- Firewalls may block discovery
- Best effort only, not exhaustive

**See:** [tools/player-discovery/README.md](../../tools/player-discovery/README.md) for full documentation.

## Configuration Priority

When deploying, player configuration is determined in this order:

1. **CLI flag:** `--player dev-player`
2. **Default player:** Set via `pnpm player default`
3. **Interactive prompt:** Asks for IP if no config found

## Tooling Wishlist (Future Enhancements)

### ✅ Network Discovery (Implemented)

See "Player Discovery" section above. Auto-discovery of BrightSign players is now available via:
- `pnpm discover` - Interactive mode
- `pnpm discover:scan` - Scriptable mode
- `pnpm discover:probe` - Single player diagnostics

### Player Health Monitoring

```bash
# Check status of configured players
pnpm player status

# Check specific player
pnpm player status dev-player
```

Would show:
- Online/offline status
- Firmware version
- Uptime
- Current content
- Network details

### Fleet Deployment

Deploy to multiple players at once:

```bash
# Deploy to all players with a tag
pnpm deploy:fleet --tag prod

# Deploy to specific players
pnpm deploy:fleet dev-player test-player

# Deploy to all configured players
pnpm deploy:fleet --all
```

### Configuration Sync

Share player configurations securely:

```bash
# Export (strips sensitive data)
pnpm player export --tag prod > prod-players.json

# Import
pnpm player import team-players.json

# Sync with team config (merge players)
pnpm player sync https://example.com/team-config.json
```

### Development Mode

Watch for file changes and auto-deploy:

```bash
# Not yet implemented
pnpm serve:player --auto-deploy
```

Would:
- Watch for file changes
- Auto-rebuild on change
- Auto-deploy to configured player
- Optional: Skip reboot for faster iteration

### BrightSign CDK Integration

BrightSign doesn't currently provide a standalone CDK (Cloud Development Kit) like AWS or Terraform. However, we could create our own abstractions:

**Potential "BrightSign DevKit" features:**
- **Declarative configuration:** Define player setups in JSON/YAML
- **Deployment orchestration:** Coordinated multi-player deployments
- **Content management:** Upload and manage assets separate from app code
- **Remote diagnostics:** Built-in debugging and log collection
- **OTA updates:** Over-the-air update management

Example declarative config:
```yaml
# .brightsign/fleet.yml
players:
  - name: lobby-displays
    count: 3
    model: XD1034
    network:
      discovery: dhcp
    content:
      app: player-minimal
      assets:
        - videos/*.mp4
        - images/*.jpg
    schedule:
      type: 24/7
```

## Security and Best Practices

### ✅ Git Hygiene

Always verify before committing:
```bash
git status
# Ensure .brightsign/players.json is NOT listed
# Ensure .env is NOT listed
```

The `.gitignore` excludes:
```gitignore
# Environment variables
.env
.env.local
.env*.local

# BrightSign player configurations
.brightsign/players.json
```

### ✅ Credential Management

If your players require authentication:

**Option 1:** Store in players.json (git-ignored)
```bash
pnpm player add secure-player 192.168.0.51 \
  --username admin \
  --password mypassword
```

**Option 2:** Prompt at runtime (more secure)
```bash
# Modify deploy script to prompt for credentials
# Not yet implemented
```

### ⚠️ Network Security

BrightSign Diagnostic Web Server (DWS) is **not encrypted**:

1. Use separate VLAN for signage network
2. Disable DWS on production players
3. Use BrightSign Network for production deployments
4. Firewall port 8008 to development machines only

## Related Documentation

- [Player Configuration Guide](./brightsign-player-config.md) - Detailed configuration reference
- [Deployment Guide](./brightsign-deployment.md) - Full deployment workflow
- [Testing Guide](../../TESTING_BRIGHTSIGN.md) - Testing procedures

## Questions and Feedback

Have ideas for improving the developer experience?

- Open an issue: [GitHub Issues](https://github.com/CambridgeMonorail/TheSignAge/issues)
- Tag with: `brightsign`, `tooling`, `developer-experience`
