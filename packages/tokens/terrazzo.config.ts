import { defineConfig } from '@terrazzo/cli';
import css, { type Permutation } from '@terrazzo/plugin-css';
import { ownedTokens } from './src/build/owned-tokens.ts';
import { products, themeAttributes } from './src/index.ts';

type Modifier = keyof typeof themeAttributes;

const owned = ownedTokens(new URL('./src/tokens/resolver.json', import.meta.url));

function rule(selector: string, contents: string): string {
  return `  ${selector} {\n    ${contents}\n  }`;
}

function layer(...rules: string[]): string {
  return `@layer ds.tokens {\n${rules.join('\n\n')}\n}`;
}

function scoped(modifier: Modifier, context: string): Permutation {
  return {
    input: { [modifier]: context },
    include: owned[modifier],
    prepare: (contents) =>
      layer(rule(`:root[${themeAttributes[modifier]}="${context}"]`, contents)),
  };
}

function followsSystem(
  modifier: Modifier,
  context: string,
  query: string,
  otherwise: string
): Permutation {
  const attribute = themeAttributes[modifier];
  return {
    input: { [modifier]: context },
    include: owned[modifier],
    prepare: (contents) =>
      layer(
        `  @media ${query} {\n  ${rule(`:root:not([${attribute}="${otherwise}"])`, contents)}\n  }`,
        rule(`:root[${attribute}="${context}"]`, contents)
      ),
  };
}

export default defineConfig({
  tokens: ['./src/tokens/resolver.json'],
  outDir: './dist/',
  plugins: [
    css({
      filename: 'tokens.css',
      variableName: (token) => `--ds-${token.id.replaceAll('.', '-')}`,
      permutations: [
        { input: {}, prepare: (contents) => layer(rule(':root', contents)) },
        ...products.map((product) => scoped('product', product)),
        scoped('mode', 'light'),
        followsSystem('mode', 'dark', '(prefers-color-scheme: dark)', 'light'),
        scoped('density', 'comfortable'),
        scoped('density', 'compact'),
        scoped('contrast', 'standard'),
        followsSystem('contrast', 'high', '(prefers-contrast: more)', 'standard'),
      ],
    }),
  ],
});
