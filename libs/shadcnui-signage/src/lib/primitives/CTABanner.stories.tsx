import type { Meta, StoryObj } from '@storybook/react';
import { Smartphone, Tickets, UtensilsCrossed } from 'lucide-react';
import { ScreenFrame } from './ScreenFrame';
import { CTABanner } from './CTABanner';

const meta: Meta<typeof CTABanner> = {
  title: 'Signage/Primitives/CTABanner',
  component: CTABanner,
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['default', 'accent', 'gradient'],
    },
  },
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
type Story = StoryObj<typeof CTABanner>;

export const Default: Story = {
  args: {
    message: 'Ask your server about daily specials and dietary options',
    icon: UtensilsCrossed,
    variant: 'default',
  },
};

export const Accent: Story = {
  args: {
    message: 'For assistance, please contact Reception at extension 1001',
    icon: Tickets,
    variant: 'accent',
  },
};

export const WithAction: Story = {
  args: {
    message: 'Download the mobile app for personalized schedule and notifications',
    icon: Smartphone,
    variant: 'gradient',
    action: {
      label: 'Open app',
      href: '#download-app',
    },
  },
};