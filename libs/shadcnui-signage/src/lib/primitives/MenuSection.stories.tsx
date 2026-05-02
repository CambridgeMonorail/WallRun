import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

const meta: Meta<typeof MenuSection> = {
  title: 'Signage/Primitives/MenuSection',
  component: MenuSection,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    children: {
      control: false,
      table: { disable: true },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.38}>
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 p-16 text-white">
            <div className="w-full max-w-5xl rounded-[2rem] border border-emerald-400/15 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
              <Story />
            </div>
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MenuSection>;

export const BreakfastColumn: Story = {
  args: {
    title: 'Breakfast',
  },
  render: (args) => (
    <MenuSection {...args} contentClassName="space-y-6 lg:space-y-8">
      <MenuItem
        name="Farmhouse Plate"
        price="£11.20"
        description="Two eggs, smoked bacon, roast tomato, sourdough"
      />
      <MenuItem
        name="Granola Pot"
        price="£6.80"
        description="Greek yoghurt, honey, berries"
      />
      <MenuItem
        name="Mushroom Toast"
        price="£8.40"
        description="Herb ricotta, watercress, black pepper"
        hideDivider
      />
    </MenuSection>
  ),
};

export const CompactEveningSection: Story = {
  render: () => (
    <MenuSection
      title="Evening"
      className="text-white"
      titleClassName="text-xl font-normal text-white/70 sm:text-2xl lg:text-3xl"
      accentClassName="hidden"
      contentClassName="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6"
    >
      <MenuItem
        name="Charred Corn Ramen"
        price="£10.50"
        hideDivider
        rowClassName="justify-between border-b border-white/10 py-3 text-2xl lg:py-4 lg:text-4xl"
        titleClassName="text-inherit font-normal text-white"
        priceClassName="text-inherit font-normal text-white/70 sm:ml-0"
      />
      <MenuItem
        name="Smoked Tofu Curry"
        price="£9.70"
        hideDivider
        rowClassName="justify-between border-b border-white/10 py-3 text-2xl lg:py-4 lg:text-4xl"
        titleClassName="text-inherit font-normal text-white"
        priceClassName="text-inherit font-normal text-white/70 sm:ml-0"
      />
    </MenuSection>
  ),
};