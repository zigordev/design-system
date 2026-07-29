A modal dialog: portalled, focus-trapped, dismissible.

```jsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete pool?"
  description="This cannot be undone."
  busy={saving}
  size="sm"
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" loading={saving} onClick={remove}>Delete</Button>
  </>}
>
  <p>Everyone's predictions go with it.</p>
</Modal>
```

The behaviour is the reason this is a component. It traps Tab inside the
dialog, restores focus to whatever opened it, locks body scroll, closes on
Esc and on the overlay, and renders through a portal so no ancestor's
`overflow` or stacking context can clip it. Every one of those is
invisible to a mouse user and immediately broken without.

`busy` closes all three exits during a submit, so an in-flight request
cannot be abandoned by a stray Esc.

`size` is `sm` | `md` | `lg` (420 / 520 / 720px).
