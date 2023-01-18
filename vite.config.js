import * as path from 'path';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const basename = process.env.VITE_DEPLOY_BASE_NAME ?? '/';
  const devport = process.env.VITE_DEV_PORT ?? 3100;

  return defineConfig({
    plugins: [react()],
    server: {
      hmr: true,
      port: devport,
    },
    base: basename,
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
  })
}

