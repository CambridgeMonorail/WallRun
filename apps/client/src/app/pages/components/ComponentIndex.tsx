import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@wallrun/shadcnui';
import { Activity, Box, Layout, Layers } from 'lucide-react';

interface ComponentInfo {
  name: string;
  path: string;
  description: string;
  category: 'Primitives' | 'Layouts' | 'Blocks' | 'Behaviour';
}

const components: ComponentInfo[] = [
  // Primitives
  {
    name: 'ScreenFrame',
    path: '/components/primitives/screen-frame',
    description: 'Base frame for signage content with fixed aspect ratios',
    category: 'Primitives',
  },
  {
    name: 'MetricCard',
    path: '/components/primitives/metric-card',
    description:
      'Display KPIs and metrics with value, change indicators, and icons',
    category: 'Primitives',
  },
  {
    name: 'EventCard',
    path: '/components/primitives/event-card',
    description: 'Event information cards with date, time, and location',
    category: 'Primitives',
  },
  {
    name: 'AnnouncementCard',
    path: '/components/primitives/announcement-card',
    description: 'Announcement cards for important messages and updates',
    category: 'Primitives',
  },
  // Layouts
  {
    name: 'SplitScreen',
    path: '/components/layouts/split-screen',
    description: 'Two-panel layouts with configurable split ratios',
    category: 'Layouts',
  },
  {
    name: 'SignageContainer',
    path: '/components/layouts/signage-container',
    description:
      'Full-screen container with ambient effects and gradient backgrounds',
    category: 'Layouts',
  },
  {
    name: 'SignageHeader',
    path: '/components/layouts/signage-header',
    description: 'Standard signage header with logo, title, and metadata',
    category: 'Layouts',
  },
  // Blocks
  {
    name: 'FullscreenHero',
    path: '/components/blocks/fullscreen-hero',
    description: 'Hero sections optimized for full-screen signage displays',
    category: 'Blocks',
  },
  {
    name: 'InfoCardGrid',
    path: '/components/blocks/info-card-grid',
    description: 'Grid layouts for displaying multiple information cards',
    category: 'Blocks',
  },
  // Behaviour
  {
    name: 'ContentRotator',
    path: '/components/behaviour/content-rotator',
    description:
      'Rotate content on a fixed cadence with signage-safe transitions',
    category: 'Behaviour',
  },
  {
    name: 'ScheduleGate',
    path: '/components/behaviour/schedule-gate',
    description:
      'Time/day gating (optionally timezone-aware) for daypart content',
    category: 'Behaviour',
  },
  {
    name: 'AutoPagingList',
    path: '/components/behaviour/auto-paging-list',
    description: 'Paged lists (no scrolling) with dwell time per page',
    category: 'Behaviour',
  },
  {
    name: 'SignageTransition',
    path: '/components/behaviour/signage-transition',
    description:
      'Predictable transitions (crossfade/slide) with reduced-motion support',
    category: 'Behaviour',
  },
  {
    name: 'Clock',
    path: '/components/behaviour/clock',
    description: 'Signage-friendly clock with optional timezone and seconds',
    category: 'Behaviour',
  },
  {
    name: 'Countdown',
    path: '/components/behaviour/countdown',
    description:
      'Countdown to an epoch time with clamping and completion callback',
    category: 'Behaviour',
  },
  {
    name: 'OfflineFallback',
    path: '/components/behaviour/offline-fallback',
    description:
      'Stable fallback boundary for offline/unhealthy networked content',
    category: 'Behaviour',
  },
  {
    name: 'StaleDataIndicator',
    path: '/components/behaviour/stale-data-indicator',
    description: 'Compact freshness indicator for always-on screens',
    category: 'Behaviour',
  },
];

const categoryIcons = {
  Primitives: Box,
  Layouts: Layout,
  Blocks: Layers,
  Behaviour: Activity,
};

const categoryColors = {
  Primitives: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Layouts: 'bg-green-500/10 text-green-500 border-green-500/20',
  Blocks: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  Behaviour: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
};

