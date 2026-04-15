import { resolve } from 'node:path';
import { CONFIG, getOutputDir, getWorkspaceRoot } from './config.js';
import type {
  CategorizedFinding,
  ConfidenceBucket,
  SummaryOutput,
  UnifiedReport,
} from './types.js';
import { fileExists, readJson, writeText } from './utils/fs.js';
import { log } from './utils/process.js';

/**
 * Generate a summary from the unified report
 */
export async function summariseFindings(): Promise<SummaryOutput> {
  const workspaceRoot = getWorkspaceRoot();
  const outputDir = getOutputDir(workspaceRoot);

  const unifiedPath = resolve(outputDir, 'unified.json');
  const summaryPath = resolve(outputDir, 'summary.md');

  if (!fileExists(unifiedPath)) {
    log('Unified report not found - run merge first', 'error');
    return {
      safe: [],
      likely: [],
      review: [],
      totals: { safe: 0, likely: 0, review: 0 },
    };
  }

  const report = readJson<UnifiedReport>(unifiedPath);
  const categorized = categorizeFindings(report);

  // Print console summary
  printConsoleSummary(report, categorized);

  // Write markdown summary
  const markdown = generateMarkdownSummary(report, categorized);
  writeText(summaryPath, markdown);
  log(`Summary written to ${summaryPath}`);

  return categorized;
}

/**
 * Categorize findings into confidence buckets
 */
export function categorizeFindings(report: UnifiedReport): SummaryOutput {
  const safe: CategorizedFinding[] = [];
  const likely: CategorizedFinding[] = [];
  const review: CategorizedFinding[] = [];

  // Dead code categorization
  // Unused dependencies are high confidence (safe cleanup)
  for (const dep of report.deadCode.dependencies) {
    safe.push({
      bucket: 'safe',
      type: 'dead-code',
      description: `Unused dependency: ${dep}`,
    });
  }

  for (const dep of report.deadCode.devDependencies) {
    safe.push({
      bucket: 'safe',
      type: 'dead-code',
      description: `Unused devDependency: ${dep}`,
    });
  }

  // Unused files are medium confidence
  for (const file of report.deadCode.files) {
    likely.push({
      bucket: 'likely',
      type: 'dead-code',
      description: `Unused file`,
      file,
    });
  }

  // Unused exports need review (could be public API)
  for (const exp of report.deadCode.exports) {
    review.push({
      bucket: 'review',
      type: 'dead-code',
      description: `Unused export: ${exp.symbol ?? 'unknown'}`,
      file: exp.file,
    });
  }

  // Duplication categorization
  for (const block of report.duplication.blocks) {
    const bucket = getDuplicationBucket(block.lines);
    const finding: CategorizedFinding = {
      bucket,
      type: 'duplication',
      description: `${block.lines} duplicated lines between ${block.files[0]} and ${block.files[1]}`,
      file: block.files[0],
      lines: block.lines,
    };

    if (bucket === 'safe') {
      safe.push(finding);
    } else if (bucket === 'likely') {
      likely.push(finding);
    } else {
      review.push(finding);
    }
  }

  return {
    safe,
    likely,
    review,
    totals: {
      safe: safe.length,
      likely: likely.length,
      review: review.length,
    },
  };
}

/**
 * Determine confidence bucket for duplication based on line count
 */
function getDuplicationBucket(lines: number): ConfidenceBucket {
  if (lines >= CONFIG.safeCleanupThreshold) {
    return 'safe'; // Large duplications are clearly worth fixing
  } else if (lines >= CONFIG.likelyCleanupThreshold) {
    return 'likely';
  }
  return 'review'; // Small duplications may be intentional
}

/**
 * Print a console summary
 */
