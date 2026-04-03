# GitHub Actions Workflows Documentation

This document describes the workflows currently present in `.github/workflows/`.

## CI Workflow

### Purpose

This workflow is set up for **Continuous Integration (CI)**, automatically running tests and validations on code changes pushed to the main branch. It ensures code quality and functionality before merging.

### Triggers

- **Push** events on the `main` branch.
- **Pull requests** targeting the `main` branch.
- **Manual trigger** via `workflow_dispatch`.

### Key Steps

1. **Setup**:
   - Checks out the repository.
   - Sets up Node.js v22 and installs `pnpm`.
2. **Dependencies**:
   - Installs dependencies with retry logic and caches the pnpm store.
3. **Nx Tasks**:
   - Executes `pnpm exec nx affected` commands for `lint`, `test`, and `build` on affected projects.

### Usage

This workflow runs on every push and pull request to `main`, helping developers catch issues early in the development process.

---

## Deploy to GitHub Pages Workflow

### Purpose

This workflow automates the **deployment** of the built application to **GitHub Pages**, updating the hosted application on every relevant change.

### Triggers

- **Push** events on the `main` branch.
- **Manual trigger** via `workflow_dispatch`.

### Key Steps

1. **Setup**:
   - Checks out the repository.
   - Sets up Node.js v22 and installs `pnpm`.
2. **Build**:
   - Builds the client app for `/WallRun/`.
   - Builds Storybook for `/WallRun/storybook/`.
   - Verifies the generated outputs before upload.
3. **Deploy**:
   - Uploads the combined Pages artifact from `dist/apps/client`.
   - Deploys to GitHub Pages using `actions/deploy-pages@v4`.

### Usage

This workflow keeps the public site updated by deploying the latest build to GitHub Pages each time changes are pushed to `main`.

---

## Notes

- The CI workflow contains commented placeholders for optional Playwright install, preview startup, and E2E execution.
- The deploy workflow publishes both the client app and Storybook from the same Pages artifact.
- This file should stay aligned with `.github/workflows/ci.yml` and `.github/workflows/deploy.yml`; remove historical project names when workflows change.
