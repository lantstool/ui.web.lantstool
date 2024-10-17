import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import checker from 'vite-plugin-checker';
import { visualizer } from 'rollup-plugin-visualizer';
import vitePluginString from 'vite-plugin-string';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@react-vault': path.resolve(__dirname, 'react-vault/index.js'),
      '@backend': path.resolve(__dirname, 'backend'),
      '@frontend': path.resolve(__dirname, 'frontend'),
      '@store': path.resolve(__dirname, 'frontend/store'),
      '@components': path.resolve(__dirname, 'frontend/ui/components'),
      '@hooks': path.resolve(__dirname, 'frontend/ui/hooks'),
      '@styles': path.resolve(__dirname, 'frontend/ui/styles'),
      '@assets': path.resolve(__dirname, 'frontend/ui/assets'),
    },
  },
  plugins: [
    nodePolyfills(),
    react(),
    checker({
      typescript: false,
    }),
    visualizer({
      template: 'treemap',
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html',
    }),
    vitePluginString({
      include: ['**/*.sql'],
    }),
  ],
  server: {
    port: 4901,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  preview: {
    port: 4901,
  },
  esbuild: {
    target: 'esnext',
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      plugins: [
        vitePluginString({
          include: ['**/*.sql'],
        }),
      ],
      output: {
        format: 'es',
        manualChunks: {
          lodash: ['lodash'],
          '@uiw/react-codemirror': ['@uiw/react-codemirror'],
          '@codemirror/lang-json': ['@codemirror/lang-json'],
        },
      },
    },
  },
  worker: {
    format: 'es',
  },
  optimizeDeps: {
    exclude: ['wa-sqlite'],
  },
});
