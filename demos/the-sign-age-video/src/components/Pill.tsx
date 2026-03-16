import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC } from 'react';
import { BRAND, FONTS } from '../data/brand';

type PillProps = {
  label: string;
  detail?: string;
  color?: string;
  delay?: number;
};

/** Rounded pill badge — used for tech tags, status labels */
export const Pill: FC<PillProps> = ({
  label,
  detail,
  color = BRAND.accent,
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity: progress,
        transform: `scale(${0.85 + progress * 0.15})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        padding: '28px 40px',
        borderRadius: 16,
        border: `1px solid ${color}33`,
        background: `${color}0a`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        style={{
          fontFamily: FONTS.heading,
          fontSize: 34,
          fontWeight: 600,
          color,
        }}
      >
        {label}
      </span>
      {detail && (
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 18,
            color: BRAND.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {detail}
        </span>
      )}
    </div>
  );
};
