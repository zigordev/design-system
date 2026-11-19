# @zigordev/icons

The curated Lucide icon set for zigordev apps, as React components and an SVG sprite. Styles come from `@zigordev/css`.

## Use

```bash
pnpm add @zigordev/icons @zigordev/css
```

```tsx
import { ArrowRightIcon, SearchIcon } from '@zigordev/icons';

<ArrowRightIcon />
<SearchIcon label={t('search')} size="lg" />
```

An icon is hidden from screen readers unless it gets a `label`. Without React, copy `@zigordev/icons/sprite.svg` into the app's static files and reference a symbol by its Lucide name:

```html
<svg class="ds-icon" aria-hidden="true"><use href="/sprite.svg#search"></use></svg>
```

## Add an icon

Add its Lucide name to `src/names.ts`, run `pnpm --filter @zigordev/icons run generate`, and commit the regenerated files.

## Licence

The package is `UNLICENSED`. The icons come from Lucide under the ISC licence, included as `LICENSE-lucide`.
