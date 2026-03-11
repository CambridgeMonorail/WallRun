# Help: AI Tooling Guide

**Description**: Shows all available AI tools and how to use them.

**Prompt**:
Display the following guide to help the user navigate the AI tooling in this repository:

---

## 🎯 Quick Reference: AI Tooling

### Prompts (Type `/` to use)

**For specific, repeatable tasks:**

- `/help` - Show this guide
- `/commit` - Stage, commit, and push changes with conventional commit format
- `/create-signage-placeholders` - Plan placeholder image references for signage layouts before final artwork exists
- `/pr-desc` - Generate a structured PR description from your changes
- `/implement-next` - Read the active plan and implement the next unchecked task
- `/mcp-check` - Verify Model Context Protocol (MCP) server setup

### Agents (Mention `@agent-name`)

**For specialized roles requiring sustained context:**

- `@requirements-planner` - Transform requirements into actionable implementation plans
- `@ui-designer` - UI/UX design review and recommendations
- `@shadcnui-component-reviewer` - End-to-end shadcn/ui component review (standards, accessibility, tests)
- `@signage-architect` - Signage-focused architecture and layout guidance
- `@instructions-detox` - Extract/organize scoped instructions for focused work
- `@custom-agent-foundry` - Create new custom agents following repo conventions

### Skills (Just ask!)

**For complex workflows:**

- "Create a plan for..." → Uses `planning` skill
- "Plan placeholder images for this signage screen..." → Uses `signage-placeholder-images` skill
- "Debug this issue..." → Uses `systematic-debugging` skill
- "Review this component..." → Uses `shadcnui-component-review` skill
- "Is this PR ready?" → Uses `code-review-ready` skill

### Documentation

- **[AI-Assisted Feature Workflow](../../docs/getting-started/ai-assisted-feature-workflow.md)** - Step-by-step guide
- **[AI Tooling Architecture](../AI-TOOLING.md)** - Deep dive into the 6 pillars
- **[AGENTS.md](../../AGENTS.md)** - Workflow discipline and best practices

### Workflow

1. Plan: `@requirements-planner` → Create `docs/plans/YYYY-MM-DD-feature.md`
2. Implement: `/implement-next` → Execute one task at a time
3. Verify: `pnpm verify` → Run validation
4. Ship: `/commit` + `/pr-desc` → Standard formats

---

**Need more details?** Ask: "Explain [tool name] in detail"
