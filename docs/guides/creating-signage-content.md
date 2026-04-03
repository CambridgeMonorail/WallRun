# Creating Digital Signage Content

**A comprehensive guide to designing and building premium digital signage screens for WallRun.**

[↑ Back to Guides](./README.md)

---

## Table of Contents

1.  [Overview](#overview)
2.  [Quick Start](#quick-start)
3.  [Using the Signage Architect Agent](#using-the-signage-architect-agent)
4.  [Premium Design Standards](#premium-design-standards)
5.  [Signage Types and Patterns](#signage-types-and-patterns)
6.  [Adding to the Gallery](#adding-to-the-gallery)
7.  [Working with shadcnui-signage Library](#working-with-shadcnui-signage-library)
8.  [Testing and Validation](#testing-and-validation)
9.  [Troubleshooting](#troubleshooting)

---

## Overview

Digital signage in WallRun is **content designed for always-on public displays** viewed from a distance. It's fundamentally different from web UI:

- **Viewing distance:** 10+ feet (requires larger typography)
- **Display environment:** Public spaces, unattended 24/7 operation
- **Visual impact:** Must be compelling and professional-looking
- **Performance:** Hardware-optimized, offline-capable

**Key Distinction:** Signage content (what's displayed on screens) vs. website chrome (navigation, forms, settings).

[↑ Back to top](#table-of-contents)

---

## Quick Start

### 1. Activate the Signage Architect Agent

In VS Code Copilot Chat:

1.  Click the agent dropdown (usually says "Copilot")
2.  Select **@signage-architect**

### 2. Start with a Clear Request

**Option A: Well-Specified (Agent Proceeds Immediately)**

```
@signage-architect Create a 1080p landscape restaurant menu for 10ft viewing distance with a modern teal/coral gradient theme. Show breakfast, lunch, and dinner categories with 3 items each. Use static sample data.
```

**Option B: High-Level (Agent Asks Questions)**

```
@signage-architect Build a restaurant menu
```

The agent will ask:

- Screen specs (resolution, orientation)
- Viewing distance
- Layout type and content structure
- Brand styling preferences
- Data source (static vs. dynamic)

### 3. Review and Iterate

The agent generates premium-quality code. Review for:

- ✅ Text readable from viewing distance (7xl+ headlines)
- ✅ Sophisticated color palette (gradients, not flat grays)
- ✅ Visual depth (ambient lighting, glass morphism)
- ✅ Proper spacing and hierarchy

[↑ Back to top](#table-of-contents)

---

## Using the Signage Architect Agent

### Clarification Protocol

The agent follows a **QUESTIONS ONLY** approach before writing code.

**What the Agent Always Clarifies:**

1.  **Screen Specs**
    - Resolution: 1080p (1920×1080), 4K (3840×2160), portrait
    - Orientation: landscape or portrait
    - Aspect ratio: 16:9 or 9:16

2.  **Viewing Distance**
    - Default: 10 feet
    - Affects minimum text size (10-foot rule: 1 inch per 10 feet)

3.  **Layout Type**
    - Menu, dashboard, wayfinding, event schedule, announcements, promo

4.  **Content Source**
    - Static sample data (hardcoded)
    - JSON config file
    - API-backed (live data)

5.  **Update Behavior**
    - Static (no updates)
    - Rotating slides
    - Scrolling ticker
    - Live polling with interval

6.  **Brand Styling**
    - Color scheme preference
    - Theme intent (corporate, retail, hospitality)

### Default Assumptions (If You Don't Answer)

If you decline to answer, the agent assumes:

- 1920×1080 landscape
- 10ft viewing distance
- 7:1 contrast ratio
- 5% safe margins
- Premium aesthetic with gradient backgrounds
- Static sample data

### Integration with Plan Agent

For complex projects, use a two-step workflow:

**Step 1: Planning**

```
@plan I need to build a retail signage system with product showcases, promotions, and a scrolling news ticker. Help me spec it out.
```

**Step 2: Implementation**

```
@signage-architect Implement the plan from @plan using premium design standards.
```

[↑ Back to top](#table-of-contents)

---

## Premium Design Standards

### What Makes Signage "Premium"?

Premium signage looks like it came from a **professional digital signage studio**, not a basic web template.

### ❌ Amateur vs. ✅ Premium

**Amateur (Avoid):**

```tsx
<div className="bg-slate-100 p-4">
  {' '}
  <h1 className="text-4xl font-bold">Title</h1> <p className="text-lg">Description text</p>
</div>
```

**Premium (Target):**

```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-16 relative overflow-hidden">
  {' '}
  {/* Ambient glow effect */} <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" /> <div className="relative z-10">
    {' '}
    <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"> Title </h1> <p className="text-3xl text-slate-300 leading-relaxed"> Description text </p>{' '}
  </div>
</div>
```

### Design Principles

#### 1. Sophisticated Color Palettes

**Never:**

- Flat `slate-100`, `slate-900`, or generic gray backgrounds
- Single-color backgrounds
- Basic `text-gray-600` text

**Always:**

- Gradient backgrounds: `bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900`
- Brand-appropriate schemes:
  - **Restaurant:** Teal/coral (`from-teal-950`, `text-orange-400`)
  - **Corporate:** Blue/cyan (`from-blue-950 via-cyan-950`)
  - **Events:** Violet/fuchsia (`from-violet-950 via-purple-950`)
  - **Retail:** Pink/indigo (`from-pink-950 via-indigo-950`)
- Gradient text for headlines: `bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent`

#### 2. Visual Depth & Spatial Hierarchy

**Ambient Lighting Effects:**

```tsx
{/* Positioned absolute glow orbs */}<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" /><div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
```

**Glass Morphism:**

```tsx
<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10"> {/* Content */}</div>
```

**Grid/Texture Overlays:**

```tsx
<div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
```

**Shadows:**

```tsx
<div className="shadow-2xl"> {/* Card content */}</div>
```

#### 3. Motion and Life

**Ambient Orb Animation:**

```tsx
<div className="w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" /><div   className="w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"   style={{ animationDelay: '1s' }}/>
```

**Hover Effects:**

```tsx
<div className="group relative">
  {' '}
  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> {/* Content */}
</div>
```

**Entrance Animations:**

```tsx
{
  items.map((item, index) => (
    <div key={item.id} className="transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
      {' '}
      {/* Content */}{' '}
    </div>
  ));
}
```

#### 4. Typographic Sophistication

**Size Hierarchy:**

- Headlines: `text-8xl` (96px) or `text-9xl` (128px)
- Subheads: `text-4xl` (36px) to `text-5xl` (48px)
- Body: `text-2xl` (24px) to `text-3xl` (30px)
- Captions: `text-xl` (20px)

**Font Weights:**

- Headlines: `font-bold`
- Subheads: `font-semibold`
- Body: `font-medium`
- Never use `font-light` on dark backgrounds

**Spacing:**

- Tracking: `tracking-wide`, `tracking-tight`
- Leading: `leading-relaxed`, `leading-tight`

**Divider Elements:**

```tsx
<div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full" />
```

#### 5. Brand-Level Polish

**Badge/Pill Elements:**

```tsx
<div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xl px-5 py-2 rounded-full font-bold shadow-lg"> Floor 3</div>
```

**Icon Containers:**

```tsx
<div className="p-4 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl shadow-xl">
  {' '}
  <Icon className="w-12 h-12 text-white" />
</div>
```

**Accent Lines:**

```tsx
{/* Vertical accent on card edge */}<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-600" />{/* Horizontal gradient divider */}<div className="h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-transparent" />
```

**Rounded Corners:**

- Cards: `rounded-2xl` or `rounded-3xl`
- Badges: `rounded-full`
- Never use `rounded` or `rounded-lg`

**Whitespace:**

- Page padding: `p-16` (not `p-4` or `p-8`)
- Section spacing: `mb-16`, `space-y-8`
- Breathing room between elements

#### 6. Image Placeholders

When content needs images (product photos, food items, profile pictures):

```tsx
{
  /* Placeholder with gradient background */
}
<div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
  {' '}
  {/* 400x300 product image would go here */} <ImageIcon className="w-16 h-16 text-white/30" />
</div>;
```

Add sizing guidance in comments for future image integration.

[↑ Back to top](#table-of-contents)

---

## Signage Types and Patterns

### Restaurant Menu

**Characteristics:**

- 3-column grid for meal categories (Breakfast, Lunch, Dinner)
- Item name, description, price per item
- Food imagery placeholders
- Teal/coral or warm gradient palette

**Key Elements:**

```tsx
// Category badge<div className="inline-block px-8 py-3 bg-teal-500/10 border border-teal-500/20 rounded-full">  <p className="text-2xl text-teal-300">DAILY SELECTION</p></div>// Menu item<div className="flex justify-between items-baseline">  <h3 className="text-3xl font-semibold text-white">Grilled Salmon</h3>  <span className="text-3xl font-bold text-orange-400">$24.99</span></div><p className="text-xl text-slate-400">Atlantic salmon with seasonal vegetables</p>
```

### Office Directory / Wayfinding

**Characteristics:**

- 2-column grid of departments
- Floor number badges
- Room number and phone extension
- Blue/cyan corporate palette
- "You are here" indicator

**Key Elements:**

```tsx
// Location indicator<div className="inline-flex items-center gap-4 bg-blue-950/50 backdrop-blur-sm border border-blue-800/50 rounded-full px-8 py-4">  <MapPin className="w-10 h-10" />  <span className="text-3xl text-cyan-300">You are here: Main Lobby</span></div>// Department card<div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8">  <h2 className="text-4xl font-bold text-white">Engineering</h2>  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-full">    Floor 3  </div></div>
```

### KPI Dashboard

**Characteristics:**

- 2×2 grid of metric cards
- Large numbers (7xl) for values
- Green/red color coding for trends
- Icons for each metric
- Emerald accent gradients

**Key Elements:**

```tsx
// Metric card<div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-sm rounded-3xl p-10 relative">  <h3 className="text-3xl text-slate-400">Total Revenue</h3>  <div className="text-7xl font-bold text-white">$1.2M</div>  <div className="flex items-center text-2xl text-green-400">    <ArrowUp className="w-7 h-7" />    <span>+12.5% vs last month</span>  </div>  {/* Bottom accent line */}  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/50 to-emerald-500/50" /></div>
```

### Event Schedule

**Characteristics:**

- Vertical stack of event cards
- Time badges with clock icons
- Track/category color coding
- Speaker names and room locations
- Violet/fuchsia conference palette

**Key Elements:**

```tsx
// Event card with accent line<div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-md rounded-2xl p-8 relative">  {/* Vertical accent line */}  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-600" />    <div className="flex items-center gap-4">    <div className="flex items-center gap-3 bg-slate-950/50 px-6 py-3 rounded-xl border border-slate-700/50">      <Clock className="w-8 h-8 text-violet-400" />      <span className="text-3xl font-bold text-white">9:00 AM</span>    </div>    <div className="bg-purple-600 text-white px-6 py-2 rounded-full">      Keynote    </div>  </div>  <h2 className="text-4xl font-bold text-white">Opening Keynote</h2></div>
```

### Announcements Board

**Characteristics:**

- Large card stack
- Icon containers with glass effect
- Category badges
- Pink/purple/indigo gradient palette
- Grid texture overlay

**Key Elements:**

```tsx
// Announcement card<div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 relative group">  {/* Hover glow */}  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />    <div className="flex items-start gap-6">    <div className="p-4 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl shadow-xl">      <Users className="w-12 h-12 text-white" />    </div>    <div>      <h2 className="text-5xl font-bold text-white">Team Building Event</h2>      <div className="bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full">        Event      </div>    </div>  </div></div>
```

### Welcome Screen

**Characteristics:**

- Centered content
- Massive headline (12rem/14rem)
- Animated ambient orbs
- Minimal text
- Dramatic gradient background

**Key Elements:**

```tsx
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950 relative overflow-hidden">
  {' '}
  {/* Animated orbs with staggered delays */} <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" /> <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} /> <div className="text-center relative z-10">
    {' '}
    <h1 className="text-[12rem] font-bold bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-transparent"> Welcome </h1>{' '}
  </div>
</div>
```

[↑ Back to top](#table-of-contents)

---

## Adding to the Gallery

### 1. Create the Signage Component

Create a new file in `apps/client/src/app/pages/signage/`:

```tsx
// apps/client/src/app/pages/signage/RetailPromo.tsximport { FC } from 'react';import { SignageExample } from './components/SignageExample';export const RetailPromo: FC = () => {  return (    <SignageExample>      <div className="min-h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 p-16">        {/* Your premium signage content */}      </div>    </SignageExample>  );};
```

**Note:** Always wrap in `<SignageExample>` component.

### 2. Add Route Configuration

Update `apps/client/src/app/constants/navigationConfig.ts`:

```tsx
// Import the componentimport { RetailPromo } from '../pages/signage/RetailPromo';// Add to paths objectconst paths = {  // ... existing paths  signage: {    // ... existing signage paths    retailPromo: '/signage/retail-promo',  },};// Add to navigation itemsnavMain: [  {    title: 'Signage Examples',    url: paths.gallery,    icon: Monitor,    isActive: true,    items: [      // ... existing items      { title: 'Retail Promo', url: paths.signage.retailPromo },    ],  },],// Add to routes array (at bottom of file)const routes: RouteDefinition[] = [  // ... existing routes  route(paths.signage.retailPromo, RetailPromo, false),];
```

### 3. Add to Gallery Page

Update `apps/client/src/app/pages/gallery/signageExamples.ts`:

```tsx
export const signageExamples = [  // ... existing examples  {    id: 'retail-promo',    title: 'Retail Promo',    description: 'Product showcase with promotional messaging and dynamic pricing',    category: 'Retail',    path: '/signage/retail-promo',    thumbnail: '/signage/retail-promo', // Uses same path for preview  },];
```

### 4. Create Tests

Create `apps/client/src/app/pages/signage/RetailPromo.spec.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { RetailPromo } from './RetailPromo';
describe('RetailPromo', () => {
  it('renders the retail promo screen', () => {
    render(<RetailPromo />);
    expect(screen.getByTestId('retail-promo')).toBeInTheDocument();
  });
  it('displays promotional content', () => {
    render(<RetailPromo />);
    expect(screen.getByText(/special offer/i)).toBeInTheDocument();
  });
});
```

**Important:** Add `data-testid="retail-promo"` to your component's root div.

### 5. Verify

```bash
# Run the apppnpm start# Navigate to http://localhost:4200/WallRun/#/signage/retail-promo# Check the gallery page shows the new example# Run testspnpm test:client
```

[↑ Back to top](#table-of-contents)

---

## Working with shadcnui-signage Library

The `@tsa/shadcnui-signage` library provides reusable signage-specific components.

### Available Components

**Layouts:**

- `ScreenFrame` - Wrapper with safe zones and aspect ratio enforcement
- `SplitScreen` - Two-column or two-row layouts
- `FullscreenHero` - Centered content for welcome screens

**Blocks:**

- `InfoCardGrid` - Grid of information cards
- (More components being added)

### Usage Example

```tsx
import { ScreenFrame, InfoCardGrid } from '@tsa/shadcnui-signage';
export const MySignage: FC = () => {
  return (
    <ScreenFrame resolution="1080p" safeZone={0.05}>
      {' '}
      <InfoCardGrid
        cards={[
          { title: 'Card 1', content: 'Description' },
          { title: 'Card 2', content: 'Description' },
        ]}
        columns={2}
      />{' '}
    </ScreenFrame>
  );
};
```

### Creating New Library Components

See [shadcnui-signage Implementation Plan](../plans/2026-02-07-shadcnui-signage-library.md) for detailed architecture.

**Guidelines:**

1.  Place in appropriate folder: `primitives/`, `layouts/`, or `blocks/`
2.  Include TypeScript prop types
3.  Add Storybook stories
4.  Write unit tests with Vitest
5.  Document in README.md

[↑ Back to top](#table-of-contents)

---

## Testing and Validation

### Visual Testing

**Manual Checks:**

1.  View at actual resolution (1080p or 4K)
2.  Test from intended viewing distance (use zoom to simulate)
3.  Verify text legibility
4.  Check color contrast
5.  Review on actual signage hardware if available

### Automated Testing

**Unit Tests:**

```tsx
// Test data renderingit('renders all menu categories', () => {  render(<RestaurantMenu />);  expect(screen.getByText('Breakfast')).toBeInTheDocument();  expect(screen.getByText('Lunch Specials')).toBeInTheDocument();  expect(screen.getByText('Dinner Entrees')).toBeInTheDocument();});// Test text sizes for readabilityit('uses large text for headlines', () => {  render(<RestaurantMenu />);  const heading = screen.getByRole('heading', { level: 1 });  expect(heading).toHaveClass('text-8xl');});
```

**Accessibility Testing:**

```bash
# Run accessibility scanner (if available)pnpm test:a11y
```

### Performance Testing

**Check for:**

- No console errors
- Smooth animations (60fps)
- No memory leaks (for 24/7 operation)
- Proper cleanup of intervals/timers

```tsx
// Good: Cleanup in useEffectuseEffect(() => {  const interval = setInterval(() => {    // Update data  }, 5000);    return () => clearInterval(interval); // Cleanup!}, []);
```

### The 10-Foot Rule Validation

For a 10-foot viewing distance on 1080p (1920×1080):

- **Minimum text size:** 72pt / 96px ≈ `text-7xl`
- **Recommended headline:** `text-8xl` (96px) or larger
- **Body text:** `text-3xl` (30px) minimum

**Formula:** 1 inch per 10 feet of distance = ~72pt at 1080p

[↑ Back to top](#table-of-contents)

---

## Troubleshooting

### Problem: Agent Won't Generate Code

**Cause:** Missing required details.

**Solution:** Answer the clarification questions or explicitly list assumptions.

```
User: "Build a menu"Agent: "I need to clarify a few things..."User: "Make reasonable assumptions and show me what you'd assume"Agent: "I'll assume: 1080p landscape, 10ft viewing, teal/coral palette..."
```

### Problem: Text Too Small on Actual Display

**Cause:** Not following the 10-foot rule.

**Solution:** Increase text sizes:

- Headlines: `text-7xl` → `text-8xl` or `text-9xl`
- Body: `text-xl` → `text-2xl` or `text-3xl`

### Problem: Design Looks Flat/Amateur

**Cause:** Missing visual depth elements.

**Solution:** Add:

1.  Gradient backgrounds instead of flat colors
2.  Ambient glow orbs with `blur-3xl`
3.  Glass morphism with `backdrop-blur-md`
4.  Grid texture overlay
5.  Gradient text for headlines

### Problem: Too Much Text on Screen

**Cause:** Violating the 3×5 rule (30 words max).

**Solution:** Simplify content:

- Use bullet points instead of paragraphs
- Show only essential information
- Split into multiple rotating slides
- Use icons to replace text where possible

### Problem: Route Not Found

**Cause:** Missing configuration in `navigationConfig.ts` or `routes` array.

**Solution:** Verify:

1.  Path added to `paths` object
2.  Component imported
3.  Route added to `routes` array
4.  Navigation item added to `navMain`

### Problem: Component Imports Failing

**Cause:** Path mapping not configured or wrong import.

**Solution:** Check `tsconfig.base.json` for correct path mapping:

```json
{ "compilerOptions": { "paths": { "@tsa/shadcnui-signage": ["libs/shadcnui-signage/src/index.ts"] } } }
```

### Problem: Animations Laggy on Hardware

**Cause:** Not GPU-accelerated.

**Solution:** Add `will-change`:

```tsx
<div style={{ willChange: 'transform' }} className="animate-pulse">
  {' '}
  {/* Content */}
</div>
```

[↑ Back to top](#table-of-contents)

---

## Additional Resources

- [Signage Architect Agent Definition](../../.github/agents/signage-architect.agent.md)
- [shadcnui-signage Library Plan](../plans/2026-02-07-shadcnui-signage-library.md)
- [Project Structure Guide](../getting-started/understanding-the-project-structure.md)
- [Why SPA for Signage](../getting-started/why-spa-why.md)

---

**Need Help?** Open an issue or check the [AGENTS.md](../../AGENTS.md) workflow guide.

[↑ Back to top](#table-of-contents) | [↑ Back to Guides](./README.md)
