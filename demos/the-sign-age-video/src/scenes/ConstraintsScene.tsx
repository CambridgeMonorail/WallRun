import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { GridBackground } from '../components/GridBackground';
import { RevealText } from '../components/RevealText';
import { GlassCard } from '../components/GlassCard';

const CARDS_START = 30;

/**
 * Scene 6 — Constraints (5s)
 * Not specs. Engineering respect.
 * These screens have to survive the real world.
 */
export const ConstraintsScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, cards } = SCRIPT.constraints;

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.constraints - MOTION.fadeOut, DURATIONS.constraints],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <GridBackground cellSize={100} delay={0} drift={false} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 120px',
          gap: 48,
          zIndex: 1,
        }}
      >
        <RevealText text={headline} delay={5} fontSize={72} />

        {/* 2x2 constraint grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
        >
          {cards.map((card, i) => {
            const cardDelay = CARDS_START + i * 10;
            const progress = interpolate(
              frame,
              [cardDelay, cardDelay + 16],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              }
            );

            const statReveal = interpolate(
              frame,
              [cardDelay + 4, cardDelay + 20],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );

            const glowColor = i % 2 === 0 ? BRAND.accent : BRAND.violet;

            return (
              <div
                key={card.stat}
                style={{
                  opacity: progress,
                  transform: `translateY(${(1 - progress) * 20}px)`,
                }}
              >
                <GlassCard
                  glow={glowColor}
                  style={{
                    padding: '36px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {/* Stat */}
                  <span
                    style={{
                      fontFamily: FONTS.heading,
                      fontSize: 52,
                      fontWeight: 600,
                      color: BRAND.text,
                      letterSpacing: '-0.03em',
                      marginRight: 8,
                      clipPath: `inset(0 ${(1 - statReveal) * 100}% 0 0)`,
                    }}
                  >
                    {card.stat}
                  </span>

                  {/* Label */}
                  <span
                    style={{
                      fontFamily: FONTS.heading,
                      fontSize: 20,
                      fontWeight: 600,
                      color: glowColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {card.label}
                  </span>

                  {/* Detail */}
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 18,
                      color: BRAND.textMuted,
                      lineHeight: 1.4,
                    }}
                  >
                    {card.detail}
                  </span>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
