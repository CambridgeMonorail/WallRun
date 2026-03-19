---
name: remotion-demo-video
description: Build and edit Remotion demo videos for TheSignAge inside the Nx monorepo demos directory
---

# Remotion Demo Video Skill

This skill helps build and maintain the Remotion video demo located at:

```
demos/the-sign-age-video
```

It provides structure for:

- scene creation
- composition structure
- reusable motion components
- video pacing
- developer-facing explainers

This skill should be used when working on:

- Remotion compositions
- scene components
- animated explainer segments
- video structure or sequencing
- motion primitives used by the demo

---

## Project context

This repository is an **Nx monorepo**.

The Remotion video lives under:

```
demos/the-sign-age-video
```

The project renders a **developer-facing explainer video** for TheSignAge.

The audience is **frontend developers**, not marketers.

Assume the viewer understands:

- React
- TypeScript
- component architecture
- layout systems
- developer tooling

Avoid explaining basic JavaScript concepts.

---

## Design intent

The video should feel like **developer media**, not a product advert.

Good tone:

- editorial
- minimal
- modern
- confident
- restrained motion

Bad tone:

- generic SaaS promo
- cinematic trailer effects
- heavy particle animations
- dense marketing copy

Prioritise:

- legibility
- hierarchy
- pacing
- clarity

---

## Project structure

All code should live inside:

```
demos/the-sign-age-video/src
```

Structure:

- **components/** — Reusable presentation primitives
- **scenes/** — Timed sections of the video
- **data/** — Script, copy, timing constants
- **Root.tsx** — Registers compositions
- **index.ts** — Entry file for Remotion CLI

---

## Scene design rules

Each scene should communicate **one idea only**.

Typical duration: 4–8 seconds

Scenes should:

- read quickly
- have large typography
- avoid clutter
- keep motion subtle

Preferred scene types:

- title cards
- staged repo screenshots
- component close-ups
- callout overlays
- architecture diagrams
- stat panels

Avoid:

- tiny UI
- long paragraphs
- overcomplicated transitions

---

## Animation guidelines

Prefer simple deterministic animation.

Examples:

- fade in
- slide up
- staggered reveal
- subtle scale

Avoid:

- bounce effects
- complex physics motion
- heavy easing curves

The goal is **clarity**, not spectacle.

---

## Coding conventions

Use:

- React functional components
- TypeScript
- named exports
- explicit types
- reusable motion wrappers

Avoid:

- duplicated animation code
- magic numbers
- hard-coded scene timing

Extract timing constants when practical.

Example:

```ts
const TITLE_FADE_IN = 20;
const CALLOUT_DELAY = 15;
```

---

## Default workflow for creating a new scene

1. Define the message of the scene
2. Define duration in frames
3. Block the layout
4. Add primary motion
5. Add secondary motion only if it improves clarity
6. Check legibility
7. Ensure code is reusable

---

## Nx targets

- **preview** — `nx preview the-sign-age-video` opens Remotion Studio
- **render** — `nx render the-sign-age-video` renders the full video to `dist/demos/the-sign-age-video/`
- **type-check** — `nx type-check the-sign-age-video` runs TypeScript compiler

---

## Definition of done

A scene is done when:

- the message is immediately clear
- typography reads at video scale
- animation is restrained
- timings are easy to edit
- the code is structured cleanly
