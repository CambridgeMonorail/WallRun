import type { Meta, StoryObj } from '@storybook/react';
import { Clock } from '../behaviour/Clock';
import { ScreenFrame } from '../primitives/ScreenFrame';
import { MenuSection } from '../primitives/MenuSection';
import { MenuItem } from '../primitives/MenuItem';
import { MenuBoard } from './MenuBoard';

const meta: Meta<typeof MenuBoard> = {
  title: 'Signage/Blocks/MenuBoard',
  component: MenuBoard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.4}>
          <Story />
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MenuBoard>;

export const CategoryColumns: Story = {
  render: () => (
    <MenuBoard
      title="Today's Menu"
      subtitle="Fresh. Local. Delicious."
      eyebrow="DAILY SELECTION"
      data-testid="menu-board-story"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-10">
        {[
          {
            title: 'Breakfast',
            items: [
              ['Classic Breakfast', '$12.99', 'Eggs, bacon, toast, hash browns'],
              ['Pancake Stack', '$9.99', 'Buttermilk pancakes with maple syrup'],
            ],
          },
          {
            title: 'Lunch Specials',
            items: [
              ['Club Sandwich', '$13.99', 'Turkey, bacon, lettuce, tomato, mayo'],
              ['Caesar Salad', '$10.99', 'Romaine, parmesan, croutons, Caesar dressing'],
            ],
          },
          {
            title: 'Dinner Entrees',
            items: [
              ['Grilled Salmon', '$24.99', 'Atlantic salmon with seasonal vegetables'],
              ['Pasta Primavera', '$18.99', 'Fresh vegetables in garlic white wine sauce'],
            ],
          },
        ].map((section) => (
          <MenuSection
            key={section.title}
            title={section.title}
            className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-5 shadow-2xl backdrop-blur-sm sm:p-6 lg:p-8"
            contentClassName="space-y-5 sm:space-y-6 lg:space-y-8"
          >
            {section.items.map(([name, price, description]) => (
              <MenuItem
                key={name}
                name={name}
                price={price}
                description={description}
              />
            ))}
          </MenuSection>
        ))}
      </div>
    </MenuBoard>
  ),
};

export const DaypartBoard: Story = {
  render: () => (
    <MenuBoard
      title="Daypart Menu"
      eyebrow="Café"
      eyebrowVariant="plain"
      variant="orange"
      className="p-0 bg-gradient-to-br from-amber-950 via-orange-950 to-slate-950"
      shellClassName="px-4 py-6 sm:px-8 sm:py-10 lg:px-16 lg:py-14"
      titleClassName="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl"
      headerRight={
        <Clock
          format="HH:mm"
          className="text-4xl font-semibold tabular-nums sm:text-5xl lg:text-7xl"
        />
      }
    >
      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:col-span-12 lg:p-10">
          <MenuSection
            title="Evening"
            className="text-white"
            titleClassName="text-xl font-normal text-white/70 sm:text-2xl lg:text-3xl"
            accentClassName="hidden"
            contentClassName="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-6"
          >
            <MenuItem
              name="Ramen"
              price="£10.50"
              hideDivider
              rowClassName="justify-between border-b border-white/10 py-3 lg:py-4 text-2xl sm:text-3xl lg:text-4xl"
              titleClassName="text-inherit font-normal text-white"
              priceClassName="tabular-nums text-inherit font-normal text-white/70 sm:ml-0"
            />
            <MenuItem
              name="Veggie Curry"
              price="£9.70"
              hideDivider
              rowClassName="justify-between border-b border-white/10 py-3 lg:py-4 text-2xl sm:text-3xl lg:text-4xl"
              titleClassName="text-inherit font-normal text-white"
              priceClassName="tabular-nums text-inherit font-normal text-white/70 sm:ml-0"
            />
          </MenuSection>
        </div>
      </div>
    </MenuBoard>
  ),
};