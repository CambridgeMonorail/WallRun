import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { InfoList } from './InfoList';

const meta: Meta<typeof InfoList> = {
  title: 'Signage/Primitives/InfoList',
  component: InfoList,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-16 text-white">
            <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
              <Story />
            </div>
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InfoList>;

export const VisitorGuidance: Story = {
  args: {
    items: [
      'Check in at reception before moving beyond the lobby.',
      'Guest Wi-Fi: WR-Visitor.',
      'Photography is restricted in the engineering wing.',
    ],
  },
};

export const OperationsPanel: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <div className="text-sm uppercase tracking-[0.32em] text-teal-300/70 lg:text-lg">
          Notes
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Today&apos;s reminders
        </h2>
      </div>
      <InfoList
        items={[
          'Fire exits: follow green signage.',
          'Quiet zones remain available on Level 2.',
          'Catering reset begins at 14:30 in the atrium.',
          'Evening cleaning starts at 19:00.',
        ]}
      />
    </div>
  ),
};
