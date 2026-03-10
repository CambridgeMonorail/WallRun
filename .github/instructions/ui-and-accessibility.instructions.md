---
name: 'UI and Accessibility Standards'
description: 'Tailwind, component conventions, and accessibility requirements'
applyTo: '**/*.tsx'
---

# UI and Accessibility Standards

## Tailwind and Component Conventions

- Use Tailwind CSS utility classes for all styling
- Import shadcn/ui components from `@tsa/shadcnui`
- Use `cn()` utility for conditional classes (from `@tsa/shadcnui`)
- Mobile-first responsive design with breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Dark mode support where applicable using `dark:` variant
- Avoid custom CSS unless absolutely necessary

## Shadcn/ui Usage

- All shadcn/ui components live in `libs/shadcnui/src/lib/`
- Import from workspace: `import { Button, Card } from '@tsa/shadcnui'`
- Follow shadcn/ui component API and prop patterns
- Extend shadcn components rather than creating new primitives
- Common components: Button, Card, Input, Select, Dialog, Dropdown, Table, Badge, etc.

## Visual Style Philosophy

For the **demo website chrome** (navigation, shell, layouts), follow the design principles in `docs/design/STYLE_GUIDE.md`.

**Important**: This applies to the website framework, NOT signage content being demonstrated. Signage demos follow signage design rules (10-foot rule, high visibility).

### Aesthetic Intent

- **Product feel**: Premium B2B SaaS, calm and confident (not marketing-led)
- **Reference point**: Internal tooling from a company that takes engineering seriously
- **Anti-pattern**: If it feels eager or looks like a landing page, it's wrong

### Color System

- **Token-first**: Use shadcn tokens only (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`)
- **No hard-coded colors** in components (hex values belong in theme layer only)
- **Locked palette**: `#1C1E21` (background), `#E6E6E6` (primary text), `#A0A4A8` (secondary text), `#6E7681` (accent)
- **Reusable shell surfaces allowed**: richer chrome is acceptable when built from token-derived utilities or shared semantic classes rather than ad hoc decorative strings

### Typography

- **Font system**: Inter is the default UI/body face; Michroma is allowed as a sparing display accent for branded labels, shell markers, and select high-signal headings
- **Weights**: 400 and 500 are the default rhythm; 600 is allowed as the emphasis ceiling when medium is too soft
- **Avoid weights above 600** unless layout genuinely lacks presence
- **Scale**: Restrained and modern SaaS
  - Page title: `text-3xl md:text-4xl font-medium tracking-tight`
  - Section heading: `text-xl md:text-2xl font-medium`
  - Body: `text-base leading-relaxed`
  - Small text: `text-sm text-muted-foreground`

Michroma should stay out of long-form copy, settings forms, dense tables, and routine navigation text.

### Component Style

- **Buttons**: Default to `variant="secondary"` or `variant="ghost"` (use `variant="default"` sparingly)
- **Cards**: Flat surfaces, subtle borders, minimal or no shadow
- **No decoration**: No gradients, glow effects, or animated flair
- **Links**: Understated, underline on hover, avoid bright colors

When a shell surface needs extra depth, prefer a shared token-based utility class over inline arbitrary shadows, raw white overlays, or bespoke glow values.

### Motion and Interaction

- **Timing**: 150-300ms, consistent across app
- **Easing**: Linear or subtle ease (no bounce, spring, or elastic)
- **Allowed**: Fades, opacity transitions, short linear movement
- **Avoid**: Zoom punches, scroll-driven effects, decorative animation

### Content Tone

- **Voice**: Calm, declarative, precise, slightly dry
- **Avoid**: Marketing language, CTAs, exclamation marks, friendly filler
- **Write like**: Internal product documentation

### Drift Prevention

Before committing changes, ask:
- Does this feel like premium B2B SaaS software?
- Have we used tokens rather than one-off styles?
- Did we add anything for flair rather than clarity?
- Would this still feel right in five years?

## Accessibility Baseline Requirements

### Labels and Inputs

- All form inputs must have associated `<label>` or `aria-label`
- Use `htmlFor` on labels to connect to input `id`
- Provide helpful error messages and validation feedback
- Mark required fields clearly

### Focus Management

- Maintain logical tab order
- Visible focus indicators on all interactive elements
- Trap focus in modals and dialogs
- Return focus appropriately when closing overlays

### Keyboard Navigation

- All interactive elements accessible via keyboard
- Support standard keyboard patterns (Tab, Enter, Escape, Arrow keys)
- Don't override browser keyboard shortcuts without good reason

### ARIA Hygiene

- Use semantic HTML first (`<button>`, `<nav>`, `<main>`, etc.)
- Add ARIA attributes when semantic HTML is insufficient
- Use `aria-label`, `aria-labelledby`, `aria-describedby` for context
- Set `aria-hidden="true"` on decorative elements
- Manage `aria-expanded`, `aria-selected` states correctly

### Semantic HTML: Buttons vs Links

**Critical distinction**: Use the correct element for the correct purpose.

**Use `<a>` (anchor) for navigation:**
- External links (GitHub, documentation, other sites)
- Internal SPA routes (with href)
- Downloads
- Any action that changes location or opens a URL

✅ **Correct - External link with anchor**:
```tsx
<a
  href="https://github.com/..."
  target="_blank"
  rel="noopener noreferrer"
  className="text-primary hover:underline"
>
  View on GitHub
</a>
```

❌ **Avoid - Button with window.open for links**:
```tsx
{/* Wrong: Breaks accessibility, right-click, link preview, etc. */}
<button onClick={() => window.open('https://...', '_blank')}>
  View on GitHub
</button>
```

**Use `<button>` for actions:**
- Triggering UI changes (open modal, toggle visibility)
- Form submissions
- Triggering operations (save, delete, refresh)
- Any action that doesn't navigate

✅ **Correct - Button for action**:
```tsx
<Button onClick={() => setOpen(true)}>Open Dialog</Button>
```

**Why this matters:**
- Screen readers announce links and buttons differently
- Keyboard users expect different behaviors (Enter vs Space)
- Links provide browser features (right-click, copy link, open in new tab)
- Search engines and accessibility tools understand semantic HTML

## Do NOT

- Don't use `<button>` for navigation (use `<a>` for links)
- Don't use `window.open()` for links (use `<a href target="_blank">`)
- Don't wrap file names or links in backticks when mentioning them
- Don't skip ARIA labels on form inputs
- Don't rely on color alone to convey state
- Don't override browser keyboard shortcuts without good reason

### Color and Contrast

- Ensure WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Don't rely on color alone to convey information
- Test with color blindness simulators

### Screen Reader Support

- Announce dynamic content changes with ARIA live regions
- Provide text alternatives for images and icons
- Ensure proper heading hierarchy (h1, h2, h3, etc.)
- Use skip links for keyboard navigation to main content
