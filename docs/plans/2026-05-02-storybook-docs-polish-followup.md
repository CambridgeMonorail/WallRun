# Storybook Docs Polish Follow-Up

## Goal

Bring the remaining weak Storybook documentation surfaces up to the same standard as the improved signage visuals by:

- adding hand-authored prose and source examples for `ScheduleGate`
- adding hand-authored prose and source examples for `AutoPagingList`
- rewriting `Best Practices` around the same screen-composition guidance used elsewhere
- validating the docs render correctly and committing the slice cleanly

## Context

The previous polish pass fixed the introduction flow and improved `ContentRotator`, `Countdown`, and `OfflineFallback` documentation. The remaining gap is consistency: `ScheduleGate` and `AutoPagingList` still rely on generic autodocs, and `Best Practices` still reads like a broad signage checklist instead of guidance that matches how the Storybook now teaches the library.

## Plan

1. Update `ScheduleGate.stories.tsx`
   - Add component-level docs description
   - Add story-level docs descriptions
   - Replace generated source with concise authored examples that show real use

2. Update `AutoPagingList.stories.tsx`
   - Add component-level docs description
   - Add story-level docs descriptions
   - Replace generated source with concise authored examples that explain paging behaviour clearly

3. Rewrite `libs/storybook-host/src/BestPractices.mdx`
   - Emphasise stable shell first, behaviour second
   - Focus on deterministic layout, content density, operational states, and validation
   - Remove generic or website-style advice that does not fit the current signage docs flow

4. Validate
   - Run editor diagnostics on changed files
   - Run Storybook index generation
   - Recheck the updated docs pages in the browser

5. Publish the slice
   - Stage only the docs-polish files
   - Commit with a conventional `docs(...)` message

## Files

- `libs/shadcnui-signage/src/lib/behaviour/ScheduleGate.stories.tsx`
- `libs/shadcnui-signage/src/lib/behaviour/AutoPagingList.stories.tsx`
- `libs/storybook-host/src/BestPractices.mdx`
- `docs/plans/2026-05-02-storybook-docs-polish-followup.md`

## Validation

- `STORYBOOK_DISABLE_TELEMETRY=true pnpm exec storybook index -c libs/storybook-host/.storybook --output-file tmp/storybook-index.json`
- Browser checks for:
  - `/docs/signage-behaviour-schedulegate--documentation`
  - `/docs/signage-behaviour-autopaginglist--documentation`
  - `/docs/best-practices--documentation`

## Acceptance Criteria

- `ScheduleGate` docs explain why and where to gate content, not just which props exist
- `AutoPagingList` docs explain density and paging behaviour in signage terms
- `Best Practices` aligns with the current Storybook narrative and composition model
- Storybook indexes successfully and updated docs pages render with the authored content
