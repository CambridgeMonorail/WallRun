import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { QRCodeCallout } from './QRCodeCallout';

const meta: Meta<typeof QRCodeCallout> = {
  title: 'Signage/Primitives/QRCodeCallout',
  component: QRCodeCallout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.4}>
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-16 text-white">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QRCodeCallout>;

export const PosterCTA: Story = {
  args: {
    value: 'https://wallrun.dev/app',
    label: 'Event companion app',
    instruction: 'Scan for personalized schedule updates and venue guidance',
    shortUrl: 'wallrun.dev/app',
    size: 'lg',
  },
};

export const SideZoneCTA: Story = {
  args: {
    value: 'https://wallrun.dev/check-in',
    label: 'Visitor self check-in',
    instruction:
      'Scan to complete visitor registration before approaching reception',
    shortUrl: 'wallrun.dev/check-in',
    size: 'md',
  },
};
