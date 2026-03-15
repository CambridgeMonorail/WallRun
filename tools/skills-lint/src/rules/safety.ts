import type { LintRule, ParsedSkill, RuleResult } from '../types.js';

function pass(ruleId: string, maxPoints: number): RuleResult {
  return { ruleId, passed: true, score: maxPoints, maxPoints, findings: [] };
}

export const ruleUnsafeInvocation: LintRule = {
  id: 'unsafe-invocation',
  title: 'Unsafe invocation',
  description:
    'Skills that perform side effects should consider disable-model-invocation: true',
  category: 'safety',
  defaultSeverity: 'warning',
  maxPoints: 5,
  evaluate(skill: ParsedSkill): RuleResult {
    const text = `${skill.frontmatter?.description ?? ''}\n${skill.rawContent ?? ''}`;
    const looksSideEffecting =
      /\b(deploy|publish|delete|send|submit|modify|update|apply|write to|execute|push|release)\b/i.test(
        text
      );

    if (!looksSideEffecting) return pass(this.id, this.maxPoints);

    // If side-effecting, check for safety controls
    const hasDisableFlag =
      skill.frontmatter?.['disable-model-invocation'] === true;

    if (hasDisableFlag) return pass(this.id, this.maxPoints);

    // Check if the skill has warnings or guardrails in content
    const hasGuardrails =
      /\b(confirm|confirmation|approve|approval|caution|warning|dangerous|destructive|irreversible)\b/i.test(
        text
      );

    if (hasGuardrails) {
      return {
        ruleId: this.id,
        passed: true,
        score: 4,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'info',
            code: this.id,
            message:
              'Skill appears to perform side effects but has guardrail language.',
            suggestion:
              'Consider adding "disable-model-invocation: true" to frontmatter for extra safety.',
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
          message:
            'Skill appears to perform side effects without safety controls.',
          suggestion:
            'Add "disable-model-invocation: true" to frontmatter or include confirmation guardrails.',
          file: 'SKILL.md',
        },
      ],
    };
  },
};

export const ruleBackgroundKnowledgeUserInvocable: LintRule = {
  id: 'background-knowledge-user-invocable',
  title: 'Background knowledge user-invocable',
  description:
    'Reference-only helper skills should consider user-invocable: false',
  category: 'safety',
  defaultSeverity: 'info',
  maxPoints: 5,
  evaluate(skill: ParsedSkill): RuleResult {
    // Only flag if explicitly a background/helper skill
    const desc = (skill.frontmatter?.description ?? '').toLowerCase();
    const isHelperLike =
      /\b(background|helper|internal|auxiliary|supporting|reference only)\b/i.test(
        desc
      );

    if (!isHelperLike) return pass(this.id, this.maxPoints);

    const hasUserInvocable = skill.frontmatter?.['user-invocable'] === false;

    if (hasUserInvocable) return pass(this.id, this.maxPoints);

    return {
      ruleId: this.id,
      passed: true,
      score: 3,
      maxPoints: this.maxPoints,
      findings: [
        {
          severity: 'info',
          code: this.id,
          message:
            'Skill appears to be a background/helper skill but is user-invocable.',
          suggestion:
            'Consider adding "user-invocable: false" if this skill should only be triggered by other skills.',
          file: 'SKILL.md',
        },
      ],
    };
  },
};
