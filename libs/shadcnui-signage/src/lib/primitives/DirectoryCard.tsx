import { FC } from 'react';
import { cn } from '@wallrun/shadcnui';
import { FloorBadge } from './FloorBadge';

export interface DirectoryCardProps {
  /**
   * Department or destination name
   */
  department: string;
  /**
   * Floor label or number
   */
  floor: number | string;
  /**
   * Room or room range
   */
  room: string;
  /**
   * Contact extension or phone label
   */
  phone: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

export const DirectoryCard: FC<DirectoryCardProps> = ({
  department,
  floor,
  room,
  phone,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-5 shadow-2xl backdrop-blur-md transition-all duration-300 sm:p-6 lg:p-8',
        className,
      )}
      style={style}
      data-testid="directory-card"
    >
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {department}
        </h2>
        <FloorBadge floor={floor} />
      </div>
      <div className="mb-4 h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-transparent sm:mb-6" />
      <div className="flex flex-col gap-2 text-lg sm:flex-row sm:items-center sm:justify-between sm:text-xl lg:text-2xl">
        <span className="font-semibold text-cyan-300">Room {room}</span>
        <span className="font-mono text-blue-300">{phone}</span>
      </div>
    </div>
  );
};