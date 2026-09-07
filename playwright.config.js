import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/a11y',
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
