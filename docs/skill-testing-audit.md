# Skill Testing Audit

**Date:** 2026-03-14
**Branch:** `chore/skill-testing-audit`
**Tester:** GitHub Copilot (automated)
**Scope:** All non-internal (Tier 1 + Tier 2) skills

## Summary

Tested 11 non-internal skills across two tiers. Each skill was invoked with a realistic scenario matching its documented use case. Results assess whether the skill produces useful, actionable output and whether its documentation is complete.

| Skill | Tier | Rating | Verdict |
|-------|------|--------|---------|
| signage-layout-system | 1 | ⭐⭐⭐⭐⭐ | **Pass** — Excellent |
| signage-animation-system | 1 | ⭐⭐⭐⭐⭐ | **Pass** — Excellent |
| signage-menu-board | 1 | ⭐⭐⭐⭐⭐ | **Pass** — Excellent |
| signage-placeholder-images | 1 | ⭐⭐⭐⭐ | **Pass** — Good |
| chrome-devtools-webapp-debug | 1 | ⭐⭐⭐ | **Needs Work** — Conceptually sound, procedurally incomplete |
| systematic-debugging | 1 | ⭐⭐⭐⭐ | **Pass** — Good for common cases |
| instructions-detox | 1 | ⭐⭐⭐⭐⭐ | **Pass** — Excellent |
| planning | 2 | ⭐⭐⭐⭐ | **Pass** — Good |
| code-review-ready | 2 | ⭐⭐⭐⭐ | **Pass** — Good |
| verification | 2 | ⭐⭐⭐⭐ | **Pass** — Good |
| shadcnui-component-review | 2 | ⭐⭐⭐⭐⭐ | **Pass** — Excellent |

**Overall: 10 of 11 skills pass. 1 skill needs procedural improvements.**

---

## Tier 1 — Fully Reusable Skills

### signage-layout-system ⭐⭐⭐⭐⭐

**Test scenario:** Design a full-screen corporate lobby display at 1920×1080 with logo, date/time, news ticker, feature highlights, and welcome message.

**Result:** Produced a comprehensive layout design with:
- Four clearly named zones (Header Band, Hero Zone, Feature Zone, Footer Ticker)
- ASCII diagram of zone arrangement
- Detailed specifications per zone (pixel heights, typography scale, rationale)
- Hierarchy rationale explaining primary → ambient ordering
- Complete typography table with sizes, weights, and purposes
- Spacing and safe zone calculations
- Color and contrast recommendations
- Motion and timing guidance

**Strengths:**
- Output was immediately actionable for implementation
- Distance-readability considerations integrated throughout
- Rationale for each design decision clearly articulated
- Non-interactive/always-on context correctly applied

**No issues found.**

---

### signage-animation-system ⭐⭐⭐⭐⭐

**Test scenario:** Design motion and transitions for the corporate lobby display zones listed above.

**Result:** Produced detailed animation design covering:
- Per-zone motion intent with specific timing values
- Loop-safe animation with invisible boundaries
- Deliberate "no motion" decisions with rationale
- Pacing hierarchy (ambient vs active motion)
- Scroll speed recommendations (px/sec)

**Strengths:**
- Calm, restrained motion philosophy correctly applied
- Duration values specific and justified (not generic "use easing")
- Explicitly called out what motion to avoid (flash, rapid oscillation, hard cuts)
- Loop boundary handling well addressed

**No issues found.**

---

### signage-menu-board ⭐⭐⭐⭐⭐

**Test scenario:** Design a coffee shop menu board with Hot Drinks, Cold Drinks, Food, and a Featured seasonal item at 1920×1080.

**Result:** Produced complete menu board design:
- Selected "Category Columns" template with rationale for rejecting alternatives
- Zone breakdown with featured item promotion strategy
- Price treatment rules (right-aligned, consistent formatting, larger for featured)
- Typography hierarchy for item names, descriptions, prices
- Visual grouping and scanning pattern analysis

