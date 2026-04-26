const { fontFamily } = require('tailwindcss/defaultTheme');

/**
 * Shared Tailwind v4 configuration preset.
 *
 * Note: Tailwind v4 primarily uses CSS-based configuration via @theme blocks
 * in common-tailwind/src/main.css. This JS config provides:
 * - Base settings for apps that extend it via presets
 * - Compatibility for tools that expect a JS config
 * - Signage-safe generic defaults, not demo-app branding
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        heading: ['Inter', ...fontFamily.sans],
        mono: [...fontFamily.mono],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
