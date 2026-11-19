# @zigordev/react

React components for zigordev apps, built on Base UI and styled by `@zigordev/css`.

## Use

```bash
pnpm add @zigordev/react @zigordev/css
```

```tsx
import { Button, Card, Field, Link, Stack, ThemeSwitcher } from '@zigordev/react';
```

Import `@zigordev/css/index.css` once in the app's root layout. Interactive components carry `"use client"`; the rest work as server components. Every label is a prop, so the app translates it.

The full guide, with the props of each component, is in the repo's [user manual](https://github.com/zigordev/design-system/blob/main/docs/user-manual.md).
