import type { LintRule, ParsedSkill, RuleContext, RuleResult } from '../types.js';

function pass(ruleId: string, maxPoints: number): RuleResult {
  return { ruleId, passed: true, score: maxPoints, maxPoints, findings: [] };
}

export const ruleMissingName: LintRule = {
  id: 'missing-name',
  title: 'Missing name',
  description: 'SKILL.md frontmatter must contain a name field',
  category: 'metadata',
  defaultSeverity: 'error',
  maxPoints: 3,
  evaluate(skill: ParsedSkill): RuleResult {
    if (!skill.frontmatter || !skill.frontmatter.name) {
      return {
        ruleId: this.id,
        passed: false,
        score: 0,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'error',
            code: this.id,
            message: 'SKILL.md frontmatter is missing the "name" field.',
            suggestion: 'Add a "name" field to the YAML frontmatter.',
            file: 'SKILL.md',
          },
        ],
      };
    }
    return pass(this.id, this.maxPoints);
  },
};

export const ruleMissingDescription: LintRule = {
  id: 'missing-description',
  title: 'Missing description',
  description: 'SKILL.md frontmatter must contain a non-empty description',
  category: 'metadata',
  defaultSeverity: 'error',
  maxPoints: 3,
  evaluate(skill: ParsedSkill): RuleResult {
    if (
      !skill.frontmatter ||
      !skill.frontmatter.description ||
      skill.frontmatter.description.trim().length === 0
    ) {
      return {
        ruleId: this.id,
        passed: false,
        score: 0,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'error',
            code: this.id,
            message: 'SKILL.md frontmatter is missing the "description" field.',
            suggestion:
              'Add a descriptive "description" field that explains what the skill does and when to use it.',
            file: 'SKILL.md',
          },
        ],
      };
    }
    return pass(this.id, this.maxPoints);
  },
};

export const ruleInvalidNameFormat: LintRule = {
  id: 'invalid-name-format',
  title: 'Invalid name format',
  description: 'Skill name should be lowercase kebab-case',
  category: 'metadata',
  defaultSeverity: 'warning',
  maxPoints: 2,
  evaluate(skill: ParsedSkill): RuleResult {
    const name = skill.frontmatter?.name;
    if (!name) return pass(this.id, this.maxPoints);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
      return {
        ruleId: this.id,
        passed: false,
        score: 0,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'warning',
            code: this.id,
            message: `Skill name "${name}" is not lowercase kebab-case.`,
            suggestion:
              'Use lowercase letters, numbers, and hyphens only (e.g. "signage-layout-system").',
            file: 'SKILL.md',
          },
        ],
      };
    }
    return pass(this.id, this.maxPoints);
  },
};

export const ruleWeakDescription: LintRule = {
  id: 'weak-description',
  title: 'Weak description',
  description:
    'Description should contain capability verbs and trigger phrases for discoverability',
  category: 'metadata',
  defaultSeverity: 'warning',
  maxPoints: 4,
  evaluate(skill: ParsedSkill): RuleResult {
    const desc = skill.frontmatter?.description;
    if (!desc) return pass(this.id, 0);

    const hasVerb =
      /\b(design|generate|create|analyse|analyze|review|validate|transform|build|deploy|debug|investigate|verify|audit|diagnose|produce|explain)\b/i.test(
        desc
      );
    const hasTrigger =
      /\b(use when|when asked|when you need|for|helps with|used for|use this)\b/i.test(
        desc
      );
    const tooShort = desc.trim().length < 40;

    const findings = [];
    let score = this.maxPoints;

    if (tooShort) {
      score -= 2;
      findings.push({
        severity: 'warning' as const,
        code: this.id,
        message: `Description is only ${desc.trim().length} characters. Aim for at least 40.`,
        suggestion: 'Expand the description to clearly explain capability and trigger context.',
        file: 'SKILL.md',
      });
    }
    if (!hasVerb) {
      score -= 1;
      findings.push({
        severity: 'warning' as const,
        code: this.id,
        message: 'Description lacks capability verbs (e.g. "design", "generate", "build").',
        suggestion: 'Include verbs that describe what the skill produces or does.',
        file: 'SKILL.md',
      });
    }
    if (!hasTrigger) {
      score -= 1;
      findings.push({
        severity: 'warning' as const,
        code: this.id,
        message:
          'Description lacks trigger phrases (e.g. "Use when", "when asked to").',
        suggestion:
          'Include phrases that help an agent decide when to activate this skill.',
        file: 'SKILL.md',
      });
    }

    return {
      ruleId: this.id,
      passed: findings.length === 0,
      score: Math.max(0, score),
      maxPoints: this.maxPoints,
      findings,
    };
  },
};

export const ruleReservedWordInName: LintRule = {
  id: 'reserved-word-in-name',
  title: 'Reserved word in name',
  description: 'Skill name should not contain reserved organisation words',
  category: 'metadata',
  defaultSeverity: 'warning',
  maxPoints: 1,
  evaluate(skill: ParsedSkill): RuleResult {
    const name = skill.frontmatter?.name ?? '';
    if (/\b(claude|anthropic|openai|chatgpt)\b/i.test(name)) {
      return {
        ruleId: this.id,
        passed: false,
        score: 0,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'warning',
            code: this.id,
            message: `Skill name "${name}" contains a reserved word.`,
            suggestion:
              'Remove organisation names like "claude" or "anthropic" from the skill name.',
            file: 'SKILL.md',
          },
        ],
      };
    }
    return pass(this.id, this.maxPoints);
  },
};
