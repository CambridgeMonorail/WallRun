import baseConfig from '../../eslint.config.js';
import playwright from 'eslint-plugin-playwright';

export default [
  ...baseConfig,
  playwright.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {},
  },
];
