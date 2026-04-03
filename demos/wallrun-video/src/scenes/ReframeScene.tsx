import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { GridBackground } from '../components/GridBackground';
import { GlowOrb } from '../components/GlowOrb';
import { RevealText } from '../components/RevealText';

const PRE_DELAY = 8;
const HEADLINE_DELAY = 30;
const SUB_DELAY = 65;

/**
 * Scene 3 — Reframe (5s)
 * The paradigm shift. "What if signage was just... a React app?"
 * This is the aha moment. The viewer should feel relief.
 */
export const ReframeScene: FC = () => {
  const frame = useCurrentFrame();
  const { pre, headline, sub } = SCRIPT.reframe;

  const preOpacity = interpolate(
    frame,
    [PRE_DELAY, PRE_DELAY + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const subOpacity = interpolate(
    frame,
    [SUB_DELAY, SUB_DELAY + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const subY = interpolate(
    frame,
    [SUB_DELAY, SUB_DELAY + MOTION.fadeIn],
    [12, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    },
  );

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.reframe - MOTION.fadeOut, DURATIONS.reframe],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <GridBackground cellSize={80} delay={0} />
      <GlowOrb
        color={BRAND.accent}
        size={900}
        x={50}
        y={40}
        delay={10}
        pulse={0.06}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          zIndex: 1,
        }}
      >
        {/* Pre-text */}
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 30,
            color: BRAND.textMuted,
            margin: 0,
            letterSpacing: '0.03em',
            opacity: preOpacity,
          }}
        >
          {pre}
        </p>

        {/* Big reveal */}
        <RevealText
          text={headline}
          delay={HEADLINE_DELAY}
          duration={22}
          fontSize={128}
          color={BRAND.accent}
        />

        {/* Supporting line */}
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 26,
            color: BRAND.textMuted,
            margin: '12px 0 0',
            letterSpacing: '0.02em',
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          {sub}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
