import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    reporters: [
      'default',
      ['junit', { outputFile: './reports/tests/junit.xml' }],
    ],
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './reports/coverage',
      reporter: [['cobertura', { file: 'cobertura.xml' }]],
    },
  },
});
