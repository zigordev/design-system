import { copyFileSync, mkdirSync } from 'node:fs';

mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
copyFileSync(
  new URL('../src/generated/sprite.svg', import.meta.url),
  new URL('../dist/sprite.svg', import.meta.url)
);
