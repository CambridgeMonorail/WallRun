Here’s a **developer-ready implementation brief** for a first version of a repo-local `skill-lint` tool.

It is grounded in Anthropic’s current guidance that skills should use **progressive disclosure**, keep `SKILL.md` **under 500 lines**, rely on the `description` field for discovery, and split deeper material into supporting files and scripts loaded only when needed. Claude Code’s docs also document frontmatter controls such as `disable-model-invocation`, `user-invocable`, and `context: fork`. ([Claude][1])

---

# `skill-lint` v1 Implementation Brief

## Goal

Build a **repo-local TypeScript CLI** that audits every Claude skill in the repo and produces:

* a numeric score out of 100
* structured findings with severity
* a per-skill markdown lint report
* a per-skill JSON report
* a generated test plan
* a repo summary report

The tool should help a developer work through the existing `skills/` directory **one skill at a time**, refactor weak skills, and re-run the linter until they meet the desired standard.

Anthropic’s recommended model is that `SKILL.md` acts as a concise overview, while examples, deeper references, and scripts live in separate files and are only loaded or executed when needed. ([Claude][1])

---

# Scope for v1

## In scope

* Discover skills under a configurable root directory
* Validate skill directory structure
* Parse and validate `SKILL.md` frontmatter
* Analyse markdown structure and size
* Check progressive disclosure patterns
* Check local file references
* Check for presence and use of `scripts/`, `references/`, `assets/`
* Score each skill
* Emit markdown + JSON reports
* Generate a basic `TEST_PLAN.md`
* Provide CI-friendly exit codes

## Out of scope for v1

* Fully automatic skill rewriting
* LLM-based judging
* Running Claude to verify trigger behaviour automatically
* Deep semantic quality scoring
* Editing files outside safe stub generation

---

# Recommended tech stack

Use:

* **TypeScript**
* **Node.js**
* **commander** for CLI parsing
* **gray-matter** for YAML frontmatter
* **remark** and **unist** utilities for markdown AST parsing
* **fast-glob** for file discovery
* **zod** for config/result schemas
* **vitest** for unit tests

That stack is enough for a clean v1 and fits nicely in an Nx monorepo.

---

# Suggested repo structure

```text
tools/skill-lint/
  src/
    cli.ts
    config.ts
    constants.ts

    commands/
      lint.ts
      lint-all.ts
      report.ts
      test-plan.ts
      ci.ts

    core/
      discover-skills.ts
      load-skill.ts
      lint-skill.ts
      score-skill.ts
      build-summary.ts

    parsers/
      parse-frontmatter.ts
      parse-markdown.ts
      extract-links.ts

    rules/
      metadata/
        rule-missing-name.ts
        rule-missing-description.ts
        rule-invalid-name-format.ts
        rule-weak-description.ts
      structure/
        rule-missing-skill-md.ts
        rule-orphan-supporting-files.ts
        rule-broken-local-links.ts
      content/
        rule-skill-md-too-long.ts
        rule-missing-workflow.ts
        rule-missing-output-format.ts
        rule-inline-example-density.ts
        rule-large-section.ts
      disclosure/
        rule-no-progressive-disclosure.ts
        rule-unreferenced-scripts.ts
        rule-unreferenced-references.ts
      safety/
        rule-unsafe-invocation.ts

    reporters/
      markdown-reporter.ts
      json-reporter.ts
      summary-reporter.ts

    generators/
      generate-test-plan.ts
      generate-refactor-plan.ts

    schemas/
      frontmatter.ts
      lint-config.ts
      results.ts

    types/
      skill.ts
      rules.ts
      reports.ts

    utils/
      fs.ts
      path.ts
      text.ts
      scoring.ts

  package.json
  tsconfig.json
  vitest.config.ts
```

---

# Skill directory assumptions

Each skill is a directory containing `SKILL.md`, with optional supporting files. Anthropic’s docs describe this skill-as-directory model and explicitly show the pattern of `SKILL.md` plus reference files and a `scripts/` folder. ([Claude][1])

Example target:

```text
skills/
  menu-board-designer/
    SKILL.md
    references/
      examples.md
      layout-patterns.md
    scripts/
      validate-layout.py
    assets/
      templates/
```

---

# CLI surface

## Commands

