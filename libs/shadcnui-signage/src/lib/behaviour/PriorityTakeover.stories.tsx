import type { Meta, StoryObj } from '@storybook/react';
import { PriorityTakeover } from './PriorityTakeover';

const meta: Meta<typeof PriorityTakeover> = {
  title: 'Signage/Behaviour/PriorityTakeover',
  component: PriorityTakeover,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-[linear-gradient(135deg,#020617,#1e1b4b_52%,#450a0a)] p-8 text-white lg:p-10">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PriorityTakeover>;

export const ActiveTakeover: Story = {
  args: {
    active: true,
    title: 'Platform 4 boarding changed',
    message:
      'This message takes over the regular loop because the change affects passengers already in motion.',
    activeUntil: '2026-05-10T10:15:00.000Z',
    locale: 'en-GB',
    timeZone: 'UTC',
  },
};

export const FallbackMode: Story = {
  args: {
    active: false,
    title: 'Storm warning',
    message: 'Move indoors.',
    fallback: (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-lg text-slate-200">
        Continue normal loop content until a priority interrupt is active.
      </div>
    ),
  },
};