---
name: player-discovery-export
description: Export player discovery results to JSON and CSV and print a terminal-friendly summary. Use when asked to share results in a readable way or generate CSV for support.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
  internal: true
  argument-hint: '[--in dist/players.json] [--json dist/players.json] [--csv dist/players.csv]'
  user-invokable: true
---

# Player Discovery Export

## Purpose

Transform discovery results into a developer-friendly summary and optional CSV file.

## Safety and boundaries

- Treat outputs as sensitive (internal IPs, device metadata).
- Always write generated files to `dist/`.
- Never commit generated files.

## Workflow

1. Confirm `dist/players.json` exists from a previous scan
2. Run the export command
3. Report total count, output paths, and a preview table
4. Remind that `dist/*` outputs are gitignored

## Commands to run

Export from `dist/players.json` (defaults):

```bash
nx run player-discovery:export
```

Export with explicit paths:

```bash
nx run player-discovery:export -- --in dist/players.json --json dist/players.json --csv dist/players.csv
```

## Output Format

- Print total count
- Print output paths written
- Print a small preview table (first 20)
- Remind that `dist/*` outputs are gitignored
