import { useMemo } from 'react';
import { AlertTriangle, Clock3 } from 'lucide-react';
import { cn } from '../utils/cn';
import type { NowProvider } from '../types/time.types';
import { useTicker } from '../hooks/useTicker';

export type LastUpdatedStampFormat = 'relative' | 'absolute' | 'time';

export interface LastUpdatedStampProps {
  updatedAt: Date | string;
  staleAfterMs?: number;
  format?: LastUpdatedStampFormat;
  locale?: string;
  timeZone?: string;
  now?: NowProvider;
  className?: string;
}

function toEpochMs(value: Date | string) {
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
}

function formatRelativeAge(ageMs: number) {
  if (ageMs < 60_000) {
    return 'just now';
  }

  const ageMin = Math.floor(ageMs / 60_000);
  if (ageMin < 60) {
    return `${ageMin}m ago`;
  }

  const ageHours = Math.floor(ageMin / 60);
  if (ageHours < 24) {
    return `${ageHours}h ago`;
  }

  const ageDays = Math.floor(ageHours / 24);
  return `${ageDays}d ago`;
}

function formatTimestamp(
  value: Date,
  format: LastUpdatedStampFormat,
  locale?: string,
  timeZone?: string,
) {
  if (format === 'time') {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      timeZone,
    }).format(value);
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  }).format(value);
}

/**
 * Shows when a feed or message was last updated without overpowering the main content.
 */
export function LastUpdatedStamp({
  updatedAt,
  staleAfterMs = 15 * 60_000,
  format = 'relative',
  locale,
  timeZone,
  now,
  className,
}: LastUpdatedStampProps) {
  useTicker({
    intervalMs: 60_000,
    alignTo: format === 'relative' ? 'minute' : 'none',
    now,
  });

  const current = (now ?? (() => Date.now()))();
  const updatedEpochMs = toEpochMs(updatedAt);
  const ageMs = Math.max(0, current - updatedEpochMs);
  const stale = ageMs >= staleAfterMs;

  const dateValue = useMemo(() => new Date(updatedEpochMs), [updatedEpochMs]);

  const text =
    format === 'relative'
      ? formatRelativeAge(ageMs)
      : formatTimestamp(dateValue, format, locale, timeZone);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium tracking-[0.02em] sm:text-base',
        stale
          ? 'border-amber-300/30 bg-amber-400/12 text-amber-50'
          : 'border-white/12 bg-white/6 text-slate-100',
        className,
      )}
      role="status"
      aria-label={`Last updated ${text}${stale ? ', stale' : ''}`}
      data-testid="last-updated-stamp"
      data-stale={stale ? 'true' : 'false'}
    >
      {stale ? (
        <AlertTriangle aria-hidden="true" className="h-4 w-4 shrink-0" />
      ) : (
        <Clock3 aria-hidden="true" className="h-4 w-4 shrink-0" />
      )}
      <span>
        Last updated {text}
        {stale ? ' • stale' : ''}
      </span>
    </div>
  );
}