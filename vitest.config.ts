import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/src/__tests__/files/**', // don't run tests in fixtures
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/src/__tests__/**',
        '**/*.config.*',
        '**/*.d.ts',
        '.eslintrc.js',
        'prettier.config.js',
      ],
    },
  },
});
