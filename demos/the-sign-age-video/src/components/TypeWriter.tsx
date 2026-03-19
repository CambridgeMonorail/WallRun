import { interpolate, useCurrentFrame } from 'remotion';
import { type FC, type CSSProperties } from 'react';
import { BRAND, FONTS } from '../data/brand';

type TypeWriterProps = {
  text: string;
  /** Frame to start typing */
  delay?: number;
  /** Frames per character */
  speed?: number;
  fontSize?: number;
  color?: string;
  /** Show blinking cursor */
  cursor?: boolean;
  style?: CSSProperties;
};

/** Character-by-character typing animation with optional cursor */
export const TypeWriter: FC<TypeWriterProps> = ({
  text,
  delay = 0,
  speed = 2,
  fontSize = 48,
  color = BRAND.textMuted,
  cursor = true,
  style,
}) => {
  const frame = useCurrentFrame();

  const charsToShow = Math.floor(
    interpolate(frame, [delay, delay + text.length * speed], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const cursorOpacity = cursor ? (Math.floor(frame / 15) % 2 === 0 ? 1 : 0) : 0;
  const typingDone = charsToShow >= text.length;

  return (
    <div
      style={{
        fontFamily: FONTS.mono,
        fontSize,
        color,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
        whiteSpace: 'pre',
        ...style,
      }}
    >
      {text.slice(0, charsToShow)}
      {cursor && (
        <span
          style={{
            opacity: typingDone ? cursorOpacity : 1,
            color: BRAND.accent,
            fontWeight: 300,
          }}
        >
          |
        </span>
      )}
    </div>
  );
};
