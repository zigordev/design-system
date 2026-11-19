export type NodeList = readonly (readonly [string, Readonly<Record<string, string>>])[];
export type NodeMap = Readonly<Record<string, NodeList>>;

export function componentName(name: string): string {
  return `${name.replace(/(^|-)([a-z0-9])/g, (_, __, letter: string) => letter.toUpperCase())}Icon`;
}

export function pick(source: NodeMap, names: readonly string[]): [string, NodeList][] {
  const missing = names.filter((name) => !(name in source));
  if (missing.length > 0) {
    throw new Error(`Lucide has no icon named ${missing.join(', ')}`);
  }
  return names.map((name) => [name, source[name] as NodeList]);
}

function reactName(attribute: string): string {
  return attribute.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function attributes(values: Readonly<Record<string, string>>): string {
  return Object.entries(values)
    .map(([key, value]) => `${reactName(key)}: '${value}'`)
    .join(', ');
}

function variableName(name: string): string {
  const component = componentName(name).replace(/Icon$/, '');
  return `${component.charAt(0).toLowerCase()}${component.slice(1)}Nodes`;
}

export function renderModule(icons: [string, NodeList][], version: string): string {
  const blocks = icons.map(([name, nodes]) => {
    const list = nodes.map(([tag, values]) => `['${tag}', { ${attributes(values)} }]`).join(', ');
    return [
      `const ${variableName(name)}: IconNode = [${list}];`,
      '',
      `export function ${componentName(name)}(props: IconProps): ReactElement {`,
      `  return renderIcon('${name}', ${variableName(name)}, props);`,
      '}',
    ].join('\n');
  });
  return [
    "import type { ReactElement } from 'react';",
    "import { type IconNode, type IconProps, renderIcon } from '../render-icon.ts';",
    '',
    `export const lucideVersion = '${version}';`,
    '',
    blocks.join('\n\n'),
    '',
  ].join('\n');
}

function element(tag: string, values: Readonly<Record<string, string>>): string {
  const rendered = Object.entries(values)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  return `<${tag} ${rendered}/>`;
}

export function renderSprite(icons: [string, NodeList][], version: string): string {
  const symbols = icons.map(
    ([name, nodes]) =>
      `  <symbol id="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${nodes
        .map(([tag, values]) => element(tag, values))
        .join('')}</symbol>`
  );
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" data-lucide-version="${version}">`,
    ...symbols,
    '</svg>',
    '',
  ].join('\n');
}
