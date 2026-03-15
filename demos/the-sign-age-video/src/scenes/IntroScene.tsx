import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';

const ACCENT_LINE_DELAY = 15;
const SUBTITLE_DELAY = MOTION.fadeIn + 10;

/** Opening hook: "Software that lives on walls" */
export const IntroScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, subtitle } = SCRIPT.intro;

  const headlineOpacity = interpolate(frame, [0, MOTION.fadeIn], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const headlineY = interpolate(frame, [0, MOTION.fadeIn], [30, 0], {
    extrapolateRight: 'clamp',
  });

  const accentWidth = interpolate(
    frame,
    [ACCENT_LINE_DELAY, ACCENT_LINE_DELAY + 25],
    [0, 120],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const subtitleOpacity = interpolate(
    frame,
    [SUBTITLE_DELAY, SUBTITLE_DELAY + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const fadeOut = interpolate(
    frame,
    [DURATIONS.intro - MOTION.fadeOut, DURATIONS.intro],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: BRAND.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        opacity: fadeOut,
      }}
    >
      <h1
        style={{
          fontFamily: FONTS.heading,
          fontSize: 96,
          fontWeight: 700,
          color: BRAND.textPrimary,
          margin: 0,
          letterSpacing: '-0.03em',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        {headline}
      </h1>

      <div
        style={{
          width: accentWidth,
          height: 3,
          background: BRAND.accent,
          borderRadius: 2,
        }}
      />

      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 32,
          color: BRAND.textSecondary,
          margin: 0,
          opacity: subtitleOpacity,
        }}
      >
        {subtitle}
      </p>
    </AbsoluteFill>
  );
};
