import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(),
    react(),
    checker({
      typescript: false,
    }),
  ],
  server: {
    port: 4901,
  },
  preview: {
    port: 4901,
  },
  esbuild: {
    target: 'esnext'
  },
  build: {
    target: 'esnext',
  }
});