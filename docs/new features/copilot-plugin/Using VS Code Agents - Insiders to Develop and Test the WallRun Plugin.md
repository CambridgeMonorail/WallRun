# Using VS Code Agents - Insiders to Develop and Test the WallRun Plugin

## Purpose

This document explains how to use **VS Code Agents - Insiders** as the development and testing environment for the WallRun Copilot agent-plugin.

It complements the main plugin spec. It does not replace it.

The plugin remains the **distribution format**.
The Agents app becomes the **development workbench**.

---

## Mental model

Think of the system as three layers:

### 1. WallRun repo (source of truth)

Where you actually author things:

- `/skills` → source skills
- `/.github/agents` → source agents
- `/scripts` → packaging + deploy logic
- `/.vscode/mcp.json` → workspace MCP config

### 2. WallRun plugin (generated)

What gets installed:

```text
copilot-plugins/wallrun-signage/
```

Contains:

- `plugin.json`
- curated `skills/`
- `agents/`
- optional `hooks.json`
- optional `.mcp.json`

### 3. VS Code Agents app (runtime)

Where you:

- run agent sessions
- test workflows
- debug behaviour
- execute terminal-backed tasks

---

## Why the Agents app matters

Without it:

- you are guessing how the agent behaves

With it:

- you can **see decisions, plans, and tool usage**
- you can **run real commands via terminal tools**
- you can **debug agent selection and skill usage**

This is especially important for WallRun because:

> signage is not just generation, it is execution

---

## Setup

### 1. Install prerequisites

- VS Code **Insiders**
- Agents app enabled (preview feature)

### 2. Build the plugin

```bash
pnpm plugin:copilot:build
pnpm plugin:copilot:check
```

### 3. Register plugin locally

```json
"chat.pluginLocations": {
  "/absolute/path/to/WallRun/copilot-plugins/wallrun-signage": true
}
```

### 4. Reload VS Code

---

## Development workflow

### Standard loop

1. Edit skills or agents in repo
2. Rebuild plugin
3. Open Agents app
4. Start a new agent session
5. Run a realistic task
6. Inspect behaviour
7. Refine

Repeat until behaviour is boringly correct.

---

## What to test

### 1. Agent selection

Test prompts like:

- “Build a digital menu board”
- “Deploy this to a BrightSign player”
- “Package this for XC5 portrait”

Check:

- correct agent is selected
- `wallrun-deploy` is used when appropriate
- `signage-architect` is used for layout/design

---

### 2. Skill usage

Check that the agent:

- references correct WallRun skills
- does not hallucinate capabilities
- uses BrightSign-specific skills when needed

If it ignores your skills, your naming or descriptions are off.

---

### 3. Terminal-driven workflows

This is where the Agents app becomes genuinely useful.

Test flows like:

- “Package this for BrightSign”
- “Deploy locally to a player”

Expected behaviour:

- agent suggests or runs:
  - `pnpm package:player`
  - `pnpm deploy:local`

- agent explains what is happening
- agent reacts to output

If the agent cannot bridge to real commands, you have built documentation, not a system.

---

### 4. Deployment realism

The agent must:

- ask for missing info (IP, target, environment)
- refuse to invent deployment success
- distinguish between:
  - local dev
  - local player
  - fleet deploy

If it says “deployment complete” without evidence, fix it immediately.

---

### 5. Preflight reasoning

Before deployment, the agent should check:

- orientation
- resolution
- safe areas
- fallback states
- autoplay assumptions

This should feel like a cautious engineer, not a cheerleader.

---

## Using Agent Debug Logs

Turn this on early.

Use it to answer:

- why was this agent selected?
- which skills were considered?
- why did it choose this action?
- why did it ignore something obvious?

If behaviour feels wrong, the logs will usually explain why.

---

## Designing `wallrun-deploy` for the Agents app

This agent should assume:

- it can interact with terminals
- it may run multi-step workflows
- it needs to maintain state across steps

### Good behaviour

- breaks work into steps
- checks results before continuing
- surfaces uncertainty
- prefers explicit commands

### Bad behaviour

- vague summaries
- pretending deployment happened
- skipping validation
- ignoring script outputs

---

## Recommended interaction pattern

The agent should behave like this:

1. Identify intent
2. Clarify missing inputs
3. Choose deployment path
4. Suggest or execute command
5. Inspect result
6. Decide next step

This is closer to a build tool than a chatbot.

---

## Hooks in the Agents workflow

Hooks run after responses.

In the Agents app, they act as:

- guard rails
- sanity checks

Use them to flag:

- missing fallback states
- unrealistic assumptions
- unsafe deployment claims

Do not:

- mutate output silently
- block everything
- try to be clever

---

## MCP usage in Agents

Keep MCP simple in v1:

- documentation lookup
- BrightSign reference access

Do not:

- trigger deploy actions
- mutate systems
- depend on MCP for core workflows

Terminal + scripts are more reliable early on.

---

## Common failure modes

### 1. Plugin not loading

Cause:

- invalid plugin name
- bad paths
- missing files

Fix:

- check `plugin.json`
- run `plugin:copilot:check`

---

### 2. Agent not selected

Cause:

- weak agent description
- overlapping responsibilities

Fix:

- tighten agent descriptions
- reduce ambiguity

---

### 3. Skills ignored

Cause:

- naming mismatch
- unclear skill descriptions

Fix:

- align skill name + purpose
- simplify descriptions

---

### 4. Overconfident deploy behaviour

Cause:

- agent written like documentation
- no constraints in instructions

Fix:

- explicitly forbid “fake success”
- require evidence-based responses

---

### 5. Terminal misuse

Cause:

- agent not designed for execution
- unclear step boundaries

Fix:

- structure agent around steps
- expect command + output loop

---

## What success looks like

You can open the Agents app and say:

> “Take this WallRun project and get it onto a BrightSign player”

And the system:

- asks sensible questions
- chooses the right workflow
- runs or recommends real commands
- validates assumptions
- stops when it should

At that point:

- the plugin is useful
- the agent is grounded
- the system behaves like software, not a demo

---

## Final note

The Agents app is not the product.

It is the **place you prove the product works**.

The plugin is the product.

WallRun becomes interesting when:

- the plugin installs cleanly
- the agent behaves predictably
- the deploy flow is grounded in real execution

Everything else is just a pleasant conversation.
