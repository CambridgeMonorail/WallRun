# WallRun: Roadmap

This roadmap focuses on what we plan to build, organized by developer value and complexity. The priority is **shipping to real BrightSign players** with a fast, repeatable developer workflow.

**Current Status:** Alpha (v0.x) - Core UI library functional, deployment workflow needed

**Development Philosophy:** React (optionally with Node) running on the player. No BrightAuthor-style authoring. Developer-friendly deployment loop.

---

## ✅ Foundation Complete (Q4 2025 - Q1 2026)

- Nx + pnpm monorepo, Tailwind v4, shadcn/ui base components
- Signage component library (`@wallrun/shadcnui-signage`): primitives, layouts, blocks, behaviors
- Vitest + Testing Library, Storybook, GitHub Actions CI/CD
- Component registry for `npx shadcn add` installation
- GitHub Copilot instructions and agents

[View detailed component list in libs/shadcnui-signage/README.md](./libs/shadcnui-signage/README.md)

---

## 🎯 Priority 0: Developer Deployment Loop (Q1 2026) **DO THIS FIRST**

**Why:** Without a fast deploy loop, everything feels hard. Developers need "build → ship → see on screen" in minutes.

### 0.1 "Hello Player" Deploy Loop ⭐ **CRITICAL**

**Goal:** Build a React app, ship it to a player, see it on screen in minutes.

**Deliverables:**

- [ ] Tiny React status page app (version + build timestamp + uptime)
- [ ] **Local network deploy script**: Push assets to player storage via HTTP/SSH and restart
- [ ] **Fleet deploy script**: Publish zipped package to URL, player fetches and installs
- [ ] Tutorial: "Your first BrightSign deployment in 10 minutes"

**BrightDev Leverage:** BrightDev positions "Hello BrightSign on a Single Player" as stage 1 and provides MCP server for generating correct platform code.

**Success Criteria:** A developer with zero BrightSign experience can deploy a working React app to hardware in under 15 minutes.

### 0.2 Player Debugging Basics

**Goal:** Diagnose without guessing. Know what's happening on the player.

**Deliverables:**

- [ ] One-page debug playbook: find IP, open inspector, fetch logs, common issues
- [ ] Helper scripts for enabling diagnostic access and querying device info
- [ ] Debug overlay component (toggle with keyboard/touch, shows: version, network status, last API call, memory usage)

**BrightSign Leverage:** BrightSign's diagnostic web server and shell/CLI for interaction.

### 0.3 Packaging Pattern for React + Node on Player

**Goal:** Repeatable structure for "web app plus local services".

**Deliverables:**

- [ ] Project template: React UI + optional Node sidecar (same JS context as Chromium)
- [ ] Clear rules: what goes in Node vs browser code
- [ ] Bundling guidance: avoid shipping 2,000-file node_modules
- [ ] Example: Node HTTP server on player for local control endpoints

**BrightSign Leverage:** BrightSign documents shared Node/Chromium execution context, local servers, storage paths.

---

## 📋 Priority 1: CMS-Driven Content (Q2 2026) **SIMPLE, HIGH VALUE**

**Why:** Proves end-to-end value without hardware APIs. Real-world use case that's immediately shippable.

### 1.1 Headless CMS Menu Board (Restaurant) ⭐

**Use Case:** Small chain wants breakfast/lunch menus, "sold out" flags, instant price changes without republishing.

**Deliverables:**

- [ ] **DataFetcher** component - Periodic API polling with error handling and retry logic
- [ ] Example: Contentful menu board integration (live demo + docs)
- [ ] Local caching: last known good data so screen works when network fails
- [ ] Time-of-day mode switching (leverage existing ScheduleGate)
- [ ] Staff debug overlay (toggle locally to see data freshness, API status)
- [ ] Tutorial: "Build a menu board in 30 minutes"

**Component Additions:**

- [ ] **PriceTag** primitive - Large price display with currency formatting
- [ ] **MenuGrid** block - Three-column layout optimized for menu boards

### 1.2 Campaign Scheduler via CMS

**Use Case:** Retail campaigns with date windows and store targeting.

**Deliverables:**

- [ ] JSON campaign model with date windows and targeting rules
- [ ] On-device rule evaluation (no server round-trip for display logic)
- [ ] Preload next campaign assets (never blank the screen during transition)
- [ ] Example: Retail promo rotation with Sanity CMS integration
- [ ] **ImageCarousel** behavior - Image rotation with Ken Burns effect

