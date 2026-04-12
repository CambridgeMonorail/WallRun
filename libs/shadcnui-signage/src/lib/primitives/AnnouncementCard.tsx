import { FC, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@wallrun/shadcnui';

export interface AnnouncementCardProps {
  /**
   * Announcement title
   */
  title: string;
  /**
   * Announcement description/content
   */
  description: string;
  /**
   * Date or time information
   */
  date: string;
  /**
   * Icon component (Lucide icon)
   */
  icon: LucideIcon;
  /**
   * Category label (e.g., "Event", "Celebration", "Facility")
   */
  category: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Custom icon node (alternative to icon prop)
   */
  iconNode?: ReactNode;
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * AnnouncementCard displays announcement information with title, description,
 * date, icon, and category label.
 * Commonly used in announcement boards and bulletin displays.
 *
 * @example
 * ```tsx
 * import { Calendar } from 'lucide-react';
 *
 * <AnnouncementCard
 *   title="Team Building Event"
 *   description="Join us for our quarterly team building event at the park."
 *   date="Friday, Feb 14"
 *   icon={Calendar}
 *   category="Event"
 * />
 * ```
 */
export const AnnouncementCard: FC<AnnouncementCardProps> = ({
  title,
  description,
  date,
  icon: Icon,
  category,
  className,
  iconNode,
  style,
}) => {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-5 shadow-2xl backdrop-blur-lg sm:p-6 lg:p-10',
        className,
      )}
      style={style}
    >
      {/* Hover glow effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 sm:gap-5 lg:gap-6">
          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5 lg:gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-white/20 to-white/10 p-3 shadow-xl backdrop-blur-sm sm:p-4">
              {iconNode || (
                <Icon className="h-8 w-8 text-white sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:mb-4 lg:text-5xl">
                {title}
              </h2>
              <div className="mb-3 flex flex-wrap items-center gap-3 lg:mb-4 lg:gap-4">
                <div className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm sm:text-base lg:px-5 lg:py-2 lg:text-xl">
                  {category}
                </div>
                <span className="text-base text-white/80 sm:text-lg lg:text-2xl">
                  {date}
                </span>
              </div>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg lg:text-2xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
