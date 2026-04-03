import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';
import { BRAND } from '../data/brand';

type GridBackgroundProps = {
  /** Grid cell size in px */
  cellSize?: number;
  /** Fade-in delay in frames */
  delay?: number;
  /** Animate grid drift */
  drift?: boolean;
};

/** Subtle animated dot grid that gives depth to dark backgrounds */
export const GridBackground: FC<GridBackgroundProps> = ({
  cellSize = 60,
  delay = 0,
  drift = true,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 30], [0, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const offsetY = drift
    ? interpolate(frame, [0, 600], [0, -cellSize], {
        extrapolateRight: 'extend',
      })
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        backgroundImage: `radial-gradient(circle, ${BRAND.border} 1px, transparent 1px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        backgroundPosition: `0 ${offsetY}px`,
      }}
    />
  );
};
