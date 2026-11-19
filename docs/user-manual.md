# User manual

How an app uses the design system: installing it, choosing its theme, styling with the tokens and using the components. Every UI element in a zigordev app comes from here; a missing component or variant is added to this repo in its own pull request.

## Install

Map the scope to GitHub Packages in the app's `.npmrc`, and authenticate with a token that has `read:packages`, as [local-first-start.md](local-first-start.md) describes:

```text
@zigordev:registry=https://npm.pkg.github.com
```

```bash
pnpm add @zigordev/css @zigordev/react @zigordev/tokens @zigordev/icons @fontsource-variable/mona-sans
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
| Layout                   | `--ds-size-container-sm` to `-xl`, `--ds-size-column-sm` to `-lg` and `--ds-size-measure`                                      |
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

### Form and ErrorSummary

Form wraps Base UI's Form. It lays out its fields, validates them on submit with the browser's constraints, moves the focus to the first invalid control, and shows errors from the server under the matching Field by its `name`.

```tsx
import { Button, ErrorSummary, Field, Form, TextInput } from '@zigordev/react';

<Form errors={serverErrors} onFormSubmit={send}>
  <ErrorSummary
    title={t('problem')}
    errors={[{ id: 'contact-email', message: t('emailInvalid') }]}
  />
  <Field name="email" label={t('email')} error={t('emailInvalid')} required>
    <TextInput id="contact-email" type="email" autoComplete="email" />
  </Field>
  <Button type="submit">{t('send')}</Button>
</Form>;
```

- Form takes `onFormSubmit(values)`, `errors` (an object of messages keyed by field name, for example from a server action) and `validationMode` (`onSubmit`, `onBlur` or `onChange`; default `onSubmit`). Every other `<form>` attribute passes through.
- ErrorSummary lists the errors of a failed submit at the top of a long form, each as a link that moves the focus to its control. It takes `title`, `errors` (`id` of the control and `message`), `headingLevel` (2, 3 or 4; default 2) and `autoFocus` (default `true`), and renders nothing when `errors` is empty.
- When the summary appears, it takes the focus and screen readers announce it. Give each listed control the same `id`. With React Hook Form, set `shouldFocusError: false` so the summary keeps the focus.
- A short form, like a contact form with three fields, needs no summary: the errors under the fields and the focus on the first one are enough.

### Card and CardLink

A surface that groups one subject, such as a case study or a match. CardLink makes the whole card a link: it renders a real link, usually in the card's heading, and stretches its click area over the card, so the link has one accessible name and the card one focus ring.

```tsx
import NextLink from 'next/link';
import { Badge, Card, CardLink } from '@zigordev/react';

<Card as="article">
  <h3>
    <CardLink render={<NextLink href="/cases/gpool" />}>gpool</CardLink>
  </h3>
  <p>{t('gpoolSummary')}</p>
  <Badge size="sm">Next.js</Badge>
</Card>;
```

| Prop      | Values                            | Default  |
| --------- | --------------------------------- | -------- |
| `as`      | `div`, `article`, `section`, `li` | `div`    |
| `variant` | `raised`, `outline`, `sunken`     | `raised` |
| `padding` | `none`, `sm`, `md`, `lg`          | `md`     |

- The corners follow the product's `--ds-radius-card`. A card lays its children out in a column with a gap; app styles go in a CSS Module passed as `className`.
- Put at most one CardLink in a card. Buttons and other links inside it stay clickable above the stretched area. Text in a linked card cannot be selected with the pointer, so keep long text out of linked cards.
- CardLink takes the props of Link except `tone` and `underline`: its text keeps the card's colour and underlines on hover.

### Badge

A short status or category label, such as a technology or Live and Paper.

```tsx
import { Badge } from '@zigordev/react';

<Badge>{t('draft')}</Badge>
<Badge tone="success" variant="solid">{t('live')}</Badge>
<Badge size="sm">PostgreSQL</Badge>
```

| Prop      | Values                                                                | Default   |
| --------- | --------------------------------------------------------------------- | --------- |
| `tone`    | `neutral`, `accent`, `second`, `success`, `warning`, `danger`, `info` | `neutral` |
| `variant` | `soft`, `solid`, `outline`                                            | `soft`    |
| `size`    | `sm`, `md`                                                            | `md`      |

A badge is not interactive. Its corners follow the product's `--ds-radius-button`, so cv and trading-bot get tags and gpool gets pills. Every tone and variant meets the text contrast of the theme.

### Spinner and Skeleton

Spinner shows that something is loading when its size is unknown. Skeleton holds the place of content whose shape is known, such as a card's text.

```tsx
import { Skeleton, Spinner } from '@zigordev/react';

<Spinner label={t('loadingCases')} />
<section aria-busy={loading}>
  {loading ? <Skeleton lines={3} /> : <CaseSummary />}
</section>
```

- Spinner takes `label`, `size` (`sm`, `md`, `lg`; default `md`) and `tone` (`accent`, `neutral`; default `accent`). With a label it is a `role="status"` region whose label only screen readers read; without one it is hidden from them, for use next to visible text.
- Skeleton takes `shape` (`text`, `rect`, `circle`; default `text`) and `lines` for text, where the last line is shorter. It is hidden from screen readers; mark the loading region with `aria-busy`. Size a rect or circle with a `className`.
- Under `prefers-reduced-motion`, the spinner turns three times slower and the skeleton stops shimmering. Button's loading spinner follows the same rule.

### Separator

A thin line between groups of content, rendered as an `<hr>`.

```tsx
import { Separator } from '@zigordev/react';

