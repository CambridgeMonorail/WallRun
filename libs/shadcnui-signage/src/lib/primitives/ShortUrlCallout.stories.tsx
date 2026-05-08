import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { ShortUrlCallout } from './ShortUrlCallout';

const meta: Meta<typeof ShortUrlCallout> = {
  title: 'Signage/Primitives/ShortUrlCallout',
  component: ShortUrlCallout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.4}>
          <div className="flex min-h-screen items-end justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-16 text-white">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShortUrlCallout>;

export const Inline: Story = {
  args: {
    url: 'wallrun.dev/app',
    label: 'Event companion app',
    variant: 'inline',
  },
};

export const Panel: Story = {
  args: {
    url: 'wallrun.dev/check-in',
    label: 'Visitor self check-in',
    prefix: 'If scanning is unavailable, type',
    variant: 'panel',
  },
};
