import { writeFileSync } from 'node:fs';
import { renderTheme } from '../src/build/themes.ts';
import { tokensCss } from './tokens.ts';

writeFileSync(new URL('../src/generated/theme.ts', import.meta.url), renderTheme(tokensCss));
process.stdout.write('Generated the email theme.\n');
