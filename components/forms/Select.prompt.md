Styled wrapper around a native `<select>` — keeps native accessibility/keyboard behavior while matching the input's visual style.

```jsx
<Select value={team} onChange={(e) => setTeam(e.target.value)}>
  <option value="">Choose a team…</option>
  {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
</Select>
```
