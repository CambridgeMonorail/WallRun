---
name: player-discovery-export
description: Export player discovery results to JSON for sharing. Use when asked to get raw discovery output or pipe results to another tool.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '2.0'
  internal: true
  argument-hint: ''
  user-invokable: true
---

# Player Discovery Export

## Purpose

Output discovery results as raw JSON to stdout for piping to other tools or sharing.

## Safety and boundaries

- Treat outputs as sensitive (internal IPs, device metadata).
- Never commit discovery outputs to Git.

## Workflow

1. Run the discover command with `--json`
2. Pipe or redirect output as needed

## Commands to run

Print raw JSON to stdout (no file write):

```bash
pnpm discover --json
```

Redirect to a file:

```bash
pnpm discover --json > discovery-results.json
```

## Output Format

- JSON array of discovered players with ip, port, evidence, deviceInfo
- Suitable for piping to `jq`, sharing, or importing into other tools
