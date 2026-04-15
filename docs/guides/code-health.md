# Code Health Tool

> Local dead code and duplication detection for the WallRun monorepo.

## Quick Start

```bash
# Run full analysis
pnpm code-health:run

# View summary
cat reports/code-health/summary.md
```

## What It Does

The code health tool combines two static analysis tools:

1. **Knip** - Finds unused code:
   - Unused files
   - Unused exports
   - Unused dependencies
   - Unused devDependencies

2. **jscpd** - Finds duplicated code:
   - Copy-pasted code blocks
   - Similar patterns across files

## Commands

| Command                    | Description                                    |
| -------------------------- | ---------------------------------------------- |
| `pnpm code-health:run`     | Full workflow (knip + jscpd + merge + summary) |
| `pnpm code-health:knip`    | Dead code detection only                       |
| `pnpm code-health:jscpd`   | Duplication detection only                     |
| `pnpm code-health:summary` | Regenerate summary from existing reports       |

## Output

Reports are written to `reports/code-health/`:

```
reports/code-health/
├── knip.json       # Raw Knip output
├── jscpd.json      # Raw jscpd output
├── unified.json    # Merged findings with categories
└── summary.md      # Human-readable summary
```

### Confidence Buckets

Findings are categorized by confidence level:

| Bucket     | Description                            | Examples                                |
| ---------- | -------------------------------------- | --------------------------------------- |
| **Safe**   | High-confidence, can fix immediately   | Unused dependencies, large duplications |
| **Likely** | Medium-confidence, worth reviewing     | Unused files                            |
| **Review** | Low-confidence, may be false positives | Unused exports (could be public API)    |

## Copilot Integration

Use the `/code-health` prompt to run analysis interactively:

```
/code-health Run code health analysis and show me what needs cleanup
```

The prompt guides Copilot through:

1. Running the analysis
2. Presenting findings by confidence
3. Suggesting specific actions
4. Verifying changes

## Configuration

Configuration is defined in `tools/code-health/src/config.ts`:

- `excludeDirs` - Directories to skip (node_modules, dist, etc.)
- `excludePatterns` - File patterns to ignore
- `minDuplicationLines` - Minimum lines for duplication detection (default: 5)
- `minDuplicationTokens` - Minimum tokens for duplication detection (default: 50)
- `safeCleanupThreshold` - Lines threshold for high-confidence duplications

## Architecture

```
tools/code-health/src/
├── cli.ts                 # CLI entry point
├── config.ts              # Configuration constants
├── types.ts               # TypeScript interfaces
├── run-knip.ts            # Knip runner
├── run-jscpd.ts           # jscpd runner
├── merge-findings.ts      # Report merger
├── summarise-findings.ts  # Summary generator
└── utils/
    ├── fs.ts              # File system utilities
    └── process.ts         # Command execution
```

## Extending

### Adding New Analysis Tools

1. Create a new runner file (e.g., `run-eslint.ts`)
2. Add output types to `types.ts`
3. Update `merge-findings.ts` to include new findings
4. Add CLI subcommand in `cli.ts`

### Customizing Categories

Edit `summarise-findings.ts` to adjust how findings are categorized into confidence buckets.

## Troubleshooting

### "Knip report not found"

Ensure Knip ran successfully:

```bash
pnpm code-health:knip
```

### "jscpd report not found"

Ensure jscpd ran successfully:

```bash
pnpm code-health:jscpd
```

### Empty reports

Check that the workspace has files to analyze. Run with verbose output:

```bash
pnpm exec knip --reporter json
```

## Related

- [Knip documentation](https://knip.dev/)
- [jscpd documentation](https://github.com/kucherenko/jscpd)
- [Local Code Health Agent Wrapper spec](../new-features/local-code-health-agent-wrapper.md)
