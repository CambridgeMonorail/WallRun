import { type FC, type ReactNode } from 'react';
import { BRAND } from '../data/brand';

type BrowserFrameProps = {
  children: ReactNode;
  url?: string;
};

/** Simulated browser window chrome for staged screenshots */
export const BrowserFrame: FC<BrowserFrameProps> = ({
  children,
  url = 'localhost:4200',
}) => {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${BRAND.border}`,
        background: BRAND.surface,
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          background: BRAND.background,
          borderBottom: `1px solid ${BRAND.border}`,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
            <div
              key={color}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: color,
              }}
            />
          ))}
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            marginLeft: 12,
            padding: '6px 14px',
            borderRadius: 6,
            background: BRAND.surface,
            color: BRAND.textSecondary,
            fontSize: 13,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {url}
        </div>
      </div>
      {/* Content area */}
      <div style={{ padding: 0 }}>{children}</div>
    </div>
  );
};
