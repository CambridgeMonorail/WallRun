import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@tsa/shadcnui';
import { BookOpen, Code, Layers, Terminal } from 'lucide-react';

/**
 * GettingStartedPage - Practical guide for developers to start using The Sign Age
 */
export const GettingStartedPage: FC = () => {
  const navigate = useNavigate();

  const handleStorybookClick = () => {
    window.open(
      'https://cambridgemonorail.github.io/TheSignAge/storybook/',
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleGitHubClick = () => {
    window.open(
      'https://github.com/CambridgeMonorail/TheSignAge',
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
          offline-capable, and designed for displays that live on walls.
        </p>
      </div>

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
          Installation
        </h2>
        <p className="text-muted-foreground mb-4">
          The Sign Age components are part of the{' '}
          <a
            href="https://ui.shadcn.com/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            shadcn/ui ecosystem
          </a>
          . Install components using the shadcn CLI with our custom registry:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Option 1: Using shadcn CLI (Recommended)
            </h3>
            <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
              <pre>
                {`# Add a single component from The Sign Age registry
npx shadcn@latest add https://cambridgemonorail.github.io/TheSignAge/registry/registry.json auto-paging-list

# Add multiple components
npx shadcn@latest add https://cambridgemonorail.github.io/TheSignAge/registry/registry.json metric-card event-card schedule-gate`}
              </pre>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Components will be copied directly into your project with all
              dependencies resolved. Browse available components in the
              Components section.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Option 2: Clone and Reference Locally
            </h3>
            <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
              <pre>
                {`# Clone the repository
git clone https://github.com/CambridgeMonorail/TheSignAge.git
cd TheSignAge

# Install dependencies
pnpm install

# Build the libraries
pnpm build:shadcnui
pnpm build:shadcnui-signage`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Option 3: Copy Components Directly
            </h3>
            <p className="text-muted-foreground mb-2">
              Browse{' '}
              <button
                onClick={handleGitHubClick}
                className="text-foreground hover:underline"
              >
                libs/shadcnui-signage
              </button>{' '}
              on GitHub and copy the components you need into your project. All
              components are self-contained with minimal dependencies.
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
          The Sign Age includes a custom GitHub Copilot agent optimized for
          building signage content. The{' '}
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
              <button
                onClick={() => navigate('/library')}
                className="text-foreground hover:underline"
              >
                Component Library
              </button>{' '}
              to explore available signage components
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-foreground font-medium">2.</span>
            <p className="text-muted-foreground">
              View the{' '}
              <button
                onClick={() => navigate('/gallery')}
                className="text-foreground hover:underline"
              >
                Gallery
              </button>{' '}
              to see full-screen signage examples
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-foreground font-medium">3.</span>
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
          <Button onClick={() => navigate('/library')} variant="secondary">
            Browse Components
          </Button>
          <Button onClick={() => navigate('/gallery')} variant="secondary">
            View Gallery
          </Button>
        </div>
      </section>
    </div>
  );
};
