import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { type FC, type ReactNode, type CSSProperties } from 'react';
import { MOTION } from '../data/timings';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  /** Vertical slide distance */
  slide?: number;
  /** Horizontal slide distance */
  slideX?: number;
  /** Scale from (0-1) */
  scaleFrom?: number;
  style?: CSSProperties;
};

/** Reusable entrance animation wrapper with easing */
export const FadeIn: FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = MOTION.fadeIn,
  slide = 0,
  slideX = 0,
  scaleFrom,
  style,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const translateY = slide > 0 ? (1 - progress) * slide : 0;
  const translateX = slideX !== 0 ? (1 - progress) * slideX : 0;
  const scale = scaleFrom !== undefined ? scaleFrom + progress * (1 - scaleFrom) : 1;

  return (
    <div
      style={{
        opacity: progress,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
