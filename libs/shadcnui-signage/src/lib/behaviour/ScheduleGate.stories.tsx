import type { Meta, StoryObj } from '@storybook/react';
import { ScheduleGate } from './ScheduleGate';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof ScheduleGate> = {
  title: 'Signage/Behaviour/ScheduleGate',
  component: ScheduleGate,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ScheduleGate switches between whole content states based on day and time windows. Use it when the screen shell stays constant but the payload changes by operating hours, dayparts, or overnight modes. Treat the gate as a boundary around meaningful regions rather than as a small conditional wrapped around one line of text.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ScreenFrame resolution="1080p" scale={0.5}>
        <div className="bg-slate-950 p-12 h-full">
          <Story />
        </div>
      </ScreenFrame>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScheduleGate>;

const officeHoursSource = String.raw`import { ScheduleGate } from '@wallrun/shadcnui-signage';

export function ReceptionHours() {
  return (
    <ScheduleGate
      windows={[
        {
          days: ['mon', 'tue', 'wed', 'thu', 'fri'],
          start: '09:00',
          end: '17:00',
        },
      ]}
      fallback={<ReceptionClosed />}
    >
      <ReceptionOpen />
    </ScheduleGate>
  );
}`;

const overnightSource = String.raw`import { ScheduleGate } from '@wallrun/shadcnui-signage';

export function OvernightMode() {
  return (
    <ScheduleGate
      windows={[{ start: '22:00', end: '06:00' }]}
      fallback={<DayMode />}
    >
      <NightMode />
    </ScheduleGate>
  );
}`;

const daypartSource = String.raw`import { ScheduleGate } from '@wallrun/shadcnui-signage';

export function DaypartBoard() {
  return (
    <>
      <ScheduleGate windows={[{ start: '06:00', end: '10:30' }]} fallback={null}>
        <BreakfastBoard />
      </ScheduleGate>

      <ScheduleGate windows={[{ start: '10:30', end: '15:00' }]} fallback={null}>
        <LunchBoard />
      </ScheduleGate>

      <ScheduleGate windows={[{ start: '15:00', end: '22:00' }]} fallback={null}>
        <DinnerBoard />
      </ScheduleGate>
    </>
  );
}`;

const Box = ({ title }: { title: string }) => (
  <div className="rounded-3xl border border-slate-700/50 bg-slate-900/40 p-10">
    <div className="text-5xl font-bold text-white">{title}</div>
    <div className="mt-4 text-2xl text-slate-300">Window matched</div>
  </div>
);

export const WeekdayOfficeHours: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This is the common use of ScheduleGate: the screen layout stays fixed, but a full region flips between open and closed states based on predictable business hours.',
      },
      source: {
        code: officeHoursSource,
      },
    },
  },
  render: () => {
    const fixedNow = () => new Date('2026-02-09T10:30:00').getTime(); // Monday local

    return (
      <ScheduleGate
        now={fixedNow}
        windows={[
          {
            days: ['mon', 'tue', 'wed', 'thu', 'fri'],
            start: '09:00',
            end: '17:00',
          },
        ]}
        fallback={<div className="text-3xl text-slate-300">Closed</div>}
      >
        <Box title="Open" />
      </ScheduleGate>
    );
  },
};

export const OvernightWindow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Overnight windows matter for transport, hospitality, and venue operations. The gate should handle midnight crossover cleanly so the screen does not need ad hoc time logic in each child component.',
      },
      source: {
        code: overnightSource,
      },
    },
  },
  render: () => {
    const fixedNow = () => new Date('2026-02-09T01:30:00').getTime(); // local 01:30
    return (
      <ScheduleGate
        now={fixedNow}
        windows={[{ start: '22:00', end: '06:00' }]}
        fallback={<div className="text-3xl text-slate-300">Not in window</div>}
      >
        <Box title="Overnight Mode" />
      </ScheduleGate>
    );
  },
};

export const DaypartingExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Dayparting is a strong signage pattern because the same screen shell can serve breakfast, lunch, and dinner without rewriting the page. Gate complete menu regions, not individual labels or prices.',
      },
      source: {
        code: daypartSource,
      },
    },
  },
  render: () => {
    const nowBreakfast = () => new Date('2026-02-09T08:15:00').getTime();
    return (
      <div className="space-y-6">
        <ScheduleGate
          now={nowBreakfast}
          windows={[{ start: '06:00', end: '10:30' }]}
          fallback={null}
        >
          <Box title="Breakfast" />
        </ScheduleGate>
        <ScheduleGate
          now={nowBreakfast}
          windows={[{ start: '10:30', end: '15:00' }]}
          fallback={null}
        >
          <Box title="Lunch" />
        </ScheduleGate>
        <ScheduleGate
          now={nowBreakfast}
          windows={[{ start: '15:00', end: '22:00' }]}
          fallback={null}
        >
          <Box title="Dinner" />
        </ScheduleGate>
      </div>
    );
  },
};
