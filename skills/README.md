# Skills

This directory is the canonical source for the repository's portable `SKILL.md` skill definitions.

## Why this exists

- Portable skill consumers can discover skills from a top-level `skills/` directory.
- The open skills CLI can install from this repository with `npx skills add CambridgeMonorail/TheSignAge`.
- GitHub Copilot still expects `.github/skills/`, so that tree is generated from this one.

## Workflow

1. Edit or add skills in `skills/`.
2. Run `pnpm sync:skills`.
3. Run `pnpm check:skills` to confirm the mirror is in sync.
4. Commit both `skills/` and the generated `.github/skills/` mirror.

## Notes

- Do not treat `.github/skills/` as the source of truth.
- The skills CLI supports project or global installs and can target multiple agent ecosystems.