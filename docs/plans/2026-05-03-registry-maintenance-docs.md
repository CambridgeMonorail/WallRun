# Registry Maintenance Docs Plan

## Goal

Make the published shadcn registry understandable and discoverable for maintainers, not just consumers.

## Initial Hypothesis

The current maintainer gap is documentation structure, not missing tooling.

- the registry is already published from `apps/client/public/registry/registry.json`
- the repo README links consumer-facing registry docs, but not the maintainer workflow
- the maintenance guide explains file tracing, but not the registry architecture, hosting model, or update workflow clearly enough

## Cheap Discriminating Checks

- confirm whether `README.md` links the maintainer guide from an obvious maintainer-facing surface
- confirm whether `package.json` or scripts expose a `shadcn build` style registry generation flow
- confirm whether `registry.json` already contains `registryDependencies` fields that the guide does not explain

## Scope

- add an obvious maintainer-facing link to the registry maintenance guide
- explain WallRun's current static registry architecture and hosting model
- document `files`, `dependencies`, and `registryDependencies`
- document the current manual update workflow and its constraints

## Validation

- review the edited markdown for discoverability and internal consistency
- confirm the guide matches the checked-in registry structure and available package scripts

## Expected Result

Maintainers can find one practical guide that explains how WallRun's registry works today, how to update it safely, and which constraints still matter when editing `apps/client/public/registry/registry.json`.
