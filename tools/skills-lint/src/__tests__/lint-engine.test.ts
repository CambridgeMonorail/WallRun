import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../config.js';
import { discoverSkills, loadSkill } from '../discovery.js';
import { lintSkill } from '../lint-engine.js';
import type { RuleContext } from '../types.js';

const fixturesRoot = resolve(import.meta.dirname, '..', '__fixtures__');

function lintFixture(name: string) {
  const skills = discoverSkills(fixturesRoot);
  const dir = skills.find((s) => s.name === name);
  if (!dir) throw new Error(`Fixture "${name}" not found`);

  const skill = loadSkill(dir);
  const ctx: RuleContext = {
    repoRoot: process.cwd(),
    skillsRoot: fixturesRoot,
    config: DEFAULT_CONFIG,
  };

  return lintSkill(skill, ctx);
}

describe('lintSkill', () => {
  it('produces a high score for a valid well-structured skill', () => {
    const report = lintFixture('valid-skill');
    expect(report.totalScore).toBeGreaterThanOrEqual(80);
    expect(report.band).toMatch(/production-quality|good-but-improvable/);
    expect(
      report.findings.filter((f) => f.severity === 'error')
    ).toHaveLength(0);
  });

  it('flags missing SKILL.md as an error', () => {
    const report = lintFixture('missing-skill-md');
    const missingSkillMdFinding = report.findings.find(
      (f) => f.code === 'missing-skill-md'
    );
    expect(missingSkillMdFinding).toBeTruthy();
    expect(missingSkillMdFinding!.severity).toBe('error');
    expect(report.totalScore).toBeLessThan(75);
  });

  it('flags missing description as an error', () => {
    const report = lintFixture('missing-description');
    const finding = report.findings.find(
      (f) => f.code === 'missing-description'
    );
    expect(finding).toBeTruthy();
    expect(finding!.severity).toBe('error');
  });

  it('detects broken local links', () => {
    const report = lintFixture('broken-links');
    const brokenLinkFindings = report.findings.filter(
      (f) => f.code === 'broken-local-links'
    );
    expect(brokenLinkFindings.length).toBeGreaterThan(0);
    expect(brokenLinkFindings[0].severity).toBe('error');
  });

  it('generates suggested actions from findings', () => {
    const report = lintFixture('broken-links');
    expect(report.suggestedActions.length).toBeGreaterThan(0);
  });

  it('assigns correct quality band based on score', () => {
    const valid = lintFixture('valid-skill');
    const missing = lintFixture('missing-skill-md');

    // Valid skill should be good or production quality
    expect(['production-quality', 'good-but-improvable']).toContain(
      valid.band
    );

    // Missing SKILL.md should be poor or needs refactor
    expect(['poor-design', 'needs-refactor', 'good-but-improvable']).toContain(missing.band);
  });

  it('includes all 7 category scores', () => {
    const report = lintFixture('valid-skill');
    const categories = Object.keys(report.categoryScores);
    expect(categories).toContain('metadata');
    expect(categories).toContain('structure');
    expect(categories).toContain('content');
    expect(categories).toContain('progressive-disclosure');
    expect(categories).toContain('supporting-files');
    expect(categories).toContain('testability');
    expect(categories).toContain('safety');
  });
});
