import { FC } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

export type CTABannerVariant = 'default' | 'accent' | 'gradient';

export interface CTABannerAction {
  /**
   * Action label shown as a link inside the banner
   */
  label: string;
  /**
   * Link target for the action
   */
  href: string;
}

export interface CTABannerProps {
  /**
   * Main callout message
   */
  message: string;
  /**
   * Optional leading icon for the banner message
   */
  icon?: LucideIcon;
  /**
   * Visual style variant
   */
  variant?: CTABannerVariant;
  /**
   * Optional link action displayed after the message
   */
  action?: CTABannerAction;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const variantClasses: Record<CTABannerVariant, string> = {
  default:
    'border border-slate-700/60 bg-slate-900/70 text-slate-100 backdrop-blur-sm',
  accent:
    'border border-blue-400/40 bg-gradient-to-r from-blue-600/85 via-cyan-600/80 to-blue-600/85 text-white shadow-2xl shadow-cyan-950/30',
  gradient:
    'border border-fuchsia-300/30 bg-gradient-to-r from-violet-600/85 via-fuchsia-600/80 to-pink-600/85 text-white shadow-2xl shadow-fuchsia-950/30',
};

/**
 * Distance-readable footer callout banner for signage support and promo messages.
 */
export const CTABanner: FC<CTABannerProps> = ({
  message,
  icon: Icon,
  variant = 'default',
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex w-full max-w-5xl flex-col items-center justify-center gap-3 rounded-3xl px-5 py-4 text-center sm:px-8 sm:py-5 lg:px-12 lg:py-6',
        variantClasses[variant],
        className,
      )}
      data-testid="cta-banner"
      data-variant={variant}
    >
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        {Icon ? (
          <Icon
            aria-hidden="true"
            className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
          />
        ) : null}
        <p className="text-base font-medium leading-snug tracking-[0.01em] sm:text-lg lg:text-2xl">
          {message}
        </p>
      </div>

      {action ? (
        <a
          href={action.href}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-base"
        >
          {action.label}
        </a>
      ) : null}
    </div>
  );
};