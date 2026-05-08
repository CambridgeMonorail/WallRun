import type { FC } from 'react';
import { cn } from '../utils/cn';

export type ShortUrlCalloutVariant = 'inline' | 'panel' | 'strip';

export type ShortUrlCalloutProps = {
  url: string;
  label?: string;
  prefix?: string;
  variant?: ShortUrlCalloutVariant;
  className?: string;
};

const variantClasses: Record<ShortUrlCalloutVariant, string> = {
  inline:
    'inline-flex flex-wrap items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm sm:text-base',
  panel:
    'flex w-full flex-col gap-3 rounded-[1.5rem] border border-white/12 bg-slate-950/65 p-5 text-left shadow-[0_18px_54px_rgba(2,6,23,0.24)]',
  strip:
    'flex w-full flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm sm:text-base',
};

/**
 * Large-format manual fallback URL for signage CTA surfaces.
 */
export const ShortUrlCallout: FC<ShortUrlCalloutProps> = ({
  url,
  label,
  prefix = 'Or type',
  variant = 'inline',
  className,
}) => {
  const displayLabel = label ?? 'Short URL';

  return (
    <div
      className={cn(variantClasses[variant], className)}
      data-testid="short-url-callout"
      data-variant={variant}
    >
      {variant === 'panel' ? (
        <div className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300 sm:text-sm">
          {displayLabel}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-left">
        <span className="text-sm font-medium text-slate-200/85 sm:text-base">
          {prefix}
        </span>
        <span className="font-mono text-base font-semibold tracking-[0.04em] text-white sm:text-lg lg:text-xl">
          {url}
        </span>
      </div>
      {variant !== 'panel' && label ? (
        <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300/85 sm:text-sm">
          {label}
        </span>
      ) : null}
    </div>
  );
};
