import type { Meta, StoryObj } from '@storybook/react';
import { OneMessageFrame } from './OneMessageFrame';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof OneMessageFrame> = {
  title: 'Signage/Blocks/OneMessageFrame',
  component: OneMessageFrame,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.4}>
          <div className="h-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_34%),linear-gradient(135deg,#020617,#0f172a_48%,#111827)] p-12 lg:p-16">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'OneMessageFrame is the opinionated single-message shell for signage surfaces that need one dominant statement, one short context line, and one next step.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OneMessageFrame>;

export const LobbyUpdate: Story = {
  args: {
    utility: 'Reception notice',
    headline: 'Visitor check-in has moved to Desk 3',
    supportingText:
      'Please use the illuminated route beside the atrium stairs. Staff will redirect anyone arriving at the former desk.',
    action: (
      <div className="inline-flex rounded-full border border-white/15 bg-white px-8 py-4 text-2xl font-semibold text-slate-950">
        Follow the floor markers
      </div>
    ),
  },
};

export const WithMediaPanel: Story = {
  args: {
    utility: 'Event hall',
    headline: 'The next keynote begins in 12 minutes',
    supportingText:
      'Scan the agenda for speaker notes, overflow seating, and live caption settings before the doors close.',
    action: (
      <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/12 px-8 py-4 text-2xl font-semibold text-sky-50">
        Scan for agenda updates
      </div>
    ),
    media: (
      <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(56,189,248,0.22),rgba(30,41,59,0.7))] text-center text-3xl font-medium text-slate-50 lg:text-4xl">
        Speaker preview artwork
      </div>
    ),
  },
};