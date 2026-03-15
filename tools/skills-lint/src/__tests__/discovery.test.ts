import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { discoverSkills, loadSkill } from '../discovery.js';

const fixturesRoot = resolve(import.meta.dirname, '..', '__fixtures__');

describe('discoverSkills', () => {
  it('discovers all fixture skill directories', () => {
    const skills = discoverSkills(fixturesRoot);
    const names = skills.map((s) => s.name);
    expect(names).toContain('valid-skill');
    expect(names).toContain('missing-skill-md');
    expect(names).toContain('missing-description');
    expect(names).toContain('broken-links');
  });

  it('detects presence of SKILL.md', () => {
    const skills = discoverSkills(fixturesRoot);
    const valid = skills.find((s) => s.name === 'valid-skill');
    const missing = skills.find((s) => s.name === 'missing-skill-md');

    expect(valid?.skillMdPath).toBeTruthy();
    expect(missing?.skillMdPath).toBeNull();
  });

  it('classifies supporting files by kind', () => {
    const skills = discoverSkills(fixturesRoot);
    const valid = skills.find((s) => s.name === 'valid-skill');

    const refs = valid?.supportingFiles.filter((f) => f.kind === 'reference');
    expect(refs?.length).toBeGreaterThan(0);
  });
});

describe('loadSkill', () => {
  it('parses frontmatter and markdown for a valid skill', () => {
    const skills = discoverSkills(fixturesRoot);
    const dir = skills.find((s) => s.name === 'valid-skill')!;
    const skill = loadSkill(dir);

    expect(skill.frontmatter?.name).toBe('valid-skill');
    expect(skill.frontmatter?.description).toBeTruthy();
    expect(skill.markdown).toBeTruthy();
    expect(skill.markdown!.lineCount).toBeGreaterThan(0);
  });

  it('returns null fields when SKILL.md is missing', () => {
    const skills = discoverSkills(fixturesRoot);
    const dir = skills.find((s) => s.name === 'missing-skill-md')!;
    const skill = loadSkill(dir);

    expect(skill.frontmatter).toBeNull();
    expect(skill.rawContent).toBeNull();
    expect(skill.markdown).toBeNull();
  });
});
