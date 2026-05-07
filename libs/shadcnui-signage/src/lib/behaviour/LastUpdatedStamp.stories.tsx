import type { Meta, StoryObj } from '@storybook/react';
import { LastUpdatedStamp } from './LastUpdatedStamp';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof LastUpdatedStamp> = {
  title: 'Signage/Behaviour/LastUpdatedStamp',
  component: LastUpdatedStamp,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'LastUpdatedStamp keeps freshness visible without turning every signage surface into a dashboard. It is best used as a quiet utility marker on live data screens, operational boards, and feed-backed messages.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="flex h-full items-end bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_34%),linear-gradient(135deg,#020617,#0f172a_52%,#111827)] p-12 text-white lg:p-16">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LastUpdatedStamp>;

export const FreshRelative: Story = {
  args: {
    updatedAt: '2026-05-07T09:56:00.000Z',
    now: () => new Date('2026-05-07T10:00:00.000Z').getTime(),
    format: 'relative',
  },
};

export const StaleAbsolute: Story = {
  args: {
    updatedAt: '2026-05-07T06:45:00.000Z',
    now: () => new Date('2026-05-07T10:00:00.000Z').getTime(),
    staleAfterMs: 20 * 60_000,
    format: 'absolute',
    locale: 'en-US',
    timeZone: 'UTC',
  },
};