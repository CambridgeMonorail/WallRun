import type { Meta, StoryObj } from '@storybook/react';
import { OfflineFallback } from './OfflineFallback';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof OfflineFallback> = {
  title: 'Signage/Behaviour/OfflineFallback',
  component: OfflineFallback,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'OfflineFallback keeps a data-driven region useful when the live feed is unavailable or unhealthy. Use it around unstable content boundaries so an unattended screen never collapses into an empty slot, spinner, or broken widget. The fallback should preserve the last dependable instruction, not just apologise for failure.',
      },
    },
  },
  argTypes: {
    isOnline: { control: 'boolean' },
    isHealthy: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="h-full bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.12),transparent_34%),linear-gradient(135deg,#020617,#111827_48%,#312e81)] p-12 text-white lg:p-16">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OfflineFallback>;

const onlineOfflineSource = String.raw`import { OfflineFallback } from '@wallrun/shadcnui-signage';

export function TransportPanel({ isOnline, isHealthy }: { isOnline: boolean; isHealthy: boolean }) {
  return (
    <OfflineFallback
      isOnline={isOnline}
      isHealthy={isHealthy}
      fallback={<TransportFallbackPanel />}
    >
      <LiveDeparturesPanel />
    </OfflineFallback>
  );
}`;

const healthSignalSource = String.raw`import { OfflineFallback } from '@wallrun/shadcnui-signage';

export function FeedBoundary() {
  return (
    <OfflineFallback isOnline isHealthy={false} fallback={<FallbackPanel />}>
      <LiveFeedPanel />
    </OfflineFallback>
  );
}`;

const shellClassName =
  'mx-auto grid h-full max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr]';

const livePanel = (
  <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-400/8 p-8 shadow-xl lg:p-10">
    <div className="text-sm uppercase tracking-[0.3em] text-emerald-200/70 lg:text-base">
      Live content
    </div>
    <div className="mt-5 text-5xl font-semibold tracking-tight text-white lg:text-6xl">
      Shuttle departures
    </div>
    <div className="mt-6 grid gap-4">
      <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/45 px-5 py-4 text-2xl text-slate-100 lg:text-3xl">
        Central Station 5 min
      </div>
      <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/45 px-5 py-4 text-2xl text-slate-100 lg:text-3xl">
        South Campus 12 min
      </div>
      <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/45 px-5 py-4 text-2xl text-slate-100 lg:text-3xl">
        Riverside 18 min
      </div>
    </div>
  </div>
);

const fallbackPanel = (
  <div className="rounded-[2rem] border border-amber-300/20 bg-amber-400/8 p-8 shadow-xl lg:p-10">
    <div className="text-sm uppercase tracking-[0.3em] text-amber-200/75 lg:text-base">
      Stable fallback
    </div>
    <div className="mt-5 text-5xl font-semibold tracking-tight text-white lg:text-6xl">
      Live departures unavailable
    </div>
    <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-200 lg:text-2xl">
      Display the last dependable instruction set instead of a broken widget or
      empty panel.
    </p>
    <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-6 text-xl text-slate-100 lg:text-2xl">
      Please use the transport desk beside reception for the latest shuttle
      times.
    </div>
  </div>
);

export const OnlineOfflineToggle: Story = {
  args: { isOnline: true, isHealthy: true },
  parameters: {
    docs: {
      description: {
        story:
          'This example shows the core boundary: when connectivity or feed health drops, the region swaps to a stable replacement instead of disappearing. Toggle the controls to compare the live and fallback states in the same layout shell.',
      },
      source: {
        code: onlineOfflineSource,
      },
    },
  },
  render: (args) => (
    <div className={shellClassName}>
      <div className="flex flex-col justify-between gap-8">
        <div>
          <div className="text-sm uppercase tracking-[0.32em] text-violet-200/70 lg:text-lg">
            Connectivity boundary
          </div>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
            Networked zones should fail into something intentional.
          </h2>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
            Toggle this story offline to compare the live transport panel with a
            fallback message that still helps the person in front of the screen.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-violet-300/10 bg-violet-300/8 p-6 text-lg text-violet-50/85 lg:text-xl">
          The component boundary decides whether the region renders live data or
          a stable replacement based on network and health signals.
        </div>
      </div>
      <OfflineFallback {...args} fallback={fallbackPanel}>
        {livePanel}
      </OfflineFallback>
    </div>
  ),
};

export const HealthSignalFallback: Story = {
  args: { isOnline: true, isHealthy: false },
  parameters: {
    docs: {
      description: {
        story:
          'Browser connectivity is not enough. In production, the device can still be online while the upstream service is stale, failing, or returning invalid data. Treat health as a first-class condition and fail over anyway.',
      },
      source: {
        code: healthSignalSource,
      },
    },
  },
  render: (args) => (
    <div className={shellClassName}>
      <div className="space-y-6">
        <div className="text-sm uppercase tracking-[0.32em] text-violet-200/70 lg:text-lg">
          Upstream outage
        </div>
        <h2 className="text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          A service can be unhealthy even while the browser is still online.
        </h2>
        <p className="max-w-xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
          This is the more realistic signage failure mode: the device has a
          connection, but the feed itself is stale or broken, so the region
          swaps to the fallback anyway.
        </p>
      </div>
      <OfflineFallback {...args} fallback={fallbackPanel}>
        {livePanel}
      </OfflineFallback>
    </div>
  ),
};
