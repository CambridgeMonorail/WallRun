import { FC } from 'react';
import { cn } from '@wallrun/shadcnui';

export interface MenuItemProps {
  /**
   * Menu item name
   */
  name: string;
  /**
   * Price label
   */
  price: string;
  /**
   * Optional supporting description
   */
  description?: string;
  /**
   * Additional CSS classes for the outer wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the name/price row
   */
  rowClassName?: string;
  /**
   * Additional CSS classes for the item title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the price label
   */
  priceClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the divider
   */
  dividerClassName?: string;
  /**
   * Whether to hide the divider
   * @default false
   */
  hideDivider?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({
  name,
  price,
  description,
  className,
  rowClassName,
  titleClassName,
  priceClassName,
  descriptionClassName,
  dividerClassName,
  hideDivider = false,
}) => {
  return (
    <div className={cn('group', className)} data-testid="menu-item">
      <div
        className={cn(
          'mb-2 flex flex-col gap-2 sm:mb-3 sm:flex-row sm:items-baseline sm:justify-between',
          rowClassName,
        )}
      >
        <h3
          className={cn(
            'text-xl font-semibold text-white transition-colors group-hover:text-teal-300 sm:text-2xl lg:text-3xl',
            titleClassName,
          )}
        >
          {name}
        </h3>
        <span
          className={cn(
            'text-xl font-bold text-orange-400 sm:ml-4 sm:text-2xl lg:text-3xl',
            priceClassName,
          )}
        >
          {price}
        </span>
      </div>
      {description && (
        <p
          className={cn(
            'text-base leading-relaxed text-slate-400 sm:text-lg lg:text-xl',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
      {!hideDivider && (
        <div
          className={cn(
            'mt-4 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent sm:mt-6',
            dividerClassName,
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