---

## 📋 Priority 2: Live Data Signage (Q2 2026) **MODERATE COMPLEXITY**

**Why:** Makes you look serious. Handles real-time data without flickering or breaking.

### 2.1 "No Flicker" Data Grid

**Use Case:** Fuel prices, café boards, live KPIs, train departures.

**Deliverables:**

- [ ] Polling strategy with diff-based updates (only animate changed cells)
- [ ] Clear "last updated" indicator and stale state handling
- [ ] **LiveDataGrid** block - Optimized for frequent updates without full rerender
- [ ] Example: Stock ticker, fuel prices, departure board
- [ ] Performance benchmark: < 16ms render time for 100-cell grid update

**Component Additions:**

- [ ] **AnimatedNumber** primitive - Smooth number transitions
- [ ] **StatusBadge** primitive - Color-coded status indicators

### 2.2 Queue Management "Now Serving"

**Use Case:** GP surgery, council office, service desk.

**Deliverables:**

- [ ] Big typography, minimal motion, resilient polling
- [ ] Optional chime (never required, always tasteful)
- [ ] **QueueDisplay** block - Optimized for readability at distance
- [ ] Example: Medical waiting room integration

---

## 📋 Priority 3: Offline-First & Edge Conditions (Q3 2026)

**Why:** This is where real deployments die. Venues have unstable WiFi, captive portals, and Murphy's Law.

### 3.1 Offline-First Content Shell ⭐

**Use Case:** Venues with unstable WiFi or captive portals.

**Deliverables:**

- [ ] Enhanced OfflineFallback with file-backed cache
- [ ] Node helper to manage cache integrity and expiry
- [ ] Explicit stale indicators (already have StaleDataIndicator, enhance it)
- [ ] Safe fallback: static content when network is unreachable
- [ ] Tutorial: "Build bulletproof offline screens"

**BrightSign Leverage:** Node on player for file I/O and local services.

### 3.2 Emergency Override Channel

**Use Case:** Schools, factories, offices needing urgent full-screen message override.

**Deliverables:**

- [ ] **EmergencyBanner** component - Priority state machine with expiry rules
- [ ] Offline-safe behavior (persists locally, expires automatically)
- [ ] Example: Fire alarm, lockdown notice, urgent announcement
- [ ] Clear visual hierarchy (red alert, high contrast, unmissable)

---

## 📋 Priority 4: Hardware & "Only Possible on a Player" (Q3-Q4 2026) **MOST DISTINCTIVE**

**Why:** These demos show what's possible when software meets physical hardware. Most complex, highest wow factor.

### 4.1 GPIO-Driven Interaction

**Use Case:** Museum exhibit button, retail "call staff" button, presence sensor wake.

**Deliverables:**

- [ ] Event bus from GPIO to React (roGpioControlPort wrapper)
- [ ] Debounce and safety rules
- [ ] **GPIOButton** component - Maps hardware button to React event
- [ ] Demo UI that makes hardware state obvious
- [ ] Example: Interactive kiosk with physical buttons

**BrightSign Leverage:** roGpioControlPort documentation.

### 4.2 Multi-Player Synchronization

**Use Case:** Video wall, multi-screen art piece.

**Deliverables:**

- [ ] Leader/follower architecture (one player is source of truth)
- [ ] Drift correction (compensate for network latency)
- [ ] Failover behavior (what happens when leader dies)
- [ ] Deterministic transitions (all screens change simultaneously)
- [ ] Example: 2×2 video wall, synchronized content rotation

### 4.3 On-Player Local Control Plane

**Use Case:** On-site technician can hit local endpoint to change config, pull diagnostics, trigger modes.

**Deliverables:**

- [ ] Node HTTP server on player exposing safe endpoints
- [ ] Device info reporting (uptime, temperature, storage)
- [ ] Log export endpoint (download last 1000 lines as JSON)
- [ ] Config endpoint (change API URLs, toggle debug mode)
- [ ] Example: Maintenance dashboard accessible at `http://<player-ip>:8080`

**BrightSign Leverage:** BrightSign Node docs include HTTP server examples.

---

## 🚧 Supporting Features (Ongoing)

### Component Library Expansion

**High Priority (aligns with Priorities 1-2):**

- [ ] **ScrollingText** - Marquee/ticker for long text content
- [ ] **ProgressBar** - Visual progress indicator
- [ ] **IconGrid** - Wayfinding, services grid
- [ ] **WeatherWidget** - Weather display with icon mapping
- [ ] **VideoPlayer** - Simple video playback with loop control

