import { writeFileSync } from 'node:fs';
import { pick, renderModule, renderSprite } from '../src/build/generate.ts';
import { iconNames } from '../src/names.ts';
import { lucide } from './lucide.ts';

const icons = pick(lucide.nodes, iconNames);
const generated = new URL('../src/generated/', import.meta.url);

writeFileSync(new URL('icons.ts', generated), renderModule(icons, lucide.version));
writeFileSync(new URL('sprite.svg', generated), renderSprite(icons, lucide.version));
writeFileSync(new URL('../LICENSE-lucide', import.meta.url), lucide.licence);
process.stdout.write(`Generated ${icons.length} icons from lucide-static ${lucide.version}.\n`);