export const ComponentIndexPage: FC = () => {
  const primitives = components.filter((c) => c.category === 'Primitives');
  const layouts = components.filter((c) => c.category === 'Layouts');
  const blocks = components.filter((c) => c.category === 'Blocks');
  const behaviour = components.filter((c) => c.category === 'Behaviour');

  return (
    <div className="container mx-auto px-4 py-8" data-testid="component-index">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Documentation</p>

        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          Signage Components
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          React components for digital signage displays. Built on{' '}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            shadcn/ui
          </a>{' '}
          primitives and optimized for distance readability, fixed-aspect
          layouts, and 24/7 operation.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-6">What is shadcnui-signage?</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong className="text-foreground">shadcnui-signage</strong> is a
            collection of React components specifically designed for digital
            signage applications. Unlike standard web UI components, these are
            optimized for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong className="text-foreground">Distance readability</strong>{' '}
              - Large typography and high contrast for 10+ foot viewing
            </li>
            <li>
              <strong className="text-foreground">Fixed-aspect layouts</strong>{' '}
              - Deterministic rendering for TV and monitor displays
            </li>
            <li>
              <strong className="text-foreground">Long-running displays</strong>{' '}
              - Performance and stability for 24/7 operation
            </li>
            <li>
              <strong className="text-foreground">
                Offline-first operation
              </strong>{' '}
              - Works reliably on BrightSign and similar devices
            </li>
          </ul>
          <p>
            Each component builds on shadcn/ui primitives, extending them with
            signage-specific constraints and behaviors. This is not a parallel
            design system—it's a signage-focused extension of shadcn/ui.
          </p>
        </div>
      </section>

      {/* Component Categories */}
      <section className="space-y-12">
        {/* Primitives */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Box className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-medium">Primitives</h2>
            <Badge variant="outline" className={categoryColors.Primitives}>
              {primitives.length} components
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Basic building blocks for signage content. Cards, frames, and
            display elements optimized for distance viewing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {primitives.map((component) => (
              <ComponentCard key={component.name} component={component} />
            ))}
          </div>
        </div>

        {/* Layouts */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Layout className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-medium">Layouts</h2>
            <Badge variant="outline" className={categoryColors.Layouts}>
              {layouts.length} components
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Structural components for organizing signage screens. Containers,
            headers, and split-screen layouts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {layouts.map((component) => (
              <ComponentCard key={component.name} component={component} />
            ))}
          </div>
        </div>

        {/* Blocks */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-medium">Blocks</h2>
            <Badge variant="outline" className={categoryColors.Blocks}>
              {blocks.length} components
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Higher-level composed components combining primitives and layouts
            into complete sections.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blocks.map((component) => (
              <ComponentCard key={component.name} component={component} />
            ))}
          </div>
        </div>

        {/* Behaviour */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-medium">Behaviour</h2>
            <Badge variant="outline" className={categoryColors.Behaviour}>
              {behaviour.length} components
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Time, rotation, transitions, and screen-safe runtime behaviour for
            always-on signage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {behaviour.map((component) => (
              <ComponentCard key={component.name} component={component} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Installation:</strong> All
            components are available via the{' '}
            <code className="bg-muted px-2 py-1 rounded">
              @wallrun/shadcnui-signage
            </code>{' '}
            package.
          </p>
          <p>
            See{' '}
            <Link
              to="/getting-started"
              className="text-foreground hover:underline"
            >
              Getting Started
            </Link>{' '}
            for installation instructions and{' '}
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Storybook
            </a>{' '}
            for interactive component examples.
          </p>
        </div>
      </footer>
    </div>
  );
};

const ComponentCard: FC<{ component: ComponentInfo }> = ({ component }) => {
  const Icon = categoryIcons[component.category];

  return (
    <Link
      to={component.path}
      className="block p-6 border border-border rounded-lg hover:border-foreground/50 hover:bg-muted/50 transition-colors group"
      data-testid={`component-card-${component.name}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded ${categoryColors[component.category]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium mb-2 group-hover:text-foreground">
            {component.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {component.description}
          </p>
        </div>
      </div>
    </Link>
  );
};
