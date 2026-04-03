# Demo Scripts and Testing Guide

**Purpose:** Comprehensive YouTube demo preparation for WallRun project and Phase 0 Copilot workflow system

---

## 📁 Files in This Directory

### Demo Scripts

- **[00-project-introduction.demo.md](./00-project-introduction.demo.md)** (3-5 min)
  - Project overview and introduction
  - Technology stack and structure
  - BrightSign platform integration
  - Design philosophy
  - Target audience: General developers

- **[01-phase-0-workflow-demo.demo.md](./01-phase-0-workflow-demo.demo.md)** (8-12 min)
  - Three-layer instruction model deep-dive
  - Workflow skills demonstration
  - Live Copilot testing scenarios
  - What we've accomplished
  - Target audience: Copilot users, AI-assisted development

- **[02-demo-site-walkthrough.demo.md](./02-demo-site-walkthrough.demo.md)** (4-6 min)
  Public demo site walkthrough covering representative component pages, signage examples, and the GitHub source closeout.

- **[02-demo-site-walkthrough.operator.md](./02-demo-site-walkthrough.operator.md)**
  Short operator version with only URL, pause, and spoken line for each stop.

- **[02-demo-site-walkthrough.script.md](./02-demo-site-walkthrough.script.md)**
  Spoken narration only, aligned to the same sequence as the operator version.

### Testing and Validation

- **[demo-preflight-testing.md](./demo-preflight-testing.md)**
  - Comprehensive test suite (10 scenarios)
  - Expected vs actual Copilot behavior validation
  - Troubleshooting guide
  - Use BEFORE recording to verify everything works

- **[pre-flight-test-results.md](./pre-flight-test-results.md)**
  - Test results template to fill out
  - Infrastructure validation checklist
  - Recording readiness assessment
  - Update this as you test

- **[phase-4-5-evaluation.md](./phase-4-5-evaluation.md)**
  - Phase 4 evaluation (nested AGENTS.md)
  - Phase 5 validation checklist
  - Recommendations: Skip Phase 4, partial Phase 5

---

## 🎬 Recording Workflow

### Phase 1: Pre-Recording (1-3 hours)

1. **Run infrastructure validation**

   ```bash
   # Ensure all files exist
   ls -1 .github/copilot-instructions.md AGENTS.md skills/*/workflows/detailed-guide.md
   ```

2. **Complete manual Copilot testing**
   - Open [demo-preflight-testing.md](./demo-preflight-testing.md)
   - Run all 10 test scenarios in VS Code Copilot Chat
   - Document results in [pre-flight-test-results.md](./pre-flight-test-results.md)
   - Aim for 8/10 tests passing

3. **Test verification command**

   ```bash
   # Test clean state
   pnpm verify

   # Test with intentional error (add unused variable, then revert)
   # Ensure it catches the error
   ```

4. **Adjust demo scripts**
   - Based on actual Copilot responses
   - Note any variations in behavior
   - Prepare backup explanations if live demo fails

### Phase 2: Practice Run (30-60 min)

1. **Project Introduction Demo**
   - Follow [00-project-introduction.demo.md](./00-project-introduction.demo.md)
   - Time yourself (target: 3-5 minutes)
   - Practice transitions between sections
   - Test screen recording setup

2. **Phase 0 Workflow Demo**
   - Follow [01-phase-0-workflow-demo.demo.md](./01-phase-0-workflow-demo.demo.md)
   - Practice Copilot interactions
   - Time yourself (target: 8-12 minutes)
   - Prepare for unexpected Copilot responses

### Phase 3: Recording (1-2 hours)

1. **Record Project Introduction first** (shorter, easier)
   - Follow script closely
   - Keep energy high
   - Show files actively

2. **Record Phase 0 Workflow second** (longer, more complex)
   - Reference your test results for expected Copilot behavior
   - Be prepared to explain variations
   - Show actual interactions, not just talking

### Phase 4: Post-Production

- Add chapter markers (listed in each script)
- Add title cards
- Add description links (listed in each script)
- Add relevant tags
- Create thumbnails

---

## ✅ Pre-Recording Checklist

Before you start recording:

### Infrastructure

