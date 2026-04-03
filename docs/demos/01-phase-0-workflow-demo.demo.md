# Demo Script: Phase 0 - Copilot-First Workflow System

**Duration:** 11-13 minutes  
**Audience:** Developers using GitHub Copilot, AI-assisted development practitioners  
**Goal:** Demonstrate the comprehensive Copilot workflow system and show it working in action  
**Prerequisites:** Viewers should have watched the project introduction video

---

## Setup

**Before recording:**

- [ ] Clean VS Code workspace
- [ ] Close all files except README.md
- [ ] Clear terminal history
- [ ] Ensure GitHub Copilot Chat is visible
- [ ] Branch: `main` (or demo branch with clean state)
- [ ] Test Copilot responses work as expected
- [ ] Have example task ready to demonstrate
- [ ] Enable "Show Instructions Used" in Copilot settings (if available)

**Key files to have ready:**

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `skills/planning/workflows/detailed-guide.md`
- `skills/verification/workflows/detailed-guide.md`
- `docs/plans/README.md`
- `package.json` (for pnpm verify)

---

## Script

### Introduction (45 seconds)

> "Welcome back! In the last video, I introduced WallRun project. Today, I want to show you something unique about how we built it - our Copilot-first workflow system."

**Show:** VS Code with project root visible

> "We've completed Phases 0-3 of a comprehensive GitHub Copilot integration. What does that mean? It means we've taught Copilot how to work in this repository - not just what code to write, but how to approach work, when to plan, and how to verify quality."

> "By the end of this video, you'll see Copilot reference our workflow guides, create structured plans, and follow our verification process. Let's dive in."

---

### The Three-Layer Model (2 minutes)

**Show:** Open `docs/ai/target-operating-model.md`

> "First, the architecture. We use a three-layer instruction model."

#### Layer 1: Global Conventions

**Show:** Open `.github/copilot-instructions.md`

> "Layer one: repository-wide instructions. This file defines our tech stack, TypeScript conventions, React patterns, monorepo structure - everything that's globally true."

**Scroll through sections:**

- Global TypeScript Conventions
- Global React Conventions
- Nx and Monorepo Guidance
- Library Structure

> "These apply everywhere, all the time. Any file Copilot touches gets this context."

#### Layer 2: Path-Scoped Instructions

**Show:** `.github/instructions/` folder

> "Layer two: path-scoped instructions. These activate based on what file you're editing."

**Open:** `react-spa-router.instructions.md`

**Show YAML frontmatter:**

```yaml
---
applyTo:
  - apps/client/**/*.{ts,tsx}
  - libs/shell/**/*.{ts,tsx}
---
```

> "This one only applies when working in the client app or shell library. It provides React Router conventions specific to our SPA architecture."

**Show list:** Other instruction files

- `ui-and-accessibility.instructions.md` - UI patterns, Tailwind, a11y
- `testing-and-quality.instructions.md` - Test patterns
- `style-guide-compliance.instructions.md` - Design system rules

> "Domain-specific guidance that doesn't clutter the global instructions."

#### Layer 3: Agent Workflow

**Show:** Open `AGENTS.md` at root

> "Layer three: agent workflow guidance. This is the key innovation."

**Scroll slowly through sections:**

> "Unlike the other layers which define _what to code_, this defines _how to work_. Things like:"

- How to Approach Tasks
- When to create implementation plans
- Commit discipline (small, focused commits)
- Verification workflow
- Definition of Done
- PR requirements

> "This separates code conventions from process conventions. It's behavioral guidance for the AI agent."

---

### Workflow Skills (2 minutes)

**Show:** `skills/` folder

> "AGENTS.md references four workflow skills - structured process guides for common tasks."

#### Planning Skill

**Open:** `skills/planning/workflows/detailed-guide.md`

> "The planning skill teaches Copilot when and how to create structured implementation plans."

**Scroll to "When Planning is Required":**

> "It distinguishes between trivial changes - no plan needed - and non-trivial work where a plan is required."

**Show plan template section:**

> "It provides a specific template with task breakdown, acceptance criteria, and expected results."

#### Systematic Debugging Skill

**Open:** `skills/systematic-debugging/workflows/detailed-guide.md`

> "The debugging skill provides a six-step root cause analysis process."

**Show the 6 steps:**

1. Understand the problem
2. Reproduce reliably
3. Find root cause
4. Fix correctly
5. Verify the fix
6. Document what changed

> "Instead of guess-and-check debugging, agents follow a systematic approach."

#### Code Review Ready Skill

**Open:** `skills/code-review-ready/workflows/detailed-guide.md`

> "This skill defines what makes a PR easy to review: small diffs, one logical change, clear descriptions."

**Show the anti-patterns section:**

