# 0010. Linked releases to GitHub Packages

- Status: accepted
- Date: 2026-11-19
- Supersedes: none

## Context

`@zigordev/css` bundles a specific version of the tokens, and `@zigordev/react` expects the classes of a specific `@zigordev/css`. Versions that drift apart would leave apps matching them by hand. Toolkit publishes its packages to GitHub Packages through release-please (toolkit ADR 0026), and its shared workflows run CI and releases for every repo.

## Decision

- release-please runs in manifest mode with the `linked-versions` plugin, so the three packages always share one version. The first release is 0.1.0, and 1.0.0 follows once the first inventory is complete.
- Packages are public on GitHub Packages and `UNLICENSED`, like toolkit's.
- CI and releases call toolkit's shared workflows, pinned to the commit of `workflows-v0.1.0`.

## Consequences

- An app upgrades the design system as one version, through one Renovate pull request.
- A change in one package releases all three.
- The workflow pins are bumped by hand until Renovate learns toolkit's workflow tags.

## Alternatives considered

- Independent versions per package, as toolkit does: precise, and apps would match versions themselves.
- One package with subpath exports: one version by construction, and a React dependency for apps that only want the CSS.
