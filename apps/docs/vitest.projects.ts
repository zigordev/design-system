import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { contrasts, defaultTheme, modes, products, type Theme } from '@zigordev/tokens';
import type { TestProjectInlineConfiguration } from 'vitest/config';

type BrowserName = 'chromium' | 'firefox' | 'webkit';

const root = fileURLToPath(new URL('.', import.meta.url));
const configDir = fileURLToPath(new URL('./.storybook', import.meta.url));

function source(path: string): string {
  return fileURLToPath(new URL(path, import.meta.url));
}

export const sourceAliases = [
  { find: /^@zigordev\/react$/, replacement: source('../../packages/react/src/index.ts') },
  { find: /^@zigordev\/css\/index\.css$/, replacement: source('../../packages/css/src/index.css') },
];

function browser(name: BrowserName) {
  return {
    enabled: true,
    headless: true,
    provider: playwright(),
    instances: [{ browser: name }],
  };
}

const themes: Theme[] = [
  ...products.flatMap((product) =>
    modes.flatMap((mode) =>
      contrasts.map((contrast): Theme => ({ product, mode, contrast, density: 'comfortable' }))
    )
  ),
  ...products.map((product): Theme => ({ ...defaultTheme, product, density: 'compact' })),
];

function storybook(theme: Theme, browserName: BrowserName): TestProjectInlineConfiguration {
  return {
    extends: true,
    root,
    plugins: [storybookTest({ configDir, initialGlobals: { ...theme } })],
    resolve: { alias: sourceAliases },
    test: {
      name: `stories ${browserName} ${theme.product} ${theme.mode} ${theme.contrast} ${theme.density}`,
      browser: browser(browserName),
    },
  };
}

export function storybookProjects(): TestProjectInlineConfiguration[] {
  return themes.map((theme) => storybook(theme, 'chromium'));
}

export function crossBrowserProjects(): TestProjectInlineConfiguration[] {
  return [storybook(defaultTheme, 'firefox'), storybook(defaultTheme, 'webkit')];
}

export function browserTestsProject(): TestProjectInlineConfiguration {
  return {
    extends: true,
    root,
    test: {
      name: 'docs browser tests',
      include: ['src/**/*.test.ts'],
      browser: browser('chromium'),
    },
  };
}
