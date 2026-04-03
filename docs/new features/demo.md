Fair. The existing monorepo already has broad Copilot guidance, so the job here is **not** “add more generic repo instructions”. The job is to add a **Remotion demo project under `demos/`** and give Copilot **video-specific, path-scoped guidance** for that work only. The repo README also confirms the existing Nx + pnpm setup, current app/library structure, and that Copilot/skills are already part of the workflow. ([GitHub][1])

Below is a tighter developer handoff you can paste into the repo or send directly.

---

# Add a Remotion demo video project to WallRun monorepo

## Goal

Create a **code-driven YouTube demo video** for **WallRun** inside the **existing Nx monorepo**, under:

```text
demos/the-sign-age-video
```

This should use **Remotion** for preview and rendering, and **VS Code Copilot** should be guided with **demo-specific scoped instructions**, not new generic repo-wide instructions.

The repo already has:

- a working Nx + pnpm monorepo structure
- existing global Copilot instructions
- existing Copilot/skills workflow support
- a strong signage/design stance we should inherit rather than restate from scratch. ([GitHub][1])

---

## What we need to add

### 1. A dedicated Remotion demo project under `demos/`

Create:

```text
demos/
  the-sign-age-video/
```

Suggested structure:

```text
demos/
  the-sign-age-video/
    src/
      components/
      scenes/
      data/
      Root.tsx
      index.ts
    public/
      screenshots/
      logos/
      audio/
      fonts/
    project.json
    tsconfig.json
```

This is a proper monorepo project, not a separate repo and not a throwaway folder.

---

### 2. Remotion installed into the existing workspace

Install Remotion in the monorepo and keep all Remotion package versions exactly aligned. Remotion’s docs are clear that `remotion` and `@remotion/*` packages should stay on the same exact version. ([GitHub][1])

Start with:

```bash
pnpm add -D --save-exact remotion @remotion/cli
```

If we later add other Remotion packages, keep versions locked to the same number.

---

### 3. Nx targets for preview and render

Add a `project.json` in `demos/the-sign-age-video` so the video behaves like a normal workspace project.

Suggested starting point:

```json
{
  "name": "the-sign-age-video",
  "projectType": "application",
  "sourceRoot": "demos/the-sign-age-video/src",
  "targets": {
    "preview": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm exec remotion studio demos/the-sign-age-video/src/index.ts"
      }
    },
    "render": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm exec remotion render demos/the-sign-age-video/src/index.ts Main dist/demos/the-sign-age-video/the-sign-age-demo.mp4"
      }
    },
    "typecheck": {
      "executor": "nx:run-commands",
      "options": {
        "command": "tsc --project demos/the-sign-age-video/tsconfig.json --noEmit"
      }
    }
  }
}
```

The exact entry file and composition name may need adjusting once the first composition is wired up.

---

## Copilot changes we actually need

## Do **not** add new generic repo-wide instructions

The repo already has those. The requirement here is **demo-specific instructions scoped to the new Remotion files only**.

### Add a scoped instruction file

Create:

```text
.github/instructions/remotion-demo.instructions.md
```

Use `applyTo` so the guidance only affects the demo project.

```md
---
applyTo: 'demos/the-sign-age-video/**/*.{ts,tsx}'
---

# Remotion demo instructions

You are working inside an existing Nx monorepo on a Remotion-based demo video for WallRun.

This file is only for the demo video project under `demos/the-sign-age-video`.

## Intent

Build a polished developer-facing explainer video for WallRun using React and TypeScript.

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

WallRun is about digital signage as software.

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
```

That is the right place to be opinionated. It is local, targeted, and does not duplicate the repo’s existing generic Copilot setup.

---

## Remotion Agent Skills

Remotion publishes official AI skills and supports installation via:

```bash
npx skills add remotion-dev/skills
```

Add that at repo root so Copilot/agent workflows can use Remotion’s own guidance as a baseline. ([GitHub][1])

### Important

Use Remotion’s skills as the **framework-specific layer**, and our scoped instruction file as the **project-specific layer**.

Remotion’s skills will know Remotion.
They will not know:

- our `demos/` convention
- WallRun’s tone
- our preferred scene structure
- our signage-first design constraints

---

## Recommended first cut of the video

For V1, make a **stylised explainer**, not a fiddly screen-recorded walkthrough.

### Why

That is:

- quicker to build
- easier for Copilot to help with
- easier to keep visually strong
- easier to revise later
- more reusable for future demos

### Suggested sequence

#### 1. Hook

