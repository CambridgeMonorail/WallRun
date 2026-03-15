import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join, relative, resolve } from 'node:path';
import { parseFrontmatter, parseMarkdown } from './parsers.js';
import type { ParsedSkill, SkillDirectory, SupportingFile } from './types.js';

export function discoverSkills(skillsRoot: string): SkillDirectory[] {
  const absRoot = resolve(skillsRoot);
  const entries = readdirSync(absRoot, { withFileTypes: true });
  const skills: SkillDirectory[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const dirPath = join(absRoot, entry.name);
    const files = listFilesRecursively(dirPath);
    const skillMdPath =
      files.find((f) => basename(f) === 'SKILL.md') ?? null;

    skills.push({
      name: entry.name,
      absolutePath: dirPath,
      relativePath: relative(process.cwd(), dirPath),
      skillMdPath,
      supportingFiles: classifyFiles(
        files.filter((f) => basename(f) !== 'SKILL.md'),
        dirPath
      ),
    });
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

export function loadSkill(directory: SkillDirectory): ParsedSkill {
  if (!directory.skillMdPath) {
    return {
      directory,
      frontmatter: null,
      rawContent: null,
      markdown: null,
    };
  }

  const raw = readFileSync(directory.skillMdPath, 'utf8');
  const { frontmatter, content } = parseFrontmatter(raw);

  return {
    directory,
    frontmatter,
    rawContent: content,
    markdown: parseMarkdown(content),
  };
}

function listFilesRecursively(dir: string): string[] {
  const results: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results.sort();
}

function classifyFiles(
  absolutePaths: string[],
  skillDir: string
): SupportingFile[] {
  return absolutePaths.map((absPath) => {
    const rel = relative(skillDir, absPath);
    return {
      absolutePath: absPath,
      relativePath: rel,
      kind: classifyFileKind(rel),
      extension: extname(absPath),
    };
  });
}

function classifyFileKind(
  relativePath: string
): SupportingFile['kind'] {
  const normalized = relativePath.replace(/\\/g, '/');
  if (normalized.startsWith('references/')) return 'reference';
  if (normalized.startsWith('scripts/')) return 'script';
  if (normalized.startsWith('assets/')) return 'asset';
  if (normalized.startsWith('workflows/')) return 'reference';
  return 'other';
}
