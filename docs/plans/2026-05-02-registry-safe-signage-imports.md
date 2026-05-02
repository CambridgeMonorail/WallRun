# Registry-Safe Signage Imports Plan

## Goal

Start issue #78 by removing the `@wallrun/shadcnui` alias from a low-risk set of registry-facing signage primitives and replacing it with local registry-safe imports.

## Context

The merged registry audit fixed missing transitive files, but many public registry items still depend on the workspace-local `@wallrun/shadcnui` package. That keeps installs tied to monorepo assumptions.

## First Slice

Use a local `cn` utility in `libs/shadcnui-signage/src/lib/utils/` and migrate the lowest-risk primitives that only need `cn` plus local or npm imports:

- `SignagePanel`
- `InfoList`
- `MeetingRow`
- `FloorBadge`
- `LocationIndicator`
- `DirectoryCard`

## Validation

- Run the existing primitive tests covering these components.
- Update matching registry entries to include the new local utility file once the import migration is proven.

## Expected Result

A small but real subset of public signage components no longer depends on `@wallrun/shadcnui`, establishing the migration pattern for the rest of issue #78.
