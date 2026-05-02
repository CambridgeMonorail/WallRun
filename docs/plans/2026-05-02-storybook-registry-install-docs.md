# Storybook Registry Install Docs Plan

## Goal

Close issue #76 by documenting the published shadcn registry installation workflow in Storybook.

## Context

The client docs already explain how to install WallRun signage components from the published registry, but the Storybook docs still describe composition and workspace usage without telling consumers how to add components to an existing project.

## Scope

Update the Storybook documentation surfaces that frame usage and next steps:

- `libs/storybook-host/src/GettingStarted.mdx`
- `libs/storybook-host/src/Introduction.mdx`
- `libs/storybook-host/src/Resources.mdx`

## Content To Add

- the published registry URL
- a single-component install example
- a multi-component install example
- explicit explanation that components are copied into the consumer codebase
- a pointer to broader docs for users who want full workspace setup

## Validation

- verify the docs render at `http://localhost:4400/?path=/docs/introduction--documentation`
- verify the updated Storybook docs pages contain the registry install workflow and next-step links

## Expected Result

Storybook matches the client docs for registry installation guidance and no longer leaves external consumers guessing how to install signage components.
