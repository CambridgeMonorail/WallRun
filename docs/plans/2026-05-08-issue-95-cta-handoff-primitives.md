# Issue 95 CTA And QR Handoff Primitives

**Date:** 2026-05-08
**Author:** GitHub Copilot
**Status:** In Progress

## Context

Issue 95 asks for a reusable CTA layer for signage actions:

- `QRCodeCallout`
- `ShortUrlCallout`
- `ActionStrip`
- `QRHandoff`

This sits immediately beside the fallback and freshness primitives already being developed in the current roadmap, and it unlocks later board templates that need one clear next step without ad hoc CTA markup.

There is one important overlap to resolve before implementation starts: issue 53 is still open, but `CTABanner` already exists in `libs/shadcnui-signage`, is exported from the package root, and is already used by several demo pages. Issue 95 should therefore not treat the CTA surface as greenfield work. The implementation will refactor `CTABanner` to compose a more general `ActionStrip` without breaking existing demos or removing the current public `CTABanner` API in the first pass.

The current library does not yet include a QR rendering primitive or any QR dependency, so issue 95 is also the first place where the library needs a deliberate choice about QR generation, dependency footprint, and registry install behavior. This plan standardizes on `qrcode.react`, using its SVG output path so the QR surface remains deterministic, lightweight, and friendly to the library's registry install model.

## Goals

- Add a signage-safe QR callout primitive with explicit label, instruction, and fallback URL support.
- Add a readable short URL primitive that works alone or alongside a QR callout.
- Add a composable CTA strip surface for footer, side-zone, and edge CTA placements.
- Add a higher-level QR handoff surface that explains what continues on the viewer's personal device.
- Keep the implementation compatible with existing `CTABanner` usage or provide a low-risk migration path.
- Ship public exports, Storybook examples, tests, and registry entries for the new public components.

## Non-Goals

- Playlist timing, takeover logic, or loop orchestration from issue 96.
- Broad refactoring of all signage demo pages under issue 64.
- Backend QR generation services, analytics, or scan tracking.
- Full kiosk navigation flows or touch recovery patterns from issue 103.
- A full visual redesign of existing CTA demos beyond what is needed to validate the new components.

## Proposed Scope

### Components

1. `QRCodeCallout`
   - Location: `libs/shadcnui-signage/src/lib/primitives/QRCodeCallout.tsx`
   - Responsibility: render a scan-safe QR surface with destination label, short instruction, and optional short URL text.

2. `ShortUrlCallout`
   - Location: `libs/shadcnui-signage/src/lib/primitives/ShortUrlCallout.tsx`
   - Responsibility: render a large-format readable URL with optional label and layout variants for inline, panel, and strip usage.

3. `ActionStrip`
   - Location: `libs/shadcnui-signage/src/lib/primitives/ActionStrip.tsx`
   - Responsibility: reserve one clear CTA zone with position and tone variants for footer and side placement.

4. `QRHandoff`
   - Location: `libs/shadcnui-signage/src/lib/blocks/QRHandoff.tsx`
   - Responsibility: compose QR, short URL, and explanatory copy into a single "continue on your phone" surface.

### Implementation Decisions

- `CTABanner` stays in `primitives`, but its implementation should be refactored to compose `ActionStrip` internally where the API overlap makes sense.
- `QRCodeCallout`, `ShortUrlCallout`, and `ActionStrip` belong in `primitives` because they are reusable CTA building blocks.
- `QRHandoff` belongs in `blocks` because it is a composed surface built from lower-level CTA primitives.
- QR rendering should use `qrcode.react` with SVG output rather than a bespoke internal QR generator.

### Overlap Resolution

- Treat `CTABanner` as the existing compatibility surface and `ActionStrip` as the more general CTA primitive.
- Refactor `CTABanner` to compose `ActionStrip` internally when the layout maps cleanly, while preserving the current `CTABanner` props used by demo pages.
- First implementation pass should avoid deleting `CTABanner` or forcing demo-page rewrites just to preserve behavior.
- If shared CTA styling emerges beyond the initial wrapper approach, extract shared classes or internal helpers rather than forcing a breaking rename.
- Close or relabel issue 53 only after the new surface lands and the overlap is explicit.

