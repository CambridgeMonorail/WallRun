import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { GlowOrb } from '../components/GlowOrb';
import { RevealText } from '../components/RevealText';
import { FadeIn } from '../components/FadeIn';

const HEADLINE_DELAY = 5;
const LINES_START = 40;

/**
 * Scene 7 — Positioning (5s)
 * Honest framing: this is not a CMS replacement.
 * CMS tools are great. This is for developers who think in components.
 */
export const PositioningScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, lines } = SCRIPT.positioning;

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.positioning - MOTION.fadeOut, DURATIONS.positioning],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <GlowOrb color={BRAND.violet} size={600} x={65} y={45} delay={5} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 48,
          padding: '0 200px',
          zIndex: 1,
        }}
      >
        {/* Headline */}
        <RevealText
          text={headline}
          delay={HEADLINE_DELAY}
          fontSize={72}
          color={BRAND.text}
          style={{ textAlign: 'center' }}
        />

        {/* Supporting lines — staggered fade-in */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {lines.map((line, i) => (
            <FadeIn key={i} delay={LINES_START + i * 12} slide={10}>
              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 28,
                  color:
                    i === lines.length - 1 ? BRAND.accent : BRAND.textMuted,
                  margin: 0,
                  textAlign: 'center',
                  letterSpacing: '0.01em',
                  lineHeight: 1.5,
                }}
              >
                {line}
              </p>
            </FadeIn>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
