import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const tokensCss = readFileSync(require.resolve('@zigordev/tokens/tokens.css'), 'utf8');
