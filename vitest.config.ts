import { defineConfig } from 'vitest/config';
import { browserTestsProject, storybookProjects } from './apps/docs/vitest.projects.ts';

export default defineConfig({
  test: {
    projects: ['packages/*/vitest.config.ts', ...storybookProjects(), browserTestsProject()],
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}'],
      reporter: ['text'],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
});
