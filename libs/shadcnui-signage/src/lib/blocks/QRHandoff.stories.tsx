import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from '../primitives/ScreenFrame';
import { QRHandoff, type QRHandoffProps } from './QRHandoff';

const renderPreview = (
  args: QRHandoffProps,
  {
    resolution,
    scale,
    frameClassName,
    surfaceClassName,
  }: {
    resolution: '1080p' | 'portrait-1080p';
    scale: number;
    frameClassName?: string;
    surfaceClassName?: string;
  },
) => (
  <div className="bg-slate-950/95 p-8">
    <ScreenFrame resolution={resolution} scale={scale} className={frameClassName}>
      <div
        className={surfaceClassName ?? 'flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-16 text-white'}
      >
        <QRHandoff {...args} />
      </div>
    </ScreenFrame>
  </div>
);

const meta: Meta<typeof QRHandoff> = {
  title: 'Signage/Blocks/QRHandoff',
  component: QRHandoff,
  tags: ['autodocs'],
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
  render: (args) => renderPreview(args, { resolution: '1080p', scale: 0.38 }),
};

export const PortraitLobbyHandoff: Story = {
  args: {
    title: 'Skip the reception queue',
    description:
      'Scan to finish visitor check-in, confirm your host, and receive your floor pass before you arrive at the desk.',
    qrValue: 'https://wallrun.dev/check-in',
    qrLabel: 'Visitor self check-in',
    qrInstruction: 'Scan to complete arrival details on your phone',
    shortUrl: 'wallrun.dev/check-in',
    eyebrow: 'Arrive prepared',
  },
  render: (args) =>
    renderPreview(args, {
      resolution: 'portrait-1080p',
      scale: 0.3,
      surfaceClassName:
        'flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-10 text-white',
    }),
};
