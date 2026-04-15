import { describe, expect, it } from 'vitest';
import { categorizeFindings } from '../summarise-findings.js';
import type { UnifiedReport } from '../types.js';

describe('categorizeFindings', () => {
  const emptyReport: UnifiedReport = {
    meta: {
      generatedAt: '2024-01-01T00:00:00.000Z',
      workspace: 'test',
      toolVersions: { knip: '1.0.0', jscpd: '1.0.0' },
    },
    deadCode: {
      files: [],
      exports: [],
      dependencies: [],
      devDependencies: [],
      unlisted: [],
    },
    duplication: {
      blocks: [],
      statistics: {
        totalFiles: 0,
        totalLines: 0,
        duplicatedLines: 0,
        duplicatedPercentage: 0,
        cloneCount: 0,
      },
    },
    summary: {
      deadCodeCount: 0,
      duplicationBlockCount: 0,
      highConfidenceActions: 0,
    },
  };

  it('should return empty buckets for empty report', () => {
    const result = categorizeFindings(emptyReport);

    expect(result.safe).toHaveLength(0);
    expect(result.likely).toHaveLength(0);
    expect(result.review).toHaveLength(0);
    expect(result.totals).toEqual({ safe: 0, likely: 0, review: 0 });
  });

  it('should categorize unused dependencies as safe', () => {
    const report: UnifiedReport = {
      ...emptyReport,
      deadCode: {
        ...emptyReport.deadCode,
        dependencies: ['lodash', 'moment'],
        devDependencies: ['jest'],
      },
    };

    const result = categorizeFindings(report);

    expect(result.safe).toHaveLength(3);
    expect(result.safe[0].description).toContain('lodash');
    expect(result.safe[1].description).toContain('moment');
    expect(result.safe[2].description).toContain('jest');
    expect(result.totals.safe).toBe(3);
  });

  it('should categorize unused files as likely', () => {
    const report: UnifiedReport = {
      ...emptyReport,
      deadCode: {
        ...emptyReport.deadCode,
        files: ['src/unused.ts', 'src/old.ts'],
      },
    };

    const result = categorizeFindings(report);

    expect(result.likely).toHaveLength(2);
    expect(result.likely[0].file).toBe('src/unused.ts');
    expect(result.totals.likely).toBe(2);
  });

  it('should categorize unused exports as review', () => {
    const report: UnifiedReport = {
      ...emptyReport,
      deadCode: {
        ...emptyReport.deadCode,
        exports: [
          { file: 'src/utils.ts', symbol: 'helper' },
          { file: 'src/api.ts', symbol: 'fetchData' },
        ],
      },
    };

    const result = categorizeFindings(report);

    expect(result.review).toHaveLength(2);
    expect(result.review[0].description).toContain('helper');
    expect(result.totals.review).toBe(2);
  });

  it('should categorize large duplications as safe', () => {
    const report: UnifiedReport = {
      ...emptyReport,
      duplication: {
        ...emptyReport.duplication,
        blocks: [
          {
            files: ['src/a.ts', 'src/b.ts'],
            lines: 50, // Large duplication
            tokens: 200,
            fragmentA: '// code',
            fragmentB: '// code',
            startA: 1,
            startB: 1,
          },
        ],
      },
    };

    const result = categorizeFindings(report);

    expect(result.safe).toHaveLength(1);
    expect(result.safe[0].type).toBe('duplication');
    expect(result.safe[0].lines).toBe(50);
  });

  it('should categorize medium duplications as likely', () => {
    const report: UnifiedReport = {
      ...emptyReport,
      duplication: {
        ...emptyReport.duplication,
        blocks: [
          {
            files: ['src/a.ts', 'src/b.ts'],
            lines: 15, // Medium duplication
            tokens: 100,
            fragmentA: '// code',
            fragmentB: '// code',
            startA: 1,
            startB: 1,
          },
        ],
      },
    };

    const result = categorizeFindings(report);

    expect(result.likely).toHaveLength(1);
    expect(result.likely[0].type).toBe('duplication');
  });

  it('should categorize small duplications as review', () => {
    const report: UnifiedReport = {
      ...emptyReport,
      duplication: {
        ...emptyReport.duplication,
        blocks: [
          {
            files: ['src/a.ts', 'src/b.ts'],
            lines: 5, // Small duplication
            tokens: 30,
            fragmentA: '// code',
            fragmentB: '// code',
            startA: 1,
            startB: 1,
          },
        ],
      },
    };

    const result = categorizeFindings(report);

    expect(result.review).toHaveLength(1);
    expect(result.review[0].type).toBe('duplication');
  });
});
