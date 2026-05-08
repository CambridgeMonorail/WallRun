import type { FC, ReactNode } from 'react';
import { cn } from '../utils/cn';

export type ActionStripTone = 'brand' | 'neutral' | 'urgent';
export type ActionStripPosition = 'bottom' | 'left' | 'right';

export type ActionStripProps = {
  /**
   * Dominant CTA copy shown within the strip.
   */
  message: string;
  /**
   * Optional leading visual such as an icon or badge.
   */
  leadingVisual?: ReactNode;
  /**
   * Optional action node. Prefer anchors for navigation and handoff actions.
   */
  action?: ReactNode;
  /**
   * Placement variant for bottom or side CTA zones.
   */
  position?: ActionStripPosition;
  /**
   * Tone variant for neutral, brand, or urgent CTA emphasis.
   */
  tone?: ActionStripTone;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Optional stable variant marker for compatibility wrappers.
   */
  'data-variant'?: string;
  /**
   * Test id override for focused assertions.
   */
  'data-testid'?: string;
};

const toneClasses: Record<ActionStripTone, string> = {
  neutral:
    'border border-slate-700/60 bg-slate-900/70 text-slate-100 backdrop-blur-sm',
  brand:
    'border border-blue-400/40 bg-gradient-to-r from-blue-600/85 via-cyan-600/80 to-blue-600/85 text-white shadow-2xl shadow-cyan-950/30',
  urgent:
    'border border-fuchsia-300/30 bg-gradient-to-r from-violet-600/85 via-fuchsia-600/80 to-pink-600/85 text-white shadow-2xl shadow-fuchsia-950/30',
};

const positionClasses: Record<ActionStripPosition, string> = {
  bottom:
    'inline-flex w-full max-w-5xl flex-col items-center justify-center gap-3 text-center sm:px-8 sm:py-5',
  left: 'inline-flex w-full max-w-5xl flex-col items-start justify-between gap-5 text-left lg:flex-row lg:items-center',
  right:
    'inline-flex w-full max-w-5xl flex-col items-start justify-between gap-5 text-left lg:flex-row-reverse lg:items-center lg:text-right',
};

/**
 * Reusable CTA shell for footer strips and side-zone calls to action on signage layouts.
 */
export const ActionStrip: FC<ActionStripProps> = ({
  message,
  leadingVisual,
  action,
  position = 'bottom',
  tone = 'neutral',
  className,
  'data-variant': dataVariant,
  'data-testid': dataTestId = 'action-strip',
}) => {
  return (
    <div
      className={cn(
        'rounded-3xl px-5 py-4 lg:px-12 lg:py-6',
        toneClasses[tone],
        positionClasses[position],
        className,
      )}
      data-testid={dataTestId}
      data-variant={dataVariant}
      data-position={position}
      data-tone={tone}
    >
      <div
        className={cn(
          'flex w-full gap-3',
          position === 'bottom'
            ? leadingVisual
              ? 'flex-col items-center justify-center sm:flex-row sm:gap-4'
              : 'flex-col items-center justify-center sm:gap-4'
            : 'items-start lg:max-w-[70%]',
        )}
      >
        {leadingVisual ? (
          <div
            className={cn(
              'shrink-0',
              position === 'bottom'
                ? 'flex items-center justify-center'
                : 'pt-1',
            )}
            data-testid={`${dataTestId}-leading-visual`}
          >
            {leadingVisual}
          </div>
        ) : null}
        <p
          className={cn(
            'font-medium leading-snug tracking-[0.01em] text-base sm:text-lg lg:text-2xl',
            position === 'bottom'
              ? 'text-center'
              : position === 'right'
                ? 'text-right'
                : 'text-left',
          )}
        >
          {message}
        </p>
      </div>

      {action ? (
        <div
          className={cn(
            'shrink-0',
            position === 'bottom'
              ? 'flex items-center justify-center'
              : 'flex items-center',
          )}
          data-testid={`${dataTestId}-action`}
        >
          {action}
        </div>
      ) : null}
    </div>
  );
};
