import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { FloorBadge } from './FloorBadge';

const meta: Meta<typeof FloorBadge> = {
  title: 'Signage/Primitives/FloorBadge',
  component: FloorBadge,
  tags: ['autodocs'],
  argTypes: {
    floor: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.45}>
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-16 text-white">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FloorBadge>;

export const LobbyWayfinding: Story = {
  args: {
    floor: 3,
  },
};

export const ExecutiveLevel: Story = {
  args: {
    floor: '12A',
    className: 'from-violet-500 to-fuchsia-500 text-lg lg:text-2xl',
  },
};

export const BadgeLineup: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
      <FloorBadge floor={1} />
      <FloorBadge floor={2} />
      <FloorBadge floor={3} className="from-emerald-500 to-teal-500" />
      <FloorBadge floor="Roof" className="from-violet-500 to-fuchsia-500" />
    </div>
  ),
};