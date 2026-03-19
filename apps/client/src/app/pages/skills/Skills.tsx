import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@tsa/shadcnui';
import {
  Bot,
  BookOpen,
  GitFork,
  Monitor,
  Wrench,
  Package,
  Shield,
} from 'lucide-react';

type Skill = {
  name: string;
  description: string;
};

const tier1Skills: Skill[] = [
  {
    name: 'signage-layout-system',
    description:
      'Full-screen layouts for large displays, distance readability, and continuous operation.',
  },
  {
    name: 'signage-animation-system',
    description:
      'Motion design for always-on public displays — slow, legible, loop-safe.',
  },
  {
    name: 'signage-menu-board',
    description:
      'Food and service menu boards with signage-first hierarchy rules.',
  },
  {
    name: 'signage-distance-legibility',
    description:
      'Minimum text sizes, contrast, density, and hierarchy for viewing at 3–10 metres.',
  },
  {
    name: 'signage-safe-layout',
    description:
      'Overscan, bezel compensation, rotation, and resolution-independent layout constraints.',
  },
  {
    name: 'signage-state-machine',
    description:
      'Boot, loading, content, fallback, and offline state patterns for 24/7 displays.',
  },
  {
    name: 'signage-data-refresh-patterns',
    description:
      'Polling, backoff, and non-blocking data updates that never disrupt the viewer.',
  },
  {
    name: 'signage-performance-budget',
    description:
      'Bundle size, image weight, font loading, and frame-rate budgets for embedded hardware.',
  },
  {
    name: 'signage-content-fallbacks',
    description:
      'Graceful degradation chains ensuring content always exists when APIs or feeds fail.',
  },
  {
    name: 'signage-placeholder-images',
    description:
      'Consistent placeholder image planning before final creative arrives.',
  },
  {
    name: 'chrome-devtools-webapp-debug',
    description:
      'Investigate broken pages and frontend regressions using Chrome DevTools.',
  },
  {
    name: 'instructions-detox',
    description:
      'Audit AI instruction files for bloat, overlap, and stale rules.',
  },
];

const tier2Skills: Skill[] = [
  {
    name: 'shadcnui-component-review',
    description:
      'End-to-end review of shadcn/ui components covering accessibility, tests, and Storybook.',
  },
];

const tier3Skills: Skill[] = [
  {
    name: 'brightsign-signage-build',
    description:
      'Bundles layout, runtime, packaging, and verification for BrightSign signage builds.',
  },
  {
    name: 'brightsign-runtime',
    description:
      'Adapt web apps to BrightSign hardware constraints and static deployment.',
  },
  {
    name: 'brightsign-package',
    description: 'Package React apps for BrightSign OS 9.x players.',
  },
  {
    name: 'brightsign-deploy-local',
    description: 'Deploy to local BrightSign players for fast iteration.',
  },
  {
    name: 'brightsign-fleet-deploy',
    description:
      'Publish versioned builds for fleet-wide BrightSign player rollout.',
  },
  {
    name: 'brightsign-debug',
    description:
      'Diagnose BrightSign player issues using device APIs and remote inspector.',
  },
  {
    name: 'player-discovery-scan',
    description: 'Scan a subnet for BrightSign players on the local network.',
  },
  {
    name: 'player-discovery-probe',
    description: 'Check a single IP address for BrightSign diagnostics.',
  },
  {
    name: 'player-discovery-export',
    description: 'Export discovery results as raw JSON for sharing.',
  },
];

const SkillRow: FC<{ skill: Skill }> = ({ skill }) => (
  <li className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:gap-3">
    <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
      {skill.name}
    </code>
    <span className="text-sm text-muted-foreground">{skill.description}</span>
  </li>
);

/**
 * SkillsPage — Documentation page explaining installable SKILL.md packages
 * and the skill catalog available from this repository.
 */
