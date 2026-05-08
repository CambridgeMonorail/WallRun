# Shadcn Registry Item Endpoints Plan

## Goal

Make WallRun's published shadcn registry installable by exposing per-item JSON endpoints and updating docs to stop treating the collection registry as a single installable item.

## Context

- `apps/client/public/registry/registry.json` is a collection document with an `items` array.
- Current install examples use `npx shadcn add <registry.json> <component-name>`, which makes the CLI parse the collection as a registry item and fail.
- The published `registry/` folder does not currently include per-item `*.json` files.

## Tasks

1. Add a small sync script that derives `apps/client/public/registry/<name>.json` from the collection file.
2. Generate the current item JSON artifacts in `apps/client/public/registry/`.
3. Update shared install-command helpers and docs to use item endpoints or a registry template instead of the collection URL.
4. Update maintainer guidance so the generated item files stay in sync with `registry.json`.

## Validation

- Run the sync script and confirm per-item JSON files exist in `apps/client/public/registry/`.
- Run focused tests for the install-command rewrite logic.
- Run a narrow typecheck or lint pass for the touched app files.

## Expected Result

Users can install a WallRun component with a valid shadcn registry item URL, and maintainers have a repeatable way to keep the published registry artifacts aligned.