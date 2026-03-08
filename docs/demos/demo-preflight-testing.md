# Demo Pre-Flight Testing Guide

**Purpose:** Test that Copilot is correctly using our instruction files before recording demos  
**When to use:** Before recording Phase 0 demo, or any time you want to verify Copilot behavior

---

## Prerequisites

1. **Enable instruction files:**
   - Open VS Code Settings (Cmd/Ctrl + ,)
   - Search for: `copilot instruction`
   - Ensure **"GitHub Copilot: Enable Custom Instructions"** is checked
   - Verify setting: `github.copilot.chat.codeGeneration.useInstructionFiles` = `true`

2. **Restart VS Code** after enabling (if it was previously disabled)

3. **Verify branch:** Ensure you're on `main` or `docs/phase-0-demo-prep` with latest changes

---

## Test Suite

### Test 1: Verify Global Instructions

**Open:** Any `.ts` or `.tsx` file in the project

**In Copilot Chat, ask:**

```
What TypeScript conventions should I follow in this repository?
```

**Expected response should mention:**

- ✅ Strict TypeScript, no `any`
- ✅ Use `type` for object shapes
- ✅ Named exports only (no default exports)
- ✅ Reference to copilot-instructions.md or global conventions

**Pass criteria:** At least 3 of 4 items mentioned

**If fails:** Check that `.github/copilot-instructions.md` exists and instruction files are enabled

---

### Test 2: Verify Path-Scoped Instructions

**Open:** `apps/client/src/app/App.tsx`

**In Copilot Chat, ask:**

```
What routing patterns should I use in this file?
```

**Expected response should mention:**

- ✅ React Router v7
- ✅ Route configuration location (App.tsx)
- ✅ Lazy loading for code splitting
- ✅ Reference to react-spa-router instructions

**Pass criteria:** At least 2 of 4 items mentioned

**If fails:**

- Verify `applyTo` pattern in `.github/instructions/react-spa-router.instructions.md`
- Ensure file path matches the `applyTo` glob pattern

---

### Test 3: Verify AGENTS.md Recognition

**In Copilot Chat, ask:**

```
How should I approach adding a new feature to this repository?
```

**Expected response should mention:**

- ✅ Assess complexity (trivial vs non-trivial)
- ✅ Create implementation plan for non-trivial work
- ✅ Work incrementally with small commits
- ✅ Run verification before PR
- ✅ Reference to AGENTS.md or workflow guidance

**Pass criteria:** At least 3 of 5 items mentioned

**If fails:** Check that `AGENTS.md` exists at repository root

---

### Test 4: Verify Planning Skill

**In Copilot Chat, ask:**

```
When do I need to create an implementation plan?
```

**Expected response should mention:**

- ✅ Distinction between trivial and non-trivial changes
- ✅ Examples of when planning is required (multi-file, refactoring, new features)
- ✅ Location of plans (`docs/plans/`)
- ✅ Plan format (YYYY-MM-DD-slug.md)
- ✅ Reference to planning skill or planning workflow

**Pass criteria:** At least 3 of 5 items mentioned

**If fails:**

- Verify `.github/skills/planning/workflows/detailed-guide.md` exists
- Check that AGENTS.md references the skill

---

### Test 5: Verify Verification Skill

**In Copilot Chat, ask:**

```
What do I need to include in a pull request?
```

**Expected response should mention:**

- ✅ `pnpm verify` command output
- ✅ Verification evidence (lint, type-check, tests)
- ✅ Screenshots for UI changes
- ✅ Clear PR description
- ✅ Reference to verification skill or PR requirements

**Pass criteria:** At least 3 of 5 items mentioned

**If fails:**

- Verify `.github/skills/verification/workflows/detailed-guide.md` exists
- Check that AGENTS.md references verification workflow

---

### Test 6: Verify Systematic Debugging Skill

**In Copilot Chat, ask:**

```
How should I debug an issue in this repository?
```

**Expected response should mention:**

- ✅ Understand the problem first
- ✅ Reproduce reliably
- ✅ Find root cause (not just symptoms)
- ✅ Verify the fix works
- ✅ Reference to systematic-debugging skill or debugging workflow

**Pass criteria:** At least 3 of 5 items mentioned

**If fails:** Verify `.github/skills/systematic-debugging/workflows/detailed-guide.md` exists

---

### Test 7: Verify Code Review Skill

**In Copilot Chat, ask:**

```
How can I make my changes easy to review?
```

**Expected response should mention:**

- ✅ Keep PRs small (< 500 lines)
- ✅ One logical change per PR
- ✅ No drive-by refactors
- ✅ Clear description with trade-offs
- ✅ Reference to code-review-ready skill

**Pass criteria:** At least 3 of 5 items mentioned

**If fails:** Verify `.github/skills/code-review-ready/workflows/detailed-guide.md` exists

---

### Test 8: Verify pnpm verify Command Knowledge

**In Copilot Chat, ask:**

```
What verification command should I run before creating a PR?
```

**Expected response should mention:**

- ✅ `pnpm verify` command
- ✅ What it does (format, lint, type-check, test, build)
- ✅ Uses affected commands (Nx)
- ✅ Should run successfully before PR

**Pass criteria:** At least 3 of 4 items mentioned

**If fails:**

- Check that `package.json` has `verify` script
- Verify AGENTS.md or verification skill mentions the command

---

### Test 9: Context Integration (Advanced)

**In Copilot Chat, ask:**

```
I need to add a new "Tooltip" component to libs/shadcnui. Walk me through the process.
```

