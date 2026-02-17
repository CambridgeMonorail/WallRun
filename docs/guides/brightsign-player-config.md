# BrightSign Player Configuration Guide

This repository provides developer-friendly tools for managing BrightSign player configurations without committing IP addresses to the repository.

## Quick Start

### 1. Set Up Your Player Configuration

Choose **ONE** of these methods:

#### Option A: Player Configuration File (Recommended for Multiple Players)

1. **Copy the example file:**
   ```bash
   cp .brightsign/players.example.json .brightsign/players.json
   ```

2. **Add your player:**
   ```bash
   pnpm player add dev-player 192.168.0.51 --model CL435 --default
   ```

3. **List configured players:**
   ```bash
   pnpm player list
   ```

#### Option B: Environment Variable (Simple Single Player)

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and uncomment/set:**
   ```env
   BRIGHTSIGN_PLAYER_IP=192.168.0.51
   BRIGHTSIGN_DWS_PORT=8008
   ```

#### Option C: Interactive Prompt (No Configuration)

Just run deploy commands directly - you'll be prompted for the IP address:

```bash
pnpm deploy:local
# Enter player IP when prompted: 192.168.0.51
```

---

## Player Management CLI

The `pnpm player` command provides a convenient CLI for managing multiple BrightSign players.

### List All Players

```bash
pnpm player list
```

Output:
```
📺 Configured BrightSign Players:

  • dev-player (default)
    IP: 192.168.0.51:8008
    Model: CL435
    Serial: C5D51K000056
    Development player in office
    Tags: dev, office

  • test-player
    IP: 192.168.0.52:8008
    Model: XD1034
    Test player in lab
    Tags: test, lab
```

### Add a New Player

**Basic:**
```bash
pnpm player add my-player 192.168.0.100
```

**With full details:**
```bash
pnpm player add dev-player 192.168.0.51 \
  --model CL435 \
  --serial C5D51K000056 \
  --description "Development player in office" \
  --tags "dev,office" \
  --port 8008 \
  --default
```

### Remove a Player

```bash
pnpm player remove my-player
```

### Set Default Player

```bash
pnpm player default dev-player
```

The default player is used when you don't specify `--player` in deployment commands.

### Get Player Configuration (JSON)

```bash
pnpm player get dev-player
```

Returns:
```json
{
  "name": "dev-player",
  "ip": "192.168.0.51",
  "port": 8008,
  "model": "CL435",
  "serial": "C5D51K000056",
  "description": "Development player in office",
  "tags": ["dev", "office"]
}
```

---

## Deployment with Configured Players

Once you've configured players, deployment becomes simple:

### Deploy to Default Player

```bash
pnpm deploy:player
```

This will:
1. Build the player-minimal app
2. Package it for BrightSign
3. Deploy to your default player
4. Reboot the player

### Deploy to Specific Player

Modify `scripts/deploy-local.mjs` to accept a `--player` flag (future enhancement):

```bash
pnpm deploy:local --player test-player
```

---

## Configuration Files Reference

### `.brightsign/players.json`

**Location:** `.brightsign/players.json` (git-ignored)  
**Purpose:** Store multiple player configurations locally  
**Schema:** `.brightsign/players.schema.json`

**Structure:**
```json
{
  "players": [
    {
      "name": "dev-player",
      "ip": "192.168.0.51",
      "port": 8008,
      "model": "CL435",
      "serial": "C5D51K000056",
      "description": "Development player in office",
      "tags": ["dev", "office"]
    }
  ],
  "default": "dev-player"
}
```

**Fields:**
- `name` (required): Unique identifier (lowercase, hyphens allowed)
- `ip` (required): IP address or hostname
- `port` (optional): DWS port (default: 8008)
- `model` (optional): BrightSign model name
- `serial` (optional): Player serial number
- `description` (optional): Human-readable description
- `tags` (optional): Array of tags for organization
- `username` (optional): Authentication username
- `password` (optional): Authentication password

### `.env` File

**Location:** `.env` (git-ignored)  
**Purpose:** Environment variables for deployment  
**Template:** `.env.example`

**Available Variables:**
```env
# Player connection
BRIGHTSIGN_PLAYER_IP=192.168.0.51
BRIGHTSIGN_PLAYER_HOST=brightsign-player.local
BRIGHTSIGN_DWS_PORT=8008

# Optional authentication
BRIGHTSIGN_USERNAME=admin
BRIGHTSIGN_PASSWORD=admin

# Development settings
AUTO_DEPLOY_ON_SAVE=false
SKIP_REBOOT_AFTER_DEPLOY=false
```

