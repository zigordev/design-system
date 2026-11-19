# 0011. Storybook stays local

- Status: accepted
- Date: 2026-11-19
- Supersedes: none

## Context

The foundation rebuild plan put the Storybook site on GitHub Pages. For a public repository on GitHub Free, a Pages site is public: anyone with the link can open it, and search engines can index it. A private Pages site needs a paid plan. The repository and the packages are already public (toolkit ADRs 0022 and 0026), so publishing would expose nothing new, but it would put the design system on the open web as a site.

## Decision

The Storybook site is not published. It runs locally with `pnpm dev` at <http://localhost:6006>. Its static build still runs in `pnpm run check`, so a site that no longer builds fails CI.

## Consequences

- Seeing the design system means running Storybook locally.
- The MCP server stays local too, available while `pnpm dev` runs.
- Hosting can be reconsidered with a new record, for example a host with access control such as Chromatic, priced against the free-first rule (toolkit ADR 0021).

## Alternatives considered

- GitHub Pages: free, and public.
- A paid host with access control: private, with a monthly cost.
