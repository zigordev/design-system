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

### SearchField

A search box with a search icon and a clear button, such as the cv's Ask bar. Put it in a Field for its label, and its form in a `<search>` element so screen readers list it as a search landmark.

```tsx
import { Field, SearchField } from '@zigordev/react';

<search>
  <form onSubmit={ask}>
    <Field label={t('ask')}>
      <SearchField clearLabel={t('clearSearch')} value={query} onValueChange={setQuery} />
    </Field>
  </form>
</search>;
```

It takes `value` or `defaultValue`, `onValueChange(value)`, `size` and `clearLabel`, the accessible name of the clear button, which appears when there is text and puts the focus back in the box.

### Select, Combobox and Autocomplete

Select picks one option from a short list. Combobox picks one option from a long list by typing to filter it. Autocomplete suggests values while the person types any text.

```tsx
import { Autocomplete, Combobox, Field, Select } from '@zigordev/react';

<Field label={t('reason')}>
  <Select options={reasons} placeholder={t('chooseReason')} value={reason} onValueChange={setReason} />
</Field>
<Field label={t('team')}>
  <Combobox options={teams} emptyText={t('noTeam')} onValueChange={setTeam} />
</Field>
<Field label={t('topic')}>
  <Autocomplete suggestions={topics} onValueChange={setTopic} />
</Field>
```

- Options are `{ value, label, disabled? }`. Select's value is the option's `value`; Combobox's is the whole option, so the label shows in the box; Autocomplete's is the text.
- All three take `name`, `disabled`, `size` and `placeholder`; Select and Combobox take `required`, and Combobox takes `emptyText` for when nothing matches. Arrow keys move through the list, Enter picks, and Escape closes it.

### NumberField, Slider, OtpField and DateInput

NumberField enters a whole number with buttons to step it, such as a score. Slider picks a value or a range. OtpField enters a one-time code. DateInput enters a date or time with the browser's own picker, which is localised and works with every assistive technology.

```tsx
import { DateInput, Field, NumberField, OtpField, Slider } from '@zigordev/react';

<Field label={t('homeGoals')}>
  <NumberField min={0} max={20} decrementLabel={t('fewer')} incrementLabel={t('more')} />
</Field>
<Slider label={t('price')} defaultValue={[20, 80]} showValue thumbLabels={[t('lowest'), t('highest')]} />
<Field label={t('code')}>
  <OtpField length={6} inputLabel={(position, length) => t('digit', { position, length })} />
</Field>
<Field label={t('startDate')}>
  <DateInput type="date" />
</Field>
```

- NumberField takes Base UI's `value`, `min`, `max`, `step` and `format`, and labels for its two buttons.
- Slider takes a number or an array of two numbers, `min`, `max`, `step`, `label`, `showValue` and `thumbLabels`; arrow keys move a thumb.
- OtpField's first input takes the Field's label, and `inputLabel` names the others.
- DateInput's `type` is `date` (default), `time`, `datetime-local` or `month`.

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

### ToggleGroup and Toggle

A row of buttons that switch between views or options, such as table, form and fixtures. It follows Base UI's toggle group: arrow keys move between the toggles and each one is a button with `aria-pressed`.

```tsx
import { Toggle, ToggleGroup } from '@zigordev/react';

<ToggleGroup
  aria-label={t('standingsView')}
  value={[view]}
  onValueChange={([next]) => next && setView(next)}
>
  <Toggle value="table">{t('table')}</Toggle>
  <Toggle value="form">{t('form')}</Toggle>
</ToggleGroup>;
```

- ToggleGroup takes `value` or `defaultValue` (an array), `onValueChange`, `multiple` (default `false`), `disabled`, `orientation` and `size` (`sm`, `md`; default `md`). Name it with `aria-label` or `aria-labelledby`.
- Toggle takes `value`, an optional `icon`, and its label as children. An icon-only toggle requires `aria-label`.
- The pressed toggle is raised, with a field border, so its state does not rely on colour alone. Corners follow the product's button radius.

### ThemeSwitcher

The light, dark and system choice, as a toggle group with the sun, moon and monitor icons. It is controlled: the app keeps the choice, applies it to the root element, and stores it.

```tsx
'use client';
import { type ThemeChoice, ThemeSwitcher } from '@zigordev/react';
import { themeAttributes } from '@zigordev/tokens';

function applyMode(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === 'system') root.removeAttribute(themeAttributes.mode);
  else root.setAttribute(themeAttributes.mode, choice);
}

<ThemeSwitcher
  label={t('theme')}
  labels={{ light: t('light'), dark: t('dark'), system: t('system') }}
  value={theme}
  onValueChange={(next) => {
    setTheme(next);
    applyMode(next);
  }}
/>;
```