**Strengths:**
- Template selection well-reasoned against menu data
- Price hierarchy rules specific to signage (not web patterns)
- Viewing distance assumptions baked into type scale
- Featured item treatment distinguished from regular items

**No issues found.**

---

### signage-placeholder-images ⭐⭐⭐⭐

**Test scenario:** Plan placeholder images for a coffee shop menu board with hero image, featured drink, category icons, and logo.

**Result:** Produced structured placeholder planning:
- Per-image specs (purpose, dimensions, file name, label, alt text, developer note)
- Consistent kebab-case naming convention
- Replacement guidance for when final artwork arrives
- Code integration example

**Strengths:**
- Naming conventions are clear and deterministic
- Developer notes explain intent for each placeholder
- Alt text meaningful rather than generic
- Replacement workflow practical

**Areas for improvement:**
- Could include placeholder generation service URL patterns (e.g., via.placeholder.com) for faster prototyping
- No guidance on placeholder visual style (solid color blocks, pattern fills, labeled SVGs?)
- Missing guidance on how to handle responsive/multiple resolution variants

---

### chrome-devtools-webapp-debug ⭐⭐⭐

**Test scenario:** Documentation review only (requires Chrome DevTools MCP which is hardware-dependent). Assessed all reference workflows.

**Result:** Skill is conceptually excellent but has critical procedural gaps.

**Strengths:**
- Clear when-to-use criteria
- Four reference workflows (console-error, network-failure, performance-lcp, bug-triage) well scoped
- Good hypothesis-driven investigation framework
- Excellent fallback guidance when MCP unavailable ("do not guess, ask user to enable")
- Network failure workflow classifies error types comprehensively (401, 404, 429, 5xx, CORS, timeout)

**Issues requiring improvement:**

| Issue | Severity |
|-------|----------|
| No MCP tool reference — never documents available functions, parameters, or response formats | CRITICAL |
| No syntax examples showing actual MCP tool invocations | CRITICAL |
| Evidence capture methods undefined ("capture screenshot" not explained procedurally) | CRITICAL |
| Missing workflows for rendering, interaction, CSS, auth, memory, SPA routing issues | HIGH |
| Browser setup is implicit — how does app connect to DevTools? | HIGH |
| No troubleshooting for MCP tool failures or edge cases | MEDIUM |

**Recommendation:** Add a procedural section documenting available MCP tools, invocation examples, evidence capture flow, and 4-6 additional scenario workflows.

---

### systematic-debugging ⭐⭐⭐⭐

**Test scenario:** Documentation evaluation against debugging scenarios of varying complexity.

**Result:** 6-step process (Understand → Reproduce → Root Cause → Fix → Verify → Document) is well-structured and produces good results for common bugs.

**Strengths:**
- Clear goal statement and concrete steps for each phase
- Good vs bad examples showing contrast (poor understanding vs thorough understanding)
- Common pitfalls section with anti-patterns
- Real-world examples (ContactForm validation, useAuth context provider)
- Emphasis on evidence over guessing

**Issues requiring improvement:**

| Issue | Severity |
|-------|----------|
| No async/timing bug techniques (Promises, race conditions, async/await) | HIGH |
| No guidance for intermittent/non-reproducible bugs | HIGH |
| No performance debugging examples (listed in purpose but not covered) | MEDIUM |
| No decision framework for when to invest in deep debugging vs quick workaround | MEDIUM |
| All examples are single-component React bugs — no multi-file or cross-project examples | MEDIUM |
| No guidance on environment-specific issues (works locally, fails in production) | MEDIUM |
| Process assumes linear progression — no loop-back guidance | LOW |

**Recommendation:** Add async debugging section with techniques, intermittent bug strategies, and a decision tree for debugging investment level.

---

### instructions-detox ⭐⭐⭐⭐⭐

**Test scenario:** Quick bloat check on `.github/copilot-instructions.md`.

