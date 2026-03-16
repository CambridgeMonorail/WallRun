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
const STRIKE_START = 90;
const PUNCHLINE_START = 110;

/**
 * Scene 2 — Frustration (6s)
 * The old world: template editors, drag-and-drop CMS, vendor lock-in.
 * Strikethrough crosses them out. Punchline validates the viewer's frustration.
 */
export const FrustrationScene: FC = () => {
  const frame = useCurrentFrame();
  const { items, punchline } = SCRIPT.frustration;

  const strikeProgress = interpolate(
    frame,
    [STRIKE_START, STRIKE_START + 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const punchOpacity = interpolate(
    frame,
    [PUNCHLINE_START, PUNCHLINE_START + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const punchY = interpolate(
    frame,
    [PUNCHLINE_START, PUNCHLINE_START + MOTION.fadeIn],
    [15, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.frustration - MOTION.fadeOut, DURATIONS.frustration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <GlowOrb color="#ef4444" size={500} x={75} y={30} delay={5} />

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
        {/* Old-world cards */}
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
                    opacity: strikeProgress > 0.5 ? 0.25 : 1,
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

          {/* Red strikethrough */}
          {strikeProgress > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: `${strikeProgress * 100}%`,
                height: 4,
                background: '#ef4444',
                borderRadius: 2,
                boxShadow: '0 0 24px rgba(239, 68, 68, 0.6)',
              }}
            />
          )}
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
