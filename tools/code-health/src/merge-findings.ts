import { resolve } from 'node:path';
import { CONFIG, getOutputDir, getWorkspaceRoot } from './config.js';
import type {
  DeadCodeFindings,
  DuplicationBlock,
  DuplicationFindings,
  JscpdReport,
  KnipReport,
  ReportMeta,
  ReportSummary,
  UnifiedReport,
} from './types.js';
import { fileExists, readJson, writeJson } from './utils/fs.js';
import { getPackageVersion, log } from './utils/process.js';

/**
 * Merge Knip and jscpd reports into a unified report
 */
export async function mergeFindings(): Promise<UnifiedReport> {
  const workspaceRoot = getWorkspaceRoot();
  const outputDir = getOutputDir(workspaceRoot);

  const knipPath = resolve(outputDir, 'knip.json');
  const jscpdPath = resolve(outputDir, 'jscpd.json');
  const unifiedPath = resolve(outputDir, 'unified.json');

  log('Merging findings from Knip and jscpd...');

  // Read existing reports
  let knipReport: KnipReport = {};
  let jscpdReport: JscpdReport = {
    statistics: {
      detectionDate: '',
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

  if (fileExists(knipPath)) {
    knipReport = readJson<KnipReport>(knipPath);
  } else {
    log('Knip report not found - run knip first', 'warn');
  }

  if (fileExists(jscpdPath)) {
    jscpdReport = readJson<JscpdReport>(jscpdPath);
  } else {
    log('jscpd report not found - run jscpd first', 'warn');
  }

  // Build unified report
  const meta = buildMeta();
  const deadCode = extractDeadCode(knipReport);
  const duplication = extractDuplication(jscpdReport);
  const summary = buildSummary(deadCode, duplication);

  const unified: UnifiedReport = {
    meta,
    deadCode,
    duplication,
    summary,
  };

  writeJson(unifiedPath, unified);
  log(`Unified report written to ${unifiedPath}`);

  return unified;
}

/**
 * Build report metadata
 */
function buildMeta(): ReportMeta {
  return {
    generatedAt: new Date().toISOString(),
    workspace: CONFIG.workspaceName,
    toolVersions: {
      knip: getPackageVersion('knip'),
      jscpd: getPackageVersion('jscpd'),
    },
  };
}

/**
 * Extract dead code findings from Knip report
 */
function extractDeadCode(knip: KnipReport): DeadCodeFindings {
  return {
    files: knip.files ?? [],
    exports: knip.exports ?? [],
    dependencies: knip.dependencies ?? [],
    devDependencies: knip.devDependencies ?? [],
    unlisted: knip.unlisted ?? [],
  };
}

/**
 * Extract duplication findings from jscpd report
 */
function extractDuplication(jscpd: JscpdReport): DuplicationFindings {
  const blocks: DuplicationBlock[] = (jscpd.duplicates ?? []).map((clone) => ({
    files: [
      clone.firstFile?.name ?? 'unknown',
      clone.secondFile?.name ?? 'unknown',
    ],
    lines: clone.lines ?? 0,
    tokens: clone.tokens ?? 0,
    fragmentA: clone.fragment?.slice(0, 200) ?? '',
    fragmentB: clone.fragment?.slice(0, 200) ?? '',
    startA: clone.firstFile?.start ?? 0,
    startB: clone.secondFile?.start ?? 0,
  }));

  const total = jscpd.statistics?.total ?? {
    files: 0,
    lines: 0,
    duplicatedLines: 0,
    clones: 0,
    percentage: 0,
  };

  return {
    blocks,
    statistics: {
      totalFiles: total.files,
      totalLines: total.lines,
      duplicatedLines: total.duplicatedLines,
      duplicatedPercentage: total.percentage,
      cloneCount: total.clones,
    },
  };
}

/**
 * Build summary counts
 */
function buildSummary(
  deadCode: DeadCodeFindings,
  duplication: DuplicationFindings,
): ReportSummary {
  const deadCodeCount =
    deadCode.files.length +
    deadCode.exports.length +
    deadCode.dependencies.length +
    deadCode.devDependencies.length;

  const duplicationBlockCount = duplication.blocks.length;

  // High confidence = unused dependencies + large duplications
  const highConfidenceDeps =
    deadCode.dependencies.length + deadCode.devDependencies.length;
  const highConfidenceDupes = duplication.blocks.filter(
    (b) => b.lines >= CONFIG.safeCleanupThreshold,
  ).length;

  return {
    deadCodeCount,
    duplicationBlockCount,
    highConfidenceActions: highConfidenceDeps + highConfidenceDupes,
  };
}
