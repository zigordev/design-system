import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const root = path.resolve(import.meta.dirname, '../..');
const manifest = JSON.parse(readFileSync(path.join(root, '_ds_manifest.json'), 'utf8'));

for (const card of manifest.cards) {
  test(`${card.path} has no WCAG A or AA violations`, async ({ page }) => {
    await page.goto(pathToFileURL(path.join(root, card.path)).href);
    await page.waitForLoadState('load');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['document-title', 'html-has-lang'])
      .analyze();

    expect(
      results.violations.map(
        (v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}\n${v.nodes.map((n) => `  ${n.target.join(' ')}`).join('\n')}`
      )
    ).toEqual([]);
  });
}
