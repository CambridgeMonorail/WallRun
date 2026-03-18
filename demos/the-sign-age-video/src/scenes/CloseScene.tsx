import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';
import { SCRIPT } from '../data/script';
import { MOTION } from '../data/timings';
import { GridBackground } from '../components/GridBackground';
import { GlowOrb } from '../components/GlowOrb';
import { RevealText } from '../components/RevealText';
import { FadeIn } from '../components/FadeIn';

const URL_DELAY = 50;
const CTA_DELAY = 70;

/**
 * Scene 9 — Close (4s)
 * "Signage is software. Build it like software."
 * GitHub URL + star button. Expanding ring for atmosphere.
 */
export const CloseScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, url, cta } = SCRIPT.close;

  // Expanding ring behind headline
  const ringScale = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const ringOpacity = interpolate(frame, [0, 25, 55], [0, 0.3, 0.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CTA button
  const ctaProgress = interpolate(
    frame,
    [CTA_DELAY, CTA_DELAY + MOTION.fadeIn],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <GridBackground delay={0} drift={false} />
      <GlowOrb color={BRAND.accent} size={900} x={50} y={42} delay={0} pulse={0.08} />

      {/* Expanding ring */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          border: `2px solid ${BRAND.accent}`,
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          opacity: ringOpacity,
        }}
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
        {/* Thesis statement */}
        <RevealText
          text={headline}
          delay={5}
          duration={25}
          fontSize={84}
          style={{ textAlign: 'center' }}
        />

        {/* URL */}
        <FadeIn delay={URL_DELAY} slide={8}>
          <p
            style={{
              fontFamily: FONTS.mono,
              fontSize: 22,
              color: BRAND.violet,
              margin: '12px 0 0',
            }}
          >
            {url}
          </p>
        </FadeIn>

        {/* CTA button */}
        <div
          style={{
            marginTop: 12,
            opacity: ctaProgress,
            transform: `scale(${0.9 + ctaProgress * 0.1})`,
            padding: '14px 44px',
            borderRadius: 12,
            background: BRAND.gradientAccent,
            fontFamily: FONTS.heading,
            fontSize: 20,
            fontWeight: 600,
            color: '#000',
            letterSpacing: '0.02em',
          }}
        >
          {cta}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
