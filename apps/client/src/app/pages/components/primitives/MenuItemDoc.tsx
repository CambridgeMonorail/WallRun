import { FC } from 'react';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';
import { MenuItem } from '@wallrun/shadcnui-signage';

export const MenuItemDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Primitives"
      name="MenuItem"
      description="Price-led menu row with optional description and divider treatment for large-format menu boards."
      builtOnSummary="Custom menu row with shared cn utility and signage-sized typography."
      builtOnPoints={[
        'Keeps item name and price visually coupled across responsive breakpoints.',
        'Supports optional description text without forcing a denser layout.',
        'Uses an optional divider to preserve rhythm in stacked menu lists.',
      ]}
      example={
        <div className="mx-auto max-w-3xl">
          <MenuItem
            name="Roasted Mushroom Flatbread"
            price="$14"
            description="Mozzarella, rosemary oil, and caramelised onion"
          />
        </div>
      }
      installName="menu-item"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/primitives/MenuItem.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx tailwind-merge"
      usageFilename="LunchMenu.tsx"
      usageCode={`import { MenuItem } from '@/components/signage/primitives/MenuItem';

export function LunchMenu() {
  return (
    <MenuItem
      name="Citrus Chicken Bowl"
      price="$16"
      description="Herb rice, charred broccoli, and tahini drizzle"
    />
  );
}`}
      signageNotes={[
        {
          title: 'Price Hierarchy',
          body: 'The component is tuned so the price reads quickly without visually overpowering the dish name.',
        },
        {
          title: 'Description Density',
          body: 'Reserve descriptions for items that genuinely need supporting detail; the component works cleanly with or without them.',
        },
        {
          title: 'Stacked Menus',
          body: 'Use the divider for long menu lists and disable it on the final row when the surrounding layout already provides separation.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/MenuItem.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};