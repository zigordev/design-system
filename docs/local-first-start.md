# Local first start

How to work on the design system on a laptop, from nothing. It runs no services, so it needs nothing from platform.

## Prerequisites

- git, with the zigordev identity set in this repo
- [mise](https://mise.jdx.dev), which installs the Node, pnpm and gitleaks versions in `mise.toml`
- the GitHub CLI, signed in as zigordev, with the `read:packages` scope

## Access to GitHub Packages

The toolkit presets come from GitHub Packages, which asks for a token even for public packages. Give the GitHub CLI's token the scope once, approving in the browser while it is signed in as zigordev:

```bash
gh auth refresh -h github.com -s read:packages
```

Add this line to `~/.npmrc` once. It names an environment variable, so the token itself is never written to a file:

```text
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Before installing, put the token in that variable:

```bash
export NODE_AUTH_TOKEN="$(gh auth token -u zigordev)"
```

The repo's own `.npmrc` only maps the `@zigordev` scope to GitHub Packages.

## Clone and install

```bash
git clone git@github.com:zigordev/design-system.git ~/Desktop/Personal/zigordev/design-system
cd ~/Desktop/Personal/zigordev/design-system
git config user.name zigordev
git config user.email zigordev@gmail.com
mise install
pnpm install
pnpm --filter design-system-docs exec playwright install chromium firefox webkit
```

`pnpm install` also installs the git hooks: Biome and gitleaks before each commit, commitlint on each message, and the full check before each push, which also refuses a push to `main`. Work in a worktree cut from `origin/main` and run `pnpm install` there too.

## Run it

| Command                                       | Does                                                                                                           |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                                    | Builds the tokens and the CSS, then starts Storybook at <http://localhost:6006>, with its MCP server at `/mcp` |
| `pnpm run check`                              | Runs what CI runs: lint, build, typecheck and both test runs                                                   |
| `pnpm test`                                   | Unit tests, story tests in every theme in Chromium with coverage, then the stories in Firefox and WebKit       |
| `pnpm run format`                             | Formats code, JSON, CSS and Markdown with Biome                                                                |
| `pnpm --filter @zigordev/tokens run generate` | Regenerates the colour scales after a seed changes in `packages/tokens/src/palette/seeds.ts`                   |

The tests need the packages built first, which `pnpm run check` does. CI also lints the Markdown and checks its links:

```bash
npx --yes markdownlint-cli2 "**/*.md"
```

## Change the brand colours

1. Change a seed, or add a hand override for one step, in `packages/tokens/src/palette/seeds.ts`. ADR 0014 lists the accents already compared, with their seeds.
2. Run `pnpm --filter @zigordev/tokens run generate`. It rewrites the files in `packages/tokens/src/tokens/generated/`, which are never edited by hand.
3. Run `pnpm --filter @zigordev/email run generate`, so emails follow the new colours.
4. Open Foundations, Colour in Storybook to see the scales and their contrast against the page in each mode.
5. Run `pnpm test`. The theme tests fail if any text, border, focus or chart pairing drops below WCAG 2.2 AA.
