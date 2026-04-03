/**
 * @wallrun/shadcnui-signage
 *
 * React component library for building digital signage screens.
 * Optimized for fixed-aspect displays, distance readability, and predictable layouts.
 */

// Primitives
export { ScreenFrame } from './lib/primitives/ScreenFrame';
export type { ScreenFrameProps } from './lib/primitives/ScreenFrame';
export { MetricCard } from './lib/primitives/MetricCard';
export type { MetricCardProps } from './lib/primitives/MetricCard';
export { EventCard } from './lib/primitives/EventCard';
export type { EventCardProps } from './lib/primitives/EventCard';
export { AnnouncementCard } from './lib/primitives/AnnouncementCard';
export type { AnnouncementCardProps } from './lib/primitives/AnnouncementCard';

// Layouts
export { SplitScreen } from './lib/layouts/SplitScreen';
export type { SplitScreenProps } from './lib/layouts/SplitScreen';
export { SignageContainer } from './lib/layouts/SignageContainer';
export type {
  SignageContainerProps,
  GradientVariant,
} from './lib/layouts/SignageContainer';
export { SignageHeader } from './lib/layouts/SignageHeader';
export type { SignageHeaderProps } from './lib/layouts/SignageHeader';

// Blocks
export { FullscreenHero } from './lib/blocks/FullscreenHero';
export type { FullscreenHeroProps } from './lib/blocks/FullscreenHero';
export { InfoCardGrid } from './lib/blocks/InfoCardGrid';
export type { InfoCardGridProps } from './lib/blocks/InfoCardGrid';

// Behaviour
export { ContentRotator } from './lib/behaviour/ContentRotator';
export type { ContentRotatorProps } from './lib/behaviour/ContentRotator';
export { ScheduleGate } from './lib/behaviour/ScheduleGate';
export type {
  ScheduleGateProps,
  ScheduleWindow,
  Weekday,
} from './lib/behaviour/ScheduleGate';
export { AutoPagingList } from './lib/behaviour/AutoPagingList';
export type { AutoPagingListProps } from './lib/behaviour/AutoPagingList';
export { SignageTransition } from './lib/behaviour/SignageTransition';
export type { SignageTransitionProps } from './lib/behaviour/SignageTransition';
export { Clock } from './lib/behaviour/Clock';
export type { ClockProps } from './lib/behaviour/Clock';
export { Countdown } from './lib/behaviour/Countdown';
export type { CountdownProps } from './lib/behaviour/Countdown';
export { OfflineFallback } from './lib/behaviour/OfflineFallback';
export type { OfflineFallbackProps } from './lib/behaviour/OfflineFallback';
export { StaleDataIndicator } from './lib/behaviour/StaleDataIndicator';
export type { StaleDataIndicatorProps } from './lib/behaviour/StaleDataIndicator';

// Types
export type {
  Resolution,
  ResolutionDimensions,
  AspectRatio,
  SplitRatio,
  SplitDirection,
  GapSize,
  Density,
  ClampLines,
  Variant,
  InfoCardItem,
  ColumnCount,
} from './lib/types/signage.types';

export type { NowProvider } from './lib/types/time.types';

// Utilities
export { getResolution, getAspectRatio } from './lib/utils/resolution';
export { getClampClass } from './lib/utils/clamp';