- [ ] All critical files exist (run validation command)
- [ ] `pnpm verify` command works
- [ ] Documentation links are correct
- [ ] Git branch is clean or on demo branch

### Copilot Testing

- [ ] At least 8/10 pre-flight tests pass
- [ ] Actual responses documented
- [ ] Known issues have workarounds
- [ ] VS Code Copilot settings verified
- [ ] VS Code restarted if needed

### Recording Setup

- [ ] Audio quality tested
- [ ] Video quality tested
- [ ] Screen resolution appropriate (1920x1080 recommended)
- [ ] VS Code theme/font size readable
- [ ] Terminal font size readable
- [ ] Browser windows closed (except what's needed)
- [ ] Notifications disabled

### Scripts

- [ ] Read through both demo scripts
- [ ] Timed practice run completed
- [ ] Script adjustments made based on testing
- [ ] Example questions and responses prepared
- [ ] Backup explanations ready

---

## 📊 Current Status

### Phase 0-3 Implementation

- ✅ Phase 0: Setup complete
- ✅ Phase 1: AGENTS.md and skills complete
- ✅ Phase 2: Verification command complete
- ✅ Phase 3: Documentation updates complete

### Demo Preparation

- ✅ Demo scripts created
- ✅ Pre-flight testing guide created
- ⏸️ Manual Copilot testing (pending)
- ⏸️ Verify command scenarios (pending)

### Phase 4-5 (Optional)

- 🟢 Phase 4: Recommended to skip (no nested AGENTS.md needed)
- 🟡 Phase 5: Partial completion recommended (Copilot testing + verify testing)

---

## 🎯 Success Criteria

### Minimum for Recording

- ✅ Infrastructure files all present
- ✅ At least 5/10 Copilot tests pass
- ✅ `pnpm verify` works in at least 2 scenarios
- ✅ One practice run completed

### Recommended for Recording

- ✅ Infrastructure files validated
- ✅ At least 8/10 Copilot tests pass
- ✅ `pnpm verify` tested in all scenarios
- ✅ Multiple practice runs completed
- ✅ Script adjustments made

### Ideal for Recording

- ✅ All infrastructure validated
- ✅ 10/10 Copilot tests pass
- ✅ Complete verification testing
- ✅ End-to-end workflow test completed
- ✅ Demo scripts perfected

---

## 🚀 Quick Start

**"I want to record demos today, what's the minimum?"**

1. **Run validation** (5 min):

   ```bash
   ls -1 .github/copilot-instructions.md AGENTS.md skills/*/workflows/detailed-guide.md
   pnpm verify
   ```

2. **Test 5 critical Copilot scenarios** (30 min):
   - Test 3: AGENTS.md recognition
   - Test 4: Planning skill
   - Test 5: Verification skill
   - Test 8: pnpm verify knowledge
   - Test 10: Full workflow

3. **Practice project introduction once** (15 min)

4. **✅ Ready to record!**

---

## 📝 Notes

- Demo scripts include timing, chapter markers, and post-recording checklists
- Pre-flight testing ensures Copilot behaves as expected
- Phase 4-5 evaluation provides guidance on optional next steps
- All files formatted and ready to use
- Can adjust scripts based on actual Copilot behavior during testing

---

## 🔗 Related Documentation

- [AGENTS.md](../../AGENTS.md) - Root workflow guidance
- [.github/copilot-instructions.md](../../.github/copilot-instructions.md) - Global conventions
- [skills/](../../skills/) - Canonical workflow skills directory
- [docs/plans/](../plans/) - Implementation plans directory
- [docs/ai/target-operating-model.md](../ai/target-operating-model.md) - Three-layer architecture

---

## 📞 Questions or Issues?

If you encounter issues during testing or recording:

1. Check [demo-preflight-testing.md](./demo-preflight-testing.md) troubleshooting section
2. Review [phase-4-5-evaluation.md](./phase-4-5-evaluation.md) validation tasks
3. Verify VS Code Copilot settings
4. Restart VS Code if needed
5. Document issues in pre-flight-test-results.md

---

**Last Updated:** 2026-03-08  
**Branch:** `docs/phase-0-demo-prep`
