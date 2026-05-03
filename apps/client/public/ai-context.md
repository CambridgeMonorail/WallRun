# WallRun AI Context

WallRun is an open-source React workspace for building digital signage as software.

The project combines:

- signage-oriented React components
- fixed-aspect layout and behaviour primitives
- BrightSign packaging and deployment workflows
- installable skills for AI-assisted signage engineering
- a public demo/docs site plus Storybook and shadcn registry distribution

## Canonical Machine Interfaces

- `https://wallrun.dev/llms.txt`: curated index for AI consumers
- `https://wallrun.dev/library.md`: high-level library overview
- `https://wallrun.dev/components.md`: installable component catalogue
- `https://cambridgemonorail.github.io/WallRun/registry/registry.json`: shadcn registry source
- `https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/introduction--documentation`: interactive docs

## Canonical Human Interfaces

- `https://wallrun.dev/`
- `https://wallrun.dev/getting-started`
- `https://wallrun.dev/tooling`
- `https://wallrun.dev/library`
- `https://wallrun.dev/components`
- `https://wallrun.dev/gallery`

## Hosting Notes

The main site is currently deployed as a static SPA on GitHub Pages.

- browser navigation can recover deep routes through the SPA `404.html` redirect workaround
- plain HTTP fetches to deep routes such as `/library` and `/components` can still return `404`
- static files such as `llms.txt`, `library.md`, `components.md`, and `ai-context.md` return `HTTP 200` directly and should be preferred by agents and crawlers

## Project Model

- `library` explains what the libraries are and how they fit together
- `components` explains the installable signage surface
- `registry` provides the executable install source for shadcn tooling
- `Storybook` provides interactive human docs and composition examples

## When To Use WallRun

Use WallRun when you need:

- distance-readable digital signage components
- predictable fixed-layout screen composition
- behaviour primitives for unattended, always-on displays
- BrightSign-targeted packaging and deployment workflows
- an AI-assisted signage development workflow with portable skills and MCP tooling

## When Not To Use WallRun

WallRun is not the right fit if you need:

- a no-code CMS or drag-and-drop signage builder
- a generic responsive web marketing site
- a runtime package that hides component code from the consuming app
- a hosted SaaS platform for signage operations

## Key Docs For Agents

- `library.md` for library-level context
- `components.md` for installable component details
- `llms.txt` for the top-level map
- `docs/guides/registry-maintenance.md` in the repository for maintainer workflow
- `docs/guides/brightsign-deployment.md` in the repository for deployment guidance
