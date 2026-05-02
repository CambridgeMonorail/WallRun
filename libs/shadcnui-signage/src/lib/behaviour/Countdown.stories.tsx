import type { Meta, StoryObj } from '@storybook/react';
import { Countdown } from './Countdown';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof Countdown> = {
  title: 'Signage/Behaviour/Countdown',
  component: Countdown,
  tags: ['autodocs'],
  argTypes: {
    format: { control: 'select', options: ['mm:ss', 'HH:mm:ss', 'human'] },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.45}>
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_34%),linear-gradient(135deg,#1c1917,#431407_45%,#020617)] p-16 text-white">
            <div className="w-full max-w-5xl rounded-[2rem] border border-orange-400/15 bg-slate-950/75 p-10 shadow-2xl backdrop-blur-sm lg:p-14">
              <Story />
            </div>
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Countdown>;

export const NinetySeconds: Story = {
  render: () => {
    const target = Date.now() + 90_000;
    return (
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <div className="text-sm uppercase tracking-[0.32em] text-orange-300/70 lg:text-lg">
            Stage control
          </div>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
            Doors open in ninety seconds.
          </h2>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
            Use `Countdown` when a single timed milestone has to dominate the
            screen and stay legible from distance.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-center shadow-xl">
          <div className="text-sm uppercase tracking-[0.3em] text-orange-300/70">
            House open
          </div>
          <Countdown
            targetEpochMs={target}
            format="mm:ss"
            className="text-7xl font-semibold tracking-tight text-orange-100 sm:text-8xl lg:text-9xl"
          />
        </div>
      </div>
    );
  },
};

export const Completed: Story = {
  render: () => {
    const target = Date.now() - 10_000;
    return (
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <div className="text-sm uppercase tracking-[0.32em] text-emerald-300/70 lg:text-lg">
          Status change
        </div>
        <div className="rounded-[1.75rem] border border-emerald-400/20 bg-emerald-400/8 p-10 shadow-xl">
          <Countdown
            targetEpochMs={target}
            format="human"
            className="text-5xl font-semibold tracking-tight text-emerald-100 sm:text-6xl lg:text-7xl"
          />
        </div>
        <p className="text-xl text-slate-300 lg:text-2xl">
          The completed state reads like a resolved signage message rather than
          a timer frozen on zero.
        </p>
      </div>
    );
  },
};