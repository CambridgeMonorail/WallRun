import type { Meta, StoryObj } from '@storybook/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ContentRotator } from './ContentRotator';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof ContentRotator> = {
  title: 'Signage/Behaviour/ContentRotator',
  component: ContentRotator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ContentRotator handles screen-level slide loops for welcome sequences, announcement playlists, or multi-state dashboard zones. The useful stories are the ones that show why a screen would rotate at all, not just that the index increments.',
      },
    },
  },
  argTypes: {
    intervalMs: { control: 'number' },
    isPaused: { control: 'boolean' },
    transition: { control: 'select', options: ['none', 'fade', 'slide'] },
    transitionDurationMs: { control: 'number' },
    startIndex: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.42}>
          <div className="h-full bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.16),transparent_34%),linear-gradient(135deg,#020617,#0f172a_48%,#134e4a)] p-12 text-white lg:p-16">
            <Story />
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContentRotator>;

const shellClassName =
  'mx-auto grid h-full max-w-6xl gap-10 lg:grid-cols-[0.88fr_1.12fr]';

const panelClassName =
  'rounded-[2rem] border border-white/10 bg-slate-950/72 p-8 shadow-2xl backdrop-blur-sm lg:p-10';

const Slide = ({
  eyebrow,
  title,
  body,
  accent,
}: {
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
}) => (
  <div className="min-h-[540px] rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm lg:p-10">
    <div className="text-sm uppercase tracking-[0.32em] text-teal-200/70 lg:text-base">
      {eyebrow}
    </div>
    <div className="mt-6 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
      {title}
    </div>
    <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
      {body}
    </p>
    <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-6 lg:p-8">
      <div className="text-sm uppercase tracking-[0.28em] text-teal-200/60">
        Current emphasis
      </div>
      <div className="mt-3 text-4xl font-semibold tracking-tight text-white lg:text-5xl">
        {accent}
      </div>
    </div>
  </div>
);

export const DefaultRotation: Story = {
  render: () => (
    <div className={shellClassName}>
      <div className="flex flex-col justify-between gap-8">
        <div>
          <div className="text-sm uppercase tracking-[0.32em] text-teal-200/70 lg:text-lg">
            Playlist shell
          </div>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
            Rotate whole content zones, not tiny widgets.
          </h2>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
            The component is most useful when one region needs to cycle through
            several complete messages while the rest of the screen stays stable.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-teal-300/10 bg-teal-300/8 p-6 text-lg text-teal-50/85 lg:text-xl">
          Five-second dwell, crossfade transition, and three slides in a campus
          communications loop.
        </div>
      </div>
      <div className={panelClassName}>
        <ContentRotator intervalMs={5000} transition="fade">
          {[
            <Slide
              key="a"
              eyebrow="Morning loop"
              title="Announcements"
              body="Show lobby notices, staffing reminders, and visitor guidance without forcing every message onto a single crowded page."
              accent="Reception desk staffed until 18:00"
            />,
            <Slide
              key="b"
              eyebrow="Event feed"
              title="Events"
              body="Swap to the next high-priority message on a predictable cadence so each slide gets full-screen hierarchy."
              accent="Studio demo begins at 14:30"
            />,
            <Slide
              key="c"
              eyebrow="Travel advisory"
              title="Weather"
              body="A later slide can carry transport or weather disruption without permanently displacing the welcome state."
              accent="Heavy rain expected after 17:00"
            />,
          ]}
        </ContentRotator>
      </div>
    </div>
  ),
};

export const PauseResumeControls: Story = {
  render: () => <PauseResumeControlsStory />,
};

const PauseResumeControlsStory: FC = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className={shellClassName}>
      <div className="space-y-6">
        <div className="text-sm uppercase tracking-[0.32em] text-teal-200/70 lg:text-lg">
          Operator override
        </div>
        <h2 className="text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Pause the loop when a human needs to hold attention.
        </h2>
        <p className="max-w-xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
          This is the common operational case: a playlist normally rotates, but
          staff can freeze it on the current state during check-in or a live
          announcement.
        </p>
        <button
          className="w-fit rounded-full border border-teal-200/20 bg-teal-200/10 px-5 py-3 text-lg font-medium text-teal-50 transition hover:bg-teal-200/20"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? 'Resume loop' : 'Pause loop'}
        </button>
      </div>
      <div className={panelClassName}>
        <ContentRotator intervalMs={2500} isPaused={paused} transition="slide">
          {[
            <Slide
              key="1"
              eyebrow="Now showing"
              title="Visitor check-in"
              body="Hold this screen while queues build so nobody misses the active instruction set."
              accent="Photo ID required for temporary badges"
            />,
            <Slide
              key="2"
              eyebrow="Next state"
              title="Catering service"
              body="Resume when the space is ready to rotate back through lower-priority content."
              accent="Atrium coffee bar open until 11:30"
            />,
            <Slide
              key="3"
              eyebrow="Later"
              title="Community events"
              body="The loop can carry lighter editorial content once the operational need has passed."
              accent="Design critique in Studio A at 16:00"
            />,
          ]}
        </ContentRotator>
      </div>
    </div>
  );
};

export const DynamicChildrenLengthChange: Story = {
  render: () => <DynamicChildrenLengthChangeStory />,
};

const DynamicChildrenLengthChangeStory: FC = () => {
  const [slides, setSlides] = useState([
    <Slide
      key="a"
      eyebrow="Venue mode"
      title="Morning brief"
      body="The playlist starts with three content states before the final one is withdrawn."
      accent="Security briefing at 09:00"
    />,
    <Slide
      key="b"
      eyebrow="Venue mode"
      title="Lunch service"
      body="The rotator should keep its place cleanly when the available child list changes at runtime."
      accent="Ground floor cafe opens at 12:00"
    />,
    <Slide
      key="c"
      eyebrow="Withdrawn state"
      title="Evening reception"
      body="This third slide disappears after six seconds to simulate a feed-driven update."
      accent="Removed from schedule"
    />,
  ]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setSlides((s) => s.slice(0, 2));
    }, 6000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={shellClassName}>
      <div className="space-y-6">
        <div className="text-sm uppercase tracking-[0.32em] text-teal-200/70 lg:text-lg">
          Feed changes
        </div>
        <h2 className="text-5xl font-semibold tracking-tight text-white lg:text-7xl">
          Runtime updates should not destabilise the loop.
        </h2>
        <p className="max-w-xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
          After six seconds, the third child is removed. This mirrors real feed
          conditions where a scheduled state drops out before the playlist ends.
        </p>
      </div>
      <div className={panelClassName}>
        <ContentRotator intervalMs={2000} transition="fade">
          {slides}
        </ContentRotator>
      </div>
    </div>
  );
};
