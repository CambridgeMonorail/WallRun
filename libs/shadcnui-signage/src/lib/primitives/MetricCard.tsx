import { FC, ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@wallrun/shadcnui';

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
        'bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-10 shadow-2xl relative overflow-hidden group',
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
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-medium text-slate-400">{title}</h3>
          <div className="text-slate-500 opacity-50">{icon}</div>
        </div>

        <div className="text-7xl font-bold text-white mb-6 tracking-tight">
          {value}
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center text-2xl font-bold',
              isPositive ? 'text-green-400' : 'text-red-400',
            )}
          >
            {isPositive ? (
              <ArrowUp className="w-7 h-7 mr-2" />
            ) : (
              <ArrowDown className="w-7 h-7 mr-2" />
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
