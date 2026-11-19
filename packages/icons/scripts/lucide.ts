import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { NodeMap } from '../src/build/generate.ts';

const require = createRequire(import.meta.url);
const root = dirname(require.resolve('lucide-static/package.json'));

export const lucide = {
  version: (JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { version: string })
    .version,
  nodes: JSON.parse(readFileSync(join(root, 'icon-nodes.json'), 'utf8')) as NodeMap,
  licence: readFileSync(join(root, 'LICENSE'), 'utf8'),
};
