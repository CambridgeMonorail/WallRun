import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { FadeIn } from '../components/FadeIn';

const POINT_START = 50;

/** The shift: signage treated as real software */
export const SignageAsSoftwareScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, subtitle, points } = SCRIPT.shift;

  const headlineOpacity = interpolate(frame, [0, MOTION.fadeIn], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const headlineY = interpolate(frame, [0, MOTION.fadeIn], [20, 0], {
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(
    frame,
    [MOTION.fadeIn, MOTION.fadeIn * 2],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const fadeOut = interpolate(
    frame,
    [DURATIONS.shift - MOTION.fadeOut, DURATIONS.shift],
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
        gap: 40,
        opacity: fadeOut,
      }}
    >
      <h1
        style={{
          fontFamily: FONTS.heading,
          fontSize: 80,
          fontWeight: 700,
          color: BRAND.accent,
          margin: 0,
          letterSpacing: '-0.02em',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        {headline}
      </h1>

      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 30,
          color: BRAND.textSecondary,
          margin: 0,
          opacity: subtitleOpacity,
          maxWidth: 800,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </p>

      <div
        style={{
          display: 'flex',
          gap: 32,
          marginTop: 20,
        }}
      >
        {points.map((point, i) => (
          <FadeIn
            key={point}
            delay={POINT_START + i * MOTION.staggerDelay}
            slideDistance={12}
          >
            <div
              style={{
                padding: '20px 32px',
                borderRadius: 8,
                border: `1px solid ${BRAND.border}`,
                background: BRAND.surface,
                fontFamily: FONTS.body,
                fontSize: 24,
                color: BRAND.textPrimary,
              }}
            >
              {point}
            </div>
          </FadeIn>
        ))}
      </div>
    </AbsoluteFill>
  );
};
