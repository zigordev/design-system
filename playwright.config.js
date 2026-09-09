import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test/a11y",
  retries: process.env.CI ? 2 : 0,
  // The html reporter is what writes playwright-report/, which CI uploads on
  // failure. Its absence is why that artifact has always been empty.
  reporter: process.env.CI
    ? [["github"], ["list"], ["html", { open: "never" }]]
    : [["list"]],
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
