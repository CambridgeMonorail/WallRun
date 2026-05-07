import type { ReactNode } from 'react';
import { cn } from '../utils/cn';
import { getClampClass } from '../utils/clamp';

export interface OneMessageFrameProps {
  headline: string;
  supportingText?: string;
  action?: ReactNode;
  media?: ReactNode;
  utility?: ReactNode;
  className?: string;
}

/**
 * Enforces a signage-safe layout with one dominant message and one clear next step.
 */
export function OneMessageFrame({
  headline,
  supportingText,
  action,
  media,
  utility,
  className,
}: OneMessageFrameProps) {
  const hasMedia = Boolean(media);

  return (
    <section
      className={cn(
        'grid h-full w-full gap-10 rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 text-white shadow-[0_24px_80px_rgba(2,6,23,0.4)] lg:p-12',
        hasMedia ? 'lg:grid-cols-[1.15fr_0.85fr] lg:items-center' : 'max-w-6xl',
        className,
      )}
      data-testid="one-message-frame"
      data-has-media={hasMedia ? 'true' : 'false'}
    >
      <div className="flex min-h-0 flex-col justify-center gap-6 lg:gap-8">
        {utility ? (
          <div
            className="text-base font-medium uppercase tracking-[0.28em] text-slate-300 lg:text-lg"
            data-testid="one-message-utility"
          >
            {utility}
          </div>
        ) : null}
        <h1
          className="text-6xl font-semibold tracking-tight text-white sm:text-7xl lg:text-[6rem]"
          data-testid="one-message-headline"
        >
          {headline}
        </h1>
        {supportingText ? (
          <p
            className={cn(
              'max-w-4xl text-2xl leading-relaxed text-slate-200 lg:text-3xl',
              getClampClass(3),
            )}
            data-testid="one-message-supporting-text"
          >
            {supportingText}
          </p>
        ) : null}
        {action ? (
          <div
            className="pt-2"
            data-testid="one-message-action"
          >
            {action}
          </div>
        ) : null}
      </div>
      {media ? (
        <div
          className="flex min-h-[18rem] items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 lg:min-h-[24rem]"
          data-testid="one-message-media"
        >
          {media}
        </div>
      ) : null}
    </section>
  );
}