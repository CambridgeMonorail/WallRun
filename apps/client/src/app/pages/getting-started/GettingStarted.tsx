import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@tsa/shadcnui';
import { BookOpen, Code, Layers, Terminal } from 'lucide-react';

/**
 * GettingStartedPage - Practical guide for developers to start using WallRun
 */
export const GettingStartedPage: FC = () => {
  const handleStorybookClick = () => {
    window.open(
      'https://cambridgemonorail.github.io/WallRun/storybook/',
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleGitHubClick = () => {
    window.open(
      'https://github.com/CambridgeMonorail/WallRun',
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="doc-shell max-w-5xl font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">Documentation</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Getting Started
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Build signage screens as real software. Deterministic,
          offline-capable, and designed for displays that live on walls. Start
          with components, then graduate to full player apps and device
          workflows. This is an independent developer experiment and is not
          affiliated with or endorsed by BrightSign.
        </p>
      </div>

      <section className="demo-panel-soft mb-12 px-8 py-8 sm:px-10">
        <h2 className="text-2xl font-medium text-foreground mb-4">
          About The Project
        </h2>
        <div className="space-y-4 text-muted-foreground max-w-3xl">
          <p className="text-lg">
            Digital signage is software that lives on walls. WallRun treats it
            that way.
          </p>
          <p>
            Most signage tooling assumes you want a CMS, a slide deck, or a
            drag-and-drop editor. WallRun starts from a different premise:
            signage screens are just frontend applications with unusual
            constraints — fixed resolution, no user input, 24/7 runtime, viewed
            from distance.
          </p>
          <p>
            This project explores what happens when you build signage with
            normal modern tools: React components, Tailwind layouts, TypeScript,
            Vite, and a monorepo workflow. The result is code-driven, testable,
            version-controlled signage — built like any other frontend software.
          </p>
        </div>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <div className="space-y-4 text-muted-foreground">
          <p>WallRun is an independent, experimental developer project.</p>
          <p className="font-medium text-foreground">
            It is{' '}
            <strong>
              not an official BrightSign product or BrightSign supported project
            </strong>
            .
          </p>
          <p>
            The examples in this repository use BrightSign players because, in
            my experience, they are among the most robust and reliable digital
            signage players available. They are widely deployed in real-world
            environments such as retail, hospitals, transport hubs and corporate
            spaces, which makes them a practical platform for exploring signage
            software development.
          </p>
          <p>
            This project simply explores the idea that digital signage could be
            built using normal modern frontend tooling. React components, layout
            systems and code driven workflows instead of slide decks and CMS
            templates.
          </p>
          <p>
            If you are looking for official BrightSign information,
            documentation or supported tools, please visit:{' '}
            <a
              href="https://www.brightsign.biz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              https://www.brightsign.biz/
            </a>
          </p>
        </div>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="text-2xl font-medium text-foreground mb-4 flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          What You'll Need
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Node.js 18+ and pnpm (or npm/yarn)</li>
          <li>React 18+ project (React 19 recommended)</li>
          <li>Tailwind CSS v4 configured in your project</li>
          <li>Basic familiarity with React components</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-foreground mb-4 flex items-center gap-2">
          <Code className="w-6 h-6" />
          Choose Your Starting Point
        </h2>
        <p className="text-muted-foreground mb-4 max-w-3xl">
          How you use WallRun depends on what you are building and where you are
          in the process. Pick the option that matches your situation.
        </p>

        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 text-sm max-w-3xl">
          <li>
            <strong className="text-foreground">Add components</strong> — pull
            individual signage UI components into an existing React app
          </li>
          <li>
            <strong className="text-foreground">Copy from GitHub</strong> —
            browse the source and grab what you need, no CLI required
          </li>
          <li>
            <strong className="text-foreground">Clone the repo</strong> — get
            the full toolkit: libraries, skills, examples, and deployment tools
          </li>
          <li>
            <strong className="text-foreground">Scaffold a player app</strong> —
            generate a BrightSign-ready signage app from a built-in template
          </li>
        </ul>

        <div className="space-y-6">
          <div className="demo-panel p-6">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Add signage components to an existing React project
            </h3>
            <p className="text-muted-foreground mb-3 max-w-3xl">
              You already have a React app and want to pull in specific signage
              UI components — things like metric cards, screen frames, schedule
              gates, or auto-paging lists. Components are copied directly into
              your project with all dependencies resolved. No build changes
              needed.
            </p>
            <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
              <pre>
                {`# Add individual components from WallRun registry
npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json auto-paging-list

# Add several at once
npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json metric-card event-card schedule-gate`}
              </pre>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              This uses the{' '}
              <a
                href="https://ui.shadcn.com/docs/installation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                shadcn/ui CLI
              </a>
              . You own the code once it's in your project — update it however
              you like.
            </p>
          </div>

          <div className="demo-panel p-6">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Copy a component directly from GitHub
            </h3>
            <p className="text-muted-foreground mb-3 max-w-3xl">
              If you prefer not to run a CLI, or you want to inspect the code
              first, browse the source and copy what you need. Every component
              is self-contained.
            </p>
            <p className="text-muted-foreground text-sm">
              Browse{' '}
              <a
                href="https://github.com/CambridgeMonorail/WallRun/tree/main/libs/shadcnui-signage/src/lib"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                libs/shadcnui-signage
              </a>{' '}
              on GitHub and take what you need. Good for evaluating a single
              component before committing to the registry approach.
            </p>
          </div>

          <div className="demo-panel p-6">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Clone the entire repository
            </h3>
            <p className="text-muted-foreground mb-3 max-w-3xl">
              If you want the full toolkit — component libraries, AI skills,
              player app scaffolding, BrightSign deployment commands, and
              working signage examples — clone the repo and work inside it. This
              is the best option if you are starting from scratch or want to
              build multiple signage apps. You get every upstream improvement
              just by pulling.
            </p>
            <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
              <pre>
                {`git clone https://github.com/CambridgeMonorail/WallRun.git
cd WallRun
pnpm install

# Run the demo site to explore examples
pnpm serve:client

# Stay current with upstream improvements
git pull origin main`}
              </pre>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Once cloned, you can generate new player apps, deploy to
              BrightSign hardware, use the AI signage architect agent, and
              access all 20 installable skills.
            </p>
          </div>

          <div className="demo-panel p-6">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Scaffold a BrightSign player app
            </h3>
            <p className="text-muted-foreground mb-3 max-w-3xl">
              If you have already cloned the repo and want to build a signage
              app that runs on BrightSign hardware, generate a new player app
              from the built-in template. The generated app has the right
              packaging shape, autorun bootstrap, and deployment config out of
              the box.
            </p>
            <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
              <pre>
                {`# Generate a new player app
pnpm nx g sign-age:player-app --name player-arrivals

# Or with specific options
pnpm nx g sign-age:player-app --name player-menu-board --displayOrientation landscape --noStatusPage`}
              </pre>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              This requires the cloned repository. See{' '}
              <Link to="/tooling" className="text-foreground hover:underline">
                Tooling &amp; Deployment
              </Link>{' '}
              for the full packaging and deployment workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="text-2xl font-medium text-foreground mb-4 flex items-center gap-2">
          <Code className="w-6 h-6" />
          AI-Assisted Development
        </h2>
        <p className="text-muted-foreground mb-4">
          WallRun includes a custom GitHub Copilot agent optimized for building
          signage content. The{' '}
          <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
            signage-architect
          </code>{' '}
          agent understands signage-specific constraints and can generate
          production-ready components.
        </p>
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-foreground mb-2">What It Does</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>
                Builds signage components following the 10-foot legibility rule
              </li>
              <li>
                Enforces premium design standards (focal points, hierarchy,
                restraint)
              </li>
              <li>
                Generates layouts for menus, dashboards, wayfinding, and
                timetables
              </li>
              <li>
                Ensures 24/7 reliability (no memory leaks, handles
                offline/errors)
              </li>
              <li>
                Applies signage-specific heuristics (brevity, safe zones,
                viewing distance)
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">How to Use It</h3>
            <p className="text-sm text-muted-foreground mb-2">
              In VS Code with GitHub Copilot Chat, invoke the agent:
            </p>
            <div className="code-panel p-3 font-mono text-xs text-foreground">
              <pre>
                {`@signage-architect build a restaurant menu board
showing 3 categories with 4 items each, 1080p landscape`}
              </pre>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              The agent follows a clarification-first workflow and enforces
              design quality before generating code. See{' '}
              <button
                onClick={handleGitHubClick}
                className="text-foreground hover:underline"
              >
                .github/agents/signage-architect.agent.md
              </button>{' '}
              for full documentation.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="text-2xl font-medium text-foreground mb-4 flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          From Browser Demo To BrightSign Player
        </h2>
        <p className="text-muted-foreground mb-4 max-w-3xl">
          The demo site is only one layer of the repo. When you want to run a
          real player app on hardware, move into the deployment workflow:
          discover a player, register it locally, then deploy a specific app.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">
            Why BrightSign Players?
          </h3>
          <p className="text-muted-foreground mb-2 max-w-3xl">
            WallRun examples currently target BrightSign players because they
            are widely regarded as extremely stable signage hardware designed
            for 24/7 operation.
          </p>
          <p className="text-muted-foreground max-w-3xl">
            However, the ideas explored in this project are not tied to
            BrightSign specifically. The goal is to explore what digital signage
            development might look like if it behaved more like normal frontend
            software development.
          </p>
        </div>
        <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
          <pre>
            {`# Optional: find BrightSign players on your LAN
pnpm discover

# Configure a local player registry
pnpm setup:dev

# Deploy the default player app
pnpm deploy:player

# Deploy a named app to a named player
pnpm deploy:player -- --app player-arrivals --player lobby-display`}
          </pre>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link to="/tooling">Open Tooling & Deployment</Link>
          </Button>
          <Button onClick={handleGitHubClick} variant="ghost">
            Open GitHub Repository
          </Button>
        </div>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="text-2xl font-medium text-foreground mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6" />
          Quick Start: Build Your First Signage Screen
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Step 1: Import Signage Components
            </h3>
            <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
              <pre>
                {`import {
  SignageContainer,
  SignageHeader,
  MetricCard
} from '@tsa/shadcnui-signage';`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Step 2: Create a Dashboard Screen
            </h3>
            <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
              <pre>
                {`export const MyDashboard = () => {
  return (
    <SignageContainer variant="emerald" showGrid={false}>
      <SignageHeader
        tag="Dashboard"
        tagVariant="emerald"
        title="Performance Metrics"
        subtitle="Real-time business analytics"
      />
      
      <div className="grid grid-cols-2 gap-8 mt-12">
        <MetricCard
          title="Revenue"
          value="$45,231"
          change="+12.5% vs yesterday"
          isPositive={true}
        />
        <MetricCard
          title="Active Users"
          value="1,847"
          change="+15.7% vs yesterday"
          isPositive={true}
        />
      </div>
    </SignageContainer>
  );
};`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Step 3: View Full-Screen
            </h3>
            <p className="text-muted-foreground">
              Signage screens are designed for full-screen display. Use a
              container with fixed aspect ratio (typically 16:9 or 9:16) and
              view at full-screen for the intended experience.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-foreground mb-4">
          Key Signage Concepts
        </h2>
        <div className="space-y-4">
          <div className="section-shell p-4">
            <h3 className="font-medium text-foreground mb-2">
              Fixed-Aspect Layouts
            </h3>
            <p className="text-sm text-muted-foreground">
              Signage screens run at known resolutions (1920×1080, 1080×1920).
              No responsive breakpoints—design for the exact screen size.
            </p>
          </div>
          <div className="section-shell p-4">
            <h3 className="font-medium text-foreground mb-2">
              Distance-Readable Typography
            </h3>
            <p className="text-sm text-muted-foreground">
              The 10-foot rule: Can it be read from 10 feet away? Use large text
              (24px minimum), high contrast, clear hierarchy.
            </p>
          </div>
          <div className="section-shell p-4">
            <h3 className="font-medium text-foreground mb-2">
              Deterministic Rendering
            </h3>
            <p className="text-sm text-muted-foreground">
              Signage runs 24/7 unattended. Avoid animations that accumulate
              state, ensure content updates predictably, handle offline
              gracefully.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="text-2xl font-medium text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Next Steps
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-foreground font-medium">1.</span>
            <p className="text-muted-foreground">
              Browse the{' '}
              <Link to="/library" className="text-foreground hover:underline">
                Component Library
              </Link>{' '}
              to explore available signage components
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-foreground font-medium">2.</span>
            <p className="text-muted-foreground">
              Open{' '}
              <Link to="/tooling" className="text-foreground hover:underline">
                Tooling &amp; Deployment
              </Link>{' '}
              to scaffold player apps and review BrightSign workflows
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-foreground font-medium">3.</span>
            <p className="text-muted-foreground">
              View the{' '}
              <Link to="/gallery" className="text-foreground hover:underline">
                Gallery
              </Link>{' '}
              to see full-screen signage examples
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-foreground font-medium">4.</span>
            <p className="text-muted-foreground">
              Review{' '}
              <button
                onClick={handleStorybookClick}
                className="text-foreground hover:underline"
              >
                Storybook
              </button>{' '}
              for detailed props and API documentation
            </p>
          </div>
        </div>
      </section>

      <section className="demo-panel-soft text-center px-6 py-8">
        <div className="space-x-4">
          <Button asChild variant="secondary">
            <Link to="/library">Browse Components</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/tooling">Tooling &amp; Deployment</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/gallery">View Gallery</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
