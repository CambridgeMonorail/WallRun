import type { Meta, StoryObj } from '@storybook/react';
import { SignageHeader } from './SignageHeader';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof SignageHeader> = {
  title: 'Signage/Layouts/SignageHeader',
  component: SignageHeader,
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'text',
      description: 'Small tag/badge text above title',
    },
    tagVariant: {
      control: 'select',
      options: ['emerald', 'teal', 'blue', 'violet', 'pink', 'orange'],
      description: 'Tag color variant',
    },
    title: {
      control: 'text',
      description: 'Main title text',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle/description',
    },
    alignment: {
      control: 'radio',
      options: ['left', 'center'],
      description: 'Text alignment',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.4}>
          <div className="h-full bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.16),transparent_34%),linear-gradient(145deg,#020617,#111827_48%,#312e81)] p-16 text-white">
            <div className="mx-auto flex h-full max-w-6xl items-center rounded-[2rem] border border-white/10 bg-slate-950/65 p-10 shadow-2xl backdrop-blur-sm lg:p-14">
              <Story />
            </div>
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignageHeader>;

export const TitleOnly: Story = {
  args: {
    title: 'Welcome centre',
    subtitle: 'Arrival information for visitors and scheduled guests',
    alignment: 'center',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Operations dashboard',
    subtitle: 'Live system status, support queue, and room readiness',
    alignment: 'center',
  },
};

export const WithTag: Story = {
  args: {
    tag: 'Live now',
    tagVariant: 'emerald',
    title: 'Conference schedule',
    subtitle: 'Sessions, workshops, and room changes across the venue',
    alignment: 'center',
  },
};

export const LeftAligned: Story = {
  args: {
    tag: 'Today',
    tagVariant: 'blue',
    title: 'Daily announcements',
    subtitle:
      'Use left alignment when the header anchors a denser content grid.',
    alignment: 'left',
  },
};

export const TealTag: Story = {
  args: {
    tag: 'Updated',
    tagVariant: 'teal',
    title: 'Office directory',
    subtitle: 'Departments, floors, and visitor wayfinding',
    alignment: 'center',
  },
};

export const VioletTag: Story = {
  args: {
    tag: 'Featured',
    tagVariant: 'violet',
    title: 'Employee spotlight',
    subtitle: 'A quieter hero for editorial signage or internal recognition',
    alignment: 'center',
  },
};

export const PinkTag: Story = {
  args: {
    tag: 'Special event',
    tagVariant: 'pink',
    title: 'Holiday celebration',
    subtitle: 'Use accent colour to mark limited-time or celebratory content',
    alignment: 'center',
  },
};

export const OrangeTag: Story = {
  args: {
    tag: 'Alert',
    tagVariant: 'orange',
    title: 'Maintenance notice',
    subtitle:
      'Urgent or operational messages can stay legible without feeling like app chrome.',
    alignment: 'center',
  },
};

export const LongTitle: Story = {
  args: {
    tag: 'Q1 2026',
    tagVariant: 'blue',
    title: 'Annual company performance review and strategic planning session',
    subtitle:
      'Longer headlines still need to read like a signage heading rather than collapsing into a cramped paragraph block.',
    alignment: 'center',
  },
};

export const WithCustomContent: Story = {
  args: {
    tag: 'Live',
    tagVariant: 'emerald',
    title: 'Sales metrics',
    subtitle: 'Header plus adjacent headline stats for a KPI wall',
    alignment: 'center',
    children: (
      <div className="mt-8 grid grid-cols-3 gap-4 lg:mt-10 lg:gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-xl">
          <div className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
            $1.2M
          </div>
          <div className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-300/70">
            Revenue
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-xl">
          <div className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
            156
          </div>
          <div className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-300/70">
            Orders
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-xl">
          <div className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
            24.8%
          </div>
          <div className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-300/70">
            Conversion
          </div>
        </div>
      </div>
    ),
  },
};
