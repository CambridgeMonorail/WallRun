# STYLE_GUIDE.md

## WallRun Brand And Demo Website

This document defines the visual and interaction style for the WallRun website,
documentation shell, and demo surfaces.

The app-scoped machine-readable contract for the demo app lives at
`apps/client/DESIGN.md`. Use that file as the source of truth for `apps/client`;
this guide provides the expanded rationale.

WallRun should feel like a developer tool for real signage systems: dark,
precise, technical, and built for screens. The brand can be expressive, but the
interface should still feel stable and trustworthy.

If it feels like a generic SaaS landing page, it is wrong.
If it feels like creative software for displays, backed by serious engineering,
it is right.

---

## 1. Product Intent

WallRun treats digital signage as software infrastructure.

The site exists to:

- explain the project
- show signage examples
- document tooling and workflows
- communicate that screens can be programmed, versioned, tested, and deployed

Reference points:

- developer-focused product sites
- high-quality internal tooling
- generative display systems
- technical brand systems with strong restraint

Not:

- slide deck templates
- CMS marketing funnels
- glossy startup homepages
- generic cyber/neon wallpaper

---

## 2. Design Principles

These principles override individual component decisions.

- Software first, spectacle second
- Precision beats decoration
- Dark high contrast beats soft ambience
- Purple is the brand signal, not a background theme
- Motion and generative art should feel intentional, not noisy
- Shared utilities beat one-off class strings

Premium here means:

- deliberate spacing
- careful hierarchy
- readable type
- thin frames
- restrained depth
- consistent interaction states

---

## 3. Colour System

The colour system is dark, minimal, and brand-led.

### Core Colours

- Black  
  `#080B0E`

- Charcoal  
  `#17171A`

- Off white  
  `#F5F5F7`

- Primary purple  
  `#885CF6`

### Accent Colours

Accent colours are for data, small highlights, and visualization details only.

- Cyan  
  `#22D3EE`

- Lavender  
  `#A78BFA`

- Pink  
  `#F472B6`

- Green  
  `#34D399`

- Amber  
  `#FBBF24`

### Usage Rules

- Use dark mode as the default.
- Use purple as the primary brand colour.
- Use off-white for important text.
- Use accents sparingly and mostly for data or detail.
- Avoid large cyan, magenta, orange, beige, or blue surfaces.
- Avoid gradients as default UI treatment.
- Keep glow effects rare, subtle, and tied to generative artwork rather than controls.

If colour is doing the whole job, redesign the hierarchy.

---

## 4. Logo

Use the new solid purple WallRun mark.

Rules:

- Use the solid purple mark for nav, cards, social images, and shell branding.
- Do not use the old cyan/pink outlined WR mark.
- Do not add notification bubbles, app badges, or decorative chrome around the logo.
- Keep logo lockups minimal: mark plus wordmark, or mark alone in compact spaces.
- On dark surfaces, use purple mark plus off-white wordmark.
- On light surfaces, use purple mark plus charcoal wordmark.

---

## 5. Typography

The website uses a two-tier typography system.

- Satoshi or an equivalent modern grotesk for headings and UI display text.
- Inter as the fallback and general UI/body font when Satoshi is not available.
- IBM Plex Mono for code, metadata, small labels, dimensions, and technical detail.

Rules:

- Keep letter spacing at `0` for large headings.
- Use mono text for small metadata, not body paragraphs.
- Avoid oversized type inside compact cards and controls.
- Use weight for hierarchy, not personality.
- Avoid all-caps for long copy.

Suggested scale:

- Hero title: `text-5xl md:text-7xl font-bold leading-none`
- Page title: `text-3xl md:text-4xl font-semibold`
- Section heading: `text-2xl md:text-4xl font-semibold`
- Body: `text-base leading-7`
- Mono detail: `font-mono text-xs uppercase tracking-[0.08em]`

---

## 6. Theme Implementation

All reusable UI colour should go through shadcn/Tailwind tokens or shared
semantic utilities.

Use:

- `bg-background`
- `text-foreground`
- `text-muted-foreground`
- `border-border`
- `bg-card`
- `bg-muted`
- shared classes such as `brand-frame`, `demo-panel`, `demo-panel-soft`,
  `brand-cta-primary`, and `brand-cta-secondary`

Avoid:

- hard-coded colours in components
- one-off arbitrary glow strings
- repeated long class strings for the same treatment
- raw `white/10` or arbitrary colour opacity when a token/shared class exists

The theme layer is the right place for richer brand surfaces.

---

## 7. Surfaces And Layout

WallRun surfaces should feel like screen systems and tooling panels.

Rules:

- Use thin frames and subtle borders.
- Keep cards at 8px radius or less unless a component already requires more.
- Avoid cards inside cards.
- Avoid floating marketing sections.
- Use full-width bands or constrained unframed layouts for page sections.
- Keep shadows subtle and structural.
- Reserve generative textures for hero, social, and signage preview surfaces.

Recommended surface language:

- dark charcoal fill
- subtle grid only when it supports the screen/tooling idea
- thin purple or neutral frame
- restrained generative purple field for brand moments

---

## 8. Buttons

Buttons should feel like precise controls.

Default choices:

- `variant="secondary"` for primary page actions
- `variant="outline"` or `variant="ghost"` for secondary actions
- `variant="default"` only when the component API requires it and the visual
  treatment is still supplied by a shared brand class

Use shared CTA classes:

- `brand-cta-primary`
- `brand-cta-secondary`

Rules:

- No button gradients.
- No control glow.
- No bounce, zoom, or flashy animated movement.
- Hover states should be subtle: border, background, or text change.
- Purple fill is allowed for the primary CTA, but it should not glow.

Premium controls do not shout.

---

## 9. Generative Art And Motion

Generative art is part of the WallRun brand, but it must be contained.

Allowed:

- purple particle fields
- thin orbital or wave lines
- subtle grids
- code/data fragments
- small accent colour ticks for data

Avoid:

- glossy neon streaks
- busy wallpaper
- lens flares
- uncontrolled bokeh/orb decoration
- decorative animation on controls

Motion should be restrained and functional:

- fades
- subtle opacity transitions
- short linear movement
- 150-300ms timing

Respect reduced motion preferences.

---

## 10. Content Tone

Copy should sound developer-focused and precise.

Preferred ideas:

- Digital signage as software
- Not slides. Software.
- Built for screens, not scroll.
- Developer-first workflows
- Deterministic screen systems
- BrightSign-ready delivery

Avoid:

- generic growth language
- hype
- exclamation marks
- vague platform claims

Write like a technical product with a point of view.

---

## 11. Accessibility

Accessibility is part of quality.

- Keyboard navigation everywhere
- Visible focus states
- Sufficient contrast
- Text remains readable on all generated or textured backgrounds
- Touch targets meet expected sizes
- Reduced motion is respected

Brand expression never outranks readability.

---

## 12. Drift Prevention

During PR review, ask:

- Does this use the solid purple WallRun mark?
- Does this feel like signage software, not a generic SaaS page?
- Is purple the primary brand signal?
- Are accent colours limited to data/detail?
- Are CTA/control styles shared rather than one-off?
- Is any glow tied to artwork rather than a button or control?
- Would the interface still feel trustworthy in a production tooling context?

If unsure, remove the flourish or move it into a shared semantic utility.

---

## 13. Final Rule

WallRun should feel like software for screens: confident, minimal,
developer-focused, and visually alive only where the display medium calls for it.
