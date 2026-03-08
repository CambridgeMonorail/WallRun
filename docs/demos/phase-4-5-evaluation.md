# Phase 4 & 5 Evaluation Checklist

**Status:** 🔄 Optional - Evaluate need before proceeding  
**Date:** 2026-03-08  
**Branch:** `docs/phase-0-demo-prep`

---

## Phase 4: Optional Nested AGENTS.md Files

### Purpose

Determine if any apps or libraries need domain-specific workflow guidance that differs from the root AGENTS.md.

### Key Principle

**Only create nested AGENTS.md for workflow differences, not code pattern differences.**

- ✅ Use nested AGENTS.md for: Different verification steps, unique testing workflows, specialized deployment processes
- ❌ Don't use nested AGENTS.md for: Code patterns (use .instructions.md), Technology choices (use copilot-instructions.md)

---

## Evaluation: apps/client

### Questions to Ask

1. **Does the client app have unique testing workflows?**
   - Playwright E2E tests beyond unit tests?
   - Manual testing requirements?
   - Browser compatibility testing?

2. **Does the client app have unique deployment steps?**
   - Different from library builds?
   - BrightSign-specific packaging?
   - GitHub Pages deployment workflow?

3. **Does the client app have unique validation needs?**
   - Visual regression testing?
   - Accessibility audits?
   - Performance benchmarks?

### Current Assessment

**Testing:** 
- ✅ Has Playwright E2E tests (`apps/client-e2e/`)
- ✅ Different from library unit tests
- 🟡 **Verdict:** E2E testing workflow could warrant nested AGENTS.md

**Deployment:**
- ✅ GitHub Pages deployment
- ✅ BrightSign packaging workflow
- 🟡 **Verdict:** Deployment workflow is in skills already (brightsign-package, brightsign-deploy-local)

**Validation:**
- ⚪ No specific visual regression testing yet
- ⚪ Accessibility follows global baseline
- 🟢 **Verdict:** No unique validation needs

### Recommendation for apps/client

**Decision:** 🟡 **OPTIONAL**

**Rationale:**
- E2E testing with Playwright could benefit from workflow guidance
- However, testing-and-quality.instructions.md already covers test patterns
- BrightSign deployment is in skills, not workflow

**If creating apps/client/AGENTS.md, include:**
- When to write E2E tests vs unit tests
- How to run E2E tests locally
- E2E test evidence requirements for PRs
- Manual testing protocol for UI changes

**Alternative:** Add E2E testing section to root AGENTS.md instead

---

## Evaluation: libs/shadcnui

### Questions to Ask

1. **Does shadcnui have unique component validation workflows?**
   - Component checklist beyond standard tests?
   - Accessibility testing process?
   - Storybook story requirements?

2. **Does shadcnui have unique release workflows?**
   - Publishing to npm?
   - Version tagging?
   - Changelog generation?

3. **Does shadcnui have unique quality gates?**
   - Component review process?
   - Design system compliance checks?
   - Cross-browser testing?

### Current Assessment

**Component Validation:**
- ✅ Has specific component structure (Component.tsx, .test.tsx, .stories.tsx)
- ✅ Accessibility requirements
- ✅ Storybook story requirements
- 🔴 **Verdict:** Strong candidate for workflow guidance

**Release Workflow:**
- ⚪ Not currently publishing to npm (development library)
- 🟢 **Verdict:** No unique release workflow

**Quality Gates:**
- ✅ We have shadcnui-component-review skill!
- ✅ Component review checklist exists
- 🟢 **Verdict:** Already covered by skill

### Recommendation for libs/shadcnui

**Decision:** 🟢 **NOT NEEDED**

**Rationale:**
- Component validation is covered by shadcnui-component-review skill
- Accessibility is in ui-and-accessibility.instructions.md
- No unique workflow beyond what's in skills

**Current coverage:**
- `.github/skills/shadcnui-component-review/` - Component validation workflow
- `.github/instructions/ui-and-accessibility.instructions.md` - Component conventions
- Root AGENTS.md - General workflow

---

## Evaluation: libs/shadcnui-signage

### Questions to Ask

1. **Does shadcnui-signage have different workflows than shadcnui?**
   - Signage-specific testing (10-foot rule)?
   - BrightSign-specific validation?
   - Display rotation testing?

2. **Does shadcnui-signage have unique design validation?**
   - High-contrast checks?
   - Large typography validation?
   - Animation performance on players?

### Current Assessment

**Testing:**
- ✅ Same unit test approach as shadcnui
- ⚪ No unique testing workflow currently
- 🟢 **Verdict:** No workflow difference

**Design Validation:**
- ⚪ Signage design rules in instructions
- ⚪ 10-foot rule is a design pattern, not workflow
- 🟢 **Verdict:** Pattern, not process

