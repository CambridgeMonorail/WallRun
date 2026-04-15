#!/usr/bin/env node
/**
 * Code Health CLI
 *
 * Usage:
 *   tsx tools/code-health/src/cli.ts knip      - Run Knip dead code detection
 *   tsx tools/code-health/src/cli.ts jscpd     - Run jscpd duplication detection
 *   tsx tools/code-health/src/cli.ts run       - Run both tools and merge
 *   tsx tools/code-health/src/cli.ts summary   - Generate summary from existing reports
 */

import { runKnip, countKnipIssues } from './run-knip.js';
import { runJscpd, countJscpdDuplicates } from './run-jscpd.js';
import { mergeFindings } from './merge-findings.js';
import { summariseFindings } from './summarise-findings.js';
import { log } from './utils/process.js';

type Command = 'knip' | 'jscpd' | 'run' | 'summary' | 'help';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = (args[0] ?? 'help') as Command;

  switch (command) {
    case 'knip':
      await runKnipCommand();
      break;

    case 'jscpd':
      await runJscpdCommand();
      break;

    case 'run':
      await runFullWorkflow();
      break;

    case 'summary':
      await runSummaryCommand();
      break;

    case 'help':
    default:
      printHelp();
      break;
  }
}

async function runKnipCommand(): Promise<void> {
  log('Starting Knip analysis...');
  const report = await runKnip();
  const count = countKnipIssues(report);
  log(`Knip found ${count} potential issues`);
}

async function runJscpdCommand(): Promise<void> {
  log('Starting jscpd analysis...');
  const report = await runJscpd();
  const count = countJscpdDuplicates(report);
  log(`jscpd found ${count} duplication blocks`);
}

async function runFullWorkflow(): Promise<void> {
  log('Running full code health workflow...\n');

  // Run both tools
  await runKnipCommand();
  console.log();
  await runJscpdCommand();
  console.log();

  // Merge findings
  await mergeFindings();
  console.log();

  // Generate summary
  await summariseFindings();
}

async function runSummaryCommand(): Promise<void> {
  log('Generating summary from existing reports...');
  await summariseFindings();
}

function printHelp(): void {
  console.log(`
Code Health CLI

Usage:
  tsx tools/code-health/src/cli.ts <command>

Commands:
  knip      Run Knip dead code detection
  jscpd     Run jscpd duplication detection
  run       Run both tools, merge findings, and generate summary
  summary   Generate summary from existing reports
  help      Show this help message

Examples:
  pnpm code-health:run        # Full workflow
  pnpm code-health:knip       # Dead code only
  pnpm code-health:jscpd      # Duplication only
  pnpm code-health:summary    # Regenerate summary

Output:
  Reports are written to reports/code-health/
`);
}

main().catch((error) => {
  log(`Error: ${error instanceof Error ? error.message : String(error)}`, 'error');
  process.exit(1);
});
