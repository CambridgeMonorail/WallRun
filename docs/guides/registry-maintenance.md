# Component Registry Maintenance Guide

## Overview

WallRun publishes a shadcn-compatible registry from the checked-in file `apps/client/public/registry/registry.json`.

- Public registry URL: `https://wallrun.dev/registry/registry.json`
- Source of truth in the repo: `apps/client/public/registry/registry.json`
- Generated item URLs: `https://wallrun.dev/registry/<item-name>.json`
- Source files referenced by registry items: `libs/shadcnui-signage/src/lib/**`

This guide is for maintainers updating the published registry, not end users installing from it.

## How WallRun's Registry Works

WallRun does not use `shadcn build`, but it does generate checked-in per-item registry artifacts from the static root index.

This is an important distinction from the upstream registry template docs.

- Upstream authoring guidance such as `registry/[STYLE]/[NAME]` source folders and `@/registry/...` imports describes how to structure a source registry project before running `shadcn build`.
- WallRun does not currently author its registry that way. Instead, it maintains a checked-in `registry.json` index and generates the published item payloads from that file.
- For WallRun maintainers, the compatibility contract that matters is the published JSON shape served from `wallrun.dev`, not the internal folder layout used by the upstream template project.

That means the maintainer workflow today is:

1. edit or add the source component files in `libs/shadcnui-signage`
2. update the matching entry in `apps/client/public/registry/registry.json`
3. run `pnpm sync:registry` to regenerate `apps/client/public/registry/*.json`
4. verify the public registry still describes the component accurately
5. ship the change through the normal repo workflow so the static client deploy publishes the updated JSON

The root `registry.json` remains the entry point for discovery, `search`/`list`, and namespaced resolution. Direct installs should use generated item files such as `https://wallrun.dev/registry/menu-board.json`, and bulk installs should use the generated `https://wallrun.dev/registry/all.json` meta item.

Each registry item points to raw GitHub file URLs for the files that the shadcn CLI should copy into downstream projects. The public registry index and generated item files are served from `wallrun.dev`, but the `files[].path` entries currently resolve to raw GitHub content on `main`.

## Maintainer Entry Points

When working on the registry, treat these files as the main control surfaces:

- `apps/client/public/registry/registry.json` - published registry definition
- `apps/client/public/registry/*.json` - generated item entry points committed with the app
- `apps/client/public/registry/README.md` - consumer-facing install notes
- `libs/shadcnui-signage/src/index.ts` - public export surface to keep in sync with intended registry coverage
- `libs/shadcnui-signage/src/lib/**` - actual source files referenced by registry items

## Registry Entry Structure

Each item in `registry.json` should be reviewed as a complete installation contract.

- `name` - kebab-case install identifier used by the shadcn CLI
- `type` - `registry:component` for installable components
- `title` - human-readable label for docs and registry consumers
- `description` - short summary of what the component actually does today
- `dependencies` - third-party npm packages required by the copied files
- `registryDependencies` - other registry items that must also be installed by the consumer
- `files` - every copied source file required for the component to work, including transitive local dependencies

## `dependencies` vs `registryDependencies`

These two fields are easy to blur together. Keep them separate.

### `dependencies`

Use `dependencies` for external packages imported by the copied files.

Examples:

- `lucide-react`
- `clsx`
- `tailwind-merge`

Do **not** list:

- `react`
- workspace packages such as `@wallrun/shadcnui` or `@wallrun/shadcnui-signage`
- relative imports that are already covered by `files`

### `registryDependencies`

Use `registryDependencies` when one registry item depends on another registry item being installed alongside it.

Examples:

- a future block that expects `signage-container` to be installed separately
- a future composite item that intentionally layers on top of another published registry component

Current state:

- the checked-in registry already includes `registryDependencies` on every item
- all current values are empty arrays
- this is still worth documenting because the field is part of the contract and should be used intentionally when cross-item installs appear

## Update Workflow

### 1. Confirm the source-of-truth component files

