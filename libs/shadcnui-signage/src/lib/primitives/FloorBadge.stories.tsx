import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { FloorBadge } from './FloorBadge';

const meta: Meta<typeof FloorBadge> = {
  title: 'Signage/Primitives/FloorBadge',
  component: FloorBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'FloorBadge is a wayfinding accent, not a standalone novelty chip. The useful examples place it inside directory or visitor-navigation contexts where a floor callout has to read immediately.',
      },
    },
  },
  argTypes: {
    floor: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.45}>
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-16 text-white">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FloorBadge>;

export const LobbyWayfinding: Story = {
  render: () => (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div>
        <div className="text-sm uppercase tracking-[0.32em] text-cyan-300/70 lg:text-lg">
          Wayfinding label
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Use the floor badge where navigation needs a fast anchor.
        </h2>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
          On directory and arrival screens, the floor indicator should stand out
          from the rest of the metadata instead of blending into a paragraph.
        </p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm lg:p-10">
        <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">
          Destination
        </div>
        <div className="mt-4 text-4xl font-semibold tracking-tight text-white lg:text-5xl">
          Visitor meeting suites
        </div>
        <div className="mt-6">
          <FloorBadge floor={3} />
        </div>
      </div>
    </div>
  ),
};

export const ExecutiveLevel: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm lg:p-10">
      <div className="text-sm uppercase tracking-[0.32em] text-cyan-300/70 lg:text-lg">
        Premium zone
      </div>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
            Executive briefing centre
          </div>
          <p className="mt-3 text-xl leading-relaxed text-slate-300 lg:text-2xl">
            Variant styling is useful when a site needs to distinguish VIP or
            restricted-access floors from general navigation zones.
          </p>
        </div>
        <FloorBadge
          floor="12A"
          className="from-violet-500 to-fuchsia-500 text-lg lg:text-2xl"
        />
      </div>
    </div>
  ),
};

export const BadgeLineup: Story = {
  render: () => (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="text-center">
        <div className="text-sm uppercase tracking-[0.32em] text-cyan-300/70 lg:text-lg">
          Directory system
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Multiple floor cues can still feel part of one signage family.
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
        <FloorBadge floor={1} />
        <FloorBadge floor={2} />
        <FloorBadge floor={3} className="from-emerald-500 to-teal-500" />
        <FloorBadge floor="Roof" className="from-violet-500 to-fuchsia-500" />
      </div>
    </div>
  ),
};