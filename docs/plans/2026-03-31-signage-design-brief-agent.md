# Signage Design Brief Agent Plan

## Goal

Add a custom Copilot agent that creates implementation-ready markdown design briefs for digital signage and writes each new brief into its own folder under `docs/signage design briefs/`.

## Context

The repository already stores signage concept briefs under `docs/signage design briefs/`, but brief creation is currently driven by ad hoc prompts. A dedicated agent should make the workflow repeatable and ensure every brief:

- uses a consistent markdown structure
- is written in British English
- is optimised for large-format signage and distance readability
- avoids code and framework-level implementation detail
- is saved directly into a new per-brief folder

The agent should follow the existing menu-board-focused brief pattern while improving structure and reuse.

## Scope

In scope:

- add a new agent under `.github/agents/`
- encode the brief-writing workflow, required inputs, and output structure
- require that each brief is written to `docs/signage design briefs/<Brief Name>/design brief.md`

Out of scope:

- generating a brief in this change
- adding a separate skill unless later needed
- wiring in automation beyond the agent instructions themselves

## Planned Changes

1. Create a new agent file for signage design brief creation.
2. Set the agent model to `GPT-5.4`.
3. Define a clear evidence policy for required brief inputs and overwrite protection.
4. Define the markdown output structure based on the supplied prompt.
5. Add an optional handoff to the existing signage implementation agent.

## Files To Change

- `.github/agents/signage-design-brief-writer.agent.md`
- `docs/plans/2026-03-31-signage-design-brief-agent.md`

## Acceptance Criteria

- the new agent is discoverable for signage brief and menu-board brief requests
- the agent defaults to `GPT-5.4`
- the agent instructs Copilot to create a new folder per brief under `docs/signage design briefs/`
- the agent includes mission, operating rules, evidence policy, tool guidance, output format, and definition of done
- the agent preserves the user's supplied brief structure and style requirements

## Validation

- inspect the new agent file for valid frontmatter and clear discovery language
- confirm the file path and naming convention match existing `.github/agents/` usage
- confirm the output instructions explicitly target `docs/signage design briefs/<Brief Name>/design brief.md`
