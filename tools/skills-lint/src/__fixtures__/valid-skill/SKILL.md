---
name: valid-skill
description: A well-structured test skill for validating the linter. Use when testing the skills linter produces correct results for a properly built skill.
license: MIT
metadata:
  author: test
  version: "1.0"
---

# Valid Skill

## Purpose

This is a minimal valid skill used as a test fixture.

## When to Use

Use this skill when you need to:

- test the skills linter
- validate scoring logic

## Do Not Use When

Do not use this skill in production.

## Workflow

1. Read the skill
2. Parse the frontmatter
3. Validate the structure
4. Generate a report

## Output Format

Return a lint report with:

- score out of 100
- findings list
- suggested actions
