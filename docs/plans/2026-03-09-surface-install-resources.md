# Surface Install And Resource Paths

**Date:** 2026-03-09
**Author:** GitHub Copilot
**Status:** Complete

## Context

The repository already contains install guidance for portable skills and shadcn-compatible signage components, but the main README and demo app do not surface those paths clearly enough. Readers can find the details, but not from the most obvious entry points.

## Goals

- Make the top-level README explicitly describe how to install components and skills.
- Link the README to the most relevant deeper documentation.
- Make the demo app home surface explain the available resources and how to consume them.

## Non-Goals

- Refactoring the full documentation structure.
- Creating a new route or documentation subsystem.

## Approach

Add concise install sections to the top-level README and expand the demo app home page with a resource map that links users to components, registry usage, Storybook, skills, and deployment documentation.

## Tasks

- [x] Update `README.md` with explicit component and skills installation guidance.
- [x] Update `apps/client/src/app/pages/home/Home.tsx` to surface resource types and consumption paths.
- [x] Verify the edited files for errors and review the resulting diff.

## Testing Strategy

- Check the edited files for TypeScript errors.
- Review the rendered content structure by reading the updated files.

## Risks and Trade-offs

- Too much README detail can reduce scanability, so the new sections should stay concise.
- The home page should improve discoverability without becoming marketing-heavy.

## Rollback Plan

Revert the README and home page changes if they add noise without improving discoverability.

## Completion Notes

- Added explicit component registry and portable skills installation guidance to the root README.
- Expanded the demo app home page to explain the main consumable resources and point to the right destinations.
- Fixed the existing bare-URL markdown lint issue in the README while touching the file.
