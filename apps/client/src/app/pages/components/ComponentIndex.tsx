import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge, Button, Input } from '@wallrun/shadcnui';
import { Activity, Box, Compass, Layout, Layers, Search } from 'lucide-react';

const componentCategories = [
  'Primitives',
  'Layouts',
  'Blocks',
  'Behaviour',
] as const;

const componentUseCases = [
  'Menu Boards',
  'Wayfinding',
  'Dashboards',
  'Schedules',
  'Alerts',
  'Room Signage',
  'Phone Handoff',
] as const;

type ComponentCategory = (typeof componentCategories)[number];
type ComponentUseCase = (typeof componentUseCases)[number];

type ComponentInfo = {
  name: string;
  path: string;
  description: string;
  category: ComponentCategory;
  keywords: string[];
  useCases: ComponentUseCase[];
};

type CategorySection = {
  category: ComponentCategory;
  description: string;
};

const components: ComponentInfo[] = [
  {
    name: 'ScreenFrame',
    path: '/components/primitives/screen-frame',
    description: 'Base frame for signage content with fixed aspect ratios',
    category: 'Primitives',
    keywords: ['frame', 'aspect ratio', 'fullscreen', 'canvas'],
    useCases: ['Dashboards', 'Room Signage'],
  },
  {
    name: 'MetricCard',
    path: '/components/primitives/metric-card',
    description:
      'Display KPIs and metrics with value, change indicators, and icons',
    category: 'Primitives',
    keywords: ['kpi', 'metric', 'stats', 'analytics'],
    useCases: ['Dashboards'],
  },
  {
    name: 'EventCard',
    path: '/components/primitives/event-card',
    description: 'Event information cards with date, time, and location',
    category: 'Primitives',
    keywords: ['event', 'schedule', 'agenda', 'listing'],
    useCases: ['Schedules', 'Room Signage'],
  },
  {
    name: 'AnnouncementCard',
    path: '/components/primitives/announcement-card',
    description: 'Announcement cards for important messages and updates',
    category: 'Primitives',
    keywords: ['notice', 'announcement', 'message', 'update'],
    useCases: ['Alerts', 'Room Signage'],
  },
  {
    name: 'DirectoryCard',
    path: '/components/primitives/directory-card',
    description: 'Wayfinding card for departments, floors, rooms, and contacts',
    category: 'Primitives',
    keywords: ['directory', 'map', 'departments', 'rooms'],
    useCases: ['Wayfinding'],
  },
  {
    name: 'FloorBadge',
    path: '/components/primitives/floor-badge',
    description: 'Compact floor marker for directories, maps, and wayfinding',
    category: 'Primitives',
    keywords: ['floor', 'level', 'label', 'wayfinding'],
    useCases: ['Wayfinding'],
  },
  {
    name: 'LocationIndicator',
    path: '/components/primitives/location-indicator',
    description: 'Current-location chip for wayfinding and directory headers',
    category: 'Primitives',
    keywords: ['location', 'current', 'header', 'wayfinding'],
    useCases: ['Wayfinding', 'Room Signage'],
  },
  {
    name: 'MenuItem',
    path: '/components/primitives/menu-item',
    description: 'Price-led menu row with optional description and divider',
    category: 'Primitives',
    keywords: ['menu', 'price', 'food', 'item'],
    useCases: ['Menu Boards'],
  },
  {
    name: 'MenuSection',
    path: '/components/primitives/menu-section',
    description: 'Section wrapper for grouped menu content and headings',
    category: 'Primitives',
    keywords: ['menu', 'section', 'category', 'food'],
    useCases: ['Menu Boards'],
  },
  {
    name: 'SignagePanel',
    path: '/components/primitives/signage-panel',
    description: 'Bordered panel for grouped supporting information',
    category: 'Primitives',
    keywords: ['panel', 'supporting info', 'group', 'container'],
    useCases: ['Dashboards', 'Room Signage'],
  },
  {
    name: 'MeetingRow',
    path: '/components/primitives/meeting-row',
    description: 'Agenda row for meeting schedules and room bookings',
    category: 'Primitives',
    keywords: ['meeting', 'booking', 'agenda', 'room'],
    useCases: ['Schedules', 'Room Signage'],
  },
  {
    name: 'InfoList',
    path: '/components/primitives/info-list',
    description: 'Large-format list for instructions and operational notes',
    category: 'Primitives',
    keywords: ['instructions', 'operations', 'notes', 'list'],
    useCases: ['Alerts', 'Room Signage'],
  },
  {
    name: 'ActionStrip',
    path: '/components/primitives/action-strip',
    description: 'Reusable CTA shell for footer strips and side-zone actions',
    category: 'Primitives',
    keywords: ['cta', 'actions', 'footer', 'handoff'],
    useCases: ['Phone Handoff', 'Alerts'],
  },
  {
    name: 'ShortUrlCallout',
    path: '/components/primitives/short-url-callout',
    description: 'Readable manual fallback URL for QR and phone handoff flows',
    category: 'Primitives',
    keywords: ['url', 'mobile', 'handoff', 'fallback'],
    useCases: ['Phone Handoff'],
  },
  {
    name: 'QRCodeCallout',
    path: '/components/primitives/qr-code-callout',
    description:
      'Scan-safe QR surface with destination context and URL fallback',
    category: 'Primitives',
    keywords: ['qr', 'scan', 'mobile', 'handoff'],
    useCases: ['Phone Handoff'],
  },
  {
    name: 'SplitScreen',
    path: '/components/layouts/split-screen',
    description: 'Two-panel layouts with configurable split ratios',
    category: 'Layouts',
    keywords: ['split', 'two-panel', 'layout', 'zones'],
    useCases: ['Dashboards', 'Room Signage'],
  },
  {
    name: 'SignageContainer',
    path: '/components/layouts/signage-container',
    description:
      'Full-screen container with ambient effects and gradient backgrounds',
    category: 'Layouts',
    keywords: ['fullscreen', 'container', 'background', 'canvas'],
    useCases: ['Dashboards', 'Alerts', 'Room Signage'],
  },
  {
    name: 'SignageHeader',
    path: '/components/layouts/signage-header',
    description: 'Standard signage header with logo, title, and metadata',
    category: 'Layouts',
    keywords: ['header', 'metadata', 'branding', 'title'],
    useCases: ['Dashboards', 'Room Signage', 'Wayfinding'],
  },
  {
    name: 'ArrivalBoard',
    path: '/components/blocks/arrival-board',
    description:
      'Arrival-first board template for reception, clinic, and event-entry guidance',
    category: 'Blocks',
    keywords: ['arrival', 'reception', 'check-in', 'visitor'],
    useCases: ['Room Signage', 'Phone Handoff'],
  },
  {
    name: 'WaitingRoomBoard',
    path: '/components/blocks/waiting-room-board',
    description:
      'Waiting-area board template for clinics, lounges, and collection zones',
    category: 'Blocks',
    keywords: ['waiting room', 'queue', 'clinic', 'collection'],
    useCases: ['Room Signage', 'Phone Handoff'],
  },
  {
    name: 'DecisionBoard',
    path: '/components/blocks/decision-board',
    description:
      'Routing board template for lobbies, receptions, and high-clarity next-step choices',
    category: 'Blocks',
    keywords: ['decision', 'routing', 'choices', 'reception'],
    useCases: ['Room Signage', 'Phone Handoff'],
  },
  {
    name: 'FullscreenHero',
    path: '/components/blocks/fullscreen-hero',
    description: 'Hero sections optimized for full-screen signage displays',
    category: 'Blocks',
    keywords: ['hero', 'headline', 'fullscreen', 'message'],
    useCases: ['Alerts', 'Room Signage'],
  },
  {
    name: 'OneMessageFrame',
    path: '/components/blocks/one-message-frame',
    description:
      'Single-message shell for dominant notices and interruption states',
    category: 'Blocks',
    keywords: ['single message', 'interrupt', 'notice', 'alert'],
    useCases: ['Alerts'],
  },
  {
    name: 'InfoCardGrid',
    path: '/components/blocks/info-card-grid',
    description: 'Grid layouts for displaying multiple information cards',
    category: 'Blocks',
    keywords: ['grid', 'cards', 'overview', 'kpi'],
    useCases: ['Dashboards', 'Room Signage'],
  },
  {
    name: 'MenuBoard',
    path: '/components/blocks/menu-board',
    description:
      'Full-screen composition shell for menu boards and daypart content',
    category: 'Blocks',
    keywords: ['menu', 'board', 'daypart', 'food'],
    useCases: ['Menu Boards'],
  },
  {
    name: 'QRHandoff',
    path: '/components/blocks/qr-handoff',
    description: 'Composed phone-handoff surface for QR continuation flows',
    category: 'Blocks',
    keywords: ['qr', 'mobile', 'handoff', 'continuation'],
    useCases: ['Phone Handoff'],
  },
  {
    name: 'ContentExpiredWarning',
    path: '/components/behaviour/content-expired-warning',
    description: 'Expiration marker for preview, QA, and operator contexts',
    category: 'Behaviour',
    keywords: ['expired', 'warning', 'qa', 'operator'],
    useCases: ['Alerts'],
  },
  {
    name: 'ContentRotator',
    path: '/components/behaviour/content-rotator',
    description:
      'Rotate content on a fixed cadence with signage-safe transitions',
    category: 'Behaviour',
    keywords: ['rotation', 'playlist', 'cadence', 'loop'],
    useCases: ['Dashboards', 'Alerts'],
  },
  {
    name: 'PlaylistItem',
    path: '/components/behaviour/playlist-item',
    description:
      'Timed playlist row with explicit state, priority, and duration metadata',
    category: 'Behaviour',
    keywords: ['playlist', 'schedule', 'priority', 'timeline'],
    useCases: ['Schedules', 'Dashboards'],
  },
  {
    name: 'PlaylistTimeline',
    path: '/components/behaviour/playlist-timeline',
    description:
      'Timeline view of active, next, future, and expired playlist entries',
    category: 'Behaviour',
    keywords: ['playlist', 'timeline', 'queue', 'schedule'],
    useCases: ['Schedules', 'Dashboards'],
  },
  {
    name: 'LoopProgress',
    path: '/components/behaviour/loop-progress',
    description:
      'Dwell-progress indicator for the currently active playlist item',
    category: 'Behaviour',
    keywords: ['progress', 'dwell', 'playlist', 'timer'],
    useCases: ['Schedules', 'Dashboards'],
  },
  {
    name: 'PriorityTakeover',
    path: '/components/behaviour/priority-takeover',
    description:
      'Interruption surface for urgent playlist overrides with fallback support',
    category: 'Behaviour',
    keywords: ['takeover', 'interrupt', 'priority', 'alert'],
    useCases: ['Alerts', 'Dashboards'],
  },
  {
    name: 'ScheduleGate',
    path: '/components/behaviour/schedule-gate',
    description:
      'Time/day gating (optionally timezone-aware) for daypart content',
    category: 'Behaviour',
    keywords: ['schedule', 'daypart', 'timezone', 'gate'],
    useCases: ['Schedules', 'Menu Boards'],
  },
  {
    name: 'AutoPagingList',
    path: '/components/behaviour/auto-paging-list',
    description: 'Paged lists (no scrolling) with dwell time per page',
    category: 'Behaviour',
    keywords: ['paging', 'lists', 'dwell time', 'rotation'],
    useCases: ['Schedules', 'Dashboards'],
  },
  {
    name: 'SignageTransition',
    path: '/components/behaviour/signage-transition',
    description:
      'Predictable transitions (crossfade/slide) with reduced-motion support',
    category: 'Behaviour',
    keywords: ['transition', 'crossfade', 'slide', 'motion'],
    useCases: ['Dashboards', 'Alerts'],
  },
  {
    name: 'Clock',
    path: '/components/behaviour/clock',
    description: 'Signage-friendly clock with optional timezone and seconds',
    category: 'Behaviour',
    keywords: ['clock', 'time', 'timezone', 'live'],
    useCases: ['Schedules', 'Room Signage'],
  },
  {
    name: 'Countdown',
    path: '/components/behaviour/countdown',
    description:
      'Countdown to an epoch time with clamping and completion callback',
    category: 'Behaviour',
    keywords: ['countdown', 'timer', 'deadline', 'event'],
    useCases: ['Schedules', 'Alerts'],
  },
  {
    name: 'LastUpdatedStamp',
    path: '/components/behaviour/last-updated-stamp',
    description:
      'Quiet freshness stamp for live-data screens and fallback states',
    category: 'Behaviour',
    keywords: ['freshness', 'timestamp', 'live data', 'updated'],
    useCases: ['Dashboards'],
  },
  {
    name: 'NoContentFallback',
    path: '/components/behaviour/no-content-fallback',
    description:
      'Fallback surface for feeds, schedules, and playlists with no valid content',
    category: 'Behaviour',
    keywords: ['fallback', 'empty state', 'content', 'playlist'],
    useCases: ['Alerts', 'Schedules'],
  },
  {
    name: 'OfflineFallback',
    path: '/components/behaviour/offline-fallback',
    description:
      'Stable fallback boundary for offline/unhealthy networked content',
    category: 'Behaviour',
    keywords: ['offline', 'network', 'fallback', 'reliability'],
    useCases: ['Alerts', 'Dashboards'],
  },
  {
    name: 'ReconnectingState',
    path: '/components/behaviour/reconnecting-state',
    description: 'Recovery-state notice for live regions restoring service',
    category: 'Behaviour',
    keywords: ['reconnecting', 'recovery', 'network', 'status'],
    useCases: ['Alerts', 'Dashboards'],
  },
  {
    name: 'StaleDataIndicator',
    path: '/components/behaviour/stale-data-indicator',
    description: 'Compact freshness indicator for always-on screens',
    category: 'Behaviour',
    keywords: ['stale', 'data', 'freshness', 'status'],
    useCases: ['Dashboards'],
  },
];

