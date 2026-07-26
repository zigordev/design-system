Label/hint/error wrapper — use around Input, Select, Checkbox, etc. to give any control a consistent label and validation message.

```jsx
<Field label="Team name" hint="Visible to other players" required>
  <Input placeholder="e.g. The Underdogs" />
</Field>
```

Pass `error` instead of `hint` to show a red validation message (error takes precedence over hint when both are set).
