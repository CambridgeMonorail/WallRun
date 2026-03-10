# Target Operating Model: Copilot Instruction Architecture

**Last Updated:** 2026-03-08

This document describes how GitHub Copilot instructions are organized in this repository and how they work together to guide agent behavior.

## Overview

The Sign Age uses a **three-layer instruction model** to provide comprehensive guidance for GitHub Copilot agents and inline completions:

```
┌─────────────────────────────────────────────────┐
│  Layer 1: Repository-Wide Instructions         │
│  .github/copilot-instructions.md               │
│  • Global conventions (TypeScript, React, etc.)│
│  • Technology stack and architecture           │
│  • Monorepo structure and conventions          │
└─────────────────────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────┐
│  Layer 2: Path-Scoped Instructions             │
│  .github/instructions/*.instructions.md        │
│  • Domain-specific patterns                    │
│  • Applied based on file path (applyTo)        │
│  • Examples: React routing, UI patterns, etc.  │
└─────────────────────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────┐
│  Layer 3: Agent Workflow Guidance              │
│  AGENTS.md (root and nested)                   │
│  • How agents should work (not what to code)   │
│  • Planning, debugging, verification processes │
│  • Commit discipline and PR requirements       │
└─────────────────────────────────────────────────┘
```

### Supporting Elements

- **Workflow Skills** (`skills/*/workflows/detailed-guide.md`) - Structured process guides, mirrored to `.github/skills/` for Copilot compatibility
- **Custom Agents** (`.github/agents/*.agent.md`) - Specialized agent modes
- **Implementation Plans** (`docs/plans/`) - Structured task plans for non-trivial work

## Layer 1: Repository-Wide Instructions

**File:** [.github/copilot-instructions.md](../../.github/copilot-instructions.md)

### Purpose

Defines global conventions that apply across the entire repository:

- Programming language conventions (TypeScript, React)
- Technology stack and tooling
- Monorepo structure (Nx workspace layout)
- Library organization and dependencies
- Testing and accessibility baselines

### When This Applies

- **Always** - These instructions are active for all files in the repository
- Both agent mode and inline completions reference this file
- Sets the foundation for all other instructions

### What Goes Here

✅ **DO include:**

- Language and framework conventions
- Project structure and architecture
- Technology stack versions and decisions
- Global coding standards
- Library import patterns
- Accessibility and testing requirements

❌ **DON'T include:**

- Workflow guidance (belongs in AGENTS.md)
- Path-specific patterns (belongs in .instructions.md files)
- Detailed implementation processes (belongs in skills)

### Example

```markdown
## Global TypeScript Conventions

- Use strict TypeScript with no `any` (use `unknown` with type guards)
- Prefer `type` for object shapes, unions, intersections
- Use `interface` only when extending or merging definitions
- Named exports only (no default exports)
```

## Layer 2: Path-Scoped Instructions

**Directory:** [.github/instructions/](../../.github/instructions/)

### Purpose

Provides domain-specific guidance that only applies to certain files based on their path:

- React SPA routing patterns (`react-spa-router.instructions.md`)
- UI component conventions (`ui-and-accessibility.instructions.md`)
- Testing patterns (`testing-and-quality.instructions.md`)
- Style guide compliance (`style-guide-compliance.instructions.md`)

### When This Applies

Instructions activate based on the `applyTo` glob pattern in their YAML frontmatter:

```yaml
---
applyTo:
  - apps/client/**/*.{ts,tsx}
  - libs/shell/**/*.{ts,tsx}
---
```

When you're editing a file that matches the pattern, that instruction file becomes active.

### What Goes Here

✅ **DO include:**

- Domain-specific coding patterns
- Component architecture for specific areas
- Path-specific conventions (e.g., routing in apps/client)
- Library-specific testing approaches
- UI/UX patterns for specific projects

❌ **DON'T include:**

- Global conventions (use copilot-instructions.md)
- Workflow processes (use AGENTS.md)
- Multi-step implementation guides (use skills)

### Example

```markdown
# React SPA Router Instructions

## Route Configuration

- All routes defined in `apps/client/src/app/App.tsx`
- Use React Router v7 with data loading patterns
- Lazy load route components for code splitting
```

