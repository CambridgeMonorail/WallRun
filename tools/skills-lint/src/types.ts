export type RuleSeverity = 'info' | 'warning' | 'error';

export type RuleCategory =
  | 'metadata'
  | 'structure'
  | 'content'
  | 'progressive-disclosure'
  | 'supporting-files'
  | 'testability'
  | 'safety';

export type QualityBand =
  | 'production-quality'
  | 'good-but-improvable'
  | 'needs-refactor'
  | 'poor-design';

export interface SupportingFile {
  absolutePath: string;
  relativePath: string;
  kind: 'reference' | 'script' | 'asset' | 'other';
  extension: string;
}

export interface SkillDirectory {
  name: string;
  absolutePath: string;
  relativePath: string;
  skillMdPath: string | null;
  supportingFiles: SupportingFile[];
}

export interface SkillFrontmatter {
  name?: string;
  description?: string;
  license?: string;
  metadata?: Record<string, unknown>;
  'disable-model-invocation'?: boolean;
  'user-invocable'?: boolean;
  context?: 'session' | 'fork';
  agent?: string;
  'allowed-tools'?: string[];
}

export interface MarkdownHeading {
  depth: number;
  text: string;
  line: number;
}

export interface MarkdownLink {
  text: string;
  url: string;
  line: number;
  isLocalFile: boolean;
}

export interface MarkdownSection {
  heading: string | null;
  startLine: number;
  endLine: number;
  lineCount: number;
  text: string;
}

export interface ParsedMarkdown {
  lineCount: number;
  headings: MarkdownHeading[];
  links: MarkdownLink[];
  codeBlockCount: number;
  codeBlockLines: number;
  numberedListCount: number;
  bulletListCount: number;
  sections: MarkdownSection[];
  plainText: string;
}

export interface ParsedSkill {
  directory: SkillDirectory;
  frontmatter: SkillFrontmatter | null;
  rawContent: string | null;
  markdown: ParsedMarkdown | null;
}

export interface LintFinding {
  severity: RuleSeverity;
  code: string;
  message: string;
  suggestion?: string;
  file?: string;
  line?: number;
}

export interface RuleContext {
  repoRoot: string;
  skillsRoot: string;
  config: SkillLintConfig;
}

export interface RuleResult {
  ruleId: string;
  passed: boolean;
  score: number;
  maxPoints: number;
  findings: LintFinding[];
}

export interface LintRule {
  id: string;
  title: string;
  description: string;
  category: RuleCategory;
  defaultSeverity: RuleSeverity;
  maxPoints: number;
  evaluate: (skill: ParsedSkill, ctx: RuleContext) => RuleResult;
}

export interface SkillLintReport {
  skillName: string;
  skillPath: string;
  totalScore: number;
  maxScore: number;
  band: QualityBand;
  categoryScores: Record<RuleCategory, number>;
  findings: LintFinding[];
  ruleResults: RuleResult[];
  suggestedActions: string[];
}

export interface RepoLintSummary {
  skillsScanned: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  mostCommonFindings: Array<{ code: string; count: number }>;
  reports: SkillLintReport[];
}

export interface SkillLintConfig {
  maxSkillMdLines: number;
  warningSkillMdLines: number;
  maxSectionLines: number;
  inlineExampleDensityWarning: number;
  requireWhenToUseSection: boolean;
  requireWorkflowSection: boolean;
  requireOutputFormatSection: boolean;
  failOnMissingTestPlanInCi: boolean;
}
