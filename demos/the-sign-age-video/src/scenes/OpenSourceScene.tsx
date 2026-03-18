import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { GlowOrb } from '../components/GlowOrb';
import { GridBackground } from '../components/GridBackground';
import { RevealText } from '../components/RevealText';
import { FadeIn } from '../components/FadeIn';

const ITEMS_START = 55;

/**
 * Scene 8 — Open Source (5s)
 * "Open source. Built in the open."
 * MIT licensed, early days, contributions welcome.
 */
export const OpenSourceScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, items } = SCRIPT.openSource;

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.openSource - MOTION.fadeOut, DURATIONS.openSource],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <GridBackground cellSize={100} delay={0} drift={false} />
      <GlowOrb color={BRAND.accent} size={700} x={40} y={40} delay={0} pulse={0.05} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 48,
          zIndex: 1,
        }}
      >
        {/* Headline */}
        <RevealText
          text={headline}
          delay={5}
          duration={25}
          fontSize={80}
          style={{ textAlign: 'center' }}
        />

        {/* Info items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {items.map((item, i) => {
            const isUrl = i === items.length - 1;
            return (
              <FadeIn key={i} delay={ITEMS_START + i * 12} slide={8}>
                <p
                  style={{
                    fontFamily: isUrl ? FONTS.mono : FONTS.body,
                    fontSize: isUrl ? 22 : 26,
                    color: isUrl ? BRAND.violet : BRAND.textMuted,
                    margin: 0,
                    textAlign: 'center',
                    letterSpacing: isUrl ? '0.02em' : '0.01em',
                  }}
                >
                  {item.label}
                </p>
              </FadeIn>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
