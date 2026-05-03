import { FC } from 'react';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';
import { MenuItem, MenuSection } from '@wallrun/shadcnui-signage';

export const MenuSectionDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Primitives"
      name="MenuSection"
      description="Section wrapper for grouped menu content with headline and accent divider."
      builtOnSummary="Native section shell with shared cn utility and composable child content."
      builtOnPoints={[
        'Provides a consistent menu heading, accent bar, and content wrapper.',
        'Works with MenuItem or any custom child layout that needs grouped presentation.',
        'Keeps category structure explicit for breakfast, lunch, specials, or service groupings.',
      ]}
      example={
        <div className="mx-auto max-w-4xl">
          <MenuSection title="Breakfast" contentClassName="space-y-5">
            <MenuItem name="Smoked Salmon Roll" price="$11" />
            <MenuItem
              name="Chilli Eggs"
              price="$9"
              description="Toasted sourdough and herb butter"
              hideDivider={true}
            />
          </MenuSection>
        </div>
      }
      installName="menu-section"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/primitives/MenuSection.tsx',
        'libs/shadcnui-signage/src/lib/primitives/MenuItem.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx tailwind-merge"
      usageFilename="CafeBoard.tsx"
      usageCode={`import { MenuItem, MenuSection } from '@/components/signage/primitives';

export function CafeBoard() {
  return (
    <MenuSection title="Pastries" contentClassName="space-y-4">
      <MenuItem name="Almond Croissant" price="$5" />
      <MenuItem name="Seasonal Tart" price="$6" hideDivider={true} />
    </MenuSection>
  );
}`}
      signageNotes={[
        {
          title: 'Section Rhythm',
          body: 'Use MenuSection to break a large board into obvious content zones that can be read from a distance.',
        },
        {
          title: 'Accent Control',
          body: 'The accent bar lets you reinforce brand color or daypart shifts without rebuilding the heading treatment.',
        },
        {
          title: 'Composable Content',
          body: 'Because the body accepts arbitrary children, the section can mix menu rows, disclaimers, and small promotional notes.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/MenuSection.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};