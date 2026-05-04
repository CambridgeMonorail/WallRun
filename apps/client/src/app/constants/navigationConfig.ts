import { createElement } from 'react';
import { SidebarConfiguration } from '../types/sidebarTypes';
import {
  Swords,
  AudioWaveform,
  Bot,
  Monitor,
  Blocks,
  Wrench,
  BookOpen,
  GraduationCap,
} from 'lucide-react';

import { LandingPage } from '../pages/landing/Landing';
import { ColorPalettePage } from '../pages/color-palette/ColorPalette';
import { GalleryPage } from '../pages/gallery/Gallery';
import { LibraryPage } from '../pages/library/Library';
import { GettingStartedPage } from '../pages/getting-started/GettingStarted';
import { ToolingPage } from '../pages/tooling/Tooling';
import { SkillsPage } from '../pages/skills/Skills';
import { NotFound } from '../pages/not-found/NotFound';
import { WelcomeScreen } from '../pages/signage/WelcomeScreen';
import { RestaurantMenu } from '../pages/signage/RestaurantMenu';
import { OfficeDirectory } from '../pages/signage/OfficeDirectory';
import { KPIDashboard } from '../pages/signage/KPIDashboard';
import { AnnouncementsBoard } from '../pages/signage/AnnouncementsBoard';
import { EventSchedule } from '../pages/signage/EventSchedule';
import { OfficeLobbyLoop } from '../pages/signage/OfficeLobbyLoop';
import { DaypartMenu } from '../pages/signage/DaypartMenu';
import { ComponentIndexPage } from '../pages/components/ComponentIndex';
import { MetricCardDocPage } from '../pages/components/primitives/MetricCardDoc';
import { ScreenFrameDocPage } from '../pages/components/primitives/ScreenFrameDoc';
import { EventCardDocPage } from '../pages/components/primitives/EventCardDoc';
import { AnnouncementCardDocPage } from '../pages/components/primitives/AnnouncementCardDoc';
import { DirectoryCardDocPage } from '../pages/components/primitives/DirectoryCardDoc';
import { FloorBadgeDocPage } from '../pages/components/primitives/FloorBadgeDoc';
import { LocationIndicatorDocPage } from '../pages/components/primitives/LocationIndicatorDoc';
import { MenuItemDocPage } from '../pages/components/primitives/MenuItemDoc';
import { MenuSectionDocPage } from '../pages/components/primitives/MenuSectionDoc';
import { SignagePanelDocPage } from '../pages/components/primitives/SignagePanelDoc';
import { MeetingRowDocPage } from '../pages/components/primitives/MeetingRowDoc';
import { InfoListDocPage } from '../pages/components/primitives/InfoListDoc';
import { SplitScreenDocPage } from '../pages/components/layouts/SplitScreenDoc';
import { SignageContainerDocPage } from '../pages/components/layouts/SignageContainerDoc';
import { SignageHeaderDocPage } from '../pages/components/layouts/SignageHeaderDoc';
import { FullscreenHeroDocPage } from '../pages/components/blocks/FullscreenHeroDoc';
import { InfoCardGridDocPage } from '../pages/components/blocks/InfoCardGridDoc';
import { MenuBoardDocPage } from '../pages/components/blocks/MenuBoardDoc';
import { ContentRotatorDocPage } from '../pages/components/behaviour/ContentRotatorDoc';
import { HowToPage } from '../pages/how-to/HowTo';
import { CustomAgentsPage } from '../pages/how-to/CustomAgents';
import { DesignBriefPage } from '../pages/how-to/DesignBrief';
import { BuildSignagePage } from '../pages/how-to/BuildSignage';
import { DeployBrightSignPage } from '../pages/how-to/DeployBrightSign';
import { TutorialsPage } from '../pages/tutorials/Tutorials';
import { RestaurantDigitalSignageTutorialPage } from '../pages/tutorials/RestaurantDigitalSignage';
import { ScheduleGateDocPage } from '../pages/components/behaviour/ScheduleGateDoc';
import { AutoPagingListDocPage } from '../pages/components/behaviour/AutoPagingListDoc';
import { SignageTransitionDocPage } from '../pages/components/behaviour/SignageTransitionDoc';
import { ClockDocPage } from '../pages/components/behaviour/ClockDoc';
import { CountdownDocPage } from '../pages/components/behaviour/CountdownDoc';
import { OfflineFallbackDocPage } from '../pages/components/behaviour/OfflineFallbackDoc';
import { StaleDataIndicatorDocPage } from '../pages/components/behaviour/StaleDataIndicatorDoc';
import { Layout } from '@wallrun/shell';

