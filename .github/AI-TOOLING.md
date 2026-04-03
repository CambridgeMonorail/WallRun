# AI Tooling Architecture

This repository uses a structured AI tooling architecture designed to provide a modern, disciplined development experience.

## The 6 Pillars of AI Tooling

### 1. Copilot for Execution

**File**: [`copilot-instructions.md`](copilot-instructions.md)
The "Constitution" of the repository. Provides the raw execution capability for code generation, ensuring all output adheres to global static coding standards (TypeScript, React, Testing).

### 2. Agents for Role Separation

**Location**: [`.github/agents/`](agents/)
Distinct roles for complex phases of the lifecycle that require a specific mindset, not just code generation.

Core agents include:

- `@requirements-planner`: Technical analysis and breakdown.
- `@ui-designer`: Visual / UX checks.
- `@signage-architect`: Signage-focused architecture and component guidance.
- `@instructions-detox`: Reduce prompt bloat by extracting scoped instructions.
- `@shadcnui-component-reviewer`: End-to-end review of shadcn/ui components.
- `@custom-agent-foundry`: Helper for creating new agents.

### 3. Workflow Discipline

**File**: [`AGENTS.md`](../AGENTS.md)
Defines the "How". It establishes the behavioral rules: Plan first, work iteratively, verify often. It binds the tools together into a coherent process.

### 4. Instruction Files for Code Shape

**Location**: [`.github/instructions/`](instructions/)
Defines the "What". Scoped rules that define the shape of the code for specific domains (Routes, UI, Testing) applied automatically to relevant files.

### 5. Specs as Durable Intent

**Location**: [`docs/plans/`](../docs/plans/)
We treat plans as code. Complex tasks, specs, and architectural decisions are written to Markdown files before code is written, preserving "Durable Intent" across sessions.

### 6. Verification as Truth

**Command**: `pnpm verify`
The Definition of Done. Scripts that provide the objective truth of ecosystem health. The AI is trained to respect the verification script as the final arbiter of success.

---

## Model Recommendations

While GitHub Copilot works with various models, we typically use **Claude Sonnet** (for complex work) and **Claude Haiku** (for mechanical tasks) because they behave more like disciplined engineers than enthusiastic interns.

Claude models tend to:

- Follow instructions and constraints with less creative wandering
- Provide stronger long-form reasoning for planning and debugging
- Degrade more gracefully under complexity (fewer hallucinations)
- Deliver consistent quality across multiple prompts
- Stick to the requested job rather than "improving" unrequested things

**In short**: Claude is not always the most creative model, but it is often the most reliable collaborator. For day-to-day engineering, reliability beats brilliance.

See [AI-Assisted Feature Workflow](../docs/getting-started/ai-assisted-feature-workflow.md#model-selection) for detailed model guidance.

---

## Directory Structure

```text
.github/
├── AI-TOOLING.md                 # This file
├── copilot-instructions.md       # Root instructions (Constitution)
├── agents/                       # Specialized Persona Agents
├── prompts/                      # Task Automation Prompts
├── skills/                       # Generated mirror for GitHub Copilot
└── instructions/                 # Path-scoped coding rules

skills/                           # Canonical portable SKILL.md source
└── <skill-name>/
```

The root `skills/` directory is the source of truth for portable skills. Run `pnpm sync:skills` to regenerate `.github/skills/` for GitHub Copilot-native discovery, and `pnpm check:skills` to verify the mirror is up to date.

## Tooling Inventory

### Prompts (`/prompts`)

**Use for**: Specific, repeatable tasks.

- `help.prompt.md`: "Show this guide" - `/help`
- `commit.prompt.md`: "Commit these changes" - `/commit`
- `pr-desc.prompt.md`: "Generate PR description" - `/pr-desc`
- `implement-next.prompt.md`: "Implement next task from plan" - `/implement-next`
- `mcp-check.prompt.md`: "Check MCP setup" - `/mcp-check`
- `validate-client.prompt.md`: "Validate my work" (Runs checks)

**How to use**: Type `/` in Chat or select from the prompt menu.

> **New to the tooling?** Start with `/help` for a quick reference guide.

### Skills (`/skills`)

**Use for**: Specialized workflows available to the default agent.

- `planning`: Structured implementation planning.
- `systematic-debugging`: 6-step root cause analysis.
- `code-review-ready`: PR preparation guidelines.
- `verification`: Validation requirements.
- `chrome-devtools-webapp-debug`: Browser debugging via MCP.
- `shadcnui-component-review`: UI component auditing.
- `signage-layout-system`: Wall-screen layout rules for large displays.
- `signage-animation-system`: Public-display motion rules and loop-safe pacing.
- `brightsign-runtime`: BrightSign-specific runtime and implementation constraints.
- `brightsign-deploy-local`: Local BrightSign deployment workflow.
- `brightsign-package`: BrightSign packaging workflow.
- `brightsign-debug`: Player diagnostics and debugging workflow.
- `brightsign-fleet-deploy`: Fleet release workflow.
- `player-discovery-scan`: LAN discovery workflow for BrightSign players.
- `player-discovery-probe`: Single-host BrightSign diagnostics.
- `player-discovery-export`: Export discovery results for sharing and support.

**How to use**: Just ask Copilot! "Create a plan for...", "Debug this...", "Review this component...".

**Portable install**: `npx skills add CambridgeMonorail/WallRun`

The open skills CLI supports GitHub shorthand, full GitHub URLs, repo paths, local paths, project installs, and global installs. In this repo, `skills/` is canonical and `.github/skills/` is a generated mirror.

### Agents (`/agents`)

**Use for**: Persistent personas for complex phases.

- `requirements-planner`: Dedicated technical analyst persona.
- `ui-designer`: UI/UX specialist.
- `signage-architect`: Digital signage-focused React architect.
- `instructions-detox`: Extract/organize instruction context.
- `shadcnui-component-reviewer`: shadcn/ui component quality review.
- `custom-agent-foundry`: Agent authoring assistant.

The `signage-architect` agent is a good orchestration layer for the signage-specific skills above when a task needs layout, motion, and BrightSign runtime guidance together.

**How to use**: Mention `@agent-name` in Chat.
