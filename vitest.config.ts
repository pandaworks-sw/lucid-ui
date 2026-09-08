import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const fromRoot = (relative: string) => fileURLToPath(new URL(relative, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@/components/ui': fromRoot('./packages/registry/registry/default'),
      '@/lib': fromRoot('./packages/registry/src/lib'),
      '@/hooks': fromRoot('./packages/registry/src/hooks'),
      '@': fromRoot('./apps/demo/src'),
      react: fromRoot('./apps/demo/node_modules/react'),
      'react-dom': fromRoot('./apps/demo/node_modules/react-dom'),
      'lucide-react': fromRoot('./apps/demo/node_modules/lucide-react'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      include: ['packages/registry/registry/default/{button,animated-number}/**/*.tsx'],
      thresholds: { lines: 85, functions: 85, branches: 75, statements: 85 },
    },
  },
});
