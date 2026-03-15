import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import type { LintRule, ParsedSkill, RuleResult } from '../types.js';

function pass(ruleId: string, maxPoints: number): RuleResult {
  return { ruleId, passed: true, score: maxPoints, maxPoints, findings: [] };
}

export const ruleMissingSkillMd: LintRule = {
  id: 'missing-skill-md',
  title: 'Missing SKILL.md',
  description: 'Every skill directory must contain a SKILL.md file',
  category: 'structure',
  defaultSeverity: 'error',
  maxPoints: 5,
  evaluate(skill: ParsedSkill): RuleResult {
    if (!skill.directory.skillMdPath) {
      return {
        ruleId: this.id,
        passed: false,
        score: 0,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'error',
            code: this.id,
            message: `Skill directory "${skill.directory.name}" is missing SKILL.md.`,
            suggestion: 'Create a SKILL.md file with frontmatter and instructions.',
          },
        ],
      };
    }
    return pass(this.id, this.maxPoints);
  },
};

export const ruleBrokenLocalLinks: LintRule = {
  id: 'broken-local-links',
  title: 'Broken local links',
  description: 'All local markdown links must resolve to existing files',
  category: 'structure',
  defaultSeverity: 'error',
  maxPoints: 3,
  evaluate(skill: ParsedSkill): RuleResult {
    if (!skill.markdown || !skill.directory.skillMdPath) {
      return pass(this.id, this.maxPoints);
    }

    const skillDir = dirname(skill.directory.skillMdPath);
    const localLinks = skill.markdown.links.filter((l) => l.isLocalFile);

    if (localLinks.length === 0) return pass(this.id, this.maxPoints);

    const broken = localLinks.filter((link) => {
      const target = resolve(skillDir, link.url);
      return !existsSync(target);
    });

    if (broken.length === 0) return pass(this.id, this.maxPoints);

    return {
      ruleId: this.id,
      passed: false,
      score: 0,
      maxPoints: this.maxPoints,
      findings: broken.map((link) => ({
        severity: 'error' as const,
        code: this.id,
        message: `Broken link: "${link.url}" (line ${link.line}) does not resolve to an existing file.`,
        suggestion: `Check the path or create the missing file at "${link.url}".`,
        file: 'SKILL.md',
        line: link.line,
      })),
    };
  },
};

export const ruleOrphanSupportingFiles: LintRule = {
  id: 'orphan-supporting-files',
  title: 'Orphan supporting files',
  description:
    'Reference and script files should be mentioned in SKILL.md',
  category: 'structure',
  defaultSeverity: 'warning',
  maxPoints: 2,
  evaluate(skill: ParsedSkill): RuleResult {
    if (!skill.rawContent) return pass(this.id, this.maxPoints);

    const classified = skill.directory.supportingFiles.filter(
      (f) => f.kind === 'reference' || f.kind === 'script'
    );

    if (classified.length === 0) return pass(this.id, this.maxPoints);

    const content = skill.rawContent.toLowerCase();
    const orphans = classified.filter((f) => {
      const rel = f.relativePath.replace(/\\/g, '/').toLowerCase();
      const filename = rel.split('/').pop() ?? '';
      return !content.includes(rel) && !content.includes(filename);
    });

    if (orphans.length === 0) return pass(this.id, this.maxPoints);

    return {
      ruleId: this.id,
      passed: false,
      score: orphans.length >= classified.length ? 0 : 1,
      maxPoints: this.maxPoints,
      findings: orphans.map((f) => ({
        severity: 'warning' as const,
        code: this.id,
        message: `Supporting file "${f.relativePath}" is not referenced in SKILL.md.`,
        suggestion:
          'Add a reference to this file in SKILL.md or remove it if unused.',
        file: f.relativePath,
      })),
    };
  },
};
