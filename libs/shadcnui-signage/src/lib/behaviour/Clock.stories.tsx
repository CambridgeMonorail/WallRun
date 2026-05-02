import type { Meta, StoryObj } from '@storybook/react';
import { Clock } from './Clock';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof Clock> = {
  title: 'Signage/Behaviour/Clock',
  component: Clock,
  tags: ['autodocs'],
  argTypes: {
    format: { control: 'select', options: ['HH:mm', 'HH:mm:ss'] },
    timezone: { control: 'text' },
    locale: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.45}>
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,#020617,#0f172a_50%,#0c4a6e)] p-16 text-white">
            <div className="w-full max-w-5xl rounded-[2rem] border border-cyan-400/15 bg-slate-950/75 p-10 shadow-2xl backdrop-blur-sm lg:p-14">
              <Story />
            </div>
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Clock>;

const signageClockClassName =
  'text-7xl font-semibold tracking-tight text-white sm:text-8xl lg:text-9xl';

const panelClassName =
  'rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-center shadow-xl';

export const HHmm: Story = {
  args: { format: 'HH:mm', timezone: undefined },
  render: (args) => (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div>
        <div className="text-sm uppercase tracking-[0.32em] text-cyan-300/70 lg:text-lg">
          Lobby time
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Building opens in sequence.
        </h2>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
          Use `Clock` when the time itself is a primary information zone, not a
          small utility tucked into page chrome.
        </p>
      </div>
      <div className={panelClassName}>
        <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 lg:text-base">
          Main atrium
        </div>
        <Clock {...args} className={signageClockClassName} />
      </div>
    </div>
  ),
};

export const HHmmss: Story = {
  args: { format: 'HH:mm:ss', timezone: undefined },
  render: (args) => (
    <div className="space-y-10 text-center">
      <div>
        <div className="text-sm uppercase tracking-[0.32em] text-cyan-300/70 lg:text-lg">
          Control room
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Use seconds where operators need live timing.
        </h2>
      </div>
      <div className="mx-auto max-w-4xl rounded-[1.75rem] border border-sky-400/20 bg-sky-400/8 p-8 shadow-xl">
        <Clock
          {...args}
          className="text-6xl font-semibold tracking-tight text-sky-100 sm:text-7xl lg:text-8xl"
        />
      </div>
    </div>
  ),
};

export const TimezoneExample: Story = {
  args: { format: 'HH:mm', timezone: 'America/New_York' },
  render: (args) => (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-left shadow-xl lg:col-span-1">
        <div className="text-sm uppercase tracking-[0.28em] text-cyan-300/70">
          Remote office
        </div>
        <div className="mt-4 text-3xl font-semibold tracking-tight text-white">
          New York support desk
        </div>
        <p className="mt-3 text-lg leading-relaxed text-slate-300">
          Render a second timezone where distributed teams or live events need a
          stable reference clock.
        </p>
      </div>
      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-center shadow-xl lg:col-span-2">
        <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 lg:text-base">
          America/New_York
        </div>
        <Clock {...args} className={signageClockClassName} />
      </div>
    </div>
  ),
};