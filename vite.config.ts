import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

/**
 *  VitePWA({
      manifest,
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ['/*.{js,css,html}', '/*.{svg,png,jpg,gif}'],
      },
    }),
 */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginFaviconsInject('./src/assets/favicon.svg'),
  ],
  server: {
    hmr: true,
    port: 3100
  },
  build: {
    assetsDir: "assets"
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'window',
  },
});
