import { FC } from 'react';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';
import { DirectoryCard } from '@wallrun/shadcnui-signage';

export const DirectoryCardDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Primitives"
      name="DirectoryCard"
      description="Wayfinding card for departments and destinations with floor, room, and contact metadata."
      builtOnSummary="Custom signage card with FloorBadge and shared utility styling."
      builtOnPoints={[
        'Uses FloorBadge to emphasize the destination floor immediately.',
        'Applies a bordered gradient panel for readable wayfinding zones.',
        'Balances large department labels with room and phone metadata.',
      ]}
      example={
        <div className="mx-auto max-w-3xl">
          <DirectoryCard
            department="Visitor Reception"
            floor={2}
            room="2.14"
            phone="Ext. 204"
          />
        </div>
      }
      installName="directory-card"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/primitives/DirectoryCard.tsx',
        'libs/shadcnui-signage/src/lib/primitives/FloorBadge.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx tailwind-merge"
      usageFilename="OfficeDirectory.tsx"
      usageCode={`import { DirectoryCard } from '@/components/signage/primitives/DirectoryCard';

export function OfficeDirectory() {
  return (
    <DirectoryCard
      department="Design Studio"
      floor={3}
      room="3.08"
      phone="Ext. 308"
    />
  );
}`}
      signageNotes={[
        {
          title: 'Distance Readability',
          body: 'The department name and floor marker are sized for quick recognition from a lobby or corridor viewing distance.',
        },
        {
          title: 'Wayfinding Hierarchy',
          body: 'Use one card per destination or department so room and phone details stay secondary to the main location label.',
        },
        {
          title: 'Flexible Placement',
          body: 'The component works well in directory grids, reception callouts, and split-screen wayfinding layouts.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/DirectoryCard.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};