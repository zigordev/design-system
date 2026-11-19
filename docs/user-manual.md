# User manual

How an app uses the design system: installing it, choosing its theme, styling with the tokens and using the components. Every UI element in a zigordev app comes from here; a missing component or variant is added to this repo in its own pull request.

## Install

Map the scope to GitHub Packages in the app's `.npmrc`, and authenticate with a token that has `read:packages`, as [local-first-start.md](local-first-start.md) describes:

```text
@zigordev:registry=https://npm.pkg.github.com
```

```bash
pnpm add @zigordev/css @zigordev/react @zigordev/tokens @fontsource-variable/mona-sans
```

Add `@fontsource-variable/jetbrains-mono` when the app shows code.

## Set it up in a Next.js app

Import the CSS and the fonts once, in the root layout, and put the theme on the root element:

```tsx
import '@fontsource-variable/mona-sans/wdth.css';
import '@zigordev/css/index.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" data-product="gpool" data-density="comfortable">
      <body>{children}</body>
    </html>
  );
}
```

`wdth.css` loads Mona Sans with its width axis, which the condensed display width needs.

## Themes

Four dimensions choose the theme. Each is an attribute on the root element.

| Dimension | Attribute       | Values                       | When absent                                |
| --------- | --------------- | ---------------------------- | ------------------------------------------ |
| Product   | `data-product`  | `cv`, `gpool`, `trading-bot` | cv                                         |
| Mode      | `data-mode`     | `light`, `dark`              | follows the system's light or dark setting |
| Density   | `data-density`  | `comfortable`, `compact`     | comfortable                                |
| Contrast  | `data-contrast` | `standard`, `high`           | follows the system's contrast setting      |

- Each app sets its product. trading-bot also sets `data-density="compact"` and, until the person chooses otherwise, `data-mode="dark"`.
- A theme switcher writes these attributes. `@zigordev/tokens` exports the values and their attribute names for TypeScript: `products`, `modes`, `densities`, `contrasts`, `defaultTheme` and `themeAttributes`.
- The attributes work on the root element only. A dark panel inside a light page is not supported yet.

## Style with the tokens

App styles go in CSS Modules and use the role tokens, never raw colours, sizes or durations. The design system's styles sit in cascade layers, so a CSS Module always wins over them without specificity tricks.

```css
.matchCard {
  display: grid;
  gap: var(--ds-space-3);
  padding: var(--ds-space-4);
  border-radius: var(--ds-radius-card);
  background-color: var(--ds-color-bg-raised);
  box-shadow: var(--ds-shadow-raised);
}
```

| Group                    | Tokens                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Surfaces                 | `--ds-color-bg-page`, `-raised`, `-sunken`, `-field`, `-hover`, `-pressed`, `-inverse`, `-disabled`                            |
| Text                     | `--ds-color-fg-default`, `-muted`, `-inverse`, `-disabled`                                                                     |
| Borders and focus        | `--ds-color-border-subtle`, `-default`, `-field`, `--ds-color-focus-ring`, `--ds-focus-width`, `--ds-focus-offset`             |
| Accent and second accent | `--ds-color-accent-solid`, `-solid-hover`, `-soft`, `-soft-hover`, `-text`, `-on`, `-border-strong`, and the same for `second` |
| Status                   | the same set for `danger`, `success`, `warning` and `info`, plus a subtle `-border`                                            |
| Space                    | `--ds-space-1` to `--ds-space-24`, in steps of 0.25 rem                                                                        |
| Shape                    | `--ds-radius-xs` to `--ds-radius-full`, and the product's `--ds-radius-button`, `-field` and `-card`                           |
| Type                     | `--ds-font-family-sans`, `-mono`, `--ds-font-size-xs` to `-3xl`, `--ds-font-weight-*`, `--ds-font-line-height-*`               |
| Display                  | `--ds-font-display-stretch` and `--ds-font-display-weight`, the product's width and weight for headings and big numbers        |
| Underline                | `--ds-font-underline-offset`, `-thickness` and `-thickness-strong`, the underline of links                                     |
| Controls                 | `--ds-size-control-*`, `--ds-space-control-*`, `--ds-font-size-control` and `-field`, which follow the density                 |
| Motion and depth         | `--ds-duration-fast`, `-base`, `-slow`, `--ds-easing-standard`, `-emphasized`, `-exit`, `--ds-shadow-raised`, `-overlay`       |