```bash
skill-lint lint <skillPath>
skill-lint lint-all <skillsRoot>
skill-lint report <skillsRoot> --out <dir>
skill-lint test-plan <skillPath>
skill-lint ci <skillsRoot>
```

## Examples

```bash
pnpm tsx tools/skill-lint/src/cli.ts lint skills/menu-board-designer
pnpm tsx tools/skill-lint/src/cli.ts lint-all skills
pnpm tsx tools/skill-lint/src/cli.ts report skills --out reports/skills
pnpm tsx tools/skill-lint/src/cli.ts ci skills
```

---

# TypeScript interfaces

## Core domain types

```ts
export interface SkillDirectory {
  name: string
  absolutePath: string
  relativePath: string
  skillMdPath: string | null
  supportingFiles: SupportingFile[]
}

export interface SupportingFile {
  absolutePath: string
  relativePath: string
  kind: 'reference' | 'script' | 'asset' | 'other'
  extension: string
}

export interface ParsedSkill {
  directory: SkillDirectory
  frontmatter: SkillFrontmatter | null
  rawContent: string | null
  markdown: ParsedMarkdown | null
}
```

## Frontmatter

Claude Code supports skill frontmatter including metadata and invocation controls. The docs specifically mention `description`, `disable-model-invocation`, `user-invocable`, and `context: fork`. ([Claude API Docs][2])

```ts
export interface SkillFrontmatter {
  name?: string
  description?: string
  'disable-model-invocation'?: boolean
  'user-invocable'?: boolean
  context?: 'session' | 'fork'
  agent?: string
  'allowed-tools'?: string[]
}
```

## Markdown parse model

```ts
export interface ParsedMarkdown {
  lineCount: number
  headings: MarkdownHeading[]
  links: MarkdownLink[]
  codeBlockCount: number
  numberedListCount: number
  bulletListCount: number
  sections: MarkdownSection[]
  plainText: string
}

export interface MarkdownHeading {
  depth: number
  text: string
  line: number
}

export interface MarkdownLink {
  text: string
  url: string
  line: number
  isLocalFile: boolean
}

export interface MarkdownSection {
  heading: string | null
  startLine: number
  endLine: number
  lineCount: number
  text: string
}
```

## Rule engine types

```ts
export type RuleSeverity = 'info' | 'warning' | 'error'

export type RuleCategory =
  | 'metadata'
  | 'structure'
  | 'content'
  | 'progressive-disclosure'
  | 'supporting-files'
  | 'testability'
  | 'safety'

export interface LintRule {
  id: string
  title: string
  description: string
  category: RuleCategory
  defaultSeverity: RuleSeverity
  maxPoints: number
  evaluate: (skill: ParsedSkill, ctx: RuleContext) => RuleResult
}

export interface RuleContext {
  repoRoot: string
  skillsRoot: string
  config: SkillLintConfig
}

export interface RuleResult {
  ruleId: string
  passed: boolean
  score: number
  maxPoints: number
  findings: LintFinding[]
}

export interface LintFinding {
  severity: RuleSeverity
  code: string
  message: string
  suggestion?: string
  file?: string
  line?: number
}
```

## Final report model

```ts
export interface SkillLintReport {
  skillName: string
  skillPath: string
  totalScore: number
  maxScore: number
  band: 'production-quality' | 'good-but-improvable' | 'needs-refactor' | 'poor-design'
  categoryScores: Record<RuleCategory, number>
  findings: LintFinding[]
  ruleResults: RuleResult[]
  suggestedActions: string[]
}

export interface RepoLintSummary {
  skillsScanned: number
  averageScore: number
  highestScore: number
  lowestScore: number
  mostCommonFindings: Array<{
    code: string
    count: number
  }>
  reports: SkillLintReport[]
}
```

## Config

```ts
export interface SkillLintConfig {
  maxSkillMdLines: number
  warningSkillMdLines: number
  maxSectionLines: number
  inlineExampleDensityWarning: number
  requireWhenToUseSection: boolean
  requireWorkflowSection: boolean
  requireOutputFormatSection: boolean
  failOnMissingTestPlanInCi: boolean
}
```

## Default config

Anthropic recommends keeping `SKILL.md` under 500 lines, so make that the hard warning threshold for normal linting, with a stricter “approaching the limit” warning below it. ([Claude][1])

