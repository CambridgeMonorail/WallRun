# Guides

Practical how-to guides for common tasks in WallRun. These tutorials walk through specific features and implementation patterns.

## Documents in this Section

### [Creating Digital Signage Content](./creating-signage-content.md) ⭐

**Comprehensive guide to designing and building premium digital signage screens.** Learn to use the signage-architect agent, apply premium design standards, and create compelling signage for menus, dashboards, wayfinding, and more.

**Key Topics**: Signage architect agent, premium design patterns, gradient backgrounds, glass morphism, typographic hierarchy, signage types (menu/dashboard/wayfinding), adding to gallery, shadcnui-signage library

---

## BrightSign Digital Signage Player Guides

Complete documentation for deploying React applications to BrightSign hardware players.

### [BrightSign Initial Setup Guide](./brightsign-initial-setup.md) ⭐ START HERE

**First-time setup guide for BrightSign players.** Walk through creating setup in BrightAuthor:connected, enabling Local Diagnostic Web Server (LDWS), getting player on network, and verifying API access.

**Start here if**: You've never set up a BrightSign player before.

**Key Topics**: BrightAuthor:connected setup, LDWS configuration, network setup, HTTP Digest authentication, API verification

---

### [BrightSign Dual-Mode Workflow](./brightsign-dual-mode-workflow.md) ⭐ RECOMMENDED

**Development vs. Production deployment modes.** Learn the fast development workflow (player loads from dev server) and production deployment (full SD card deployment).

**Use when**: You're ready to start developing for BrightSign.

**Key Topics**: Development mode (network loading), production mode (SD deployment), remote debugging, workflow comparison, npm scripts

---

### [BrightSign Deployment Reference](./brightsign-deployment.md)

**Detailed deployment commands and troubleshooting.** Comprehensive reference for packaging, deploying, player configuration, and advanced scenarios.

**Use when**: You need detailed reference or troubleshooting help.

**Key Topics**: Packaging, deployment scripts, player configuration, fleet deployment, troubleshooting, HTTP API

---

### Quick Reference for BrightSign

```bash
# First-time setup
pnpm deploy:dev-mode          # Set up development mode (one-time)

# Scaffold a new BrightSign player app
pnpm scaffold:player --name player-arrivals
pnpm nx g sign-age:player-app --name player-arrivals

# Development workflow (fast iteration)
pnpm dev:brightsign           # Start dev server
# Edit code, save, refresh player (~2 seconds)

# Production deployment
pnpm deploy:player            # Build + package + deploy
pnpm deploy:player -- --app player-minimal --player dev-player
pnpm deploy:quick             # Quick deploy (existing build)

# Player management
pnpm player list              # List configured players
pnpm player add <name> <ip>   # Add new player
pnpm discover                 # Scan network for players
```

**Important**: BrightSign uses **HTTP Digest authentication** (not Basic auth). Always use `--digest` flag with curl.

---

### [Adding a New Component Page](./addding-new-component-page.md)

Step-by-step guide to adding new pages to your React SPA using React Router, including route configuration and navigation setup.

**Key Topics**: React Router, route configuration, navigation, page structure

---

### [Theming Your App](./theming-a-new-app.md)

Comprehensive guide to customizing your application's visual design using Shadcn UI and Tailwind CSS v4. Includes theme generation, color systems, and dark mode.

**Key Topics**: Shadcn UI themes, Tailwind v4 CSS-first config, color palettes, typography, dark mode

---

### [Navigation Structure](./navigation-structure.md)

Guide to implementing and customizing navigation patterns, including sidebar navigation, breadcrumbs, and mobile menus.

**Key Topics**: Navigation components, sidebar, breadcrumbs, responsive navigation, accessibility

---

### [Reusable React Components](./reusable-react-components.md)

Best practices for building reusable components in the monorepo, including component architecture, prop APIs, composition patterns, and documentation.

**Key Topics**: Component design, props and composition, TypeScript types, Storybook, testing

---

### [Effective CTA Guide](./effective-cta-guide.md)

Guidelines for creating effective call-to-action (CTA) components and patterns that drive user engagement.

**Key Topics**: CTA design, conversion optimization, button patterns, microcopy

---

## Related Documentation

- **[Getting Started](../getting-started/)** - Understand the project structure first
- **[Tooling](../tooling/)** - Productivity tools to accelerate development
- **[Integration](../integration/)** - Connect external services

---

[← Back to Documentation Index](../README.md)
