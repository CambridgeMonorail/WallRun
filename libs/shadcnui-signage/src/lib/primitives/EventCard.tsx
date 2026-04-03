import { FC } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { cn } from '@wallrun/shadcnui';

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
        'bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden group',
        className,
      )}
    >
      {/* Accent line */}
      <div
        className={cn('absolute left-0 top-0 bottom-0 w-1.5', finalTrackColor)}
      />

      <div className="flex items-start justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-3 text-3xl font-bold text-white bg-slate-950/50 px-6 py-3 rounded-xl border border-slate-700/50">
              <Clock className="w-8 h-8 text-violet-400" />
              {time}
            </div>
            <div
              className={cn(
                finalTrackColor,
                'text-white text-xl px-6 py-2 rounded-full font-bold shadow-lg',
              )}
            >
              {track}
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            {title}
          </h2>
          <div className="flex items-center gap-8 text-2xl">
            <span className="text-violet-300 font-semibold">{speaker}</span>
            <div className="flex items-center gap-3 text-slate-400">
              <MapPin className="w-6 h-6 text-fuchsia-400" />
              <span>{room}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
