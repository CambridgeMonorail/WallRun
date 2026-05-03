# Client Component Docs Parity Plan

## Goal

Bring the client component docs surface into parity with the current `@wallrun/shadcnui-signage` export surface.

## Initial Hypothesis

The parity gap exists because newer signage exports were added to the library and Storybook, but the client docs only updated the older component index and route inventory.

- the missing components are exported from `libs/shadcnui-signage/src/index.ts`
- the client component index still lists the older inventory
- no client doc pages currently exist for the newer exported components

## Cheap Discriminating Checks

- confirm whether missing components already have client `*Doc.tsx` pages
- confirm whether `navigationConfig.ts` already includes paths and routes for those components
- confirm whether the exported library inventory still contains the missing components from issue `#72`

## Scope

- add client doc pages for the newer exported signage components
- add the missing routes and sidebar entries for those docs pages
- update the component index so the public client docs match the intended inventory

## Validation

- run editor/language-service validation on the touched client files
- run a narrow client validation command if the terminal returns usable output

## Expected Result

The client docs site, sidebar, and component index present the same component inventory that the library currently exports, eliminating the mismatch described in issue `#72`.