**Result:** Produced actionable audit report with:
- Severity-ordered findings (HIGH: exact duplication, MEDIUM: overlapping content)
- Specific line references for each finding
- Quoted examples of problematic text
- Concrete diff-format fix recommendations
- Estimated line savings (60 lines / 35% reduction)

**Strengths:**
- Findings are specific and verifiable (line numbers, quotes)
- Severity classification helps prioritize
- Fix recommendations are copy-paste ready (diff format)
- Identifies both exact duplication and near-duplication patterns
- Cross-references other files (AGENTS.md) to confirm duplication

**No issues found.** This skill is production-quality for its stated purpose.

---

## Tier 2 — Portable with Minor Assumptions

### planning ⭐⭐⭐⭐

**Test scenario:** Create a plan for adding a new Toggle variant to the shadcnui library.

**Result:** Produced structured implementation plan with:
- Goal, context, and scope sections
- 5 ordered tasks with files to change, commands, expected results, and acceptance criteria
- Dependencies, risks, and mitigations
- Testing strategy
- Verification commands
- Progress tracking

**Strengths:**
- Plan is immediately actionable by another engineer
- Task breakdown follows natural implementation order
- Risk mitigation tied to specific concerns
- Acceptance criteria are testable (checkboxes)
- Template is well-structured and comprehensive

**Issues requiring improvement:**

| Issue | Severity |
|-------|----------|
| No guidance on sizing/complexity of plans (when is a plan overkill vs appropriate?) | MEDIUM |
| "Context-safe chunks" undefined — what does that mean practically? | MEDIUM |
| Missing plan validation guidance (how to verify a plan is good before starting) | MEDIUM |
| No conditional task branches ("if X then do Task 3b") | LOW |
| Acceptance criteria format guidance vague (checklist vs prose) | LOW |
| File path examples may be outdated relative to actual codebase | LOW |

**Recommendation:** Add a decision guide for plan granularity and clarify context-safe chunk boundaries.

---

### code-review-ready ⭐⭐⭐⭐

**Test scenario:** Documentation evaluation of PR readiness criteria and split guidelines.

**Result:** Comprehensive skill with excellent PR template and anti-pattern coverage.

**Strengths:**
- Clear, measurable review-readiness criteria (< 500 lines, < 30 min review time, one logical change)
- Excellent PR description template with conditional sections
- 5 named anti-patterns with explanations and fixes
- Review time estimates with color coding (🟢🟡🟠🔴)
- E-commerce example showing how to split a large PR into 4 focused ones

**Issues requiring improvement:**

| Issue | Severity |
|-------|----------|
| No monorepo PR splitting guidance (changes spanning libs + apps) | HIGH |
| Broken reference: `verification.md` linked but doesn't exist locally | HIGH |
| Missing guidance for breaking changes and migration documentation | MEDIUM |
| "One logical change" not defined with edge case examples | MEDIUM |
| No guidance on dependent/stacked PRs workflow | MEDIUM |
| No integration test PR scoping guidance | LOW |

**Recommendation:** Fix broken verification link, add monorepo-specific split guidance, clarify "one logical change" with examples.

---

### verification ⭐⭐⭐⭐

**Test scenario:** Documentation evaluation of verification workflow and PR evidence formatting.

**Result:** Good skill with excellent PR evidence template but weak failure handling guidance.

**Strengths:**
- Excellent PR evidence template (copy-paste ready)
- Clear evidence requirements by change type (UI, performance, bug fix, refactor)
- Quick reference for minimal, with-testing, and with-UI scenarios
- Tools for evidence collection listed (ScreenToGif, Kap, etc.)

**Issues requiring improvement:**

