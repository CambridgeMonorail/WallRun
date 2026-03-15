import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';

type CalloutProps = {
  label: string;
  description?: string;
};

/** Callout label with optional description */
export const Callout: FC<CalloutProps> = ({ label, description }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding: '16px 24px',
        borderLeft: `3px solid ${BRAND.accent}`,
        background: 'rgba(245, 158, 11, 0.05)',
      }}
    >
      <span
        style={{
          fontFamily: FONTS.heading,
          fontSize: 28,
          fontWeight: 600,
          color: BRAND.textPrimary,
        }}
      >
        {label}
      </span>
      {description && (
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 20,
            color: BRAND.textSecondary,
          }}
        >
          {description}
        </span>
      )}
    </div>
  );
};
