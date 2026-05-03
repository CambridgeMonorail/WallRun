import { FC } from 'react';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';
import { FloorBadge } from '@wallrun/shadcnui-signage';

export const FloorBadgeDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Primitives"
      name="FloorBadge"
      description="Compact floor marker for directories, maps, and lobby wayfinding screens."
      builtOnSummary="Native HTML with shared cn utility and gradient badge styling."
      builtOnPoints={[
        'Uses bold rounded badge styling so floor numbers stand out immediately.',
        'Keeps the footprint small enough for dense directory layouts.',
        'Accepts string or numeric floor labels for mixed building naming schemes.',
      ]}
      example={
        <div className="flex flex-wrap items-center justify-center gap-4">
          <FloorBadge floor={1} />
          <FloorBadge floor={2} className="from-emerald-500 to-teal-500" />
          <FloorBadge floor="Roof" className="from-violet-500 to-fuchsia-500" />
        </div>
      }
      installName="floor-badge"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/primitives/FloorBadge.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx tailwind-merge"
      usageFilename="DirectoryLegend.tsx"
      usageCode={`import { FloorBadge } from '@/components/signage/primitives/FloorBadge';

export function DirectoryLegend() {
  return <FloorBadge floor={4} />;
}`}
      signageNotes={[
        {
          title: 'Fast Recognition',
          body: 'Use FloorBadge when the floor label needs to be understood at a glance without reading supporting copy.',
        },
        {
          title: 'Small Surface Area',
          body: 'The badge is designed to slot into cards, map legends, and wayfinding headers without dominating the layout.',
        },
        {
          title: 'Consistent Labeling',
          body: 'Because the component always renders the “Floor” prefix, it helps standardize wayfinding language across screens.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/FloorBadge.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};