# Issue 99 Arrival, Waiting, And Decision Boards

**Date:** 2026-05-11
**Author:** GitHub Copilot
**Status:** Complete

## Context

Issue 99 asks for the first reusable screen-role templates built on top of the newer signage primitives:

- `ArrivalBoard`
- `WaitingRoomBoard`
- `DecisionBoard`

This work should not start from raw page composition. The library now already includes the core surfaces that these templates should compose rather than replace:

- `OneMessageFrame` for one dominant message plus one next step
- `ActionStrip`, `QRCodeCallout`, `ShortUrlCallout`, and `QRHandoff` for CTA and phone continuation
- `SignageContainer` and `SignageHeader` for full-screen surfaces and consistent framing
- message clarity and fallback primitives for stale, empty, or reconnecting states where a board needs them later

The main planning risk is scope creep. These board templates should be opinionated starting points for common public-facing signage jobs, not a new parallel layout system. They should codify the recurring patterns already visible in hospitality, clinic, venue, and reception screens:

- one dominant statement
- one clear next action
- optional continuation on a phone
- optional service or reassurance note
- predictable landscape and portrait layouts where the layout meaningfully changes

## Goals

- Add reusable board templates for arrival, waiting, and decision-heavy signage contexts.
- Compose existing primitives instead of rebuilding message, CTA, and shell patterns from scratch.
- Keep the APIs signage-specific and high level enough that teams can start from a template instead of assembling every screen manually.
- Ship Storybook coverage, tests, exports, and registry entries for each public board template.
- Keep the first slice small enough to validate the template direction before implementing all three boards.

## Non-Goals

- Map-based wayfinding or route overlays from issue 91 and issue 97.
- Operational, schedule, or menu-style board templates from issue 100.
- Kiosk navigation or idle-reset flows from issue 103.
- Broad demo-page refactors under issue 64.
- New low-level primitives unless a concrete gap appears that cannot be solved cleanly with the current library.

## Proposed Scope

### Components

1. `ArrivalBoard`
   - Location: `libs/shadcnui-signage/src/lib/blocks/ArrivalBoard.tsx`
   - Responsibility: welcome or orient a viewer at the start of a journey, with one primary message and one next step.

2. `WaitingRoomBoard`
   - Location: `libs/shadcnui-signage/src/lib/blocks/WaitingRoomBoard.tsx`
   - Responsibility: reassure people in a dwell space, set expectations, and optionally surface lightweight service updates.

3. `DecisionBoard`
   - Location: `libs/shadcnui-signage/src/lib/blocks/DecisionBoard.tsx`
   - Responsibility: help a viewer choose between a small number of next actions without collapsing readability.

### Placement And Taxonomy

- These templates belong in `blocks`, not `layouts`, because they are composed signage jobs with opinionated contracts.
- They should build on `OneMessageFrame`, `QRHandoff`, `ActionStrip`, `SignageContainer`, and `SignageHeader` rather than duplicating those APIs.
- Each board should keep a narrow, template-level prop contract focused on the job of the screen rather than exposing every underlying layout choice.

### Storybook Coverage

- `ArrivalBoard`
  - reception or visitor check-in example
  - portrait-friendly arrival continuation example if layout meaningfully changes
- `WaitingRoomBoard`
  - clinic or service waiting area example
  - reassurance plus queue-or-update example
- `DecisionBoard`
  - retail/service choice example
  - venue or reception routing example

### Registry And Documentation Coverage

- Add public exports in `libs/shadcnui-signage/src/index.ts`
- Add registry entries to `apps/client/public/registry/registry.json`
- Run `pnpm sync:registry`
- Add client documentation pages if the issue lands multiple public components in one batch, or capture a follow-up discoverability task explicitly if client docs are deferred

## Approach

## Progress Update

### Completed Slices

1. `ArrivalBoard`

- Implemented in the signage library with focused tests, Storybook coverage, public exports, registry entry generation, and a client documentation page.
- Validated through focused checks and full `pnpm verify`.

2. `WaitingRoomBoard`

- Implemented in the signage library with a waiting-state contract built around one dominant instruction, a visible wait summary, lightweight updates, and an optional QR continuation.
- Shipped with focused tests, Storybook coverage, public exports, registry entry generation, and a client documentation page.
- Validated through focused checks and full `pnpm verify`.

3. `DecisionBoard`

- Implemented in the signage library with a decision-routing contract built around one dominant prompt, a tightly bounded choice set, optional service guidance, and an optional QR continuation.
- Shipped with focused tests, Storybook coverage, public exports, registry entry generation, and a client documentation page.
- Validated through focused checks and full `pnpm verify`.

### Issue Status

