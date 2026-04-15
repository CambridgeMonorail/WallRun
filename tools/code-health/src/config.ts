import { resolve } from 'node:path';

/**
 * Code Health Tool Configuration
 */

export const CONFIG = {
  /** Output directory for reports (relative to workspace root) */
  outputDir: 'reports/code-health',

  /** Workspace name for report metadata */
  workspaceName: 'WallRun',

  /** Directories to exclude from analysis */
  excludeDirs: [
    'node_modules',
    'dist',
    'coverage',
    'tmp',
    '.nx',
    'storybook-static',
  ],

  /** File patterns to exclude from duplication detection */
  excludePatterns: [
    '**/*.stories.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.d.ts',
  ],

  /** Minimum lines for a duplication to be reported */
  minDuplicationLines: 5,

  /** Minimum tokens for a duplication to be reported */
  minDuplicationTokens: 50,

  /** Lines of duplication considered "safe cleanup" */
  safeCleanupThreshold: 20,

  /** Lines of duplication considered "likely cleanup" */
  likelyCleanupThreshold: 10,
} as const;

/**
 * Get the absolute path to the output directory
 */
export function getOutputDir(workspaceRoot: string): string {
  return resolve(workspaceRoot, CONFIG.outputDir);
}

/**
 * Get the workspace root directory
 */
export function getWorkspaceRoot(): string {
  // Walk up from current file to find workspace root (where package.json is)
  let dir = process.cwd();
  return dir;
}
