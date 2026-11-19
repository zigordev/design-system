import { mkdir, writeFile } from 'node:fs/promises';
import { generatedFiles, serialize } from '../src/palette/generate.ts';

const directory = new URL('../src/tokens/generated/', import.meta.url);

await mkdir(directory, { recursive: true });
for (const [name, document] of Object.entries(generatedFiles())) {
  await writeFile(new URL(name, directory), serialize(document));
}