---

## Best Practices

### 1. **Use Player Names, Not IPs in Documentation**

❌ **Don't:**
```bash
# In team chat or documentation
Deploy to 192.168.0.51
```

✅ **Do:**
```bash
# In team chat or documentation
Deploy to dev-player
pnpm deploy:local --player dev-player
```

### 2. **Tag Players by Purpose**

Organize players with tags:
```bash
pnpm player add lobby-1 192.168.1.100 --tags "prod,lobby,floor1"
pnpm player add lobby-2 192.168.1.101 --tags "prod,lobby,floor2"
pnpm player add dev-desk 192.168.0.51 --tags "dev,desk"
```

### 3. **Set Meaningful Names**

Use location or purpose-based names:
- ✅ `lobby-player`, `conference-room-a`, `dev-player`
- ❌ `player1`, `bs1`, `test`

### 4. **Document Player Details**

Add helpful descriptions:
```bash
pnpm player add lobby-west 192.168.1.100 \
  --description "West lobby - 55\" Samsung display - 1080p" \
  --model XD1034
```

### 5. **Keep Example Files Updated**

When adding a new type of player configuration, update `.brightsign/players.example.json` with the pattern (but use fake IPs).

### 6. **Never Commit Real IPs**

Always verify before committing:
```bash
git status
# Ensure .brightsign/players.json and .env are NOT staged
```

The `.gitignore` file is configured to exclude:
- `.env` and `.env.local`
- `.brightsign/players.json`

Only `.brightsign/players.example.json` and `.env.example` are committed.

---

## Troubleshooting

### "No players configured yet"

**Problem:** Running `pnpm player list` shows no players.

**Solution:**
```bash
# Create players.json from example
cp .brightsign/players.example.json .brightsign/players.json

# Or add a player directly
pnpm player add dev-player 192.168.0.51 --default
```

### "Player not found: dev-player"

**Problem:** Referenced player doesn't exist in configuration.

**Solution:**
```bash
# List available players
pnpm player list

# Add the missing player
pnpm player add dev-player 192.168.0.51
```

### "No default player configured"

**Problem:** No default player is set.

**Solution:**
```bash
pnpm player default dev-player
```

### Environment Variable vs. Players.json

**Problem:** Both `.env` and `.brightsign/players.json` are configured - which wins?

**Priority Order:**
1. Command-line flags (e.g., `--player`)
2. Environment variables (`.env`)
3. Players configuration (`.brightsign/players.json` default player)
4. Interactive prompt

---

## Future Enhancements

Potential improvements to the player management system:

### Network Discovery

Automatically discover BrightSign players on the network:
```bash
pnpm player discover
```

### Player Health Monitoring

Check player status:
```bash
pnpm player status dev-player
```

### Deployment Profiles

Deploy to multiple players:
```bash
pnpm deploy:fleet --tag prod
```

### Configuration Sync

Sync player configurations with a team:
```bash
pnpm player import team-players.json
pnpm player export --tag prod > prod-players.json
```

---

## Security Considerations

### Authentication

If your players require authentication, store credentials in `.env`:
```env
BRIGHTSIGN_USERNAME=admin
BRIGHTSIGN_PASSWORD=my-secure-password
```

Never commit `.env` to the repository.

### Network Security

BrightSign Diagnostic Web Server (DWS) is **not encrypted**. Recommendations:

1. **Isolate signage network** - Keep BrightSign players on a separate VLAN
2. **Disable DWS in production** - Only enable for development/testing
3. **Use BrightSign Network** - For production deployments, use BrightSign's cloud platform
4. **Firewall rules** - Restrict DWS port 8008 to development machines only

### Git Hygiene

Before committing:
```bash
# Check what's being committed
git diff --staged

# Verify no sensitive files
git status | grep -E "(\.env$|players\.json$)"
```

If you accidentally commit sensitive data:
```bash
# Remove from git history (use with caution)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .brightsign/players.json" \
  --prune-empty --tag-name-filter cat -- --all
```

---

## Related Documentation

- [BrightSign Deployment Guide](./brightsign-deployment.md) - Full deployment workflow
- [Testing Guide](../../TESTING_BRIGHTSIGN.md) - Testing checklist and procedures
- [BrightSign Package Format](./brightsign-deployment.md#package-format) - Package structure details

---

## Questions?

If you have questions or suggestions for improving the player management workflow, please:

1. Check existing issues: [GitHub Issues](https://github.com/CambridgeMonorail/TheSignAge/issues)
2. Create a new issue with label `brightsign` and `tooling`
3. Discuss in team chat before committing configuration patterns
