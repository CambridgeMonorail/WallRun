import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from '../primitives/ScreenFrame';
import { PlaylistTimeline } from './PlaylistTimeline';

const meta: Meta<typeof PlaylistTimeline> = {
  title: 'Signage/Behaviour/PlaylistTimeline',
  component: PlaylistTimeline,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="h-full bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,#020617,#0f172a_48%,#172554)] p-12 text-white lg:p-16">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PlaylistTimeline>;

const baseItems = [
  {
    id: 'welcome',
    label: 'Visitor welcome',
    detail: 'Hold the arrival message long enough to orient first-time visitors.',
    startsAt: '2026-05-10T10:00:00.000Z',
    durationMs: 360000,
  },
  {
    id: 'agenda',
    label: 'Conference agenda',
    detail: 'Move to the next information layer without burying timing and duration.',
    startsAt: '2026-05-10T10:06:00.000Z',
    durationMs: 240000,
    priority: 'priority' as const,
  },
  {
    id: 'alert',
    label: 'Transit disruption',
    detail: 'Take over the loop when platform changes need a distinct treatment.',
    startsAt: '2026-05-10T10:10:00.000Z',
    durationMs: 180000,
    priority: 'takeover' as const,
  },
];

export const AnnouncementLoop: Story = {
  args: {
    items: baseItems,
    now: () => new Date('2026-05-10T10:03:00.000Z').getTime(),
    locale: 'en-GB',
    timeZone: 'UTC',
  },
};

export const MenuDaypart: Story = {
  args: {
    items: [
      {
        id: 'breakfast',
        label: 'Breakfast specials',
        detail: 'Coffee combos and bakery items before the lunch switch.',
        startsAt: '2026-05-10T07:00:00.000Z',
        durationMs: 10800000,
      },
      {
        id: 'lunch',
        label: 'Lunch menu',
        detail: 'Main service board with queue-friendly dwell length.',
        startsAt: '2026-05-10T10:00:00.000Z',
        durationMs: 14400000,
        priority: 'priority',
      },
      {
        id: 'dinner',
        label: 'Dinner preview',
        detail: 'Future state queued without taking over the current menu board.',
        startsAt: '2026-05-10T14:00:00.000Z',
        durationMs: 18000000,
      },
    ],
    now: () => new Date('2026-05-10T12:00:00.000Z').getTime(),
    locale: 'en-GB',
    timeZone: 'UTC',
  },
};

export const TakeoverQueue: Story = {
  args: {
    items: [
      {
        id: 'normal',
        label: 'Standard lobby loop',
        detail: 'Baseline welcome state for visitors and regular traffic.',
        startsAt: '2026-05-10T10:00:00.000Z',
        durationMs: 600000,
      },
      {
        id: 'takeover',
        label: 'Emergency closure notice',
        detail: 'Next item is a takeover, not just another future slide.',
        startsAt: '2026-05-10T10:10:00.000Z',
        durationMs: 300000,
        priority: 'takeover',
      },
    ],
    now: () => new Date('2026-05-10T10:08:00.000Z').getTime(),
    locale: 'en-GB',
    timeZone: 'UTC',
  },
};