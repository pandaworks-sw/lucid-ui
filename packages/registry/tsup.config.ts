import { defineConfig } from 'tsup';
import { cp } from 'node:fs/promises';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: { resolve: true },
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  target: 'es2020',
  external: ['react', 'react-dom', 'react-hook-form', 'lucide-react', 'tailwindcss'],
  tsconfig: './tsconfig.lib.json',
  esbuildOptions(options) {
    options.alias = {
      '@/components/ui': './registry/default',
      '@': './src',
    };
  },
  async onSuccess() {
    await cp('src/styles.css', 'dist/styles.css');
  },
});
