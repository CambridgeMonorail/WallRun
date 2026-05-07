import { RefreshCw } from 'lucide-react';
import { cn } from '../utils/cn';
import type { NowProvider } from '../types/time.types';

export interface ReconnectingStateProps {
  active: boolean;
  title?: string;
  message?: string;
  lastConnectedAt?: Date | string;
  variant?: 'inline' | 'panel';
  now?: NowProvider;
  className?: string;
}

function toEpochMs(value: Date | string) {
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
}

function formatAge(ageMs: number) {
  if (ageMs < 60_000) {
    return 'moments ago';
  }

  const ageMin = Math.floor(ageMs / 60_000);
  if (ageMin < 60) {
    return `${ageMin}m ago`;
  }

  const ageHours = Math.floor(ageMin / 60);
  return `${ageHours}h ago`;
}

/**
 * Announces that a live region is reconnecting without collapsing the surrounding layout.
 */
export function ReconnectingState({
  active,
  title = 'Reconnecting live content',
  message = 'Trying to restore the live feed without interrupting the rest of the screen.',
  lastConnectedAt,
  variant = 'panel',
  now,
  className,
}: ReconnectingStateProps) {
  if (!active) {
    return null;
  }

  const current = (now ?? (() => Date.now()))();
  const lastLiveText = lastConnectedAt
    ? `Last live ${formatAge(Math.max(0, current - toEpochMs(lastConnectedAt)))}`
    : undefined;

  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-50 lg:text-base',
          className,
        )}
        data-testid="reconnecting-state"
        data-variant="inline"
        role="status"
      >
        <RefreshCw aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:animate-spin motion-reduce:animate-none" />
        <span>
          {title}
          {lastLiveText ? ` • ${lastLiveText}` : ''}
        </span>
      </div>
    );
  }

  return (
    <section
      className={cn(
        'rounded-[1.75rem] border border-sky-300/20 bg-sky-400/10 p-6 text-sky-50 shadow-[0_18px_56px_rgba(12,74,110,0.18)] lg:p-8',
        className,
      )}
      data-testid="reconnecting-state"
      data-variant="panel"
      role="status"
    >
      <div className="flex items-start gap-4">
        <RefreshCw aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 motion-safe:animate-spin motion-reduce:animate-none" />
        <div>
          <div className="text-sm font-medium uppercase tracking-[0.24em] text-sky-100/75 lg:text-base">
            Live feed recovery
          </div>
          <div className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">
            {title}
          </div>
          <p className="mt-3 text-lg text-sky-50/85 lg:text-xl">{message}</p>
          {lastLiveText ? (
            <div className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-sky-100/70 lg:text-base">
              {lastLiveText}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}