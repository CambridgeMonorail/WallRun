import { FC, ReactNode } from 'react';
import { cn } from '@wallrun/shadcnui';

export interface SignageHeaderProps {
  /**
   * Small tag/badge text above title
   */
  tag?: string;
  /**
   * Tag color variant
   */
  tagVariant?: 'emerald' | 'teal' | 'blue' | 'violet' | 'pink' | 'orange';
  /**
   * Main title text
   */
  title: string;
  /**
   * Optional subtitle/description
   */
  subtitle?: string;
  /**
   * Text alignment
   * @default 'center'
   */
  alignment?: 'left' | 'center';
  /**
   * Additional content to render after subtitle
   */
  children?: ReactNode;
  /**
   * Additional CSS classes for container
   */
  className?: string;
}

const tagVariantClasses: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-300',
  },
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    text: 'text-teal-300',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-300',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-300',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-300',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-300',
  },
};

/**
 * SignageHeader provides a consistent header pattern for signage displays
 * with optional tag, title, and subtitle.
 *
 * @example
 * ```tsx
 * <SignageHeader
 *   tag="Live Metrics"
 *   tagVariant="emerald"
 *   title="Performance Dashboard"
 *   subtitle="Real-time metrics • Updated every 5 minutes"
 * />
 * ```
 */
export const SignageHeader: FC<SignageHeaderProps> = ({
  tag,
  tagVariant = 'emerald',
  title,
  subtitle,
  alignment = 'center',
  children,
  className,
}) => {
  const tagClasses = tagVariantClasses[tagVariant];
  const alignmentClasses = alignment === 'center' ? 'text-center' : 'text-left';

  return (
    <header className={cn('mb-10 sm:mb-12 lg:mb-16', alignmentClasses, className)}>
      {tag && (
        <div
          className={cn(
            'mb-3 inline-block rounded-full border px-4 py-2 sm:mb-4 sm:px-5 lg:px-6',
            tagClasses.bg,
            tagClasses.border,
          )}
        >
          <p
            className={cn(
              'text-sm uppercase tracking-[0.3em] sm:text-base lg:text-xl',
              tagClasses.text,
            )}
          >
            {tag}
          </p>
        </div>
      )}
      <h1
        className={cn(
          'mb-4 text-5xl font-bold leading-none sm:text-6xl lg:text-8xl',
          tagVariant === 'emerald' &&
            'bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent',
          tagVariant === 'teal' &&
            'bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent',
          tagVariant === 'blue' &&
            'bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent',
          tagVariant === 'violet' &&
            'bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent',
          tagVariant === 'pink' &&
            'bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent',
          tagVariant === 'orange' &&
            'bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent',
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-base text-slate-400 sm:text-xl lg:text-3xl">
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
};