### Storybook Coverage

- Poster-style QR CTA story
- Side-zone QR CTA story
- Footer `ActionStrip` story
- `ShortUrlCallout` standalone fallback story
- `QRHandoff` story showing what continues on the device
- At least one portrait layout and one landscape layout

### Registry And Docs Coverage

- Add public exports in `libs/shadcnui-signage/src/index.ts`
- Add registry entries to `apps/client/public/registry/registry.json`
- Run `pnpm sync:registry` to generate per-item registry files
- Ensure install snippets exist for each new public component

## Approach

### 1. Stabilize The CTA Taxonomy

Define the roles clearly before writing code:

- `QRCodeCallout` is the scan target
- `ShortUrlCallout` is the readable manual fallback
- `ActionStrip` is the placement shell for one dominant CTA
- `QRHandoff` is the composed phone-continuation pattern
- `CTABanner` remains the compatibility wrapper that can adopt `ActionStrip` internally without changing current call sites

This avoids building two overlapping banner primitives with slightly different props.

### 2. Choose A QR Rendering Strategy

Implementation should use `qrcode.react` and render QR codes through its SVG component path.

Decision criteria:

- deterministic rendering for tests
- legible output at signage sizes
- easy integration with the shadcn registry install model
- minimal runtime and dependency cost

Why this choice:

- it is a focused React QR dependency rather than a broader graphics stack
- SVG output keeps the rendered markup predictable and crisp at signage sizes
- it avoids writing and maintaining a bespoke QR encoder inside the component library

### 3. Build Bottom-Up, Then Compose

Implement the lower-level callouts first:

- `ShortUrlCallout`
- `QRCodeCallout`
- `ActionStrip`

Then compose them into `QRHandoff` so the higher-level surface does not invent a second set of CTA styles.

### 4. Use Real Signage Examples

Stories and examples should model actual signage jobs rather than generic marketing copy:

- event agenda continuation
- retail or venue poster CTA
- visitor check-in continuation
- service support handoff

## Tasks

- [ ] Task 1: Finalize CTA API and overlap rules
  - Acceptance criteria: issue 95 implementation notes explicitly define `ActionStrip` as the general CTA primitive and `CTABanner` as the compatibility wrapper that composes it
  - Files affected: `docs/plans/2026-05-08-issue-95-cta-handoff-primitives.md`, implementation PR notes, possibly `libs/shadcnui-signage/src/lib/primitives/CTABanner.tsx`

- [ ] Task 2: Implement `ShortUrlCallout`
  - Acceptance criteria: readable URL treatment supports `inline`, `panel`, and `strip` variants with distance-safe typography
  - Files affected: `libs/shadcnui-signage/src/lib/primitives/ShortUrlCallout.tsx`, matching story and test files

- [ ] Task 3: Implement `QRCodeCallout`
  - Acceptance criteria: QR surface uses `qrcode.react` SVG output and supports label, instruction, optional short URL, and size variants without breaking contrast on dark or light surfaces
  - Files affected: `libs/shadcnui-signage/src/lib/primitives/QRCodeCallout.tsx`, matching story and test files, possibly `package.json`

- [ ] Task 4: Implement `ActionStrip`
  - Acceptance criteria: CTA strip supports `bottom`, `left`, and `right` placement plus `brand`, `neutral`, and `urgent` tone variants and exposes a shape that `CTABanner` can reuse internally
  - Files affected: `libs/shadcnui-signage/src/lib/primitives/ActionStrip.tsx`, matching story and test files, possibly `libs/shadcnui-signage/src/lib/primitives/CTABanner.tsx`

- [ ] Task 5: Implement `QRHandoff`
  - Acceptance criteria: composed surface explains the device continuation path and reuses the lower-level CTA primitives rather than duplicating them
  - Files affected: `libs/shadcnui-signage/src/lib/blocks/QRHandoff.tsx`, matching story and test files

