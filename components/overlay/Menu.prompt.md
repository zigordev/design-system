Self-contained dropdown: manages its own open state, closes on outside click or Escape. Use for `Topbar.utilities` triggers like a user menu or language picker — pair with `Button` (`variant="ghost" size="icon"`) as the trigger for a consistent icon-button look, and `MenuItem` for panel rows.

```jsx
<Menu trigger={<Button variant="ghost" size="icon"><UserIcon /></Button>}>
  {({ close }) => (
    <>
      <div style={{ padding: '6px 10px', fontSize: 'var(--ds-text-xs)', color: 'var(--ds-color-fg-subtle)' }}>
        jane@example.com
      </div>
      <MenuItem onClick={() => { close(); signOut(); }}>Sign out</MenuItem>
    </>
  )}
</Menu>
```