### Recommendation for libs/shadcnui-signage

**Decision:** 🟢 **NOT NEEDED**

**Rationale:**
- Follows same component workflow as shadcnui
- Signage-specific patterns are in instructions, not workflow
- No unique validation process

---

## Evaluation: Other Libraries

### libs/shell
- **Workflow differences?** No - follows standard React component workflow
- **Recommendation:** 🟢 **NOT NEEDED**

### libs/landing
- **Workflow differences?** No - follows standard React component workflow
- **Recommendation:** 🟢 **NOT NEEDED**

### libs/common-tailwind
- **Workflow differences?** No - configuration library, no unique workflow
- **Recommendation:** 🟢 **NOT NEEDED**

---

## Phase 4 Overall Recommendation

### Summary

| Location | Need Nested AGENTS.md? | Rationale |
|----------|----------------------|-----------|
| apps/client | 🟡 Optional | E2E testing workflow could benefit, but could also go in root AGENTS.md |
| libs/shadcnui | 🟢 Not needed | Already covered by shadcnui-component-review skill |
| libs/shadcnui-signage | 🟢 Not needed | Follows shadcnui workflow |
| Other libs | 🟢 Not needed | Standard workflows |

### Final Decision: Skip Phase 4

**Recommendation:** ✋ **SKIP PHASE 4**

**Rationale:**
1. Most domain-specific workflows are already in skills
2. No clear workflow differences that warrant separate AGENTS.md files
3. Adding nested AGENTS.md without strong justification adds maintenance burden
4. Can always add later if specific needs emerge

**Alternative approach:**
- Add E2E testing section to root AGENTS.md
- Reference existing skills more explicitly
- Document any app-specific workflows in root AGENTS.md sections

---

## Phase 5: Validation and Testing

### Purpose

Comprehensive validation that the entire workflow system functions correctly.

---

### 5.1 Validate Root AGENTS.md

**Tasks:**
- [ ] Read through root AGENTS.md for clarity
- [ ] Verify all links work (especially relative paths to skills)
- [ ] Check examples are practical and accurate
- [ ] Ensure no contradictions with copilot-instructions.md

**Validation commands:**
```bash
# Check for broken links in AGENTS.md
grep -o '\[.*\](.*\.md)' AGENTS.md | sed 's/.*(\(.*\))/\1/' | while read link; do
  [ -f "$link" ] && echo "✅ $link" || echo "❌ Missing: $link"
done
```

**Status:** ⏸️ NOT STARTED

---

### 5.2 Validate Workflow Skills

**Tasks:**
- [ ] Review planning.md for clarity and examples
- [ ] Review systematic-debugging.md for process steps
- [ ] Review code-review-ready.md for checklist completeness
- [ ] Review verification.md for evidence template accuracy

**Validation questions:**
- Are examples up-to-date?
- Are commands accurate (e.g., `pnpm verify`)?
- Are file paths correct?
- Do skills reference each other appropriately?

**Status:** ⏸️ NOT STARTED

---

### 5.3 Validate Verification Command

**Tasks:**
- [ ] Run `pnpm verify` on clean main branch
- [ ] Introduce intentional lint error, verify command catches it
- [ ] Fix error, verify command passes
- [ ] Time the command (should complete in reasonable time)
- [ ] Test on different types of changes (code, docs, config)

**Test scenarios:**

**Scenario 1: Clean repository**
```bash
git checkout main
git pull
pnpm verify
# Expected: All checks pass
```

**Scenario 2: Lint error**
```bash
# Add intentional error (e.g., unused variable)
pnpm verify
# Expected: Lint fails with clear error message
```

**Scenario 3: Type error**
```bash
# Add intentional type error
pnpm verify
# Expected: Type-check fails
```

**Scenario 4: Failed test**
```bash
# Break a test
pnpm verify
# Expected: Test fails with clear output
```

**Status:** ⏸️ NOT STARTED

---

### 5.4 Test with Copilot Agent

**Manual testing tasks:**
- [ ] Complete all 10 tests from pre-flight-test-results.md
- [ ] Document actual Copilot responses
- [ ] Test with different types of questions
- [ ] Verify consistency across multiple runs
- [ ] Test that Copilot references correct files

**Status:** ⏸️ AWAITING MANUAL TESTING (see pre-flight-test-results.md)

---

### 5.5 End-to-End Workflow Test

**Simulate a real development task:**

**Task:** "Add a new Badge component to libs/shadcnui"

**Expected agent behavior:**
1. Recognizes this as non-trivial (multiple files)
2. Suggests creating implementation plan
3. References plan template in docs/plans/
4. Outlines files to create:
   - Badge.tsx
   - Badge.test.tsx
   - Badge.stories.tsx
