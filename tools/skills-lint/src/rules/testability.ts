import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { LintRule, ParsedSkill, RuleResult } from '../types.js';

function pass(ruleId: string, maxPoints: number): RuleResult {
  return { ruleId, passed: true, score: maxPoints, maxPoints, findings: [] };
}

export const ruleMissingTestPlan: LintRule = {
  id: 'missing-test-plan',
  title: 'Missing TEST_PLAN.md',
  description:
    'Each skill should have a TEST_PLAN.md with prompt tests and expected behaviour',
  category: 'testability',
  defaultSeverity: 'warning',
  maxPoints: 8,
  evaluate(skill: ParsedSkill): RuleResult {
    const testPlanPath = join(skill.directory.absolutePath, 'TEST_PLAN.md');

    if (existsSync(testPlanPath)) {
      return pass(this.id, this.maxPoints);
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
          message: 'No TEST_PLAN.md found.',
          suggestion:
            'Run "skill-lint test-plan" to generate a starter TEST_PLAN.md with prompt tests.',
        },
      ],
    };
  },
};

export const ruleNoExpectedBehaviour: LintRule = {
  id: 'no-expected-behaviour',
  title: 'No expected behaviour defined',
  description:
    'SKILL.md or related docs should define expected behaviour for testability',
  category: 'testability',
  defaultSeverity: 'info',
  maxPoints: 7,
  evaluate(skill: ParsedSkill): RuleResult {
    if (!skill.markdown) return pass(this.id, 0);

    // Check for "When to Use" or similar sections that define expected triggers
    const hasWhenToUse = skill.markdown.headings.some((h) =>
      /when to use|triggers?|activation|usage/i.test(h.text)
    );

    // Check for "Do Not Use" which also helps testability
    const hasDoNotUse = skill.markdown.headings.some((h) =>
      /do not use|not for|anti.?pattern|out of scope/i.test(h.text)
    );

    let score = 0;
    const findings = [];

    if (hasWhenToUse) {
      score += 4;
    } else {
      findings.push({
        severity: 'info' as const,
        code: this.id,
        message: 'No "When to Use" section found for testability.',
        suggestion:
          'Add a "When to Use" section listing trigger scenarios for the skill.',
        file: 'SKILL.md',
      });
    }

    if (hasDoNotUse) {
      score += 3;
    } else {
      findings.push({
        severity: 'info' as const,
        code: this.id,
        message: 'No "Do Not Use" section found.',
        suggestion:
          'Adding a "Do Not Use When" section helps clarify skill boundaries for testing.',
        file: 'SKILL.md',
      });
    }

    return {
      ruleId: this.id,
      passed: score >= 4,
      score,
      maxPoints: this.maxPoints,
      findings,
    };
  },
};
