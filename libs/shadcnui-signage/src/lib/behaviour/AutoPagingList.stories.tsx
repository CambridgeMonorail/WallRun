import type { Meta, StoryObj } from '@storybook/react';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { AutoPagingList } from './AutoPagingList';
import { ScreenFrame } from '../primitives/ScreenFrame';

type EventItem = { id: string; title: string; time: string };

const meta: Meta<typeof AutoPagingList> = {
  title: 'Signage/Behaviour/AutoPagingList',
  component: AutoPagingList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'AutoPagingList is for dense, ordered content that exceeds one screen but still needs large readable type. Use it when the region should page predictably with no manual controls, such as schedules, agenda boards, arrivals, or notices. Build the visual shell first, then let AutoPagingList manage which slice of content is visible inside that fixed region.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="h-full bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_34%),linear-gradient(135deg,#020617,#111827_45%,#1e1b4b)] p-12 text-white lg:p-16">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AutoPagingList>;

const eventsPagingSource = String.raw`import { AutoPagingList } from '@wallrun/shadcnui-signage';

export function AgendaBoard({ items }: { items: AgendaItem[] }) {
  return (
    <AutoPagingList
      items={items}
      pageSize={5}
      dwellMs={2000}
      getKey={(item) => item.id}
      renderItem={(item) => <AgendaRow item={item} />}
    />
  );
}`;

const itemsUpdateSource = String.raw`import { useEffect, useState } from 'react';
import { AutoPagingList } from '@wallrun/shadcnui-signage';

export function LiveAgenda() {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setItems((current) => [...current.slice(0, 2), insertedAlert, ...current.slice(2)]);
    }, 4500);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <AutoPagingList
      items={items}
      pageSize={4}
      dwellMs={2000}
      getKey={(item) => item.id}
      renderItem={(item) => <AgendaRow item={item} />}
    />
  );
}`;

const pauseResumeSource = String.raw`import { useState } from 'react';
import { AutoPagingList } from '@wallrun/shadcnui-signage';

export function OperatorControlledList({ items }: { items: NoticeItem[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <button onClick={() => setPaused((value) => !value)}>
        {paused ? 'Resume rotation' : 'Pause rotation'}
      </button>

      <AutoPagingList
        items={items}
        pageSize={3}
        dwellMs={1500}
        isPaused={paused}
        getKey={(item) => item.id}
        renderItem={(item) => <NoticeRow item={item} />}
      />
    </>
  );
}`;

const row = (item: EventItem) => (
  <div className="flex items-center justify-between gap-6 rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-5 shadow-lg backdrop-blur-sm lg:px-8 lg:py-6">
    <div>
      <div className="text-2xl font-semibold tracking-tight text-white lg:text-3xl">
        {item.title}
      </div>
      <div className="mt-1 text-sm uppercase tracking-[0.24em] text-indigo-200/60 lg:text-base">
        Live agenda item
      </div>
    </div>
    <div className="text-2xl font-medium text-indigo-100/85 tabular-nums lg:text-3xl">
      {item.time}
    </div>
  </div>
);

const shellClassName =
  'mx-auto grid h-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]';

const panelClassName =
  'rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-sm lg:p-10';

export const EventsPaging: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use paging when the content is naturally sequential and deserves large type. This example keeps five agenda rows readable without turning the region into a tiny scrolling list.',
      },
      source: {
        code: eventsPagingSource,
      },
    },
  },
  render: () => <EventsPagingStory />,
};

