import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';

type GlowOrbProps = {
  /** CSS color */
  color: string;
  /** Size in px */
  size?: number;
  /** Position from left (%) */
  x?: number;
  /** Position from top (%) */
  y?: number;
  /** Fade-in delay */
  delay?: number;
  /** Pulse amplitude (0 = no pulse) */
  pulse?: number;
};

/** Soft radial glow that adds atmosphere */
export const GlowOrb: FC<GlowOrbProps> = ({
  color,
  size = 600,
  x = 50,
  y = 50,
  delay = 0,
  pulse = 0,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const pulseScale = pulse > 0
    ? 1 + Math.sin(frame * 0.03) * pulse
    : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size * pulseScale,
        height: size * pulseScale,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
        opacity: opacity * 0.4,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
    />
  );
};
