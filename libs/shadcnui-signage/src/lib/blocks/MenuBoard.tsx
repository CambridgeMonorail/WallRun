import { FC, ReactNode } from 'react';
import { cn } from '../utils/cn';
import { SignageContainer } from '../layouts/SignageContainer';
import type { GradientVariant } from '../layouts/SignageContainer';

export interface MenuBoardProps {
  /**
   * Root test id
   */
  'data-testid'?: string;
  /**
   * Small eyebrow label above the title
   */
  eyebrow?: string;
  /**
   * Visual treatment for the eyebrow label
   * @default 'pill'
   */
  eyebrowVariant?: 'pill' | 'plain';
  /**
   * Main board title
   */
  title: string;
  /**
   * Optional subtitle below the title
   */
  subtitle?: string;
  /**
   * Optional content in the right side of the header
   */
  headerRight?: ReactNode;
  /**
   * Main board content
   */
  children: ReactNode;
  /**
   * Optional footer content
   */
  footer?: ReactNode;
  /**
   * Background variant for the signage container
   * @default 'teal'
   */
  variant?: GradientVariant;
  /**
   * Additional classes for the outer signage container
   */
  className?: string;
  /**
   * Additional classes for the inner shell wrapper
   */
  shellClassName?: string;
  /**
   * Optional test id for the inner shell wrapper
   */
  shellTestId?: string;
  /**
   * Additional classes for the header
   */
  headerClassName?: string;
  /**
   * Additional classes for the eyebrow label
   */
  eyebrowClassName?: string;
  /**
   * Additional classes for the title
   */
  titleClassName?: string;
  /**
   * Additional classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional classes for the content wrapper
   */
  contentClassName?: string;
}

export const MenuBoard: FC<MenuBoardProps> = ({
  'data-testid': dataTestId,
  eyebrow,
  eyebrowVariant = 'pill',
  title,
  subtitle,
  headerRight,
  children,
  footer,
  variant = 'teal',
  className,
  shellClassName,
  shellTestId,
  headerClassName,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
  contentClassName,
}) => {
  return (
    <SignageContainer
      variant={variant}
      className={cn('p-4 text-white sm:p-8 lg:p-16', className)}
      data-testid={dataTestId}
    >
      <div className={shellClassName} data-testid={shellTestId}>
        <div
          className={cn(
            'mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-16 lg:flex-row lg:items-start lg:justify-between',
            headerClassName,
          )}
        >
          <div>
            {eyebrow &&
              (eyebrowVariant === 'pill' ? (
                <div
                  className={cn(
                    'mb-4 inline-block rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 sm:mb-6 sm:px-6 sm:py-3 lg:px-8',
                    eyebrowClassName,
                  )}
                >
                  <p className="text-sm tracking-[0.3em] text-teal-300 sm:text-lg lg:text-2xl">
                    {eyebrow}
                  </p>
                </div>
              ) : (
                <div
                  className={cn(
                    'text-lg text-white/70 sm:text-xl lg:text-2xl',
                    eyebrowClassName,
                  )}
                >
                  {eyebrow}
                </div>
              ))}
            <h1
              className={cn(
                'text-5xl font-bold leading-none text-white sm:text-6xl lg:text-8xl',
                titleClassName,
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  'text-lg tracking-[0.2em] text-slate-300 sm:text-2xl lg:text-3xl',
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {headerRight}
        </div>

        <div className={contentClassName}>{children}</div>

        {footer}
      </div>
    </SignageContainer>
  );
};
