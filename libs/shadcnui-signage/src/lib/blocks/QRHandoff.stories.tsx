import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from '../primitives/ScreenFrame';
import { QRHandoff } from './QRHandoff';

const meta: Meta<typeof QRHandoff> = {
  title: 'Signage/Blocks/QRHandoff',
  component: QRHandoff,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.38}>
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-16 text-white">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QRHandoff>;

export const EventCompanion: Story = {
  args: {
    title: 'Take the schedule with you',
    description:
      'Scan to continue on your phone with room changes, session reminders, and venue navigation.',
    qrValue: 'https://wallrun.dev/app',
    qrLabel: 'Conference app',
    qrInstruction: 'Scan for personal agenda and venue map',
    shortUrl: 'wallrun.dev/app',
  },
};