## Layer 3: Agent Workflow Guidance

**Files:**

- [AGENTS.md](../../AGENTS.md) (root level)
- Optional nested AGENTS.md in apps/libs (if needed)

### Purpose

Defines **how agents should work**, not what code to write:

- How to approach tasks (planning, incremental work)
- When to create implementation plans
- Commit discipline and PR requirements
- Verification workflow (`pnpm verify`)
- Debugging methodology
- Definition of done

### When This Applies

- **Agent mode only** - Not used for inline completions
- Active throughout agent interactions
- Provides behavioral guidance and process expectations

### What Goes Here

✅ **DO include:**

- Task approach methodology
- Planning requirements (when to create docs/plans)
- Commit message conventions and size expectations
- PR requirements and evidence expectations
- Verification workflow (pnpm verify)
- Debugging approach references
- Definition of done checklist

❌ **DON'T include:**

- Code patterns or conventions (use instructions)
- Detailed implementation steps (use skills)
- Technology-specific guidance (use copilot-instructions.md)

### Example

```markdown
## How to Approach Tasks

### 1. Understand the Request

- Read the issue or request carefully
- Ask clarifying questions if requirements are ambiguous
- Identify the scope (single file vs. multi-file change)

### 2. Assess Complexity

**Trivial changes** (no plan needed):

- Fixing typos or formatting
- Single-line bug fixes
```

## Workflow Skills

**Directory:** [skills/](../../skills/)

### Purpose

Structured, repeatable process guides for common workflows:

- **Planning** - How to create implementation plans
- **Systematic Debugging** - Root cause analysis process
- **Code Review Ready** - Making changes reviewable
- **Verification** - PR evidence requirements
- **BrightSign Deploy** - Player deployment workflows
- **Chrome DevTools Debug** - Web app debugging with MCP

### Structure

Each skill has:

```
skills/skill-name/
├── SKILL.md                      # Short description for skill discovery
└── workflows/
    └── detailed-guide.md         # Comprehensive workflow guide
```

`.github/skills/` is generated from this tree for GitHub Copilot-native repository support.

### When to Reference

- AGENTS.md references skills for detailed processes
- Agents invoke skills when they need structured guidance
- Skills provide "how to do X" where AGENTS.md provides "when to do X"

### Example

From [Planning Skill](../../skills/planning/workflows/detailed-guide.md):

```markdown
## When Planning is Required

**REQUIRED** - Must create a plan:

- New features spanning multiple files
- Refactoring that affects multiple projects
- Architectural changes or pattern introductions
```

## Custom Agents

**Directory:** [.github/agents/](../../.github/agents/)

### Purpose

Specialized agent modes with specific expertise and tool restrictions:

- **BrightSign Deploy** - Player deployment and packaging
- **Custom Agent Foundry** - Creating new agent customizations
- **Instructions Detox** - Optimizing instruction files
- **UI Design Reviewer** - UX/UI critique and recommendations

### When to Use

Invoke custom agents via `@agent-name` or through the subagent tool when:

- Task requires specialized domain knowledge
- Need restricted tool access for safety
- Want consistent, repeatable specialist behavior

## Implementation Plans

**Directory:** [docs/plans/](../../docs/plans/)

### Purpose

Structured task plans created for non-trivial work:

- Feature implementation plans
- Multi-file refactoring plans
- Bug fix investigation plans
- Deployment process plans

### Format

Plans follow the template in [docs/plans/README.md](../../docs/plans/README.md):

```markdown
# Task Title

**Date:** YYYY-MM-DD
**Status:** Not Started | In Progress | Complete

## Goal

Clear statement of what needs to be accomplished.

## Context

Background and motivation for the task.

## Task Breakdown

### Task 1: [Description]

- **Files to change:** [list]
- **Command(s) to run:** [commands]
- **Expected result:** [observable outcome]
- **Acceptance checks:** [verification steps]
```

### Integration with AGENTS.md

Plans are referenced in AGENTS.md as part of the workflow. Agents are expected to:

1. Assess task complexity
2. Create plan for non-trivial work
3. Reference plan throughout implementation
4. Update plan status as work progresses

