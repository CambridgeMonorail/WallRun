import { cn } from '../utils/cn';
import { formatPlaylistDuration } from '../utils/playlistRuntime';

export interface LoopProgressProps {
  elapsedMs: number;
  durationMs: number;
  label?: string;
  className?: string;
}

/**
 * LoopProgress
 *
 * Shows dwell progress for the currently active playlist item.
 */
export function LoopProgress({
  elapsedMs,
  durationMs,
  label = 'Current item progress',
  className,
}: LoopProgressProps) {
  const safeDurationMs = Math.max(durationMs, 1);
  const clampedElapsedMs = Math.min(Math.max(elapsedMs, 0), safeDurationMs);
  const percent = Math.round((clampedElapsedMs / safeDurationMs) * 100);
  const remainingMs = Math.max(0, safeDurationMs - clampedElapsedMs);

  return (
    <div className={cn('space-y-3', className)} data-testid="loop-progress">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm uppercase tracking-[0.22em] text-slate-300">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>

      <div
        className="h-3 w-full overflow-hidden rounded-full border border-white/10 bg-slate-950/70"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(56,189,248,0.95),rgba(250,204,21,0.92))] transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300 lg:text-base">
        <span>Elapsed {formatPlaylistDuration(clampedElapsedMs)}</span>
        <span>Remaining {formatPlaylistDuration(remainingMs)}</span>
      </div>
    </div>
  );
}