The primary action control — use for any clickable button across the product.

```jsx
<Button variant="primary" size="md" onClick={handleSave}>
  Save changes
</Button>
```

Variants: `primary` (accent-filled, main CTA), `secondary` (filled neutral), `outline` (bordered), `ghost` (transparent, for toolbars), `danger` (destructive actions).
Sizes: `sm`, `md`, `lg`, `icon` (square, for a single icon child).
Pass `disabled` natively; all other `<button>` props (type, onClick, aria-*) pass through.