```ts
export const defaultConfig: SkillLintConfig = {
  maxSkillMdLines: 500,
  warningSkillMdLines: 350,
  maxSectionLines: 150,
  inlineExampleDensityWarning: 0.4,
  requireWhenToUseSection: true,
  requireWorkflowSection: true,
  requireOutputFormatSection: true,
  failOnMissingTestPlanInCi: true,
}
```

---

# Scoring model

Total score: **100**

```ts
export const CATEGORY_WEIGHTS = {
  metadata: 15,
  structure: 10,
  content: 20,
  'progressive-disclosure': 20,
  'supporting-files': 10,
  testability: 15,
  safety: 10,
} as const
```

## Suggested quality bands

```ts
export function scoreToBand(score: number): SkillLintReport['band'] {
  if (score >= 90) return 'production-quality'
  if (score >= 75) return 'good-but-improvable'
  if (score >= 60) return 'needs-refactor'
  return 'poor-design'
}
```

---

# Rule definitions for v1

## Metadata rules

Anthropic’s docs emphasise that the `description` field is critical for discovery, and that names should be descriptive and specific rather than vague. ([Claude][1])

### `missing-name`

* **Category:** metadata
* **Severity:** error
* **Pass condition:** frontmatter contains `name`

### `missing-description`

* **Category:** metadata
* **Severity:** error
* **Pass condition:** frontmatter contains non-empty `description`

### `invalid-name-format`

* **Category:** metadata
* **Severity:** warning
* **Pass condition:** `name` matches `/^[a-z0-9-]+$/`

### `weak-description`

* **Category:** metadata
* **Severity:** warning
* **Pass condition:** description contains both:

  * a capability phrase, such as “design”, “generate”, “analyse”
  * a trigger phrase, such as “use when”, “for”, “when asked to”

### `reserved-word-in-name`

* **Category:** metadata
* **Severity:** warning
* **Pass condition:** name does not include `claude`, `anthropic`, or other reserved org words

---

## Structure rules

### `missing-skill-md`

* **Category:** structure
* **Severity:** error
* **Pass condition:** `SKILL.md` exists

### `broken-local-links`

* **Category:** structure
* **Severity:** error
* **Pass condition:** all local markdown links resolve to existing files

### `orphan-supporting-files`

* **Category:** structure
* **Severity:** warning
* **Pass condition:** no reference or script files exist without being mentioned anywhere in `SKILL.md`

---

## Content rules

### `skill-md-too-long`

* **Category:** content
* **Severity:** warning or error depending on size
* **Pass condition:** line count <= 500
* **Warning threshold:** > 350
* **Error threshold:** > 700

### `large-section`

* **Category:** content
* **Severity:** warning
* **Pass condition:** no single section exceeds 150 lines

### `missing-workflow`

* **Category:** content
* **Severity:** warning
* **Pass condition:** markdown contains either:

  * heading with “workflow”, “process”, or “steps”
  * numbered list with at least 3 items

### `missing-output-format`

* **Category:** content
* **Severity:** info or warning
* **Pass condition:** markdown contains heading with “output”, “output format”, “deliverable”, or equivalent

### `inline-example-density`

* **Category:** content
* **Severity:** warning
* **Pass condition:** estimated example/code density < 40%

Heuristic for example density:

* ratio of lines in fenced code blocks
* plus lines in sections headed “examples”, “sample output”, “reference”
* divided by total lines

---

## Progressive disclosure rules

Anthropic explicitly recommends progressive disclosure: keep `SKILL.md` concise, move advanced material into separate files, and use scripts for executable helpers rather than bloating instructions. ([Claude][1])

### `no-progressive-disclosure`

* **Category:** progressive-disclosure
* **Severity:** warning
* **Pass condition:** if `SKILL.md` is large or complex, it references at least one supporting file

### `unreferenced-scripts`

* **Category:** progressive-disclosure
* **Severity:** warning
* **Pass condition:** any file in `scripts/` is referenced in `SKILL.md`

### `unreferenced-references`

* **Category:** progressive-disclosure
* **Severity:** warning
* **Pass condition:** any file in `references/` is referenced in `SKILL.md`

### `supporting-files-without-context`

* **Category:** progressive-disclosure
* **Severity:** info
* **Pass condition:** references in `SKILL.md` mention what the linked file is for, not just a bare filename dump

---

## Supporting file rules

