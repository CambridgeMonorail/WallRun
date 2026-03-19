import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC, type CSSProperties } from 'react';
import { BRAND, FONTS } from '../data/brand';

type RevealTextProps = {
  text: string;
  delay?: number;
  duration?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  style?: CSSProperties;
};

/** Single-line text with clip-mask reveal animation */
export const RevealText: FC<RevealTextProps> = ({
  text,
  delay = 0,
  duration = 20,
  fontSize = 72,
  color = BRAND.text,
  fontWeight = 600,
  style,
}) => {
  const frame = useCurrentFrame();

  const clipProgress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 100],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  const translateY = interpolate(
    frame,
    [delay, delay + duration],
    [20, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div
      style={{
        overflow: 'hidden',
        clipPath: `inset(0 ${100 - clipProgress}% 0 0)`,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.heading,
          fontSize,
          fontWeight,
          color,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          whiteSpace: 'pre-line',
          transform: `translateY(${translateY}px)`,
          ...style,
        }}
      >
        {text}
      </div>
    </div>
  );
};
