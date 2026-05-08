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
export { DirectoryCard } from './lib/primitives/DirectoryCard';
export type { DirectoryCardProps } from './lib/primitives/DirectoryCard';
export { FloorBadge } from './lib/primitives/FloorBadge';
export type { FloorBadgeProps } from './lib/primitives/FloorBadge';
export { LocationIndicator } from './lib/primitives/LocationIndicator';
export type { LocationIndicatorProps } from './lib/primitives/LocationIndicator';
export { MenuItem } from './lib/primitives/MenuItem';
export type { MenuItemProps } from './lib/primitives/MenuItem';
export { MenuSection } from './lib/primitives/MenuSection';
export type { MenuSectionProps } from './lib/primitives/MenuSection';
export { SignagePanel } from './lib/primitives/SignagePanel';
export type { SignagePanelProps } from './lib/primitives/SignagePanel';
export { MeetingRow } from './lib/primitives/MeetingRow';
export type { MeetingRowProps } from './lib/primitives/MeetingRow';
export { InfoList } from './lib/primitives/InfoList';
export type { InfoListProps } from './lib/primitives/InfoList';
export { ActionStrip } from './lib/primitives/ActionStrip';
export type {
  ActionStripProps,
  ActionStripPosition,
  ActionStripTone,
} from './lib/primitives/ActionStrip';
export { CTABanner } from './lib/primitives/CTABanner';
export type {
  CTABannerProps,
  CTABannerAction,
  CTABannerVariant,
} from './lib/primitives/CTABanner';
export { QRCodeCallout } from './lib/primitives/QRCodeCallout';
export type {
  QRCodeCalloutProps,
  QRCodeCalloutSize,
  QRCodeCalloutErrorCorrection,
} from './lib/primitives/QRCodeCallout';
export { ShortUrlCallout } from './lib/primitives/ShortUrlCallout';
export type {
  ShortUrlCalloutProps,
  ShortUrlCalloutVariant,
} from './lib/primitives/ShortUrlCallout';

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
export { OneMessageFrame } from './lib/blocks/OneMessageFrame';
export type { OneMessageFrameProps } from './lib/blocks/OneMessageFrame';
export { InfoCardGrid } from './lib/blocks/InfoCardGrid';
export type { InfoCardGridProps } from './lib/blocks/InfoCardGrid';
export { MenuBoard } from './lib/blocks/MenuBoard';
export type { MenuBoardProps } from './lib/blocks/MenuBoard';
export { QRHandoff } from './lib/blocks/QRHandoff';
export type { QRHandoffProps } from './lib/blocks/QRHandoff';

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
export { NoContentFallback } from './lib/behaviour/NoContentFallback';
export type { NoContentFallbackProps } from './lib/behaviour/NoContentFallback';
export { StaleDataIndicator } from './lib/behaviour/StaleDataIndicator';
export type { StaleDataIndicatorProps } from './lib/behaviour/StaleDataIndicator';
export { ContentExpiredWarning } from './lib/behaviour/ContentExpiredWarning';
export type { ContentExpiredWarningProps } from './lib/behaviour/ContentExpiredWarning';
export { LastUpdatedStamp } from './lib/behaviour/LastUpdatedStamp';
export type {
  LastUpdatedStampProps,
  LastUpdatedStampFormat,
} from './lib/behaviour/LastUpdatedStamp';
export { ReconnectingState } from './lib/behaviour/ReconnectingState';
export type { ReconnectingStateProps } from './lib/behaviour/ReconnectingState';

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
