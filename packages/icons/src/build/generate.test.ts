import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { lucide } from '../../scripts/lucide.ts';
import { iconNames } from '../names.ts';
import { componentName, type NodeMap, pick, renderModule, renderSprite } from './generate.ts';

const sample: NodeMap = {
  'arrow-up-right': [
    ['path', { d: 'M7 7h10v10' }],
    ['path', { d: 'M7 17 17 7' }],
  ],
  dot: [['circle', { cx: '12', cy: '12', r: '1' }]],
  filled: [['path', { d: 'M4 4h16', 'stroke-width': '3' }]],
};

describe('componentName', () => {
  it('turns a Lucide name into a component name', () => {
    expect(componentName('arrow-up-right')).toBe('ArrowUpRightIcon');
    expect(componentName('share-2')).toBe('Share2Icon');
  });
});

describe('pick', () => {
  it('keeps the curated names in order', () => {
    expect(pick(sample, ['dot', 'arrow-up-right']).map(([name]) => name)).toEqual([
      'dot',
      'arrow-up-right',
    ]);
  });

  it('fails on a name Lucide does not have', () => {
    expect(() => pick(sample, ['dot', 'alert-circle'])).toThrow(
      'Lucide has no icon named alert-circle'
    );
  });
});

describe('renderModule', () => {
  it('writes one component per icon and the Lucide version', () => {
    const module = renderModule(pick(sample, ['dot']), '1.0.0');
    expect(module).toContain("export const lucideVersion = '1.0.0';");
    expect(module).toContain(
      "const dotNodes: IconNode = [['circle', { cx: '12', cy: '12', r: '1' }]];"
    );
    expect(module).toContain(
      "export function DotIcon(props: IconProps): ReactElement {\n  return renderIcon('dot', dotNodes, props);\n}"
    );
  });
});

describe('renderModule attributes', () => {
  it('writes React names for hyphenated SVG attributes', () => {
    expect(renderModule(pick(sample, ['filled']), '1.0.0')).toContain(
      "const filledNodes: IconNode = [['path', { d: 'M4 4h16', strokeWidth: '3' }]];"
    );
  });
});

describe('renderSprite', () => {
  it('writes one symbol per icon', () => {
    const sprite = renderSprite(pick(sample, ['arrow-up-right']), '1.0.0');
    expect(sprite).toContain('data-lucide-version="1.0.0"');
    expect(sprite).toContain(
      '<symbol id="arrow-up-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></symbol>'
    );
  });
});

describe('the generated files', () => {
  const icons = pick(lucide.nodes, iconNames);

  it('match the installed lucide-static, so run pnpm --filter @zigordev/icons run generate', () => {
    const generated = new URL('../generated/', import.meta.url);
    expect(readFileSync(new URL('icons.ts', generated), 'utf8')).toBe(
      renderModule(icons, lucide.version)
    );
    expect(readFileSync(new URL('sprite.svg', generated), 'utf8')).toBe(
      renderSprite(icons, lucide.version)
    );
    expect(readFileSync(new URL('../../LICENSE-lucide', import.meta.url), 'utf8')).toBe(
      lucide.licence
    );
  });
});