Under `prefers-reduced-motion`, the durations become zero, so transitions built on them stop on their own. Tokens under `--ds-color-palette-*` and `--ds-color-scale-*` are primitives behind the roles; apps do not use them.

A heading in the product's display style:

```css
.score {
  font-size: var(--ds-font-size-3xl);
  font-stretch: calc(var(--ds-font-display-stretch) * 1%);
  font-weight: var(--ds-font-display-weight);
  font-variant-numeric: tabular-nums;
}
```

## Components

Components hold no copy. Every label comes in as a prop, translated by the app in English and Spanish.

### Button

An action. It renders a `<button>` and defaults to `type="button"`.

```tsx
import { Button } from '@zigordev/react';

<Button onClick={save}>{t('save')}</Button>
<Button variant="outline" tone="neutral" onClick={cancel}>{t('cancel')}</Button>
<Button tone="danger" loading={deleting} onClick={remove}>{t('delete')}</Button>
<Button iconOnly aria-label={t('addMatch')}><PlusIcon /></Button>
```

| Prop                   | Values                                                                      | Default  |
| ---------------------- | --------------------------------------------------------------------------- | -------- |
| `variant`              | `solid`, `soft`, `outline`, `ghost`                                         | `solid`  |
| `tone`                 | `accent`, `neutral`, `danger`                                               | `accent` |
| `size`                 | `sm`, `md`, `lg`                                                            | `md`     |
| `startIcon`, `endIcon` | an icon element, hidden from screen readers                                 | none     |
| `iconOnly`             | `true` makes the button square and requires `aria-label`                    | `false`  |
| `loading`              | `true` shows a spinner, blocks clicks, sets `aria-busy` and keeps the focus | `false`  |
| `disabled`             | `true` disables it                                                          | `false`  |

Every other `<button>` attribute passes through. Use one solid accent button per view for the main action, outline or ghost neutral buttons for the rest, and the danger tone only for destructive actions.

### LinkButton

Navigation that looks like a button. It renders a real link, so the browser's link behaviour keeps working. It takes the same `variant`, `tone`, `size`, icon and `iconOnly` props as Button. With Next.js, compose it with `Link` through `render`:

```tsx
import Link from 'next/link';
import { LinkButton } from '@zigordev/react';

<LinkButton render={<Link href="/cases/gpool" />}>{t('readCaseStudy')}</LinkButton>;
```

### Link

Navigation in running text and in lists of links. It renders a real `<a>`, so the browser's link behaviour keeps working. In running text it is underlined, so a link never relies on colour alone.

```tsx
import NextLink from 'next/link';
import { Link } from '@zigordev/react';

<p>
  {t.rich('intro', {
    cases: (chunks) => <Link render={<NextLink href="/cases" />}>{chunks}</Link>,
  })}
</p>
<Link href="https://github.com/zigordev" endIcon={<ExternalIcon />}>GitHub</Link>
<Link render={<NextLink href="/work" />} tone="neutral" underline="hover" aria-current="page">
  {t('work')}
</Link>
```

| Prop                   | Values                                                                                 | Default  |
| ---------------------- | -------------------------------------------------------------------------------------- | -------- |
| `tone`                 | `accent`, or `neutral` to take the colour of the text around it                        | `accent` |
| `underline`            | `always`, or `hover` for lists of links outside running text, such as a navigation bar | `always` |
| `startIcon`, `endIcon` | an icon element, hidden from screen readers                                            | none     |
| `render`               | an element or function to render instead of `<a>`, such as Next.js `Link`              | `<a>`    |

Every other `<a>` attribute passes through. Mark the link to the current page with `aria-current="page"`: it gets a strong underline and the default text colour, whatever its `underline`. Use LinkButton instead when a link is the main call to action.

### Field, TextInput and Textarea

A Field labels one control and shows its description and its error. TextInput is a one-line text control and Textarea a multi-line one. Inside a Field they get their label, description and error wired to the control for screen readers, so every control has a visible label.

```tsx
import { Field, Textarea, TextInput } from '@zigordev/react';

<Field label={t('email')} description={t('emailHint')} error={errors.email?.message} required>
  <TextInput type="email" name="email" autoComplete="email" />
</Field>
<Field label={t('message')}>
  <Textarea name="message" rows={4} />
</Field>
```

