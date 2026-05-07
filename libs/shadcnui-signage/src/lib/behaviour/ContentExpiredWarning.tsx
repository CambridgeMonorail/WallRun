import { AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';
import type { NowProvider } from '../types/time.types';

export interface ContentExpiredWarningProps {
  expiredAt: Date | string;
  label?: string;
  variant?: 'badge' | 'panel' | 'overlay';
  now?: NowProvider;
  className?: string;
}

function toEpochMs(value: Date | string) {
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
}

function formatAge(ageMs: number) {
  const ageMin = Math.floor(ageMs / 60_000);
  if (ageMin < 60) {
    return `${Math.max(ageMin, 1)}m ago`;
  }

  const ageHours = Math.floor(ageMin / 60);
  if (ageHours < 24) {
    return `${ageHours}h ago`;
  }

  return `${Math.floor(ageHours / 24)}d ago`;
}

/**
 * Highlights content that is beyond its approved display window.
 */
export function ContentExpiredWarning({
  expiredAt,
  label = 'Content expired',
  variant = 'badge',
  now,
  className,
}: ContentExpiredWarningProps) {
  const current = (now ?? (() => Date.now()))();
  const expiredEpochMs = toEpochMs(expiredAt);

  if (current < expiredEpochMs) {
    return null;
  }

  const expiredText = formatAge(current - expiredEpochMs);

  if (variant === 'panel') {
    return (
      <section
        className={cn(
          'rounded-[1.75rem] border border-rose-300/20 bg-rose-400/10 p-6 text-rose-50 shadow-[0_18px_56px_rgba(136,19,55,0.24)] lg:p-8',
          className,
        )}
        data-testid="content-expired-warning"
        data-variant="panel"
      >
        <div className="flex items-start gap-4">
          <AlertTriangle aria-hidden="true" className="mt-1 h-6 w-6 shrink-0" />
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-rose-100/75 lg:text-base">
              Expired content
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">
              {label}
            </div>
            <p className="mt-3 text-lg text-rose-50/85 lg:text-xl">
              Expired {expiredText}. Remove from the live loop or replace with an approved fallback.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'overlay') {
    return (
      <div
        className={cn(
          'absolute inset-x-6 top-6 z-20 inline-flex items-center justify-center gap-3 rounded-full border border-rose-300/25 bg-rose-500/90 px-6 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur-sm',
          className,
        )}
        data-testid="content-expired-warning"
        data-variant="overlay"
        role="status"
      >
        <AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0" />
        <span>
          {label} • expired {expiredText}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-400/10 px-3 py-1.5 text-sm font-medium text-rose-50 lg:text-base',
        className,
      )}
      data-testid="content-expired-warning"
      data-variant="badge"
      role="status"
    >
      <AlertTriangle aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span>
        {label} • expired {expiredText}
      </span>
    </div>
  );
}