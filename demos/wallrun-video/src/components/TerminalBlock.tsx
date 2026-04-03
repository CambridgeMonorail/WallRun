import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { type FC, type ReactNode } from 'react';
import { BRAND } from '../data/brand';

type TerminalBlockProps = {
  children: ReactNode;
  title?: string;
  delay?: number;
};

/** Faux terminal / code editor window */
export const TerminalBlock: FC<TerminalBlockProps> = ({
  children,
  title = 'terminal',
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * 16}px)`,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${BRAND.border}`,
        background: BRAND.surface,
        boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${BRAND.borderSubtle}`,
      }}
    >
      {/* Chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 18px',
          background: BRAND.elevated,
          borderBottom: `1px solid ${BRAND.border}`,
        }}
      >
        <div style={{ display: 'flex', gap: 7 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <div
              key={c}
              style={{
                width: 13,
                height: 13,
                borderRadius: '50%',
                background: c,
              }}
            />
          ))}
        </div>
        <span
          style={{
            marginLeft: 12,
            fontSize: 13,
            color: BRAND.textDim,
            fontFamily: 'system-ui',
            letterSpacing: '0.02em',
          }}
        >
          {title}
        </span>
      </div>
      {/* Content */}
      <div style={{ padding: '24px 28px' }}>{children}</div>
    </div>
  );
};
