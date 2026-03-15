/** Brand tokens for TheSignAge demo video */

export const BRAND = {
  /** Primary dark background */
  background: '#0a0a0a',
  /** Slightly lighter surface for cards/frames */
  surface: '#141414',
  /** Border/separator color */
  border: '#262626',
  /** Primary accent — warm amber */
  accent: '#f59e0b',
  /** Secondary accent — cool blue */
  accentSecondary: '#3b82f6',
  /** Primary text */
  textPrimary: '#fafafa',
  /** Secondary / muted text */
  textSecondary: '#a1a1aa',
  /** Dimmed text */
  textDimmed: '#52525b',
} as const;

export const FONTS = {
  heading: 'Inter, system-ui, -apple-system, sans-serif',
  body: 'Inter, system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, Fira Code, monospace',
} as const;
