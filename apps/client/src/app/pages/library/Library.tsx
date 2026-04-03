import { Button } from '@tsa/shadcnui';
import imageSrc from '../../../assets/images/shad-samples.svg';

const EXTERNAL_LINKS = {
  github: 'https://github.com/CambridgeMonorail/WallRun',
  storybook:
    'https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/introduction--documentation',
  shadcn: 'https://ui.shadcn.com',
  readme:
    'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
  roadmap:
    'https://github.com/CambridgeMonorail/WallRun/blob/main/ROADMAP.md',
} as const;

/**
 * LibraryPage component
 */
export function LibraryPage() {
  return (
    <div className="doc-shell font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">Documentation</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Component Libraries
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          React components for digital signage and web interfaces. Built with{' '}
          <a
            href={EXTERNAL_LINKS.shadcn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            shadcn/ui
          </a>
          , React 19, and Tailwind v4. See{' '}
          <button
            onClick={() => (window.location.href = '/getting-started')}
            className="text-foreground hover:underline"
          >
            Getting Started
          </button>{' '}
          for installation.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col justify-center">
          <h2 className="display-type mb-4 text-2xl text-foreground">
            Component Inventory
          </h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground mb-2">
              @tsa/shadcnui
            </h3>
            <p className="mb-2 leading-relaxed text-muted-foreground">
              Our copy of shadcn/ui components, organized by category. Standard
              web UI primitives — buttons, cards, inputs, navigation, data
              display. Used as building blocks across the monorepo.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground mb-2">
              @tsa/shadcnui-signage{' '}
              <span role="img" aria-label="star">
                ⭐
              </span>
            </h3>
            <p className="mb-2 leading-relaxed text-muted-foreground">
              Signage-oriented components built for distance readability,
              fixed-aspect layouts, and 24/7 operation on BrightSign devices.
              Includes primitives (ScreenFrame, MetricCard, EventCard), layouts
              (SignageContainer, SplitScreen), and behaviour components (Clock,
              Countdown, ContentRotator).
            </p>
          </div>
          <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
            <li>Distance-readable typography (10-foot rule)</li>
            <li>Fixed-aspect primitives, layouts, and blocks</li>
            <li>Deterministic rendering for known resolutions</li>
            <li>Designed for always-on, unattended displays</li>
          </ul>
          <Button asChild variant={'secondary'}>
            <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>

        {/* SCREENSHOT / IMAGE SECTION */}
        <div className="flex justify-center items-center">
          <div className="demo-panel relative flex h-[200px] w-[350px] items-center justify-center overflow-hidden p-4">
            <img src={imageSrc} alt="Component library preview" />
            <span className="absolute inset-0 flex items-center justify-center bg-background/78 text-sm uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
              Component Preview
            </span>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="display-type mb-4 text-2xl text-foreground">
          shadcn Registry Support: What It Means
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            WallRun signage components support the{' '}
            <strong className="text-foreground">
              shadcn registry protocol
            </strong>{' '}
            — a distribution format for components that experienced frontend
            developers already know.
          </p>
          <p>
            <strong className="text-foreground">
              This is not an app store.
            </strong>{' '}
            Components are <em>copied</em> into your codebase, not installed as
            a versioned dependency. You own the code. You can modify it. No
            lock-in.
          </p>
          <div className="code-panel p-4 font-mono text-sm text-foreground">
            <pre>
              {`# Install a single signage component
npx shadcn@latest add \\
  https://cambridgemonorail.github.io/WallRun/registry/registry.json \\
  clock

# Install multiple components
npx shadcn@latest add \\
  https://cambridgemonorail.github.io/WallRun/registry/registry.json \\
  metric-card event-card schedule-gate`}
            </pre>
          </div>
          <p>
            <strong className="text-foreground">Why this matters:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong className="text-foreground">
                Native developer workflow
              </strong>{' '}
              - Install components the same way you install shadcn primitives.
              No copy-paste guesswork.
            </li>
            <li>
              <strong className="text-foreground">
                Machine-readable structure
              </strong>{' '}
              - AI coding tools (VS Code agents, GitHub Copilot) can install
              components correctly, including all dependencies.
            </li>
            <li>
              <strong className="text-foreground">You stay in control</strong> -
              Updates are opt-in. No breaking changes to your build. Fast
              iteration without semver forever.
            </li>
            <li>
              <strong className="text-foreground">
                Built for modification
              </strong>{' '}
              - These are building blocks, not black boxes. Install, adapt, own.
            </li>
          </ul>
          <p className="text-sm italic">
            Registry support means WallRun components feel like software, not a
            demo site with copy buttons.
          </p>
        </div>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="display-type mb-4 text-2xl text-foreground">
          Interactive Documentation
        </h2>
        <p className="mb-4 text-muted-foreground">
          Browse Storybook for live component previews, props documentation, and
          usage examples. All components include interactive controls and
          real-world scenarios.
        </p>
        <Button asChild variant={'secondary'}>
          <a href={EXTERNAL_LINKS.storybook} target="_blank" rel="noopener noreferrer">
            Open Storybook
          </a>
        </Button>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="display-type mb-4 text-2xl text-foreground">
          Additional Resources
        </h2>
        <p className="mb-4 text-muted-foreground">
          Deep dive into component architecture, deployment patterns, and
          real-world examples:
        </p>
        <ul className="list-none space-y-2">
          <li>
            <Button asChild variant={'ghost'}>
              <a href={EXTERNAL_LINKS.readme} target="_blank" rel="noopener noreferrer">
                Component Library README
              </a>
            </Button>
          </li>
          <li>
            <Button asChild variant={'ghost'}>
              <a href={EXTERNAL_LINKS.roadmap} target="_blank" rel="noopener noreferrer">
                Project Roadmap
              </a>
            </Button>
          </li>
          <li>
            <Button asChild variant={'ghost'}>
              <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </Button>
          </li>
          <li>
            <Button asChild variant={'ghost'}>
              <a href={EXTERNAL_LINKS.shadcn} target="_blank" rel="noopener noreferrer">
                shadcn/ui Official Site
              </a>
            </Button>
          </li>
        </ul>
      </section>

      <section className="demo-panel-soft text-center px-6 py-8">
        <h3 className="display-type mb-2 text-xl text-foreground">
          Explore Components in Detail
        </h3>
        <p className="mb-4 text-muted-foreground">
          Storybook provides interactive previews, props documentation, and
          real-world usage examples for all components.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild variant={'secondary'}>
            <a href={EXTERNAL_LINKS.storybook} target="_blank" rel="noopener noreferrer">
              Open Storybook
            </a>
          </Button>
          <Button asChild variant={'secondary'}>
            <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer">
              View Source Code
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
