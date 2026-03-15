# Claude Skills Review & Refactoring Guide

*A practical audit framework for improving Claude Agent Skills*

This guide defines how to **review, refactor, and test existing Claude skills** to align with current best practices.

The goal is to make each skill:

* concise
* discoverable
* efficient with context
* predictable in behaviour
* easy for agents to extend

The key design principle is **progressive disclosure**.

---

# 1. Core Principle: Progressive Disclosure

Claude skills are designed so the agent **does not load everything at once**.

Instead information is loaded in layers.

| Layer        | What loads                    | When                    | Typical size |
| ------------ | ----------------------------- | ----------------------- | ------------ |
| Metadata     | name + description            | Always at startup       | ~100 tokens  |
| Instructions | SKILL.md body                 | When skill is triggered | < 5k tokens  |
| Resources    | references / scripts / assets | Only when needed        | unlimited    |

This architecture prevents **context window bloat** and allows large skills without degrading performance. ([クラスメソッド発「やってみた」系技術メディア | DevelopersIO][1])

### Design implication

The **main skill file should be concise**.

Think of `SKILL.md` as:

> A **table of contents + operational instructions**, not a knowledge dump.

Detailed documentation should live in:

```
references/
scripts/
assets/
```

---

# 2. Recommended Skill Structure

A well-structured skill should follow this layout:

```
my-skill/
│
├─ SKILL.md
│
├─ references/
│   ├─ REFERENCE.md
│   ├─ examples.md
│   └─ domain-notes.md
│
├─ scripts/
│   ├─ run_analysis.py
│   ├─ validate.sh
│   └─ transform.js
│
└─ assets/
    ├─ templates/
    ├─ fonts/
    ├─ icons/
    └─ example-output/
```

### Directory responsibilities

**SKILL.md**

* concise operational instructions
* activation guidance
* workflow steps
* links to deeper resources

