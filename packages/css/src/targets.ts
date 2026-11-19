import type { Targets } from 'lightningcss';

function version(major: number, minor = 0): number {
  return (major << 16) | (minor << 8);
}

export const supportedBrowsers = {
  chrome: [111, 0],
  edge: [111, 0],
  firefox: [113, 0],
  safari: [16, 4],
  ios_saf: [16, 4],
} as const satisfies Record<string, readonly [number, number]>;

export const targets: Targets = Object.fromEntries(
  Object.entries(supportedBrowsers).map(([browser, [major, minor]]) => [
    browser,
    version(major, minor),
  ])
);
