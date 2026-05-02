import { FC, ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface MenuSectionProps {
  /**
   * Section heading
   */
  title: string;
  /**
   * Section items/content
   */
  children: ReactNode;
  /**
   * Additional CSS classes for the outer container
   */
  className?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the accent divider
   */
  accentClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
}

export const MenuSection: FC<MenuSectionProps> = ({
  title,
  children,
  className,
  titleClassName,
  accentClassName,
  contentClassName,
}) => {
  return (
    <section className={className} data-testid="menu-section">
      <div className="mb-6 sm:mb-8">
        <h2
          className={cn(
            'mb-2 text-3xl font-bold text-teal-400 sm:text-4xl lg:text-5xl',
            titleClassName,
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            'h-1 w-20 rounded-full bg-gradient-to-r from-teal-500 to-orange-500',
            accentClassName,
          )}
          aria-hidden="true"
        />
      </div>
      <div className={contentClassName}>{children}</div>
    </section>
  );
};
