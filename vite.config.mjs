import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true
  },
  // Dev proxy → local hornet-ots (API is same-origin in production)
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8081',
      '/Marti': 'http://127.0.0.1:8081',
      '/login': 'http://127.0.0.1:8081',
      '/logout': 'http://127.0.0.1:8081',
      '/socket.io': {
        target: 'http://127.0.0.1:8081',
        ws: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',

        assetFileNames: ({name}) => {
          if (name === 'externalImage') {
            return "images/src/[name][extname]";
          }

          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
            return 'assets/images/[name]-[hash][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name]-[hash][extname]';
        },
      },
    }
  }
});