> "It includes anti-patterns to avoid - like the 'Everything PR' or the 'Trust Me PR' with no evidence."

#### Verification Skill

**Open:** `skills/verification/workflows/detailed-guide.md`

> "The verification skill defines our PR evidence requirements."

**Show evidence template:**

> "Every PR needs verification output, and for UI changes, screenshots. This ensures quality before review."

---

### Implementation Plans (1 minute)

**Show:** `docs/plans/` folder

> "When agents work on non-trivial tasks, they create structured plans here."

**Open:** `docs/plans/README.md`

> "Plans follow a specific format with task breakdown and acceptance criteria."

**Open:** One of the existing plan files (e.g., `2026-02-08-behaviour-components-option-a.md`)

**Scroll through to show structure:**

> "Each task has files to change, commands to run, and expected results. Plans become living documents that track progress."

---

### The Verification Command (1 minute)

**Show:** Open `package.json`, scroll to scripts

> "We added a unified verification command that agents run before declaring work complete."

**Find and highlight:**

```json
"verify": "pnpm run format:check && pnpm run lint:affected && pnpm run type-check:affected && pnpm run test:affected && pnpm run build:affected"
```

> "This runs format check, lint, type-check, tests, and builds - but only for affected projects using Nx."

**Switch to terminal:**

```bash
pnpm verify
```

> "Let's run it now on our clean repository."

**Wait for output:**

> "Format check passes, no affected projects to lint or test. Everything's clean. This is what agents run before creating PRs."

---

### Testing It In Action (4-5 minutes)

> "Okay, theory is done. Let's see this actually work. I'm going to ask Copilot to perform a task and watch it follow our workflow system."

#### Test 1: Ask About Workflow

**Open GitHub Copilot Chat:**

**Type and send:**

```
How should I approach adding a new feature to this repository?
```

**Wait for response, then show:**

> "Notice - it's referencing AGENTS.md. It's telling me to:"

- Read the request carefully
- Assess complexity
- Create a plan if non-trivial
- Work incrementally

**Point out specific references:**

> "It even links to the planning skill. It knows about our workflow structure."

#### Test 2: Ask About Planning

**In Copilot Chat, type:**

```
When do I need to create an implementation plan?
```

**Wait for response:**

> "Look at this - it's pulling from the planning skill and explaining the distinction between trivial and non-trivial changes."

**Show if it references:** `docs/plans/` location and format

> "It knows where plans go and what format to use."

#### Test 3: Ask About Verification

**In Copilot Chat, type:**

```
What do I need to include in a PR?
```

**Wait for response:**

> "Perfect - it's mentioning:"

- `pnpm verify` output
- Verification evidence
- Screenshots for UI changes
- Clear description of changes

**Point to:** References to verification skill or AGENTS.md

> "This is the verification skill in action."

#### Test 4: Simulate a Real Task (The Big One)

**In Copilot Chat, type:**

```
I need to add a new "Timeline" component to libs/shadcnui. It should display a vertical timeline with events. Walk me through what I should do.
```

**Wait for Copilot's response:**

**Expected behavior - look for:**

- [ ] Mentions this is non-trivial (multiple files)
- [ ] Suggests creating an implementation plan
- [ ] References `docs/plans/` location
- [ ] Mentions plan format (YYYY-MM-DD-slug.md)
- [ ] Suggests plan should include:
  - Files to create (Timeline.tsx, Timeline.test.tsx, Timeline.stories.tsx)
  - Commands to run (tests, build, verify)
  - Acceptance criteria
- [ ] References workflow skills or AGENTS.md

**Show Copilot's response on screen:**

> "Look at this structured approach. It's not just telling me to create the files - it's following our workflow:"

**Read through Copilot's response, highlighting:**

- Plan creation suggestion
- Task breakdown
- Verification expectations

**If Copilot provides a plan structure, show it:**

> "It's even offering a plan structure based on our template."

#### Test 5: Ask for Evidence Requirements

**In Copilot Chat, type:**

```
What evidence do I need to provide when I'm done with the Timeline component?
```

**Wait for response:**

**Expected to mention:**

