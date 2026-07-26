Centered dialog for confirmations and short forms. Renders nothing when `open` is false — mount it unconditionally and toggle `open`.

```jsx
<Modal
  open={isOpen}
  title="Delete pool?"
  description="This can't be undone."
  onClose={() => setOpen(false)}
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
  </>}
/>
```