const categorySections: CategorySection[] = [
  {
    category: 'Primitives',
    description:
      'Basic building blocks for signage content. Cards, frames, and display elements optimized for distance viewing.',
  },
  {
    category: 'Layouts',
    description:
      'Structural components for organizing signage screens. Containers, headers, and split-screen layouts.',
  },
  {
    category: 'Blocks',
    description:
      'Higher-level composed components combining primitives and layouts into complete sections.',
  },
  {
    category: 'Behaviour',
    description:
      'Time, rotation, transitions, and screen-safe runtime behaviour for always-on signage.',
  },
];

const useCaseDescriptions: Record<ComponentUseCase, string> = {
  'Menu Boards':
    'Price-led menu surfaces, daypart gating, and full-screen menu compositions.',
  Wayfinding:
    'Directories, floor labels, and current-location context for navigation screens.',
  Dashboards:
    'KPI surfaces, freshness states, and multi-zone overview layouts.',
  Schedules: 'Events, meetings, clocks, countdowns, and time-aware lists.',
  Alerts:
    'High-priority messages, interruption states, and resilient fallback surfaces.',
  'Room Signage':
    'Meeting room, lobby, and venue displays with identity and schedule context.',
  'Phone Handoff':
    'QR, short URL, and call-to-action patterns that shift the task to mobile.',
};

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

