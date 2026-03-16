import { Composition, Series } from 'remotion';
import { type FC } from 'react';
import { FPS, WIDTH, HEIGHT, TOTAL_DURATION, DURATIONS } from './data/timings';
import { HookScene } from './scenes/HookScene';
import { FrustrationScene } from './scenes/FrustrationScene';
import { ReframeScene } from './scenes/ReframeScene';
import { ShowcaseScene } from './scenes/ShowcaseScene';
import { ToolkitScene } from './scenes/ToolkitScene';
import { ConstraintsScene } from './scenes/ConstraintsScene';
import { CloseScene } from './scenes/CloseScene';

/** Full video — 7-scene narrative arc (~39s) */
const MainVideo: FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={DURATIONS.hook}>
        <HookScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.frustration}>
        <FrustrationScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.reframe}>
        <ReframeScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.showcase}>
        <ShowcaseScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.toolkit}>
        <ToolkitScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.constraints}>
        <ConstraintsScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DURATIONS.close}>
        <CloseScene />
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
        id="HookScene"
        component={HookScene}
        durationInFrames={DURATIONS.hook}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="FrustrationScene"
        component={FrustrationScene}
        durationInFrames={DURATIONS.frustration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ReframeScene"
        component={ReframeScene}
        durationInFrames={DURATIONS.reframe}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ShowcaseScene"
        component={ShowcaseScene}
        durationInFrames={DURATIONS.showcase}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ToolkitScene"
        component={ToolkitScene}
        durationInFrames={DURATIONS.toolkit}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ConstraintsScene"
        component={ConstraintsScene}
        durationInFrames={DURATIONS.constraints}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CloseScene"
        component={CloseScene}
        durationInFrames={DURATIONS.close}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
