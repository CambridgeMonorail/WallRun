import type { LintRule, ParsedSkill, RuleContext, RuleResult } from '../types.js';

function pass(ruleId: string, maxPoints: number): RuleResult {
  return { ruleId, passed: true, score: maxPoints, maxPoints, findings: [] };
}

export const ruleSkillMdTooLong: LintRule = {
  id: 'skill-md-too-long',
  title: 'SKILL.md too long',
  description:
    'SKILL.md should be under 500 lines; shorter files load faster into the context window',
  category: 'content',
  defaultSeverity: 'warning',
  maxPoints: 4,
  evaluate(skill: ParsedSkill, ctx: RuleContext): RuleResult {
    if (!skill.markdown) return pass(this.id, this.maxPoints);

    const lines = skill.markdown.lineCount;
    const { maxSkillMdLines, warningSkillMdLines } = ctx.config;

    if (lines > maxSkillMdLines + 200) {
      return {
        ruleId: this.id,
        passed: false,
        score: 0,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'error',
            code: this.id,
            message: `SKILL.md is ${lines} lines (hard limit: ${maxSkillMdLines}).`,
            suggestion:
              'Move examples, detailed guidance, and reference material into references/ files.',
            file: 'SKILL.md',
          },
        ],
      };
    }

    if (lines > maxSkillMdLines) {
      return {
        ruleId: this.id,
        passed: false,
        score: 1,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'warning',
            code: this.id,
            message: `SKILL.md is ${lines} lines (recommended max: ${maxSkillMdLines}).`,
            suggestion:
              'Consider moving some content to references/ to reduce context window usage.',
            file: 'SKILL.md',
          },
        ],
      };
    }

    if (lines > warningSkillMdLines) {
      return {
        ruleId: this.id,
        passed: true,
        score: 3,
        maxPoints: this.maxPoints,
        findings: [
          {
            severity: 'info',
            code: this.id,
            message: `SKILL.md is ${lines} lines (approaching the ${maxSkillMdLines}-line limit).`,
            file: 'SKILL.md',
          },
        ],
      };
    }

    return pass(this.id, this.maxPoints);
  },
};

export const ruleLargeSection: LintRule = {
  id: 'large-section',
  title: 'Large section',
  description: 'No single section should exceed 150 lines',
  category: 'content',
  defaultSeverity: 'warning',
  maxPoints: 3,
  evaluate(skill: ParsedSkill, ctx: RuleContext): RuleResult {
    if (!skill.markdown) return pass(this.id, this.maxPoints);

    const limit = ctx.config.maxSectionLines;
    const large = skill.markdown.sections.filter((s) => s.lineCount > limit);

    if (large.length === 0) return pass(this.id, this.maxPoints);

    return {
      ruleId: this.id,
      passed: false,
      score: large.length === 1 ? 1 : 0,
      maxPoints: this.maxPoints,
      findings: large.map((s) => ({
        severity: 'warning' as const,
        code: this.id,
        message: `Section "${s.heading ?? '(preamble)'}" is ${s.lineCount} lines (limit: ${limit}).`,
        suggestion:
          'Break this section into smaller parts or move detail to a references/ file.',
        file: 'SKILL.md',
        line: s.startLine,
      })),
    };
  },
};

export const ruleMissingWorkflow: LintRule = {
  id: 'missing-workflow',
  title: 'Missing workflow',
  description:
    'SKILL.md should define a step-by-step workflow or numbered process',
  category: 'content',
  defaultSeverity: 'warning',
  maxPoints: 5,
  evaluate(skill: ParsedSkill): RuleResult {
    if (!skill.markdown) return pass(this.id, 0);

    const headingMatch = skill.markdown.headings.some((h) =>
      /workflow|process|steps|procedure|how to use|verification procedure/i.test(
        h.text
      )
    );

    const hasNumberedList = skill.markdown.numberedListCount >= 3;

    if (headingMatch || hasNumberedList) {
      return pass(this.id, this.maxPoints);
    }

    return {
      ruleId: this.id,
      passed: false,
      score: skill.markdown.numberedListCount > 0 ? 2 : 0,
      maxPoints: this.maxPoints,
      findings: [
        {
          severity: 'warning',
          code: this.id,
          message:
            'SKILL.md does not contain a clear workflow section or numbered steps.',
          suggestion:
            'Add a "## Workflow" section with numbered steps to make the skill procedural.',
          file: 'SKILL.md',
        },
      ],
    };
  },
};

export const ruleMissingOutputFormat: LintRule = {
  id: 'missing-output-format',
  title: 'Missing output format',
  description:
    'SKILL.md should define what output the skill produces',
  category: 'content',
  defaultSeverity: 'warning',
  maxPoints: 4,
  evaluate(skill: ParsedSkill): RuleResult {
    if (!skill.markdown) return pass(this.id, 0);

    const hasOutputHeading = skill.markdown.headings.some((h) =>
      /output|deliverable|response format|output format|output contract|expected output/i.test(
        h.text
      )
    );

    if (hasOutputHeading) return pass(this.id, this.maxPoints);

    // Check if output expectations are mentioned in the content
    const contentMentionsOutput =
      skill.rawContent
        ? /\b(output should|produce a|return a|generate a|emit a|creates? a)\b/i.test(
            skill.rawContent
          )
        : false;

    if (contentMentionsOutput) {
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
              'Output expectations are mentioned but not in a dedicated section.',
            suggestion:
              'Consider adding a dedicated "## Output Format" or "## Output Contract" section.',
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
            'SKILL.md does not define expected output format or deliverables.',
          suggestion:
            'Add an "## Output Format" section describing what the skill produces.',
          file: 'SKILL.md',
        },
      ],
    };
  },
};

export const ruleInlineExampleDensity: LintRule = {
  id: 'inline-example-density',
  title: 'Inline example density',
  description:
    'If code blocks and examples make up more than 40% of SKILL.md, consider moving them to references/',
  category: 'content',
  defaultSeverity: 'warning',
  maxPoints: 4,
  evaluate(skill: ParsedSkill, ctx: RuleContext): RuleResult {
    if (!skill.markdown || skill.markdown.lineCount === 0) {
      return pass(this.id, this.maxPoints);
    }

    const exampleSectionLines = skill.markdown.sections
      .filter((s) =>
        /example|sample|reference|template/i.test(s.heading ?? '')
      )
      .reduce((sum, s) => sum + s.lineCount, 0);

    const exampleLines = skill.markdown.codeBlockLines + exampleSectionLines;
    const density = exampleLines / skill.markdown.lineCount;

    if (density <= ctx.config.inlineExampleDensityWarning) {
      return pass(this.id, this.maxPoints);
    }

    return {
      ruleId: this.id,
      passed: false,
      score: density > 0.6 ? 0 : 2,
      maxPoints: this.maxPoints,
      findings: [
        {
          severity: 'warning',
          code: this.id,
          message: `Estimated example density is ${Math.round(density * 100)}% (threshold: ${Math.round(ctx.config.inlineExampleDensityWarning * 100)}%).`,
          suggestion:
            'Move large examples and code blocks to references/examples.md to reduce context overhead.',
          file: 'SKILL.md',
        },
      ],
    };
  },
};