5. Mentions testing requirements (80% coverage)
6. Mentions accessibility requirements
7. Suggests running `pnpm verify` when done
8. Notes PR should include Storybook screenshot

**Status:** ⏸️ NOT STARTED

---

### 5.6 Documentation Cross-Reference Validation

**Check that all documentation links work:**

```bash
# Check copilot-instructions.md links
echo "Checking .github/copilot-instructions.md..."
grep -o '\[.*\](.*\.md)' .github/copilot-instructions.md

# Check AGENTS.md links
echo "Checking AGENTS.md..."
grep -o '\[.*\](.*\.md)' AGENTS.md

# Check README links to workflow docs
echo "Checking README.md..."
grep -o '\[.*\](.*\.md)' README.md | grep -i "agent\|workflow\|skill"
```

**Manual checks:**
- [ ] README.md references AGENTS.md correctly
- [ ] CONTRIBUTING.md references workflow skills
- [ ] copilot-instructions.md links to AGENTS.md
- [ ] AGENTS.md links to all skills
- [ ] Skills reference each other where appropriate

**Status:** ⏸️ NOT STARTED

---

### 5.7 Performance Validation

**Check that verification isn't too slow:**

```bash
# Time the verify command
time pnpm verify
```

**Benchmarks:**
- On clean repository: Should complete in < 30 seconds
- With code changes: Should complete in < 2 minutes
- On CI: Should be acceptable for PR checks

**Status:** ⏸️ NOT STARTED

---

## Phase 5 Completion Checklist

### Before marking Phase 5 complete:

- [ ] All validation tasks completed
- [ ] No broken links found (or all fixed)
- [ ] `pnpm verify` tested in all scenarios
- [ ] Copilot agent test results documented
- [ ] End-to-end workflow test passed
- [ ] Performance benchmarks acceptable
- [ ] Any issues discovered are documented
- [ ] Fixes implemented for critical issues

### Phase 5 Exit Criteria

**Must have:**
- ✅ All critical files exist and are linked correctly
- ✅ `pnpm verify` works reliably
- ✅ At least 8/10 Copilot tests pass
- ✅ No broken documentation links

**Nice to have:**
- 🟡 All 10/10 Copilot tests pass
- 🟡 Performance < 30 seconds on clean repo
- 🟡 Complete end-to-end workflow test

**Blockers:**
- ❌ Broken critical links (AGENTS.md → skills)
- ❌ `pnpm verify` doesn't work
- ❌ < 5/10 Copilot tests pass
- ❌ Major contradictions in documentation

---

## Recommendation: Phase 5 Approach

### Suggested Execution Order

1. **Quick wins (30 minutes):**
   - ✅ Validate file structure (done above - all present)
   - Run link validation commands
   - Run `pnpm verify` scenarios
   - Check performance timing

2. **Manual testing (1-2 hours):**
   - Complete pre-flight Copilot tests
   - Document actual responses
   - Note any script adjustments needed

3. **End-to-end validation (30 minutes):**
   - Run complete workflow simulation
   - Document results
   - Identify any gaps

4. **Review and document (30 minutes):**
   - Summarize findings
   - Note any issues for future work
   - Declare Phase 5 complete or identify blockers

### Total estimated time: 3-4 hours

---

## Final Recommendation

**For demo recording purposes:**

1. ✅ **Complete Phase 5.3** (Verify command testing) - Quick and critical
2. ✅ **Complete Phase 5.4** (Copilot testing) - Essential for demo accuracy
3. 🟡 **Optional Phase 5.1-5.2** (File validation) - Can be done after demos
4. 🟡 **Optional Phase 5.5** (E2E test) - Nice to have for confidence
5. ⚪ **Skip Phase 5.6-5.7** unless issues found - Can defer

**Priority for recording:**
- Pre-flight Copilot testing is **mandatory** - you need to know what responses to expect
- Verify command testing is **highly recommended** - you'll demo this command
- Other validations can happen after demos are recorded

---

## Status: Ready to Proceed?

**Current state:**
- ✅ All infrastructure files present
- ✅ Demo scripts created
- ✅ Pre-flight test template ready
- ⏸️ Manual Copilot testing needed
- ⏸️ Verify command scenarios needed

**To proceed with demo recording:**
1. Run through manual Copilot tests (1-2 hours)
2. Test `pnpm verify` in 2-3 scenarios (15 minutes)
3. Document results in pre-flight-test-results.md
4. Adjust demo script based on actual behavior
5. ✅ Ready to record!

**Decision: Skip Phase 4, Partial Phase 5 for now**
- Phase 4 not needed (no nested AGENTS.md required)
- Phase 5 critical items: Copilot testing + verify command testing
- Phase 5 optional items: Can defer until after demos recorded
