# Why a React SPA (for Signage) in a Next.js World?

Next.js is excellent at building SEO-friendly websites and content-rich experiences. But **WallRun** is not trying to be a marketing site.

We’re exploring digital signage as software: always-on screens, often offline, with constraints that look more like embedded systems than “the modern web”. For that work, a React Single-Page Application (SPA) is often the simplest, most direct tool.

## The Core Idea: Signage Prefers Determinism

For signage, predictability tends to matter more than crawlers.

- Screens run continuously.
- Many players operate offline.
- Layouts must be stable for hours/days.
- Failures need to degrade safely (stale data, missing feeds, time drift).

An SPA architecture encourages a single runtime with explicit state, clear fallbacks, and fewer moving pieces.

## When an SPA Is the Right Fit

SPAs aren’t always the answer, but they’re a strong default for signage tooling and many player-adjacent workflows:

### 1. Offline-first behavior

Signage players frequently lose connectivity or run behind captive networks.

An SPA pairs well with:

- Cached assets and resilient boot
- Stale-while-revalidate data fetching patterns
- Explicit “last updated” UI
- Testing for failure modes (timeouts, partial payloads, slow clocks)

### 2. Internal tools and preview environments

This repo includes developer-facing tooling like component previews and Storybook. For those workflows, SSR/SSG is usually unnecessary overhead.

### 3. Deterministic layouts over responsive breakpoints

Signage often targets known resolutions and aspect ratios (1080p landscape, 4K landscape, 1080p portrait). We want:

- Fixed grids
- Safe areas
- Predictable text clamping
- No layout jumps

That aligns naturally with a client-side app and a signage-oriented component library.

### 4. Clear separation of concerns

Many signage deployments have a pre-existing backend or CMS already. An SPA can consume APIs directly without introducing additional server-side rendering concerns.

## Why Not Default to Next.js?

You can absolutely build signage tooling with Next.js, but it’s not the default here because:

- SEO is usually irrelevant for player UIs and internal tooling
- Server/runtime complexity isn’t free
- Offline-first constraints push us toward fewer dependencies on a live server

## What We Use Instead

In this monorepo, the SPA approach supports:

- Fast iteration with Vite
- Reusable signage-oriented UI in `libs/shadcnui-signage`
- Repeatable validation with Nx affected workflows

If you’re coming from Next.js, think of this as choosing the smallest surface area that still gives us a modern frontend DX.