- `pnpm verify` output
- Test results
- Storybook screenshot (since it's a UI component)
- Build success

> "Again, pulling from the verification skill. It knows UI components need visual evidence."

---

### What We've Accomplished (1 minute)

**Show:** Back to `docs/workflow-improvements/implementation-plan.md`

**Scroll to Progress Summary:**

> "Phase 0 was the setup and assessment. Phase 1 created AGENTS.md and the workflow skills. Phase 2 added the verification command. Those are complete."

**Show checkmarks:**

- ✅ Phase 0: Setup
- ✅ Phase 1: AGENTS.md and Skills
- ✅ Phase 2: Verification Command
- 🟡 Phase 3: Documentation Updates (mostly done)

> "We're about three-quarters complete with the full workflow system. Phase 3 documentation is being finalized now."

---

### Why This Matters (20 seconds)

**Show:** AGENTS.md side-by-side with copilot-instructions.md

> "Here's why this three-layer approach is powerful:"

**Point to copilot-instructions.md:**

> "Layer 1 handles _what_ - TypeScript rules, React patterns, tech stack."

**Point to .instructions.md files:**

> "Layer 2 handles _where_ - domain-specific rules for specific files."

**Point to AGENTS.md:**

> "Layer 3 handles _how_ - process, workflow, behavior."

> "By separating these concerns, we get:"

1. Clear, maintainable instructions
2. Agents that follow consistent workflows
3. Quality gates built into the process
4. Reviewable, well-documented changes

**Show:** The `pnpm verify` command in terminal

> "And it all comes together in tools like this - verification as a single command."

---

### Next Steps (20 seconds)

**Show:** GitHub repository

> "What's next after Phase 0?"

- Phase 3: Complete documentation integration
- Phase 4: Evaluate domain-specific AGENTS.md files
- Phase 5: Validation and testing

> "But more importantly - you can use this pattern in your own repositories. The three-layer model, workflow skills, verification commands - these are patterns you can adopt."

---

### Closing (20 seconds)

> "WallRun is more than a digital signage framework - it's a case study in how to structure projects for effective AI-assisted development."

**Show:** Links in description

> "All the files I showed are in the repository. Check out:"

- AGENTS.md
- The skills directory
- docs/ai/target-operating-model.md - which documents this entire approach

> "In the next video, I'll show how we use this workflow system to actually build signage components. Thanks for watching!"

---

## Post-Recording Checklist

- [ ] Verify all Copilot responses shown are accurate
- [ ] Add title card: "Phase 0: Copilot Workflow System"
- [ ] Add chapter markers:
  - 0:00 Introduction
  - 0:45 Three-Layer Model
  - 2:45 Workflow Skills
  - 4:45 Implementation Plans
  - 5:45 Verification Command
  - 6:45 Testing In Action
  - 11:00 What We've Accomplished
  - 11:20 Why This Matters
  - 11:40 Next Steps
  - 12:00 Closing
- [ ] Add description with links:
  - AGENTS.md: [direct link]
  - Skills directory: [direct link]
  - Target operating model: [direct link]
  - Implementation plan: [direct link]
  - GitHub Copilot custom instructions docs
- [ ] Add timestamps for each test interaction
- [ ] Add relevant tags: #GitHubCopilot #AI #Workflow #DevTools #Productivity
- [ ] Create thumbnail highlighting "Copilot Workflow System"
- [ ] Pin comment asking: "How do you structure AI workflows in your projects?"

---

## Troubleshooting

**If Copilot doesn't reference the right files:**

- Verify Copilot instruction files are enabled in settings
- Check `github.copilot.chat.codeGeneration.useInstructionFiles` setting
- Restart VS Code if needed
- Try asking "What instructions are you using?" explicitly

**If Copilot gives generic responses:**

- Be more specific in questions: "According to this repo's workflow..."
- Reference specific files: "Based on AGENTS.md, what should I do?"
- Show the file first, then ask about it in chat

**If verify command fails:**

- This is actually good for demo! Shows the command working
- Can introduce an intentional error to show failure detection
- Then fix and show it pass

**Backup plan if live demo fails:**

- Show pre-recorded Copilot responses via screenshots
- Explain what _should_ happen based on the files
- Focus more on file structure and less on live interaction

---

## Advanced Section (Optional - if time)

### Show Nested Context

**Open:** A file in `apps/client/src/app/`

**In Copilot Chat:**

```
I'm adding a new route. What do I need to know?
```

**Show:** It should reference both copilot-instructions.md AND react-spa-router.instructions.md

> "See how it's combining global and path-specific instructions? That's the layered system at work."

### Show Custom Agent

**In Copilot Chat:**

```
@BrightSign Deploy help me package this app for a player
```

**If available, show custom agent response:**

> "We even have custom agent modes for specialized tasks. This one knows BrightSign deployment workflows."

---

## Notes for Presenter

- **Energy**: Keep it technical but enthusiastic - this is genuinely innovative
- **Pacing**: The live Copilot tests will vary in timing - be ready to adapt
- **Repetition**: Don't be afraid to repeat key concepts (3 layers, workflow skills)
- **Show your work**: Keep files visible, use split screen effectively
- **Engagement**: Ask rhetorical questions: "How does it know this?" point to the files
- **Authenticity**: If Copilot gives an unexpected response, roll with it and explain