### `junk-assets`

* **Category:** supporting-files
* **Severity:** info
* **Pass condition:** assets directory does not contain obviously unrelated files

### `too-many-other-files`

* **Category:** supporting-files
* **Severity:** warning
* **Pass condition:** unclassified files count below configurable threshold

---

## Testability rules

Anthropic recommends testing skills with real usage and across the models you plan to use. For v1, generate a human-reviewable test plan rather than trying to automate model execution. ([Claude][1])

### `missing-test-plan`

* **Category:** testability
* **Severity:** warning
* **Pass condition:** `TEST_PLAN.md` exists, or the command generated one

### `no-expected-behaviour`

* **Category:** testability
* **Severity:** info
* **Pass condition:** generated or existing test plan includes expected behaviour bullets

---

## Safety and invocation rules

Claude Code docs expose frontmatter controls for who can invoke a skill and whether it should run in a forked context. ([Claude API Docs][2])

### `unsafe-invocation`

* **Category:** safety
* **Severity:** warning
* **Pass condition:** if the skill clearly performs side effects, it should consider `disable-model-invocation: true`

### `background-knowledge-user-invocable`

* **Category:** safety
* **Severity:** info
* **Pass condition:** reference-only helper skills consider `user-invocable: false`

---

# Core heuristics for v1

These are deliberately simple. You want something useful, not a PhD thesis disguised as a linter.

## Detect “workflow present”

```ts
function hasWorkflow(markdown: ParsedMarkdown): boolean {
  const headingMatch = markdown.headings.some((h) =>
    /workflow|process|steps|how to use/i.test(h.text)
  )

  const numberedListLikely = markdown.numberedListCount > 0

  return headingMatch || numberedListLikely
}
```

## Detect “output format present”

```ts
function hasOutputFormat(markdown: ParsedMarkdown): boolean {
  return markdown.headings.some((h) =>
    /output|deliverable|response format|output format/i.test(h.text)
  )
}
```

## Detect “progressive disclosure present”

```ts
function hasProgressiveDisclosure(skill: ParsedSkill): boolean {
  if (!skill.markdown) return false

  const hasSupportingFiles =
    skill.directory.supportingFiles.filter((f) => f.kind !== 'other').length > 0

  const hasLinksToSupportingFiles = skill.markdown.links.some((link) =>
    link.isLocalFile
  )

  return hasSupportingFiles && hasLinksToSupportingFiles
}
```

## Detect “weak description”

```ts
function isWeakDescription(description?: string): boolean {
  if (!description) return true

  const hasVerb = /design|generate|create|analyse|review|validate|transform/i.test(description)
  const hasTrigger = /use when|when asked|for|helps with|used for/i.test(description)
  const tooShort = description.trim().length < 40

  return !hasVerb || !hasTrigger || tooShort
}
```

## Detect likely side-effect skill

```ts
function looksSideEffecting(skill: ParsedSkill): boolean {
  const text = `${skill.frontmatter?.description ?? ''}\n${skill.rawContent ?? ''}`
  return /deploy|publish|delete|send|submit|modify|update|apply|write to|execute/i.test(text)
}
```

---

# Pseudocode for first version

## CLI entrypoint

```ts
async function main() {
  const program = new Command()

  program
    .name('skill-lint')
    .description('Lint Claude skills in a local repository')

  program
    .command('lint')
    .argument('<skillPath>')
    .option('--format <format>', 'markdown|json', 'markdown')
    .action(runLintCommand)

  program
    .command('lint-all')
    .argument('<skillsRoot>')
    .action(runLintAllCommand)

  program
    .command('report')
    .argument('<skillsRoot>')
    .option('--out <dir>', 'Output directory', 'reports/skills')
    .action(runReportCommand)

  program
    .command('test-plan')
    .argument('<skillPath>')
    .action(runTestPlanCommand)

  program
    .command('ci')
    .argument('<skillsRoot>')
    .action(runCiCommand)

  await program.parseAsync(process.argv)
}
```

## Discover skills

