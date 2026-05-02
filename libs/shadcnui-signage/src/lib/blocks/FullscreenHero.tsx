import { type ReactNode } from 'react';
import { cn } from '../utils/cn';
import { getClampClass } from '../utils/clamp';
import type { Variant } from '../types/signage.types';

export type FullscreenHeroProps = {
  /**
   * Hero title text (max 2 lines)
   */
  title: string;

  /**
   * Optional subtitle text (max 2 lines)
   */
  subtitle?: string;

  /**
   * Optional body text (max 4 lines)
   */
  body?: string;

  /**
   * Optional call-to-action
   */
  cta?: {
    label: string;
    hint?: string;
  };

  /**
   * Color variant
   * @default 'light'
   */
  variant?: Variant;

  /**
   * Background image URL
   */
  backgroundImageUrl?: string;

  /**
   * Optional logo element
   */
  logo?: ReactNode;

  /**
   * Optional decorative content rendered after the title
   */
  decoration?: ReactNode;

  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;

  /**
   * Additional CSS classes for the title element
   */
  titleClassName?: string;

  /**
   * Additional CSS classes for the subtitle element
   */
  subtitleClassName?: string;

  /**
   * Additional CSS classes for the body element
   */
  bodyClassName?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
};

/**
 * FullscreenHero - Hero screen for announcements and welcome messages
 *
 * Provides a full-screen hero layout with strong typography hierarchy,
 * text clamping, and background image support with overlay for contrast.
 *
 * @example
 * ```tsx
 * <FullscreenHero
 *   title="Welcome to Our Event"
 *   subtitle="Join us for an amazing experience"
 *   variant="dark"
 *   backgroundImageUrl="/images/hero-bg.jpg"
 * />
 * ```
 */
export function FullscreenHero({
  title,
  subtitle,
  body,
  cta,
  variant = 'light',
  backgroundImageUrl,
  logo,
  decoration,
  contentClassName = '',
  titleClassName = '',
  subtitleClassName = '',
  bodyClassName = '',
  className = '',
}: FullscreenHeroProps) {
  const isDark = variant === 'dark';

  // Background styles
  const backgroundStyles = backgroundImageUrl
    ? {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-center p-16',
        isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900',
        className,
      )}
      style={backgroundStyles}
      data-testid="fullscreen-hero"
      data-variant={variant}
    >
      {/* Background overlay for contrast when image is present */}
      {backgroundImageUrl && (
        <div
          className={cn(
            'absolute inset-0',
            isDark ? 'bg-slate-900/75' : 'bg-white/75',
          )}
          aria-hidden="true"
        />
      )}

      {/* Content container */}
      <div
        className={cn(
          'relative z-10 flex max-w-6xl flex-col items-center text-center',
          contentClassName,
        )}
      >
        {/* Logo */}
        {logo && <div className="mb-8">{logo}</div>}

        {/* Title - max 2 lines */}
        <h1
          className={cn(
            'text-9xl font-bold',
            getClampClass(2),
            isDark ? 'text-white' : 'text-slate-900',
            titleClassName,
          )}
          data-testid="hero-title"
        >
          {title}
        </h1>

        {decoration && <div data-testid="hero-decoration">{decoration}</div>}

        {/* Subtitle - max 2 lines */}
        {subtitle && (
          <h2
            className={cn(
              'mt-6 text-5xl font-medium',
              getClampClass(2),
              isDark ? 'text-slate-200' : 'text-slate-700',
              subtitleClassName,
            )}
            data-testid="hero-subtitle"
          >
            {subtitle}
          </h2>
        )}

        {/* Body - max 4 lines */}
        {body && (
          <p
            className={cn(
              'mt-8 text-3xl',
              getClampClass(4),
              isDark ? 'text-slate-300' : 'text-slate-600',
              bodyClassName,
            )}
            data-testid="hero-body"
          >
            {body}
          </p>
        )}

        {/* Call to action */}
        {cta && (
          <div
            className="mt-12 flex flex-col items-center gap-3"
            data-testid="hero-cta"
          >
            <div
              className={cn(
                'rounded-lg px-12 py-6 text-4xl font-semibold',
                isDark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white',
              )}
            >
              {cta.label}
            </div>
            {cta.hint && (
              <p
                className={cn(
                  'text-xl',
                  isDark ? 'text-slate-400' : 'text-slate-500',
                )}
              >
                {cta.hint}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
