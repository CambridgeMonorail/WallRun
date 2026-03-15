import { describe, expect, it } from 'vitest';
import { parseFrontmatter, parseMarkdown } from '../parsers.js';

describe('parseFrontmatter', () => {
  it('extracts name and description from YAML frontmatter', () => {
    const raw = `---
name: test-skill
description: A test skill description.
---

# Content`;
    const result = parseFrontmatter(raw);
    expect(result.frontmatter.name).toBe('test-skill');
    expect(result.frontmatter.description).toBe('A test skill description.');
    expect(result.content).toContain('# Content');
  });

  it('returns empty frontmatter for files without YAML', () => {
    const raw = '# Just markdown\n\nNo frontmatter here.';
    const result = parseFrontmatter(raw);
    expect(result.frontmatter.name).toBeUndefined();
    expect(result.content).toContain('# Just markdown');
  });

  it('extracts metadata fields', () => {
    const raw = `---
name: my-skill
license: MIT
metadata:
  author: Test
  version: "1.0"
  internal: true
---

# Skill`;
    const result = parseFrontmatter(raw);
    expect(result.frontmatter.license).toBe('MIT');
    expect(result.frontmatter.metadata).toEqual({
      author: 'Test',
      version: '1.0',
      internal: true,
    });
  });
});

describe('parseMarkdown', () => {
  it('counts lines correctly', () => {
    const content = 'Line 1\nLine 2\nLine 3';
    const result = parseMarkdown(content);
    expect(result.lineCount).toBe(3);
  });

  it('extracts headings with correct depth and line numbers', () => {
    const content = `# H1

## H2

### H3 heading

Regular text`;
    const result = parseMarkdown(content);
    expect(result.headings).toEqual([
      { depth: 1, text: 'H1', line: 1 },
      { depth: 2, text: 'H2', line: 3 },
      { depth: 3, text: 'H3 heading', line: 5 },
    ]);
  });

  it('ignores headings inside code blocks', () => {
    const content = `# Real heading

\`\`\`markdown
# Not a heading
## Also not
\`\`\`

## Real heading 2`;
    const result = parseMarkdown(content);
    expect(result.headings).toHaveLength(2);
    expect(result.headings[0].text).toBe('Real heading');
    expect(result.headings[1].text).toBe('Real heading 2');
  });

  it('extracts local and remote links', () => {
    const content = `[Local](references/doc.md)
[Remote](https://example.com)
[Anchor](#section)
[Also local](./scripts/run.sh)`;
    const result = parseMarkdown(content);
    expect(result.links).toHaveLength(4);
    expect(result.links[0]).toMatchObject({
      text: 'Local',
      url: 'references/doc.md',
      isLocalFile: true,
    });
    expect(result.links[1]).toMatchObject({
      url: 'https://example.com',
      isLocalFile: false,
    });
    expect(result.links[2]).toMatchObject({
      url: '#section',
      isLocalFile: false,
    });
    expect(result.links[3]).toMatchObject({
      url: './scripts/run.sh',
      isLocalFile: true,
    });
  });

  it('counts code blocks and their lines', () => {
    const content = `Some text

\`\`\`ts
const x = 1;
const y = 2;
\`\`\`

More text

\`\`\`
another block
\`\`\``;
    const result = parseMarkdown(content);
    expect(result.codeBlockCount).toBe(2);
    expect(result.codeBlockLines).toBeGreaterThan(0);
  });

  it('counts numbered and bullet lists', () => {
    const content = `1. First
2. Second
3. Third

- Bullet one
- Bullet two
* Star bullet`;
    const result = parseMarkdown(content);
    expect(result.numberedListCount).toBe(3);
    expect(result.bulletListCount).toBe(3);
  });

  it('builds sections from headings', () => {
    const content = `Preamble text

# Section 1

Content for section 1

## Section 2

Content for section 2`;
    const result = parseMarkdown(content);
    expect(result.sections).toHaveLength(3);
    expect(result.sections[0].heading).toBeNull();
    expect(result.sections[1].heading).toBe('Section 1');
    expect(result.sections[2].heading).toBe('Section 2');
  });
});
