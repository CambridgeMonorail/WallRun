# BrightSign Signage Build Workflow

This workflow turns a signage request into a BrightSign-oriented implementation plan and execution path.

## Goal

Produce a full-screen signage result that is visually strong, technically safe for BrightSign, packaging-aware, and properly verified.

## Step 1: Identify Scope

Answer these questions first:

- Is this a new player app or a change to an existing one?
- Is the requested output a single screen, a set of screens, or a reusable component?
- Does the user want implementation only, or packaging and deployment too?

If the target app is ambiguous, clarify before editing an existing app.

## Step 2: Define the Signage Surface

Describe the screen in zones before writing code.

Minimum output:

- screen purpose
- dominant focal area
- secondary areas
- footer or freshness zone if needed

Questions the screen should answer at a glance:

1. What is this screen for?
2. What matters most right now?
3. What should the viewer notice next?

## Step 3: Apply BrightSign Constraints Early

Make BrightSign-safe choices before implementation hardens.

- Prefer static sample data unless live data is required.
- Keep bundle and dependency weight conservative.
- Avoid complex browser-only features.
- Limit timers and polling.
- Build explicit fallback states.

If an implementation decision is elegant in desktop Chrome but risky on an embedded player, choose the safer option.

## Step 4: Implement the Smallest Viable Screen

Prioritize:

1. full-screen composition
2. content hierarchy
3. stable runtime behavior
4. packaging compatibility

Typical file set for a new player app:

- `project.json`
- `vite.config.*`
- `public/autorun.brs`
- `src/main.tsx`
- `src/styles.css`
- `src/app/*`
- focused tests
- concise README if the app is standalone

## Step 5: Packaging Readiness Check

Before closing the task, confirm:

- the app can build to a static output
- relative asset expectations are preserved
- player bootstrap assets exist where expected
- any package or deploy scripts reference the correct app name

If packaging was not requested, still note whether the implementation appears packaging-safe.

## Step 6: Verification

Run the smallest valid checks first.

Recommended order:

1. changed-file diagnostics
2. project-scoped tests
3. project-scoped type-check or lint
4. project build if packaging or runtime compatibility matters

If command execution is unavailable:

- use diagnostics and file review
- report the missing commands explicitly
- do not claim full verification

## Suggested Final Response Shape

- assumptions
- what was built
- BrightSign-specific decisions
- verification performed
- remaining risks or pending commands