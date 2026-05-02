import { FC } from 'react';
import { cn } from '@wallrun/shadcnui';

export interface FloorBadgeProps {
  /**
   * Floor label or number
   */
  floor: number | string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const FloorBadge: FC<FloorBadgeProps> = ({ floor, className }) => {
  return (
    <div
      className={cn(
        'w-fit rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow-lg sm:text-base lg:px-5 lg:text-xl',
        className,
      )}
      data-testid="floor-badge"
    >
      Floor {floor}
    </div>
  );
};