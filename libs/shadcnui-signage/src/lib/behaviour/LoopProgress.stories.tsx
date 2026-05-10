import type { Meta, StoryObj } from '@storybook/react';
import { LoopProgress } from './LoopProgress';

const meta: Meta<typeof LoopProgress> = {
  title: 'Signage/Behaviour/LoopProgress',
  component: LoopProgress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[linear-gradient(135deg,#020617,#0f172a_52%,#164e63)] p-8 text-white lg:p-10">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoopProgress>;

export const ActiveDwell: Story = {
  args: {
    label: 'Announcement dwell',
    elapsedMs: 180000,
    durationMs: 300000,
  },
};