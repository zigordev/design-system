The primary action control — use for any clickable button across the product.

```jsx
<Button variant="primary" size="md" onClick={handleSave}>
  Save changes
</Button>
```

Variants: `primary` (accent-filled, main CTA), `secondary` (filled neutral), `outline` (bordered), `ghost` (transparent, for toolbars), `danger` (destructive actions).
Sizes: `sm`, `md`, `lg`, `icon` (square, for a single icon child).
Pass `disabled` natively; all other `<button>` props (type, onClick, aria-*) pass through.

Use `as` when the action navigates:

```jsx
<Button as={Link} href="/pools" variant="primary">Create pool</Button>
```

That renders a real anchor, so middle-click, cmd-click, "open in new tab"
and the browser status bar all keep working. A `<button onClick={() =>
router.push(...)}>` looks identical and breaks all four.

`loading` swaps the leading icon for a spinner and disables the button —
it replaces the icon rather than sitting next to it, so the button keeps
its width and the surrounding row doesn't reflow on submit.
