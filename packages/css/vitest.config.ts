import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    name: 'css',
    include: ['src/**/*.test.ts'],
  },
});
