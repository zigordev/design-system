The centered card for login / invite-accept / any single-action auth
screen. Use inside `AuthShell`.

```jsx
<AuthShell utilities={<><ThemeButton /><LanguageButton /></>}>
  <AuthCard
    logo={<Logo initials="K" wordmark="Kini" shape="circle" href="/" linkComponent={Link} />}
    eyebrow="Manage your group pools"
    title="Welcome to Kini"
    description="Sign in to manage pools, review results, and keep every match assignment in one place."
    error={!googleAuthEnabled ? 'Google Sign-In is unavailable. Check server configuration.' : null}
    footer="Access is limited to approved members."
  >
    <Button variant="primary" size="lg" style={{ width: '100%' }} onClick={signIn}>
      <GoogleMark /> Sign in with Google
    </Button>
  </AuthCard>
</AuthShell>
```

`children` is the action area — almost always a single full-width `Button`
(`variant="primary" size="lg"`, `style={{ width: '100%' }}`, with a
`GoogleMark` for Google sign-in). `error` renders as an inline alert banner
using the same danger tokens as `Toast`'s danger variant — pass it
conditionally rather than always rendering an empty one.

Don't reach for `Card` (data-display) here — that component is a
header/body/footer content card with different padding and border
conventions, built for dashboards, not a single centered CTA.
