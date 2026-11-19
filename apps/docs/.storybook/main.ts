import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { sourceAliases } from '../vitest.projects.ts';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp',
  ],
  staticDirs: [
    { from: '../src/plain-html/page', to: '/html' },
    { from: '../../../packages/css/dist', to: '/css' },
  ],
  core: {
    disableTelemetry: true,
  },
  viteFinal: (viteConfig) => mergeConfig(viteConfig, { resolve: { alias: sourceAliases } }),
};

export default config;
