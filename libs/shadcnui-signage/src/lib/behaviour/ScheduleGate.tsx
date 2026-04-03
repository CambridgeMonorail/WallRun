import { type ReactNode } from 'react';
import { cn } from '@wallrun/shadcnui';
import { toZonedTime } from 'date-fns-tz';
import type { NowProvider } from '../types/time.types';
import { useTicker } from '../hooks/useTicker';

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface ScheduleWindow {
  days?: Weekday[];
  start?: string; // "HH:MM" 24h
  end?: string; // "HH:MM" 24h
  timezone?: string; // optional IANA TZ
}

export interface ScheduleGateProps {
  windows: ScheduleWindow[];
  fallback?: ReactNode;
  now?: NowProvider;
  className?: string;
  children: ReactNode;
}

function weekdayFromDate(date: Date): Weekday {
  const day = date.getDay();
  if (day === 0) return 'sun';
  if (day === 1) return 'mon';
  if (day === 2) return 'tue';
  if (day === 3) return 'wed';
  if (day === 4) return 'thu';
  if (day === 5) return 'fri';
  return 'sat';
}

function parseTimeToMinutes(value: string | undefined): number | null {
  if (!value) {
    return null;
  }

  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value.trim());
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours * 60 + minutes;
}

function matchesWindow(epochMs: number, window: ScheduleWindow): boolean {
  const baseDate = new Date(epochMs);
  const date = window.timezone
    ? toZonedTime(baseDate, window.timezone)
    : baseDate;

  if (window.days && window.days.length > 0) {
    const weekday = weekdayFromDate(date);
    if (!window.days.includes(weekday)) {
      return false;
    }
  }

  const startMin = parseTimeToMinutes(window.start);
  const endMin = parseTimeToMinutes(window.end);
  if (startMin === null && endMin === null) {
    return true;
  }

  const currentMin = date.getHours() * 60 + date.getMinutes();

  if (startMin !== null && endMin === null) {
    return currentMin >= startMin;
  }

  if (startMin === null && endMin !== null) {
    return currentMin < endMin;
  }

  if (startMin === null || endMin === null) {
    return false;
  }

  if (startMin <= endMin) {
    return currentMin >= startMin && currentMin < endMin;
  }

  // Overnight window (e.g. 22:00-06:00)
  return currentMin >= startMin || currentMin < endMin;
}

/**
 * ScheduleGate
 *
 * Conditionally renders children based on day-of-week and time windows.
 */
export function ScheduleGate({
  windows,
  fallback = null,
  now,
  className,
  children,
}: ScheduleGateProps) {
  // useTicker causes component rerenders at minute boundaries
  // tick value isn't used, but the hook triggers rerenders
  useTicker({ intervalMs: 60_000, alignTo: 'minute', now });

  const epochMs = (now ?? (() => Date.now()))();
  const isAllowed = windows.some((w) => matchesWindow(epochMs, w));

  return (
    <div className={cn('w-full', className)} data-testid="schedule-gate">
      {isAllowed ? children : fallback}
    </div>
  );
}