const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, '-');

const matchesQuery = (component: ComponentInfo, query: string) => {
  if (!query.trim()) {
    return true;
  }

  const haystack = [
    component.name,
    component.description,
    component.category,
    ...component.keywords,
    ...component.useCases,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query.toLowerCase().trim());
};

const getUseCaseCount = (useCase: ComponentUseCase) =>
  components.filter((component) => component.useCases.includes(useCase)).length;

export const ComponentIndexPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const selectedCategory = componentCategories.find(
    (category) => category === searchParams.get('category'),
  );
  const selectedUseCase = componentUseCases.find(
    (useCase) => useCase === searchParams.get('useCase'),
  );

  const updateFilters = (
    updates: Partial<Record<'q' | 'category' | 'useCase', string | null>>,
  ) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        nextParams.delete(key);
        return;
      }

      nextParams.set(key, value);
    });

    setSearchParams(nextParams, { replace: true });
  };

  const filteredComponents = components.filter((component) => {
    if (selectedCategory && component.category !== selectedCategory) {
      return false;
    }

    if (selectedUseCase && !component.useCases.includes(selectedUseCase)) {
      return false;
    }

    return matchesQuery(component, searchQuery);
  });

  const visibleSections = categorySections
    .map((section) => ({
      ...section,
      components: filteredComponents.filter(
        (component) => component.category === section.category,
      ),
      totalCount: components.filter(
        (component) => component.category === section.category,
      ).length,
    }))
    .filter((section) => section.components.length > 0);

  const hasActiveFilters = Boolean(
    searchQuery || selectedCategory || selectedUseCase,
  );

  return (
    <div className="container mx-auto px-4 py-8" data-testid="component-index">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Documentation</p>

        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          Signage Components
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          React components for digital signage displays. Built on{' '}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-foreground hover:underline"
          >
            shadcn/ui
          </a>{' '}
          primitives and optimized for distance readability, fixed-aspect
          layouts, and 24/7 operation.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-medium">What is shadcnui-signage?</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong className="text-foreground">shadcnui-signage</strong> is a
            collection of React components specifically designed for digital
            signage applications. Unlike standard web UI components, these are
            optimized for:
          </p>
          <ul className="ml-4 list-inside list-disc space-y-2">
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
            design system - it is a signage-focused extension of shadcn/ui.
          </p>
        </div>
      </section>

      <section className="demo-panel mb-12 space-y-6 p-6 sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Find the right building block
            </p>
            <h2 className="text-2xl font-medium text-foreground">
              Search by problem, not just by category
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Search by component name, screen pattern, or implementation clue,
              then narrow the catalog by category or use case.
            </p>
          </div>
          <Badge variant="outline" className="w-fit px-3 py-1 text-sm">
            {filteredComponents.length} of {components.length} visible
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-3">
            <label
              htmlFor="component-search"
              className="text-sm font-medium text-foreground"
            >
              Search components
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="component-search"
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  updateFilters({ q: event.target.value || null })
                }
                placeholder="Search by name, keyword, or use case"
                className="h-11 pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Category</p>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                isActive={!selectedCategory}
                onClick={() => updateFilters({ category: null })}
              >
                All categories
              </FilterButton>
              {componentCategories.map((category) => (
                <FilterButton
                  key={category}
                  isActive={selectedCategory === category}
                  onClick={() =>
                    updateFilters({
                      category: selectedCategory === category ? null : category,
                    })
                  }
                >
                  {category}
                </FilterButton>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-border pt-6">
          <p className="text-sm font-medium text-foreground">Use case</p>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              isActive={!selectedUseCase}
              onClick={() => updateFilters({ useCase: null })}
            >
              All use cases
            </FilterButton>
            {componentUseCases.map((useCase) => (
              <FilterButton
                key={useCase}
                isActive={selectedUseCase === useCase}
                onClick={() =>
                  updateFilters({
                    useCase: selectedUseCase === useCase ? null : useCase,
                  })
                }
              >
                {useCase}
              </FilterButton>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            Showing {filteredComponents.length} matching component
            {filteredComponents.length === 1 ? '' : 's'}.
          </p>
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="ghost"
              className="h-10 px-3"
              onClick={() =>
                updateFilters({ q: null, category: null, useCase: null })
              }
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      </section>

      <section className="mb-12 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Compass className="h-5 w-5 text-foreground" aria-hidden="true" />
            <h2 className="text-2xl font-medium">Browse by use case</h2>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Start from the screen you are trying to build. Each path narrows the
            library to components that tend to work together.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {componentUseCases.map((useCase) => {
            const isActive = selectedUseCase === useCase;

            return (
              <button
                key={useCase}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  updateFilters({ useCase: isActive ? null : useCase })
                }
                className="group rounded-lg border border-border bg-card/40 p-5 text-left transition-colors hover:border-foreground/40 hover:bg-muted/40"
                data-testid={`use-case-card-${slugify(useCase)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-foreground">
                      {useCase}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {useCaseDescriptions[useCase]}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {getUseCaseCount(useCase)}
                  </Badge>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-12">
        {visibleSections.length > 0 ? (
          visibleSections.map((section) => {
            const Icon = categoryIcons[section.category];

            return (
              <div key={section.category}>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <h2 className="text-2xl font-medium">{section.category}</h2>
                  <Badge
                    variant="outline"
                    className={categoryColors[section.category]}
                  >
                    {section.components.length} of {section.totalCount}
                  </Badge>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {section.description}
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {section.components.map((component) => (
                    <ComponentCard key={component.name} component={component} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="demo-panel-soft rounded-lg border border-dashed border-border px-6 py-10 text-center">
            <h2 className="text-xl font-medium text-foreground">
              No matching components
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Try a broader search term or clear one of the active filters. The
              current catalog is indexed by name, description, keywords, and use
              case.
            </p>
            {hasActiveFilters ? (
              <Button
                type="button"
                variant="secondary"
                className="mt-5 h-11 px-4"
                onClick={() =>
                  updateFilters({ q: null, category: null, useCase: null })
                }
              >
                Reset discoverability filters
              </Button>
            ) : null}
          </div>
        )}
      </section>

      <footer className="mt-16 border-t border-border pt-8">
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Installation:</strong> All
            components are available via the{' '}
            <code className="rounded bg-muted px-2 py-1">
              @wallrun/shadcnui-signage
            </code>{' '}
            package.
          </p>
          <p>
            See{' '}
            <Link
              to="/getting-started"
              className="inline-flex min-h-11 items-center text-foreground hover:underline"
            >
              Getting Started
            </Link>{' '}
            for installation instructions and{' '}
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-foreground hover:underline"
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

const FilterButton: FC<{
  children: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ children, isActive, onClick }) => (
  <Button
    type="button"
    variant={isActive ? 'secondary' : 'outline'}
    className="h-10 rounded-full px-4"
    aria-pressed={isActive}
    onClick={onClick}
  >
    {children}
  </Button>
);

const ComponentCard: FC<{ component: ComponentInfo }> = ({ component }) => {
  const Icon = categoryIcons[component.category];

  return (
    <Link
      to={component.path}
      className="group block rounded-lg border border-border p-6 transition-colors hover:border-foreground/50 hover:bg-muted/50"
      data-testid={`component-card-${component.name}`}
    >
      <div className="flex items-start gap-4">
        <div className={`rounded p-2 ${categoryColors[component.category]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="mb-2 text-lg font-medium text-foreground">
              {component.name}
            </h3>
            <Badge
              variant="outline"
              className="mb-2 text-[11px] uppercase tracking-[0.18em]"
            >
              {component.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {component.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {component.useCases.slice(0, 2).map((useCase) => (
              <Badge
                key={`${component.name}-${useCase}`}
                variant="outline"
                className="text-[11px] text-muted-foreground"
              >
                {useCase}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
