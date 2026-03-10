# Demo Script: The Sign Age - Public Site Walkthrough

**Duration:** 4-6 minutes  
**Audience:** Developers, contributors, and stakeholders who want a quick project tour  
**Goal:** Show the public demo experience, the component model, representative signage screens, and the repository assets behind them

---

## Recording Setup

Before recording:

- Use a 1440x900 or 1920x1080 browser window
- Start on the public site home page
- Keep zoom at 100%
- Hide bookmarks and unrelated tabs if possible
- Use smooth but direct mouse movement; avoid over-scrolling

Recommended pace:

- Spend 15-25 seconds on each major stop
- Pause briefly on each page title before speaking
- Do not scroll deeply unless needed to reveal a specific section
- Treat the GitHub section as a quick proof point, not a reading segment

Before starting the walkthrough:

- Set the browser window size manually for the recording format you want
- Make sure the entire browser window is fully visible in the recording frame
- Confirm the framing is correct before any automated navigation begins

---

## Route Order

1. <https://cambridgemonorail.github.io/TheSignAge/>
2. <https://cambridgemonorail.github.io/TheSignAge/#/getting-started>
3. <https://cambridgemonorail.github.io/TheSignAge/#/components>
4. <https://cambridgemonorail.github.io/TheSignAge/#/components/primitives/metric-card>
5. <https://cambridgemonorail.github.io/TheSignAge/#/components/layouts/split-screen>
6. <https://cambridgemonorail.github.io/TheSignAge/#/gallery>
7. <https://cambridgemonorail.github.io/TheSignAge/#/signage/welcome>
8. <https://cambridgemonorail.github.io/TheSignAge/#/signage/menu>
9. <https://cambridgemonorail.github.io/TheSignAge/#/signage/announcements>
10. <https://github.com/CambridgeMonorail/TheSignAge?tab=readme-ov-file#the-sign-age>
11. <https://github.com/CambridgeMonorail/TheSignAge/tree/main/skills>
12. <https://github.com/CambridgeMonorail/TheSignAge/tree/main/libs/shadcnui-signage>
13. <https://cambridgemonorail.github.io/TheSignAge/#/signage/welcome>

---

## Script

### 1. Landing Page

**Show:** <https://cambridgemonorail.github.io/TheSignAge/>

> "This is The Sign Age: digital signage treated as software rather than a slide deck or CMS. The focus is deterministic screen composition, installable components, and delivery workflows for always-on displays."

**On-screen focus:**

- "DIGITAL SIGNAGE AS SOFTWARE"
- "WHY THE SIGN AGE?"
- "SIGNAGE-SPECIFIC FEATURES"

> "The project combines modern frontend tooling with signage constraints like fixed-aspect layouts, distance-readable typography, offline-first behavior, and BrightSign-oriented delivery."

### 2. Getting Started

**Show:** <https://cambridgemonorail.github.io/TheSignAge/#/getting-started>

> "The getting started guide makes the adoption path concrete. You can install components from the registry, clone the repo, or copy the source into an existing React project."

**On-screen focus:**

- "GETTING STARTED"
- "Option 1: Using shadcn CLI"
- "Quick Start: Build Your First Signage Screen"

> "This is for developers who want real components, real code, and predictable deployment, not a closed authoring environment."

### 3. Component Library Overview

**Show:** <https://cambridgemonorail.github.io/TheSignAge/#/components>

> "The component library is organized the way a developer expects: primitives, layouts, and higher-level patterns. The useful distinction here is that the pieces are signage-oriented from the start."

**On-screen action:**

- Briefly pause on the component index
- Move promptly to representative pages
- Do not linger here; use this as a transition into the two detail pages

### 4. Metric Card Primitive

**Show:** <https://cambridgemonorail.github.io/TheSignAge/#/components/primitives/metric-card>

> "This metric card is a good primitive example. It is built for large-format readability, strong contrast, and fast scanning from distance, which is very different from a typical laptop dashboard card."

**On-screen focus:**

- "MetricCard"
- Example values like "$1.2M" and "8,432"
- "Signage Considerations"

> "The page also keeps installation, usage, and source close to the example, so the docs stay close to the code."

### 5. Split Screen Layout

**Show:** <https://cambridgemonorail.github.io/TheSignAge/#/components/layouts/split-screen>

> "This split-screen layout shows the other half of the system: deterministic zoning. Signage screens need stable structure, and this gives you predictable ratios like 60/40 or 70/30 without layout drift."

**On-screen focus:**

- "SplitScreen"
- Example showing main content and sidebar
- Ratio and direction notes

> "Together, primitives and layouts give you reusable building blocks for menus, dashboards, directories, and announcement boards."

### 6. Gallery Overview

**Show:** <https://cambridgemonorail.github.io/TheSignAge/#/gallery>

> "The gallery turns those building blocks into complete screen examples. This is the fastest way to understand the range of use cases the project is targeting."

