import { describe, expect, it } from 'vitest';
import {
  renderConsoleReport,
  renderConsoleSummary,
  renderJsonReport,
  renderMarkdownReport,
  renderSummaryReport,
} from '../reporters.js';
import type {
  QualityBand,
  RepoLintSummary,
  SkillLintReport,
} from '../types.js';

function makeReport(overrides: Partial<SkillLintReport> = {}): SkillLintReport {
  return {
    skillName: 'test-skill',
    skillPath: 'skills/test-skill',
    totalScore: 85,
    maxScore: 100,
    band: 'good-but-improvable' as QualityBand,
    categoryScores: {
      metadata: 13,
      structure: 9,
      content: 17,
      'progressive-disclosure': 18,
      'supporting-files': 8,
      testability: 12,
      safety: 8,
    },
    findings: [
      {
        severity: 'error',
        code: 'broken-local-links',
        message: 'Link to missing file',
        suggestion: 'Fix or remove the broken link',
        file: 'SKILL.md',
        line: 10,
      },
      {
        severity: 'warning',
        code: 'skill-md-too-long',
        message: 'SKILL.md exceeds 500 lines',
      },
      {
        severity: 'info',
        code: 'no-expected-behaviour',
        message: 'Consider adding expected behaviour section',
      },
    ],
    ruleResults: [],
    suggestedActions: ['Fix or remove the broken link'],
    ...overrides,
  };
}

function makeSummary(
  overrides: Partial<RepoLintSummary> = {}
): RepoLintSummary {
  return {
    skillsScanned: 2,
    averageScore: 80,
    highestScore: 92,
    lowestScore: 68,
    mostCommonFindings: [
      { code: 'missing-test-plan', count: 5 },
      { code: 'weak-description', count: 3 },
    ],
    reports: [
      makeReport({ skillName: 'skill-a', totalScore: 92, band: 'production-quality' }),
      makeReport({ skillName: 'skill-b', totalScore: 68, band: 'needs-refactor' }),
    ],
    ...overrides,
  };
}

describe('renderMarkdownReport', () => {
  it('includes skill name and score', () => {
    const md = renderMarkdownReport(makeReport());
    expect(md).toContain('# Lint Report: test-skill');
    expect(md).toContain('85/100');
  });

  it('renders category scores table', () => {
    const md = renderMarkdownReport(makeReport());
    expect(md).toContain('| metadata |');
    expect(md).toContain('| content |');
  });

  it('renders findings with severity icons', () => {
    const md = renderMarkdownReport(makeReport());
    expect(md).toContain('ERROR');
    expect(md).toContain('WARN');
    expect(md).toContain('INFO');
    expect(md).toContain('`broken-local-links`');
  });

  it('renders suggestions', () => {
    const md = renderMarkdownReport(makeReport());
    expect(md).toContain('Fix or remove the broken link');
  });

  it('renders file and line info for findings', () => {
    const md = renderMarkdownReport(makeReport());
    expect(md).toContain('(SKILL.md:10)');
  });
});

describe('renderJsonReport', () => {
  it('returns valid JSON', () => {
    const json = renderJsonReport(makeReport());
    const parsed = JSON.parse(json);
    expect(parsed.skillName).toBe('test-skill');
    expect(parsed.totalScore).toBe(85);
  });

  it('includes all required fields', () => {
    const parsed = JSON.parse(renderJsonReport(makeReport()));
    expect(parsed).toHaveProperty('band');
    expect(parsed).toHaveProperty('categoryScores');
    expect(parsed).toHaveProperty('findings');
    expect(parsed).toHaveProperty('suggestedActions');
  });
});

describe('renderSummaryReport', () => {
  it('includes scan stats', () => {
    const md = renderSummaryReport(makeSummary());
    expect(md).toContain('2');
    expect(md).toContain('80/100');
    expect(md).toContain('92/100');
    expect(md).toContain('68/100');
  });

  it('lists most common findings', () => {
    const md = renderSummaryReport(makeSummary());
    expect(md).toContain('missing-test-plan');
    expect(md).toContain('5');
  });

  it('shows quality distribution', () => {
    const md = renderSummaryReport(makeSummary());
    expect(md).toContain('Production Quality');
    expect(md).toContain('Needs Refactor');
  });
});

describe('renderConsoleReport', () => {
  it('shows skill name and score', () => {
    const out = renderConsoleReport(makeReport());
    expect(out).toContain('test-skill');
    expect(out).toContain('85/100');
  });

  it('shows error icon for errors', () => {
    const out = renderConsoleReport(makeReport());
    expect(out).toContain('✗');
  });

  it('shows no issues message when clean', () => {
    const out = renderConsoleReport(
      makeReport({ findings: [] })
    );
    expect(out).toContain('No issues found');
  });
});

describe('renderConsoleSummary', () => {
  it('shows overall stats', () => {
    const out = renderConsoleSummary(makeSummary());
    expect(out).toContain('2 skills');
    expect(out).toContain('avg 80/100');
  });

  it('lists skills sorted by score', () => {
    const out = renderConsoleSummary(makeSummary());
    const lines = out.split('\n');
    const skillLines = lines.filter(
      (l) => l.includes('skill-a') || l.includes('skill-b')
    );
    // Lower score should come first (sorted ascending)
    expect(skillLines[0]).toContain('skill-b');
    expect(skillLines[1]).toContain('skill-a');
  });
});
