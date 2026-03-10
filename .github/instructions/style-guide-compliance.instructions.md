---
name: 'Style Guide Compliance'
description: 'Visual style and interaction standards for The Sign Age demo website'
applyTo: 'apps/client/src/**/*.{ts,tsx}'
---

# Style Guide Compliance

## Scope

This style guide applies to the **demo website chrome** (navigation, shell, layouts, UI controls), NOT to signage content being demonstrated.

### What Follows STYLE_GUIDE.md
- Website navigation and header
- Page layouts and shells
- Website UI controls (buttons, forms, cards)
- Documentation/settings pages
- Any B2B SaaS interface elements

### What Does NOT Follow STYLE_GUIDE.md
- Signage content components (in `apps/client/src/pages/**/signage/**` or similar)
- Digital signage demonstrations
- Signage preview/showcase areas
- Components following 10-foot rule or high-visibility design

**Rule**: The website is calm B2B SaaS. The signage content it demonstrates follows signage design rules.

All code in the demo website **chrome/shell** must follow `docs/design/STYLE_GUIDE.md`.

## Product Intent

The Sign Age treats digital signage as software infrastructure. The demo site should feel like:

- High-quality B2B admin tools
- Developer-focused SaaS products
- Internal platforms that quietly run critical systems

**Not**: Startup homepages, funnels, portfolios, or media sites.

**Core principle**: If it looks like a landing page, it's wrong. If it looks like internal tooling from a company that takes engineering seriously, it's right.

## Design Principles (Hierarchy)

These principles override individual component decisions:

1. Calm beats clever
2. Precision beats decoration
3. Consistency beats novelty
4. Restraint signals confidence
5. Software first, content second

Premium means: deliberate spacing, careful hierarchy, predictable behavior, no visual noise.

## Color System

### Locked Colors

Use these values ONLY in theme configuration:

- Background: `#1C1E21`
- Primary text: `#E6E6E6`
- Secondary text: `#A0A4A8`
- Accent (rare): `#6E7681`

### Token-First Styling

**All color usage must go through shadcn tokens.**

✅ **Use**:
- `bg-background`
- `text-foreground`
- `text-muted-foreground`
- `border-border`
- `ring-ring`
- `bg-card`
- `bg-muted`

❌ **Avoid**:
- Hard-coded hex colors in components
- Ad hoc opacity hacks (e.g., `bg-black/20`)
- Custom color classes outside theme

✅ **Allowed when token-derived and reusable**:
- `border-border/60`, `bg-card/80`, `bg-background/70`
- Shared semantic surface classes defined in the theme layer
- Subtle blur or depth effects built from tokens rather than raw color hacks

**Rule**: Hex values belong only in the theme layer. Premium SaaS feels consistent because everything comes from the same token system.

**Clarification**: Premium shell chrome can still have depth and atmosphere, but it should come from reusable token-based surface patterns, not one-off decorative class strings in component files.

### Code Blocks and Code Samples

Code blocks must use theme tokens, not hardcoded colors.

✅ **Correct code block styling**:
```tsx
<div className="bg-muted text-foreground p-4 rounded font-mono text-sm">
  <pre>{code}</pre>
</div>
```

Or for more complex code displays:
```tsx
<div className="bg-card text-foreground p-4 rounded font-mono text-sm">
  <pre>{code}</pre>
</div>
```

❌ **Avoid hardcoded colors**:
```tsx
// Don't do this
<div className="bg-slate-900 text-slate-100 p-4 rounded font-mono text-sm">
  <pre>{code}</pre>
</div>
```

**Rationale**: Code blocks are part of the UI chrome and must respect theme tokens for consistent dark mode support and potential theme variants.

## Typography

### Typeface

**Inter** (chosen for screen clarity, neutrality, modern SaaS familiarity, long-term durability)

### Weights

- Regular (400)
- Medium (500)

**Never use Bold (700)** unless the layout genuinely lacks presence.

Use weight to indicate importance, not personality.

### Typography Scale (Tailwind)

Use a restrained, modern SaaS scale:

- **Page title**: `text-3xl md:text-4xl font-medium tracking-tight`
- **Section heading**: `text-xl md:text-2xl font-medium`
- **Subheading**: `text-base md:text-lg font-medium`
- **Body**: `text-base leading-relaxed`
- **Small text**: `text-sm text-muted-foreground`

**Rules**:
- Avoid dramatic size jumps
- Avoid bold for impact
- Let spacing create hierarchy

## Layout and Spacing

### Page Layout

- Generous margins
- Clear vertical rhythm
- Predictable spacing between sections

