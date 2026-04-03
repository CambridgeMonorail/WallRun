import { useMemo } from 'react';
import { cn } from '@wallrun/shadcnui';
import type { NowProvider } from '../types/time.types';
import { useTicker } from '../hooks/useTicker';

export interface ClockProps {
  format?: 'HH:mm' | 'HH:mm:ss';
  timezone?: string;
  locale?: string;
  now?: NowProvider;
  className?: string;
}

function formatTimeParts(
  epochMs: number,
  options: { timezone?: string; locale?: string; includeSeconds: boolean },
) {
  const date = new Date(epochMs);
  const formatter = new Intl.DateTimeFormat(options.locale, {
    timeZone: options.timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: options.includeSeconds ? '2-digit' : undefined,
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const partMap = new Map(parts.map((p) => [p.type, p.value] as const));
  const hh = partMap.get('hour') ?? '00';
  const mm = partMap.get('minute') ?? '00';
  if (!options.includeSeconds) {
    return `${hh}:${mm}`;
  }
  const ss = partMap.get('second') ?? '00';
  return `${hh}:${mm}:${ss}`;
}

/**
 * Clock
 *
 * A signage-ready clock with large, readable display.
 */
export function Clock({
  format = 'HH:mm',
  timezone,
  locale,
  now,
  className,
}: ClockProps) {
  const includeSeconds = format === 'HH:mm:ss';
  useTicker({
    intervalMs: includeSeconds ? 1000 : 60_000,
    alignTo: includeSeconds ? 'second' : 'minute',
    now,
  });

  const current = (now ?? (() => Date.now()))();
  const value = useMemo(
    () => formatTimeParts(current, { timezone, locale, includeSeconds }),
    [current, includeSeconds, locale, timezone],
  );

  return (
    <time
      className={cn('tabular-nums', className)}
      dateTime={value}
      data-testid="clock"
    >
      {value}
    </time>
  );
}
