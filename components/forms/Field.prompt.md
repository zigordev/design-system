Label/hint/error wrapper — use around Input, Select, Checkbox, etc. to give any control a consistent label and validation message.

```jsx
<Field label="Team name" hint="Visible to other players" required>
  <Input placeholder="e.g. The Underdogs" />
</Field>
```

Pass `error` instead of `hint` to show a red validation message (error takes precedence over hint when both are set).

## Compact forms

Put `ds-form-compact` on a wrapper to tighten every field inside it:

```jsx
<div className="ds-form-compact">
  <Field label="Winner points"><Input type="number" /></Field>
  <Field label="Exact result"><Input type="number" /></Field>
</div>
```

Dense settings panels — a grid of scoring numbers, a prize table — want
smaller controls than a page-level form. As a wrapper rather than a prop
because the alternative is passing `size` to every control and missing one.

It reverts to full size below 640px: 32px is under a comfortable touch
target, and a settings panel on a phone is still a form you have to tap.
