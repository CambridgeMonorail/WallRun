# WallRun: Project Goals

WallRun is an exploration of digital signage as software.

The goal is not to build “a website, but on a TV”. The goal is to build **reliable, testable, data-driven signage content** that runs on always-on, unattended devices—often offline—and behaves predictably.

## Goals

### 1. Treat signage as software

- Model time, state, schedules, and failure modes explicitly
- Prefer deterministic layouts over “responsive” breakpoints
- Embrace constraints (offline operation, limited input, hardware quirks)

### 2. Provide a signage-oriented UI toolkit

Build and evolve reusable primitives, layouts, and blocks that are optimized for:

- Fixed aspect ratios and known resolutions
- Distance readability (typography, contrast, hierarchy)
- Predictable rendering (no surprise reflow)

The initial focus is the signage library in `libs/shadcnui-signage`.

### 3. Maintain a strong frontend developer experience

- Nx monorepo boundaries (apps import from libs)
- Fast iteration via Vite + Storybook
- Strict TypeScript
- Tests that reflect real-world constraints (Vitest, Testing Library, Playwright where it matters)

### 4. Document reality, not marketing

- Write down what breaks and why
- Capture trade-offs and constraints
- Prefer “working notes” and experiments over polished narratives

### 5. Support BrightSign-focused exploration (without pretending to be official)

We focus on BrightSign devices as a representative platform, and keep a clear separation between:

- What the platform can do
- What we can reliably ship
- What is anecdotal / experimental

## Non-Goals

- Building a general-purpose CMS
- Duplicating official device documentation
- Teaching web development fundamentals

## Where to Next

- Read the intent: `docs/getting-started/statement-of-intent.md`
- Explore signage components: `libs/shadcnui-signage/README.md`
- Run Storybook: `pnpm run serve:storybook`