- All three issue-99 board slices are now implemented and validated.
- The remaining work is workflow-only: commit, push, and PR review.

### 1. Validate The Template Direction With One Board First

The first slice should implement `ArrivalBoard` only.

Why this first:

- it is the lowest-risk template because it maps directly onto `OneMessageFrame` plus the CTA surfaces already shipped
- it has the clearest success criteria: one dominant welcome/orientation message and one next step
- it avoids overlap with map-based wayfinding work
- it tests whether the library's current message and CTA primitives are sufficient without inventing new internals too early

`ArrivalBoard` validated the template direction well enough to proceed. `WaitingRoomBoard` confirmed that the same composition-first strategy can handle a calmer, expectation-setting screen without introducing a new layout system. `DecisionBoard` completed that check for small-choice routing screens, so the pattern now holds across all three intended screen roles.

### 2. Keep The Contract Opinionated

The first pass should prefer a narrower API like:

- eyebrow or context label
- title
- supporting text
- primary action or next step
- optional QR continuation or side callout
- optional service note
- optional shell variant or density only if needed

The board should not start as a generic slot soup. A template that exposes every region as freeform `ReactNode` is not doing enough product work.

### 3. Build Landscape First, Then Add Portrait Only If It Adds Meaning

Landscape should be the default validation path for `ArrivalBoard`.

Portrait support should be added in the first slice only if the layout meaningfully differs and still reads as an arrival screen rather than a squeezed desktop composition.

### 4. Use Real Public-Space Examples

Stories and examples should feel like actual signage:

- visitor reception check-in
- event arrival onboarding
- clinic arrivals or service desk guidance

Avoid generic marketing filler. The template should communicate a public-display job clearly.

## First Implementation Slice

### Slice 1: `ArrivalBoard`

Implement only the first reusable board template and validate that the board-template direction is sound.

#### In Scope

- `ArrivalBoard` component
- `ArrivalBoard` Storybook stories
- `ArrivalBoard` focused tests
- public export from `libs/shadcnui-signage/src/index.ts`
- registry entry generation for `ArrivalBoard`
- one lightweight validation surface, either a client doc page or a focused example integration if that proves lower risk

#### Out Of Scope

- `WaitingRoomBoard`
- `DecisionBoard`
- broad refactors of existing signage example pages
- new primitives unless the implementation exposes a genuine missing surface

#### Proposed Contract For Slice 1

Initial working shape:

```ts
type ArrivalBoardProps = {
  eyebrow?: string;
  title: string;
  message?: string;
  nextStep?: string;
  serviceNote?: string;
  qrHandoff?: {
    title: string;
    description: string;
    qrValue: string;
    qrLabel: string;
    qrInstruction?: string;
    shortUrl?: string;
  };
  className?: string;
};
```

This is intentionally narrow. It is enough to express arrival signage without collapsing into a generic shell.

#### Acceptance Criteria For Slice 1

- `ArrivalBoard` clearly communicates one dominant arrival message and one next step.
- The board composes existing library primitives rather than reimplementing message and CTA zones.
- A no-QR version and a QR-continuation version both look deliberate and readable.
- Storybook includes at least one realistic arrival example and one variation that stresses the optional handoff path.
- Tests cover required and optional regions deterministically.
- Public export and registry entry exist.

#### Likely Files

- `libs/shadcnui-signage/src/lib/blocks/ArrivalBoard.tsx`
- `libs/shadcnui-signage/src/lib/blocks/ArrivalBoard.stories.tsx`
- `libs/shadcnui-signage/src/lib/blocks/ArrivalBoard.spec.tsx`
- `libs/shadcnui-signage/src/index.ts`
- `apps/client/public/registry/registry.json`
- generated `apps/client/public/registry/*.json`
- optionally one client docs page under `apps/client/src/app/pages/components/blocks/`

## Tasks

- [x] Task 1: Finalize board-template boundaries
  - Acceptance criteria: the plan and implementation notes make it explicit that these boards compose `OneMessageFrame`, CTA primitives, and shell components rather than replacing them
  - Files affected: this plan, implementation PR notes

- [x] Task 2: Implement `ArrivalBoard`
  - Acceptance criteria: board supports dominant arrival message, next step, optional service note, and optional QR continuation without breaking hierarchy
  - Files affected: `libs/shadcnui-signage/src/lib/blocks/ArrivalBoard.tsx`, matching story and spec files

- [x] Task 3: Export and publish `ArrivalBoard`
  - Acceptance criteria: component is exported publicly and registry item files are generated
  - Files affected: `libs/shadcnui-signage/src/index.ts`, `apps/client/public/registry/registry.json`, generated registry files