| Field prop       | Values                                                                                | Default    |
| ---------------- | ------------------------------------------------------------------------------------- | ---------- |
| `label`          | the visible label                                                                     | required   |
| `description`    | a hint shown between the label and the control                                        | none       |
| `error`          | the error message; when set, the field is invalid and the control gets `aria-invalid` | none       |
| `required`       | `true` shows an asterisk, hidden from screen readers, and makes the control required  | `false`    |
| `disabled`       | `true` disables the control and dims the label                                        | `false`    |
| `validationMode` | when Base UI validates the control itself: `onSubmit`, `onBlur` or `onChange`         | `onSubmit` |

- With React Hook Form and Zod, pass the field's message as `error`. Without `error`, Base UI validates the control with the browser's constraints, such as `required` or `type="email"`, and shows the browser's message.
- If a form marks required fields with the asterisk, the app says once, above the form, what it means. A form where almost every field is required can mark the optional ones in their labels instead and leave `required` on the controls.
- TextInput takes `type` (`text`, `email`, `password`, `search`, `tel`, `url`; default `text`) and `size` (`sm`, `md`, `lg`; default `md`). Textarea takes `size` and `rows` (default 3) and grows with its content in browsers that support `field-sizing`. Both pass every other attribute through.
- Text is 16px in comfortable density, so iOS Safari does not zoom in when a field gets focus. A TextInput outside a Field needs `aria-label`.

### Checkbox, Switch, CheckboxGroup and RadioGroup

Choices with a visible label beside the control. Checkbox is for a yes or no that takes effect when the form is sent, Switch for a setting that applies at once, RadioGroup for one choice among a few, and CheckboxGroup for any number of them.

```tsx
import { Checkbox, CheckboxGroup, Radio, RadioGroup, Switch } from '@zigordev/react';

<Checkbox name="newsletter" label={t('newsletter')} description={t('newsletterHint')} />
<Switch label={t('pricesWithTax')} checked={withTax} onCheckedChange={setWithTax} />
<RadioGroup name="reply" label={t('reply')} defaultValue="email" error={errors.reply?.message}>
  <Radio value="email" label={t('email')} />
  <Radio value="phone" label={t('phone')} description={t('phoneHours')} />
</RadioGroup>
<CheckboxGroup name="topics" label={t('topics')} defaultValue={[]}>
  <Checkbox value="design" label={t('designSystems')} />
  <Checkbox value="testing" label={t('testing')} />
</CheckboxGroup>
```

- Every choice takes `label` and an optional `description`. A Checkbox or Switch on its own also takes `error`; inside a group, the group shows the error.
- Checkbox takes `checked` or `defaultChecked`, `onCheckedChange` and `indeterminate`. Switch takes the same, without `indeterminate`.
- RadioGroup takes `value` or `defaultValue` and `onValueChange`. CheckboxGroup takes the same with an array of values. Both take `label`, `description`, `error`, `name`, `disabled` and `orientation` (`vertical` or `horizontal`; default `vertical`).
- Each item in a group takes `value`. Arrow keys move between radios; Tab moves between checkboxes.
- The group's label, description and error, and each choice's description, reach screen readers through Base UI.

## Without React

`@zigordev/css` works on its own. A `<button class="ds-button" data-variant="outline" data-tone="neutral">` an `<a class="ds-link" data-tone="neutral">`, an `<input class="ds-text-input">` inside a `.ds-field`, or an `<input class="ds-checkbox" type="checkbox">` inside a `.ds-choice__label` renders the same as the React component. A switch is `<input class="ds-switch" type="checkbox" role="switch">`. The Storybook site serves plain HTML pages that use only the CSS bundle, one per component, such as the [buttons](../apps/docs/src/plain-html/page/button.html), the [links](../apps/docs/src/plain-html/page/link.html), the [fields](../apps/docs/src/plain-html/page/field.html) and the [choices](../apps/docs/src/plain-html/page/choice.html).

## Limits

- Browser support is Baseline 2023: Chrome and Edge 111, Firefox 113, Safari 16.4.
- Themes apply on the root element only.
- The inventory grows one component per pull request; the order follows the cv rebuild.
