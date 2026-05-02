import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { InfoList } from './InfoList';
import { MeetingRow } from './MeetingRow';
import { SignagePanel } from './SignagePanel';

const meta: Meta<typeof SignagePanel> = {
  title: 'Signage/Primitives/SignagePanel',
  component: SignagePanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.4}>
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-16 text-white">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignagePanel>;

export const WelcomePanel: Story = {
  render: () => (
    <SignagePanel label="Message" className="max-w-4xl">
      <div className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
        Welcome to HQ
      </div>
      <div className="mt-4 max-w-2xl text-lg text-white/70 sm:text-2xl lg:mt-6 lg:text-3xl">
        Visitors: please check in at reception. Staff: remember your badge.
      </div>
    </SignagePanel>
  ),
};

export const MeetingBoard: Story = {
  render: () => (
    <SignagePanel label="Upcoming meetings" className="max-w-5xl">
      <div className="mt-4">
        <MeetingRow time="09:30" title="Design Review" room="S1.12" />
        <MeetingRow time="10:00" title="Platform Standup" room="S1.06" />
        <MeetingRow time="10:30" title="Hiring Panel" room="S2.03" />
      </div>
    </SignagePanel>
  ),
};

export const NotesPanel: Story = {
  render: () => (
    <SignagePanel label="Notes" className="max-w-3xl">
      <InfoList
        items={[
          '• Fire exits: follow green signage',
          '• Quiet zones on Level 2',
          '• Wi-Fi: HQ-Guest',
        ]}
      />
    </SignagePanel>
  ),
};
