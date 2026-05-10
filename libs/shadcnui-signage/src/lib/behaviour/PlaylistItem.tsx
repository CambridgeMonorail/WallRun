import { Clock3, Flag, Siren } from 'lucide-react';
import type { NowProvider } from '../types/time.types';
import { cn } from '../utils/cn';
import {
  formatPlaylistDuration,
  formatPlaylistTimeRange,
  resolvePlaylistState,
  resolvePlaylistWindow,
  type PlaylistEntry,
  type PlaylistPriority,
  type PlaylistState,
} from '../utils/playlistRuntime';

export interface PlaylistItemProps extends PlaylistEntry {
  state?: PlaylistState;
  now?: NowProvider;
  locale?: string;
  timeZone?: string;
  className?: string;
}

const stateToneMap: Record<PlaylistState, string> = {
  active: 'border-cyan-400/35 bg-cyan-400/10 text-cyan-100',
  next: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  future: 'border-white/10 bg-white/5 text-slate-100',
  expired: 'border-white/10 bg-slate-950/40 text-slate-400',
};

const priorityToneMap: Record<PlaylistPriority, string> = {
  normal: 'text-slate-300',
  priority: 'text-amber-200',
  takeover: 'text-rose-200',
};

export function PlaylistItem({
  id,
  label,
  detail,
  startsAt,
  endsAt,
  durationMs,
  priority = 'normal',
  state,
  now,
  locale,
  timeZone,
  className,
}: PlaylistItemProps) {
  const entry = { id, label, detail, startsAt, endsAt, durationMs, priority };
  const resolvedState = state ?? resolvePlaylistState(entry, now);
  const { startsAtMs, endsAtMs } = resolvePlaylistWindow(entry);
  const timeRange = formatPlaylistTimeRange(
    startsAtMs,
    endsAtMs,
    locale,
    timeZone,
  );

  const priorityIcon =
    priority === 'takeover' ? (
      <Siren className="h-4 w-4" aria-hidden="true" />
    ) : priority === 'priority' ? (
      <Flag className="h-4 w-4" aria-hidden="true" />
    ) : (
      <Clock3 className="h-4 w-4" aria-hidden="true" />
    );

  return (
    <article
      className={cn(
        'rounded-[1.25rem] border p-4 shadow-sm backdrop-blur-sm transition-colors lg:p-5',
        stateToneMap[resolvedState],
        className,
      )}
      data-testid={`playlist-item-${id}`}
      data-state={resolvedState}
      data-priority={priority}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.22em]">
        <span>{resolvedState}</span>
        <span
          className={cn('inline-flex items-center gap-1', priorityToneMap[priority])}
        >
          {priorityIcon}
          {priority}
        </span>
      </div>

      <div className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
        {label}
      </div>

      {detail && (
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-inherit/80 lg:text-lg">
          {detail}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-inherit/75 lg:text-base">
        {durationMs !== undefined && <span>Runs {formatPlaylistDuration(durationMs)}</span>}
        {timeRange && <span>{timeRange}</span>}
      </div>
    </article>
  );
}