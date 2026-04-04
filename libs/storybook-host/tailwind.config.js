const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../libs/common-tailwind/tailwind.config.js')],
  darkMode: ['class'],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', ...fontFamily.sans],
        heading: ['Oswald', ...fontFamily.sans],
      },
    },
  },
  // tailwindcss-animate provided by common-tailwind preset
  plugins: [],
};
