import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundleAsync } from 'lightningcss';
import { targets } from '../src/targets.ts';

const entry = fileURLToPath(new URL('../src/index.css', import.meta.url));
const outputDirectory = new URL('../dist/', import.meta.url);

const { code } = await bundleAsync({
  filename: entry,
  minify: true,
  targets,
  resolver: {
    read: (file) => readFile(file, 'utf8'),
    resolve: (specifier, from) =>
      specifier.startsWith('.')
        ? resolve(dirname(from), specifier)
        : createRequire(from).resolve(specifier),
  },
});

await mkdir(outputDirectory, { recursive: true });
await writeFile(new URL('index.css', outputDirectory), code);
