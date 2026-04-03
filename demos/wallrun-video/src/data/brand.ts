/**
 * Brand tokens for WallRun demo video.
 *
 * Derived from the canonical theme sources:
 *   - Locked palette:  docs/design/STYLE_GUIDE.md
 *   - CSS variables:   libs/common-tailwind/src/shadcn-theme.css
 *   - Glow accents:    apps/client/src/styles.css  (--glow-cyan, --glow-violet, --glow-amber)
 */

export const BRAND = {
  /** Background — LOCKED per STYLE_GUIDE: #1C1E21 (220 13% 12%) */
  bg: '#1C1E21',
  /** Card surface (220 13% 14%) */
  surface: '#212529',
  /** Elevated surface — secondary (220 8% 20%) */
  elevated: '#2F3440',
  /** Border (220 10% 25%) — from shadcn --border */
  border: '#343D4F',
  /** Subtle border (220 10% 20%) */
  borderSubtle: '#2A3040',
  /** Primary accent — cyan glow (192 88% 65%) */
  accent: '#57D5F4',
  /** Accent glow for shadows/gradients */
  accentGlow: 'rgba(87, 213, 244, 0.15)',
  /** Secondary accent — violet glow (274 74% 72%) */
  violet: '#BF83EC',
  /** Success signal — terminal prompts, positive states */
  green: '#10b981',
  /** Primary text — LOCKED per STYLE_GUIDE: #E6E6E6 (0 0% 90%) */
  text: '#E6E6E6',
  /** Secondary text — LOCKED per STYLE_GUIDE: #A0A4A8 (210 5% 64%) */
  textMuted: '#A0A4A8',
  /** Dimmed text — accent structural gray: #6E7681 (215 8% 47%) */
  textDim: '#6E7681',
  /** Gradients — derived from glow palette */
  gradientAccent: 'linear-gradient(135deg, #57D5F4 0%, #BF83EC 100%)',
  gradientViolet: 'linear-gradient(135deg, #BF83EC 0%, #8B5CF6 100%)',
  gradientSurface: 'linear-gradient(180deg, #212529 0%, #1C1E21 100%)',
  gradientRadial:
    'radial-gradient(ellipse at 50% 0%, rgba(87, 213, 244, 0.08) 0%, transparent 60%)',
} as const;

export const FONTS = {
  /** Display — restrained branded labels only (per STYLE_GUIDE) */
  display: 'Michroma, sans-serif',
  /** Headings + body — primary typeface */
  heading: 'Inter, system-ui, -apple-system, sans-serif',
  body: 'Inter, system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, Fira Code, monospace',
} as const;
