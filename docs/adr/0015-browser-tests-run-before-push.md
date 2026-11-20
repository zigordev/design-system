# 0015. Browser tests run before push, not in CI, for now

- Status: accepted
- Date: 2026-11-20
- Supersedes: the "fails CI" consequence of 0009

## Context

Record 0009 runs every story as a test in a real browser, so a component that breaks fails CI. In CI that needs Playwright to download Chromium, Firefox and WebKit with their system packages on every run. On 2026-11-20 that step hung for the job's whole 30-minute limit and the run was cancelled before any test ran, while the same code had passed in under four minutes an hour earlier. The owner asked to take the job out of the pipeline for now.

## Decision

- CI no longer installs Playwright's browsers. `pnpm run check`, which CI runs, does lint, build, typecheck and the unit tests of tokens, css, icons and email.
- `pnpm run test:browsers` runs everything that needs a browser: the stories in every theme in Chromium with the 90% coverage gate, the plain HTML pages, and the stories in Firefox and WebKit.
- The pre-push hook runs `pnpm run test:browsers` after `pnpm run check`, so the browser tests still gate every push from a machine with the hooks installed.

## Consequences

- CI is fast and no longer depends on Playwright's downloads.
- CI no longer enforces the component tests, axe or coverage. A push made without the hooks, a change from GitHub's web editor, and every Renovate or release-please pull request reach review without them, so a dependency update such as Base UI or Storybook is browser-tested only when someone runs `pnpm run test:browsers` on its branch.
- The required check keeps its name, Node / Check, so the ruleset does not change.
- Bringing the browser tests back to CI means caching the browsers or installing them from Playwright's container image, then passing `playwright-browsers` to the shared workflow again.

## Alternatives considered

- Keep the browsers in CI and re-run when the install hangs. Rejected for now by the owner after a 30-minute cancelled run.
- Install only Chromium in CI. Smaller and faster, but still depends on the same download and keeps the job slow.
- Lower the coverage scope so CI enforces it without stories. Rejected: the threshold stays as it is and runs with the browser tests.