**Expected response should integrate multiple sources:**

- ✅ Mentions creating implementation plan (from AGENTS.md)
- ✅ Files to create: Component.tsx, Component.test.tsx, Component.stories.tsx
- ✅ Testing requirements (80% coverage, Vitest)
- ✅ Accessibility requirements (ARIA, keyboard nav)
- ✅ Storybook story needed
- ✅ Export from index.ts
- ✅ Run `pnpm verify` when done

**Pass criteria:** At least 5 of 7 items mentioned

**If fails:** This is a comprehensive test - check all previous tests first

---

### Test 10: Real Task Simulation (Full Workflow)

**In Copilot Chat, ask:**

```
I need to add a new route "/components/timeline" to the client app that shows a Timeline component. What's the complete workflow?
```

**Expected comprehensive response including:**

- ✅ Assess as non-trivial (multiple files, new feature)
- ✅ Create implementation plan in docs/plans/
- ✅ Plan should include:
  - Create route in App.tsx
  - Create Timeline page component
  - Update navigation if needed
  - Add tests
- ✅ Work incrementally
- ✅ Use path-specific routing conventions
- ✅ Run `pnpm verify` before PR
- ✅ Include evidence in PR (screenshot of new page)

**Pass criteria:** At least 6 of 8 items mentioned

**If fails:** This test combines everything - troubleshoot individually

---

## Troubleshooting

### Copilot gives generic, non-project-specific answers

**Possible causes:**

1. Instruction files not enabled in settings
2. Need to restart VS Code
3. Files not in expected locations
4. YAML frontmatter errors in instruction files

**Solutions:**

1. Check settings: `github.copilot.chat.codeGeneration.useInstructionFiles`
2. Restart VS Code
3. Verify file paths match documentation
4. Validate YAML syntax in `.instructions.md` files

### Copilot doesn't reference specific files (AGENTS.md, skills)

**Possible causes:**

1. Files too large (unlikely, but possible)
2. Copilot context window limitations
3. Files not in standard locations

**Solutions:**

1. Check file sizes (should be reasonable)
2. Try more specific questions: "According to AGENTS.md, what should I do?"
3. Verify file locations match conventions

### Copilot references old/outdated guidance

**Possible causes:**

1. Cached context from previous workspace state
2. Old instruction files still present
3. Conflicting instructions

**Solutions:**

1. Close and reopen workspace
2. Check for duplicate or old instruction files
3. Review for conflicting guidance

### Responses are inconsistent between test runs

**Expected behavior:** Some variation is normal - AI responses aren't deterministic

**Action:**

- If core facts are correct (even if phrasing varies), that's a pass
- Focus on whether key concepts appear, not exact wording
- Run tests 2-3 times if concerned

---

## Quick Validation Command

Run this to check all critical files exist:

```bash
# Check critical files
test -f .github/copilot-instructions.md && echo "✅ Global instructions" || echo "❌ Missing global instructions"
test -f AGENTS.md && echo "✅ AGENTS.md" || echo "❌ Missing AGENTS.md"
test -f .github/skills/planning/workflows/detailed-guide.md && echo "✅ Planning skill" || echo "❌ Missing planning skill"
test -f .github/skills/verification/workflows/detailed-guide.md && echo "✅ Verification skill" || echo "❌ Missing verification skill"
test -f .github/skills/systematic-debugging/workflows/detailed-guide.md && echo "✅ Debugging skill" || echo "❌ Missing debugging skill"
test -f .github/skills/code-review-ready/workflows/detailed-guide.md && echo "✅ Review skill" || echo "❌ Missing review skill"
test -f docs/plans/README.md && echo "✅ Plans directory" || echo "❌ Missing plans README"
grep -q '"verify":' package.json && echo "✅ Verify script" || echo "❌ Missing verify script"
```

**Expected output:** All ✅ checks

---

## Recording Readiness Checklist

Before recording the demo, ensure:

- [ ] All 10 tests pass (at least meet pass criteria)
- [ ] Quick validation command shows all ✅
- [ ] Instruction files setting is enabled
- [ ] VS Code restarted after any changes
- [ ] Copilot responses are consistent across 2-3 test runs
- [ ] Any known issues documented with workarounds
- [ ] Example questions prepared with expected responses noted

---

## Test Log Template

Use this to document your test results:

```markdown
## Pre-Flight Test Results - [Date]

**Tester:** [Name]  
**Branch:** [branch name]  
**VS Code Version:** [version]  
**Copilot Version:** [version]

### Test Results

| Test                        | Status | Notes |
| --------------------------- | ------ | ----- |
| 1. Global Instructions      | ✅/❌  |       |
| 2. Path-Scoped Instructions | ✅/❌  |       |
| 3. AGENTS.md Recognition    | ✅/❌  |       |
| 4. Planning Skill           | ✅/❌  |       |
| 5. Verification Skill       | ✅/❌  |       |
| 6. Debugging Skill          | ✅/❌  |       |
| 7. Code Review Skill        | ✅/❌  |       |
| 8. pnpm verify Knowledge    | ✅/❌  |       |
| 9. Context Integration      | ✅/❌  |       |
| 10. Full Workflow           | ✅/❌  |       |

**Overall:** ✅ Ready to record / ❌ Needs fixes

**Issues found:** [List any issues]

**Workarounds needed:** [List any workarounds for recording]
```

---

## Notes

- Test suite should take 10-15 minutes to complete
- Re-run before each recording session
- Document any deviations for troubleshooting
- Keep a log of Copilot responses for reference during recording