**Recommended base wrapper**:
```tsx
<div className="min-h-screen bg-background text-foreground">
  <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
    {/* content */}
  </div>
</div>
```

Spacing should feel intentional, not compact. Premium software does not feel cramped.

### Grid Usage

- Default to single column
- Two columns only when it improves comprehension
- Avoid dense dashboards unless the demo requires it

White space is part of the interface.

## Components (shadcn/ui)

### Buttons

Buttons should feel like precise controls.

**Always set variant explicitly** - Never rely on default variant:
```tsx
{/* ✅ Correct - explicit variant */}
<Button variant="secondary">Action</Button>

{/* ❌ Avoid - implicit default variant */}
<Button>Action</Button>
```

**Default to**:
- `variant="secondary"` (standard actions)
- `variant="ghost"` (low-priority actions)

Use `variant="default"` sparingly and deliberately.

**When to use variant="default":**
- Critical actions with significant consequences (e.g., "Delete Account", "Confirm Payment")
- Primary CTAs in onboarding flows (rarely)
- Use only when one action is clearly more important than all others

**Common navigation actions use secondary:**
- "View Documentation", "Open Storybook", "Browse Components"
- "View Gallery", "View Source Code"
- Navigation between sections of the site

✅ **Correct**:
```tsx
<Button onClick={handleNavigate} variant="secondary">
  Browse Components
</Button>
```

❌ **Avoid**:
```tsx
{/* Don't use default for standard navigation */}
<Button onClick={handleNavigate} variant="default">
  Browse Components
</Button>
```

**Rules**:
- No gradients
- No glow
- No animated flair
- Hover states should be subtle and predictable

**Anti-pattern**: Premium SaaS buttons do not shout.

### Links

Links should be obvious but understated.

- Underline on hover or always underline in body text
- Avoid bright colors
- Avoid animation beyond simple state change

Links are navigation, not decoration.

### Cards and Panels

Cards should feel structural.

**Rules**:
- Flat surfaces
- Subtle borders
- Minimal or no shadow
- Consistent padding

**Suggested**:
- Reduce default shadcn shadow if it feels decorative
- Use `border-border/60` for separation
- Prefer shared semantic surface utilities when the chrome needs more depth than a flat card

Cards should feel like containers, not highlights.

### Inputs and Forms

Inputs should feel robust and tool-like.

**Rules**:
- Clear focus rings
- No playful placeholder copy
- No oversized controls
- Disabled states must be obvious

Forms should feel like configuration, not onboarding.

### Tables and Data

Tables are first-class citizens.

**Rules**:
- Clear column alignment
- Calm row spacing
- Subtle dividers
- No visual gimmicks

If data looks busy, reduce decoration first.

## Motion and Interaction

Motion is restrained and functional.

### Allowed
- Fades
- Subtle opacity transitions
- Short linear movement

### Timing
- **Duration**: 150–300ms
- **Easing**: Linear or ease (no bounce, spring, elastic)
- **Consistency**: Same timing across the app

### Avoid
- Bounce or spring easing
- Zoom punches
- Scroll-driven effects
- Decorative animation

**Rule**: Premium software feels stable, not energetic.

## Content Tone

Copy should feel like a serious SaaS product.

### Voice
- Calm
- Declarative
- Precise
- Slightly dry

### Avoid
- Marketing language
- Calls to action
- Exclamation marks
- Friendly filler

**Write like**: Internal product documentation.

**Examples**:
- ✅ "Configure display zones"
- ❌ "Let's set up your zones!"
- ✅ "Authentication required"
- ❌ "Oops! Please log in to continue"

## Accessibility Requirements

Accessibility is part of quality. Premium products are accessible by default.

- Keyboard navigation everywhere
- Visible focus states
- Sufficient contrast (WCAG AA minimum)
- Respect `prefers-reduced-motion`

## Drift Prevention

During PR review, ask:

1. Does this feel like premium B2B SaaS software?
2. Have we used tokens rather than one-off styles?
3. Did we add anything for flair rather than clarity?
4. Would this still feel right in five years?

**If unsure, remove the flourish.**

## Do NOT

- Don't use hard-coded hex colors in components (use theme tokens only)
- Don't use hard-coded slate colors (`bg-slate-900`, `text-slate-100`)
- Don't add motion or animation for decoration (only for functional state changes)
- Don't use Bold (700) font weight unless layout genuinely lacks presence
- Don't use gradient effects or glow on buttons
- Don't rely on default button variant (always specify explicitly)

## Final Rule

The site should feel like software you trust to run quietly in the background of a large organization.

**If it feels eager, it is wrong.**
