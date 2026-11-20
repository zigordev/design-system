import { namedColors, systemColors } from './colors.ts';

export interface Problem {
  line: number;
  message: string;
}

const lengthPattern =
  /(?<![\w.#-])-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em|ex|ch|lh|rlh|vw|vh|vi|vb|vmin|vmax|svh|lvh|dvh|cqi|cqb|cqw|cqh|pt|pc|cm|mm|q|in)\b/gi;
const timePattern = /(?<![\w.#-])-?(?:\d+\.?\d*|\.\d+)(?:ms|s)\b/gi;
const colourFunction =
  /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix|light-dark|contrast-color)\(/i;
const hexColour = /#[0-9a-f]{3,8}\b/i;
const variableReference = /var\(\s*(--[\w-]+)/g;
const identifier = /(?<![\w-])[a-z][\w-]*/gi;
const forcedColours = /forced-colors\s*:\s*active/;
const primitiveTokens = /^--ds-color-(?:palette|scale)-/;
const baseUiVariables =
  /^--(?:transform-origin|anchor-(?:width|height)|available-(?:width|height)|active-tab-(?:left|right|top|bottom|width|height)|accordion-panel-(?:height|width)|toast-[a-z-]+|scroll-area-[a-z-]+|drawer-[a-z-]+)$/;
const fullViewport = /(?<![\w.#-])100(?:d|s|l)?v(?:h|w|b|i)\b/gi;
const tokenTimesEm = /(var\(\s*--ds-[\w-]+\s*\))\s*\*\s*1em\b/g;

function isZero(literal: string): boolean {
  return Number.parseFloat(literal) === 0;
}

function withoutComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));
}

function checkValue(property: string, value: string, inForcedColours: boolean): string[] {
  const messages: string[] = [];
  const bare = value
    .replace(tokenTimesEm, '$1')
    .replace(fullViewport, ' ')
    .replace(/var\([^)]*\)/g, ' ');
  for (const match of bare.match(lengthPattern) ?? []) {
    if (!isZero(match)) messages.push(`raw length ${match} in ${property}; use a token`);
  }
  for (const match of bare.match(timePattern) ?? []) {
    if (!isZero(match)) messages.push(`raw duration ${match} in ${property}; use a token`);
  }
  if (hexColour.test(bare) || colourFunction.test(bare)) {
    messages.push(`raw colour in ${property}; use a colour token`);
  }
  for (const word of bare.match(identifier) ?? []) {
    const lower = word.toLowerCase();
    if (namedColors.has(lower))
      messages.push(`named colour ${word} in ${property}; use a colour token`);
    if (systemColors.has(lower) && !inForcedColours) {
      messages.push(`system colour ${word} in ${property} outside @media (forced-colors: active)`);
    }
  }
  for (const [, name = ''] of value.matchAll(variableReference)) {
    if (!name.startsWith('--ds-') && !name.startsWith('--_') && !baseUiVariables.test(name)) {
      messages.push(
        `${name} in ${property} is neither a design token, a local --_ property nor a Base UI variable`
      );
    } else if (primitiveTokens.test(name)) {
      messages.push(`${name} in ${property} is a primitive; use a role token`);
    }
  }
  return messages;
}

export function checkCss(source: string, layer: string): Problem[] {
  const text = withoutComments(source);
  const problems: Problem[] = [];
  const opening = `@layer ${layer} {`;
  const trimmed = text.trim();
  if (!trimmed.startsWith(opening) || !trimmed.endsWith('}')) {
    problems.push({ line: 1, message: `everything must sit inside ${opening} ... }` });
  }

  const preludes: string[] = [];
  let buffer = '';
  let line = 1;
  let bufferLine = 1;

  const flushDeclaration = () => {
    const statement = buffer.trim();
    buffer = '';
    const colon = statement.indexOf(':');
    if (colon < 1 || preludes.length === 0) return;
    const property = statement.slice(0, colon).trim();
    const value = statement.slice(colon + 1).trim();
    const inForcedColours = preludes.some((prelude) => forcedColours.test(prelude));
    for (const message of checkValue(property, value, inForcedColours)) {
      problems.push({ line: bufferLine, message });
    }
  };

  for (const character of text) {
    if (character === '{') {
      preludes.push(buffer.trim());
      buffer = '';
    } else if (character === '}') {
      flushDeclaration();
      preludes.pop();
    } else if (character === ';') {
      flushDeclaration();
    } else {
      if (buffer.trim() === '' && character.trim() !== '') bufferLine = line;
      buffer += character;
    }
    if (character === '\n') line += 1;
  }
  return problems;
}
