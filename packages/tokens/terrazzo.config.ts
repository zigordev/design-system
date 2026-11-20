import { defineConfig } from '@terrazzo/cli';
import css, { type Permutation } from '@terrazzo/plugin-css';
import { ownedTokens } from './src/build/owned-tokens.ts';
import { themeAttributes } from './src/index.ts';

const owned = ownedTokens(new URL('./src/tokens/resolver.json', import.meta.url));
const mode = themeAttributes.mode;

function rule(selector: string, contents: string): string {
  return `  ${selector} {\n    ${contents}\n  }`;
}

function layer(...rules: string[]): string {
  return `@layer ds.tokens {\n${rules.join('\n\n')}\n}`;
}

const light: Permutation = {
  input: { mode: 'light' },
  include: owned.mode,
  prepare: (contents) =>
    layer(
      rule(`:root[${mode}="light"]`, contents),
      `  @media (prefers-color-scheme: light) {\n  ${rule(`:root[${mode}="system"]`, contents)}\n  }`
    ),
};

export default defineConfig({
  tokens: ['./src/tokens/resolver.json'],
  outDir: './dist/',
  plugins: [
    css({
      filename: 'tokens.css',
      variableName: (token) => `--ds-${token.id.replaceAll('.', '-')}`,
      permutations: [{ input: {}, prepare: (contents) => layer(rule(':root', contents)) }, light],
    }),
  ],
});
