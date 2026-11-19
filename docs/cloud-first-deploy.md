# Cloud first deploy

The design system has no server. Its production is the packages on GitHub Packages, which apps install and Renovate keeps current. The Storybook site is not published: it runs locally with `pnpm dev` ([ADR 0011](adr/0011-storybook-stays-local.md)).

## How a release happens

1. A `feat`, `fix`, `perf` or `revert` pull request that touches a package merges to `main`. Squash merging makes its title the commit release-please reads.
2. The Release workflow, which calls toolkit's shared `release-please.yml`, opens or updates one release pull request, titled `chore: release main`. The four packages are linked, so they always move to the same version, and each gets its `CHANGELOG.md`.
3. release-please opens that pull request with the workflow's token, so GitHub holds its checks. Open it, choose **Approve and run workflows**, wait for the checks to pass, and merge.
4. Merging tags each package as `tokens-v<version>`, `css-v<version>`, `react-v<version>` and `icons-v<version>`, creates the GitHub releases, and the Publish job, toolkit's shared `publish-npm.yml`, builds and publishes them to GitHub Packages with the workflow's token.

Nothing is released without that merge. The first release is 0.1.0. Before 1.0.0 a breaking change bumps the minor version; 1.0.0 follows once the first inventory is complete.

## Operating it

- Nothing runs, so nothing is monitored. CI on `main` has to stay green.
- A published version never changes. To undo a release, revert the change and release again, or fix forward.
- If publishing fails, re-run the Publish job: the tags already exist, so it publishes the same versions.
- `CHANGELOG.md`, `.release-please-manifest.json` and the files in `packages/tokens/src/tokens/generated/` are generated. Nobody edits them by hand.
- Every pull request runs Dependency Review, which fails only when the pull request adds a dependency with a known vulnerability. It reads the dependency graph that Dependabot alerts turn on. Dependabot's own fix pull requests stay off, because Renovate opens the updates.
- The Security workflow runs every Monday at 05:23 UTC, and on demand, with zizmor's online audits of the workflows. Its findings, and CodeQL's from its default setup, appear in the repository's Security tab.
- The pins of toolkit's shared workflows are commit SHAs with the release tag as a comment. Renovate proposes a new pin when toolkit releases its workflows. A release that adds a check also needs that check added to the ruleset.
