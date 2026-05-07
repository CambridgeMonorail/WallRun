import { cn } from '../utils/cn';
import { LastUpdatedStamp } from './LastUpdatedStamp';

export interface NoContentFallbackProps {
  title?: string;
  message?: string;
  owner?: string;
  lastCheckedAt?: Date | string;
  variant?: 'public-safe' | 'operator-debug';
  className?: string;
}

/**
 * Prevents blank display regions when a feed, playlist, or schedule has nothing safe to show.
 */
export function NoContentFallback({
  title = 'Content temporarily unavailable',
  message = 'Please refer to the desk beside this screen for the latest assistance.',
  owner,
  lastCheckedAt,
  variant = 'public-safe',
  className,
}: NoContentFallbackProps) {
  const debugMode = variant === 'operator-debug';

  return (
    <section
      className={cn(
        'rounded-[2rem] border p-8 shadow-[0_24px_80px_rgba(2,6,23,0.32)] lg:p-10',
        debugMode
          ? 'border-amber-300/20 bg-amber-400/10 text-amber-50'
          : 'border-white/10 bg-slate-950/72 text-white',
        className,
      )}
      data-testid="no-content-fallback"
      data-variant={variant}
    >
      <div className="text-base font-medium uppercase tracking-[0.28em] text-inherit/75 lg:text-lg">
        {debugMode ? 'Operator fallback' : 'Fallback message'}
      </div>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-4xl text-xl leading-relaxed text-inherit/85 lg:text-2xl">
        {message}
      </p>
      {debugMode ? (
        <div className="mt-8 flex flex-wrap items-center gap-4" data-testid="no-content-debug-meta">
          {owner ? (
            <div className="rounded-full border border-amber-100/15 bg-slate-950/30 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-amber-50/85 lg:text-base">
              Owner: {owner}
            </div>
          ) : null}
          {lastCheckedAt ? (
            <LastUpdatedStamp
              updatedAt={lastCheckedAt}
              className="border-amber-100/15 bg-slate-950/30 text-amber-50"
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}