**references/**

* longer documentation
* examples
* domain knowledge
* schemas
* API notes

**scripts/**

* executable helpers
* data transforms
* validation tools
* automation utilities

Claude executes the script and receives only its output.

**assets/**

* templates
* style guides
* icons
* fonts
* sample outputs

---

# 3. Ideal SKILL.md Structure

A strong skill file should typically follow this pattern:

```
---
name: signage-layout-designer
description: Generate readable digital signage layouts using typography, hierarchy, and zone-based composition. Use when designing signage screens or menu boards.
---

# Purpose

What the skill does in one paragraph.

# When To Use

Trigger examples:
- “create menu board”
- “design signage screen”
- “layout for digital display”

# Workflow

1. Analyse screen constraints
2. Choose layout pattern
3. Apply typography hierarchy
4. Generate output

# Output Format

Describe expected output structure.

# Additional Resources

Typography rules → references/typography.md  
Layout patterns → references/layout-patterns.md  
Templates → assets/templates/
```

Guidelines:

* Prefer **short imperative instructions**
* Use **clear numbered steps**
* Avoid long narrative text
* Keep the file **under ~500 lines** where possible. ([Code With Seb Blog][2])

---

# 4. Evaluation Criteria

Each skill should be reviewed against the following checklist.

---

# Skill Quality Checklist

## 1. Metadata quality

Check the YAML frontmatter.

Good skills include **clear activation cues**.

Bad:

```
description: Helps with layouts
```

Good:

```
description: Design digital signage layouts, menu boards, and large-screen displays using zone-based composition and distance-readable typography.
```

Checklist:

* [ ] Name is concise
* [ ] Description clearly states purpose
* [ ] Description includes **activation keywords**

---

## 2. Instruction clarity

The SKILL.md body should contain **only essential instructions**.

Checklist:

* [ ] Clear purpose statement
* [ ] Clear workflow
* [ ] Output expectations
* [ ] No long explanations
* [ ] No unnecessary background text

Smell test:

If a skill reads like **documentation instead of instructions**, it needs refactoring.

---

## 3. Progressive disclosure

Verify content is correctly split.

Checklist:

* [ ] SKILL.md contains **only core instructions**
* [ ] Large explanations moved to `references/`
* [ ] Examples moved to `references/examples.md`
* [ ] Templates moved to `assets/`
* [ ] Tools moved to `scripts/`

Anti-pattern:

```
SKILL.md
   8000 lines of examples
```

Correct pattern:

```
SKILL.md → references/examples.md
```

---

## 4. File referencing quality

References should be **direct and shallow**.

Correct:

```
See references/layouts.md
```

Avoid deep chains:

```
SKILL.md
  → advanced.md
      → detailed.md
```

Only **one level of referencing** should be used. ([Zenn][3])

---

## 5. Workflow clarity

Skills work best when they specify **clear steps**.

Checklist:

* [ ] Step-by-step workflow
* [ ] Deterministic outputs
* [ ] Clear reasoning structure

Example:

```
1. Identify screen resolution
2. Select layout pattern
3. Apply typography scale
4. Generate layout
```

---

## 6. Script usefulness

Scripts should exist **only if they add capability**.

Checklist:

* [ ] Scripts perform useful automation
* [ ] Scripts have clear input/output
* [ ] SKILL.md explains when to run them
* [ ] Scripts are small and deterministic

Bad pattern:

Script exists but is never referenced.

---

## 7. Asset reuse

Assets should prevent repetitive prompt instructions.

Good uses:

* layout templates
* brand palettes
* typography rules
* icon sets
* image placeholders

Checklist:

* [ ] Assets referenced in SKILL.md
* [ ] Files reusable across outputs
* [ ] No unnecessary binary files

---

# 5. Refactoring Process

Developers should review **each skill individually**.

Suggested workflow:

### Step 1

Read `SKILL.md`.

Identify:

* redundant instructions
* buried logic
* large embedded examples

---

### Step 2

Split content.

Move:

| Content        | Destination            |
| -------------- | ---------------------- |
| Large examples | references/examples.md |
| Documentation  | references/            |
| Templates      | assets/                |
| Utilities      | scripts/               |

---

### Step 3

Rewrite SKILL.md.

Ensure it contains only:

* purpose
* triggers
* workflow
* output rules
* links to resources

---

### Step 4

Test invocation.

Test prompts such as:

```
create a signage layout
design a menu board
generate digital signage UI
```

Check:

* does the correct skill trigger
* is the output consistent
* does Claude discover references correctly

---

### Step 5

Improve activation cues.

Add realistic phrases users might type.

---

# 6. Testing Framework

For each skill create **three test prompts**:

### Basic test

```
Use this skill in a normal scenario
```

### Edge test

```
Minimal information input
```

### Stress test

```
Complex real-world scenario
```

Evaluate:

| Metric                 | Question                                 |
| ---------------------- | ---------------------------------------- |
| Skill activation       | Did Claude pick the right skill?         |
| Instruction compliance | Did it follow workflow?                  |
| Output consistency     | Is the output predictable?               |
| Reference discovery    | Did it use additional files when needed? |

---

# 7. Anti-Patterns to Remove

Common mistakes:

### Skill as documentation dump

Large knowledge bases inside SKILL.md.

---

### Skills without triggers

Descriptions too vague to activate.

---

### Giant monolithic skills

Trying to do everything.

Prefer **smaller specialised skills**.

---

### Unstructured instructions

Long paragraphs instead of steps.

---

# 8. Target Quality Standard

A well-designed skill should be:

| Characteristic  | Description               |
| --------------- | ------------------------- |
| Concise         | SKILL.md under ~500 lines |
| Discoverable    | clear activation cues     |
| Composable      | works with other skills   |
| Resource-driven | references external files |
| Deterministic   | predictable workflow      |

---

# 9. Deliverables for This Refactor

For each skill the developer should produce:

```
skill-name/
  SKILL.md (refactored)
  references/
  scripts/
  assets/
```

And add:

```
skill-name/TESTS.md
```

Containing:

* activation tests
* prompt examples
* expected output patterns

---

# 10. Definition of Done

A skill is considered **production-ready** when:

* SKILL.md is concise
* progressive disclosure is implemented
* examples moved to references
* scripts documented
* activation triggers verified
* test prompts succeed

---

[1]: https://dev.classmethod.jp/articles/agent-skills-2025-standardized-overview/?utm_source=chatgpt.com "Agent Skills 元年なのでオープンスタンダードになった Agent ..."
[2]: https://www.codewithseb.com/blog/claude-code-skills-reusable-ai-workflows-guide?utm_source=chatgpt.com "Claude Code Skills: The 98% Token Savings Architecture ..."
[3]: https://zenn.dev/ttks/articles/1ff66cc3f89d2a?utm_source=chatgpt.com "Claude Agent Skills のベストプラクティス"
