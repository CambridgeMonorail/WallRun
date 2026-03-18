import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { GlowOrb } from '../components/GlowOrb';
import { RevealText } from '../components/RevealText';
import { GlassCard } from '../components/GlassCard';
import { IconBadge } from '../components/IconBadge';
import { ICONS } from '../components/icons';

const ITEMS_START = 30;

/**
 * Scene 5 — Toolkit (6s)
 * Quick capability hits. Not a monorepo tour — what you actually get.
 * Left headline, right stacked rows.
 */
export const ToolkitScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, items } = SCRIPT.toolkit;

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.toolkit - MOTION.fadeOut, DURATIONS.toolkit],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <GlowOrb color={BRAND.violet} size={600} x={20} y={50} delay={5} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0 120px',
          gap: 80,
          zIndex: 1,
        }}
      >
        {/* Left: headline */}
        <div style={{ flex: '0 0 380px' }}>
          <RevealText text={headline} delay={5} fontSize={80} />
        </div>

        {/* Right: capability rows */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item, i) => {
            const rowDelay = ITEMS_START + i * 10;
            const progress = interpolate(
              frame,
              [rowDelay, rowDelay + 14],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              }
            );

            const Icon = ICONS[item.icon];

            return (
              <div
                key={item.label}
                style={{
                  opacity: progress,
                  transform: `translateX(${(1 - progress) * 30}px)`,
                }}
              >
                <GlassCard
                  variant="soft"
                  glow={item.color}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    padding: '18px 24px',
                  }}
                >
                  <IconBadge size={44} glowColor={item.color}>
                    {Icon ? <Icon size={22} color={item.color} /> : null}
                  </IconBadge>
                  {/* Label + detail */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 22,
                        fontWeight: 600,
                        color: BRAND.text,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: 17,
                        color: BRAND.textMuted,
                      }}
                    >
                      {item.detail}
                    </span>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