Start from the real implementation under `libs/shadcnui-signage/src/lib/**`, not from Storybook snippets or copied docs examples.

Check whether the component is meant to be part of the published registry at all. The registry does not have to mirror every internal source file automatically.

### 2. Trace the full file graph

For the component you are publishing:

1. list the main component file
2. follow every relative import (`./` and `../`)
3. include any hooks, utility files, and types required by those imports
4. continue until there are no unaccounted-for local imports left

Missing transitive files are the most common way to break installs.

### 3. Build the `dependencies` list from imports

Open each file that will be copied and inspect its import statements.

Add external packages to `dependencies` only when they are actually imported by those copied files.

### 4. Decide whether `registryDependencies` is needed

Ask one direct question:

Does this item require another published registry item to be installed as a separate unit?

- if yes, list that other registry item in `registryDependencies`
- if no, keep `registryDependencies` empty and include any required local source files directly in `files`

### 5. Write the description from actual behavior

Descriptions should match the implementation that ships today.

Do not:

- copy a nearby description because it sounds close enough
- describe aspirational behavior that has not landed
- imply effects or options that only exist in Storybook prose

### 6. Keep file types accurate

- use `registry:component` for installable component source files
- use `registry:lib` for utilities, hooks, helpers, and types

### 7. Validate through the client build

Because the registry is shipped from the client app's public assets, use the client build as the baseline validation step after editing registry metadata:

```bash
pnpm build:client
```

If you need to test installation behavior manually, build or serve the client app and point the shadcn CLI at the local registry URL.

## Hosting Model And Deployment Implications

WallRun's current registry model has a few practical consequences for maintainers:

- `registry.json` is static content checked into the repo
- the deployed registry updates when the client site is rebuilt and redeployed
- the copied source files currently come from raw GitHub URLs on `main`, so merged source changes matter for real installs
- there is no automatic generator keeping registry entries in sync with the library source tree

Because of that, registry maintenance is partly editorial. Adding a component to `libs/shadcnui-signage` does **not** publish it automatically.

## Current Constraints And Caveats

- The registry is manually curated. Drift between source files and `registry.json` is possible unless maintainers review both together.
- `registryDependencies` is available but unused today. That is intentional until a component truly depends on another registry item as a separate install unit.
- The registry should avoid relying on workspace-only imports. If a component cannot be installed cleanly without repo-local package aliases, it is not yet registry-safe.
- Raw GitHub file paths make the registry simple to host, but they also mean the published install experience depends on the state of the referenced branch.

## Review Checklist

Before merging a registry update, confirm all of the following:

- [ ] `README.md` and any consumer-facing docs still point people to the right public registry surface
- [ ] the changed component is intended to be published, not just present internally
- [ ] every required local file is present in `files`
- [ ] every external package import is accounted for in `dependencies`
- [ ] `registryDependencies` is either intentionally empty or intentionally populated
- [ ] the description matches current behavior, not planned behavior
- [ ] file types are correct for every entry in `files`
- [ ] `pnpm build:client` still succeeds after the edit

## Canonical Install Format

When you update examples in docs, prefer the canonical public registry URL:

```bash
npx shadcn@latest add https://wallrun.dev/registry/component-name.json
```

Use the root index only for discovery and namespaced resolution. For a bulk install example, use the generated meta item:

```bash
npx shadcn@latest add https://wallrun.dev/registry/all.json
```

That keeps documentation aligned with the deployed registry entry point rather than the older GitHub Pages host while only showing valid direct item installs.

## Maintenance Schedule

- **After adding component:** Verify registry entry before PR
- **Monthly:** Review recent entries for accuracy
- **Quarterly:** Full registry audit with test installations

## Related Documentation

- [shadcn CLI Documentation](https://ui.shadcn.com/docs/cli)
- [Component Registry Protocol](https://ui.shadcn.com/docs/components-json)
- [Repository Basics](../../.github/instructions/00-repo-basics.instructions.md)
