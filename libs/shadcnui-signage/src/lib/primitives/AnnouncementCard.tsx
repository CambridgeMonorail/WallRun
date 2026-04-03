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
        'bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden group',
        className,
      )}
      style={style}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-6 flex-1">
            <div className="p-4 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl shadow-xl">
              {iconNode || <Icon className="w-12 h-12 text-white" />}
            </div>
            <div className="flex-1">
              <h2 className="text-5xl font-bold text-white mb-4">{title}</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm text-white text-xl px-5 py-2 rounded-full font-semibold">
                  {category}
                </div>
                <span className="text-2xl text-white/80">{date}</span>
              </div>
              <p className="text-2xl text-white/90 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
