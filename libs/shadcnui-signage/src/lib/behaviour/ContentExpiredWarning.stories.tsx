import type { Meta, StoryObj } from '@storybook/react';
import { ContentExpiredWarning } from './ContentExpiredWarning';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof ContentExpiredWarning> = {
  title: 'Signage/Behaviour/ContentExpiredWarning',
  component: ContentExpiredWarning,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="relative h-full bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.16),transparent_34%),linear-gradient(135deg,#020617,#111827_48%,#3f1d2e)] p-12 text-white lg:p-16">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContentExpiredWarning>;

export const Badge: Story = {
  args: {
    expiredAt: '2026-05-07T09:45:00.000Z',
    now: () => new Date('2026-05-07T10:00:00.000Z').getTime(),
    variant: 'badge',
  },
};

export const Panel: Story = {
  args: {
    expiredAt: '2026-05-07T08:15:00.000Z',
    now: () => new Date('2026-05-07T10:00:00.000Z').getTime(),
    variant: 'panel',
    label: 'Promotion approval window closed',
  },
};

export const Overlay: Story = {
  args: {
    expiredAt: '2026-05-07T09:30:00.000Z',
    now: () => new Date('2026-05-07T10:00:00.000Z').getTime(),
    variant: 'overlay',
  },
};