```ts
async function discoverSkills(skillsRoot: string): Promise<SkillDirectory[]> {
  const directories = await findImmediateSubdirectories(skillsRoot)
  const skills: SkillDirectory[] = []

  for (const dir of directories) {
    const files = await listFilesRecursively(dir)
    const skillMdPath = files.find((f) => basename(f) === 'SKILL.md') ?? null

    if (!skillMdPath) {
      skills.push({
        name: basename(dir),
        absolutePath: dir,
        relativePath: relative(process.cwd(), dir),
        skillMdPath: null,
        supportingFiles: classifySupportingFiles(files),
      })
      continue
    }

    skills.push({
      name: basename(dir),
      absolutePath: dir,
      relativePath: relative(process.cwd(), dir),
      skillMdPath,
      supportingFiles: classifySupportingFiles(files.filter((f) => f !== skillMdPath)),
    })
  }

  return skills
}
```

## Load and parse one skill

```ts
async function loadSkill(directory: SkillDirectory): Promise<ParsedSkill> {
  if (!directory.skillMdPath) {
    return {
      directory,
      frontmatter: null,
      rawContent: null,
      markdown: null,
    }
  }

  const raw = await fs.readFile(directory.skillMdPath, 'utf8')
  const parsed = matter(raw)

  return {
    directory,
    frontmatter: parsed.data as SkillFrontmatter,
    rawContent: parsed.content,
    markdown: await parseMarkdown(parsed.content),
  }
}
```

## Parse markdown

```ts
async function parseMarkdown(content: string): Promise<ParsedMarkdown> {
  const tree = remark().parse(content)

  const headings = extractHeadings(tree)
  const links = extractLinks(tree)
  const sections = buildSectionsFromHeadings(content, headings)
  const codeBlockCount = countCodeBlocks(tree)
  const numberedListCount = countOrderedLists(tree)
  const bulletListCount = countBulletLists(tree)

  return {
    lineCount: content.split('\n').length,
    headings,
    links,
    codeBlockCount,
    numberedListCount,
    bulletListCount,
    sections,
    plainText: stripMarkdown(content),
  }
}
```

## Run rules

```ts
async function lintSkill(
  skill: ParsedSkill,
  ctx: RuleContext,
  rules: LintRule[]
): Promise<SkillLintReport> {
  const ruleResults = rules.map((rule) => rule.evaluate(skill, ctx))
  const findings = ruleResults.flatMap((r) => r.findings)

  const categoryScores = aggregateCategoryScores(ruleResults, rules)
  const totalScore = Object.values(categoryScores).reduce((sum, n) => sum + n, 0)

  return {
    skillName: skill.frontmatter?.name ?? skill.directory.name,
    skillPath: skill.directory.relativePath,
    totalScore,
    maxScore: 100,
    band: scoreToBand(totalScore),
    categoryScores,
    findings,
    ruleResults,
    suggestedActions: buildSuggestedActions(findings),
  }
}
```

## Generate markdown report