**On-screen focus:**

- "Signage Gallery"
- Welcome Screen
- Restaurant Menu
- Announcements Board

> "I’m going to step through three representative screens: a welcome screen, a menu, and an announcements board."

### 7. Welcome Screen

**Show:** <https://cambridgemonorail.github.io/TheSignAge/#/signage/welcome>

> "First, the welcome screen. This is the simplest expression of the design system: large type, clean hierarchy, and a focal message that reads instantly on a wall-mounted display."

**On-screen focus:**

- "Welcome"
- "to The Sign Age"
- "Digital Signage as Software"

### 8. Menu Screen

**Show:** <https://cambridgemonorail.github.io/TheSignAge/#/signage/menu>

> "Next, a menu board. Here the emphasis shifts to structured density: categories, pricing, and item descriptions arranged so the screen stays scannable without losing detail."

**On-screen focus:**

- "Today's Menu"
- Breakfast, Lunch Specials, Dinner Entrees
- Example prices and descriptions

> "This is a good example of using the same system for operational content rather than just hero moments."

### 9. Announcements Screen

**Show:** <https://cambridgemonorail.github.io/TheSignAge/#/signage/announcements>

> "This announcements screen shows the communication side of signage: multiple content cards, clear categorization, and enough structure for people to parse updates at a glance."

**On-screen focus:**

- "Announcements"
- Team Building Event
- Q1 Sales Achievement
- Product Launch Meeting

> "Across all three examples, the theme is the same: fixed composition, readable hierarchy, and content designed for unattended displays."

### 10. GitHub Repository

**Show:** <https://github.com/CambridgeMonorail/TheSignAge?tab=readme-ov-file#the-sign-age>

> "To close the loop, here is the repository behind the public demo. The project is open, the documentation is in the repo, and the same structure you saw on the site is backed by actual libraries and tooling."

**On-screen focus:**

- Repository name
- README tab
- Top-level folders including apps, libs, docs, and skills
- Keep this stop brief

### 11. Skills Directory

**Show:** <https://github.com/CambridgeMonorail/TheSignAge/tree/main/skills>

> "One notable part of this repo is the skills directory. These are portable workflow skills for Copilot-assisted development, including planning, verification, debugging, BrightSign deployment, signage layout design, and more."

**On-screen focus:**

- `skills`
- `brightsign-runtime`
- `signage-layout-system`
- `chrome-devtools-webapp-debug`

> "So the project is not only shipping components, it is also shipping repeatable engineering workflows around them."

### 12. Signage Components Source

**Show:** <https://github.com/CambridgeMonorail/TheSignAge/tree/main/libs/shadcnui-signage>

> "And this is the signage component library itself. This is where the primitives, layouts, blocks, and supporting code live for the screens we just looked at."

**On-screen focus:**

- `libs/shadcnui-signage`
- `src`
- Any visible primitives or layouts folders

> "That connection between public demo, installable components, and source code is the point: the site is showing real artifacts, not mock examples disconnected from implementation."

### 13. Return to Welcome Screen

**Show:** <https://cambridgemonorail.github.io/TheSignAge/#/signage/welcome>

> "To finish where we started, this is the kind of output The Sign Age is built to support: clear, purposeful screens built with the same engineering discipline we expect from the rest of our software stack."

> "If you want to explore further, the public site, the component docs, and the repository all line up directly."

---

## Short Version

Use this if you want a tighter read:

> "The Sign Age treats digital signage as software. The public site shows the model: a getting started path, a component library with installable primitives and layouts, a gallery of representative full-screen experiences, and an open repository with both the source code and the Copilot workflow skills behind it. The result is a signage toolkit built for developers who want deterministic, distance-readable, production-ready screens."

---

## Recording Notes

- Keep the cursor still while speaking unless you are intentionally highlighting a section
- Prefer direct URL navigation over long scrolling during the recording
- If GitHub loads slowly, pause on the repository root first, then the `skills` directory, then `libs/shadcnui-signage`
- If you need to shorten the demo, cut the component index stop and move directly from getting started to the two component detail pages
- If you need to shorten the demo further, compress the GitHub portion to three quick proof points: repo root, `skills`, and `libs/shadcnui-signage`

## Dry Run Notes

- The public site pages are the strongest part of the sequence and hold up well on camera
- The GitHub stops work best as quick proof points rather than reading segments
- The component index page should be a short transition, not a long stop
- The closing return to the welcome screen is strong and should stay

---

## Chapter Markers

- 0:00 Landing Page
- 0:25 Getting Started
- 0:50 Component Library
- 1:10 Metric Card
- 1:35 Split Screen
- 2:00 Gallery
- 2:20 Welcome Screen
- 2:40 Menu Screen
- 3:05 Announcements Screen
- 3:30 Repository
- 3:55 Skills Directory
- 4:20 Signage Components Source
- 4:45 Closing

