import type { NowProvider } from '../types/time.types';

export type PlaylistPriority = 'normal' | 'priority' | 'takeover';

export type PlaylistState = 'active' | 'next' | 'future' | 'expired';

export interface PlaylistEntry {
  id: string;
  label: string;
  detail?: string;
  startsAt?: Date | string | number;
  endsAt?: Date | string | number;
  durationMs?: number;
  priority?: PlaylistPriority;
}

export interface ResolvedPlaylistEntry extends PlaylistEntry {
  startsAtMs: number | null;
  endsAtMs: number | null;
  state: PlaylistState;
}

export function parsePlaylistTime(
  value: Date | string | number | undefined,
): number | null {
  if (value === undefined) {
    return null;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (value instanceof Date) {
    const epochMs = value.getTime();
    return Number.isFinite(epochMs) ? epochMs : null;
  }

  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function resolvePlaylistWindow(entry: PlaylistEntry) {
  const startsAtMs = parsePlaylistTime(entry.startsAt);
  const explicitEndMs = parsePlaylistTime(entry.endsAt);

  if (explicitEndMs !== null) {
    return {
      startsAtMs,
      endsAtMs: explicitEndMs,
    };
  }

  if (startsAtMs !== null && entry.durationMs !== undefined) {
    return {
      startsAtMs,
      endsAtMs: startsAtMs + entry.durationMs,
    };
  }

  return {
    startsAtMs,
    endsAtMs: null,
  };
}

export function resolvePlaylistState(
  entry: PlaylistEntry,
  now: NowProvider | number = Date.now(),
): PlaylistState {
  const nowMs = typeof now === 'number' ? now : now();
  const { startsAtMs, endsAtMs } = resolvePlaylistWindow(entry);

  if (endsAtMs !== null && endsAtMs <= nowMs) {
    return 'expired';
  }

  if (
    startsAtMs !== null &&
    startsAtMs <= nowMs &&
    (endsAtMs === null || nowMs < endsAtMs)
  ) {
    return 'active';
  }

  return 'future';
}

export function annotatePlaylistEntries(
  entries: PlaylistEntry[],
  now: NowProvider | number = Date.now(),
): ResolvedPlaylistEntry[] {
  const nowMs = typeof now === 'number' ? now : now();

  const resolved = entries.map((entry) => {
    const { startsAtMs, endsAtMs } = resolvePlaylistWindow(entry);

    return {
      ...entry,
      startsAtMs,
      endsAtMs,
      state: resolvePlaylistState(entry, nowMs),
    };
  });

  const activeIndex = resolved.findIndex((entry) => entry.state === 'active');

  const nextIndex = resolved.reduce<number>((selectedIndex, entry, index) => {
    if (entry.state !== 'future') {
      return selectedIndex;
    }

    if (selectedIndex < 0) {
      return index;
    }

    const selectedEntry = resolved[selectedIndex];
    const entryStartsAtMs =
      entry.startsAtMs === null ? Number.POSITIVE_INFINITY : entry.startsAtMs;
    const selectedStartsAtMs =
      selectedEntry.startsAtMs === null
        ? Number.POSITIVE_INFINITY
        : selectedEntry.startsAtMs;

    if (entryStartsAtMs < selectedStartsAtMs) {
      return index;
    }

    if (entryStartsAtMs === selectedStartsAtMs && index < selectedIndex) {
      return index;
    }

    return selectedIndex;
  }, -1);

  if (nextIndex >= 0) {
    resolved[nextIndex] = {
      ...resolved[nextIndex],
      state: 'next',
    };
  }

  return resolved;
}

export function formatPlaylistDuration(durationMs: number): string {
  const roundedSeconds = Math.max(0, Math.round(durationMs / 1000));

  if (roundedSeconds < 60) {
    return `${roundedSeconds}s`;
  }

  const minutes = Math.floor(roundedSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (remainderMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainderMinutes}m`;
}

export function formatPlaylistTime(
  epochMs: number,
  locale?: string,
  timeZone?: string,
): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  }).format(epochMs);
}

export function formatPlaylistTimeRange(
  startsAtMs: number | null,
  endsAtMs: number | null,
  locale?: string,
  timeZone?: string,
): string | null {
  if (startsAtMs === null) {
    return null;
  }

  const start = formatPlaylistTime(startsAtMs, locale, timeZone);

  if (endsAtMs === null) {
    return start;
  }

  const end = formatPlaylistTime(endsAtMs, locale, timeZone);
  return `${start} - ${end}`;
}