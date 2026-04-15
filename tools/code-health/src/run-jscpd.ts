import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { CONFIG, getOutputDir, getWorkspaceRoot } from './config.js';
import type { JscpdReport, JscpdClone, JscpdStatistics } from './types.js';
import { fileExists, readJson, writeJson } from './utils/fs.js';
import { log, runCommand } from './utils/process.js';

/**
 * Run jscpd duplication detection and write results to JSON
 */
export async function runJscpd(): Promise<JscpdReport> {
  const workspaceRoot = getWorkspaceRoot();
  const outputDir = getOutputDir(workspaceRoot);
  const outputPath = resolve(outputDir, 'jscpd.json');

  log('Running jscpd duplication detection...');

  // Build ignore pattern for jscpd
  const ignorePattern = [
    ...CONFIG.excludeDirs.map((d) => `**/${d}/**`),
    ...CONFIG.excludePatterns,
  ].join(',');

  // Run jscpd with JSON reporter
  // jscpd writes to a directory, not a single file
  const result = runCommand(
    `pnpm exec jscpd . --reporters json --output "${outputDir}" --ignore "${ignorePattern}" --min-lines ${CONFIG.minDuplicationLines} --min-tokens ${CONFIG.minDuplicationTokens}`,
    { cwd: workspaceRoot }
  );

  if (!result.success && result.exitCode !== 0) {
    // jscpd may exit non-zero when duplicates found
    log(`jscpd exited with code ${result.exitCode}`, 'warn');
  }

  // jscpd writes jscpd-report.json to the output directory
  const jscpdReportPath = resolve(outputDir, 'jscpd-report.json');

  let report: JscpdReport;

  if (fileExists(jscpdReportPath)) {
    report = readJson<JscpdReport>(jscpdReportPath);
    // Copy to our standard filename
    writeJson(outputPath, report);
    log(`jscpd report written to ${outputPath}`);
  } else {
    // Check for any JSON file in output dir
    const files = readdirSync(outputDir).filter((f) => f.endsWith('.json'));
    const jscpdFile = files.find((f) => f.includes('jscpd'));

    if (jscpdFile) {
      const foundPath = resolve(outputDir, jscpdFile);
      report = readJson<JscpdReport>(foundPath);
      writeJson(outputPath, report);
      log(`jscpd report written to ${outputPath}`);
    } else {
      log('No jscpd report generated - creating empty report', 'warn');
      report = createEmptyJscpdReport();
      writeJson(outputPath, report);
    }
  }

  return report;
}

/**
 * Create an empty jscpd report
 */
function createEmptyJscpdReport(): JscpdReport {
  return {
    statistics: {
      detectionDate: new Date().toISOString(),
      formats: {},
      total: {
        sources: 0,
        files: 0,
        lines: 0,
        tokens: 0,
        clones: 0,
        duplicatedLines: 0,
        duplicatedTokens: 0,
        percentage: 0,
        percentageTokens: 0,
      },
    },
    duplicates: [],
  };
}

/**
 * Count total duplicates in a jscpd report
 */
export function countJscpdDuplicates(report: JscpdReport): number {
  return report.duplicates?.length ?? 0;
}
