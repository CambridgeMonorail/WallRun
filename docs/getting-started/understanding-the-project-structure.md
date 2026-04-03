# Understanding the Project Structure

This document provides an overview of the project structure for **WallRun** (TSA) monorepo.

The repo is an **Nx + pnpm** workspace designed as a working notebook for building digital signage UI and tooling (with a BrightSign emphasis). Nx provides project boundaries and “affected” workflows so builds/tests stay fast as the repo grows.

## Project Structure

The project is organized into several key directories:

### `apps`

The `apps` directory contains the main applications within the monorepo. Each application is organized into its own subdirectory. For example:

- `client`: Reference UI (docs, demos, and experiments).
- `client-e2e`: Playwright E2E tests for critical flows in `apps/client`.

### `libs`

The `libs` directory contains reusable libraries that can be shared across multiple applications. Each library is organized into its own subdirectory. For example:

- `shadcnui`: Base shadcn/ui component primitives organized by category.
- `shadcnui-blocks`: Higher-level composed components built on `shadcnui`.
- `shadcnui-signage`: Signage-oriented primitives/layouts/blocks (fixed-aspect layouts, deterministic rendering, distance readability).
- `common-tailwind`: Shared Tailwind v4 tokens, theme, and configuration.
- `shell`: Application shell layouts and navigation components.
- `landing`: Landing page sections and marketing-ish blocks (where relevant).

### `tools`

The `tools` directory contains internal scripts and utilities used for maintaining the workspace.

### `docs`

The `docs` directory is the repository’s living documentation: rationale, guides, maintenance notes, and plans/specs.

### `.github`

The `.github` directory contains AI tooling configuration (Copilot instructions, agents, prompts, and skills) and workflow guidance.

### Key Files

- `nx.json`: Nx configuration (cache, defaults, plugins).
- `pnpm-workspace.yaml`: pnpm workspace package boundaries.
- `package.json`: Workspace scripts and dependencies.
- `tsconfig.base.json`: Base TypeScript config shared across apps/libs.
- `vitest.workspace.ts`: Vitest workspace config.
- `apps/*/project.json` and `libs/*/project.json`: Nx project configuration lives next to each project.

## Example Directory Structure

```text
apps/
  client/
    src/
    project.json
  client-e2e/
    src/
    project.json
libs/
  shadcnui/
    src/
    project.json
  shadcnui-blocks/
    src/
    project.json
  shadcnui-signage/
    src/
    project.json
  common-tailwind/
  shell/
  landing/
docs/
.github/
tools/
nx.json
package.json
pnpm-workspace.yaml
tsconfig.base.json
vitest.workspace.ts
```

## Conclusion

WallRun is organized as an Nx monorepo so apps can consume reusable libraries with clear boundaries.

If you’re new here, a good starting path is:

1. Read the intent: `docs/getting-started/statement-of-intent.md`
2. Run Storybook: `pnpm run serve:storybook`
3. Browse signage components: `libs/shadcnui-signage/`
