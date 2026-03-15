# Claude Skill Linter

*A structured evaluation framework for reviewing agent skills*

This checklist allows developers to **audit, score, and improve each skill** in the repository.

Each skill is evaluated across **8 dimensions**.

Total score: **100 points**

| Score  | Quality             |
| ------ | ------------------- |
| 90–100 | Production quality  |
| 75–89  | Good but improvable |
| 60–74  | Needs refactor      |
| <60    | Poor design         |

---

# Skill Review Process

For each skill in:

```
skills/
```

Perform the following steps:

1. Open `SKILL.md`
2. Review directory structure
3. Run activation tests
4. Score against rubric
5. Record issues

Each skill should produce a **linter report**.

Example:

```
skills/menu-board-designer/LINT_REPORT.md
```

---

# Skill Linter Rubric

# 1. Skill Metadata Quality (10 points)

Evaluate the YAML frontmatter.

### Criteria

| Check                                 | Points |
| ------------------------------------- | ------ |
| Clear name                            | 2      |
| Description clearly states capability | 2      |
| Includes realistic trigger language   | 3      |
| Avoids vague wording                  | 1      |
| Description < 200 words               | 1      |
| Description contains domain keywords  | 1      |

### Example Good Description

```
Design large-format digital signage layouts including menu boards,
transport displays, and information screens using zone-based composition
and distance-readable typography.
```

### Anti-pattern

```
Helps with UI layouts.
```

---

# 2. Progressive Disclosure Design (15 points)

Skills should load information in layers.

### Criteria

| Check                             | Points |
| --------------------------------- | ------ |
| SKILL.md concise                  | 4      |
| Documentation moved to references | 4      |
| Examples externalised             | 2      |
| Templates in assets               | 2      |
| Scripts isolated                  | 2      |
| Minimal token load                | 1      |

### Ideal structure

```
skill/
 SKILL.md
 references/
 scripts/
 assets/
```

### Anti-pattern

SKILL.md containing thousands of lines.

---

# 3. Instruction Clarity (15 points)

Instructions should be **deterministic and procedural**.

### Criteria

| Check                        | Points |
| ---------------------------- | ------ |
| Clear purpose section        | 3      |
| Step-by-step workflow        | 5      |
| Clear output instructions    | 3      |
| No long narrative paragraphs | 2      |
| Readable structure           | 2      |

### Good pattern

```
Workflow

1. Analyse display constraints
2. Select layout pattern
3. Apply typography hierarchy
4. Generate output
```

### Anti-pattern

Large blocks of explanatory text.

---

# 4. Activation Discoverability (10 points)

Claude must be able to **identify when to use the skill**.

### Criteria

| Check                            | Points |
| -------------------------------- | ------ |
| Trigger examples included        | 4      |
| Natural language prompts covered | 3      |
| Domain keywords present          | 2      |
| Skill name matches domain        | 1      |

### Example

```
Use this skill when asked to:

- design a menu board
- create digital signage layout
- generate large display UI
```

---

# 5. Resource Organisation (10 points)

Supporting materials must be well organised.

### Criteria

| Check                                | Points |
| ------------------------------------ | ------ |
| references folder used correctly     | 3      |
| examples separated from instructions | 2      |
| assets reusable                      | 2      |
| no unnecessary files                 | 1      |
| clear naming                         | 2      |

---

# 6. Script Integration (10 points)

Scripts should only exist if they provide **real capability**.

### Criteria

| Check                                | Points |
| ------------------------------------ | ------ |
| Scripts referenced in instructions   | 3      |
| Scripts have clear inputs            | 2      |
| Scripts produce deterministic output | 2      |
| Scripts documented                   | 2      |
| Scripts small and maintainable       | 1      |

### Anti-pattern

Scripts that exist but are never used.

---

# 7. Output Quality Definition (15 points)

Skills must define **predictable output structure**.

### Criteria

| Check                     | Points |
| ------------------------- | ------ |
| Output format defined     | 4      |
| Structure deterministic   | 4      |
| Examples provided         | 3      |
| Formatting rules clear    | 2      |
| Avoids vague instructions | 2      |

Example:

```
Output Format

Return a React component with:

- full screen layout
- Tailwind classes
- clear typography hierarchy
```

---

# 8. Testability (15 points)

Skills should be easy to validate.

### Criteria

| Check                     | Points |
| ------------------------- | ------ |
| Prompt tests defined      | 4      |
| Edge cases considered     | 3      |
| Outputs consistent        | 4      |
| Works with minimal input  | 2      |
| Easy to reproduce results | 2      |

### Required tests

Every skill should define:

```
Basic prompt
Edge prompt
Complex prompt
```

---

# Linter Output Template

Developer should produce a report like this:

```
Skill: menu-board-designer

Metadata: 8/10
Progressive Disclosure: 12/15
Instruction Clarity: 14/15
Activation Discoverability: 8/10
Resource Organisation: 9/10
Script Integration: 7/10
Output Definition: 13/15
Testability: 11/15

Total: 82/100

Status: Good but improvable
```

---

# Common Problems the Linter Will Catch

### Overloaded SKILL.md

Most common mistake.

Fix:

Move large sections to `references/`.

---

### Weak skill activation

Description too vague.

Fix:

Add realistic prompts.

---

### Monolithic skills

Skills trying to solve multiple domains.

Fix:

Split into smaller skills.

---

### Unstructured instructions

Fix:

Add workflow steps.

---

# Refactor Strategy

When a skill scores:

### 90+

Leave as-is.

---

### 75–89

Minor improvements.

---

### 60–74

Needs refactor.

Typical fixes:

* move documentation
* simplify instructions
* improve triggers

---

### Below 60

Rewrite skill.

---

# Optional Advanced Metrics

For mature skill repositories.

| Metric                  | Goal        |
| ----------------------- | ----------- |
| Average SKILL.md length | < 400 lines |
| Average reference size  | < 2k lines  |
| Script count per skill  | < 5         |
| Activation accuracy     | > 90%       |

---

# Recommended Workflow for Your Repo

For **The Sign Age skills repo**, the developer should:

1. Iterate over every skill in `skills/`
2. Run the linter rubric
3. Produce `LINT_REPORT.md`
4. Refactor low scoring skills
5. Re-test activation

---

# One Final Rule

If the skill reads like **documentation**, it is probably wrong.

Skills should read like **a playbook for an agent**.

Short.
Structured.
Actionable.


