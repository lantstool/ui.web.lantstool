import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import checker from 'vite-plugin-checker';
import { visualizer } from 'rollup-plugin-visualizer';
import vitePluginString from 'vite-plugin-string';

// https://vitejs.dev/config/
export default defineConfig({
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
