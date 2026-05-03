# WallRun Library

WallRun publishes two related documentation surfaces for UI consumers:

- `/library` is the human-facing overview of the component libraries, registry workflow, and Storybook entry points.
- `/components` is the human-facing reference index for the installable signage catalogue.

This markdown file is the machine-readable payload for the library overview.

## What WallRun Ships

- `@wallrun/shadcnui`: WallRun's copy of shadcn/ui building-block primitives for general web UI.
- `@wallrun/shadcnui-signage`: signage-oriented components for fixed-aspect layouts, distance readability, and always-on displays.
- Storybook docs: interactive composition and usage examples hosted at `https://cambridgemonorail.github.io/WallRun/storybook/`.
- Published registry: installable signage components at `https://cambridgemonorail.github.io/WallRun/registry/registry.json`.

## When To Use Each Surface

- Use `library.md` when you need the high-level map: what the libraries are, how they relate, and where installation and Storybook fit.
- Use `components.md` when you need the installable component catalogue, install commands, source paths, and package dependencies.
- Use `ai-context.md` when you need a fuller machine-readable project summary including deployment, tooling, skills, and hosting notes.

## Registry Workflow

WallRun signage components are distributed through the shadcn registry protocol.

- Install one component:

```bash
npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json clock
```

- Install several components:

```bash
npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json metric-card event-card schedule-gate
```

Registry installs copy component code into the consuming application. They are not version-locked runtime packages.

## Primary Links

- Human library route: `https://wallrun.dev/library`
- Human components route: `https://wallrun.dev/components`
- Machine component catalogue: `https://wallrun.dev/components.md`
- Project context: `https://wallrun.dev/ai-context.md`
- Registry JSON: `https://cambridgemonorail.github.io/WallRun/registry/registry.json`
- Storybook docs: `https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/introduction--documentation`

## Hosting Note

The main `wallrun.dev` site is currently deployed as a static SPA on GitHub Pages. Human browser navigation can recover deep routes such as `/library` and `/components` through the SPA redirect workaround, but fetch-based tools should prefer static payloads such as `library.md`, `components.md`, `ai-context.md`, and `llms.txt` because those return `HTTP 200` directly.
