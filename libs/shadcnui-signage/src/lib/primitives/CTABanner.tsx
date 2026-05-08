import { FC } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ActionStrip } from './ActionStrip';

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

const variantToneMap: Record<CTABannerVariant, 'neutral' | 'brand' | 'urgent'> =
  {
    default: 'neutral',
    accent: 'brand',
    gradient: 'urgent',
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
    <ActionStrip
      message={message}
      leadingVisual={
        Icon ? (
          <Icon
            aria-hidden="true"
            className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
          />
        ) : undefined
      }
      action={
        action ? (
          <a
            href={action.href}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-base"
          >
            {action.label}
          </a>
        ) : undefined
      }
      tone={variantToneMap[variant]}
      position="bottom"
      className={className}
      data-variant={variant}
      data-testid="cta-banner"
    />
  );
};
