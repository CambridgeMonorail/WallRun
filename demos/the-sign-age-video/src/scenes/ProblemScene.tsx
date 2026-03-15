import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { FadeIn } from '../components/FadeIn';
import { SectionTitle } from '../components/SectionTitle';

/** The problem: signage is still templates and slides */
export const ProblemScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, points } = SCRIPT.problem;

  const fadeOut = interpolate(
    frame,
    [DURATIONS.problem - MOTION.fadeOut, DURATIONS.problem],
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
        padding: '0 140px',
        gap: 48,
        opacity: fadeOut,
      }}
    >
      <FadeIn slideDistance={20}>
        <SectionTitle text={headline} />
      </FadeIn>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {points.map((point, i) => (
          <FadeIn
            key={point}
            delay={MOTION.fadeIn + i * MOTION.staggerDelay}
            slideDistance={16}
          >
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 36,
                color: BRAND.textSecondary,
                margin: 0,
                lineHeight: 1.4,
                paddingLeft: 24,
                borderLeft: `2px solid ${BRAND.border}`,
              }}
            >
              {point}
            </p>
          </FadeIn>
        ))}
      </div>
    </AbsoluteFill>
  );
};
