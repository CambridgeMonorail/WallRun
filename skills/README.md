# Skills

This directory contains reusable workflow skills for building and operating digital signage software with The Sign Age.

These skills are portable `SKILL.md` packages for AI-assisted development. They give an agent or developer domain-specific guidance for planning, debugging, verification, BrightSign deployment, signage layout design, player discovery, and review work.

In practical terms, this directory turns repository knowledge into installable operational guidance. It complements the component libraries and example screens by documenting how to work with them effectively.

## What This Directory Contains

Each subdirectory contains one skill with its own `SKILL.md` contract.

Each contract usually defines:

- what problem the skill is for
- when to invoke it
- what inputs it expects
- what kind of output it should produce
- what constraints or guardrails apply

In practice, that means a consumer can install these skills and get signage-specific help rather than generic coding assistance.

## Skill Groups

### Signage Design and Runtime

- `signage-layout-system`: builds full-screen layouts for large displays, distance readability, and continuous operation
- `signage-animation-system`: designs motion that works on always-on public displays
- `brightsign-runtime`: explains how to adapt web apps to BrightSign hardware constraints

### BrightSign Packaging and Deployment

- `brightsign-package`: packages React apps for BrightSign OS 9.x players
- `brightsign-deploy-local`: deploys to local BrightSign players for fast iteration
- `brightsign-fleet-deploy`: publishes versioned builds for fleet-wide rollout
- `brightsign-debug`: helps diagnose BrightSign player issues

### Player Discovery Tooling

- `player-discovery-scan`: scans a subnet for BrightSign players
- `player-discovery-probe`: checks a single IP for BrightSign diagnostics
- `player-discovery-export`: exports discovery results to JSON and CSV

### Engineering Workflow Skills

- `planning`: creates structured implementation plans for multi-step work
- `systematic-debugging`: drives root-cause debugging with evidence and verification
- `verification`: runs and summarizes validation before review
- `code-review-ready`: evaluates whether a change set is ready for PR review
- `chrome-devtools-webapp-debug`: investigates web app issues with browser evidence
- `instructions-detox`: audits instruction files for bloat, overlap, and stale rules
- `shadcnui-component-review`: reviews shadcn/ui components in the library

## Why It Is Structured This Way

This repository supports two different consumers:

- portable skill tooling that expects a top-level `skills/` directory
- GitHub Copilot, which expects skills under `.github/skills/`

Because of that, `skills/` is the source of truth and `.github/skills/` is a generated mirror.

## Install and Consumption

Portable skill consumers can install from this repository with:

```bash
npx skills add CambridgeMonorail/TheSignAge
```

The skills CLI supports project or global installs and can target multiple agent ecosystems.

That means the repository can distribute not only components and examples, but also the workflows used to build, validate, and operate them.

## Editing Workflow

1. Edit or add skills in `skills/`.
2. Run `pnpm sync:skills` to regenerate `.github/skills/`.
3. Run `pnpm check:skills` to confirm the mirror is in sync.
4. Commit both `skills/` and `.github/skills/` when the generated mirror changes.

## Important Notes

- Do not treat `.github/skills/` as the source of truth.
- Keep skill descriptions concrete and outcome-oriented.
- Prefer one clear workflow per skill over broad, ambiguous instructions.
- Frame this directory as workflow infrastructure for building and operating signage software.
