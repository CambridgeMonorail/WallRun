import { navigationConfig } from '../constants/navigationConfig';

export type RouteSeoEntry = {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string;
  robots?: string;
  type?: 'website' | 'article';
  structuredData?: Array<Record<string, unknown>>;
};

const siteName = 'WallRun';
const siteHost = 'https://cambridgemonorail.github.io';
const siteBasePath = '/WallRun';
const siteImage = `${siteHost}${siteBasePath}/assets/images/social.png`;
const defaultDescription =
  'WallRun is a developer-first workspace for building real digital signage with modern web tooling, signage-ready UI primitives, and BrightSign deployment workflows.';
const defaultKeywords =
  'digital signage, BrightSign, React signage, signage component library, signage docs, TypeScript signage';

export const getCanonicalUrl = (path: string) => {
  const normalizedPath =
    path === '/' ? `${siteBasePath}/` : `${siteBasePath}${path}`;

  return `${siteHost}${normalizedPath}`;
};

const buildWebPageSchema = (
  title: string,
  description: string,
  canonicalPath: string,
) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url: getCanonicalUrl(canonicalPath),
  isPartOf: getCanonicalUrl('/'),
});

const buildBreadcrumbSchema = (
  items: Array<{ name: string; path: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: getCanonicalUrl(item.path),
  })),
});

const buildComponentDocEntry = (options: {
  path: string;
  name: string;
  description: string;
  keywords: string;
}) => {
  const title = `${options.name} Component Docs | WallRun`;

  return {
    title,
    description: options.description,
    canonicalPath: options.path,
    keywords: options.keywords,
    type: 'article' as const,
    structuredData: [
      buildWebPageSchema(title, options.description, options.path),
      buildBreadcrumbSchema([
        { name: 'WallRun', path: navigationConfig.paths.landing },
        { name: 'Components', path: navigationConfig.paths.components.index },
        { name: options.name, path: options.path },
      ]),
    ],
  };
};

