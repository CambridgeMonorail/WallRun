import { FC, ReactNode } from 'react';
import { cn } from '@wallrun/shadcnui';

export type GradientVariant =
  | 'emerald'
  | 'teal'
  | 'blue'
  | 'violet'
  | 'indigo'
  | 'pink'
  | 'orange'
  | 'cyan';

export interface SignageContainerProps {
  /**
   * Children to render inside the container
   */
  children: ReactNode;
  /**
   * Color theme variant for gradients and ambient effects
   */
  variant?: GradientVariant;
  /**
   * Whether to show grid overlay
   * @default true
   */
  showGrid?: boolean;
  /**
   * Whether to show ambient orb effects
   * @default true
   */
  showAmbientOrbs?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Data test ID for testing
   */
  'data-testid'?: string;
}

const gradientClasses: Record<GradientVariant, string> = {
  emerald: 'from-slate-950 via-emerald-950/30 to-slate-950',
  teal: 'from-slate-950 via-teal-950 to-slate-950',
  blue: 'from-slate-900 via-blue-950 to-slate-900',
  violet: 'from-violet-950 via-slate-950 to-indigo-950',
  indigo: 'from-indigo-950 via-purple-950 to-pink-950',
  pink: 'from-indigo-950 via-purple-950 to-pink-950',
  orange: 'from-slate-950 via-orange-950/20 to-slate-950',
  cyan: 'from-slate-900 via-cyan-950 to-slate-900',
};

const orbClasses: Record<
  GradientVariant,
  { primary: string; secondary: string; tertiary?: string }
> = {
  emerald: {
    primary: 'top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10',
    secondary: 'bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10',
  },
  teal: {
    primary:
      'inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent',
    secondary:
      'inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent',
  },
  blue: {
    primary: 'top-0 left-1/4 w-96 h-96 bg-blue-500/20',
    secondary: 'bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20',
  },
  violet: {
    primary:
      'inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent',
    secondary: '',
  },
  indigo: {
    primary: 'top-0 right-0 w-[600px] h-[600px] bg-pink-500/20',
    secondary: 'bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/20',
  },
  pink: {
    primary: 'top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 animate-pulse',
    secondary:
      'bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/20 animate-pulse [animation-delay:1s]',
    tertiary:
      'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 animate-pulse [animation-delay:2s]',
  },
  orange: {
    primary: 'top-1/4 right-1/4 w-96 h-96 bg-orange-500/10',
    secondary: 'bottom-1/4 left-1/4 w-96 h-96 bg-red-500/10',
  },
  cyan: {
    primary: 'top-0 left-1/4 w-96 h-96 bg-cyan-500/20',
    secondary: 'bottom-0 right-1/4 w-96 h-96 bg-blue-500/20',
  },
};

/**
 * SignageContainer provides a full-screen container for signage content with
 * ambient effects, gradient backgrounds, and optional grid overlays.
 *
 * @example
 * ```tsx
 * <SignageContainer variant="emerald" showGrid>
 *   <SignageHeader title="Welcome" subtitle="Digital Signage" />
 *   <div>Your content here</div>
 * </SignageContainer>
 * ```
 */
export const SignageContainer: FC<SignageContainerProps> = ({
  children,
  variant = 'emerald',
  showGrid = true,
  showAmbientOrbs = true,
  className,
  'data-testid': dataTestId,
}) => {
  const orbs = orbClasses[variant];

  return (
    <div
      className={cn(
        'relative min-h-screen overflow-hidden bg-gradient-to-br p-4 text-white sm:p-8 lg:p-16',
        gradientClasses[variant],
        className,
      )}
      data-testid={dataTestId}
    >
      {/* Ambient orb effects */}
      {showAmbientOrbs && (
        <>
          <div
            aria-hidden="true"
            className={cn('absolute rounded-full blur-3xl', orbs.primary)}
          />
          {orbs.secondary && (
            <div
              aria-hidden="true"
              className={cn('absolute rounded-full blur-3xl', orbs.secondary)}
            />
          )}
          {orbs.tertiary && (
            <div
              aria-hidden="true"
              className={cn('absolute rounded-full blur-3xl', orbs.tertiary)}
            />
          )}
        </>
      )}

      {/* Grid overlay */}
      {showGrid && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px]"
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
