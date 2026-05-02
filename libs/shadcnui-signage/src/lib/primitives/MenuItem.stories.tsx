import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Signage/Primitives/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    price: { control: 'text' },
    description: { control: 'text' },
    hideDivider: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.4}>
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-950 via-orange-950 to-slate-950 p-16 text-white">
            <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
              <Story />
            </div>
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const SignatureDish: Story = {
  args: {
    name: 'Woodfired Flatbread',
    price: '£12.50',
    description: 'Roasted courgette, whipped feta, charred lemon, chilli oil',
  },
};

export const CompactDaypartRow: Story = {
  args: {
    name: 'Ramen Bowl',
    price: '£10.50',
    hideDivider: true,
    rowClassName:
      'justify-between border-b border-white/10 py-3 text-2xl sm:text-3xl lg:py-4 lg:text-4xl',
    titleClassName: 'text-inherit font-normal text-white',
    priceClassName: 'text-inherit font-normal text-white/70 sm:ml-0',
  },
};

export const PriceWall: Story = {
  render: () => (
    <div className="space-y-6 lg:space-y-8">
      <MenuItem
        name="Citrus Salad"
        price="£8.90"
        description="Blood orange, fennel, toasted seeds"
      />
      <MenuItem
        name="Braised Beef Bowl"
        price="£14.20"
        description="Short rib, miso glaze, crushed potatoes"
      />
      <MenuItem
        name="Vanilla Basque Cheesecake"
        price="£6.40"
        description="Burnt top, cherry compote"
        hideDivider
      />
    </div>
  ),
};