const routeSeoEntries: Record<string, RouteSeoEntry> = {
  [navigationConfig.paths.landing]: {
    title: 'WallRun | Digital Signage Framework For React And BrightSign',
    description:
      'Build BrightSign-ready digital signage with React, TypeScript, signage UI primitives, player app generators, and deployment workflows.',
    canonicalPath: navigationConfig.paths.landing,
    keywords:
      'digital signage framework, BrightSign React, signage component library, BrightSign deployment workflow, player app generator',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: getCanonicalUrl('/'),
        description: defaultDescription,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CambridgeMonorail',
        url: 'https://github.com/CambridgeMonorail',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: siteName,
        codeRepository: 'https://github.com/CambridgeMonorail/WallRun',
        programmingLanguage: ['TypeScript', 'React'],
        runtimePlatform: 'BrightSign OS 9.x',
        description: defaultDescription,
        url: getCanonicalUrl('/'),
      },
    ],
  },
  [navigationConfig.paths.gettingStarted]: {
    title: 'Getting Started | WallRun',
    description:
      'Install signage components, scaffold a BrightSign-ready player app, and move from browser demo to deployable signage software.',
    canonicalPath: navigationConfig.paths.gettingStarted,
    keywords:
      'getting started digital signage, BrightSign React setup, signage component install, player app scaffold',
    structuredData: [
      buildWebPageSchema(
        'Getting Started | WallRun',
        'Install signage components, scaffold a BrightSign-ready player app, and move from browser demo to deployable signage software.',
        navigationConfig.paths.gettingStarted,
      ),
      buildBreadcrumbSchema([
        { name: 'WallRun', path: navigationConfig.paths.landing },
        {
          name: 'Getting Started',
          path: navigationConfig.paths.gettingStarted,
        },
      ]),
    ],
  },
  [navigationConfig.paths.tooling]: {
    title: 'Tooling And Deployment | WallRun',
    description:
      'Scaffold player apps, package for BrightSign, discover devices on your LAN, and install portable skills for signage engineering workflows.',
    canonicalPath: navigationConfig.paths.tooling,
    keywords:
      'BrightSign deployment, player app generator, player discovery, signage tooling, signage skills',
    structuredData: [
      buildWebPageSchema(
        'Tooling And Deployment | WallRun',
        'Scaffold player apps, package for BrightSign, discover devices on your LAN, and install portable skills for signage engineering workflows.',
        navigationConfig.paths.tooling,
      ),
      buildBreadcrumbSchema([
        { name: 'WallRun', path: navigationConfig.paths.landing },
        {
          name: 'Tooling And Deployment',
          path: navigationConfig.paths.tooling,
        },
      ]),
    ],
  },
  [navigationConfig.paths.components.library]: {
    title: 'Component Library | WallRun',
    description:
      'Browse signage-oriented React components for distance readability, fixed-aspect layouts, and always-on BrightSign displays.',
    canonicalPath: navigationConfig.paths.components.library,
    keywords:
      'signage component library, React signage components, BrightSign UI components, distance readable components',
    structuredData: [
      buildWebPageSchema(
        'Component Library | WallRun',
        'Browse signage-oriented React components for distance readability, fixed-aspect layouts, and always-on BrightSign displays.',
        navigationConfig.paths.components.library,
      ),
      buildBreadcrumbSchema([
        { name: 'WallRun', path: navigationConfig.paths.landing },
        {
          name: 'Component Library',
          path: navigationConfig.paths.components.library,
        },
      ]),
    ],
  },
  [navigationConfig.paths.gallery]: {
    title: 'Signage Gallery | WallRun',
    description:
      'Explore full-screen digital signage examples including menus, dashboards, wayfinding, announcements, and lobby loops.',
    canonicalPath: navigationConfig.paths.gallery,
    keywords:
      'digital signage examples, menu board example, KPI dashboard signage, wayfinding screen, lobby loop',
    structuredData: [
      buildWebPageSchema(
        'Signage Gallery | WallRun',
        'Explore full-screen digital signage examples including menus, dashboards, wayfinding, announcements, and lobby loops.',
        navigationConfig.paths.gallery,
      ),
      buildBreadcrumbSchema([
        { name: 'WallRun', path: navigationConfig.paths.landing },
        { name: 'Gallery', path: navigationConfig.paths.gallery },
      ]),
    ],
  },
  [navigationConfig.paths.components.index]: {
    title: 'Signage Components Reference | WallRun',
    description:
      'Reference documentation for signage primitives, layouts, blocks, and behaviour components in WallRun component library.',
    canonicalPath: navigationConfig.paths.components.index,
    keywords:
      'signage component docs, component reference, screenframe docs, metriccard docs, signage behaviour components',
    structuredData: [
      buildWebPageSchema(
        'Signage Components Reference | WallRun',
        'Reference documentation for signage primitives, layouts, blocks, and behaviour components in WallRun component library.',
        navigationConfig.paths.components.index,
      ),
      buildBreadcrumbSchema([
        { name: 'WallRun', path: navigationConfig.paths.landing },
        { name: 'Components', path: navigationConfig.paths.components.index },
      ]),
    ],
  },
  [navigationConfig.paths.components.colorPalette]: {
    title: 'Color Palette | WallRun',
    description:
      'Review the accessibility-focused color system and contrast guidance used across WallRun demo and signage components.',
    canonicalPath: navigationConfig.paths.components.colorPalette,
    keywords:
      'signage color palette, accessibility contrast, signage theme tokens',
    structuredData: [
      buildBreadcrumbSchema([
        { name: 'WallRun', path: navigationConfig.paths.landing },
        {
          name: 'Color Palette',
          path: navigationConfig.paths.components.colorPalette,
        },
      ]),
    ],
  },
  [navigationConfig.paths.components.primitives.metricCard]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.primitives.metricCard,
      name: 'MetricCard',
      description:
        'MetricCard documentation for large-format KPI and dashboard values with signage-friendly hierarchy, change indicators, and distance-readable emphasis.',
      keywords:
        'MetricCard, KPI card React component, signage metrics component, dashboard card BrightSign',
    }),
  [navigationConfig.paths.components.primitives.screenFrame]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.primitives.screenFrame,
      name: 'ScreenFrame',
      description:
        'ScreenFrame documentation for previewing fixed-aspect signage layouts, safe areas, and display resolutions during design and QA.',
      keywords:
        'ScreenFrame, signage preview frame, safe area component, fixed aspect layout preview',
    }),
  [navigationConfig.paths.components.primitives.eventCard]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.primitives.eventCard,
      name: 'EventCard',
      description:
        'EventCard documentation for schedule and event signage layouts with time, location, and headline content designed for quick scanning.',
      keywords:
        'EventCard, event signage component, schedule card React, venue display component',
    }),
  [navigationConfig.paths.components.primitives.announcementCard]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.primitives.announcementCard,
      name: 'AnnouncementCard',
      description:
        'AnnouncementCard documentation for high-priority messages, notices, and rotating communications on always-on displays.',
      keywords:
        'AnnouncementCard, notice card React, signage announcement component, message board component',
    }),
  [navigationConfig.paths.components.layouts.splitScreen]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.layouts.splitScreen,
      name: 'SplitScreen',
      description:
        'SplitScreen documentation for deterministic two-zone signage layouts that keep primary and secondary content balanced on fixed displays.',
      keywords:
        'SplitScreen, split layout signage component, two column signage layout, fixed display layout',
    }),
  [navigationConfig.paths.components.layouts.signageContainer]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.layouts.signageContainer,
      name: 'SignageContainer',
      description:
        'SignageContainer documentation for full-screen signage surfaces with controlled ambient styling and layout-safe screen composition.',
      keywords:
        'SignageContainer, full screen signage layout, display container component, signage background wrapper',
    }),
  [navigationConfig.paths.components.layouts.signageHeader]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.layouts.signageHeader,
      name: 'SignageHeader',
      description:
        'SignageHeader documentation for consistent top-of-screen branding, titles, tags, and screen context across signage experiences.',
      keywords:
        'SignageHeader, signage title bar, display header component, branded signage header',
    }),
  [navigationConfig.paths.components.blocks.fullscreenHero]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.blocks.fullscreenHero,
      name: 'FullscreenHero',
      description:
        'FullscreenHero documentation for dominant message-led signage screens with large-format typography and ambient presentation.',
      keywords:
        'FullscreenHero, hero signage component, full screen message component, large type signage',
    }),
  [navigationConfig.paths.components.blocks.infoCardGrid]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.blocks.infoCardGrid,
      name: 'InfoCardGrid',
      description:
        'InfoCardGrid documentation for repeating information zones, feature summaries, and grid-based signage compositions.',
      keywords:
        'InfoCardGrid, signage info grid, card grid display component, multi card signage layout',
    }),
  [navigationConfig.paths.components.behaviour.contentRotator]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.behaviour.contentRotator,
      name: 'ContentRotator',
      description:
        'ContentRotator documentation for timed content cycling and predictable rotation patterns on unattended signage displays.',
      keywords:
        'ContentRotator, rotating signage content, timed slideshow component, signage content cycle',
    }),
  [navigationConfig.paths.components.behaviour.scheduleGate]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.behaviour.scheduleGate,
      name: 'ScheduleGate',
      description:
        'ScheduleGate documentation for time-based content gating, daypart behaviour, and display scheduling logic on signage screens.',
      keywords:
        'ScheduleGate, daypart signage component, schedule based display logic, timed signage content',
    }),
  [navigationConfig.paths.components.behaviour.autoPagingList]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.behaviour.autoPagingList,
      name: 'AutoPagingList',
      description:
        'AutoPagingList documentation for long signage lists that page automatically without manual input or scrolling.',
      keywords:
        'AutoPagingList, auto paging signage list, rotating list component, long list display component',
    }),
  [navigationConfig.paths.components.behaviour.signageTransition]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.behaviour.signageTransition,
      name: 'SignageTransition',
      description:
        'SignageTransition documentation for controlled display transitions tuned for legibility, calm motion, and always-on playback.',
      keywords:
        'SignageTransition, signage animation component, display transition React, calm motion signage',
    }),
  [navigationConfig.paths.components.behaviour.clock]: buildComponentDocEntry({
    path: navigationConfig.paths.components.behaviour.clock,
    name: 'Clock',
    description:
      'Clock documentation for signage-friendly time displays with timezone support and large-format legibility.',
    keywords:
      'Clock signage component, digital clock React, timezone display component, signage time widget',
  }),
  [navigationConfig.paths.components.behaviour.countdown]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.behaviour.countdown,
      name: 'Countdown',
      description:
        'Countdown documentation for event countdowns, deadlines, and time-to-go messaging on digital signage screens.',
      keywords:
        'Countdown signage component, event countdown React, timer display component, deadline signage widget',
    }),
  [navigationConfig.paths.components.behaviour.offlineFallback]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.behaviour.offlineFallback,
      name: 'OfflineFallback',
      description:
        'OfflineFallback documentation for resilient signage states when connectivity or upstream data sources are unavailable.',
      keywords:
        'OfflineFallback, offline signage component, resilient display state, network failure signage',
    }),
  [navigationConfig.paths.components.behaviour.staleDataIndicator]:
    buildComponentDocEntry({
      path: navigationConfig.paths.components.behaviour.staleDataIndicator,
      name: 'StaleDataIndicator',
      description:
        'StaleDataIndicator documentation for showing data freshness, last-updated status, and degraded-information states on signage screens.',
      keywords:
        'StaleDataIndicator, data freshness component, last updated signage, stale data warning display',
    }),
  [navigationConfig.paths.signage.welcome]: {
    title: 'Welcome Screen Example | WallRun',
    description:
      'A welcome screen demo showing how WallRun handles fixed-aspect digital signage layouts for front-of-house displays.',
    canonicalPath: navigationConfig.paths.signage.welcome,
    keywords:
      'welcome screen signage example, lobby display example, entrance screen design',
  },
  [navigationConfig.paths.signage.menu]: {
    title: 'Restaurant Menu Example | WallRun',
    description:
      'A digital menu board example built with WallRun signage components for distance readability and reliable display playback.',
    canonicalPath: navigationConfig.paths.signage.menu,
    keywords:
      'restaurant menu board example, digital menu signage, cafe display example',
  },
  [navigationConfig.paths.signage.wayfinding]: {
    title: 'Office Directory Example | WallRun',
    description:
      'A wayfinding and office directory demo built with WallRun for large-format screens and deterministic layouts.',
    canonicalPath: navigationConfig.paths.signage.wayfinding,
    keywords:
      'office directory signage example, wayfinding display example, directory screen React',
  },
  [navigationConfig.paths.signage.dashboard]: {
    title: 'KPI Dashboard Example | WallRun',
    description:
      'A KPI dashboard signage example demonstrating glanceable metrics, large-format typography, and stable layout zones.',
    canonicalPath: navigationConfig.paths.signage.dashboard,
    keywords:
      'KPI dashboard signage, operations dashboard display, metrics screen example',
  },
  [navigationConfig.paths.signage.announcements]: {
    title: 'Announcements Board Example | WallRun',
    description:
      'An announcements signage example showing rotating content, message hierarchy, and always-on display design patterns.',
    canonicalPath: navigationConfig.paths.signage.announcements,
    keywords:
      'announcements board example, digital notice board, message screen signage',
  },
  [navigationConfig.paths.signage.eventSchedule]: {
    title: 'Event Schedule Example | WallRun',
    description:
      'An event schedule signage example built for legible, timetable-style digital displays using WallRun.',
    canonicalPath: navigationConfig.paths.signage.eventSchedule,
    keywords:
      'event schedule signage, timetable display example, venue schedule screen',
  },
  [navigationConfig.paths.signage.officeLobbyLoop]: {
    title: 'Office Lobby Loop Example | WallRun',
    description:
      'An office lobby loop example combining signage layouts and content rotation patterns for unattended displays.',
    canonicalPath: navigationConfig.paths.signage.officeLobbyLoop,
    keywords:
      'office lobby loop, corporate lobby signage, rotating lobby screen example',
  },
  [navigationConfig.paths.signage.daypartMenu]: {
    title: 'Daypart Menu Example | WallRun',
    description:
      'A daypart menu example showing how WallRun can support time-based signage content and menu board presentation.',
    canonicalPath: navigationConfig.paths.signage.daypartMenu,
    keywords:
      'daypart menu board, timed menu signage, breakfast lunch dinner display',
  },
  [navigationConfig.paths.notFound]: {
    title: 'Page Not Found | WallRun',
    description: defaultDescription,
    canonicalPath: navigationConfig.paths.landing,
    robots: 'noindex, nofollow',
  },
};

export const getSiteImageUrl = () => siteImage;

export const getRouteSeo = (path: string): RouteSeoEntry => {
  return (
    routeSeoEntries[path] ?? {
      title: `${siteName} | Developer-First Digital Signage Toolkit`,
      description: defaultDescription,
      canonicalPath: navigationConfig.paths.landing,
      keywords: defaultKeywords,
      robots: 'noindex, nofollow',
    }
  );
};
