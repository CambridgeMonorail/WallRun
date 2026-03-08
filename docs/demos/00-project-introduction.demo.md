# Demo Script: The Sign Age - Project Introduction

**Duration:** 3-5 minutes  
**Audience:** Developers interested in digital signage, Nx monorepos, or React applications  
**Goal:** Introduce The Sign Age project and its unique approach to digital signage

---

## Setup

**Before recording:**

- Clean VS Code workspace (close unnecessary files)
- Terminal ready at project root
- Browser ready (for showing live demo if desired)
- Check audio/video quality
- Have README.md ready to reference

---

## Script

### Introduction (30 seconds)

> "Hi, I'm [name] and today I'm introducing **The Sign Age** - a development framework for building custom digital signage applications with React."

**Show:** GitHub repository homepage

> "The Sign Age is an open-source project for web developers who want to build digital signage using the tools they already know - React, TypeScript, Tailwind, and modern component libraries."

### Who This Is For (45 seconds)

**Show:** Switch to VS Code - open README.md

> "This project is for web developers who already have React and TypeScript skills and want to build digital signage. If you're looking for a content management system - stop here. There are excellent CMS platforms like Embed Signage, Korbyt, Navori, and Signagelive that are perfect for managing content."

**Scroll to 'What this is not' section briefly**

> "But if you're a developer who needs complete control over your UI, wants to integrate custom data sources, or is building bespoke signage experiences - this is for you. The Sign Age provides:"

**Scroll through tech stack:**

- React 19 for component architecture
- Tailwind CSS v4 for styling
- shadcn/ui components adapted for signage
- Nx monorepo for scalable structure
- BrightSign deployment tooling

> "Everything is version-controlled, testable, and uses standard web development workflows you already know."

### Project Structure (1 minute)

**Show:** Explorer view in VS Code

> "Let's look at the structure. This is an Nx monorepo with several key libraries:"

**Navigate through folders:**

1.  **`libs/shadcnui`**

    > "Core UI components - buttons, cards, forms - organized by category. These are the building blocks."

2.  **`libs/shadcnui-signage`**

    > "Signage-specific components optimized for 10-foot viewing. Think high-contrast, large text, animations designed for distance viewing."

3.  **`libs/shadcnui-blocks`**

    > "Higher-level composed components - hero sections, feature grids, pricing tables."

4.  **`apps/client`**

    > "The main demo application - a single-page React app showcasing all the components."

5.  **`apps/player-minimal`**

    > "A minimal signage player app - this is what you'd actually deploy to digital signage hardware."

### Target Platform: BrightSign (45 seconds)

**Show:** `docs/guides/` folder, open `brightsign-deployment.md`

> "While these are standard React apps that run anywhere, we're specifically targeting BrightSign players - professional digital signage hardware."

**Scroll through deployment guide**

> "We've built complete tooling for BrightSign OS 9.x deployment, including:"

- Packaging React apps for BrightSign
- Local deployment via HTTP API
- Fleet deployment via GitHub Releases
- Remote debugging tools

**Show:** `scripts/` folder briefly

> "These scripts handle the entire deployment workflow."

### Development Experience (1 minute)

**Show:** Terminal

> "The development experience is streamlined. Let's look at the key commands:"

**Type (but don't run unless fast):**

```bash
pnpm install          # Install dependencies
```

> "Standard pnpm workspace setup."

```bash
pnpm serve:client     # Start development server
```

> "Launches the demo site with hot reload."

```bash
pnpm verify           # Pre-PR validation
```

> "This is our unified verification command - formats, lints, type-checks, tests, and builds all affected projects. We'll see more of this in future videos."

**Show:** Open `package.json`, scroll to scripts section

> "All commands use Nx's affected command system, so you only rebuild what changed."

### Design Philosophy (45 seconds)

**Show:** `docs/design/STYLE_GUIDE.md`

> "One unique aspect: we make a clear distinction between the demo website chrome and the signage content."

**Scroll through style guide**

> "The website itself - navigation, layouts, UI - follows a calm, premium B2B SaaS aesthetic. Think internal tooling, not marketing site."

> "But the signage content being demonstrated? That follows signage design rules: high visibility, 10-foot readability, bold and clear."

**Show quick example:** Open a signage component file

> "This separation means the presentation layer doesn't fight with the content it's presenting."

### Workflow Innovation (30 seconds)

**Show:** Root directory - highlight `AGENTS.md`

> "One more thing - this project is built with AI-assisted development in mind. We've created a comprehensive GitHub Copilot integration with custom instructions, workflow skills, and agent modes."

**Show:** `.github/` folder structure

> "In the next video, I'll show you how we've structured AI workflow guidance. It's honestly one of the most interesting parts of the project."

### Live Demo (optional, 30 seconds)

**If time permits, show browser:**

```bash
pnpm serve:client
```

**Open:** [http://localhost:4200/TheSignAge/](http://localhost:4200/TheSignAge/)

> "Here's the demo site running locally. You can browse the component library, see code examples, and test everything interactively."

**Quick tour:** Click through 2-3 component pages

### Closing (30 seconds)

**Show:** GitHub repository page again

> "The Sign Age is open source under the MIT license. We welcome contributions, feedback, and ideas."

**Show:** Link to repository, issues, discussions

> "In upcoming videos, I'll dive deeper into:"

- The Copilot workflow system (Phase 0 demo)
- Building signage-specific components
- BrightSign deployment workflows
- Real-world signage applications

> "Links in the description. Thanks for watching, and if you're building digital signage applications, give The Sign Age a try."

---

## Post-Recording Checklist

- Add title card with project name
- Add chapter markers:
- 0:00 Introduction
- 0:30 Who This Is For
- 1:15 Project Structure
- 2:00 BrightSign Platform
- 3:00 Development Experience
- 3:45 Design Philosophy
- 4:15 Workflow Innovation
- 4:45 Live Demo (if included)
- 5:15 Closing
- Add description with links:
- GitHub repository: [https://github.com/CambridgeMonorail/TheSignAge](https://github.com/CambridgeMonorail/TheSignAge)
- Documentation: [link]
- BrightSign platform: [link]
- Add relevant tags: #digitalSignage #React #TypeScript #OpenSource #BrightSign
- Add thumbnail with project logo
- Pin comment encouraging questions/feedback

---

## Notes

- **Keep energy high** - this is an introduction, make it exciting
- **Show, don't just tell** - use VS Code and terminal actively
- **Time management** - if running long, skip live demo section
- **Call to action** - encourage viewers to check out Phase 0 demo next
