Good catch. You are right. In the last revision we **dropped the project skill**, and that was actually one of the better parts of the earlier design.

For your workflow (Nx monorepo + Copilot + Remotion) you ideally want **three layers**, not two:

1. **Repo-wide Copilot instructions**
   Already exists in your repo.

2. **Scoped instruction file using `applyTo`**
   Constrains behaviour for files in `demos/the-sign-age-video`.

3. **A project-specific Copilot Skill**
   Gives Copilot structured knowledge about **Remotion video development for WallRun**.

The important difference is:

| Mechanism                  | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| repo instructions          | global coding style                           |
| `applyTo` instruction file | local behavioural guardrails                  |
| **Skill**                  | task-specific knowledge + structured workflow |

Think of the skill as **“how to build a video in this repo”**.

Below is the missing piece.

---

# Add a project-specific Remotion skill for the demo video

Create a local skill in the repo.

Recommended location:

```
.github/skills/remotion-demo-video/
```

Structure:

```
.github/
  skills/
    remotion-demo-video/
      SKILL.md
```

---

# `.github/skills/remotion-demo-video/SKILL.md`

````md
---
name: remotion-demo-video
description: Build and edit Remotion demo videos for WallRun inside the Nx monorepo demos directory
---

# Remotion Demo Video Skill

This skill helps build and maintain the Remotion video demo located at:

demos/the-sign-age-video

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

# Project context

This repository is an **Nx monorepo**.

The Remotion video lives under:

demos/the-sign-age-video

The project renders a **developer-facing explainer video** for:

WallRun

The audience is **frontend developers**, not marketers.

Assume the viewer understands:

- React
- TypeScript
- component architecture
- layout systems
- developer tooling

Avoid explaining basic JavaScript concepts.

---

# Design intent

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

# Project structure

All code should live inside:

demos/the-sign-age-video/src

Structure:

components/
Reusable presentation primitives

scenes/
Timed sections of the video

data/
Script, copy, timing constants

Root.tsx
Registers compositions

index.ts
Entry file for Remotion CLI

---

# Scene design rules

Each scene should communicate **one idea only**.

Typical duration:

4–8 seconds

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

# Animation guidelines

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

# Coding conventions

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
const CALL_OUT_DELAY = 15;
```
````

---

# Default workflow for creating a new scene

1. Define the message of the scene
2. Define duration in frames
3. Block the layout
4. Add primary motion
5. Add secondary motion only if it improves clarity
6. Check legibility
7. Ensure code is reusable

---

# Definition of done

A scene is done when:

- the message is immediately clear
- typography reads at video scale
- animation is restrained
- timings are easy to edit
- the code is structured cleanly

```

---

# Why the skill matters

The **instruction file** constrains behaviour.

The **skill teaches Copilot how to build the video**.

Without the skill Copilot tends to:

- generate chaotic Remotion timelines
- create long scene files
- mix layout and animation logic
- treat video like a marketing promo

The skill fixes that by giving it:

- a scene workflow
- structural expectations
- motion guidelines
- repo context

---

# Final Copilot stack for the demo

Your setup should now look like this:

```

.github/
copilot-instructions.md (already exists)

instructions/
remotion-demo.instructions.md (applyTo scoped rules)

skills/
remotion-demo-video/
SKILL.md (task knowledge)

```

Plus the Remotion demo project:

```

demos/
the-sign-age-video/

```

---

# Optional but recommended

Also install Remotion’s official skills:

```

npx skills add remotion-dev/skills

```

Then Copilot will have:

* **framework knowledge** (Remotion skills)
* **project knowledge** (your skill)
* **repo rules** (existing instructions)

That combination tends to produce **dramatically better agent behaviour**.

---

If you want, I can also give you the **three tiny starter files for the Remotion project** (`Root.tsx`, `index.ts`, and a clean `IntroScene.tsx`) so your developer can literally paste them in and run `nx preview the-sign-age-video`.
```
