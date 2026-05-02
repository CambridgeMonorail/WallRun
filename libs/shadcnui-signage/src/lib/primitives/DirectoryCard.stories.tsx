import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { DirectoryCard } from './DirectoryCard';
import { LocationIndicator } from './LocationIndicator';
import { FloorBadge } from './FloorBadge';

const meta: Meta<typeof DirectoryCard> = {
  title: 'Signage/Primitives/DirectoryCard',
  component: DirectoryCard,
  tags: ['autodocs'],
  argTypes: {
    department: {
      control: 'text',
    },
    floor: {
      control: 'text',
    },
    room: {
      control: 'text',
    },
    phone: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.4}>
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-16 text-white">
            <div className="w-full max-w-3xl">
              <Story />
            </div>
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DirectoryCard>;

export const Default: Story = {
  args: {
    department: 'Engineering',
    floor: 3,
    room: '301',
    phone: 'x3001',
  },
};

export const ConferenceSuite: Story = {
  args: {
    department: 'Conference Rooms',
    floor: 4,
    room: '410-415',
    phone: 'x4010',
  },
};

export const SupportingPrimitives: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <LocationIndicator location="Main Lobby" />
      <div className="flex justify-center">
        <FloorBadge floor="2" />
      </div>
      <DirectoryCard
        department="Marketing"
        floor={2}
        room="201"
        phone="x2001"
      />
    </div>
  ),
};
