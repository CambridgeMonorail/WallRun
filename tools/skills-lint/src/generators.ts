import type { ParsedSkill } from './types.js';

export function generateTestPlan(skill: ParsedSkill): string {
  const skillName = skill.frontmatter?.name ?? skill.directory.name;
  const description = skill.frontmatter?.description ?? '';

  const domain = inferDomain(description, skillName);

  const lines: string[] = [
    `# TEST_PLAN: ${skillName}`,
    '',
    `> Auto-generated test plan. Review and customise before use.`,
    '',
    '## Basic Prompt',
    '',
    `Test a normal use case for this skill.`,
    '',
    '```',
    buildBasicPrompt(domain, skillName),
    '```',
    '',
    '## Edge Prompt',
    '',
    'Test with minimal or ambiguous input.',
    '',
    '```',
    buildEdgePrompt(domain, skillName),
    '```',
    '',
    '## Complex Prompt',
    '',
    'Test a realistic, complex scenario.',
    '',
    '```',
    buildComplexPrompt(domain, skillName),
    '```',
    '',
    '## Expected Behaviour',
    '',
    '- Skill should trigger for relevant phrasing',
    '- Output should follow the workflow defined in SKILL.md',
    '- Output structure should be predictable and consistent',
    '- Supporting files should be used only when relevant',
    description
      ? `- Output should align with: "${truncate(description, 100)}"`
      : '',
    '',
    '## Evaluation Criteria',
    '',
    '| Metric | Question |',
    '| --- | --- |',
    '| Skill activation | Did the agent pick this skill? |',
    '| Instruction compliance | Did it follow the workflow? |',
    '| Output consistency | Is the output predictable? |',
    '| Reference discovery | Did it use supporting files when needed? |',
    '',
  ];

  return lines.filter((l) => l !== undefined).join('\n');
}

interface DomainHint {
  topic: string;
  action: string;
  context: string;
}

function inferDomain(description: string, name: string): DomainHint {
  const text = `${description} ${name}`.toLowerCase();

  if (/signage|display|menu.?board|screen/i.test(text)) {
    return {
      topic: 'digital signage',
      action: 'create a signage layout',
      context: 'for a restaurant menu board on a 55" display',
    };
  }
  if (/debug|diagnos/i.test(text)) {
    return {
      topic: 'debugging',
      action: 'debug an issue',
      context: 'where a component renders blank on page refresh',
    };
  }
  if (/deploy|publish|release/i.test(text)) {
    return {
      topic: 'deployment',
      action: 'deploy an application',
      context: 'to a BrightSign player on the local network',
    };
  }
  if (/verif|review|audit|lint/i.test(text)) {
    return {
      topic: 'code review',
      action: 'verify a change set',
      context: 'before opening a pull request',
    };
  }
  if (/plan/i.test(text)) {
    return {
      topic: 'planning',
      action: 'create an implementation plan',
      context: 'for adding a new React component library',
    };
  }
  if (/animat|motion/i.test(text)) {
    return {
      topic: 'animation',
      action: 'design animations',
      context: 'for a continuously running dashboard display',
    };
  }
  if (/player|discover/i.test(text)) {
    return {
      topic: 'player discovery',
      action: 'find BrightSign players',
      context: 'on the local network',
    };
  }
  if (/component|shadcn|ui/i.test(text)) {
    return {
      topic: 'component review',
      action: 'review a UI component',
      context: 'for accessibility and export compliance',
    };
  }
  if (/instruction|detox/i.test(text)) {
    return {
      topic: 'instruction review',
      action: 'audit instruction files',
      context: 'for a monorepo with multiple .instructions.md files',
    };
  }
  if (/placeholder|image/i.test(text)) {
    return {
      topic: 'placeholder images',
      action: 'plan placeholder images',
      context: 'for a signage app before final artwork arrives',
    };
  }
  if (/package|build|bundle/i.test(text)) {
    return {
      topic: 'packaging',
      action: 'package an application',
      context: 'for deployment to a BrightSign player',
    };
  }
  if (/runtime|brightsign/i.test(text)) {
    return {
      topic: 'BrightSign runtime',
      action: 'build a web app',
      context: 'that runs on a BrightSign player',
    };
  }
  if (/chrome|devtools|browser/i.test(text)) {
    return {
      topic: 'browser debugging',
      action: 'investigate a web app issue',
      context: 'using Chrome DevTools',
    };
  }

  return {
    topic: name.replace(/-/g, ' '),
    action: `use the ${name} skill`,
    context: 'in a typical development workflow',
  };
}

function buildBasicPrompt(domain: DomainHint, skillName: string): string {
  return `${domain.action} ${domain.context}`;
}

function buildEdgePrompt(domain: DomainHint, skillName: string): string {
  return `${domain.action} with no additional context provided`;
}

function buildComplexPrompt(domain: DomainHint, skillName: string): string {
  return `${domain.action} ${domain.context} with multiple constraints, edge cases, and a tight deadline`;
}

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}
