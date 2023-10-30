import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
    tsconfigPaths(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        icons: [
          {
            src: '/logo.png',
            type: 'image/png',
            sizes: '192x192',
          },
        ],
      },
    }),
  ],
  base: process.env.NODE_ENV === 'development' ? '/' : './',

  define: { _global: {} },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo.name!.split('.').at(1) as string;
          if (/png|jpe?g|gif|tiff|bmp/i.test(extType)) {
            extType = 'images';
          } else if (/svg|ico/i.test(extType)) {
            extType = 'icons';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      strictRequires: true,
      transformMixedEsModules: true,
    },
  },
});
