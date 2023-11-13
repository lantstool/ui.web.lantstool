import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4901,
  },
  preview: {
    port: 4901,
  },
  define: {
    'process.env': process.env,
    global: 'globalThis',
  }
});