const EventsPagingStory: FC = () => {
  const items: EventItem[] = useMemo(
    () =>
      [
        'Opening remarks',
        'Partner keynote',
        'Platform roadmap',
        'Breakout session A',
        'Breakout session B',
        'Lunch service',
        'Customer panel',
        'Afternoon workshop',
        'Studio demo',
        'Networking reception',
      ].map((title, index) => ({
        id: `event-${index + 1}`,
        title,
        time: `${9 + Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
      })),
    [],
  );

  return (
    <div className={shellClassName}>
      <div className="flex flex-col justify-between gap-6">
        <div>
          <div className="text-sm uppercase tracking-[0.32em] text-indigo-200/65 lg:text-lg">
            Rotating content zone
          </div>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
            Page long schedules without shrinking the type.
          </h2>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
            `AutoPagingList` works when density exceeds a single screen but the
            content still has to stay calm and readable.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-indigo-300/10 bg-indigo-300/8 p-6 text-lg text-indigo-100/80 lg:text-xl">
          Five rows per page, two-second dwell, no manual pagination controls.
        </div>
      </div>
      <div className={panelClassName}>
        <div className="mb-6 text-sm uppercase tracking-[0.3em] text-indigo-200/60 lg:text-base">
          Auditorium schedule
        </div>
        <AutoPagingList
          items={items}
          pageSize={5}
          dwellMs={2000}
          getKey={(item) => item.id}
          renderItem={(item) => row(item)}
          className="space-y-3 lg:space-y-4"
        />
      </div>
    </div>
  );
};

export const ItemsUpdateMidCycle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Real feeds change while the screen is already live. This story shows the list recovering from a mid-cycle insertion without dumping the user back to the beginning of an unrelated page.',
      },
      source: {
        code: itemsUpdateSource,
      },
    },
  },
  render: () => <ItemsUpdateMidCycleStory />,
};

const ItemsUpdateMidCycleStory: FC = () => {
  const [items, setItems] = useState<EventItem[]>(
    [
      'Check-in desk',
      'Coffee service',
      'Morning briefing',
      'Floor reset',
      'Accessibility review',
      'Lunch prep',
      'Stage rehearsal',
      'Venue open',
    ].map((title, index) => ({
      id: `event-${index + 1}`,
      title,
      time: `10:${pad(index * 5)}`,
    })),
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      setItems((current) => {
        const next = [...current];
        next.splice(2, 0, {
          id: 'new',
          title: 'Security announcement inserted live',
          time: '11:00',
        });
        return next;
      });
    }, 4500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={shellClassName}>
      <div className="space-y-6">
        <div className="text-sm uppercase tracking-[0.32em] text-indigo-200/65 lg:text-lg">
          Feed mutation
        </div>
        <h2 className="text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Mid-cycle updates stay calm.
        </h2>
        <p className="max-w-xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
          After 4.5 seconds, a new item is inserted near the top of the list.
          The story shows how the paging system recovers without dumping the
          whole screen state.
        </p>
      </div>
      <div className={panelClassName}>
        <AutoPagingList
          items={items}
          pageSize={4}
          dwellMs={2000}
          getKey={(item) => item.id}
          renderItem={(item) => row(item)}
          className="space-y-3 lg:space-y-4"
        />
      </div>
    </div>
  );
};

export const PauseAndResume: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pausing matters when an operator wants to hold the current page for attention, announcements, or queue management. The list should stop paging without changing layout or resetting the visible slice.',
      },
      source: {
        code: pauseResumeSource,
      },
    },
  },
  render: () => <PauseAndResumeStory />,
};

const PauseAndResumeStory: FC = () => {
  const [paused, setPaused] = useState(false);
  const items: EventItem[] = [
    'Morning headlines',
    'Weather update',
    'Visitor notices',
    'Catering status',
    'Transport alerts',
    'Closing reminders',
  ].map((title, index) => ({
    id: `event-${index + 1}`,
    title,
    time: `12:${pad(index * 3)}`,
  }));

  return (
    <div className={shellClassName}>
      <div className="space-y-6">
        <div className="text-sm uppercase tracking-[0.32em] text-indigo-200/65 lg:text-lg">
          Operator state
        </div>
        <h2 className="text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Pause a loop when a human needs to hold the page.
        </h2>
        <button
          className="w-fit rounded-full border border-indigo-200/20 bg-indigo-200/10 px-5 py-3 text-lg font-medium text-indigo-50 transition hover:bg-indigo-200/20"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? 'Resume rotation' : 'Pause rotation'}
        </button>
      </div>
      <div className={panelClassName}>
        <AutoPagingList
          items={items}
          pageSize={3}
          dwellMs={1500}
          isPaused={paused}
          getKey={(item) => item.id}
          renderItem={(item) => row(item)}
          className="space-y-3 lg:space-y-4"
        />
      </div>
    </div>
  );
};

function pad(value: number) {
  return String(value).padStart(2, '0');
}