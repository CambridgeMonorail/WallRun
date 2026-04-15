import { resolve } from 'node:path';
import { getOutputDir, getWorkspaceRoot } from './config.js';
import type { KnipReport } from './types.js';
import { writeJson } from './utils/fs.js';
import { log, runCommand } from './utils/process.js';

/**
 * Run Knip dead code detection and write results to JSON
 */
export async function runKnip(): Promise<KnipReport> {
  const workspaceRoot = getWorkspaceRoot();
  const outputDir = getOutputDir(workspaceRoot);
  const outputPath = resolve(outputDir, 'knip.json');

  log('Running Knip dead code detection...');

  // Run Knip with JSON reporter
  const result = runCommand('pnpm exec knip --reporter json', {
    cwd: workspaceRoot,
  });

  // Knip exits with non-zero when it finds issues, but still outputs JSON
  let report: KnipReport;

  if (result.stdout.trim()) {
    try {
      report = JSON.parse(result.stdout) as KnipReport;
    } catch (parseError) {
      log(`Failed to parse Knip output: ${parseError}`, 'error');
      log(`Raw output: ${result.stdout.slice(0, 500)}`, 'error');
      report = {};
    }
  } else if (result.stderr.includes('No issues found')) {
    log('No dead code issues found');
    report = {};
  } else {
    // Empty report if no output
    log('Knip produced no JSON output', 'warn');
    report = {};
  }

  // Write the report
  writeJson(outputPath, report);
  log(`Knip report written to ${outputPath}`);

  return report;
}

/**
 * Count total issues in a Knip report
 */
export function countKnipIssues(report: KnipReport): number {
  let count = 0;
  if (report.files) count += report.files.length;
  if (report.dependencies) count += report.dependencies.length;
  if (report.devDependencies) count += report.devDependencies.length;
  if (report.unlisted) count += report.unlisted.length;
  if (report.exports) count += report.exports.length;
  if (report.types) count += report.types.length;
  if (report.duplicates) count += report.duplicates.length;
  if (report.enumMembers) count += report.enumMembers.length;
  if (report.classMembers) count += report.classMembers.length;
  return count;
}
