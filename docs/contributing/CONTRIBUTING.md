# Contributing to WallRun

Thanks for your interest in contributing to **WallRun** — a repo that treats digital signage like what it really is: software bolted to a wall.

Whether you’re fixing a typo, tightening a layout, or adding a signage primitive, we appreciate it. (The screens won’t judge your code. But `pnpm verify` might.)

## Code of Conduct

Be kind, be constructive, and assume good intent.

Please read and follow our [Code of Conduct](../../CODE_OF_CONDUCT.md).

## Getting Oriented

- Docs index: [docs/README.md](../README.md)
- Component library: [libs/shadcnui-signage/README.md](../../libs/shadcnui-signage/README.md)
- Open issues: [github.com/CambridgeMonorail/WallRun/issues](https://github.com/CambridgeMonorail/WallRun/issues)

## Issues

If you’re opening an issue:

- Search first to avoid duplicates
- For bugs: include clear repro steps + expected vs actual behavior
- For features: include the signage use-case and constraints (1080p/4K, distance readability, always-on)

## Pull Requests

- Work in a fork and open a PR (direct pushes to `main` should be blocked by branch protection)
- Keep PRs focused and reviewable
- Link related issues (e.g. `Closes #123`)
- Run verification before opening the PR: `pnpm verify`
- Include evidence for UI changes (screenshots/recording)

## Local Setup

1. Fork the repo and clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/WallRun.git
   cd WallRun
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the demo client:

   ```bash
   pnpm serve:client
   ```

4. Run Storybook:

   ```bash
   pnpm serve:storybook
   ```

5. Verify everything:

   ```bash
   pnpm verify
   ```

## Coding Conventions

- TypeScript strict mode (avoid `any`; prefer `unknown` + type guards)
- Functional React components only
- Accessibility baseline: keyboard support, semantic HTML, appropriate ARIA
- Tests required for new features and bug fixes

Canonical references:

- [.github/copilot-instructions.md](../../.github/copilot-instructions.md)
- [AGENTS.md](../../AGENTS.md)

## Commit Messages

We use Conventional Commits:

```text
<type>(<scope>): <description>
```

Examples:

```text
feat(shadcnui-signage): add restaurant menu layout
fix(client): correct screen frame aspect ratio
docs(guides): clarify signage content workflow
```

## Copilot Agent Plugin

WallRun packages a Copilot agent plugin at `copilot-plugins/wallrun-signage/`. If you modify source skills (`skills/`) or agents (`.github/agents/`), regenerate the plugin before committing:

```bash
pnpm plugin:copilot:build   # Regenerate the plugin
pnpm plugin:copilot:check   # Validate structure and scan for secrets
git add copilot-plugins/
```

See the [Plugin Installation Guide](../guides/copilot-plugin-install.md) for consumer-facing docs and the [Plugin README](../../copilot-plugins/wallrun-signage/README.md) for the full reference.
Thanks again — every improvement helps make signage less “PowerPoint in disguise” and more “reliable system”.
