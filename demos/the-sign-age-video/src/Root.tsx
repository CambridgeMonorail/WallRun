import { Composition, Series } from 'remotion';
import { type FC } from 'react';
import { FPS, WIDTH, HEIGHT, TOTAL_DURATION, DURATIONS } from './data/timings';
import { IntroScene } from './scenes/IntroScene';
import { ProblemScene } from './scenes/ProblemScene';
import { SignageAsSoftwareScene } from './scenes/SignageAsSoftwareScene';
import { RepoOverviewScene } from './scenes/RepoOverviewScene';
import { WhyItMattersScene } from './scenes/WhyItMattersScene';
import { OutroScene } from './scenes/OutroScene';

/** Full video assembled from sequential scenes */
const MainVideo: FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={DURATIONS.intro}>
        <IntroScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.problem}>
        <ProblemScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.shift}>
        <SignageAsSoftwareScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.repoOverview}>
        <RepoOverviewScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.whyItMatters}>
        <WhyItMattersScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.outro}>
        <OutroScene />
      </Series.Sequence>
    </Series>
  );
};

/** Remotion Root — registers all compositions */
export const RemotionRoot: FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={MainVideo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* Individual scene compositions for isolated preview */}
      <Composition
        id="IntroScene"
        component={IntroScene}
        durationInFrames={DURATIONS.intro}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ProblemScene"
        component={ProblemScene}
        durationInFrames={DURATIONS.problem}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="SignageAsSoftwareScene"
        component={SignageAsSoftwareScene}
        durationInFrames={DURATIONS.shift}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="RepoOverviewScene"
        component={RepoOverviewScene}
        durationInFrames={DURATIONS.repoOverview}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="WhyItMattersScene"
        component={WhyItMattersScene}
        durationInFrames={DURATIONS.whyItMatters}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="OutroScene"
        component={OutroScene}
        durationInFrames={DURATIONS.outro}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
