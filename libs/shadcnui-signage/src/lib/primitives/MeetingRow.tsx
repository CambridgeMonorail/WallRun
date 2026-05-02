import { FC } from 'react';
import { cn } from '@wallrun/shadcnui';

export interface MeetingRowProps {
  /**
   * Start time label
   */
  time: string;
  /**
   * Meeting title
   */
  title: string;
  /**
   * Room label
   */
  room: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const MeetingRow: FC<MeetingRowProps> = ({
  time,
  title,
  room,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-b border-white/10 py-3 last:border-b-0 sm:py-4 lg:flex-row lg:items-baseline lg:justify-between',
        className,
      )}
      data-testid="meeting-row"
    >
      <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-6">
        <div className="text-2xl font-semibold tabular-nums sm:text-3xl lg:text-4xl">
          {time}
        </div>
        <div className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </div>
      </div>
      <div className="text-xl text-white/70 tabular-nums sm:text-2xl lg:text-3xl">
        {room}
      </div>
    </div>
  );
};
