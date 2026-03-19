---
applyTo: "demos/the-sign-age-video/**/*.{ts,tsx}"
---

# Remotion demo instructions

You are working inside an existing Nx monorepo on a Remotion-based demo video for TheSignAge.

This file is only for the demo video project under `demos/the-sign-age-video`.

## Intent

Build a polished developer-facing explainer video for TheSignAge using React and TypeScript.

This is not a product app.
This is not a landing page.
This is not a screen recording editor timeline.

It is a code-driven video composition made of reusable scenes.

## Follow the existing repository conventions

- Respect the existing repo-wide Copilot instructions
- Follow existing TypeScript, React, and Nx conventions already used in the monorepo
- Do not restyle or reorganise the whole workspace
- Keep changes local to the demo project unless a shared utility is genuinely needed

## Video-specific rules

- Use React functional components
- Use TypeScript with explicit types
- Prefer named exports unless a file has one obvious primary export
- Keep scenes small, readable, and reusable
- Separate `components`, `scenes`, and `data`
- Extract timing values into named constants where practical
- Keep fps, dimensions, and duration explicit
- Keep motion deterministic and easy to tune
- Avoid hard-coded spaghetti timelines
- Avoid dense paragraphs of on-screen text
- Avoid tiny UI that will not read in a YouTube frame

## Creative direction

TheSignAge is about digital signage as software.

The video should feel:
- editorial
- technical
- clear
- restrained
- modern
- signage-aware

It should not feel like:
- a generic SaaS promo
- a startup advert
- a cinematic trailer full of noise
- a Tailwind demo page with motion pasted on top

## Preferred scene building blocks

- title cards
- staged repo screenshots
- browser or IDE frames
- component callouts
- diagram sequences
- stat or comparison panels
- short code moments where genuinely useful

## Preferred workflow

When creating a scene:
1. define the single message of the scene
2. define the duration in frames
3. block the layout
4. add primary motion
5. add secondary motion only if it improves clarity
6. check legibility
7. keep code easy to revise

## Definition of done

A scene is done when:
- it communicates one idea clearly
- it reads quickly
- the typography is legible
- the motion feels intentional
- the code is easy to edit later
