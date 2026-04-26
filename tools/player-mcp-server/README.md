# BrightSign Player Tools MCP Server

A zero-dependency [Model Context Protocol](https://modelcontextprotocol.io/) server that exposes BrightSign player discovery and management as AI-callable tools. Communicates via JSON-RPC 2.0 over stdio.

## Tools

| Tool | Description |
|------|-------------|
| `brightsign_discover_players` | Scan a subnet (CIDR) for BrightSign devices and save results to the local registry |
| `brightsign_probe_player` | Check connectivity to a single player by IP or hostname |
| `brightsign_list_players` | List all registered players (credentials redacted) |
| `brightsign_get_player` | Get a single player's config by name (credentials redacted) |
| `brightsign_add_player` | Register a player in the local registry |
| `brightsign_remove_player` | Remove a player from the local registry |
| `brightsign_get_device_info` | Fetch model, serial number, and firmware from a player's DWS |

## Player registry

Player data is stored in `.brightsign/players.json` at the workspace root. This file is:

- **Created automatically** by `brightsign_discover_players` or `brightsign_add_player`
- **Gitignored** — never committed or shared
- **Local only** — contains network addresses and optional credentials

## Usage

### In the workspace (development)

Already configured in `.vscode/mcp.json`. Reload VS Code and the server appears in **MCP: List Servers**.

### Via the Copilot agent plugin

The server is bundled at `copilot-plugins/wallrun-signage/servers/player-tools.mjs` and wired in the plugin's `.mcp.json`. Installing the plugin makes the tools available in any workspace.

### Standalone

```bash
node tools/player-mcp-server/server.mjs
```

The server reads JSON-RPC messages from stdin and writes responses to stdout.

## Security

- Credentials (username/password) are **redacted** in all tool responses — they never appear in AI context
- The player registry file is gitignored and excluded from the plugin build
- The server runs locally and makes HTTP requests only to player IPs you specify

## Rebuilding

This file is copied into the Copilot plugin during `pnpm plugin:copilot:build`. After changes:

```bash
pnpm plugin:copilot:build
pnpm plugin:copilot:check
```
