import react from '@vitejs/plugin-react';
import dns from 'dns';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

dns.setDefaultResultOrder('verbatim');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf('node_modules') !== -1) return id.toString().split('node_modules/')[1].split('/')[0].toString();
        }
      },
    },
  },
  resolve: {
    mainFields: [],
    alias: {
      '@': '/src', // Đảm bảo @ trỏ đến thư mục src
    },
  },
  server: {
    port: 3006,
  }
});
