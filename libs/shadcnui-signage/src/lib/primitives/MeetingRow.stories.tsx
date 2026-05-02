import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { MeetingRow } from './MeetingRow';

const meta: Meta<typeof MeetingRow> = {
  title: 'Signage/Primitives/MeetingRow',
  component: MeetingRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'MeetingRow is a schedule line item for lobby loops and room boards. The better stories show it as part of a timetable zone with readable hierarchy, rather than as a single disconnected row.',
      },
    },
  },
  argTypes: {
    time: { control: 'text' },
    title: { control: 'text' },
    room: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-16 text-white">
            <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
              <Story />
            </div>
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MeetingRow>;

export const BoardReview: Story = {
  render: () => (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div>
        <div className="text-sm uppercase tracking-[0.32em] text-indigo-200/70 lg:text-lg">
          Schedule row
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          One row should still read clearly from distance.
        </h2>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
          Use the standalone row for compact schedule regions where time, event,
          and room need clean separation without resorting to tables.
        </p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm lg:p-10">
        <div className="text-sm uppercase tracking-[0.28em] text-indigo-200/65">
          Next meeting
        </div>
        <div className="mt-4">
          <MeetingRow
            time="09:30"
            title="Quarterly Board Review"
            room="Atrium 4"
          />
        </div>
      </div>
    </div>
  ),
};

export const LiveAgenda: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <div className="text-sm uppercase tracking-[0.32em] text-indigo-200/70 lg:text-lg">
          Lobby agenda
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Stack several rows into a calm meeting board.
        </h2>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm lg:p-10">
        <div className="space-y-2 lg:space-y-3">
          <MeetingRow
            time="09:30"
            title="Quarterly Board Review"
            room="Atrium 4"
          />
          <MeetingRow time="11:00" title="Partner Standup" room="North 2" />
          <MeetingRow time="14:15" title="Design Critique" room="Studio A" />
          <MeetingRow time="16:00" title="Client Debrief" room="Harbour 1" />
        </div>
      </div>
    </div>
  ),
};
