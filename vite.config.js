import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import checker from 'vite-plugin-checker';
import { visualizer } from 'rollup-plugin-visualizer';

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
  ],
  server: {
    port: 4901,
  },
  preview: {
    port: 4901,
  },
  esbuild: {
    target: 'esnext',
  },
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    exclude: ['wa-sqlite'],
  },
});
