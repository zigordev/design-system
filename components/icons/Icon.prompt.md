The one glyph set for the whole product suite — pick a semantic `name`, get
a 24x24 stroke icon that inherits color from its parent via `currentColor`.

```jsx
<Icon name="settings" size={16} />
```

Default `size` is 18 (nav-row height), default `strokeWidth` is 1.75. Icons
never carry their own color — place them inside an element with the right
`color` / `var(--ds-color-*)`, or just let them inherit the surrounding
text color, which is the common case.

Available names: `home`, `trophy`, `list-plus`, `trending-up`, `users`,
`user`, `shield`, `edit`, `log-out`, `sun`, `moon`, `globe`,
`layout-dashboard`, `history`, `chart-line`, `settings`, `x`, `menu`,
`chevron-down`, `chevron-right`, `check`, `circle-alert`.

Vendored from [Lucide](https://lucide.dev) (ISC license) as static path
data in `paths.js` — no npm dependency, matching every other component in
this library. Need a name that isn't on the list? Add its path data to
`paths.js` (copy it from lucide.dev, or from an installed `lucide-react`'s
`dist/esm/icons/<name>.js` if one of the consuming apps already has it)
rather than hand-drawing new artwork. The point is matching one established,
high-quality icon language everywhere, not inventing a second one per app.
