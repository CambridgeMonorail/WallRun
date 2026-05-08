import type { Meta, StoryObj } from '@storybook/react';
import { Smartphone, TriangleAlert } from 'lucide-react';
import { ScreenFrame } from './ScreenFrame';
import { ActionStrip } from './ActionStrip';

const meta: Meta<typeof ActionStrip> = {
  title: 'Signage/Primitives/ActionStrip',
  component: ActionStrip,
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
type Story = StoryObj<typeof ActionStrip>;

export const FooterBrand: Story = {
  args: {
    message:
      'Continue on your phone for live agenda updates and personalized reminders',
    leadingVisual: <Smartphone aria-hidden="true" className="h-8 w-8" />,
    tone: 'brand',
    position: 'bottom',
    action: (
      <a
        href="#agenda"
        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-base"
      >
        Open agenda
      </a>
    ),
  },
};

export const SideUrgent: Story = {
  args: {
    message: 'Use the west entrance and scan for overflow seating guidance',
    leadingVisual: <TriangleAlert aria-hidden="true" className="h-8 w-8" />,
    tone: 'urgent',
    position: 'right',
    action: (
      <a
        href="#overflow"
        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-base"
      >
        View overflow route
      </a>
    ),
  },
};
