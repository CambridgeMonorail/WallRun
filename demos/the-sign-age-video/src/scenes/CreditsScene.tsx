import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';

const TOOLS_START = 25;
const TAGLINE_START = 55;

/**
 * Scene 10 — Credits (3s)
 * Quiet, understated. "This video was built with Claude + Remotion."
 * No flash — just an honest nod.
 */
export const CreditsScene: FC = () => {
  const frame = useCurrentFrame();
  const { madeWith, tools, tagline } = SCRIPT.credits;

  const introOpacity = interpolate(
    frame,
    [5, 5 + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const toolsOpacity = interpolate(
    frame,
    [TOOLS_START, TOOLS_START + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const taglineOpacity = interpolate(
    frame,
    [TAGLINE_START, TAGLINE_START + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const exitOpacity = interpolate(
    frame,
    [DURATIONS.credits - MOTION.fadeOut, DURATIONS.credits],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, opacity: exitOpacity }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
          zIndex: 1,
        }}
      >
        {/* "This video was built with" */}
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 22,
            color: BRAND.textDim,
            margin: 0,
            letterSpacing: '0.03em',
            opacity: introOpacity,
          }}
        >
          {madeWith}
        </p>

        {/* Tool names */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            opacity: toolsOpacity,
          }}
        >
          {tools.map((tool, i) => (
            <span key={tool}>
              {i > 0 && (
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 28,
                    color: BRAND.textDim,
                    marginRight: 24,
                  }}
                >
                  +
                </span>
              )}
              <span
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 36,
                  fontWeight: 600,
                  color: BRAND.text,
                  letterSpacing: '-0.01em',
                }}
              >
                {tool}
              </span>
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: FONTS.mono,
            fontSize: 18,
            color: BRAND.textDim,
            margin: '16px 0 0',
            letterSpacing: '0.04em',
            opacity: taglineOpacity,
          }}
        >
          {tagline}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
