# @zigordev/css

The CSS for zigordev apps: the tokens, a small reset, base styles and every component style, in cascade layers, bundled into one file.

## Use

```ts
import '@zigordev/css/index.css';
```

The file declares the layers `ds.reset`, `ds.tokens`, `ds.base`, `ds.components` and `ds.utilities`. An app's own unlayered CSS, such as its CSS Modules, always wins over them.

Components are classes with data attributes, so they work without React:

```html
<button class="ds-button" data-variant="outline" data-tone="neutral" type="button">Cancel</button>
```

The bundle targets Baseline 2023 browsers: Chrome and Edge 111, Firefox 113 and Safari 16.4.