function printConsoleSummary(
  report: UnifiedReport,
  summary: SummaryOutput,
): void {
  console.log('\n' + '='.repeat(60));
  console.log('CODE HEALTH SUMMARY');
  console.log('='.repeat(60) + '\n');

  console.log(`Generated: ${report.meta.generatedAt}`);
  console.log(`Workspace: ${report.meta.workspace}\n`);

  console.log('DEAD CODE');
  console.log('-'.repeat(40));
  console.log(`  Unused files:          ${report.deadCode.files.length}`);
  console.log(`  Unused exports:        ${report.deadCode.exports.length}`);
  console.log(
    `  Unused dependencies:   ${report.deadCode.dependencies.length}`,
  );
  console.log(
    `  Unused devDeps:        ${report.deadCode.devDependencies.length}`,
  );
  console.log();

  console.log('DUPLICATION');
  console.log('-'.repeat(40));
  console.log(
    `  Clone blocks:          ${report.duplication.statistics.cloneCount}`,
  );
  console.log(
    `  Duplicated lines:      ${report.duplication.statistics.duplicatedLines}`,
  );
  console.log(
    `  Duplication %:         ${report.duplication.statistics.duplicatedPercentage.toFixed(2)}%`,
  );
  console.log();

  console.log('CONFIDENCE BUCKETS');
  console.log('-'.repeat(40));
  console.log(`  ✅ Safe cleanup:       ${summary.totals.safe}`);
  console.log(`  ⚠️  Likely cleanup:     ${summary.totals.likely}`);
  console.log(`  🔍 Needs review:       ${summary.totals.review}`);
  console.log();

  // Top 5 actions
  const topActions = [...summary.safe, ...summary.likely].slice(0, 5);
  if (topActions.length > 0) {
    console.log('TOP ACTIONS');
    console.log('-'.repeat(40));
    topActions.forEach((action, i) => {
      console.log(`  ${i + 1}. ${action.description}`);
      if (action.file) {
        console.log(`     File: ${action.file}`);
      }
    });
    console.log();
  }

  console.log('='.repeat(60) + '\n');
}

/**
 * Generate markdown summary
 */
function generateMarkdownSummary(
  report: UnifiedReport,
  summary: SummaryOutput,
): string {
  const lines: string[] = [
    '# Code Health Summary',
    '',
    `**Generated:** ${report.meta.generatedAt}`,
    `**Workspace:** ${report.meta.workspace}`,
    '',
    '## Overview',
    '',
    '| Category | Count |',
    '|----------|-------|',
    `| Unused files | ${report.deadCode.files.length} |`,
    `| Unused exports | ${report.deadCode.exports.length} |`,
    `| Unused dependencies | ${report.deadCode.dependencies.length} |`,
    `| Unused devDependencies | ${report.deadCode.devDependencies.length} |`,
    `| Duplication blocks | ${report.duplication.statistics.cloneCount} |`,
    `| Duplicated lines | ${report.duplication.statistics.duplicatedLines} |`,
    '',
    '## Confidence Buckets',
    '',
    '| Bucket | Count | Description |',
    '|--------|-------|-------------|',
    `| ✅ Safe cleanup | ${summary.totals.safe} | High-confidence issues that can be fixed immediately |`,
    `| ⚠️ Likely cleanup | ${summary.totals.likely} | Medium-confidence issues worth reviewing |`,
    `| 🔍 Needs review | ${summary.totals.review} | Low-confidence findings that may be false positives |`,
    '',
  ];

  // Safe cleanup section
  if (summary.safe.length > 0) {
    lines.push('## Safe Cleanup', '');
    for (const finding of summary.safe) {
      lines.push(`- ${finding.description}`);
      if (finding.file) {
        lines.push(`  - File: \`${finding.file}\``);
      }
    }
    lines.push('');
  }

  // Likely cleanup section
  if (summary.likely.length > 0) {
    lines.push('## Likely Cleanup', '');
    for (const finding of summary.likely.slice(0, 20)) {
      lines.push(`- ${finding.description}`);
      if (finding.file) {
        lines.push(`  - File: \`${finding.file}\``);
      }
    }
    if (summary.likely.length > 20) {
      lines.push(`- ... and ${summary.likely.length - 20} more`);
    }
    lines.push('');
  }

  // Needs review section (abbreviated)
  if (summary.review.length > 0) {
    lines.push('## Needs Review', '');
    lines.push(
      `${summary.review.length} findings need manual review. See \`unified.json\` for full details.`,
    );
    lines.push('');
  }

  return lines.join('\n');
}
