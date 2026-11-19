# 0001. Rebuild in a new repository

- Status: accepted
- Date: 2026-11-19
- Supersedes: none

## Context

The foundation rebuild plan suggested rebuilding the design system in place in `zigordev/design-system`. On 2026-11-19 the owner decided that the legacy design system's current users do not matter: the rebuilt apps are the only consumers that count. An in-place rebuild would have carried the legacy tags, changelog, Dependabot configuration, workflows and required check names into the new system.

## Decision

The legacy repository is renamed `zigordev/design-system-legacy` and archived, and `zigordev/design-system` is a new public repository with toolkit's settings: squash merging only, branches deleted after merge, a read-only workflow token, GitHub Actions allowed to open pull requests, and secret scanning with push protection.

## Consequences

- The new repository starts with a clean history, clean settings and a release flow that begins at 0.1.0.
- GitHub no longer redirects the old name to the legacy repository, so a frozen app that installs `github:zigordev/design-system#v0.1.46` would need to point at `design-system-legacy` to build again.
- The legacy repository stays readable, archived, until the owner deletes it.

## Alternatives considered

- Rebuild in place: keeps the name and the redirects, and carries everything legacy along.
- Delete the legacy repository now: ends it for good, and loses the reference while the rebuild is under way.