<Separator />
<Separator orientation="vertical" />
<Separator decorative />
```

`orientation` is `horizontal` (default) or `vertical`; a vertical separator needs a flex row around it, which stretches it to the row's height. `decorative` hides it from screen readers when it only adds rhythm and separates nothing.

### VisuallyHidden

Text that only screen readers read, such as a label for a control whose meaning is visual. It renders a `<span>` with the `ds-visually-hidden` class.

### Icons

`@zigordev/icons` holds the icons of every app: a curated Lucide set, as React components and an SVG sprite.

```tsx
import { ArrowUpRightIcon, SearchIcon } from '@zigordev/icons';
import { Button, Link } from '@zigordev/react';

<Link href="https://github.com/zigordev" endIcon={<ArrowUpRightIcon />}>GitHub</Link>
<Button iconOnly aria-label={t('search')}><SearchIcon /></Button>
<SearchIcon label={t('search')} size="lg" />
```

- An icon is hidden from screen readers unless it gets a `label`, which makes it an image with that name. In a Button or Link icon slot, leave it unlabelled: the control carries the name.
- `size` is `sm`, `md` (default) or `lg`, from the icon tokens, so it follows the density. In a Button or Link slot, the slot sets the size.
- Icons draw with `currentColor`, so they take the colour of the text around them.
- The Icons page in Storybook shows the whole set. A missing icon is added to this repo by its Lucide name, never drawn in an app.

### Stack, Inline, Grid and Container

Layout helpers, so screens need no layout CSS of their own. Each takes `as` (`div`, `section`, `article`, `aside`, `header`, `footer`, `main`, `nav`, `ul` or `ol`; default `div`); as a list, it keeps `role="list"` so Safari still announces it.

```tsx
import { Badge, Card, Container, Grid, Inline, Stack } from '@zigordev/react';

<Container as="main" size="lg">
  <Stack gap={8}>
    <Inline as="ul" gap={2} aria-label={t('technologies')}>
      <li>
        <Badge size="sm">Next.js</Badge>
      </li>
    </Inline>
    <Grid as="ul" min="sm">
      <li>
        <Card>{t('gpool')}</Card>
      </li>
    </Grid>
  </Stack>
</Container>;
```

- `gap` is a step of the space scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12 or 16. Stack defaults to 4, Inline to 2 and Grid to 4.
- Stack is a column; `align` is `stretch` (default), `start`, `center` or `end`.
- Inline is a row that wraps; `align` is `center` (default), `start`, `end`, `baseline` or `stretch`, `justify` is `start` (default), `center`, `end` or `between`, and `wrap={false}` keeps it on one line.
- Grid fills the row with as many columns as fit, each at least `min` wide: `sm` 12rem, `md` 16rem (default) or `lg` 20rem.
- Container centres its content at `size` `sm` 40rem, `md` 48rem, `lg` 64rem (default) or `xl` 80rem, with 16px gutters on phones and 32px from 48rem.

### Prose

Typography for long-form content, such as a case study written in Markdown. Prose styles the elements inside it: headings in the product's display style, paragraphs, links, lists, quotes, code, tables, rules and images, at a comfortable line length.

```tsx
import { Prose } from '@zigordev/react';

<Prose as="article">
  <MDXContent />
</Prose>;
```

Use Prose only around content the app does not build from components. Its links look like Link, and its text is one step larger than the interface text.

### SkipLink

The first element of every page: a link that jumps past the navigation to the main content. It stays off screen until it gets keyboard focus.

```tsx
import { SkipLink } from '@zigordev/react';

<body>
  <SkipLink target="main">{t('skipToContent')}</SkipLink>
  <Header />
  <main id="main" tabIndex={-1}>
    {children}
  </main>
</body>;
```

`target` is the id of the main content, `main` by default. Give that element `tabIndex={-1}`, so the focus moves into it.

## Without React

`@zigordev/css` works on its own. A `<button class="ds-button" data-variant="outline" data-tone="neutral">` an `<a class="ds-link" data-tone="neutral">`, an `<input class="ds-text-input">` inside a `.ds-field`, or an `<input class="ds-checkbox" type="checkbox">` inside a `.ds-choice__label` renders the same as the React component. A switch is `<input class="ds-switch" type="checkbox" role="switch">`. The Storybook site serves plain HTML pages that use only the CSS bundle, one per component, such as the [buttons](../apps/docs/src/plain-html/page/button.html), the [links](../apps/docs/src/plain-html/page/link.html), the [fields](../apps/docs/src/plain-html/page/field.html), the [choices](../apps/docs/src/plain-html/page/choice.html), a [form](../apps/docs/src/plain-html/page/form.html) the [display components](../apps/docs/src/plain-html/page/display.html), the [icons](../apps/docs/src/plain-html/page/icon.html) and the [layout](../apps/docs/src/plain-html/page/layout.html). Without React, icons come from the sprite: copy `@zigordev/icons/sprite.svg` into the app's static files and write `<svg class="ds-icon" aria-hidden="true"><use href="/sprite.svg#search"></use></svg>`.

## Limits

- Browser support is Baseline 2023: Chrome and Edge 111, Firefox 113, Safari 16.4.
- Themes apply on the root element only.
- The inventory grows one component per pull request; the order follows the cv rebuild.
