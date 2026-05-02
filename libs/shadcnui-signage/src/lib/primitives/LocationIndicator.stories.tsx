import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from './ScreenFrame';
import { LocationIndicator } from './LocationIndicator';

const meta: Meta<typeof LocationIndicator> = {
  title: 'Signage/Primitives/LocationIndicator',
  component: LocationIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'LocationIndicator is for orientation on directory, reception, and wayfinding screens. The useful examples show it inside page-level navigation cues, not floating as an isolated status pill.',
      },
    },
  },
  argTypes: {
    location: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.45}>
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,#020617,#0f172a_55%,#082f49)] p-16 text-white">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LocationIndicator>;

export const MainLobby: Story = {
  render: () => (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
      <div>
        <div className="text-sm uppercase tracking-[0.32em] text-cyan-300/70 lg:text-lg">
          Orientation cue
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Tell people where they are before asking where they need to go.
        </h2>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
          The location marker belongs near the top of a wayfinding or directory
          screen so the viewer can anchor the rest of the instructions.
        </p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm lg:p-10">
        <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">
          Current position
        </div>
        <div className="mt-5">
          <LocationIndicator location="Main Lobby" />
        </div>
      </div>
    </div>
  ),
};

export const CustomLabel: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm lg:p-10">
      <div className="text-sm uppercase tracking-[0.32em] text-cyan-300/70 lg:text-lg">
        Label variant
      </div>
      <div className="mt-4 text-4xl font-semibold tracking-tight text-white lg:text-5xl">
        Visitor reception check-in
      </div>
      <p className="mt-3 text-xl leading-relaxed text-slate-300 lg:text-2xl">
        Override the prefix label when the language of the screen calls for a
        more specific zone marker.
      </p>
      <div className="mt-6">
        <LocationIndicator label="Current zone:" location="Visitor Reception" />
      </div>
    </div>
  ),
};

export const DirectoryHeader: Story = {
  render: () => (
    <div className="space-y-10 text-center lg:space-y-12">
      <div>
        <div className="text-sm uppercase tracking-[0.32em] text-cyan-300/70 lg:text-lg">
          Building navigation
        </div>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Office directory
        </h2>
      </div>
      <LocationIndicator location="North Atrium" />
    </div>
  ),
};
