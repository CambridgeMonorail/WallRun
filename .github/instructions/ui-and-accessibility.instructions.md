---
name: 'UI and Accessibility Standards'
description: 'Tailwind, component conventions, and accessibility requirements'
applyTo: '**/*.tsx'
---

# UI and Accessibility Standards

## Tailwind and Component Conventions

- Use Tailwind CSS utility classes for all styling
- Import shadcn/ui components from `@wallrun/shadcnui`
- Use `cn()` utility for conditional classes (from `@wallrun/shadcnui`)
- Mobile-first responsive design with breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Dark mode support where applicable using `dark:` variant
- Avoid custom CSS unless absolutely necessary

## Shadcn/ui Usage

- All shadcn/ui components live in `libs/shadcnui/src/lib/`
- Import from workspace: `import { Button, Card } from '@wallrun/shadcnui'`
- Follow shadcn/ui component API and prop patterns
- Extend shadcn components rather than creating new primitives
- Common components: Button, Card, Input, Select, Dialog, Dropdown, Table, Badge, etc.

## Visual Style Philosophy

For the **demo website chrome** (navigation, shell, layouts), follow the app-scoped design contract in `apps/client/DESIGN.md`. Expanded rationale lives in `docs/design/STYLE_GUIDE.md`.

**Important**: This applies to the website framework, NOT signage content being demonstrated. Signage demos follow signage design rules (10-foot rule, high visibility).

Generic shared theme work follows `libs/common-tailwind/DESIGN.md`. Reusable
signage components follow `libs/shadcnui-signage/DESIGN.md`.

### Aesthetic Intent

- **Product feel**: Developer-focused signage software, dark and precise
- **Reference point**: Creative software for real display systems, backed by serious engineering
- **Anti-pattern**: Generic SaaS gradients, old cyan/pink WR mark, or decorative control glow

### Color System

- **Token-first**: Use shadcn tokens and demo-app semantic classes (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `brand-frame`, `brand-cta-primary`)
- **No hard-coded colors** in components (hex values belong in theme layer only)
- **Demo palette**: `#080B0E` black, `#17171A` charcoal, `#F5F5F7` off-white, `#885CF6` purple
- **Reusable shell surfaces allowed**: richer chrome is acceptable when built from token-derived utilities or shared semantic classes rather than ad hoc decorative strings

### Typography

- **Font system**: Satoshi or Inter for display/UI, Inter for body, IBM Plex Mono for code and metadata
- **Weights**: 400 and 500 are the default rhythm; 600/700 are allowed for brand headings
- **Avoid heavy weights inside compact controls**
- **Scale**: Restrained and modern SaaS
  - Page title: `text-3xl md:text-4xl font-medium tracking-tight`
  - Section heading: `text-xl md:text-2xl font-medium`
  - Body: `text-base leading-relaxed`
  - Small text: `text-sm text-muted-foreground`

IBM Plex Mono should stay in code, metadata, and compact technical labels.

### Component Style

- **Buttons**: Use shared classes such as `brand-cta-primary` / `brand-cta-secondary`; default to `variant="secondary"`, `variant="outline"`, or `variant="ghost"`
- **Cards**: Flat surfaces, subtle borders, minimal or no shadow
- **No decoration on controls**: No gradients, glow effects, or animated flair on buttons and routine UI
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

- Does this follow `apps/client/DESIGN.md`?
- Have we used tokens rather than one-off styles?
- Is the WallRun demo branding scoped to `apps/client`?
- Is glow limited to artwork rather than controls?

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
<a href="https://github.com/..." target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
  View on GitHub
</a>
```

❌ **Avoid - Button with window.open for links**:

```tsx
{
  /* Wrong: Breaks accessibility, right-click, link preview, etc. */
}
<button onClick={() => window.open('https://...', '_blank')}>View on GitHub</button>;
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
