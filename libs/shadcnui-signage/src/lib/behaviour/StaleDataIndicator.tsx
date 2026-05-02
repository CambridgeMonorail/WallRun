import { useMemo } from 'react';
import { AlertTriangle, CheckCircle2, Clock3 } from 'lucide-react';
import { cn } from '../utils/cn';
import type { NowProvider } from '../types/time.types';
import { useTicker } from '../hooks/useTicker';

export interface StaleDataIndicatorProps {
  lastUpdatedEpochMs: number;
  warnAfterMin?: number;
  staleAfterMin?: number;
  now?: NowProvider;
  variant?: 'badge' | 'dot' | 'text';
  className?: string;
}

type FreshnessState = 'fresh' | 'warning' | 'stale';

function getFreshness(
  ageMin: number,
  warnAfterMin: number,
  staleAfterMin: number,
): FreshnessState {
  if (ageMin >= staleAfterMin) {
    return 'stale';
  }
  if (ageMin >= warnAfterMin) {
    return 'warning';
  }
  return 'fresh';
}

function formatAge(ageMin: number) {
  if (ageMin < 1) {
    return 'just now';
  }
  const rounded = Math.floor(ageMin);
  return `${rounded}m ago`;
}

/**
 * StaleDataIndicator
 *
 * Shows data freshness in a subtle, screen-safe way.
 */
export function StaleDataIndicator({
  lastUpdatedEpochMs,
  warnAfterMin = 5,
  staleAfterMin = 15,
  now,
  variant = 'badge',
  className,
}: StaleDataIndicatorProps) {
  useTicker({ intervalMs: 60_000, alignTo: 'minute', now });

  const current = (now ?? (() => Date.now()))();
  const ageMin = Math.max(0, (current - lastUpdatedEpochMs) / 60_000);

  const state = useMemo(
    () => getFreshness(ageMin, warnAfterMin, staleAfterMin),
    [ageMin, staleAfterMin, warnAfterMin],
  );

  const label =
    state === 'fresh' ? 'Fresh' : state === 'warning' ? 'Aging' : 'Stale';
  const ageText = formatAge(ageMin);

  const icon =
    state === 'fresh' ? (
      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
    ) : state === 'warning' ? (
      <Clock3 className="h-4 w-4" aria-hidden="true" />
    ) : (
      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
    );

  const tone =
    state === 'fresh'
      ? 'text-emerald-300 border-emerald-500/20 bg-emerald-500/10'
      : state === 'warning'
        ? 'text-amber-300 border-amber-500/20 bg-amber-500/10'
        : 'text-rose-300 border-rose-500/20 bg-rose-500/10';

  if (variant === 'text') {
    return (
      <div
        className={cn('text-sm text-slate-300', className)}
        role="status"
        data-testid="stale-data-indicator"
      >
        {label} • updated {ageText}
      </div>
    );
  }

  if (variant === 'dot') {
    return (
      <div
        className={cn('inline-flex items-center gap-2 text-sm', className)}
        role="status"
        aria-label={`Data ${label.toLowerCase()}, updated ${ageText}`}
        data-testid="stale-data-indicator"
      >
        <span
          className={cn('h-2.5 w-2.5 rounded-full border', tone)}
          aria-hidden="true"
        />
        <span className="text-slate-300">
          {label} <span className="text-slate-400">({ageText})</span>
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm',
        tone,
        className,
      )}
      role="status"
      aria-label={`Data ${label.toLowerCase()}, updated ${ageText}`}
      data-testid="stale-data-indicator"
    >
      {icon}
      <span>
        {label} <span className="opacity-80">({ageText})</span>
      </span>
    </div>
  );
}