- `labels` name each choice; they are the accessible names of the icon-only toggles, or visible text with `showLabels`. `label` names the group.
- Pressing the current choice again keeps it, so a choice is always selected. `size` is `sm` or `md`.
- Store the choice in a cookie and render the root element's `data-mode` on the server, so the first paint already has the right mode.

### LanguageSwitcher

Links to the current page in the other languages. Each link has `hreflang` and `lang`, and the current language has `aria-current`.

```tsx
import { LanguageSwitcher } from '@zigordev/react';

<LanguageSwitcher
  label={t('language')}
  current={locale}
  languages={[
    { code: 'en', name: 'English', href: '/en/cases' },
    { code: 'es', name: 'Español', href: '/es/cases' },
  ]}
/>;
```

`display` is `code` (default), which shows EN and ES with the full name for screen readers, or `name`, which shows the names. Write each name in its own language. The links are full page loads, so the new language's messages load with the page.

### Tooltip

A short label that appears on hover and keyboard focus, for controls whose meaning is visual, such as an icon-only button.

```tsx
import { PlusIcon } from '@zigordev/icons';
import { Button, Tooltip } from '@zigordev/react';

<Tooltip content={t('addMatch')}>
  <Button iconOnly aria-label={t('addMatch')}>
    <PlusIcon />
  </Button>
</Tooltip>;
```

- `content` is the label, `children` the single element it describes, `side` is `top` (default), `bottom`, `left` or `right`, and `delay` is the hover delay in milliseconds.
- Tooltips hold text only and never the only copy of essential information; touch screens do not show them. They do not open on disabled controls.
- Wrap an area in `TooltipProvider` to share one delay between its tooltips.

### Popover and PreviewCard

Popover opens a small non-modal panel from a button, such as share options. PreviewCard shows a preview when a link is hovered or focused.

```tsx
import { Button, Link, Popover, PreviewCard } from '@zigordev/react';

<Popover trigger={<Button variant="outline" tone="neutral">{t('share')}</Button>} title={t('shareTitle')}>
  <Link href={url}>{t('copyLink')}</Link>
</Popover>
<PreviewCard trigger={<Link href="/cases/gpool">gpool</Link>}>{summary}</PreviewCard>
```

Both take `side` and `align`, and the open state props of Base UI (`open`, `defaultOpen`, `onOpenChange`). Popover takes `title` and `description`, which name and describe it for screen readers. Escape closes either, and the focus returns to the trigger.

### Dialog, AlertDialog and Drawer

Modal panels. Dialog is for a focused task, AlertDialog for a confirmation the person has to answer, and Drawer for a panel that slides in from a side, such as the mobile navigation.

```tsx
import { AlertDialog, AlertDialogClose, Button, Dialog, DialogClose, Drawer } from '@zigordev/react';

<Dialog
  trigger={<Button>{t('editProfile')}</Button>}
  title={t('editProfile')}
  closeLabel={t('close')}
  footer={<><DialogClose><Button variant="outline" tone="neutral">{t('cancel')}</Button></DialogClose><Button>{t('save')}</Button></>}
>
  {fields}
</Dialog>
<AlertDialog trigger={<Button tone="danger">{t('delete')}</Button>} title={t('deleteTitle')} description={t('deleteWarning')} actions={actions} />
<Drawer trigger={<Button>{t('menu')}</Button>} title={t('sections')} closeLabel={t('close')} side="left">{links}</Drawer>
```

- They trap the focus while open, close on Escape (AlertDialog only through its actions), and return the focus to the trigger.
- Dialog takes `size` (`sm`, `md`, `lg`; default `md`), `description`, `footer` and `closeLabel`, the accessible name of its close button. AlertDialog takes `actions`; wrap the button that cancels in `AlertDialogClose`. Drawer takes `side` (`right`, `left`, `bottom`; default `right`) and can be swiped closed.
- Without `trigger`, control them with `open` and `onOpenChange`.

### Alert

A message in the page about something that happened or needs attention. The banner variant spans the page, for example to say that trading-bot is in Paper mode.

