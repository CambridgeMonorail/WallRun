import { FC } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

export interface EventCardProps {
  /**
   * Event time (e.g., "9:00 AM")
   */
  time: string;
  /**
   * Event title
   */
  title: string;
  /**
   * Speaker or presenter name
   */
  speaker: string;
  /**
   * Room or location
   */
  room: string;
  /**
   * Event track/category (e.g., "Keynote", "Technical", "Design")
   */
  track: string;
  /**
   * Custom track color (Tailwind background class)
   * @default 'bg-slate-600'
   */
  trackColor?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const defaultTrackColors: Record<string, string> = {
  Keynote: 'bg-purple-600',
  Technical: 'bg-blue-600',
  Design: 'bg-green-600',
  Business: 'bg-orange-600',
  Social: 'bg-pink-600',
};

/**
 * EventCard displays event information with time, title, speaker, location, and track.
 * Commonly used in event schedules and conference displays.
 *
 * @example
 * ```tsx
 * <EventCard
 *   time="9:00 AM"
 *   title="Opening Keynote: The Future of Digital Signage"
 *   speaker="Dr. Sarah Chen"
 *   room="Main Auditorium"
 *   track="Keynote"
 * />
 * ```
 */
export const EventCard: FC<EventCardProps> = ({
  time,
  title,
  speaker,
  room,
  track,
  trackColor,
  className,
}) => {
  const finalTrackColor =
    trackColor || defaultTrackColors[track] || 'bg-slate-600';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 p-5 shadow-2xl backdrop-blur-md sm:p-6 lg:p-8',
        className,
      )}
    >
      {/* Accent line */}
      <div
        className={cn('absolute left-0 top-0 bottom-0 w-1.5', finalTrackColor)}
      />

      <div className="flex items-start justify-between gap-4 sm:gap-6 lg:gap-8">
        <div className="flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-3 lg:gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-950/50 px-4 py-2 text-lg font-bold text-white sm:text-2xl lg:gap-3 lg:px-6 lg:py-3 lg:text-3xl">
              <Clock className="h-5 w-5 text-violet-400 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
              {time}
            </div>
            <div
              className={cn(
                finalTrackColor,
                'rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-lg sm:text-base lg:px-6 lg:py-2 lg:text-xl',
              )}
            >
              {track}
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:mb-4 lg:text-4xl">
            {title}
          </h2>
          <div className="flex flex-col gap-2 text-base sm:text-lg lg:flex-row lg:items-center lg:gap-8 lg:text-2xl">
            <span className="font-semibold text-violet-300">{speaker}</span>
            <div className="flex items-center gap-2 text-slate-400 lg:gap-3">
              <MapPin className="h-4 w-4 text-fuchsia-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              <span>{room}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