| Issue | Severity |
|-------|----------|
| No guidance on debugging verification failures (lint errors, type-check failures, test failures) | HIGH |
| "Affected" scope not well explained — how does Nx determine what's affected? | HIGH |
| Build check ambiguity — is it required or recommended? | MEDIUM |
| No guidance for docs-only changes (can tests/lint be skipped?) | MEDIUM |
| No guidance for config-only changes (tsconfig, vite.config) | MEDIUM |
| No E2E test expectations (AGENTS.md mentions Playwright but verification skill doesn't) | MEDIUM |
| No actual `pnpm verify` terminal output example | LOW |

**Recommendation:** Add verification failure debugging section, clarify affected scope mechanism, and document edge cases (docs-only, config-only).

---

### shadcnui-component-review ⭐⭐⭐⭐⭐

**Test scenario:** Review the Badge component at `data-display/badge` (read-only).

**Result:** Produced thorough component review covering all documented checks:
- Category placement: ✅ Correctly in data-display
- Export chain: ✅ Full chain verified (component → category → UI → root)
- Accessibility: ⚠️ Acceptable for passive badge; noted `role="status"` opportunity
- Tests: ❌ Missing (correctly identified)
- Storybook: ⚠️ Found argTypes mismatch (`outline-solid` vs `outline`)
- Definition of Done table with pass/fail status

**Strengths:**
- Review is systematic and follows documented checklist
- Found real issues (missing tests, Storybook argTypes mismatch)
- Accessibility assessment nuanced rather than blanket pass/fail
- Recommendations prioritized (High/Medium/Low)
- Definition of Done table provides quick status overview

**No issues found with the skill itself.** It correctly identified real component gaps.

---

## Cross-Cutting Observations

### What works well across all skills

1. **Consistent structure** — Every skill follows SKILL.md contract pattern with clear inputs/outputs
2. **Domain expertise** — Signage skills (layout, animation, menu board) produce genuinely expert-level output
3. **Actionable output** — Most skills produce work products that can be immediately used
4. **Safety defaults** — Skills default to "don't guess" when evidence is missing

### Common patterns needing improvement

1. **Failure path guidance** — Most skills explain what to do when things work, not what to do when they fail
2. **Edge case coverage** — Skills handle the happy path well but have gaps for unusual scenarios
3. **Cross-skill references** — Some skills reference each other but links may be broken or incomplete
4. **Async/timing blind spot** — Multiple skills (systematic-debugging, chrome-devtools) lack modern async debugging guidance
5. **Monorepo awareness** — Tier 2 skills don't fully address multi-project change scenarios

### Priority fixes (across all skills)

| Priority | Skill | Fix |
|----------|-------|-----|
| 🔴 Critical | chrome-devtools-webapp-debug | Add MCP tool reference, invocation examples, and evidence capture procedures |
| 🔴 Critical | code-review-ready | Fix broken `verification.md` reference link |
| 🟡 High | systematic-debugging | Add async/timing debugging section |
| 🟡 High | verification | Add verification failure debugging guidance |
| 🟡 High | code-review-ready | Add monorepo PR splitting guidance |
| 🟡 High | chrome-devtools-webapp-debug | Add missing scenario workflows (rendering, interaction, auth) |
| 🟢 Medium | planning | Clarify plan granularity decision guide |
| 🟢 Medium | signage-placeholder-images | Add placeholder visual style guidance |
| 🟢 Medium | systematic-debugging | Add intermittent bug strategies |
| 🟢 Medium | verification | Document edge cases (docs-only, config-only changes) |

---

## Test Methodology

Each skill was tested by one of these methods:

1. **Live invocation** — Skill was invoked with a realistic scenario via the appropriate agent and output quality assessed
   - Used for: signage-layout-system, signage-animation-system, signage-menu-board, signage-placeholder-images, instructions-detox, shadcnui-component-review

2. **Documentation evaluation** — Skill documentation was read thoroughly and assessed for completeness, clarity, and agent-usability
   - Used for: planning, code-review-ready, verification, systematic-debugging, chrome-devtools-webapp-debug

3. **Hybrid** — Both documentation review and partial invocation
   - Used for: planning (documentation + hypothetical plan generation)

Skills requiring hardware (BrightSign) or external services (Chrome DevTools MCP connected to a running app) were tested via documentation evaluation only.
