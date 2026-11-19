import { readFileSync } from 'node:fs';

type Node = { [key: string]: unknown };

interface Reference {
  $ref: string;
}

interface ResolverDocument {
  modifiers?: Record<string, { contexts: Record<string, (Reference | Node)[]> }>;
}

function isNode(value: unknown): value is Node {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isReference(value: unknown): value is Reference {
  return isNode(value) && typeof value.$ref === 'string';
}

export function tokenIds(document: unknown, path: string[] = []): string[] {
  if (!isNode(document)) return [];
  if ('$value' in document) return [path.join('.')];
  return Object.entries(document).flatMap(([key, value]) =>
    key.startsWith('$') ? [] : tokenIds(value, [...path, key])
  );
}

function readJson(file: URL): unknown {
  return JSON.parse(readFileSync(file, 'utf8'));
}

export function ownedTokens(resolverFile: URL): Record<string, string[]> {
  const resolver = readJson(resolverFile) as ResolverDocument;
  const owned: Record<string, string[]> = {};
  for (const [name, modifier] of Object.entries(resolver.modifiers ?? {})) {
    const ids = new Set<string>();
    for (const sources of Object.values(modifier.contexts)) {
      for (const source of sources) {
        const document = isReference(source)
          ? readJson(new URL(source.$ref, resolverFile))
          : source;
        for (const id of tokenIds(document)) ids.add(id);
      }
    }
    owned[name] = [...ids].sort();
  }
  return owned;
}
