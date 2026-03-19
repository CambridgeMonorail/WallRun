/**
 * IconBadge — small glassmorphism container for an SVG icon.
 *
 * Mirrors the demo site's feature card icon containers:
 *   - .demo-panel-soft with rounded-2xl
 *   - 40×40 or 48×48 sizing
 *   - Subtle border (white/10)
 *   - Inner padding for breathing room
 */
import { type FC, type ReactNode, type CSSProperties } from 'react';

type IconBadgeProps = {
  children: ReactNode;
  size?: number;
  /** Optional border glow tint */
  glowColor?: string;
  style?: CSSProperties;
};

export const IconBadge: FC<IconBadgeProps> = ({
  children,
  size = 56,
  glowColor,
  style,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${glowColor ? `${glowColor}33` : 'rgba(255,255,255,0.1)'}`,
        background: `linear-gradient(180deg, rgba(33, 37, 41, 0.72) 0%, rgba(28, 30, 33, 0.58) 100%)`,
        boxShadow: [
          `inset 0 1px 0 rgba(255, 255, 255, 0.06)`,
          `0 8px 24px hsla(220, 45%, 3%, 0.25)`,
          glowColor ? `0 0 20px ${glowColor}18` : '',
        ]
          .filter(Boolean)
          .join(', '),
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