```tsx
import { Alert, Button } from '@zigordev/react';

<Alert tone="success" title={t('sent')} live="polite">{t('replySoon')}</Alert>
<Alert variant="banner" tone="warning" title={t('paper')} action={<Button size="sm">{t('goLive')}</Button>} />
<Alert tone="info" title={t('updated')} onDismiss={hide} dismissLabel={t('dismiss')} />
```

- `tone` is `info` (default), `success`, `warning`, `danger` or `neutral`; each has its icon, so the tone never relies on colour alone.
- `live` announces an alert that appears after the page loaded: `polite` for news, `assertive` only for errors that block the person. A static alert has no role.
- `action` adds buttons, and `onDismiss` with `dismissLabel` adds a close button.

### Toast

A short message that confirms an action, such as a sent form, and disappears on its own. Wrap the app once in `ToastProvider` and add toasts with `useToast`.

```tsx
import { ToastProvider, useToast } from '@zigordev/react';

<ToastProvider closeLabel={t('close')}>{children}</ToastProvider>;

const toast = useToast();
toast.add({ title: t('sent'), description: t('replySoon'), tone: 'success' });
```

Toasts appear at the bottom end of the screen, at most `limit` (default 3) at once, and close after `timeout` milliseconds (default 5000) unless hovered or focused. Screen readers announce them. Use an Alert instead for anything the person must not miss.

### EmptyState

What a list or a search shows when it has nothing: a title, a hint and the action that helps.

```tsx
import { SearchIcon } from '@zigordev/icons';
import { Button, EmptyState } from '@zigordev/react';

<EmptyState
  icon={<SearchIcon />}
  title={t('noMatches')}
  description={t('tryShorter')}
  action={<Button>{t('clearFilters')}</Button>}
/>;
```

`headingLevel` (2, 3 or 4; default 2) fits the title into the page's outline.

### Progress and Meter

Progress shows how far a task has come, or that it is running when its length is unknown (`value={null}`). Meter shows a measurement within a range, such as a budget.

```tsx
import { Meter, Progress } from '@zigordev/react';

<Progress label={t('uploading')} value={uploaded} showValue />
<Progress label={t('loading')} value={null} />
<Meter label={t('budgetUsed')} value={72} tone="warning" />
```

Both take `label`, `min`, `max`, `showValue` (Meter shows it by default) and `tone` (`accent`, `success`, `warning`, `danger`). The value is formatted for the page's language.

### Tabs

Sections of one view that the person switches between without leaving the page, such as a case study's approach, pieces and decisions.

```tsx
import { Tab, TabList, TabPanel, Tabs } from '@zigordev/react';

<Tabs defaultValue="approach">
  <TabList aria-label={t('caseStudy')}>
    <Tab value="approach">{t('approach')}</Tab>
    <Tab value="pieces">{t('pieces')}</Tab>
  </TabList>
  <TabPanel value="approach">{approach}</TabPanel>
  <TabPanel value="pieces">{pieces}</TabPanel>
</Tabs>;
```

Arrow keys move between tabs, Enter or Space selects one, and an underline in the accent colour slides to the selected tab. Tabs take Base UI's `value`, `defaultValue` and `onValueChange`; name the list with `aria-label`. For pages with their own address, use links instead.

### Breadcrumbs, Pagination and SiteNavigation

Breadcrumbs shows where a page sits, Pagination moves through the pages of a long list, and SiteNavigation is the site's main menu, with dropdowns for sections.

```tsx
import NextLink from 'next/link';
import { Breadcrumbs, Pagination, SiteNavigation } from '@zigordev/react';

<Breadcrumbs label={t('breadcrumb')} items={[{ label: t('home'), href: '/' }, { label: 'gpool', href: '/cases/gpool' }]} />
<Pagination label={t('pages')} page={page} pageCount={12} href={(n) => `?page=${n}`} pageLabel={(n) => t('page', { n })} previousLabel={t('previous')} nextLabel={t('next')} />
<SiteNavigation
  label={t('main')}
  items={[
    { label: t('work'), href: '/work', current: true, render: <NextLink href="/work" /> },
    { label: t('cases'), links: [{ label: 'gpool', href: '/cases/gpool', description: t('gpoolSummary') }] },
  ]}
/>
```

- Breadcrumbs marks the last item as the current page and never links it. Items take `render` for Next.js `Link`.
- Pagination renders links, so every page has an address and works without JavaScript. It shows the first and last pages, the current one and its neighbours.
- SiteNavigation follows Base UI's navigation menu: links and dropdown triggers in a row, with arrow keys between them. On narrow screens, put the same links in a Drawer.

### Menu, ContextMenu and ScopeSwitcher

