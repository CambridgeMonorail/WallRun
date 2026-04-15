import { describe, expect, it } from 'vitest';
import { countKnipIssues } from '../run-knip.js';
import { countJscpdDuplicates } from '../run-jscpd.js';
import type { KnipReport, JscpdReport } from '../types.js';

describe('countKnipIssues', () => {
  it('should return 0 for empty report', () => {
    const report: KnipReport = {};
    expect(countKnipIssues(report)).toBe(0);
  });

  it('should count all issue types', () => {
    const report: KnipReport = {
      files: ['a.ts', 'b.ts'],
      dependencies: ['lodash'],
      devDependencies: ['jest', 'vitest'],
      exports: [{ file: 'c.ts', symbol: 'foo' }],
      types: [{ file: 'd.ts', symbol: 'Bar' }],
    };

    expect(countKnipIssues(report)).toBe(7);
  });

  it('should handle partial report', () => {
    const report: KnipReport = {
      files: ['a.ts'],
    };

    expect(countKnipIssues(report)).toBe(1);
  });
});

describe('countJscpdDuplicates', () => {
  it('should return 0 for empty report', () => {
    const report: JscpdReport = {
      statistics: {
        detectionDate: '2024-01-01',
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

    expect(countJscpdDuplicates(report)).toBe(0);
  });

  it('should count duplicates', () => {
    const report: JscpdReport = {
      statistics: {
        detectionDate: '2024-01-01',
        formats: {},
        total: {
          sources: 2,
          files: 2,
          lines: 100,
          tokens: 500,
          clones: 3,
          duplicatedLines: 30,
          duplicatedTokens: 150,
          percentage: 30,
          percentageTokens: 30,
        },
      },
      duplicates: [
        {
          format: 'typescript',
          lines: 10,
          tokens: 100,
          fragment: '// code',
          firstFile: {
            name: 'a.ts',
            start: 1,
            end: 10,
            startLoc: { line: 1, column: 0 },
            endLoc: { line: 10, column: 0 },
          },
          secondFile: {
            name: 'b.ts',
            start: 5,
            end: 15,
            startLoc: { line: 5, column: 0 },
            endLoc: { line: 15, column: 0 },
          },
        },
        {
          format: 'typescript',
          lines: 10,
          tokens: 100,
          fragment: '// code',
          firstFile: {
            name: 'c.ts',
            start: 1,
            end: 10,
            startLoc: { line: 1, column: 0 },
            endLoc: { line: 10, column: 0 },
          },
          secondFile: {
            name: 'd.ts',
            start: 5,
            end: 15,
            startLoc: { line: 5, column: 0 },
            endLoc: { line: 15, column: 0 },
          },
        },
        {
          format: 'typescript',
          lines: 10,
          tokens: 100,
          fragment: '// code',
          firstFile: {
            name: 'e.ts',
            start: 1,
            end: 10,
            startLoc: { line: 1, column: 0 },
            endLoc: { line: 10, column: 0 },
          },
          secondFile: {
            name: 'f.ts',
            start: 5,
            end: 15,
            startLoc: { line: 5, column: 0 },
            endLoc: { line: 15, column: 0 },
          },
        },
      ],
    };

    expect(countJscpdDuplicates(report)).toBe(3);
  });
});
