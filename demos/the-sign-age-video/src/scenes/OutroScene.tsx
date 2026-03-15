import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { MOTION } from '../data/timings';

const URL_DELAY = 50;

/** Closing scene: repo link and sign-off */
export const OutroScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, subtitle, url } = SCRIPT.outro;

  const headlineOpacity = interpolate(frame, [0, MOTION.fadeIn], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const headlineScale = interpolate(frame, [0, MOTION.fadeIn], [0.95, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(
    frame,
    [MOTION.fadeIn, MOTION.fadeIn * 2],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const urlOpacity = interpolate(
    frame,
    [URL_DELAY, URL_DELAY + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const accentWidth = interpolate(
    frame,
    [MOTION.fadeIn, MOTION.fadeIn + 30],
    [0, 200],
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
          transform: `scale(${headlineScale})`,
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
          fontSize: 30,
          color: BRAND.textSecondary,
          margin: 0,
          opacity: subtitleOpacity,
        }}
      >
        {subtitle}
      </p>

      <p
        style={{
          fontFamily: FONTS.mono,
          fontSize: 26,
          color: BRAND.accent,
          margin: '16px 0 0',
          opacity: urlOpacity,
        }}
      >
        {url}
      </p>
    </AbsoluteFill>
  );
};
