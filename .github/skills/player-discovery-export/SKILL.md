---
name: player-discovery-export
description: Export player discovery results to JSON and CSV and print a terminal-friendly summary. Use when asked to share results in a readable way or generate CSV for support.
argument-hint: "[--in dist/players.json] [--json dist/players.json] [--csv dist/players.csv]"
user-invokable: true
---

# Player Discovery Export

## Purpose
Transform discovery results into a developer-friendly summary and optional CSV file.

## Safety and boundaries
- Treat outputs as sensitive (internal IPs, device metadata).
- Always write generated files to `dist/`.
- Never commit generated files.

## Commands to run
Export from `dist/players.json` (defaults):

```bash
nx run player-discovery:export
```

Export with explicit paths:

```bash
nx run player-discovery:export -- --in dist/players.json --json dist/players.json --csv dist/players.csv
```

## Output expectations
- Print total count
- Print output paths written
- Print a small preview table (first 20)
- Remind that `dist/*` outputs are gitignored
