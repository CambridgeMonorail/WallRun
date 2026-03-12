# Refresh Client Demo Surface

## Goal

Update the client demo so it reflects The Sign Age as more than a component showcase by surfacing player app scaffolding, BrightSign deployment workflows, player discovery, and portable skills in the routed experience.

## Context

Recent repo work added an Nx-native player app generator and expanded the canonical product story in the README. The client demo currently emphasizes components, examples, and registry installation, but it does not clearly expose the newer player-app generator workflow or provide a dedicated tooling overview route.

## Tasks

### 1. Add a tooling-focused documentation page

- Files to change:
  - `apps/client/src/app/pages/tooling/Tooling.tsx`
  - `apps/client/src/app/constants/navigationConfig.ts`
- Expected result:
  - A new routed page explains player scaffolding, deployment, discovery, and skills.
- Acceptance criteria:
  - The page is linked from sidebar navigation.
  - The new route renders inside the existing documentation shell.

### 2. Refresh top-level client messaging

- Files to change:
  - `apps/client/src/app/pages/landing/Landing.tsx`
  - `apps/client/src/app/pages/getting-started/GettingStarted.tsx`
- Expected result:
  - Landing and getting-started content mention the Nx generator and BrightSign workflow, not just component installation.
- Acceptance criteria:
  - Users can discover the new generator and deployment entry points from the first-run pages.

### 3. Validate the affected client files

- Commands to run:
  - targeted diagnostics for changed files
  - targeted tests if existing coverage is available for affected pages
- Expected result:
  - No relevant type or lint errors introduced by the change.

## Risks And Assumptions

- Keep the demo site aligned with the existing calm B2B documentation style rather than turning it into a marketing page.
- Prefer additive changes over broad restructuring so the route surface remains reviewable.

## Verification

- Confirm the new route is present in navigation.
- Confirm updated copy references `pnpm scaffold:player`, `pnpm nx g sign-age:player-app`, `pnpm deploy:player`, and `npx skills add CambridgeMonorail/TheSignAge` where appropriate.
- Run file diagnostics after edits.