const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // eslint-disable-next-line @nx/enforce-module-boundaries
  presets: [require('../../libs/common-tailwind/tailwind.config.js')],
  darkMode: ['class'],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
          ...fontFamily.sans,
        ],
        // Remove separate heading font - use Inter for everything
        // STYLE_GUIDE.md: Inter 400/500 weights only
      },
      fontWeight: {
        // Enforce weight restrictions from STYLE_GUIDE.md
        normal: '400',
        medium: '500',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
