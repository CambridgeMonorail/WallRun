/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import * as path from 'path';

export default defineConfig(({ mode }) => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/player-minimal',
  base: './',

  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 Vite plugin
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    // Custom plugin to remove type="module" for BrightSign compatibility
    // Only apply during production build, not dev server
    ...(mode === 'production'
      ? [
          {
            name: 'remove-module-type',
            transformIndexHtml(html) {
              // Remove type="module" and add defer for proper script loading
              return html
                .replace(/<script type="module"/g, '<script defer')
                .replace(/<script crossorigin/g, '<script defer crossorigin');
            },
          },
        ]
      : []),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //   plugins: () => [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/player-minimal',
    emptyOutDir: true,
    reportCompressedSize: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // BrightSign-safe configuration for Chrome 120 (OS 9.1.92+)
    target: ['chrome120', 'es2022'],
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: false, // Single CSS file
    modulePreload: false, // Avoid module preload behavior
    rollupOptions: {
      output: {
        format: 'iife', // IIFE format for file:// compatibility
        inlineDynamicImports: true, // Single bundle for predictable deployment
        generatedCode: {
          constBindings: true,
        },
        // Consistent file names for easier debugging
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/app.js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? '';
          if (name.endsWith('.css')) return 'assets/app.css';
          return 'assets/[name][extname]';
        },
      },
    },
    chunkSizeWarningLimit: 200, // Adjusted for single bundle approach
  },
  // Define build-time environment variables
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(
      process.env.npm_package_version || '0.1.0',
    ),
    'import.meta.env.VITE_BUILD_TIMESTAMP': JSON.stringify(
      new Date().toISOString(),
    ),
  },
  test: {
    name: 'player-minimal',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: path.resolve(
        import.meta.dirname,
        '../../coverage/apps/player-minimal',
      ),
      provider: 'v8' as const,
    },
  },
}));
