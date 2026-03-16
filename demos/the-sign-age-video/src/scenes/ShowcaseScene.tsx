import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { FadeIn } from '../components/FadeIn';
import { GlowOrb } from '../components/GlowOrb';
import { TerminalBlock } from '../components/TerminalBlock';

const GRID_START = 10;
const TERMINAL_START = 110;

/**
 * Scene 4 — Showcase (9s)
 * Show, don't tell. 2x2 grid of real signage screens, then a terminal
 * proving deployment is one command. This is the "it's real" scene.
 */
export const ShowcaseScene: FC = () => {
  const frame = useCurrentFrame();
  const { screens, terminal } = SCRIPT.showcase;

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.showcase - MOTION.fadeOut, DURATIONS.showcase],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Screen grid fades out when terminal appears
  const gridOpacity = interpolate(
    frame,
    [TERMINAL_START - 20, TERMINAL_START],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Terminal enters
  const terminalOpacity = interpolate(
    frame,
    [TERMINAL_START, TERMINAL_START + 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <GlowOrb color={BRAND.violet} size={700} x={30} y={55} delay={5} />
      <GlowOrb color={BRAND.accent} size={500} x={75} y={35} delay={15} />

      {/* 2x2 screen grid — represents real signage content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: gridOpacity,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            width: 1200,
          }}
        >
          {screens.map((screen, i) => {
            const screenDelay = GRID_START + i * 15;
            const progress = interpolate(
              frame,
              [screenDelay, screenDelay + 18],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              }
            );

            return (
              <div
                key={screen.label}
                style={{
                  opacity: progress,
                  transform: `translateY(${(1 - progress) * 20}px) scale(${0.95 + progress * 0.05})`,
                  height: 200,
                  borderRadius: 16,
                  border: `1px solid ${screen.color}44`,
                  background: `${screen.color}08`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 16,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent top bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: screen.color,
                    opacity: 0.7,
                  }}
                />
                <span style={{ fontSize: 48 }}>{screen.icon}</span>
                <span
                  style={{
                    fontFamily: FONTS.heading,
                    fontSize: 22,
                    fontWeight: 600,
                    color: screen.color,
                    letterSpacing: '0.02em',
                  }}
                >
                  {screen.label}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Terminal — deployment proof */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: terminalOpacity,
          zIndex: 2,
        }}
      >
        <div style={{ width: 900 }}>
          <TerminalBlock title="deploy" delay={TERMINAL_START}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {terminal.map((line, i) => {
                const lineDelay = TERMINAL_START + 10 + i * 18;
                const lineOpacity = interpolate(
                  frame,
                  [lineDelay, lineDelay + 10],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                  <div key={i} style={{ opacity: lineOpacity, display: 'flex', gap: 8 }}>
                    {line.prompt && (
                      <span
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: 20,
                          color: BRAND.green,
                        }}
                      >
                        $
                      </span>
                    )}
                    <span
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 20,
                        color: line.prompt ? BRAND.text : BRAND.textMuted,
                        fontWeight: line.prompt ? 600 : 400,
                      }}
                    >
                      {line.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </TerminalBlock>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
