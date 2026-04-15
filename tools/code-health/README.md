# Code Health Tool

Local code health workflow for detecting dead code and duplication in the WallRun monorepo.

## Purpose

This tool wraps [Knip](https://knip.dev/) and [jscpd](https://github.com/kucherenko/jscpd) to provide a unified code health report that surfaces:

- **Dead code** — unused files, exports, and dependencies (via Knip)
- **Duplication** — copy-pasted code blocks (via jscpd)

## Usage

### Run full workflow

```bash
pnpm code-health:run
```

This executes both tools, merges the findings, and generates a summary.

### Run individual tools

```bash
pnpm code-health:knip     # Dead code detection only
pnpm code-health:jscpd    # Duplication detection only
pnpm code-health:summary  # Generate summary from existing reports
```

### Via Nx

```bash
nx run code-health:run
nx run code-health:knip
nx run code-health:jscpd
nx run code-health:summary
```

## Output

Reports are written to `reports/code-health/`:

- `knip.json` — Raw Knip output
- `jscpd.json` — Raw jscpd output
- `unified.json` — Merged and normalized findings
- `summary.md` — Human-readable summary

## Interpreting Results

Findings are grouped into confidence buckets:

- **Safe cleanup** — High-confidence issues that can be fixed immediately
- **Likely cleanup** — Medium-confidence issues worth reviewing
- **Needs review** — Low-confidence findings that may be false positives

## Configuration

Configuration is defined in `tools/code-health/src/config.ts`:

- `excludeDirs` — Directories to skip (node_modules, dist, coverage, etc.)
- `excludePatterns` — File patterns to ignore (tests, stories, type definitions)
- `minDuplicationLines` / `minDuplicationTokens` — Thresholds for duplication detection
- `safeCleanupThreshold` / `likelyCleanupThreshold` — Lines of duplication for confidence buckets

Knip and jscpd are invoked with CLI flags derived from this configuration.

## Development

```bash
# Run tests
nx test code-health

# Type check
nx run code-health:type-check
```
