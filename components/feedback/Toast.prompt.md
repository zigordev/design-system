Transient corner notification. Render one `<ToastRegion>` at the app root, and push `<Toast>` children into it from your own toast-queue state (id, message, kind, auto-dismiss timer — see kini's ToastContext for a reference implementation of the queue itself, which this system intentionally doesn't own).

```jsx
<ToastRegion>
  {toasts.map((t) => (
    <Toast key={t.id} kind={t.kind} onDismiss={() => remove(t.id)}>{t.message}</Toast>
  ))}
</ToastRegion>
```