## How They Work Together

### Scenario: Adding a New React Component

1. **Layer 1** (copilot-instructions.md) provides:
   - TypeScript conventions (no `any`, named exports)
   - React conventions (functional components, hooks)
   - Testing requirements (Vitest, 80% coverage)

2. **Layer 2** (ui-and-accessibility.instructions.md) provides:
   - Component file structure
   - Accessibility requirements (ARIA, keyboard nav)
   - Tailwind CSS patterns

3. **Layer 3** (AGENTS.md) provides:
   - Assess if plan needed (new component = non-trivial)
   - Create plan in docs/plans/
   - Work incrementally with small commits
   - Run `pnpm verify` before PR
   - Include verification evidence

4. **Workflow Skill** (verification) provides:
   - Specific commands to run
   - Evidence template for PR
   - What constitutes successful verification

5. **Implementation Plan** (docs/plans/2026-03-08-new-component.md):
   - Task breakdown
   - Files to create/modify
   - Acceptance criteria
   - Progress tracking

### Scenario: Fixing a Bug

1. **Layer 1**: TypeScript and testing conventions
2. **Layer 2**: Domain-specific patterns (routing, state management)
3. **Layer 3**:
   - Reference **Systematic Debugging** skill
   - Follow 6-step debugging process
   - Create plan if root cause analysis is complex
4. **Systematic Debugging Skill**: Detailed root cause analysis process
5. **Plan** (if created): Investigation steps and fix approach

## Best Practices

### For Maintainers

1. **Keep copilot-instructions.md focused on code conventions**
   - Review quarterly and remove bloat
   - Keep it technology-focused, not process-focused

2. **Use path-scoped instructions for domain patterns**
   - Create new .instructions.md files when patterns emerge
   - Use tight `applyTo` patterns to avoid over-application

3. **Keep AGENTS.md behavioral, not technical**
   - Focus on "how to work", not "what to code"
   - Reference skills for detailed processes
   - Update when workflow changes

4. **Create skills for repeatable processes**
   - Multi-step workflows benefit from structure
   - Include examples and anti-patterns
   - Keep each skill focused on one process

5. **Evaluate nested AGENTS.md carefully**
   - Only create if workflow differs significantly
   - Don't create for code pattern differences
   - Keep focused on process, not conventions

### For Agents

1. **Read context in layers**
   - Start with copilot-instructions.md for conventions
   - Check for applicable .instructions.md files
   - Reference AGENTS.md for workflow guidance

2. **Reference skills when needed**
   - Planning skill: When starting non-trivial work
   - Systematic Debugging: When investigating issues
   - Verification: Before creating PRs
   - Code Review Ready: When preparing changes

3. **Create plans for non-trivial work**
   - Use template in docs/plans/README.md
   - Update plan as work progresses
   - Reference plan in commits and PRs

4. **Follow verification workflow**
   - Run `pnpm verify` before declaring done
   - Include evidence in PR descriptions
   - Add screenshots for UI changes

## Maintenance and Evolution

### Signs Instructions Need Attention

- **Bloat**: Instructions grow beyond ~200 lines without clear sections
- **Rot**: Instructions reference deprecated patterns or outdated tools
- **Conflict**: Instructions contradict each other
- **Duplication**: Same guidance appears in multiple places

### Review Schedule

- **Quarterly**: Review copilot-instructions.md for relevance
- **Per PR**: Verify path-scoped instructions still apply
- **After major changes**: Update AGENTS.md if workflow changes
- **As needed**: Create/update skills when processes evolve

### Getting Help

For questions or issues with the instruction architecture:

- Review [docs/workflow-improvements/](../workflow-improvements/) for context
- Reference [AGENTS.md](../../AGENTS.md) for current workflow
- Check [skills/](../../skills/) for process guides or [.github/skills/](../../.github/skills/) for the generated Copilot mirror
- See **Custom Agent Foundry** agent for instruction optimization

## Version History

- **2026-03-08**: Initial target operating model documentation
- **2026-01-28**: Implemented three-layer model (Phase 0-2 complete)
- Earlier: Ad-hoc copilot-instructions.md only
