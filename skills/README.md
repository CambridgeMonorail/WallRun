# Skills

This directory contains reusable signage-domain skills for designing, building, and operating digital signage software with The Sign Age.

These skills are portable `SKILL.md` packages for AI-assisted development. They give an agent or developer domain-specific guidance on layout systems, animation, distance legibility, safe display boundaries, performance budgets, data refresh patterns, operational fallbacks, BrightSign deployment, player discovery, and review work.

All skills comply with the [Agent Skills Specification](https://agentskills.io/specification) and are consumable via portable skill tooling.

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

## Reusability Tiers

Skills are classified by how portable they are outside this repository. The tier determines whether a skill is visible to public consumers or requires an opt-in flag.

### Tier 1 — Fully reusable

No repo-specific references. Useful in any project.

- `signage-layout-system`: builds full-screen layouts for large displays, distance readability, and continuous operation
- `signage-animation-system`: designs motion that works on always-on public displays
- `signage-menu-board`: builds food and service menu boards with signage-first hierarchy rules
- `signage-distance-legibility`: enforces minimum text sizes, contrast, density, and hierarchy for distance viewing
- `signage-safe-layout`: enforces overscan, bezel, rotation, and resolution-independent constraints
- `signage-state-machine`: generates boot/load/content/fallback/offline state patterns for 24/7 displays
- `signage-data-refresh-patterns`: generates polling, backoff, and non-blocking data update patterns
- `signage-performance-budget`: checks bundle size, image weight, font loading, and frame-rate budgets
- `signage-content-fallbacks`: ensures graceful degradation when APIs or feeds fail
- `signage-placeholder-images`: plans consistent placeholder image names, dimensions, labels, alt text, and replacement notes for signage layouts before final creative arrives
- `chrome-devtools-webapp-debug`: investigates web app issues with browser evidence
- `instructions-detox`: audits instruction files for bloat, overlap, and stale rules

### Tier 2 — Portable with minor assumptions

Useful outside this repo but may reference common tooling conventions (e.g. monorepo structure, verification commands). Easily adapted.

- `shadcnui-component-review`: reviews shadcn/ui components in a component library

### Tier 3 — Repo-specific (internal)

Tied to this repository's BrightSign hardware, player tooling, or local infrastructure. Marked with `metadata.internal: true` in their frontmatter and hidden from public discovery by default.

To install internal skills, set the environment variable before running the CLI:

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills add CambridgeMonorail/TheSignAge
```

**Signage build and runtime:**

- `brightsign-signage-build`: bundles layout, runtime, packaging, and verification for BrightSign signage builds
- `brightsign-runtime`: explains how to adapt web apps to BrightSign hardware constraints

**Packaging and deployment:**

- `brightsign-package`: packages React apps for BrightSign OS 9.x players
- `brightsign-deploy-local`: deploys to local BrightSign players for fast iteration
- `brightsign-fleet-deploy`: publishes versioned builds for fleet-wide rollout
- `brightsign-debug`: helps diagnose BrightSign player issues

**Player discovery tooling:**

- `player-discovery-scan`: scans a subnet for BrightSign players
- `player-discovery-probe`: checks a single IP for BrightSign diagnostics
- `player-discovery-export`: exports discovery results to JSON and CSV

## Skill Directory Conventions

Each skill directory follows the [Agent Skills Specification](https://agentskills.io/specification) structure:

```
skills/<skill-name>/
  SKILL.md          # Skill contract (required, < 500 lines)
  references/       # Supporting documentation (detailed guides, workflows)
  assets/           # Static resources (templates, example files)
  scripts/          # Executable helpers
```

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