- [ ] Task 6: Export and publish components
  - Acceptance criteria: new components are exported publicly and have generated registry item files
  - Files affected: `libs/shadcnui-signage/src/index.ts`, `apps/client/public/registry/registry.json`, generated `apps/client/public/registry/*.json`

- [ ] Task 7: Add one or two targeted demo integrations
  - Acceptance criteria: at least one existing signage example uses the new CTA layer in a way that validates the API without broad refactoring
  - Files affected: likely one or two files under `apps/client/src/app/pages/signage/`

- [ ] Task 8: Resolve issue overlap explicitly
  - Acceptance criteria: issue 53 is either superseded in implementation notes or left open with a clear remaining scope that is no longer duplicated by issue 95
  - Files affected: PR description and GitHub issue bookkeeping

## Acceptance Checks

The implementation should not be considered complete until all of the following are true:

- `QRCodeCallout` renders a scan-safe QR surface with visible destination context.
- `QRCodeCallout` uses SVG QR rendering with predictable output suitable for crisp signage display.
- `ShortUrlCallout` remains legible without the QR component present.
- `ActionStrip` keeps one dominant CTA without collapsing the main content region.
- `QRHandoff` clearly communicates what happens on the viewer's personal device.
- Light and dark backgrounds are covered in Storybook where relevant.
- Portrait and landscape examples are both covered where layout meaningfully changes.
- Tests cover render modes, fallback combinations, and key accessibility behavior.
- Public exports and registry entries are in place for all new public components.
- Existing `CTABanner` consumers still work because the wrapper remains intact while composing the new CTA primitive internally.

## Testing Strategy

- Unit tests in `libs/shadcnui-signage/src/lib/**` for each new component
- Focused visual stories using `ScreenFrame` to validate landscape and portrait signage contexts
- Deterministic tests for QR rendering output shape and conditional fallback behavior
- Deterministic tests for `qrcode.react` SVG output shape and conditional fallback behavior
- Manual Storybook review for viewing-distance readability and CTA hierarchy

Planned validation commands:

```bash
pnpm test:shadcnui-signage
pnpm type-check:shadcnui-signage
pnpm lint:shadcnui-signage
pnpm sync:registry
```

Run `pnpm verify` before merge if the implementation touches multiple affected projects beyond `shadcnui-signage`.

## Risks And Trade-Offs

- QR dependency risk: adding a QR package may complicate registry installs, bundle size, or long-term maintenance.
- QR dependency risk: even a focused dependency like `qrcode.react` still adds registry-install surface area and should be justified in docs and tests.
- CTA overlap risk: `ActionStrip` and `CTABanner` can drift into duplicate primitives if their boundaries are not written down early.
- Legibility risk: QR codes and URLs can look acceptable in Storybook but fail at real-world display distances if sizing defaults are too small.
- Scope creep risk: it is easy to pull issue 99 or issue 64 into this work by refactoring too many demo screens.
- Accessibility risk: interactive CTA affordances can look good visually but miss keyboard focus and descriptive labeling requirements.

## Dependencies

- Depends conceptually on the current message clarity and fallback work so the CTA layer lands alongside clearer single-message surfaces.
- Depends on the registry workflow already present in `apps/client/public/registry/registry.json` and `pnpm sync:registry`.
- Depends on adding `qrcode.react` cleanly to the workspace and validating that its dependency footprint is acceptable for registry consumers.

## Open Questions

- Which existing demo page gives the best low-risk validation target: `EventSchedule`, `RestaurantMenu`, or a new focused Storybook-only example?

## Rollback Plan

- Revert the new CTA components and registry entries in one changeset if the API proves unclear.
- Keep the public `CTABanner` API untouched until the `ActionStrip`-backed wrapper path is proven.
- If QR rendering introduces dependency or registry problems, ship `ShortUrlCallout` and `ActionStrip` first and defer `QRCodeCallout` and `QRHandoff` to a follow-up slice.
