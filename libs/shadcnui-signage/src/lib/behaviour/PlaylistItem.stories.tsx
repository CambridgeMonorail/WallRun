import type { Meta, StoryObj } from '@storybook/react';
import { PlaylistItem } from './PlaylistItem';

const meta: Meta<typeof PlaylistItem> = {
  title: 'Signage/Behaviour/PlaylistItem',
  component: PlaylistItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[linear-gradient(135deg,#020617,#0f172a_52%,#172554)] p-8 text-white lg:p-10">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PlaylistItem>;

export const Active: Story = {
  args: {
    id: 'arrival',
    label: 'Arrival message',
    detail: 'Welcome visitors, then direct them to the reception desk.',
    startsAt: '2026-05-10T10:00:00.000Z',
    durationMs: 360000,
    state: 'active',
  },
};

export const NextTakeover: Story = {
  args: {
    id: 'alert',
    label: 'Weather alert takeover',
    detail: 'Interrupt the current loop when heavy rain starts affecting arrivals.',
    startsAt: '2026-05-10T10:06:00.000Z',
    durationMs: 180000,
    priority: 'takeover',
    state: 'next',
  },
};