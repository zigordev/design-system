import { writeFileSync } from 'node:fs';
import { products } from '@zigordev/tokens';
import { renderThemes } from '../src/build/themes.ts';
import { tokensCss } from './tokens.ts';

writeFileSync(
  new URL('../src/generated/themes.ts', import.meta.url),
  renderThemes(tokensCss, products)
);
process.stdout.write(`Generated email themes for ${products.join(', ')}.\n`);
