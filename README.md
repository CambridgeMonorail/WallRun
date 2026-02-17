<p align="center">
    <img src="docs/images/logos/app-logo.svg" alt="The Sign Age Logo" width="25%" height="25%">
</p>

# The Sign Age

![Project Status](https://img.shields.io/badge/status-alpha-orange?style=for-the-badge)
![Version](https://img.shields.io/github/package-json/v/CambridgeMonorail/TheSignAge?style=for-the-badge)
![Build Status](https://img.shields.io/github/actions/workflow/status/CambridgeMonorail/TheSignAge/ci.yml?style=for-the-badge)
![Deploy Status](https://img.shields.io/github/actions/workflow/status/CambridgeMonorail/TheSignAge/deploy.yml?label=deploy&style=for-the-badge)
![License](https://img.shields.io/github/license/CambridgeMonorail/TheSignAge?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/CambridgeMonorail/TheSignAge?style=for-the-badge)

**NOTE: This project is currently in alpha. In fact, it's very alpha. This means it is still under active development and may undergo significant changes. Features may be incomplete or unstable. Got suggestions on what you would like to see or how to make it better? Add an issue and let us know!**

## 🚀 Live Demo

- **Client App:** [https://cambridgemonorail.github.io/TheSignAge/](https://cambridgemonorail.github.io/TheSignAge/)
- **Storybook:** [https://cambridgemonorail.github.io/TheSignAge/storybook/](https://cambridgemonorail.github.io/TheSignAge/storybook/) - Browse signage components

## ✨ Key Features

- **`@tsa/shadcnui-signage`** - Purpose-built React component library for digital signage (distance-readable typography, fixed-aspect layouts, deterministic rendering)
- **BrightSign Deployment Workflow** - Production-ready scripts for packaging and deploying to BrightSign OS 9.x players ([guide](./docs/guides/brightsign-deployment.md))
- **Signage Architect Agent** - AI accelerator for building premium signage screens with GitHub Copilot ([.github/agents/signage-architect.agent.md](./.github/agents/signage-architect.agent.md))
- **Production-Ready Examples** - Restaurant menus, office directories, KPI dashboards, event schedules, and more
- **BrightSign Platform Integration** - MCP server support for device documentation and platform research

## 🚀 Quick Start: BrightSign Development

Get started with BrightSign player development in 3 commands:

```bash
# 1. Initialize configuration files
pnpm setup:dev

# 2. Add your BrightSign player
pnpm player add dev-player 192.168.0.51 --default

# 3. Build and deploy
pnpm deploy:player
```

The setup script creates:
- `.env` for environment variables (optional)
- `.brightsign/players.json` for player registry (git-ignored)

See [BrightSign Player Configuration](./docs/guides/brightsign-player-config.md) for full details.

## Table of Contents

- [Overview](#overview)
- [Statement of Intent](#statement-of-intent)
- [What This Repo Contains](#what-this-repo-contains)
- [Developer Tooling](#developer-tooling)
- [Installation](#installation)
- [Common Commands](#common-commands)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

**The Sign Age** is an exploration of digital signage as software.

This repository exists to document, prototype, and share practical work around building bespoke, generative, and data-driven content for digital signage players—especially **BrightSign** devices—from the perspective of experienced frontend developers.

Digital signage is often treated as a solved problem: templates, slide decks, CMS tools, and marketing abstractions. That works for some use cases, but it leaves a large amount of creative and technical potential unexplored.

This project starts from a different assumption: signage screens are computers bolted to walls.

## Statement of Intent

The intent of this repository is to:

- Treat signage players as programmable systems, not presentation tools
- Translate signage concepts into mental models familiar to web and frontend engineers
- Explore what is possible when modern web technologies meet always-on, unattended hardware
- Be honest about constraints, quirks, trade-offs, and failure cases
- Share real experiments, not polished marketing narratives

This is not a CMS. This is not official BrightSign documentation. It is a working notebook for people who already know how to build software and want to apply that skill to screens that live in physical space.

If something here feels unfinished, opinionated, or slightly uncomfortable, that is intentional. The goal is to surface the edges of the platform, not to smooth them away.

**Signage is software. It deserves to be treated as such.**

## What This Repo Contains

This is an **Nx + pnpm** monorepo with a focus on tooling and reusable UI building blocks for signage:

### Component Libraries

- **`libs/shadcnui-signage`** ⭐ - **Primary focus**: Signage-specific React components
  - Distance-readable typography (10-foot rule)
  - Fixed-aspect primitives, layouts, and blocks
  - Deterministic rendering for 1080p/4K screens
  - Designed for always-on, unattended displays
  - [View in Storybook](https://cambridgemonorail.github.io/TheSignAge/storybook/?path=/docs/1-signage-primitives-screenframe--docs) | [Source](./libs/shadcnui-signage/)

- **`libs/shadcnui` / `libs/shadcnui-blocks`**: Supporting component primitives (our copy of shadcn/ui) and compositions for demo website

### Applications

- **`apps/client`**: Demo site showcasing signage examples and components (**[View Live Demo](https://cambridgemonorail.github.io/TheSignAge/)**)
- **`apps/player-minimal`**: BrightSign deployment target with status monitoring (**[Deployment Guide](./docs/guides/brightsign-deployment.md)**)
- **Storybook**: Interactive component documentation (**[Browse Components](https://cambridgemonorail.github.io/TheSignAge/storybook/)**)

### Deployment Tools

- **`scripts/package-player.mjs`** - Package React apps for BrightSign OS 9.x with autorun.brs bootstrap
- **`scripts/deploy-local.mjs`** - Deploy to local BrightSign players via HTTP API (port 8008)
- **`.github/skills/brightsign-*`** - AI context for BrightSign packaging, deployment, and debugging

### AI Accelerators

- **`.github/agents/signage-architect.agent.md`** - GitHub Copilot agent for building premium signage screens
  - Emphasizes distance readability, deterministic layouts, and 24/7 operation
  - Enforces signage design principles (not website patterns)
  - Integrates with BrightSign platform documentation via MCP
  - [View agent definition](./.github/agents/signage-architect.agent.md)

### Demo Site

The demo site (`apps/client`) showcases digital signage concepts in action:

- **Landing Page**: Explains the project purpose and approach
- **Gallery**: Directory of full-screen signage examples
- **Signage Examples**: Welcome screens, restaurant menus, office directories, KPI dashboards, announcements boards, and event schedules

Run `pnpm run serve:client` and visit `http://localhost:4200/TheSignAge/` to explore the examples.

## Developer Tooling

This repo is designed to feel familiar to frontend engineers:

- **React 19 + Vite** for fast local development
- **TypeScript (strict)** for safe iteration
- **Tailwind CSS v4 + shadcn/ui** for rapid UI composition
- **Vitest + Testing Library** for unit/component tests
- **Playwright** for E2E tests (when the UI flow is critical)
- **Nx “affected” workflows** to keep validation fast (`lint`, `type-check`, `test`, `build`)

It also includes opinionated workflow support:

- **`pnpm verify`** as the “definition of done”
- **GitHub Copilot instructions + agents** to keep AI-assisted work consistent
- **MCP server configuration** (including BrightDeveloper) to support device/platform research

## Technologies Used

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Nx](https://img.shields.io/badge/Nx-143055?style=for-the-badge&logo=nx&logoColor=white)](https://nx.dev/)
[![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://www.markdownguide.org/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcn&logoColor=white)](https://ui.shadcn.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=github-copilot&logoColor=white)](https://github.com/features/copilot)

- **React**: [A JavaScript library for building user interfaces.](https://reactjs.org/)
- **TypeScript**: [A typed superset of JavaScript that compiles to plain JavaScript.](https://www.typescriptlang.org/)
- **Node.js**: [A JavaScript runtime built on Chrome's V8 JavaScript engine.](https://nodejs.org/)
- **Nx**: [A set of extensible dev tools for monorepos, which helps in managing and scaling the project.](https://nx.dev/)
- **Markdown**: [A lightweight markup language for creating formatted text using a plain-text editor.](https://www.markdownguide.org/)
- **pnpm**: [A fast, disk space-efficient package manager.](https://pnpm.io/)
- **Vite**: [A build tool that provides a faster and leaner development experience for modern web projects.](https://vitejs.dev/)
- **GitHub**: [A platform for version control and collaboration.](https://github.com/)
- **GitHub Actions**: [A CI/CD service that allows you to automate your build, test, and deployment pipeline.](https://github.com/features/actions)
- **Tailwind CSS**: [A utility-first CSS framework for styling the components.](https://tailwindcss.com/)
- **shadcn/ui**: [A set of reusable UI components for consistent design.](https://ui.shadcn.dev/)
- **React Router**: [A library for routing in React applications.](https://reactrouter.com/)
- **Vitest**: [A Vite-native unit testing framework.](https://vitest.dev/)
- **Playwright**: [An end-to-end testing framework.](https://playwright.dev/)
- **Visual Studio Code**: [A source-code editor made by Microsoft for Windows, Linux, and macOS.](https://code.visualstudio.com/)
- **GitHub Copilot**: [An AI pair programmer that helps you write code faster and with less work.](https://github.com/features/copilot)

## Installation

To install the project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/CambridgeMonorail/TheSignAge.git
   ```

2. Navigate to the project directory:

   ```sh
   cd TheSignAge
   ```

3. Install dependencies:

   ```sh
   pnpm install
   ```

## Usage

To run the dev server for your app, use:

```sh
npx nx serve client
```

To create a production bundle:

```sh
npx nx build client
```

To see all available targets to run for a project, run:

```sh
npx nx show project client
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Common Commands

- Dev app: `pnpm run serve:client`
- Storybook: `pnpm run serve:storybook`
- Verify (fast, affected only): `pnpm run verify`
- Full validation (slower): `pnpm run validate`
- **Deploy to BrightSign**: `pnpm run deploy:player` (see [deployment guide](./docs/guides/brightsign-deployment.md))

## Documentation

### Quick Links
BrightSign Deployment Guide](./docs/guides/brightsign-deployment.md)** ⭐ - Deploy React apps to BrightSign OS 9.x players
- **[Creating Digital Signage Content](./docs/guides/creating-signage-content.md)**
- **[Creating Digital Signage Content](./docs/guides/creating-signage-content.md)** ⭐ - Comprehensive guide to building premium signage screens
- **[Getting Started](./docs/getting-started/README.md)** - Project structure and setup
- **[Guides](./docs/guides/README.md)** - Practical how-to tutorials
- **[Documentation Index](./docs/README.md)** - Full documentation overview

### Key Resources

- Signage component library: [libs/shadcnui-signage/README.md](./libs/shadcnui-signage/README.md)
- Copilot + workflow tooling: [docs/tooling/github-copilot-tooling.md](./docs/tooling/github-copilot-tooling.md)
- Agent workflows: [AGENTS.md](./AGENTS.md)

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for the project's development plan, including:

- ✅ Completed features (Q4 2025 - Q1 2026)
- 🚧 In-progress work (Component enrichment, documentation)
- 📋 Planned features (Q2 2026: DataFetcher, WeatherWidget, QRCodeDisplay, etc.)
- 🔮 Future vision (Platform integration, content management, industry templates)

**Target for v1.0:** Q3 2026

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes. For detailed guidelines on how to contribute, see [Contributing](./docs/contributing/CONTRIBUTING.md).

### Contributing / Security / Issues

- Contributing guide: [docs/contributing/CONTRIBUTING.md](./docs/contributing/CONTRIBUTING.md)
- Code of Conduct: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- Security policy: [SECURITY.md](./SECURITY.md)
- Issues: [github.com/CambridgeMonorail/TheSignAge/issues](https://github.com/CambridgeMonorail/TheSignAge/issues) (bug reports, feature requests, and docs improvements)

## License

This project is licensed under the MIT License.

## Acknowledgments

- [joshuarobs/nx-shadcn-ui-monorepo](https://github.com/joshuarobs/nx-shadcn-ui-monorepo)
- [Shadcn UI](https://github.com/shadcn-ui/ui)
- [Nx](https://nx.dev)
- [BrightDev MCP Server](https://github.com/BrightDevelopers/BrightDev): Model Context Protocol server providing access to BrightSign platform documentation for AI-assisted development
- [Placebeard](https://placebeard.it/): A fantastic service for placeholder images featuring bearded individuals, inspired by similar services like placekitten.com and placedog.com. We appreciate their free service for adding a touch of fun to our project.
- [unDraw](https://undraw.co/): Open-source illustrations for any idea you can imagine and create. A constantly updated design project with beautiful SVG images that you can use completely free and without attribution. Created by [Katerina Limpitsouni](https://x.com/ninaLimpi).
- [Shadcn UI Theme Generator](https://www.readyjs.dev/tools/shadcn-ui-theme-generator): A tool for generating themes for Shadcn UI.

## Useful Links

- Nx docs: https://nx.dev/
- shadcn/ui: https://ui.shadcn.dev/
- Tailwind CSS: https://tailwindcss.com/
