import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';

type SectionTitleProps = {
  text: string;
  accent?: boolean;
};

/** Large heading for scene titles */
export const SectionTitle: FC<SectionTitleProps> = ({
  text,
  accent = false,
}) => {
  return (
    <h1
      style={{
        fontFamily: FONTS.heading,
        fontSize: 72,
        fontWeight: 700,
        color: accent ? BRAND.accent : BRAND.textPrimary,
        lineHeight: 1.1,
        margin: 0,
        letterSpacing: '-0.02em',
      }}
    >
      {text}
    </h1>
  );
};
