import { FC } from 'react';
import { cn } from '@wallrun/shadcnui';

export interface InfoListProps {
  /**
   * Items to display in the list
   */
  items: string[];
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for each item
   */
  itemClassName?: string;
}

export const InfoList: FC<InfoListProps> = ({
  items,
  className,
  itemClassName,
}) => {
  return (
    <ul
      className={cn(
        'mt-4 space-y-3 text-lg text-white/70 sm:text-2xl lg:mt-5 lg:space-y-4 lg:text-3xl',
        className,
      )}
      data-testid="info-list"
    >
      {items.map((item) => (
        <li key={item} className={itemClassName}>
          {item}
        </li>
      ))}
    </ul>
  );
};
