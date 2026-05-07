import type { Meta, StoryObj } from '@storybook/react';
import { NoContentFallback } from './NoContentFallback';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof NoContentFallback> = {
  title: 'Signage/Behaviour/NoContentFallback',
  component: NoContentFallback,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="h-full bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_34%),linear-gradient(135deg,#020617,#111827_48%,#312e81)] p-12 text-white lg:p-16">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NoContentFallback>;

export const PublicSafe: Story = {
  args: {
    title: 'Live updates temporarily unavailable',
    message:
      'Please use the assistance desk beside this screen for the latest service information.',
  },
};

export const OperatorDebug: Story = {
  args: {
    variant: 'operator-debug',
    title: 'Playlist returned no valid items',
    message:
      'The public screen should stay useful while operations teams confirm the source feed and schedule window.',
    owner: 'Transport operations',
    lastCheckedAt: '2026-05-07T09:56:00.000Z',
  },
};