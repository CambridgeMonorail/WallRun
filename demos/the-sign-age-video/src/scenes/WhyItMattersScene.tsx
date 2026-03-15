import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { type FC } from 'react';
import { BRAND } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { FadeIn } from '../components/FadeIn';
import { SectionTitle } from '../components/SectionTitle';
import { StatCard } from '../components/StatCard';

const CARDS_START = 25;

/** Why this matters for frontend developers */
export const WhyItMattersScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, points } = SCRIPT.whyItMatters;

  const fadeOut = interpolate(
    frame,
    [DURATIONS.whyItMatters - MOTION.fadeOut, DURATIONS.whyItMatters],
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
        padding: '0 120px',
        gap: 48,
        opacity: fadeOut,
      }}
    >
      <FadeIn slideDistance={20}>
        <SectionTitle text={headline} />
      </FadeIn>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        {points.map((point, i) => (
          <FadeIn
            key={point.title}
            delay={CARDS_START + i * MOTION.staggerDelay}
            slideDistance={14}
          >
            <StatCard title={point.title} description={point.description} />
          </FadeIn>
        ))}
      </div>
    </AbsoluteFill>
  );
};
