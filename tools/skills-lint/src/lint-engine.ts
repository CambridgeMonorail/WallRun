import { CATEGORY_WEIGHTS, scoreToBand } from './config.js';
import { discoverSkills, loadSkill } from './discovery.js';
import { allRules } from './rules/index.js';
import type {
  LintFinding,
  LintRule,
  ParsedSkill,
  RepoLintSummary,
  RuleCategory,
  RuleContext,
  RuleResult,
  SkillLintConfig,
  SkillLintReport,
} from './types.js';

export function lintSkill(
  skill: ParsedSkill,
  ctx: RuleContext,
  rules: LintRule[] = allRules
): SkillLintReport {
  const ruleResults = rules.map((rule) => rule.evaluate(skill, ctx));
  const findings = ruleResults.flatMap((r) => r.findings);
  const categoryScores = aggregateCategoryScores(ruleResults, rules);
  const totalScore = Object.values(categoryScores).reduce(
    (sum, n) => sum + n,
    0
  );

  return {
    skillName: skill.frontmatter?.name ?? skill.directory.name,
    skillPath: skill.directory.relativePath,
    totalScore: Math.round(totalScore),
    maxScore: 100,
    band: scoreToBand(Math.round(totalScore)),
    categoryScores,
    findings,
    ruleResults,
    suggestedActions: buildSuggestedActions(findings),
  };
}

export function lintAll(
  skillsRoot: string,
  config: SkillLintConfig
): RepoLintSummary {
  const directories = discoverSkills(skillsRoot);
  const ctx: RuleContext = {
    repoRoot: process.cwd(),
    skillsRoot,
    config,
  };

  const reports: SkillLintReport[] = [];

  for (const dir of directories) {
    const skill = loadSkill(dir);
    const report = lintSkill(skill, ctx);
    reports.push(report);
  }

  const scores = reports.map((r) => r.totalScore);
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  const findingCounts = new Map<string, number>();
  for (const report of reports) {
    for (const finding of report.findings) {
      findingCounts.set(
        finding.code,
        (findingCounts.get(finding.code) ?? 0) + 1
      );
    }
  }

  const mostCommonFindings = [...findingCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([code, count]) => ({ code, count }));

  return {
    skillsScanned: reports.length,
    averageScore,
    highestScore: scores.length > 0 ? Math.max(...scores) : 0,
    lowestScore: scores.length > 0 ? Math.min(...scores) : 0,
    mostCommonFindings,
    reports,
  };
}

function aggregateCategoryScores(
  results: RuleResult[],
  rules: LintRule[]
): Record<RuleCategory, number> {
  const categories = Object.keys(CATEGORY_WEIGHTS) as RuleCategory[];
  const scores = {} as Record<RuleCategory, number>;

  for (const category of categories) {
    const categoryRules = rules.filter((r) => r.category === category);
    const categoryResults = results.filter((r) =>
      categoryRules.some((rule) => rule.id === r.ruleId)
    );

    if (categoryResults.length === 0) {
      // No rules for this category — award full weight
      scores[category] = CATEGORY_WEIGHTS[category];
      continue;
    }

    const rawScore = categoryResults.reduce((sum, r) => sum + r.score, 0);
    const rawMax = categoryResults.reduce((sum, r) => sum + r.maxPoints, 0);

    if (rawMax === 0) {
      scores[category] = CATEGORY_WEIGHTS[category];
      continue;
    }

    scores[category] = Math.round(
      (rawScore / rawMax) * CATEGORY_WEIGHTS[category] * 10
    ) / 10;
  }

  return scores;
}

function buildSuggestedActions(findings: LintFinding[]): string[] {
  const actions: string[] = [];
  const seen = new Set<string>();

  const errorFindings = findings.filter((f) => f.severity === 'error');
  const warningFindings = findings.filter((f) => f.severity === 'warning');

  for (const f of [...errorFindings, ...warningFindings]) {
    if (f.suggestion && !seen.has(f.suggestion)) {
      seen.add(f.suggestion);
      actions.push(f.suggestion);
    }
  }

  return actions.slice(0, 10);
}
