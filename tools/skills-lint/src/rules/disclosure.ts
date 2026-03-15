import type { LintRule, ParsedSkill, RuleResult } from '../types.js';

function pass(ruleId: string, maxPoints: number): RuleResult {
  return { ruleId, passed: true, score: maxPoints, maxPoints, findings: [] };
}

export const ruleNoProgressiveDisclosure: LintRule = {
  id: 'no-progressive-disclosure',
  title: 'No progressive disclosure',
  description:
    'Larger or complex skills should reference at least one supporting file for progressive disclosure',
  category: 'progressive-disclosure',
  defaultSeverity: 'warning',
  maxPoints: 8,
  evaluate(skill: ParsedSkill): RuleResult {
    if (!skill.markdown) return pass(this.id, 0);

    // Small skills don't need progressive disclosure
    if (skill.markdown.lineCount < 100) {
      return pass(this.id, this.maxPoints);
    }

    const hasSupportingFiles =
      skill.directory.supportingFiles.filter((f) => f.kind !== 'other')
        .length > 0;

    const hasLocalLinks = skill.markdown.links.some((l) => l.isLocalFile);

    if (hasSupportingFiles && hasLocalLinks) {
      return pass(this.id, this.maxPoints);
    }

    if (hasSupportingFiles) {
      return {
        ruleId: this.id,
        passed: false,
        score: 4,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'warning',
            code: this.id,
            message:
              'Supporting files exist but are not linked from SKILL.md.',
            suggestion:
              'Add links to supporting files so agents discover them when needed.',
            file: 'SKILL.md',
          },
        ],
      };
    }

    // Lenient for medium skills (100-200 lines)
    if (skill.markdown.lineCount < 200) {
      return {
        ruleId: this.id,
        passed: true,
        score: 5,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'info',
            code: this.id,
            message:
              'No progressive disclosure found. Consider splitting longer content into references/ files.',
            file: 'SKILL.md',
          },
        ],
      };
    }

    return {
      ruleId: this.id,
      passed: false,
      score: 0,
      maxPoints: this.maxPoints,
      findings: [
        {
          severity: 'warning',
          code: this.id,
          message: `SKILL.md is ${skill.markdown.lineCount} lines with no supporting files or links.`,
          suggestion:
            'Move detailed guidance, examples, and templates into references/, scripts/, or assets/ directories.',
          file: 'SKILL.md',
        },
      ],
    };
  },
};

export const ruleUnreferencedScripts: LintRule = {
  id: 'unreferenced-scripts',
  title: 'Unreferenced scripts',
  description:
    'Files in scripts/ should be referenced in SKILL.md',
  category: 'progressive-disclosure',
  defaultSeverity: 'warning',
  maxPoints: 4,
  evaluate(skill: ParsedSkill): RuleResult {
    const scripts = skill.directory.supportingFiles.filter(
      (f) => f.kind === 'script'
    );

    if (scripts.length === 0) return pass(this.id, this.maxPoints);
    if (!skill.rawContent) return pass(this.id, 0);

    const content = skill.rawContent.toLowerCase();
    const unreferenced = scripts.filter((f) => {
      const filename = f.relativePath.replace(/\\/g, '/').split('/').pop() ?? '';
      return (
        !content.includes(f.relativePath.replace(/\\/g, '/').toLowerCase()) &&
        !content.includes(filename.toLowerCase())
      );
    });

    if (unreferenced.length === 0) return pass(this.id, this.maxPoints);

    return {
      ruleId: this.id,
      passed: false,
      score: 0,
      maxPoints: this.maxPoints,
      findings: unreferenced.map((f) => ({
        severity: 'warning' as const,
        code: this.id,
        message: `Script "${f.relativePath}" is not referenced in SKILL.md.`,
        suggestion:
          'Add a reference explaining when agents should run this script, or remove it.',
        file: f.relativePath,
      })),
    };
  },
};

export const ruleUnreferencedReferences: LintRule = {
  id: 'unreferenced-references',
  title: 'Unreferenced references',
  description:
    'Files in references/ should be referenced in SKILL.md',
  category: 'progressive-disclosure',
  defaultSeverity: 'warning',
  maxPoints: 4,
  evaluate(skill: ParsedSkill): RuleResult {
    const refs = skill.directory.supportingFiles.filter(
      (f) => f.kind === 'reference'
    );

    if (refs.length === 0) return pass(this.id, this.maxPoints);
    if (!skill.rawContent) return pass(this.id, 0);

    const content = skill.rawContent.toLowerCase();
    const unreferenced = refs.filter((f) => {
      const filename = f.relativePath.replace(/\\/g, '/').split('/').pop() ?? '';
      return (
        !content.includes(f.relativePath.replace(/\\/g, '/').toLowerCase()) &&
        !content.includes(filename.toLowerCase())
      );
    });

    if (unreferenced.length === 0) return pass(this.id, this.maxPoints);

    return {
      ruleId: this.id,
      passed: false,
      score: unreferenced.length < refs.length ? 2 : 0,
      maxPoints: this.maxPoints,
      findings: unreferenced.map((f) => ({
        severity: 'warning' as const,
        code: this.id,
        message: `Reference file "${f.relativePath}" is not referenced in SKILL.md.`,
        suggestion:
          'Add a link to this reference file explaining what it contains and when to read it.',
        file: f.relativePath,
      })),
    };
  },
};

export const ruleSupportingFilesWithoutContext: LintRule = {
  id: 'supporting-files-without-context',
  title: 'Supporting files without context',
  description:
    'References in SKILL.md should describe what each linked file is for',
  category: 'progressive-disclosure',
  defaultSeverity: 'info',
  maxPoints: 4,
  evaluate(skill: ParsedSkill): RuleResult {
    if (!skill.markdown) return pass(this.id, this.maxPoints);

    const localLinks = skill.markdown.links.filter((l) => l.isLocalFile);

    if (localLinks.length === 0) return pass(this.id, this.maxPoints);

    // Check if links have descriptive text (not just the filename)
    const bareLinks = localLinks.filter((l) => {
      const filename = l.url.split('/').pop() ?? '';
      const textLooksLikeFilename =
        l.text === filename || l.text === l.url || l.text.trim().length === 0;
      return textLooksLikeFilename;
    });

    if (bareLinks.length === 0) return pass(this.id, this.maxPoints);

    return {
      ruleId: this.id,
      passed: true,
      score: Math.max(0, this.maxPoints - bareLinks.length),
      maxPoints: this.maxPoints,
      findings: bareLinks.map((l) => ({
        severity: 'info' as const,
        code: this.id,
        message: `Link to "${l.url}" at line ${l.line} uses bare filename as text.`,
        suggestion:
          'Use descriptive link text explaining what the file contains (e.g. "detailed workflow guide").',
        file: 'SKILL.md',
        line: l.line,
      })),
    };
  },
};