A strong opening statement.

Example:
**Software that lives on walls**

#### 2. The problem

Web developers can build almost anything, but digital signage still often gets treated like templates, slides, and CMS furniture.

#### 3. The shift

WallRun treats signage as software.

#### 4. What is in the repo

Show the idea of:

- signage component library
- demo site
- player app
- installable skills
- developer workflow

Those are all explicitly described in the repo overview. ([GitHub][1])

#### 5. Why it matters

Explain why this is interesting for frontend developers:

- deterministic layout
- distance readability
- wall-screen constraints
- code-driven composition instead of slide tooling

#### 6. Outro

Point back to the repo and future experiments.

---

## Suggested source structure

```text
demos/the-sign-age-video/src/
  components/
    BrowserFrame.tsx
    Caption.tsx
    SectionTitle.tsx
    Callout.tsx
    StatCard.tsx
  scenes/
    IntroScene.tsx
    ProblemScene.tsx
    RepoOverviewScene.tsx
    SignageAsSoftwareScene.tsx
    ComponentScene.tsx
    OutroScene.tsx
  data/
    script.ts
    timings.ts
    brand.ts
  Root.tsx
  index.ts
```

### Intent

**`components/`**
Reusable presentation primitives.

**`scenes/`**
Timed sections of the video. One scene, one message.

**`data/`**
Centralised copy, timings, and tokens.

---

## What Copilot should help with

Good uses:

- scaffold scene files
- create reusable timing constants
- refactor repeated animation wrappers
- build browser or IDE frame components
- wire staged screenshot reveals
- clean up composition registration
- extract shared motion primitives

Bad uses:

- invent the entire art direction
- dump too much copy on screen
- create overcomplicated transitions for the sake of it
- improvise large repo-wide changes outside the demo project

---

## Example prompts for the developer to use with Copilot

### Create intro scene

```text
Create a Remotion scene component in demos/the-sign-age-video/src/scenes/IntroScene.tsx.

Requirements:
- TypeScript React component
- intended for 1920x1080
- about 5 seconds at 30fps
- large editorial typography
- restrained motion
- dark, minimal background
- message: "Software that lives on walls"
- named exports
- timing constants extracted
```

### Create repo overview scene

```text
Create a Remotion scene in demos/the-sign-age-video/src/scenes/RepoOverviewScene.tsx.

The scene should show a staged GitHub repository screenshot inside a browser frame and animate in 3 to 4 callout labels explaining the main parts of WallRun.

Prioritise spacing, legibility, and clarity over flashy motion.
Use reusable components where appropriate.
```

### Refactor repeated motion

```text
Refactor repeated fade-and-slide animation logic in demos/the-sign-age-video/src/scenes into a reusable helper component under demos/the-sign-age-video/src/components.
Keep behaviour unchanged.
Use TypeScript and named exports.
```

---

## Deliverables

### Must have

- `demos/the-sign-age-video` project created
- Remotion installed in the workspace with exact versions
- Nx `preview` target
- Nx `render` target
- scoped instruction file at `.github/instructions/remotion-demo.instructions.md`
- Remotion skills installed with `npx skills add remotion-dev/skills`
- one main composition
- 4 to 6 reusable scenes
- first rendered draft of the YouTube demo

### Nice to have

- shared title/caption/callout primitives
- browser frame component
- data-driven scene timing constants
- easy path to add a portrait/social cut later

---

## Minimal action list

1. Create `demos/the-sign-age-video`
2. Install `remotion` and `@remotion/cli` with exact versions
3. Add `project.json` with `preview`, `render`, and `typecheck`
4. Add `.github/instructions/remotion-demo.instructions.md` with `applyTo: "demos/the-sign-age-video/**/*.{ts,tsx}"`
5. Run `npx skills add remotion-dev/skills`
6. Build V1 as a stylised explainer
7. Render first cut to `dist/demos/the-sign-age-video/`

---

## Recommendation

Keep this first pass narrow.

Do **not** add more broad Copilot setup.
Do **not** try to build a generator yet.
Do **not** turn V1 into a full recorded walkthrough.

Just add a clean Remotion demo project inside the existing monorepo, scope Copilot properly for that path, and get the first explainer rendered.

If you want, I can now turn this into a **best-and-final README.md** plus concrete starter files for `project.json`, `Root.tsx`, and `index.ts`.

[1]: https://github.com/CambridgeMonorail/WallRun?utm_source=chatgpt.com 'CambridgeMonorail/WallRun: Software that lives on walls.'
