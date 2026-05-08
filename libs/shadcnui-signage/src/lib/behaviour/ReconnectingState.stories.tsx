import type { Meta, StoryObj } from '@storybook/react';
import { ReconnectingState } from './ReconnectingState';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof ReconnectingState> = {
  title: 'Signage/Behaviour/ReconnectingState',
  component: ReconnectingState,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="h-full bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,#020617,#0f172a_48%,#0c4a6e)] p-12 text-white lg:p-16">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReconnectingState>;

export const Panel: Story = {
  args: {
    active: true,
    lastConnectedAt: '2026-05-07T09:56:00.000Z',
    now: () => new Date('2026-05-07T10:00:00.000Z').getTime(),
  },
};

export const Inline: Story = {
  args: {
    active: true,
    variant: 'inline',
    lastConnectedAt: '2026-05-07T09:58:00.000Z',
    now: () => new Date('2026-05-07T10:00:00.000Z').getTime(),
  },
};