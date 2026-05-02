import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { LocationIndicator } from './LocationIndicator';

const meta: Meta<typeof LocationIndicator> = {
  title: 'Signage/Primitives/LocationIndicator',
  component: LocationIndicator,
  tags: ['autodocs'],
  argTypes: {
    location: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.45}>
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,#020617,#0f172a_55%,#082f49)] p-16 text-white">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LocationIndicator>;

export const MainLobby: Story = {
  args: {
    location: 'Main Lobby',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Current zone:',
    location: 'Visitor Reception',
  },
};

export const DirectoryHeader: Story = {
  render: () => (
    <div className="space-y-10 text-center lg:space-y-12">
      <div>
        <div className="text-sm uppercase tracking-[0.32em] text-cyan-300/70 lg:text-lg">
          Building navigation
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Office directory
        </h2>
      </div>
      <LocationIndicator location="North Atrium" />
    </div>
  ),
};