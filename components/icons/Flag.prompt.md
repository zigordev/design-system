A country flag chip for language switchers — real flag artwork (not emoji),
rounded corners, a hairline border for definition against light or dark
surfaces.

```jsx
<Flag code="es" size={20} />
```

`size` is the width in px; height follows automatically at the real 4:3
flag ratio. Available codes: `gb`, `es` — add more the same way as `Icon`
(vendor real path data into `flagPaths.js`, don't invent artwork).

`es` intentionally omits the coat of arms — illegible at UI sizes, and the
real artwork is ~600 path nodes. Colors and band proportions are still the
real flag's, sourced from the MIT-licensed
[flag-icons](https://github.com/lipis/flag-icons) project.
