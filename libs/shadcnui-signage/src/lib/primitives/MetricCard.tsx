import { FC, ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface MetricCardProps {
  /**
   * Metric title/label
   */
  title: string;
  /**
   * Main metric value
   */
  value: string;
  /**
   * Change indicator text (e.g., "+12.5% vs last month")
   */
  change: string;
  /**
   * Whether the change is positive (green) or negative (red)
   */
  isPositive: boolean;
  /**
   * Icon to display (Lucide icon component)
   */
  icon: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * MetricCard displays a KPI or metric with value, change indicator, and icon.
 * Commonly used in dashboards and analytics displays.
 *
 * @example
 * ```tsx
 * import { DollarSign } from 'lucide-react';
 *
 * <MetricCard
 *   title="Total Revenue"
 *   value="$1.2M"
 *   change="+12.5% vs last month"
 *   isPositive={true}
 *   icon={<DollarSign className="w-14 h-14" />}
 * />
 * ```
 */
export const MetricCard: FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 p-5 shadow-2xl backdrop-blur-sm sm:p-6 lg:p-10',
        className,
      )}
    >
      {/* Ambient glow effect */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          isPositive
            ? 'from-green-500/5 to-transparent'
            : 'from-red-500/5 to-transparent',
        )}
      />

      <div className="relative z-10">
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-start sm:justify-between lg:mb-6">
          <h3 className="text-xl font-medium text-slate-400 sm:text-2xl lg:text-3xl">
            {title}
          </h3>
          <div className="text-slate-500 opacity-50 [&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-10 sm:[&_svg]:w-10 lg:[&_svg]:h-14 lg:[&_svg]:w-14">
            {icon}
          </div>
        </div>

        <div className="mb-4 text-4xl font-bold tracking-tight text-white sm:mb-5 sm:text-5xl lg:mb-6 lg:text-7xl">
          {value}
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center text-base font-bold sm:text-lg lg:text-2xl',
              isPositive ? 'text-green-400' : 'text-red-400',
            )}
          >
            {isPositive ? (
              <ArrowUp className="mr-2 h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            ) : (
              <ArrowDown className="mr-2 h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            )}
            <span>{change}</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r',
          isPositive
            ? 'from-green-500/50 via-emerald-500/50 to-green-500/50'
            : 'from-red-500/50 via-rose-500/50 to-red-500/50',
        )}
      />
    </div>
  );
};
