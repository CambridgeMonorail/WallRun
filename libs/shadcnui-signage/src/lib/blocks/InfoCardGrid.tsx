import {
  cn,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@wallrun/shadcnui';
import { getClampClass } from '../utils/clamp';
import type {
  InfoCardItem,
  ColumnCount,
  Density,
} from '../types/signage.types';

export type InfoCardGridProps = {
  /**
   * Array of card items to display
   */
  items: InfoCardItem[];

  /**
   * Number of columns in the grid
   * @default 3
   */
  columns?: ColumnCount;

  /**
   * Density variant for card spacing
   * @default 'comfortable'
   */
  density?: Density;

  /**
   * Index of item to highlight (0-based)
   */
  highlightIndex?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
};

/**
 * InfoCardGrid - Grid layout for menus, promos, and KPIs
 *
 * Displays a grid of equal-height cards with clamped text content.
 * Supports highlighting without breaking alignment.
 *
 * @example
 * ```tsx
 * <InfoCardGrid
 *   items={[
 *     { title: 'Revenue', value: '$1.2M', description: 'Up 12% from last quarter' },
 *     { title: 'Users', value: '45.2K', description: 'Active this month' }
 *   ]}
 *   columns={2}
 *   density="comfortable"
 * />
 * ```
 */
export function InfoCardGrid({
  items,
  columns = 3,
  density = 'comfortable',
  highlightIndex,
  className = '',
}: InfoCardGridProps) {
  // Grid column classes
  const columnClasses: Record<ColumnCount, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  // Density-based spacing
  const gapClass = density === 'comfortable' ? 'gap-8' : 'gap-4';
  const paddingClass = density === 'comfortable' ? 'p-8' : 'p-4';

  return (
    <div
      className={cn(
        'grid h-full w-full',
        columnClasses[columns],
        gapClass,
        paddingClass,
        className,
      )}
      data-testid="info-card-grid"
      data-columns={columns}
      data-density={density}
    >
      {items.map((item, index) => {
        const isHighlighted =
          highlightIndex !== undefined && index === highlightIndex;

        return (
          <Card
            key={index}
            className={cn(
              'flex flex-col transition-all',
              isHighlighted && 'ring-2 ring-primary ring-offset-2 shadow-lg',
            )}
            data-testid={`info-card-${index}`}
            data-highlighted={isHighlighted || undefined}
          >
            <CardHeader
              className={
                density === 'comfortable' ? 'space-y-2' : 'space-y-1 pb-2'
              }
            >
              <CardTitle
                className={cn(
                  getClampClass(2),
                  density === 'comfortable' ? 'text-3xl' : 'text-2xl',
                )}
              >
                {item.title}
              </CardTitle>
              {item.value && (
                <div
                  className={cn(
                    'font-bold text-primary',
                    density === 'comfortable' ? 'text-5xl' : 'text-4xl',
                  )}
                  data-testid={`card-value-${index}`}
                >
                  {item.value}
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1">
              {item.description && (
                <CardDescription
                  className={cn(
                    getClampClass(3),
                    density === 'comfortable' ? 'text-xl' : 'text-lg',
                  )}
                  data-testid={`card-description-${index}`}
                >
                  {item.description}
                </CardDescription>
              )}
              {item.meta && (
                <div
                  className={cn(
                    'mt-4 text-muted-foreground',
                    getClampClass(1),
                    density === 'comfortable' ? 'text-base' : 'text-sm',
                  )}
                  data-testid={`card-meta-${index}`}
                >
                  {item.meta}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
