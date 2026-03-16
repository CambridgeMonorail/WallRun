import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { type FC } from 'react';
import { BRAND } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { TypeWriter } from '../components/TypeWriter';
import { GlowOrb } from '../components/GlowOrb';

/**
 * Scene 1 — Hook (4s)
 * Dark screen. A single sentence types in.
 * The viewer should think: "Oh, that happened to me."
 */
export const HookScene: FC = () => {
  const frame = useCurrentFrame();
  const { line } = SCRIPT.hook;

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.hook - MOTION.fadeOut, DURATIONS.hook],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <GlowOrb color={BRAND.accent} size={600} x={50} y={50} delay={0} pulse={0.04} />

      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <TypeWriter
          text={line}
          delay={15}
          speed={2}
          fontSize={52}
          color={BRAND.textMuted}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
