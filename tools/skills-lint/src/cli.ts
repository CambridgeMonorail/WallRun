#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { Command } from 'commander';
import { DEFAULT_CONFIG } from './config.js';
import { discoverSkills, loadSkill } from './discovery.js';
import { generateTestPlan } from './generators.js';
import { lintAll, lintSkill } from './lint-engine.js';
import {
  renderConsoleReport,
  renderConsoleSummary,
  renderJsonReport,
  renderMarkdownReport,
  renderSummaryReport,
} from './reporters.js';
import type { RuleContext } from './types.js';

const program = new Command();

program
  .name('skill-lint')
  .description('Lint Claude skills in a local repository')
  .version('1.0.0');

program
  .command('lint')
  .description('Lint a single skill directory')
  .argument('<skillPath>', 'Path to the skill directory')
  .option('--format <format>', 'Output format: console, markdown, json', 'console')
  .action((skillPath: string, opts: { format: string }) => {
    const absPath = resolve(skillPath);
    if (!existsSync(absPath)) {
      console.error(`Skill directory not found: ${absPath}`);
      process.exit(1);
    }

    const directories = discoverSkills(resolve(absPath, '..'));
    const dir = directories.find((d) => d.name === basename(absPath));

    if (!dir) {
      console.error(`Could not discover skill at: ${absPath}`);
      process.exit(1);
    }

    const skill = loadSkill(dir);
    const ctx: RuleContext = {
      repoRoot: process.cwd(),
      skillsRoot: resolve(absPath, '..'),
      config: DEFAULT_CONFIG,
    };

    const report = lintSkill(skill, ctx);

    switch (opts.format) {
      case 'markdown':
        console.log(renderMarkdownReport(report));
        break;
      case 'json':
        console.log(renderJsonReport(report));
        break;
      default:
        console.log(renderConsoleReport(report));
        break;
    }

    const hasErrors = report.findings.some((f) => f.severity === 'error');
    process.exit(hasErrors ? 1 : 0);
  });

program
  .command('lint-all')
  .description('Lint all skills under a root directory')
  .argument('<skillsRoot>', 'Root directory containing skill subdirectories')
  .option('--format <format>', 'Output format: console, markdown, json', 'console')
  .action((skillsRoot: string, opts: { format: string }) => {
    const absRoot = resolve(skillsRoot);
    if (!existsSync(absRoot)) {
      console.error(`Skills root not found: ${absRoot}`);
      process.exit(1);
    }

    const summary = lintAll(absRoot, DEFAULT_CONFIG);

    switch (opts.format) {
      case 'markdown':
        for (const report of summary.reports) {
          console.log(renderMarkdownReport(report));
          console.log('---\n');
        }
        console.log(renderSummaryReport(summary));
        break;
      case 'json':
        console.log(JSON.stringify(summary, null, 2));
        break;
      default:
        for (const report of summary.reports) {
          console.log(renderConsoleReport(report));
        }
        console.log(renderConsoleSummary(summary));
        break;
    }

    const hasErrors = summary.reports.some((r) =>
      r.findings.some((f) => f.severity === 'error')
    );
    process.exit(hasErrors ? 1 : 0);
  });

program
  .command('report')
  .description('Generate lint reports and write them to files')
  .argument('<skillsRoot>', 'Root directory containing skill subdirectories')
  .option('--out <dir>', 'Output directory for reports', 'reports/skills')
  .action((skillsRoot: string, opts: { out: string }) => {
    const absRoot = resolve(skillsRoot);
    if (!existsSync(absRoot)) {
      console.error(`Skills root not found: ${absRoot}`);
      process.exit(1);
    }

    const outDir = resolve(opts.out);
    mkdirSync(outDir, { recursive: true });

    const summary = lintAll(absRoot, DEFAULT_CONFIG);

    for (const report of summary.reports) {
      // Write markdown report to skill directory
      const skillLintReportPath = join(
        absRoot,
        report.skillName,
        'LINT_REPORT.md'
      );
      writeFileSync(skillLintReportPath, renderMarkdownReport(report), 'utf8');

      // Write JSON report to output directory
      const jsonPath = join(outDir, `${report.skillName}.lint.json`);
      writeFileSync(jsonPath, renderJsonReport(report), 'utf8');
    }

    // Write summary
    const summaryMdPath = join(outDir, 'summary.md');
    writeFileSync(summaryMdPath, renderSummaryReport(summary), 'utf8');

    const summaryJsonPath = join(outDir, 'index.json');
    writeFileSync(
      summaryJsonPath,
      JSON.stringify(summary, null, 2),
      'utf8'
    );

    console.log(`Reports written to: ${outDir}`);
    console.log(`LINT_REPORT.md written to each skill directory`);
    console.log(renderConsoleSummary(summary));
  });

program
  .command('test-plan')
  .description('Generate a TEST_PLAN.md for a skill')
  .argument('<skillPath>', 'Path to the skill directory')
  .option('--force', 'Overwrite existing TEST_PLAN.md', false)
  .action((skillPath: string, opts: { force: boolean }) => {
    const absPath = resolve(skillPath);
    if (!existsSync(absPath)) {
      console.error(`Skill directory not found: ${absPath}`);
      process.exit(1);
    }

    const directories = discoverSkills(resolve(absPath, '..'));
    const dir = directories.find((d) => d.name === basename(absPath));

    if (!dir) {
      console.error(`Could not discover skill at: ${absPath}`);
      process.exit(1);
    }

    const testPlanPath = join(absPath, 'TEST_PLAN.md');
    if (existsSync(testPlanPath) && !opts.force) {
      console.error(
        `TEST_PLAN.md already exists. Use --force to overwrite.`
      );
      process.exit(1);
    }

    const skill = loadSkill(dir);
    const testPlan = generateTestPlan(skill);
    writeFileSync(testPlanPath, testPlan, 'utf8');
    console.log(`Generated: ${testPlanPath}`);
  });

program
  .command('ci')
  .description('Lint all skills and exit non-zero on blocking issues')
  .argument('<skillsRoot>', 'Root directory containing skill subdirectories')
  .action((skillsRoot: string) => {
    const absRoot = resolve(skillsRoot);
    if (!existsSync(absRoot)) {
      console.error(`Skills root not found: ${absRoot}`);
      process.exit(1);
    }

    const summary = lintAll(absRoot, DEFAULT_CONFIG);

    console.log(renderConsoleSummary(summary));

    const hasBlockingErrors = summary.reports.some((r) =>
      r.findings.some((f) => f.severity === 'error')
    );

    if (hasBlockingErrors) {
      console.error('CI FAILED: Blocking errors found in skills.');
      const errorReports = summary.reports.filter((r) =>
        r.findings.some((f) => f.severity === 'error')
      );
      for (const r of errorReports) {
        const errors = r.findings.filter((f) => f.severity === 'error');
        console.error(`  ${r.skillName}:`);
        for (const e of errors) {
          console.error(`    ✗ ${e.code}: ${e.message}`);
        }
      }
      process.exit(1);
    }

    console.log('CI PASSED: No blocking errors.');
    process.exit(0);
  });

program.parse(process.argv);
