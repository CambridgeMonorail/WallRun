import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';

type StatCardProps = {
  title: string;
  description: string;
};

/** Stat/feature highlight card */
export const StatCard: FC<StatCardProps> = ({ title, description }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '32px',
        borderRadius: 12,
        border: `1px solid ${BRAND.border}`,
        background: BRAND.surface,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.heading,
          fontSize: 32,
          fontWeight: 700,
          color: BRAND.accent,
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: 22,
          color: BRAND.textSecondary,
          lineHeight: 1.4,
        }}
      >
        {description}
      </span>
    </div>
  );
};
