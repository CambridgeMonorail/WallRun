import { FC } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@wallrun/shadcnui';

export interface LocationIndicatorProps {
  /**
   * Current viewer location label
   */
  location: string;
  /**
   * Prefix label shown before the location value
   * @default 'You are here:'
   */
  label?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const LocationIndicator: FC<LocationIndicatorProps> = ({
  location,
  label = 'You are here:',
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 rounded-full border border-blue-800/50 bg-blue-950/50 px-4 py-3 text-base text-cyan-300 backdrop-blur-sm sm:gap-4 sm:px-6 sm:text-xl lg:px-8 lg:py-4 lg:text-3xl',
        className,
      )}
      data-testid="location-indicator"
    >
      <MapPin className="h-6 w-6 shrink-0 lg:h-10 lg:w-10" aria-hidden="true" />
      <span>
        {label} {location}
      </span>
    </div>
  );
};