Menu lists actions behind a button, such as a pool's rename and delete. ContextMenu shows the same items on right-click or long-press. ScopeSwitcher is a menu that switches the current scope, such as gpool's pool.

```tsx
import { PencilIcon } from '@zigordev/icons';
import { Button, ContextMenu, Menu, MenuItem, MenuSeparator, ScopeSwitcher } from '@zigordev/react';

<Menu trigger={<Button variant="outline" tone="neutral">{t('actions')}</Button>}>
  <MenuItem icon={<PencilIcon />} onClick={rename}>{t('rename')}</MenuItem>
  <MenuSeparator />
  <MenuItem tone="danger" onClick={confirmDelete}>{t('delete')}</MenuItem>
</Menu>
<ContextMenu content={<MenuItem onClick={copyLink}>{t('copyLink')}</MenuItem>}>{match}</ContextMenu>
<ScopeSwitcher label={t('pool')} value={pool} options={pools} onValueChange={setPool} />
```

- Menu takes `trigger`, `side` and `align`, and the items: `MenuItem` (with `icon` and `tone`), `MenuLinkItem` (`href`, or `render` for Next.js `Link`), `MenuCheckboxItem`, `MenuRadioGroup` with `MenuRadioItem`, `MenuGroup` with a `label`, and `MenuSeparator`.
- Arrow keys move through the items, Enter or Space activates one, typing a letter jumps to it, and Escape closes the menu and returns the focus.
- A context menu has no keyboard way in, so every action in it must also be reachable another way.
- ScopeSwitcher's options are `{ value, label }`; its button reads the label and the current option to screen readers.

### Toolbar and CopyButton

Toolbar groups related buttons into one tab stop, with arrow keys between them, such as trading-bot's order actions. CopyButton copies a text and confirms it.

```tsx
import { CopyButton, Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from '@zigordev/react';

<Toolbar aria-label={t('order')}>
  <ToolbarGroup aria-label={t('side')}>
    <ToolbarButton>{t('buy')}</ToolbarButton>
    <ToolbarButton>{t('sell')}</ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarButton tone="danger">{t('cancelAll')}</ToolbarButton>
</Toolbar>
<CopyButton text={command} label={t('copy')} copiedLabel={t('copied')} />
```

ToolbarButton takes Button's props. CopyButton takes `text`, `label`, `copiedLabel`, `iconOnly` and Button's appearance; after a copy it shows `copiedLabel` for two seconds and announces it.

### CommandPalette

A searchable list of commands in a dialog, usually opened with ⌘K or Ctrl+K.

```tsx
import { CommandPalette } from '@zigordev/react';

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  title={t('commands')}
  placeholder={t('typeCommand')}
  emptyText={t('noCommand')}
  commands={[{ id: 'cases', label: t('openCases'), onSelect: () => router.push('/cases') }]}
/>;
```

Typing filters the commands, arrow keys move through them, and Enter or a click runs one and closes the palette. The app owns the shortcut that opens it.

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

`@zigordev/css` works on its own. A `<button class="ds-button" data-variant="outline" data-tone="neutral">` an `<a class="ds-link" data-tone="neutral">`, an `<input class="ds-text-input">` inside a `.ds-field`, or an `<input class="ds-checkbox" type="checkbox">` inside a `.ds-choice__label` renders the same as the React component. A switch is `<input class="ds-switch" type="checkbox" role="switch">`. The Storybook site serves plain HTML pages that use only the CSS bundle, one per component, such as the [buttons](../apps/docs/src/plain-html/page/button.html), the [links](../apps/docs/src/plain-html/page/link.html), the [fields](../apps/docs/src/plain-html/page/field.html), the [choices](../apps/docs/src/plain-html/page/choice.html), a [form](../apps/docs/src/plain-html/page/form.html) the [display components](../apps/docs/src/plain-html/page/display.html), the [icons](../apps/docs/src/plain-html/page/icon.html), the [layout](../apps/docs/src/plain-html/page/layout.html) and the [toggle groups and language links](../apps/docs/src/plain-html/page/switchers.html). Without React, icons come from the sprite: copy `@zigordev/icons/sprite.svg` into the app's static files and write `<svg class="ds-icon" aria-hidden="true"><use href="/sprite.svg#search"></use></svg>`.

## Limits

- Browser support is Baseline 2023: Chrome and Edge 111, Firefox 113, Safari 16.4.
- Themes apply on the root element only.
- The inventory grows one component per pull request; the order follows the cv rebuild.
