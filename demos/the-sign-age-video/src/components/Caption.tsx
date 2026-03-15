import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';

type CaptionProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
};

const SIZES = {
  small: 24,
  medium: 32,
  large: 42,
} as const;

/** Subtitle/caption text block */
export const Caption: FC<CaptionProps> = ({ text, size = 'medium' }) => {
  return (
    <p
      style={{
        fontFamily: FONTS.body,
        fontSize: SIZES[size],
        color: BRAND.textSecondary,
        lineHeight: 1.5,
        margin: 0,
        maxWidth: 900,
      }}
    >
      {text}
    </p>
  );
};
