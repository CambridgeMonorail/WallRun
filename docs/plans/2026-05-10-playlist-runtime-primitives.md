## Goal

Implement issue #96 by adding first-class playlist runtime primitives to `@wallrun/shadcnui-signage` for timed signage loops.

## Context

The library already has loop and schedule behaviour primitives, but it does not expose reusable components for active/next playlist state, progress, or priority takeover messaging.

## Planned slices

1. Inspect existing runtime and timing surfaces in `ContentRotator`, `ScheduleGate`, and shared types/utilities.
2. Implement the smallest coherent primitive set for playlist state and progress.
3. Add Storybook coverage for announcement loop, menu daypart, and takeover examples.
4. Add focused tests for timing metadata and core render states.
5. Export the new components and run targeted validation.

## Expected files

- `libs/shadcnui-signage/src/lib/behaviour/*`
- `libs/shadcnui-signage/src/index.ts`
- colocated `*.stories.tsx` and `*.test.tsx` or `*.spec.tsx`

## Validation

- focused Vitest for the new runtime primitives
- narrow type/error check for touched files