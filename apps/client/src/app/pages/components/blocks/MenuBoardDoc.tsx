import { FC } from 'react';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';
import { MenuBoard, MenuItem, MenuSection } from '@wallrun/shadcnui-signage';

export const MenuBoardDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Blocks"
      name="MenuBoard"
      description="Full-screen menu composition shell for restaurant, cafe, and daypart signage content."
      builtOnSummary="Composed block built on SignageContainer with flexible header, content, and footer zones."
      builtOnPoints={[
        'Wraps menu content in a full-screen signage shell with branded background variants.',
        'Supports eyebrow, title, subtitle, headerRight, and footer slots for rich menu layouts.',
        'Pairs naturally with MenuSection and MenuItem for complete menu-board compositions.',
      ]}
      example={
        <div style={{ height: '720px' }}>
          <MenuBoard
            eyebrow="DAYPART MENU"
            title="Signal & Salt"
            subtitle="Breakfast until 11:30"
            footer={
              <div className="mt-10 text-xl text-white/70">
                Ask about allergen guidance at the counter.
              </div>
            }
          >
            <div className="grid gap-10 lg:grid-cols-2">
              <MenuSection title="Breakfast" contentClassName="space-y-5">
                <MenuItem name="Flat White + Pastry" price="$8" />
                <MenuItem
                  name="Citrus Granola Bowl"
                  price="$10"
                  description="Greek yoghurt, orange syrup, toasted seeds"
                  hideDivider={true}
                />
              </MenuSection>
              <MenuSection title="Warm Plates" contentClassName="space-y-5">
                <MenuItem name="Herb Omelette" price="$12" />
                <MenuItem
                  name="Roast Tomato Toast"
                  price="$11"
                  description="Whipped feta and basil"
                  hideDivider={true}
                />
              </MenuSection>
            </div>
          </MenuBoard>
        </div>
      }
      installName="menu-board"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/blocks/MenuBoard.tsx',
        'libs/shadcnui-signage/src/lib/layouts/SignageContainer.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx tailwind-merge"
      usageFilename="RestaurantMenu.tsx"
      usageCode={`import { MenuBoard, MenuItem, MenuSection } from '@/components/signage';

export function RestaurantMenu() {
  return (
    <MenuBoard title="Cafe" subtitle="Lunch from 12:00">
      <MenuSection title="Specials" contentClassName="space-y-5">
        <MenuItem name="Charred Corn Tacos" price="$15" hideDivider={true} />
      </MenuSection>
    </MenuBoard>
  );
}`}
      signageNotes={[
        {
          title: 'Full-Screen Composition',
          body: 'MenuBoard is meant to own the entire screen surface, not sit inside a small card or dashboard module.',
        },
        {
          title: 'Header Flexibility',
          body: 'Use the eyebrow and headerRight areas for daypart labels, service times, promos, or brand marks without rebuilding the shell.',
        },
        {
          title: 'Menu Rhythm',
          body: 'Pair it with MenuSection and MenuItem so the layout, typography, and spacing stay consistent across large-format menu screens.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/MenuBoard.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};