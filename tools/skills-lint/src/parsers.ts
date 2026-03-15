import matter from 'gray-matter';
import type {
  MarkdownHeading,
  MarkdownLink,
  MarkdownSection,
  ParsedMarkdown,
  SkillFrontmatter,
} from './types.js';

export function parseFrontmatter(raw: string): {
  frontmatter: SkillFrontmatter;
  content: string;
} {
  const parsed = matter(raw);
  return {
    frontmatter: parsed.data as SkillFrontmatter,
    content: parsed.content,
  };
}

export function parseMarkdown(content: string): ParsedMarkdown {
  const lines = content.split('\n');
  const headings = extractHeadings(lines);
  const links = extractLinks(lines);
  const { count: codeBlockCount, lines: codeBlockLines } =
    countCodeBlocks(lines);
  const numberedListCount = countNumberedLists(lines);
  const bulletListCount = countBulletLists(lines);
  const sections = buildSections(lines, headings);
  const plainText = stripMarkdown(content);

  return {
    lineCount: lines.length,
    headings,
    links,
    codeBlockCount,
    codeBlockLines,
    numberedListCount,
    bulletListCount,
    sections,
    plainText,
  };
}

function extractHeadings(lines: string[]): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,6})\s+(.+)/);
    if (match) {
      headings.push({
        depth: match[1].length,
        text: match[2].trim(),
        line: i + 1,
      });
    }
  }

  return headings;
}

function extractLinks(lines: string[]): MarkdownLink[] {
  const links: MarkdownLink[] = [];
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    let match: RegExpExecArray | null;
    while ((match = linkPattern.exec(line)) !== null) {
      const url = match[2];
      const isLocalFile =
        !url.startsWith('http://') &&
        !url.startsWith('https://') &&
        !url.startsWith('#') &&
        !url.startsWith('mailto:');
      links.push({
        text: match[1],
        url,
        line: i + 1,
        isLocalFile,
      });
    }
  }

  return links;
}

function countCodeBlocks(lines: string[]): { count: number; lines: number } {
  let count = 0;
  let totalLines = 0;
  let inBlock = false;
  let blockStart = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith('```')) {
      if (!inBlock) {
        inBlock = true;
        blockStart = i;
        count++;
      } else {
        inBlock = false;
        totalLines += i - blockStart + 1;
      }
    }
  }

  return { count, lines: totalLines };
}

function countNumberedLists(lines: string[]): number {
  let count = 0;
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    if (/^\s*\d+\.\s/.test(line)) count++;
  }

  return count;
}

function countBulletLists(lines: string[]): number {
  let count = 0;
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    if (/^\s*[-*+]\s/.test(line)) count++;
  }

  return count;
}

function buildSections(
  lines: string[],
  headings: MarkdownHeading[]
): MarkdownSection[] {
  if (headings.length === 0) {
    return [
      {
        heading: null,
        startLine: 1,
        endLine: lines.length,
        lineCount: lines.length,
        text: lines.join('\n'),
      },
    ];
  }

  const sections: MarkdownSection[] = [];

  // Content before first heading
  if (headings[0].line > 1) {
    const endLine = headings[0].line - 1;
    sections.push({
      heading: null,
      startLine: 1,
      endLine,
      lineCount: endLine,
      text: lines.slice(0, endLine).join('\n'),
    });
  }

  for (let i = 0; i < headings.length; i++) {
    const startLine = headings[i].line;
    const endLine =
      i + 1 < headings.length ? headings[i + 1].line - 1 : lines.length;
    sections.push({
      heading: headings[i].text,
      startLine,
      endLine,
      lineCount: endLine - startLine + 1,
      text: lines.slice(startLine - 1, endLine).join('\n'),
    });
  }

  return sections;
}

function stripMarkdown(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/`[^`]+`/g, '') // inline code
    .replace(/#{1,6}\s+/g, '') // headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/[*_~]{1,3}/g, '') // emphasis
    .replace(/^\s*[-*+]\s/gm, '') // bullets
    .replace(/^\s*\d+\.\s/gm, '') // numbered lists
    .replace(/^\s*>\s/gm, '') // blockquotes
    .replace(/\|[^|\n]+/g, '') // tables
    .replace(/---+/g, '') // horizontal rules
    .trim();
}
