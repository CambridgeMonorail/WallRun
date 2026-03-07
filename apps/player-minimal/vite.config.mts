/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import * as fs from 'node:fs';
import * as path from 'node:path';

export default defineConfig(() => ({
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
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    // Custom plugin to remove type="module" for BrightSign compatibility
    {
      name: 'remove-module-type',
      transformIndexHtml(html) {
        // Remove type="module" and add defer for proper script loading
        return html
          .replace(/<script type="module"/g, '<script defer')
          .replace(/<script crossorigin/g, '<script defer crossorigin');
      },
    },
    // CRITICAL: Inline CSS into HTML for BrightSign file:// protocol
    // file:// doesn't provide MIME types, so external CSS files won't load
    {
      name: 'inline-css',
      enforce: 'post',
      transformIndexHtml: {
        order: 'post',
        handler(html, ctx) {
          // Only run during build, not dev server
          if (!ctx.bundle) return html;

          // Find all CSS files in the bundle
          const cssFiles = Object.keys(ctx.bundle).filter(
            (file) => file.endsWith('.css')
          );

          if (cssFiles.length === 0) return html;

          // Read CSS content from the output bundle
          let inlinedHtml = html;
          for (const cssFile of cssFiles) {
            const cssAsset = ctx.bundle[cssFile];
            if (cssAsset.type === 'asset' && typeof cssAsset.source === 'string') {
              const cssContent = cssAsset.source;

              // Remove the <link> tag for this CSS file
              const linkRegex = new RegExp(
                `<link[^>]*href="[^"]*${cssFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
                'g'
              );
              inlinedHtml = inlinedHtml.replace(linkRegex, '');

              // Insert <style> tag in <head>
              inlinedHtml = inlinedHtml.replace(
                '</head>',
                `  <style type="text/css">\n${cssContent}\n  </style>\n  </head>`
              );

              // Delete the CSS file from the bundle (no longer needed)
              delete ctx.bundle[cssFile];
            }
          }

          return inlinedHtml;
        },
      },
    },
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //   plugins: () => [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/player-minimal',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // BrightSign OS 9.1.92 defaults to Chrome 120 runtime on Series 5
    // ES2022 features natively supported
    target: ['chrome120', 'es2022'],
    minify: 'esbuild',
    // CRITICAL: Extract CSS to separate file for proper loading
    cssCodeSplit: false, // Single CSS file
    // Aggressive code-splitting for smaller initial bundle
    rollupOptions: {
      output: {
        format: 'iife', // Use IIFE format instead of ES modules for file:// compatibility
        // Ensure proper transpilation of modern syntax
        generatedCode: {
          constBindings: true,
        },
        // Keep CSS separate for proper loading
        // Note: inlineDynamicImports removes CSS extraction, so we avoid it
        // Ensure assets use relative paths (no base URL)
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Target bundle size < 100KB gzipped
    chunkSizeWarningLimit: 100,
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
      reportsDirectory: '../../coverage/apps/player-minimal',
      provider: 'v8' as const,
    },
  },
}));
