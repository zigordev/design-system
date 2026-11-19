import { contrasts, modes, products, themeAttributes } from '@zigordev/tokens';
import axe from 'axe-core';
import { afterEach, describe, expect, it } from 'vitest';
import bundle from '../../../../packages/css/dist/index.css?inline';
import page from './page/button.html?raw';

const document = globalThis.document;
const markup = new DOMParser().parseFromString(page, 'text/html');
const main = markup.querySelector('main');

function mount(theme: { product: string; mode: string; contrast: string }) {
  const style = document.createElement('style');
  style.textContent = bundle;
  document.head.append(style);
  document.body.innerHTML = main?.outerHTML ?? '';
  const root = document.documentElement;
  root.setAttribute(themeAttributes.product, theme.product);
  root.setAttribute(themeAttributes.mode, theme.mode);
  root.setAttribute(themeAttributes.contrast, theme.contrast);
  return () => {
    style.remove();
    document.body.innerHTML = '';
  };
}

function probe(property: string, value: string): string {
  const element = document.createElement('div');
  element.style.setProperty(property, value);
  document.body.append(element);
  const computed = getComputedStyle(element).getPropertyValue(property);
  element.remove();
  return computed;
}

let unmount = () => {};

afterEach(() => unmount());

describe('the plain HTML page', () => {
  it('has no markup of its own beyond the buttons and a link', () => {
    expect(main?.querySelectorAll('.ds-button')).toHaveLength(7);
    expect(markup.querySelectorAll('script')).toHaveLength(0);
  });

  const themes = products.flatMap((product) =>
    modes.flatMap((mode) => contrasts.map((contrast) => ({ product, mode, contrast })))
  );

  it.each(themes)(
    'is styled by the bundle alone and passes axe for $product, $mode, $contrast',
    async (theme) => {
      unmount = mount(theme);
      const save = document.querySelector<HTMLElement>('button.ds-button:not([data-variant])');
      expect(save).not.toBeNull();
      const background = getComputedStyle(save as HTMLElement).backgroundColor;
      expect(background).toBe(probe('background-color', 'var(--ds-color-accent-solid)'));
      expect(background).not.toBe('rgba(0, 0, 0, 0)');

      const results = await axe.run(document.body, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      });
      expect(results.violations.map(({ id, nodes }) => `${id}: ${nodes.length}`)).toEqual([]);
    }
  );

  it('takes each product its own accent', () => {
    const accents = products.map((product) => {
      unmount = mount({ product, mode: 'light', contrast: 'standard' });
      const value = probe('background-color', 'var(--ds-color-accent-solid)');
      unmount();
      return value;
    });
    expect(new Set(accents).size).toBe(products.length);
  });
});
