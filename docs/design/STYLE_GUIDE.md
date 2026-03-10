# STYLE_GUIDE.md
## The Sign Age Demo Website
### Tailwind + shadcn/ui

This document defines the visual and interaction style for **The Sign Age** demo website.

The site should feel like a modern, premium B2B SaaS product.
Calm, confident, and durable.
Never flashy. Never marketing-led.

If it looks like a landing page, it is wrong.
If it looks like internal tooling from a company that takes engineering seriously, it is right.

---

## 1. Product Intent

The Sign Age treats digital signage as software infrastructure.

The demo site exists to:
- support explanation and demos
- communicate technical seriousness
- feel like real software, not content

The reference points are:
- high-quality B2B admin tools
- developer-focused SaaS products
- internal platforms that quietly run critical systems

Not:
- startup homepages
- funnels
- portfolios
- media sites

---

## 2. Design Principles

These principles override individual component decisions.

- Calm beats clever
- Precision beats decoration
- Consistency beats novelty
- Restraint signals confidence
- Software first, content second

Premium here means:
- deliberate spacing
- careful hierarchy
- predictable behaviour
- no visual noise

---

## 3. Colour System

The colour system is intentionally small and controlled.

### Locked Colours

- Background  
  `#1C1E21`

- Primary text  
  `#E6E6E6`

- Secondary text  
  `#A0A4A8`

- Accent (rare)  
  `#6E7681`

### Usage Rules

- Use dark mode as the default
- Avoid large light surfaces
- Avoid colour for emphasis where spacing or hierarchy works better
- Accent colour is structural, not expressive

If a component relies on colour to feel premium, redesign it.

---

## 4. Typography

### Typeface

**Inter**

Chosen for:
- screen clarity
- neutrality
- modern SaaS familiarity
- long-term durability

### Weights

- Regular (400)
- Medium (500)

Use weight to indicate importance, not personality.

Avoid Bold unless the layout genuinely lacks presence.

---

## 5. Theme Implementation (shadcn + Tailwind)

### 5.1 Token-First Styling

All colour usage must go through shadcn tokens.

Hex values belong only in the theme layer.

Use:
- `bg-background`
- `text-foreground`
- `text-muted-foreground`
- `border-border`
- `ring-ring`
- `bg-card`
- `bg-muted`

Avoid:
- hard-coded colours in components
- ad hoc opacity hacks

Token-first does **not** mean every surface must be flat or visually plain.

Richer shell chrome is allowed when it is expressed through:
- token-derived utilities such as `border-border/60`, `bg-card/80`, or `text-foreground`
- shared semantic surface classes defined in the theme layer
- reusable component patterns rather than one-off decorative class strings

If a surface needs blur, layered backgrounds, or stronger depth, build that from tokens and shared utilities. Do not reach for raw `white/10`, arbitrary hex colors, or bespoke per-component glow effects.

Premium SaaS feels consistent because everything comes from the same token system.

---

## 6. Layout and Spacing

### Page Layout

- Generous margins
- Clear vertical rhythm
- Predictable spacing between sections

Recommended base wrapper:
- `min-h-screen bg-background text-foreground`
- `mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16`

Spacing should feel intentional, not compact.

Premium software does not feel cramped.

---

### Grid Usage

- Default to single column
- Two columns only when it improves comprehension
- Avoid dense dashboards unless the demo requires it

White space is part of the interface.

---

## 7. Typography Scale (Tailwind)

Use a restrained, modern SaaS scale.

- Page title  
  `text-3xl md:text-4xl font-medium tracking-tight`

- Section heading  
  `text-xl md:text-2xl font-medium`

- Subheading  
  `text-base md:text-lg font-medium`

- Body  
  `text-base leading-relaxed`

- Small text  
  `text-sm text-muted-foreground`

Rules:
- Avoid dramatic size jumps
- Avoid bold for impact
- Let spacing create hierarchy

---

## 8. Components (shadcn)

### 8.1 Buttons

Buttons should feel like precise controls.

Default:
- `variant="secondary"`
- `variant="ghost"` for low-priority actions

Use `variant="default"` sparingly and deliberately.

Rules:
- No gradients
- No glow
- No animated flair
- Hover states should be subtle and predictable

Premium SaaS buttons do not shout.

---

### 8.2 Links

Links should be obvious but understated.

- Underline on hover or always underline in body text
- Avoid bright colours
- Avoid animation beyond simple state change

Links are navigation, not decoration.

---

### 8.3 Cards and Panels

Cards should feel structural.

Rules:
- Flat surfaces
- Subtle borders
- Minimal or no shadow
- Consistent padding

Suggested:
- reduce default shadcn shadow if it feels decorative
- use `border-border/60` for separation
- prefer shared semantic surface utilities for premium chrome rather than repeating long arbitrary-value class strings

Cards should feel like containers, not highlights.

---

### 8.4 Inputs and Forms

Inputs should feel robust and tool-like.

Rules:
- Clear focus rings
- No playful placeholder copy
- No oversized controls
- Disabled states must be obvious

Forms should feel like configuration, not onboarding.

---

### 8.5 Tables and Data

Tables are first-class citizens.

Rules:
- Clear column alignment
- Calm row spacing
- Subtle dividers
- No visual gimmicks

If data looks busy, reduce decoration first.

---

## 9. Motion and Interaction

Motion is restrained and functional.

Allowed:
- fades
- subtle opacity transitions
- short linear movement

Timing:
- 150–300ms
- consistent across the app

Avoid:
- bounce or spring easing
- zoom punches
- scroll-driven effects
- decorative animation

Premium software feels stable, not energetic.

---

## 10. Content Tone

Copy should feel like a serious SaaS product.

- Calm
- Declarative
- Precise
- Slightly dry

Avoid:
- marketing language
- calls to action
- exclamation marks
- friendly filler

Write like internal product documentation.

---

## 11. Accessibility

Accessibility is part of quality.

- Keyboard navigation everywhere
- Visible focus states
- Sufficient contrast
- Respect reduced motion preferences

Premium products are accessible by default.

---

## 12. Drift Prevention

During PR review, ask:

- Does this feel like premium B2B SaaS software?
- Have we used tokens rather than one-off styles?
- Did we add anything for flair rather than clarity?
- Would this still feel right in five years?

If unsure, remove the flourish.

---

## 13. Final Rule

The site should feel like software you trust to run quietly in the background of a large organisation.

If it feels eager, it is wrong.
