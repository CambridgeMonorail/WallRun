# Plan: Storybook Theming Docs For shadcnui-signage

## Goal

Add a dedicated top-level Storybook docs page that explains how the current
shared signage theme works, where the important tokens live, and how consumers
should customize branding without forking component internals.

## Scope

- add a new top-level MDX docs page in `libs/storybook-host/src`
- document the current shared token model from `libs/common-tailwind`
- show the default palette with Storybook docs color blocks
- include a concrete branded override example
- link the page from the existing top-level docs flow

## Files

- `libs/storybook-host/src/Theming.mdx`
- `libs/storybook-host/src/Introduction.mdx`
- `libs/storybook-host/src/GettingStarted.mdx`
- `libs/storybook-host/src/BestPractices.mdx`
- `libs/storybook-host/.storybook/preview.ts`

## Acceptance Criteria

- Storybook has a top-level `Theming` page
- the page explains the shared theme model and token ownership
- the page identifies the main customization hooks and source files
- the page includes a palette section using Storybook docs blocks
- the page includes a concrete branded override example
- the existing top-level docs pages reference the theming page

## Validation

- open the new Storybook docs page locally
- confirm the page renders and the docs navigation order is correct