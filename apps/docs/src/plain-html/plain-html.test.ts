import { contrasts, modes, products, themeAttributes } from '@zigordev/tokens';
import axe from 'axe-core';
import { afterEach, describe, expect, it } from 'vitest';
import bundle from '../../../../packages/css/dist/index.css?inline';

const pages = import.meta.glob<string>('./page/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const document = globalThis.document;

interface Theme {
  product: string;
  mode: string;
  contrast: string;
}

const themes: Theme[] = products.flatMap((product) =>
  modes.flatMap((mode) => contrasts.map((contrast) => ({ product, mode, contrast })))
);

function parse(name: string): Document {
  const page = pages[`./page/${name}`];
  if (page === undefined) throw new Error(`no page named ${name}`);
  return new DOMParser().parseFromString(page, 'text/html');
}

function mount(name: string, theme: Theme) {
  const style = document.createElement('style');
  style.textContent = bundle;
  document.head.append(style);
  document.body.innerHTML = parse(name).querySelector('main')?.outerHTML ?? '';
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

function element(selector: string): HTMLElement {
  const found = document.querySelector<HTMLElement>(selector);
  if (found === null) throw new Error(`nothing matches ${selector}`);
  return found;
}

const defaultTheme: Theme = { product: 'cv', mode: 'light', contrast: 'standard' };

let unmount = () => {};

afterEach(() => unmount());

describe.each(Object.keys(pages).map((path) => path.replace('./page/', '')))('%s', (name) => {
  it('runs no JavaScript', () => {
    expect(parse(name).querySelectorAll('script')).toHaveLength(0);
  });

  it.each(themes)('passes axe for $product, $mode, $contrast', async (theme) => {
    unmount = mount(name, theme);
    const results = await axe.run(document.body, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    });
    expect(results.violations.map(({ id, nodes }) => `${id}: ${nodes.length}`)).toEqual([]);
  });
});

describe('the buttons page', () => {
  it('has no markup of its own beyond the buttons and a link', () => {
    expect(parse('button.html').querySelectorAll('main .ds-button')).toHaveLength(7);
  });

  it.each(themes)('is styled by the bundle alone for $product, $mode, $contrast', (theme) => {
    unmount = mount('button.html', theme);
    const background = getComputedStyle(
      element('button.ds-button:not([data-variant])')
    ).backgroundColor;
    expect(background).toBe(probe('background-color', 'var(--ds-color-accent-solid)'));
    expect(background).not.toBe('rgba(0, 0, 0, 0)');
  });

  it('takes each product its own accent', () => {
    const accents = products.map((product) => {
      unmount = mount('button.html', { ...defaultTheme, product });
      const value = probe('background-color', 'var(--ds-color-accent-solid)');
      unmount();
      return value;
    });
    expect(new Set(accents).size).toBe(products.length);
  });
});

describe('the links page', () => {
  it.each(themes)('is styled by the bundle alone for $product, $mode, $contrast', (theme) => {
    unmount = mount('link.html', theme);
    const inline = getComputedStyle(element('p .ds-link:not([data-tone])'));
    expect(inline.color).toBe(probe('color', 'var(--ds-color-accent-text)'));
    expect(inline.textDecorationLine).toBe('underline');

    const neutral = element('p .ds-link[data-tone="neutral"]');
    expect(getComputedStyle(neutral).color).toBe(
      getComputedStyle(neutral.parentElement as HTMLElement).color
    );
    expect(getComputedStyle(neutral).textDecorationLine).toBe('underline');
  });

  it('underlines only the current page in the navigation', () => {
    unmount = mount('link.html', defaultTheme);
    expect(getComputedStyle(element('nav [aria-current="page"]')).textDecorationLine).toBe(
      'underline'
    );
    expect(getComputedStyle(element('nav .ds-link:not([aria-current])')).textDecorationLine).toBe(
      'none'
    );
  });
});

describe('the fields page', () => {
  it.each(themes)('is styled by the bundle alone for $product, $mode, $contrast', (theme) => {
    unmount = mount('field.html', theme);
    expect(getComputedStyle(element('#email')).borderTopColor).toBe(
      probe('border-top-color', 'var(--ds-color-border-field)')
    );
    expect(getComputedStyle(element('#name')).borderTopColor).toBe(
      probe('border-top-color', 'var(--ds-color-danger-border-strong)')
    );
    expect(getComputedStyle(element('#name-error')).color).toBe(
      probe('color', 'var(--ds-color-danger-text)')
    );
    expect(getComputedStyle(element('#message')).backgroundColor).toBe(
      probe('background-color', 'var(--ds-color-bg-field)')
    );
  });
});

describe('the choices page', () => {
  it.each(themes)('is styled by the bundle alone for $product, $mode, $contrast', (theme) => {
    unmount = mount('choice.html', theme);
    const accent = probe('background-color', 'var(--ds-color-accent-solid)');
    expect(getComputedStyle(element('#newsletter')).backgroundColor).toBe(accent);
    expect(getComputedStyle(element('#reply-email')).backgroundColor).toBe(accent);
    expect(getComputedStyle(element('#reply-phone')).borderTopColor).toBe(
      probe('border-top-color', 'var(--ds-color-border-field)')
    );
    expect(getComputedStyle(element('#tax')).backgroundColor).toBe(
      probe('background-color', 'var(--ds-color-border-field)')
    );
  });

  it('moves the switch thumb when the switch is on', () => {
    unmount = mount('choice.html', defaultTheme);
    const toggle = element('#tax') as HTMLInputElement;
    const off = getComputedStyle(toggle, '::before').translate;
    toggle.checked = true;
    expect(getComputedStyle(toggle, '::before').translate).not.toBe(off);
  });
});

describe('the form page', () => {
  it.each(themes)('is styled by the bundle alone for $product, $mode, $contrast', (theme) => {
    unmount = mount('form.html', theme);
    expect(getComputedStyle(element('#summary')).borderTopColor).toBe(
      probe('border-top-color', 'var(--ds-color-danger-border-strong)')
    );
    expect(getComputedStyle(element('.ds-error-summary__link')).color).toBe(
      probe('color', 'var(--ds-color-danger-text)')
    );
    expect(getComputedStyle(element('form')).rowGap).toBe(probe('row-gap', 'var(--ds-space-6)'));
  });
});

describe('the display page', () => {
  it.each(themes)('is styled by the bundle alone for $product, $mode, $contrast', (theme) => {
    unmount = mount('display.html', theme);
    expect(getComputedStyle(element('#card')).backgroundColor).toBe(
      probe('background-color', 'var(--ds-color-bg-raised)')
    );
    expect(getComputedStyle(element('#badge-soft')).backgroundColor).toBe(
      probe('background-color', 'var(--ds-color-accent-soft)')
    );
    expect(getComputedStyle(element('#separator')).backgroundColor).toBe(
      probe('background-color', 'var(--ds-color-border-subtle)')
    );
    expect(getComputedStyle(element('#spinner')).borderTopColor).toBe(
      probe('color', 'var(--ds-color-accent-text)')
    );
  });

  it('hides the spinner label visually but keeps it for screen readers', () => {
    unmount = mount('display.html', defaultTheme);
    const label = element('.ds-visually-hidden');
    expect(label.getBoundingClientRect().width).toBeLessThanOrEqual(1);
    expect(element('[role="status"]').textContent).toContain('Loading the case studies');
  });
});

describe('the icons page', () => {
  it('sizes icons with the tokens, and to the slot inside a button', () => {
    unmount = mount('icon.html', defaultTheme);
    expect(getComputedStyle(element('#sun')).width).toBe(probe('width', 'var(--ds-size-icon-md)'));
    expect(getComputedStyle(element('#plus')).width).toBe(probe('width', 'var(--ds-size-icon-sm)'));
  });
});

describe('the layout page', () => {
  it.each(themes)('is styled by the bundle alone for $product, $mode, $contrast', (theme) => {
    unmount = mount('layout.html', theme);
    expect(getComputedStyle(element('#prose')).maxWidth).toBe(
      probe('max-width', 'var(--ds-size-measure)')
    );
    expect(getComputedStyle(element('#content')).maxWidth).toBe(
      probe('max-width', 'var(--ds-size-container-md)')
    );
    expect(getComputedStyle(element('#tags')).columnGap).toBe(
      probe('column-gap', 'var(--ds-space-2)')
    );
    expect(getComputedStyle(element('#prose a')).color).toBe(
      probe('color', 'var(--ds-color-accent-text)')
    );
  });
});

describe('the switchers page', () => {
  it.each(themes)('is styled by the bundle alone for $product, $mode, $contrast', (theme) => {
    unmount = mount('switchers.html', theme);
    expect(getComputedStyle(element('#pressed')).backgroundColor).toBe(
      probe('background-color', 'var(--ds-color-bg-raised)')
    );
    expect(getComputedStyle(element('#pressed')).borderTopColor).toBe(
      probe('border-top-color', 'var(--ds-color-border-field)')
    );
    expect(getComputedStyle(element('#unpressed')).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(getComputedStyle(element('#current')).textDecorationLine).toBe('underline');
  });
});
