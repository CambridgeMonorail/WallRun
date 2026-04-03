import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { FadeIn } from '../components/FadeIn';
import { GlowOrb } from '../components/GlowOrb';
import { GlassCard } from '../components/GlassCard';
import { IconBadge } from '../components/IconBadge';
import { ICONS } from '../components/icons';
import { RevealText } from '../components/RevealText';

const ITEMS_START = 15;
const FADE_START = 90;
const PUNCHLINE_START = 110;

/**
 * Scene 2 — Familiar tools (6s)
 * The existing world: template editors, drag-and-drop CMS, vendor lock-in.
 * Cards fade back (these tools aren't bad — they're just not how you think).
 * Punchline: "You're a React developer. You already know how to build this."
 */
export const FrustrationScene: FC = () => {
  const frame = useCurrentFrame();
  const { items, punchline } = SCRIPT.frustration;

  const fadeProgress = interpolate(
    frame,
    [FADE_START, FADE_START + 20],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    },
  );

  const punchOpacity = interpolate(
    frame,
    [PUNCHLINE_START, PUNCHLINE_START + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const punchY = interpolate(
    frame,
    [PUNCHLINE_START, PUNCHLINE_START + MOTION.fadeIn],
    [15, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    },
  );

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.frustration - MOTION.fadeOut, DURATIONS.frustration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <GlowOrb color={BRAND.violet} size={500} x={75} y={30} delay={5} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 64,
          zIndex: 1,
        }}
      >
        {/* Familiar-world cards — fade back, not crossed out */}
        <div style={{ display: 'flex', gap: 36, position: 'relative' }}>
          {items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <FadeIn
                key={item.label}
                delay={ITEMS_START + i * 12}
                slide={20}
                scaleFrom={0.92}
              >
                <GlassCard
                  variant="soft"
                  style={{
                    padding: '40px 48px',
                    minWidth: 240,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                    opacity: 1 - fadeProgress * 0.65,
                    transform: `scale(${1 - fadeProgress * 0.04})`,
                  }}
                >
                  <IconBadge size={64} glowColor={BRAND.textMuted}>
                    {Icon ? <Icon size={32} color={BRAND.textMuted} /> : null}
                  </IconBadge>
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 24,
                      color: BRAND.textMuted,
                      textAlign: 'center',
                    }}
                  >
                    {item.label}
                  </span>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>

        {/* Punchline */}
        <div
          style={{
            opacity: punchOpacity,
            transform: `translateY(${punchY}px)`,
          }}
        >
          <RevealText
            text={punchline}
            delay={PUNCHLINE_START}
            fontSize={48}
            fontWeight={600}
            color={BRAND.text}
            style={{ textAlign: 'center' }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
