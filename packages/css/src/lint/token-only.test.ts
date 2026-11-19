import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { checkCss } from './token-only.ts';

const source = new URL('../', import.meta.url);

function wrap(body: string, layer = 'ds.components'): string {
  return `@layer ${layer} {\n  .x {\n    ${body}\n  }\n}\n`;
}

function messages(body: string): string[] {
  return checkCss(wrap(body), 'ds.components').map((problem) => problem.message);
}

describe('checkCss', () => {
  it('accepts token references, local properties, zero, percentages and keywords', () => {
    expect(
      messages(
        '--_size: var(--ds-size-control-md); inline-size: var(--_size); margin: 0; flex: 1; inset: 50%; border: var(--ds-border-width-hairline) solid transparent; color: currentColor;'
      )
    ).toEqual([]);
  });

  it('rejects raw lengths and durations, but not zero', () => {
    expect(messages('padding: 4px 0; transition-duration: 120ms; animation-delay: 0s;')).toEqual([
      'raw length 4px in padding; use a token',
      'raw duration 120ms in transition-duration; use a token',
    ]);
  });

  it('accepts a token times 1em, the conversion the tracking tokens ask for, and nothing else in em', () => {
    expect(messages('letter-spacing: calc(var(--ds-font-tracking-tight) * 1em);')).toEqual([]);
    expect(messages('letter-spacing: 1em; margin: calc(2 * 1em);')).toEqual([
      'raw length 1em in letter-spacing; use a token',
      'raw length 1em in margin; use a token',
    ]);
  });

  it('accepts the CSS variables Base UI sets on its parts, and no other foreign variable', () => {
    expect(
      messages(
        'transform-origin: var(--transform-origin); min-inline-size: var(--anchor-width); block-size: var(--accordion-panel-height);'
      )
    ).toEqual([]);
    expect(messages('color: var(--brand-blue);')).toEqual([
      '--brand-blue in color is neither a design token, a local --_ property nor a Base UI variable',
    ]);
  });

  it('rejects hex, functional and named colours', () => {
    expect(messages('color: #fff; background: oklch(50% 0.1 250); border-color: red;')).toEqual([
      'raw colour in color; use a colour token',
      'raw colour in background; use a colour token',
      'named colour red in border-color; use a colour token',
    ]);
  });

  it('allows system colours only inside forced-colors media', () => {
    const inside = `@layer ds.components {\n  @media (forced-colors: active) {\n    .x { border-color: ButtonText; }\n  }\n}`;
    expect(checkCss(inside, 'ds.components')).toEqual([]);
    expect(messages('border-color: ButtonText;')).toEqual([
      'system colour ButtonText in border-color outside @media (forced-colors: active)',
    ]);
  });

  it('rejects variables that are not tokens and primitive colour tokens', () => {
    expect(messages('color: var(--brand); background: var(--ds-color-scale-accent-9);')).toEqual([
      '--brand in color is neither a design token, a local --_ property nor a Base UI variable',
      '--ds-color-scale-accent-9 in background is a primitive; use a role token',
    ]);
  });

  it('reports the line of the offending declaration', () => {
    const css =
      '@layer ds.components {\n  .x {\n    color: var(--ds-color-fg-default);\n    padding: 3px;\n  }\n}';
    expect(checkCss(css, 'ds.components')).toEqual([
      { line: 4, message: 'raw length 3px in padding; use a token' },
    ]);
  });

  it('ignores comments', () => {
    expect(messages('/* padding: 3px; */ margin: 0;')).toEqual([]);
  });

  it('requires the whole file inside its layer', () => {
    expect(checkCss('.x { margin: 0; }', 'ds.components')).toEqual([
      { line: 1, message: 'everything must sit inside @layer ds.components { ... }' },
    ]);
  });
});

describe('the CSS sources', () => {
  const files: [string, string][] = [
    ['reset.css', 'ds.reset'],
    ['base.css', 'ds.base'],
    ['utilities.css', 'ds.utilities'],
    ...readdirSync(new URL('components/', source)).map((name): [string, string] => [
      `components/${name}`,
      'ds.components',
    ]),
  ];

  it.each(files)('%s uses tokens only and stays in %s', (file, layer) => {
    expect(checkCss(readFileSync(new URL(file, source), 'utf8'), layer)).toEqual([]);
  });
});
