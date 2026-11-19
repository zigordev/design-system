import { defineConfig } from 'vitest/config';
import { crossBrowserProjects } from './apps/docs/vitest.projects.ts';

export default defineConfig({
  test: {
    projects: crossBrowserProjects(),
  },
});