**Medium Priority (supporting features):**

- [ ] **QRCodeDisplay** - Generate and display QR codes
- [ ] Real-time chart components (line, bar, pie)
- [ ] Leaderboard component with sorting

### Testing & Quality

- [ ] Playwright E2E tests for deployment workflow
- [ ] Performance benchmarks (render time < 16ms for 1080p)
- [ ] Browser compatibility testing (BrightSign Chromium version)
- [ ] Accessibility audit (WCAG AA for touch interfaces)

### Documentation

**High Priority:**

- [ ] Tutorial: "Building your first signage screen"
- [ ] Tutorial: "Deploying to BrightSign in 10 minutes"
- [ ] Common patterns and anti-patterns guide
- [ ] Troubleshooting guide (network issues, player debugging)

**Medium Priority:**

- [ ] Component API reference (complete)
- [ ] Storybook controls for all variants
- [ ] Real-world usage patterns per component

---

## 🔮 Long-Term Vision (2027+)

### Ecosystem

- [ ] NPM package publication (`@thesignage/signage-components`)
- [ ] Standalone CLI for creating new signage projects (`create-signage-app`)
- [ ] Component marketplace/gallery
- [ ] Community-contributed components

### Industry Templates

- [ ] Restaurant menu templates (breakfast/lunch/dinner with schedule switching)
- [ ] Retail store templates (promotions, hours, services)
- [ ] Office templates (directory, calendar, announcements)
- [ ] Healthcare templates (wait times, wayfinding)
- [ ] Education templates (class schedules, events)

### Advanced Platform Features

- [ ] Touch-enabled navigation patterns
- [ ] Hardware-accelerated video playback
- [ ] WebGL for advanced graphics
- [ ] Remote deployment and monitoring dashboard
- [ ] Analytics and usage tracking

---

## 🤝 Contributing

This roadmap is driven by real developer needs. If you have:

- **Use cases we should prioritize** - Open an issue describing your signage scenario
- **Deployment workflow feedback** - Tell us what's blocking you from shipping to players
- **Component requests** - Describe the signage problem you're trying to solve

See [CONTRIBUTING.md](./docs/contributing/CONTRIBUTING.md) for guidelines.

---

## 📊 Versioning Strategy

WallRun follows semantic versioning:

- **v0.x** (Current - Alpha): Breaking changes expected, API unstable, deployment workflow being established
- **v1.0-beta** (Target Q2 2026): Deployment workflow stable, core components mature, minor breaking changes possible
- **v1.0** (Target Q3 2026): Production-ready, semantic versioning, deprecation warnings for breaking changes

**Key Milestone:** v1.0 requires a proven "dev → player → screen" workflow that works reliably in real venues.

---

## 📅 Milestone Tracking

| Milestone                   | Target      | Status             | Blockers                       |
| --------------------------- | ----------- | ------------------ | ------------------------------ |
| Foundation (UI Library)     | Q4 2025     | ✅ Complete        | -                              |
| **Priority 0: Deploy Loop** | **Q1 2026** | **🚧 In Progress** | Need player access for testing |
| Priority 1: CMS Content     | Q2 2026     | 📋 Planned         | Blocked by Priority 0          |
| Priority 2: Live Data       | Q2 2026     | 📋 Planned         | Blocked by Priority 0          |
| Priority 3: Offline-First   | Q3 2026     | 📋 Planned         | -                              |
| Priority 4: Hardware        | Q3-Q4 2026  | 📋 Planned         | Requires Priority 0-3          |
| Beta Release (v1.0-beta)    | Q2 2026     | 🔮 Future          | Requires Priority 0-1 complete |
| Stable Release (v1.0)       | Q3 2026     | 🔮 Future          | Requires real-world validation |

---

## 🎯 Success Criteria for v1.0

We ship v1.0 when:

1. ✅ A developer with zero BrightSign experience can deploy a React app to hardware in < 15 minutes
2. ✅ At least 3 production deployments running in real venues (restaurant, office, retail)
3. ✅ Deployment workflow survives network failures, player reboots, and power loss
4. ✅ Component library covers 80% of common signage use cases without custom components
5. ✅ Documentation includes troubleshooting for 10 most common deployment issues

---

**Last Updated:** February 8, 2026

**Next Review:** After Priority 0.1 ships (target: mid-Q1 2026)