/**
 * Object containing all the paths used in the application.
 */
const paths = {
  landing: '/',
  gallery: '/gallery',
  gettingStarted: '/getting-started',
  tooling: '/tooling',
  skills: '/skills',
  home: '/',
  howTo: {
    index: '/how-to',
    customAgents: '/how-to/custom-agents',
    designBrief: '/how-to/design-brief',
    buildSignage: '/how-to/build-signage',
    deployBrightSign: '/how-to/deploy-brightsign',
  },
  tutorials: {
    index: '/tutorials',
    restaurantDigitalSignage: '/tutorials/restaurant-digital-signage',
  },
  signage: {
    welcome: '/signage/welcome',
    menu: '/signage/menu',
    wayfinding: '/signage/wayfinding',
    dashboard: '/signage/dashboard',
    announcements: '/signage/announcements',
    eventSchedule: '/signage/event-schedule',
    officeLobbyLoop: '/signage/office-lobby-loop',
    daypartMenu: '/signage/daypart-menu',
  },
  components: {
    colorPalette: '/color-palette',
    library: '/library',
    index: '/components',
    primitives: {
      metricCard: '/components/primitives/metric-card',
      screenFrame: '/components/primitives/screen-frame',
      eventCard: '/components/primitives/event-card',
      announcementCard: '/components/primitives/announcement-card',
      directoryCard: '/components/primitives/directory-card',
      floorBadge: '/components/primitives/floor-badge',
      locationIndicator: '/components/primitives/location-indicator',
      menuItem: '/components/primitives/menu-item',
      menuSection: '/components/primitives/menu-section',
      signagePanel: '/components/primitives/signage-panel',
      meetingRow: '/components/primitives/meeting-row',
      infoList: '/components/primitives/info-list',
    },
    layouts: {
      splitScreen: '/components/layouts/split-screen',
      signageContainer: '/components/layouts/signage-container',
      signageHeader: '/components/layouts/signage-header',
    },
    blocks: {
      fullscreenHero: '/components/blocks/fullscreen-hero',
      infoCardGrid: '/components/blocks/info-card-grid',
      menuBoard: '/components/blocks/menu-board',
    },
    behaviour: {
      contentRotator: '/components/behaviour/content-rotator',
      scheduleGate: '/components/behaviour/schedule-gate',
      autoPagingList: '/components/behaviour/auto-paging-list',
      signageTransition: '/components/behaviour/signage-transition',
      clock: '/components/behaviour/clock',
      countdown: '/components/behaviour/countdown',
      offlineFallback: '/components/behaviour/offline-fallback',
      staleDataIndicator: '/components/behaviour/stale-data-indicator',
    },
  },
  notFound: '*',
};

/**
 * Configuration for the sidebar, including user information, teams, and navigation items.
 */
