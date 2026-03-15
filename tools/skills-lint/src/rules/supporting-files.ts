import type { LintRule, ParsedSkill, RuleResult } from '../types.js';

function pass(ruleId: string, maxPoints: number): RuleResult {
  return { ruleId, passed: true, score: maxPoints, maxPoints, findings: [] };
}

export const ruleJunkAssets: LintRule = {
  id: 'junk-assets',
  title: 'Junk assets',
  description:
    'Assets directory should not contain obviously unrelated files',
  category: 'supporting-files',
  defaultSeverity: 'info',
  maxPoints: 4,
  evaluate(skill: ParsedSkill): RuleResult {
    const assets = skill.directory.supportingFiles.filter(
      (f) => f.kind === 'asset'
    );

    if (assets.length === 0) return pass(this.id, this.maxPoints);

    const junkFilenames = new Set(['thumbs.db', 'desktop.ini', '.ds_store']);
    const junkExtensions = new Set(['.tmp', '.bak', '.log']);

    const junk = assets.filter((f) => {
      const filename = f.relativePath.split(/[\\/]/).pop() ?? '';
      const lowerFilename = filename.toLowerCase();
      return (
        junkFilenames.has(lowerFilename) ||
        junkExtensions.has(f.extension) ||
        (filename.startsWith('.') && filename !== '.gitkeep')
      );
    });

    if (junk.length === 0) return pass(this.id, this.maxPoints);

    return {
      ruleId: this.id,
      passed: false,
      score: 2,
      maxPoints: this.maxPoints,
      findings: junk.map((f) => ({
        severity: 'info' as const,
        code: this.id,
        message: `Potential junk file in assets: "${f.relativePath}".`,
        suggestion: 'Remove files that are not reusable assets.',
        file: f.relativePath,
      })),
    };
  },
};

export const ruleTooManyOtherFiles: LintRule = {
  id: 'too-many-other-files',
  title: 'Too many unclassified files',
  description:
    'Unclassified files (not in references/, scripts/, or assets/) should be minimal',
  category: 'supporting-files',
  defaultSeverity: 'warning',
  maxPoints: 6,
  evaluate(skill: ParsedSkill): RuleResult {
    const others = skill.directory.supportingFiles.filter(
      (f) => f.kind === 'other'
    );

    // Filter out common expected files like README, LICENSE, TEST_PLAN, LINT_REPORT
    const unexpected = others.filter((f) => {
      const filename = f.relativePath.split(/[\\/]/).pop() ?? '';
      return !/^(README|LICENSE|TEST_PLAN|LINT_REPORT|CHANGELOG)\.(md|txt)$/i.test(
        filename
      );
    });

    if (unexpected.length <= 1) return pass(this.id, this.maxPoints);

    if (unexpected.length <= 3) {
      return {
        ruleId: this.id,
        passed: true,
        score: 4,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'info',
            code: this.id,
            message: `${unexpected.length} unclassified files found. Consider organising into references/, scripts/, or assets/.`,
          },
        ],
      };
    }

    return {
      ruleId: this.id,
      passed: false,
      score: 1,
      maxPoints: this.maxPoints,
      findings: [
        {
          severity: 'warning',
          code: this.id,
          message: `${unexpected.length} unclassified files found outside standard directories.`,
          suggestion:
            'Move files into references/, scripts/, or assets/ for proper categorisation.',
        },
      ],
    };
  },
};
