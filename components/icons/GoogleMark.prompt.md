Google's "G" mark for a "Sign in with Google" button.

```jsx
<Button variant="primary" size="lg" style={{ width: '100%' }}>
  <GoogleMark /> Sign in with Google
</Button>
```

White-on-color monochrome variant — the correct official treatment when
the mark sits on a colored button (`Button variant="primary"`), as opposed
to the 4-color G, which is only for white/light buttons. Don't swap in the
4-color version here; use this one for any colored button background.
