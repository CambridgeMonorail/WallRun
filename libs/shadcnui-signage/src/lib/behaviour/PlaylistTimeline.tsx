import { useMemo } from 'react';
import type { NowProvider } from '../types/time.types';
import { useTicker } from '../hooks/useTicker';
import { cn } from '../utils/cn';
import {
  annotatePlaylistEntries,
  type PlaylistEntry,
} from '../utils/playlistRuntime';
import { PlaylistItem } from './PlaylistItem';

export interface PlaylistTimelineProps {
  items: PlaylistEntry[];
  now?: NowProvider;
  locale?: string;
  timeZone?: string;
  className?: string;
}

/**
 * PlaylistTimeline
 *
 * Surfaces active, next, future, and expired items from an explicit loop plan.
 */
export function PlaylistTimeline({
  items,
  now,
  locale,
  timeZone,
  className,
}: PlaylistTimelineProps) {
  useTicker({
    intervalMs: 1000,
    alignTo: 'none',
    now,
    enabled: items.length > 0,
  });

  const current = (now ?? (() => Date.now()))();

  const resolvedItems = useMemo(
    () => annotatePlaylistEntries(items, current),
    [current, items],
  );

  return (
    <div
      className={cn('space-y-3', className)}
      data-testid="playlist-timeline"
    >
      {resolvedItems.map((item) => (
        <PlaylistItem
          key={item.id}
          {...item}
          state={item.state}
          locale={locale}
          timeZone={timeZone}
        />
      ))}
    </div>
  );
}