- [x] Task 4: Add discoverability surfaces for completed slices
  - Acceptance criteria: completed public components are visible through client doc pages and the browsable component index
  - Files affected: client component doc pages, navigation config, and component index entries

- [x] Task 5: Reassess after `ArrivalBoard`
  - Acceptance criteria: `ArrivalBoard` implementation reveals whether `WaitingRoomBoard` and `DecisionBoard` can share the same template strategy or need a revised contract
  - Files affected: plan notes or PR notes

- [x] Task 6: Implement `WaitingRoomBoard`
  - Acceptance criteria: board supports a dominant waiting instruction, expectation-setting wait summary, lightweight service updates, and optional QR continuation without breaking hierarchy
  - Files affected: `libs/shadcnui-signage/src/lib/blocks/WaitingRoomBoard.tsx`, matching story and spec files

- [x] Task 7: Export, publish, and document `WaitingRoomBoard`
  - Acceptance criteria: component is exported publicly, registry item files are generated, and the component is discoverable through client docs and the component index
  - Files affected: `libs/shadcnui-signage/src/index.ts`, `apps/client/public/registry/registry.json`, generated registry files, and client docs/config files

- [x] Task 8: Implement `DecisionBoard`
  - Acceptance criteria: board helps viewers choose between a small number of next actions while preserving one dominant reading order and clear CTA hierarchy
  - Files affected: `libs/shadcnui-signage/src/lib/blocks/DecisionBoard.tsx`, matching story and spec files

- [x] Task 9: Export, publish, and document `DecisionBoard`
  - Acceptance criteria: component is exported publicly, registry item files are generated, and the component is discoverable through client docs and the component index
  - Files affected: `libs/shadcnui-signage/src/index.ts`, `apps/client/public/registry/registry.json`, generated registry files, and client docs/config files

## Completion Check

- `ArrivalBoard`, `WaitingRoomBoard`, and `DecisionBoard` all exist as public blocks in `libs/shadcnui-signage`.
- Each board has focused tests, Storybook coverage, registry output, and a client documentation page.
- Full repository verification passed after the complete issue-99 implementation.

## Acceptance Checks

The issue should not be considered complete until all three boards exist, but the first slice should not move forward unless these checks hold for `ArrivalBoard`:

- the board reads as a real arrival screen, not just a wrapped `OneMessageFrame`
- optional QR continuation fits without overwhelming the main message
- the contract remains focused on arrival jobs rather than arbitrary slot composition
- the component remains viable for reception, event, and clinic-style arrival screens
- Storybook and tests demonstrate the component in realistic signage contexts

## Testing Strategy

- focused unit tests in `libs/shadcnui-signage/src/lib/blocks/ArrivalBoard.spec.tsx`
- Storybook stories using `ScreenFrame` for landscape, plus portrait only if it changes the design meaningfully
- targeted validation commands for the signage library first:

```bash
pnpm test:shadcnui-signage
pnpm type-check:shadcnui-signage
pnpm lint:shadcnui-signage
pnpm sync:registry
```

Run `pnpm verify` before merge if the work expands into `apps/client` or multiple affected projects.

## Risks And Trade-Offs

- Template-too-generic risk: the board can become a thin wrapper with many escape hatches and little real value.
- Template-too-specific risk: the first contract may fit one reception story but fail for clinic or event arrivals.
- Scope-creep risk: it is easy to pull issue 97 or issue 64 into this work by trying to solve adjacent navigational and demo-page problems.
- Composition risk: if `OneMessageFrame` and `QRHandoff` do not compose cleanly, the team may be tempted to duplicate styling instead of fixing the abstraction boundary.
- Discoverability risk: a public component that ships only in Storybook can feel unfinished in this repository unless client documentation or a narrow example follows closely.

## Dependencies

- Depends on the already-shipped CTA and handoff primitives from issue 95.
- Depends on the already-shipped message clarity and fallback work from issue 98.
- Depends on the existing signage shell components in `libs/shadcnui-signage`.

## Open Questions

- Should `ArrivalBoard` own its own `SignageContainer` and `SignageHeader`, or should it stay content-only so apps can place it inside existing shells?
- Is a client doc page the right discoverability surface for slice 1, or is one focused example integration lower risk and more informative?
- Do portrait arrival boards deserve first-slice implementation, or should they wait until the landscape template proves itself?

## Rollback Plan

- Revert `ArrivalBoard` and its registry/docs changes as one slice if the contract proves too generic or too constrained.
- If the first slice exposes a missing primitive boundary, stop after documenting that gap instead of forcing all three boards into one batch.
- Do not begin `DecisionBoard` work without preserving the validated composition-first pattern established by `ArrivalBoard` and `WaitingRoomBoard`.