export const SkillsPage: FC = () => {
  return (
    <div className="doc-shell max-w-5xl font-sans">
      {/* Hero */}
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">Documentation</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Installable Skills
        </h1>

        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          This repository ships portable SKILL.md packages that give AI agents
          domain-specific guidance for digital signage design, BrightSign
          deployment, and engineering workflows. Install them into any project
          with a single command.
        </p>

        <ul className="mt-4 list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">What is a skill</strong> —
            structured Markdown that teaches agents domain tasks
          </li>
          <li>
            <strong className="text-foreground">Installation</strong> — two
            options: public skills or everything including BrightSign
          </li>
          <li>
            <strong className="text-foreground">Skill catalog</strong> — 12
            signage &amp; development, 1 component quality, 9 BrightSign
          </li>
          <li>
            <strong className="text-foreground">Skill structure</strong> —
            directory layout and file conventions
          </li>
          <li>
            <strong className="text-foreground">Clone the repo</strong> — get
            skills, components, deployment tools, and examples in one step
          </li>
        </ul>
      </div>

      {/* What is a skill */}
      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium text-foreground">
          <BookOpen className="h-6 w-6" />
          What Is A Skill?
        </h2>
        <p className="mb-3 max-w-3xl text-muted-foreground">
          A skill is a structured Markdown file that teaches an AI coding agent
          how to perform a specific task. Each skill defines what problem it
          solves, when to invoke it, what inputs it expects, and what output it
          should produce.
        </p>
        <p className="max-w-3xl text-muted-foreground">
          Skills follow the{' '}
          <a
            href="https://agentskills.io/specification"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            Agent Skills Specification
          </a>
          , making them portable across agent ecosystems. They are not code
          libraries — they are operational guidance that improves agent
          performance on domain-specific work.
        </p>
      </section>

      {/* Install */}
      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium text-foreground">
          <Package className="h-6 w-6" />
          How To Get Skills Into Your Project
        </h2>
        <p className="mb-4 max-w-3xl text-muted-foreground">
          There are two ways to use these skills. Which one you choose depends
          on whether you want to add signage guidance to an existing project or
          start fresh with the full toolkit.
        </p>

        <div className="mb-6">
          <h3 className="mb-2 text-lg font-medium text-foreground">
            Option 1: Install skills into your own project
          </h3>
          <p className="mb-3 max-w-3xl text-muted-foreground">
            If you already have a codebase and want your AI agent to understand
            signage design, debugging workflows, or engineering best practices,
            install the public skills directly. They are copied into your
            project as Markdown files — no runtime dependencies, no build
            changes.
          </p>
          <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
            <pre>{`npx skills add CambridgeMonorail/TheSignAge`}</pre>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            This installs the 13 public skills (signage design, distance
            legibility, safe layout, state management, data refresh, and more).
            Your agent picks them up automatically the next time it runs.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-lg font-medium text-foreground">
            Option 2: Include BrightSign and player tooling skills
          </h3>
          <p className="mb-3 max-w-3xl text-muted-foreground">
            The 9 internal skills cover BrightSign packaging, deployment, player
            discovery, and hardware debugging. They are hidden by default
            because they assume you are working with BrightSign hardware. If
            that describes your setup, opt in:
          </p>
          <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
            <pre>{`INSTALL_INTERNAL_SKILLS=1 npx skills add CambridgeMonorail/TheSignAge`}</pre>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            This gives you all 22 skills — signage design, development patterns,
            and BrightSign-specific tooling.
          </p>
        </div>

        <div className="rounded border border-border bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              What does the CLI actually do?
            </span>{' '}
            It reads each skill's SKILL.md frontmatter, downloads the skill
            directory into your project, and makes it available to your AI
            agent. No code is executed. You can inspect every file before your
            agent sees it.
          </p>
        </div>
      </section>

      {/* Tier 1 */}
      <section className="mb-12">
        <div className="demo-panel p-6 sm:p-8">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-medium text-foreground">
            <Monitor className="h-6 w-6" />
            Signage Design &amp; Development
          </h2>
          <p className="mb-1 text-sm text-muted-foreground">
            Fully reusable — domain knowledge for building signage with React,
            no dependency on this repository.
          </p>
          <ul className="divide-y divide-border">
            {tier1Skills.map((s) => (
              <SkillRow key={s.name} skill={s} />
            ))}
          </ul>
        </div>
      </section>

      {/* Tier 2 */}
      <section className="mb-12">
        <div className="demo-panel p-6 sm:p-8">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-medium text-foreground">
            <Wrench className="h-6 w-6" />
            Component Quality
          </h2>
          <p className="mb-1 text-sm text-muted-foreground">
            Portable with minor tooling assumptions — easily adapted to other
            component libraries.
          </p>
          <ul className="divide-y divide-border">
            {tier2Skills.map((s) => (
              <SkillRow key={s.name} skill={s} />
            ))}
          </ul>
        </div>
      </section>

      {/* Tier 3 */}
      <section className="mb-12">
        <div className="demo-panel p-6 sm:p-8">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-medium text-foreground">
            <Shield className="h-6 w-6" />
            BrightSign &amp; Player Tooling
          </h2>
          <p className="mb-1 text-sm text-muted-foreground">
            Repo-specific — requires{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              INSTALL_INTERNAL_SKILLS=1
            </code>{' '}
            to install.
          </p>
          <ul className="divide-y divide-border">
            {tier3Skills.map((s) => (
              <SkillRow key={s.name} skill={s} />
            ))}
          </ul>
        </div>
      </section>

      {/* Skill structure */}
      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium text-foreground">
          <Bot className="h-6 w-6" />
          Skill Structure
        </h2>
        <p className="mb-4 max-w-3xl text-muted-foreground">
          Each skill follows a consistent directory layout:
        </p>
        <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
          <pre>
            {`skills/<skill-name>/
  SKILL.md          # Skill contract (required, < 500 lines)
  references/       # Supporting documentation and detailed guides
  assets/           # Static resources and templates
  scripts/          # Executable helpers`}
          </pre>
        </div>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          The SKILL.md file is the entry point. It contains YAML frontmatter
          with the skill name, description, license, and metadata, followed by
          the skill contract in Markdown. Reference files provide progressive
          detail without bloating the main contract.
        </p>
      </section>

      {/* Clone for full experience */}
      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium text-foreground">
          <GitFork className="h-6 w-6" />
          Want Everything? Clone The Repo
        </h2>
        <p className="mb-3 max-w-3xl text-muted-foreground">
          Installing individual skills is the quickest way to get started, but
          if you want the full experience — every skill, the signage component
          libraries, the player app scaffolding, the BrightSign deployment
          tooling, and the ability to build your own signage apps — you can
          clone the entire repository and work inside it.
        </p>
        <p className="mb-4 max-w-3xl text-muted-foreground">
          This is especially useful if you are new to signage development.
          Cloning gives you a working project with real examples you can run
          immediately. When the repository is updated with new skills,
          components, or tooling improvements, you pull those changes into your
          copy just like any other Git update.
        </p>
        <div className="code-panel mb-4 overflow-x-auto p-4 font-mono text-sm text-foreground">
          <pre>
            {`# 1. Clone the repository
git clone https://github.com/CambridgeMonorail/TheSignAge.git
cd TheSignAge

# 2. Install dependencies
pnpm install

# 3. Start the demo site to explore examples
pnpm serve:client

# 4. When upstream improvements are available, pull them in
git pull origin main`}
          </pre>
        </div>
        <p className="mb-3 max-w-3xl text-muted-foreground">
          Once cloned, you have access to everything:
        </p>
        <ul className="mb-4 list-inside list-disc space-y-1 text-muted-foreground">
          <li>
            All 22 skills, including the internal BrightSign and player
            discovery ones
          </li>
          <li>Signage component libraries with ready-made UI primitives</li>
          <li>
            A scaffold command to generate new player apps from a template
          </li>
          <li>One-command packaging and deployment to BrightSign hardware</li>
          <li>A custom Copilot agent tuned for signage development</li>
          <li>Working signage examples you can modify and deploy</li>
        </ul>
        <p className="max-w-3xl text-sm text-muted-foreground">
          No special configuration needed. Clone, install, and you are ready to
          build signage apps with AI assistance from day one.
        </p>
      </section>

      {/* Footer CTA */}
      <section className="demo-panel-soft px-6 py-8 text-center">
        <h3 className="display-type mb-2 text-xl text-foreground">
          Browse The Source
        </h3>
        <p className="mx-auto mb-4 max-w-2xl text-muted-foreground">
          All skills live in the repository's skills directory and are mirrored
          to .github/skills for GitHub Copilot.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="secondary" asChild>
            <a
              href="https://github.com/CambridgeMonorail/TheSignAge/tree/main/skills"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Skills Directory
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a
              href="https://agentskills.io/specification"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agent Skills Specification
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/tooling">Back to Tooling</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
