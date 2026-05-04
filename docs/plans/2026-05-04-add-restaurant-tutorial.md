# Add Restaurant Tutorial Section

## Goal

Add a Tutorials section to the WallRun demo site and launch it with a comprehensive restaurant digital signage case study.

## Context

The demo site already has short how-to pages for design briefs, signage builds, agents, and BrightSign deployment. The new tutorial should be longer-form and narrative: a start-to-finish developer case study for inventing a restaurant concept, structuring menu data, choosing WallRun tools and components, implementing screens, and preparing for deployment.

The first tutorial uses the invented venue "The Lard Lounge", a modern restaurant where all dishes are lard based.

## Task Breakdown

- Add a tutorial index page at `/tutorials`.
- Add a detailed case-study tutorial route at `/tutorials/restaurant-digital-signage`.
- Wire the section into sidebar navigation and route configuration.
- Keep the content developer-oriented while preserving signage-specific constraints: venue profile, brand profile, data model, screen inventory, component choices, runtime fallbacks, and verification.
- Add focused render/link tests for the new pages.

## Files To Change

- `apps/client/src/app/constants/navigationConfig.ts`
- `apps/client/src/app/pages/tutorials/Tutorials.tsx`
- `apps/client/src/app/pages/tutorials/Tutorials.test.tsx`
- `apps/client/src/app/pages/tutorials/RestaurantDigitalSignage.tsx`
- `apps/client/src/app/pages/tutorials/RestaurantDigitalSignage.test.tsx`

## Commands To Run

- `pnpm test:client`
- `pnpm type-check:client`
- `pnpm verify` if time and environment allow

## Expected Results

- The demo site sidebar includes a Tutorials section.
- `/tutorials` links to the restaurant tutorial.
- `/tutorials/restaurant-digital-signage` reads as a practical case study for building restaurant signage with WallRun tools and components.
- Tests and type checking pass.
