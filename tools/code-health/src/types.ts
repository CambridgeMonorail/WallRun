/**
 * Code Health Tool Types
 */

// ============================================================================
// Knip Types
// ============================================================================

export interface KnipIssue {
  file: string;
  symbol?: string;
  type: string;
}

export interface KnipReport {
  files?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  unlisted?: string[];
  exports?: KnipIssue[];
  types?: KnipIssue[];
  duplicates?: KnipIssue[];
  enumMembers?: KnipIssue[];
  classMembers?: KnipIssue[];
}

// ============================================================================
// jscpd Types
// ============================================================================

/** Clone entry from jscpd report */
export interface JscpdClone {
  format: string;
  lines: number;
  tokens: number;
  fragment: string;
  firstFile: JscpdFileLocation;
  secondFile: JscpdFileLocation;
}

/** File location in a jscpd clone */
export interface JscpdFileLocation {
  name: string;
  start: number;
  end: number;
  startLoc: JscpdPosition;
  endLoc: JscpdPosition;
}

/** Position in a jscpd clone (alternative format) */
export interface JscpdDuplication {
  sourceId: string;
  start: JscpdPosition;
  end: JscpdPosition;
  range: [number, number];
  fragment?: string;
}

export interface JscpdPosition {
  line: number;
  column: number;
}

export interface JscpdStatistics {
  detectionDate: string;
  formats: Record<string, JscpdFormatStats>;
  total: JscpdTotalStats;
}

export interface JscpdFormatStats {
  sources: number;
  files: number;
  lines: number;
  tokens: number;
  clones: number;
  duplicatedLines: number;
  duplicatedTokens: number;
  percentage: number;
  newDuplicatedLines: number;
  newClones: number;
}

export interface JscpdTotalStats {
  sources: number;
  files: number;
  lines: number;
  tokens: number;
  clones: number;
  duplicatedLines: number;
  duplicatedTokens: number;
  percentage: number;
  percentageTokens: number;
}

export interface JscpdReport {
  statistics: JscpdStatistics;
  duplicates: JscpdClone[];
}

// ============================================================================
// Unified Report Types
// ============================================================================

export interface UnifiedReport {
  meta: ReportMeta;
  deadCode: DeadCodeFindings;
  duplication: DuplicationFindings;
  summary: ReportSummary;
}

export interface ReportMeta {
  generatedAt: string;
  workspace: string;
  toolVersions: {
    knip: string;
    jscpd: string;
  };
}

export interface DeadCodeFindings {
  files: string[];
  exports: KnipIssue[];
  dependencies: string[];
  devDependencies: string[];
  unlisted: string[];
}

export interface DuplicationFindings {
  blocks: DuplicationBlock[];
  statistics: DuplicationStats;
}

export interface DuplicationBlock {
  files: [string, string];
  lines: number;
  tokens: number;
  fragmentA: string;
  fragmentB: string;
  startA: number;
  startB: number;
}

export interface DuplicationStats {
  totalFiles: number;
  totalLines: number;
  duplicatedLines: number;
  duplicatedPercentage: number;
  cloneCount: number;
}

export interface ReportSummary {
  deadCodeCount: number;
  duplicationBlockCount: number;
  highConfidenceActions: number;
}

// ============================================================================
// Summary Types
// ============================================================================

export type ConfidenceBucket = 'safe' | 'likely' | 'review';

export interface CategorizedFinding {
  bucket: ConfidenceBucket;
  type: 'dead-code' | 'duplication';
  description: string;
  file?: string;
  lines?: number;
}

export interface SummaryOutput {
  safe: CategorizedFinding[];
  likely: CategorizedFinding[];
  review: CategorizedFinding[];
  totals: {
    safe: number;
    likely: number;
    review: number;
  };
}

// ============================================================================
// CLI Types
// ============================================================================

export type Command = 'knip' | 'jscpd' | 'run' | 'summary';

export interface CliOptions {
  verbose?: boolean;
  outputDir?: string;
}
