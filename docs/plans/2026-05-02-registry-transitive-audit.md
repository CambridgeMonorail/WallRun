# Registry Transitive Audit Plan

## Goal
Audit `apps/client/public/registry/registry.json` for missing transitive local files and missing non-workspace dependency declarations, then patch the registry metadata so published shadcn registry installs are coherent.

## Context
Issue #73 tracks follow-up hardening after the initial registry expansion work. Several registry entries may reference source files that import local utilities, local types, other signage components, or external packages without declaring them in the registry item metadata.

## Approach
1. Inspect each registry item and trace its direct imports.
2. Identify missing local transitive files that should be included in `files`.
3. Identify missing non-workspace package dependencies that should be included in `dependencies`.
4. Patch `apps/client/public/registry/registry.json` with the minimum needed changes.
5. Validate the resulting registry for obvious consistency.

## Files Likely Touched
- `apps/client/public/registry/registry.json`
- `docs/plans/2026-05-02-registry-transitive-audit.md`

## Validation
- Re-read affected registry entries after patching.
- Cross-check patched items against their current imports.
- Run focused workspace checks if available for JSON or affected surfaces.

## Expected Result
Registry entries declare the local transitive files and external dependencies they actually need, reducing the chance that shadcn registry installs fail or arrive incomplete.
