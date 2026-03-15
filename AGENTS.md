# Agent Workflow Guide

This document provides behavioral guidance for GitHub Copilot agents working in this repository. It defines **how to approach work**, not code patterns (those are in `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md`).

## Core Principles

When working as an agent in this repository:

1. **Plan before acting** - For non-trivial changes, create a plan first
2. **Work incrementally** - Make small, reviewable commits
3. **Verify your work** - Run validation before declaring completion
4. **Document your decisions** - Explain trade-offs and reasoning
5. **Respect existing patterns** - Follow established conventions

## How to Approach Tasks

### 1. Understand the Request

- Read the issue or request carefully
- Ask clarifying questions if requirements are ambiguous
- Identify the scope (single file vs. multi-file change)
- Check for related existing code or patterns

### 2. Assess Complexity

**Trivial changes** (no plan needed):

- Fixing typos or formatting
- Updating documentation
- Single-line bug fixes
- Renaming variables

**Non-trivial changes** (plan required):

- New features or components
- Refactoring multiple files
- Changes affecting multiple projects
- Architectural decisions

### 3. Create a Plan (for non-trivial work)

**Plan location:** `docs/plans/YYYY-MM-DD-<slug>.md`

**Quick plan structure:**

- Goal/objective
- Context and background
- Task breakdown with acceptance criteria
- Files to change
- Commands to run
- Expected results

**Example:** `docs/plans/2026-01-28-add-button-variant.md`

### 4. Work Incrementally

- Break work into small, logical steps
- Commit after each logical change
- Run tests after each step
- Keep PRs focused (< 500 lines when possible)

### 5. Verify Before Completion

Before declaring work complete:

```bash
# Run the verification command
pnpm verify
```

This runs:

- Format check
- Lint (affected projects)
- Type check (affected projects)
- Tests (affected projects)

## Definition of Done

Work is complete when:

- ✅ **Code follows conventions** - Lint and type-check pass
- ✅ **Tests written and passing** - For new features and bug fixes
- ✅ **Documentation updated** - README, comments, or guides as needed
- ✅ **Verification passes** - `pnpm verify` runs successfully
- ✅ **Changes are reviewable** - Small diffs, clear commit messages
- ✅ **Evidence provided** - PR includes verification output

## Workflow Skills

Domain-specific skills are in `skills/`. See `skills/README.md` for the full catalogue.

Key signage skills:

- **signage-layout-system** — Full-screen layouts for distance viewing and clear zoning
- **signage-animation-system** — Loop-safe motion for always-on public displays
- **signage-menu-board** — Food and service menu boards with price hierarchy
- **signage-distance-legibility** — Minimum text sizes, contrast, and density for viewing at distance
- **signage-safe-layout** — Overscan, bezel, rotation, and resolution-independent constraints
- **signage-state-machine** — Boot/load/content/fallback/offline state patterns for 24/7 displays
- **signage-data-refresh-patterns** — Polling, backoff, and non-blocking data updates
- **signage-performance-budget** — Bundle size, image weight, and frame-rate budgets for embedded hardware
- **signage-content-fallbacks** — Graceful degradation when APIs or feeds fail
- **instructions-detox** — Audit instruction files for bloat, overlap, and stale rules

## Commit Discipline

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `test:` - Adding or correcting tests
- `chore:` - Maintenance tasks

**Examples:**

```
feat(shadcnui): add variant prop to Button component

Add new variant prop with options: default, destructive, outline, ghost.
Updates Button.tsx and Button.test.tsx.

Closes #123
```

```
fix(client): resolve routing issue on page refresh

The router was losing state on refresh. Added persistent state
management using sessionStorage.

Fixes #456
```

### Commit Size

- **Small commits** - One logical change per commit
- **Atomic commits** - Each commit should leave the codebase in a working state
- **Focused commits** - Don't mix unrelated changes

## Testing Workflow

### For New Features

1. Identify the smallest testable unit
2. Write tests colocated with implementation (`Component.tsx` + `Component.test.tsx`)
3. Run affected tests: `pnpm test:affected`
4. Verify coverage meets 80% threshold
5. Include test results in PR description

### For Bug Fixes

1. **Understand the problem** — Reproduce reliably, gather evidence
2. **Find the root cause** — Use debugging techniques, not guesswork
3. **Write a failing test** — Exposes the bug before fixing
4. **Fix the root cause** — Not just symptoms
5. **Verify the fix** — Test passes, no regressions
6. **Document what changed and why** — In commit message and PR description

## Common Validation Commands

