import type {
  RepoLintSummary,
  RuleCategory,
  SkillLintReport,
} from './types.js';

const SEVERITY_ICON = {
  error: 'ERROR',
  warning: 'WARN',
  info: 'INFO',
} as const;

export function renderMarkdownReport(report: SkillLintReport): string {
  const lines: string[] = [
    `# Lint Report: ${report.skillName}`,
    '',
    `**Score:** ${report.totalScore}/${report.maxScore}`,
    `**Status:** ${formatBand(report.band)}`,
    '',
    '## Category Scores',
    '',
    '| Category | Score | Weight |',
    '| --- | ---: | ---: |',
  ];

  const categories = Object.keys(report.categoryScores) as RuleCategory[];
  for (const cat of categories) {
    const score = report.categoryScores[cat];
    const weight = getCategoryWeight(cat);
    lines.push(`| ${cat} | ${score} | ${weight} |`);
  }

  lines.push('');

  if (report.findings.length > 0) {
    lines.push('## Findings', '');
    for (const f of report.findings) {
      const loc = f.file ? ` (${f.file}${f.line ? `:${f.line}` : ''})` : '';
      lines.push(`- **${SEVERITY_ICON[f.severity]}** \`${f.code}\`: ${f.message}${loc}`);
      if (f.suggestion) {
        lines.push(`  - *Suggestion:* ${f.suggestion}`);
      }
    }
    lines.push('');
  }

  if (report.suggestedActions.length > 0) {
    lines.push('## Suggested Actions', '');
    for (let i = 0; i < report.suggestedActions.length; i++) {
      lines.push(`${i + 1}. ${report.suggestedActions[i]}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export function renderJsonReport(report: SkillLintReport): string {
  return JSON.stringify(
    {
      skillName: report.skillName,
      skillPath: report.skillPath,
      totalScore: report.totalScore,
      maxScore: report.maxScore,
      band: report.band,
      categoryScores: report.categoryScores,
      findings: report.findings,
      suggestedActions: report.suggestedActions,
    },
    null,
    2
  );
}

export function renderSummaryReport(summary: RepoLintSummary): string {
  const lines: string[] = [
    '# Skills Lint Summary',
    '',
    `**Skills scanned:** ${summary.skillsScanned}`,
    `**Average score:** ${summary.averageScore}/100`,
    `**Highest score:** ${summary.highestScore}/100`,
    `**Lowest score:** ${summary.lowestScore}/100`,
    '',
    '## Skill Scores',
    '',
    '| Skill | Score | Status |',
    '| --- | ---: | --- |',
  ];

  const sorted = [...summary.reports].sort(
    (a, b) => a.totalScore - b.totalScore
  );

  for (const r of sorted) {
    lines.push(
      `| ${r.skillName} | ${r.totalScore}/${r.maxScore} | ${formatBand(r.band)} |`
    );
  }

  lines.push('');

  if (summary.mostCommonFindings.length > 0) {
    lines.push('## Most Common Findings', '');
    lines.push('| Code | Count |');
    lines.push('| --- | ---: |');
    for (const f of summary.mostCommonFindings) {
      lines.push(`| \`${f.code}\` | ${f.count} |`);
    }
    lines.push('');
  }

  // Band distribution
  const bandCounts = {
    'production-quality': 0,
    'good-but-improvable': 0,
    'needs-refactor': 0,
    'poor-design': 0,
  };
  for (const r of summary.reports) {
    bandCounts[r.band]++;
  }

  lines.push('## Quality Distribution', '');
  lines.push('| Band | Count |');
  lines.push('| --- | ---: |');
  for (const [band, count] of Object.entries(bandCounts)) {
    if (count > 0) {
      lines.push(`| ${formatBand(band)} | ${count} |`);
    }
  }
  lines.push('');

  return lines.join('\n');
}

export function renderConsoleReport(report: SkillLintReport): string {
  const lines: string[] = [
    '',
    `  ${report.skillName}`,
    `  Score: ${report.totalScore}/${report.maxScore} (${formatBand(report.band)})`,
    '',
  ];

  const errors = report.findings.filter((f) => f.severity === 'error');
  const warnings = report.findings.filter((f) => f.severity === 'warning');
  const infos = report.findings.filter((f) => f.severity === 'info');

  for (const f of errors) {
    lines.push(`    ✗ ${f.code}: ${f.message}`);
  }
  for (const f of warnings) {
    lines.push(`    ⚠ ${f.code}: ${f.message}`);
  }
  for (const f of infos) {
    lines.push(`    ℹ ${f.code}: ${f.message}`);
  }

  if (report.findings.length === 0) {
    lines.push('    ✓ No issues found');
  }

  return lines.join('\n');
}

export function renderConsoleSummary(summary: RepoLintSummary): string {
  const lines: string[] = [
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `  Skills Lint Summary`,
    `  ${summary.skillsScanned} skills | avg ${summary.averageScore}/100 | low ${summary.lowestScore} | high ${summary.highestScore}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
  ];

  const sorted = [...summary.reports].sort(
    (a, b) => a.totalScore - b.totalScore
  );

  for (const r of sorted) {
    const icon = r.band === 'production-quality' ? '✓' :
                 r.band === 'good-but-improvable' ? '○' :
                 r.band === 'needs-refactor' ? '⚠' : '✗';
    const errCount = r.findings.filter((f) => f.severity === 'error').length;
    const warnCount = r.findings.filter((f) => f.severity === 'warning').length;
    const stats = [];
    if (errCount > 0) stats.push(`${errCount}E`);
    if (warnCount > 0) stats.push(`${warnCount}W`);
    const statsStr = stats.length > 0 ? ` (${stats.join(' ')})` : '';
    lines.push(
      `  ${icon} ${String(r.totalScore).padStart(3)}  ${r.skillName}${statsStr}`
    );
  }

  lines.push('');
  return lines.join('\n');
}

function formatBand(band: string): string {
  return band
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function getCategoryWeight(cat: RuleCategory): number {
  const weights: Record<RuleCategory, number> = {
    metadata: 15,
    structure: 10,
    content: 20,
    'progressive-disclosure': 20,
    'supporting-files': 10,
    testability: 15,
    safety: 10,
  };
  return weights[cat];
}
