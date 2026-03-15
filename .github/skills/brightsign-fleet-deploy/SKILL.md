---
name: brightsign-fleet-deploy
description: Build, version, and publish React apps to GitHub Releases for fleet-wide BrightSign player updates. Use when deploying to multiple players simultaneously or setting up automated release pipelines.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.1"
  internal: true
---

# BrightSign Fleet Deploy Skill

Publish production-ready React applications to GitHub Releases for fleet-wide deployment to BrightSign OS 9.x players.

## When to Use This Skill

Use this skill when you need to:

- deploy to multiple BrightSign players simultaneously
- version and track releases semantically (semver)
- provide downloadable packages for player update systems
- enable players to poll for and self-update
- maintain rollback capabilities with versioned releases

## Do Not Use When

- deploying to a single development player (use `brightsign-deploy-local`)
- packaging an app without publishing (use `brightsign-package`)
- debugging a player issue (use `brightsign-debug`)

## Fleet Deployment Overview

Fleet deployment follows this pipeline:

1. **Version** — bump semver in `package.json`
2. **Build** — create production bundle via Nx
3. **Package** — zip bundle with `manifest.json` (version, checksum, URL)
4. **Publish** — upload to GitHub Releases as downloadable artifact
5. **Notify** — update manifest endpoint for player polling
6. **Rollout** — players check version, download if newer, install and reboot

## Workflow

### Step 1: Version your release

Follow semantic versioning (MAJOR.MINOR.PATCH):

| Bump    | When                                  | Auto-update safe? |
| ------- | ------------------------------------- | ----------------- |
| Patch   | Bug fixes, no new features            | Yes               |
| Minor   | New features, backward compatible     | Yes               |
| Major   | Breaking changes                      | No — manual only  |

### Step 2: Build and package

```bash
nx build player-minimal --configuration=production
pnpm package:player
```

Production checklist:

- Bundle size < 200KB gzipped
- Source maps disabled or separate
- console.log removed
- Environment variables set correctly
- API endpoints point to production

### Step 3: Create manifest and checksum

Generate `manifest.json` with version, commit SHA, build time, and SHA-256 checksum. See [manifest schema and versioning](references/manifest-and-versioning.md) for the full template and field definitions.

### Step 4: Publish to GitHub Releases

Three options: GitHub Web UI (manual), GitHub CLI (`gh release create`), or GitHub API (curl). See [publishing and rollback](references/publishing-and-rollback.md) for commands and automation scripts.

### Step 5: Update manifest endpoint

Publish the latest `manifest.json` to a known URL that players poll:

- **GitHub Pages**: `docs/releases/latest-manifest.json`
- **S3/CDN**: upload to bucket
- **GitHub Gist**: quick public endpoint

### Step 6: Configure player auto-update

Players need an `UpdateChecker` component that polls the manifest endpoint. See [fleet deploy code examples](references/examples.md) for the full React component and fleet deploy script.

### Step 7: Verify rollout

- Confirm release appears at expected GitHub Releases URL
- Verify manifest endpoint returns correct version
- Check at least one player picks up the update

## Rollback Strategy

If a release has issues:

1. Identify last good version (`gh release list`)
2. Update manifest endpoint to point to previous version
3. Commit and push the manifest change
4. Players download previous version on next poll cycle

See [publishing and rollback](references/publishing-and-rollback.md) for detailed commands.

## Output Format

When executing a fleet deploy, produce:

1. Version number deployed
2. GitHub Releases URL
3. Manifest endpoint URL
4. Package checksum
5. Confirmation that at least one player received the update (if testable)

## Safety Controls

- Always verify bundle size before publishing
- Always verify checksum in manifest matches package
- Never publish a release without a successful production build
- Never auto-update major version bumps — require manual approval
- Tag releases in git for traceability

## Reference Files

- [Manifest schema and versioning](references/manifest-and-versioning.md) — manifest.json template, field definitions, checksum generation
- [Publishing and rollback](references/publishing-and-rollback.md) — GitHub Releases publishing (CLI, API, manual), rollback commands
- [Fleet deploy code examples](references/examples.md) — UpdateChecker component, fleet deploy script, version comparison logic

## Constraints

- Requires GitHub CLI (`gh`) or API token for automated publishing
- Players must have network access to poll manifest endpoint
- BrightSign OS 9.x minimum
- Package must include `autorun.brs` (see `brightsign-package` skill)
