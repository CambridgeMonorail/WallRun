import { interpolate, useCurrentFrame } from 'remotion';
import { type FC, type ReactNode } from 'react';
import { MOTION } from '../data/timings';

type FadeInProps = {
  children: ReactNode;
  /** Delay before fade begins (frames) */
  delay?: number;
  /** Duration of fade (frames) */
  duration?: number;
  /** Slide up distance in pixels */
  slideDistance?: number;
};

/** Reusable fade-in + optional slide-up wrapper */
export const FadeIn: FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = MOTION.fadeIn,
  slideDistance = 0,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY =
    slideDistance > 0
      ? interpolate(frame, [delay, delay + duration], [slideDistance, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)` }}>
      {children}
    </div>
  );
};
