# Issue 98 Discoverability Follow-Up

## Goal

Make the already-implemented Issue 98 components discoverable from the demo documentation site, not just Storybook and package exports.

## Context

- `OneMessageFrame`, `NoContentFallback`, `ContentExpiredWarning`, `LastUpdatedStamp`, and `ReconnectingState` already exist in `libs/shadcnui-signage`.
- They are exported publicly and have Storybook stories and registry entries.
- They are not currently surfaced through browseable component doc pages or the client component index.

## Tasks

1. Add client doc pages for the missing components.
2. Wire the pages into `apps/client` route configuration.
3. Add the components to the component index catalog.
4. Add focused doc-page tests for the new pages.

## Files

- `apps/client/src/app/constants/navigationConfig.ts`
- `apps/client/src/app/pages/components/ComponentIndex.tsx`
- `apps/client/src/app/pages/components/blocks/OneMessageFrameDoc.tsx`
- `apps/client/src/app/pages/components/behaviour/NoContentFallbackDoc.tsx`
- `apps/client/src/app/pages/components/behaviour/ContentExpiredWarningDoc.tsx`
- `apps/client/src/app/pages/components/behaviour/LastUpdatedStampDoc.tsx`
- `apps/client/src/app/pages/components/behaviour/ReconnectingStateDoc.tsx`
- matching `*.test.tsx` files for the new doc pages

## Validation

- Run focused client tests for the new doc pages.
- Run client type checking or targeted error checks if needed.
