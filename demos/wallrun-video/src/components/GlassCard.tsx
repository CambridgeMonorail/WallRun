/**
 * GlassCard — premium glassmorphism card for Remotion scenes.
 *
 * Mirrors the demo site's `.demo-panel` / `.demo-panel-soft` pattern:
 *   - Multi-layer shadows (inset + deep + rim)
 *   - Semi-transparent layered background
 *   - Generous border radius (24px)
 *   - Optional glow accent overlay
 *
 * Since Remotion renders to canvas, backdrop-filter isn't available.
 * We simulate the glass effect with layered semi-transparent backgrounds
 * and shadow depth.
 */
import { type FC, type ReactNode, type CSSProperties } from 'react';
import { BRAND } from '../data/brand';

type GlassCardProps = {
  children: ReactNode;
  /** 'primary' matches demo-panel, 'soft' matches demo-panel-soft */
  variant?: 'primary' | 'soft';
  /** Optional glow tint color for the top radial highlight */
  glow?: string;
  style?: CSSProperties;
};

const SHADOW_BASE = 'hsl(220 45% 3%)';

export const GlassCard: FC<GlassCardProps> = ({
  children,
  variant = 'primary',
  glow,
  style,
}) => {
  const isPrimary = variant === 'primary';

  // Multi-layer shadow stack — inset highlight + depth + rim glow
  const boxShadow = [
    `inset 0 1px 0 rgba(255, 255, 255, ${isPrimary ? 0.08 : 0.06})`,
    `0 ${isPrimary ? 24 : 16}px ${isPrimary ? 80 : 48}px hsla(220, 45%, 3%, ${isPrimary ? 0.45 : 0.32})`,
    `0 0 0 1px ${BRAND.accentGlow}`,
  ].join(', ');

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: isPrimary ? 24 : 20,
        border: `1px solid rgba(52, 61, 79, ${isPrimary ? 0.75 : 0.6})`,
        background: isPrimary
          ? `linear-gradient(180deg, rgba(33, 37, 41, 0.96) 0%, rgba(28, 30, 33, 0.92) 100%)`
          : `linear-gradient(180deg, rgba(33, 37, 41, 0.72) 0%, rgba(28, 30, 33, 0.58) 100%)`,
        boxShadow,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Directional shine overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `linear-gradient(130deg, rgba(255,255,255,0.04) 0%, transparent 18%, transparent 58%, rgba(87,213,244,0.03) 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Optional glow hotspot at top */}
      {glow && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `radial-gradient(circle at 50% -10%, ${glow}22 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};
