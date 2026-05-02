import { useEffect, useMemo, useRef } from 'react';
import { cn } from '../utils/cn';
import type { NowProvider } from '../types/time.types';
import { useTicker } from '../hooks/useTicker';

export interface CountdownProps {
  targetEpochMs: number;
  now?: NowProvider;
  format?: 'mm:ss' | 'HH:mm:ss' | 'human';
  onComplete?: () => void;
  className?: string;
}

function pad2(value: number) {
  return String(value).padStart(2, '0');
}

function formatRemaining(
  remainingMs: number,
  format: CountdownProps['format'],
) {
  const totalSeconds = Math.floor(remainingMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (format === 'HH:mm:ss') {
    return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
  }

  if (format === 'human') {
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (totalMinutes > 0) {
      return `${totalMinutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  // mm:ss (minutes can exceed 59)
  return `${pad2(totalMinutes)}:${pad2(seconds)}`;
}

/**
 * Countdown
 *
 * Countdown to a target time. Ticks once per second, clamps at 0, calls onComplete once.
 */
export function Countdown({
  targetEpochMs,
  now,
  format = 'mm:ss',
  onComplete,
  className,
}: CountdownProps) {
  useTicker({ intervalMs: 1000, alignTo: 'second', now });

  const completedRef = useRef(false);
  const current = (now ?? (() => Date.now()))();
  const remainingMs = Math.max(0, targetEpochMs - current);

  useEffect(() => {
    if (remainingMs === 0 && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [onComplete, remainingMs]);

  const value = useMemo(
    () => formatRemaining(remainingMs, format),
    [format, remainingMs],
  );

  return (
    <span className={cn('tabular-nums', className)} data-testid="countdown">
      {value}
    </span>
  );
}
