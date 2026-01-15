import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    target: 'chrome120',
    outDir: 'dist/main',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/main/preload.ts'),
      formats: ['cjs'],
      fileName: () => 'preload.js',
    },
    rollupOptions: {
      external: ['electron'],
    },
  },
});