```bash
# Quick verification (recommended)
pnpm verify

# Full pre-commit check (comprehensive)
pnpm precommit

# Affected projects only (fastest)
pnpm lint:affected
pnpm type-check:affected
pnpm test:affected
pnpm build:affected

# Specific project
pnpm lint:shadcnui
pnpm test:client
pnpm type-check:shadcnui
```

## What NOT to Do

### ❌ Avoid Scope Creep

- Don't make broad refactors without explicit request
- Don't mix unrelated changes in one PR
- Don't change files outside the scope of the task

### ❌ Avoid Breaking Builds

- Never commit code that fails lint or type-check
- Never skip tests
- Never push broken code

### ❌ Avoid Poor Communication

- Don't skip PR descriptions
- Don't omit verification evidence
- Don't leave TODO comments without creating follow-up issues
- Don't make architectural decisions without discussion

### ❌ Avoid Inventing New Patterns

- Don't create new scripts without discussion
- Don't introduce new libraries without approval
- Don't deviate from established patterns without good reason

## PR Requirements

Every PR must include:

### 1. Clear Description

- What changed and why
- Context and motivation
- Trade-offs and decisions made

### 2. Verification Evidence

```markdown
## Verification

\`\`\`bash
pnpm verify
\`\`\`

Output:
✓ Format check passed
✓ Lint passed (affected: client, shadcnui)
✓ Type check passed (affected: client, shadcnui)
✓ Tests passed (affected: client, shadcnui)
```

### 3. Visual Evidence (for UI changes)

- Screenshots of before/after
- Video of interaction if applicable
- Accessibility testing notes

### 4. Testing Notes

- What you tested manually
- Any edge cases considered
- Any known limitations

## Debugging Approach

When debugging issues, follow a systematic process:

1. **Understand the problem** — Reproduce reliably, gather evidence
2. **Find root cause** — Use debugging techniques, not guesswork
3. **Minimize reproduction** — Simplify to smallest failing case
4. **Fix correctly** — Address the underlying issue, not symptoms
5. **Verify thoroughly** — Ensure fix works and doesn't break other things
6. **Document** — Explain what was wrong and how you fixed it

## Repository Context

### Monorepo Structure

This is an Nx + pnpm monorepo with:

- **Apps:** `apps/client` (React SPA)
- **Libs:** `shadcnui`, `shadcnui-blocks`, `shell`, `landing`, `common-tailwind`
- **Tooling:** Nx 22.4.1, Vite 7.1.3, React 19.0.0, TypeScript 5.9.3

### Always Use Nx Affected

Don't guess which projects are affected:

```bash
# Let Nx determine affected scope
pnpm run build:affected
pnpm run test:affected
pnpm run lint:affected
```

### Library Dependencies

- Apps import from libs
- Libs never import from apps
- Use workspace imports: `@tsa/shadcnui`, `@tsa/shell`
- Use relative imports within same project

## Getting Help

### Existing Resources

- **Copilot Instructions:** `.github/copilot-instructions.md` (code rules)
- **Path-specific Instructions:** `.github/instructions/*.instructions.md`
- **Custom Agents:** `.github/agents/*.agent.md`
- **Documentation:** `docs/` directory

### When Stuck

1. Check existing code for similar patterns
2. Review relevant instruction files
3. Search docs for related guidance
4. Ask clarifying questions rather than guessing

## Examples

### Example: Adding a New shadcn/ui Component

1. **Plan:** Create plan in `docs/plans/2026-01-28-add-select-component.md`
2. **Research:** Check shadcn/ui docs for Select component
3. **Create:** Add component to `libs/shadcnui/src/lib/input-controls/select/`
4. **Test:** Add `Select.test.tsx` with thorough coverage
5. **Story:** Add `Select.stories.tsx` for Storybook
6. **Export:** Update `libs/shadcnui/src/index.ts`
7. **Verify:** Run `pnpm verify`
8. **Commit:** `feat(shadcnui): add Select component`
9. **PR:** Include verification evidence and Storybook screenshot

### Example: Fixing a Bug

1. **Reproduce:** Create minimal failing test case
2. **Debug:** Follow systematic debugging process
3. **Test:** Write test that would catch the bug
4. **Fix:** Implement the fix
5. **Verify:** Ensure test passes, run `pnpm verify`
6. **Document:** Explain root cause in commit message
7. **Commit:** `fix(client): resolve state loss on route change`
8. **PR:** Include before/after behavior and test evidence

## Version Control

This guidance applies to GitHub Copilot agent mode. For code generation and inline completions, see `.github/copilot-instructions.md`.

**Last Updated:** 2026-01-28
