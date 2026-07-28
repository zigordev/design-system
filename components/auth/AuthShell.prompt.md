Full-viewport centering wrapper for auth screens. Pairs with `AuthCard`.

```jsx
<AuthShell utilities={<><ThemeButton /><LanguageButton /></>}>
  <AuthCard ...>...</AuthCard>
</AuthShell>
```

The background wash is a soft gradient tinted from `--ds-color-accent` —
automatically on-brand per theme, nothing to configure per project.
`utilities` renders pinned top-right (same slot convention as Topbar's
utilities prop) — typically the same ThemeButton/LanguageButton pair used
in the app's own Topbar, so preference switches work even before sign-in.
