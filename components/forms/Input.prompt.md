Single-line text input. Wrap in `<Field>` for a label/hint/error.

```jsx
<Input type="email" placeholder="you@example.com" />
<Input invalid value={value} onChange={handleChange} />
```

All native `<input>` props pass through (type, value, onChange, disabled, maxLength, etc).
