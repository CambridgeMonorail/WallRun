import type { QualityBand, RuleCategory, SkillLintConfig } from './types.js';

export const DEFAULT_CONFIG: SkillLintConfig = {
  maxSkillMdLines: 500,
  warningSkillMdLines: 350,
  maxSectionLines: 150,
  inlineExampleDensityWarning: 0.4,
  requireWhenToUseSection: true,
  requireWorkflowSection: true,
  requireOutputFormatSection: true,
  failOnMissingTestPlanInCi: true,
};

export const CATEGORY_WEIGHTS: Record<RuleCategory, number> = {
  metadata: 15,
  structure: 10,
  content: 20,
  'progressive-disclosure': 20,
  'supporting-files': 10,
  testability: 15,
  safety: 10,
} as const;

export function scoreToBand(score: number): QualityBand {
  if (score >= 90) return 'production-quality';
  if (score >= 75) return 'good-but-improvable';
  if (score >= 60) return 'needs-refactor';
  return 'poor-design';
}
