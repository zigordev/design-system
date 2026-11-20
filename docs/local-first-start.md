# Local first start

How to work on the design system on a laptop, from nothing. It runs no services, so it needs nothing from platform.

## Prerequisites

- git, with the zigordev identity set in this repo
- [mise](https://mise.jdx.dev), activated in your shell, which installs and selects the Node, pnpm and gitleaks versions in `mise.toml`
- the GitHub CLI, signed in as zigordev, with the `read:packages` scope

## Activate mise

`mise install` only downloads the versions. Activate mise in your shell once, so that inside this repo they come first on your `PATH`, ahead of any Node from nvm or pnpm from Homebrew:

```bash
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
```

Use `mise activate bash` in `~/.bashrc` for bash. Open a new terminal afterwards: in the repo, `node --version` prints v26 and `pnpm --version` prints 12.21.0. To skip activation, prefix each command with `mise exec --`, such as `mise exec -- pnpm install`.

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

`pnpm install` also installs the git hooks: Biome and gitleaks before each commit, commitlint on each message, and before each push the full check and then the browser tests; the push hook also refuses a push to `main`. CI does not run the browser tests for now, so the pre-push hook is what holds them. Work in a worktree cut from `origin/main` and run `pnpm install` there too.

## Run it

| Command                                       | Does                                                                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                                    | Builds the tokens and the CSS, then starts Storybook at <http://localhost:6006>, with its MCP server at `/mcp`         |
| `pnpm run check`                              | Runs what CI runs: lint, build, typecheck and the unit tests                                                           |
| `pnpm test`                                   | The unit tests of tokens, css, icons and email                                                                         |
| `pnpm run test:browsers`                      | The story tests in every theme in Chromium with coverage, the plain HTML pages, then the stories in Firefox and WebKit |
| `pnpm run format`                             | Formats code, JSON, CSS and Markdown with Biome                                                                        |
| `pnpm --filter @zigordev/tokens run generate` | Regenerates the colour scales after a seed changes in `packages/tokens/src/palette/seeds.ts`                           |

The browser tests need the packages built first, which `pnpm run check` does. CI also lints the Markdown and checks its links:

```bash
npx --yes markdownlint-cli2 "**/*.md"
```

## Change a product's colours

1. Change its seed, or add a hand override for one step, in `packages/tokens/src/palette/seeds.ts`.
2. Run `pnpm --filter @zigordev/tokens run generate`. It rewrites the files in `packages/tokens/src/tokens/generated/`, which are never edited by hand.
3. Open Foundations, Colour in Storybook to see the scales and their contrast against the page in each product and mode.
4. Run `pnpm test`. The theme tests fail if any text, border or focus pairing drops below WCAG 2.2 AA, or below 7:1 for text in high contrast.

## When something fails

- **`pnpm` prints `Failed to switch pnpm to v12.21.0`, or `node --version` is not v26:** mise is not active in this shell, so another Node or pnpm comes first on `PATH`. Activate it as [Activate mise](#activate-mise) says and open a new terminal, or prefix the command with `mise exec --`.
