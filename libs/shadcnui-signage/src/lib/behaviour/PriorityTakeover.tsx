import type { ReactNode } from 'react';
import { Siren } from 'lucide-react';
import { cn } from '../utils/cn';
import {
  formatPlaylistTime,
  parsePlaylistTime,
  type PlaylistPriority,
} from '../utils/playlistRuntime';

export interface PriorityTakeoverProps {
  active: boolean;
  title: string;
  message: string;
  priority?: Extract<PlaylistPriority, 'priority' | 'takeover'>;
  activeUntil?: Date | string | number;
  locale?: string;
  timeZone?: string;
  fallback?: ReactNode;
  className?: string;
}

/**
 * PriorityTakeover
 *
 * Gives urgent loop interruptions a distinct, operator-safe treatment.
 */
export function PriorityTakeover({
  active,
  title,
  message,
  priority = 'takeover',
  activeUntil,
  locale,
  timeZone,
  fallback = null,
  className,
}: PriorityTakeoverProps) {
  if (!active) {
    return fallback;
  }

  const activeUntilMs = parsePlaylistTime(activeUntil);
  const activeUntilLabel =
    activeUntilMs === null
      ? null
      : formatPlaylistTime(activeUntilMs, locale, timeZone);

  return (
    <section
      className={cn(
        'rounded-[1.75rem] border border-rose-300/30 bg-[linear-gradient(135deg,rgba(127,29,29,0.92),rgba(69,10,10,0.96))] p-6 text-rose-50 shadow-2xl lg:p-8',
        className,
      )}
      data-testid="priority-takeover"
      data-priority={priority}
    >
      <div className="flex flex-wrap items-center gap-3 text-sm font-medium uppercase tracking-[0.28em] text-rose-100/80">
        <Siren className="h-4 w-4" aria-hidden="true" />
        <span>
          {priority === 'takeover' ? 'Takeover active' : 'Priority interrupt'}
        </span>
      </div>

      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-4xl">
        {title}
      </h3>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-rose-50/90 lg:text-xl">
        {message}
      </p>

      {activeUntilLabel && (
        <div className="mt-5 text-sm uppercase tracking-[0.22em] text-rose-100/75 lg:text-base">
          Active until {activeUntilLabel}
        </div>
      )}
    </section>
  );
}