const sidebarData: SidebarConfiguration = {
  user: {
    name: 'TSA',
    email: 'm@example.com',
    avatar: 'WallRun/assets/images/avatars/avatar.jpg',
  },
  teams: [
    {
      name: 'TSA',
      logo: Swords,
      plan: 'Enterprise',
    },
    {
      name: 'TSA Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navMain: [
    {
      title: 'Documentation',
      url: paths.gettingStarted,
      icon: Bot,
      isActive: true,
      items: [
        { title: 'Getting Started', url: paths.gettingStarted },
        { title: 'Tooling & Deployment', url: paths.tooling },
        { title: 'Installable Skills', url: paths.skills },
        { title: 'Component Library', url: paths.components.library },
        { title: 'Color Palette', url: paths.components.colorPalette },
      ],
    },
    {
      title: 'How To Guides',
      url: paths.howTo.index,
      icon: BookOpen,
      items: [
        { title: 'Using Custom Agents', url: paths.howTo.customAgents },
        { title: 'Create a Design Brief', url: paths.howTo.designBrief },
        { title: 'Build a Signage Screen', url: paths.howTo.buildSignage },
        { title: 'Deploy to BrightSign', url: paths.howTo.deployBrightSign },
      ],
    },
    {
      title: 'Tutorials',
      url: paths.tutorials.index,
      icon: GraduationCap,
      items: [
        {
          title: 'Restaurant Digital Signage',
          url: paths.tutorials.restaurantDigitalSignage,
        },
      ],
    },
    {
      title: 'Player Workflows',
      url: paths.tooling,
      icon: Wrench,
      items: [{ title: 'Tooling & Deployment', url: paths.tooling }],
    },
    {
      title: 'Components',
      url: paths.components.index,
      icon: Blocks,
      items: [
        { title: 'Overview', url: paths.components.index },
        { title: 'MetricCard', url: paths.components.primitives.metricCard },
        { title: 'ScreenFrame', url: paths.components.primitives.screenFrame },
        { title: 'EventCard', url: paths.components.primitives.eventCard },
        {
          title: 'AnnouncementCard',
          url: paths.components.primitives.announcementCard,
        },
        {
          title: 'DirectoryCard',
          url: paths.components.primitives.directoryCard,
        },
        { title: 'FloorBadge', url: paths.components.primitives.floorBadge },
        {
          title: 'LocationIndicator',
          url: paths.components.primitives.locationIndicator,
        },
        { title: 'MenuItem', url: paths.components.primitives.menuItem },
        { title: 'MenuSection', url: paths.components.primitives.menuSection },
        {
          title: 'SignagePanel',
          url: paths.components.primitives.signagePanel,
        },
        { title: 'MeetingRow', url: paths.components.primitives.meetingRow },
        { title: 'InfoList', url: paths.components.primitives.infoList },
        { title: 'SplitScreen', url: paths.components.layouts.splitScreen },
        {
          title: 'SignageContainer',
          url: paths.components.layouts.signageContainer,
        },
        { title: 'SignageHeader', url: paths.components.layouts.signageHeader },
        {
          title: 'FullscreenHero',
          url: paths.components.blocks.fullscreenHero,
        },
        { title: 'InfoCardGrid', url: paths.components.blocks.infoCardGrid },
        { title: 'MenuBoard', url: paths.components.blocks.menuBoard },
        {
          title: 'ContentRotator',
          url: paths.components.behaviour.contentRotator,
        },
        { title: 'ScheduleGate', url: paths.components.behaviour.scheduleGate },
        {
          title: 'AutoPagingList',
          url: paths.components.behaviour.autoPagingList,
        },
        {
          title: 'SignageTransition',
          url: paths.components.behaviour.signageTransition,
        },
        { title: 'Clock', url: paths.components.behaviour.clock },
        { title: 'Countdown', url: paths.components.behaviour.countdown },
        {
          title: 'OfflineFallback',
          url: paths.components.behaviour.offlineFallback,
        },
        {
          title: 'StaleDataIndicator',
          url: paths.components.behaviour.staleDataIndicator,
        },
      ],
    },
    {
      title: 'Signage Examples',
      url: paths.gallery,
      icon: Monitor,
      items: [
        { title: 'Gallery', url: paths.gallery },
        { title: 'Welcome Screen', url: paths.signage.welcome },
        { title: 'Restaurant Menu', url: paths.signage.menu },
        { title: 'Office Directory', url: paths.signage.wayfinding },
        { title: 'KPI Dashboard', url: paths.signage.dashboard },
        { title: 'Announcements', url: paths.signage.announcements },
        { title: 'Event Schedule', url: paths.signage.eventSchedule },
        { title: 'Office Lobby Loop', url: paths.signage.officeLobbyLoop },
        { title: 'Daypart Menu', url: paths.signage.daypartMenu },
      ],
    },
  ],
};

/**
 * Helper function to create a route object.
 * @param path - The URL path for the route.
 * @param component - The React component to render for the route.
 * @param useLayout - Whether to wrap the component with the Layout component.
 * @returns The route object.
 */
const createRoute = (
  path: string,
  component: React.ComponentType,
  useLayout = true,
) => {
  return useLayout
    ? {
        path,
        element: createElement(Layout, {
          sidebarData,
          children: createElement(component),
        }),
      }
    : { path, element: createElement(component) };
};

/**
 * Array of route objects for the application.
 */
const routes = [
  createRoute(paths.landing, LandingPage, false),
  createRoute(paths.gallery, GalleryPage),
  createRoute(paths.gettingStarted, GettingStartedPage),
  createRoute(paths.tooling, ToolingPage),
  createRoute(paths.skills, SkillsPage),
  createRoute(paths.howTo.index, HowToPage),
  createRoute(paths.howTo.customAgents, CustomAgentsPage),
  createRoute(paths.howTo.designBrief, DesignBriefPage),
  createRoute(paths.howTo.buildSignage, BuildSignagePage),
  createRoute(paths.howTo.deployBrightSign, DeployBrightSignPage),
  createRoute(paths.tutorials.index, TutorialsPage),
  createRoute(
    paths.tutorials.restaurantDigitalSignage,
    RestaurantDigitalSignageTutorialPage,
  ),
  createRoute(paths.signage.welcome, WelcomeScreen, false),
  createRoute(paths.signage.menu, RestaurantMenu, false),
  createRoute(paths.signage.wayfinding, OfficeDirectory, false),
  createRoute(paths.signage.dashboard, KPIDashboard, false),
  createRoute(paths.signage.announcements, AnnouncementsBoard, false),
  createRoute(paths.signage.eventSchedule, EventSchedule, false),
  createRoute(paths.signage.officeLobbyLoop, OfficeLobbyLoop, false),
  createRoute(paths.signage.daypartMenu, DaypartMenu, false),
  createRoute(paths.components.colorPalette, ColorPalettePage),
  createRoute(paths.components.library, LibraryPage),
  // Component documentation routes
  createRoute(paths.components.index, ComponentIndexPage),
  createRoute(paths.components.primitives.metricCard, MetricCardDocPage),
  createRoute(paths.components.primitives.screenFrame, ScreenFrameDocPage),
  createRoute(paths.components.primitives.eventCard, EventCardDocPage),
  createRoute(
    paths.components.primitives.announcementCard,
    AnnouncementCardDocPage,
  ),
  createRoute(paths.components.primitives.directoryCard, DirectoryCardDocPage),
  createRoute(paths.components.primitives.floorBadge, FloorBadgeDocPage),
  createRoute(
    paths.components.primitives.locationIndicator,
    LocationIndicatorDocPage,
  ),
  createRoute(paths.components.primitives.menuItem, MenuItemDocPage),
  createRoute(paths.components.primitives.menuSection, MenuSectionDocPage),
  createRoute(paths.components.primitives.signagePanel, SignagePanelDocPage),
  createRoute(paths.components.primitives.meetingRow, MeetingRowDocPage),
  createRoute(paths.components.primitives.infoList, InfoListDocPage),
  createRoute(paths.components.layouts.splitScreen, SplitScreenDocPage),
  createRoute(
    paths.components.layouts.signageContainer,
    SignageContainerDocPage,
  ),
  createRoute(paths.components.layouts.signageHeader, SignageHeaderDocPage),
  createRoute(paths.components.blocks.fullscreenHero, FullscreenHeroDocPage),
  createRoute(paths.components.blocks.infoCardGrid, InfoCardGridDocPage),
  createRoute(paths.components.blocks.menuBoard, MenuBoardDocPage),
  createRoute(paths.components.behaviour.contentRotator, ContentRotatorDocPage),
  createRoute(paths.components.behaviour.scheduleGate, ScheduleGateDocPage),
  createRoute(paths.components.behaviour.autoPagingList, AutoPagingListDocPage),
  createRoute(
    paths.components.behaviour.signageTransition,
    SignageTransitionDocPage,
  ),
  createRoute(paths.components.behaviour.clock, ClockDocPage),
  createRoute(paths.components.behaviour.countdown, CountdownDocPage),
  createRoute(
    paths.components.behaviour.offlineFallback,
    OfflineFallbackDocPage,
  ),
  createRoute(
    paths.components.behaviour.staleDataIndicator,
    StaleDataIndicatorDocPage,
  ),
  createRoute(paths.notFound, NotFound, false),
];

/**
 * Configuration object for navigation, including paths, sidebar data, and routes.
 */
export const navigationConfig = {
  paths,
  sidebarData,
  routes,
};