```ts
function renderMarkdownReport(report: SkillLintReport): string {
  return [
    `# Lint Report: ${report.skillName}`,
    ``,
    `## Score`,
    `${report.totalScore}/${report.maxScore}`,
    ``,
    `## Status`,
    `${report.band}`,
    ``,
    `## Category Scores`,
    ...Object.entries(report.categoryScores).map(([k, v]) => `- ${k}: ${v}`),
    ``,
    `## Findings`,
    ...report.findings.map((f) => `- **${f.severity.toUpperCase()}** ${f.message}`),
    ``,
    `## Suggested Actions`,
    ...report.suggestedActions.map((a) => `1. ${a}`),
    ``,
  ].join('\n')
}
```

## Generate test plan

```ts
function generateTestPlan(skill: ParsedSkill): string {
  const skillName = skill.frontmatter?.name ?? skill.directory.name
  const description = skill.frontmatter?.description ?? ''

  const domainHint = inferDomainFromDescription(description)

  return [
    `# TEST_PLAN: ${skillName}`,
    ``,
    `## Basic prompt`,
    buildBasicPrompt(domainHint),
    ``,
    `## Edge prompt`,
    buildEdgePrompt(domainHint),
    ``,
    `## Complex prompt`,
    buildComplexPrompt(domainHint),
    ``,
    `## Expected behaviour`,
    `- Skill should trigger for relevant phrasing`,
    `- Output should follow the workflow in SKILL.md`,
    `- Output structure should be predictable`,
    `- Supporting files should be used only when relevant`,
    ``,
  ].join('\n')
}
```

## CI mode

```ts
async function runCi(skillsRoot: string): Promise<number> {
  const reports = await lintAll(skillsRoot)

  const hasBlockingIssue = reports.some((report) =>
    report.findings.some((f) => f.severity === 'error')
  )

  const hasMissingTestPlan = reports.some((report) =>
    report.findings.some((f) => f.code === 'missing-test-plan')
  )

  if (hasBlockingIssue) return 1
  if (hasMissingTestPlan) return 1

  return 0
}
```

---

# Example initial rule list

```ts
export const rules: LintRule[] = [
  ruleMissingSkillMd,
  ruleMissingName,
  ruleMissingDescription,
  ruleInvalidNameFormat,
  ruleWeakDescription,
  ruleSkillMdTooLong,
  ruleLargeSection,
  ruleMissingWorkflow,
  ruleMissingOutputFormat,
  ruleInlineExampleDensity,
  ruleBrokenLocalLinks,
  ruleNoProgressiveDisclosure,
  ruleUnreferencedScripts,
  ruleUnreferencedReferences,
  ruleOrphanSupportingFiles,
  ruleMissingTestPlan,
  ruleUnsafeInvocation,
]
```

---

# Expected outputs

## Per skill

```text
skills/menu-board-designer/LINT_REPORT.md
skills/menu-board-designer/TEST_PLAN.md
reports/skills/menu-board-designer.lint.json
```

## Repo level

```text
reports/skills/index.json
reports/skills/summary.md
```

---

# Example report JSON

```json
{
  "skillName": "menu-board-designer",
  "skillPath": "skills/menu-board-designer",
  "totalScore": 81,
  "maxScore": 100,
  "band": "good-but-improvable",
  "categoryScores": {
    "metadata": 13,
    "structure": 8,
    "content": 15,
    "progressive-disclosure": 16,
    "supporting-files": 8,
    "testability": 11,
    "safety": 10
  },
  "findings": [
    {
      "severity": "warning",
      "code": "skill-md-too-long",
      "message": "SKILL.md is 612 lines. Recommended maximum is 500.",
      "suggestion": "Move examples and detailed guidance into references/examples.md"
    }
  ],
  "suggestedActions": [
    "Move inline examples into references/examples.md",
    "Add a short 'When to use' section",
    "Generate TEST_PLAN.md and review prompts"
  ]
}
```

---

# Vitest test plan for the linter itself

## Unit tests

* frontmatter parsing
* markdown heading extraction
* markdown link extraction
* line count calculation
* file classification
* each rule’s pass/fail behaviour

## Fixture-based tests

Create fixture skills under:

```text
tools/skill-lint/src/__fixtures__/
  valid-skill/
  missing-description/
  oversized-skill/
  broken-links/
  no-progressive-disclosure/
```

Each fixture should have an expected lint snapshot.

## Integration tests

* `lint` returns markdown output
* `lint-all` scans multiple skills
* `report` writes files
* `ci` exits non-zero on blocking errors

---

# Recommended implementation order

## Phase 1

Build the useful boring bits first.

1. CLI skeleton
2. skill discovery
3. frontmatter parsing
4. markdown parsing
5. core rules:

   * missing-skill-md
   * missing-name
   * missing-description
   * invalid-name-format
   * skill-md-too-long
   * broken-local-links
6. markdown reporter
7. JSON reporter

## Phase 2

Add the bits that make it genuinely valuable.

1. missing-workflow
2. missing-output-format
3. inline-example-density
4. no-progressive-disclosure
5. unreferenced-scripts
6. unreferenced-references
7. test plan generation

## Phase 3

Make it CI-friendly and less annoying.

1. repo summary report
2. ci command
3. config file support
4. optional stub generation for missing `TEST_PLAN.md`

---

# Definition of done for v1

`skill-lint` v1 is done when a developer can:

* run it against the repo’s `skills/` directory
* get a score and findings for every skill
* see which skills most need refactoring
* generate a test plan for each skill
* fail CI on obvious structural issues

That is enough to turn “we should probably tidy these skills up” into an actual repeatable engineering workflow, which is generally where projects stop being vibes and start being software.



[1]: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices?utm_source=chatgpt.com "Skill authoring best practices - Claude API Docs"
[2]: https://docs.anthropic.com/en/docs/claude-code/slash-commands?utm_source=chatgpt.com "Extend Claude with skills - Claude Code Docs"
