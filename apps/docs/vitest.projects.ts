import { readdirSync, readFileSync } from 'node:fs';
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

const reactSource = new URL('../../packages/react/src/', import.meta.url);

function baseUiEntries(): string[] {
  const entries = new Set<string>();
  for (const file of readdirSync(reactSource, { recursive: true, encoding: 'utf8' })) {
    if (!/\.tsx?$/.test(file)) continue;
    const text = readFileSync(new URL(file, reactSource), 'utf8');
    for (const [, entry = ''] of text.matchAll(/from '(@base-ui\/react\/[\w-]+)'/g)) {
      entries.add(`@zigordev/react > ${entry}`);
    }
  }
  return [...entries].sort();
}

export const optimizedDependencies = baseUiEntries();

export const sourceAliases = [
  { find: /^@zigordev\/react$/, replacement: source('../../packages/react/src/index.ts') },
  { find: /^@zigordev\/icons$/, replacement: source('../../packages/icons/src/index.ts') },
  { find: /^@zigordev\/email$/, replacement: source('../../packages/email/src/index.ts') },
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
    optimizeDeps: { include: optimizedDependencies },
    test: {
      name: `stories ${browserName} ${theme.product} ${theme.mode} ${theme.contrast} ${theme.density}`,
      setupFiles: [fileURLToPath(new URL('./.storybook/vitest.setup.ts', import.meta.url))],
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
