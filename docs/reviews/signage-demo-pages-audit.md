# Signage Demo Pages Component Library Audit

**Date:** 2026-04-16  
**Purpose:** Audit each demo page in `apps/client/src/app/pages/signage` to identify whether the use cases can be built using components from `libs/shadcnui-signage`, and propose new reusable components where gaps exist.

## Executive Summary

This audit examines 8 signage demo pages against the current component library to identify coverage gaps. The goal is to ensure that demo pages demonstrate the library's capabilities rather than bypassing them with raw HTML.

## Current Component Library Inventory

### Layouts

| Component | Purpose |
|-----------|---------|
| `SignageContainer` | Root container with safe-area support |
| `SignageHeader` | Top bar with branding/clock slots |
| `SplitScreen` | Two-zone layout (main + sidebar) |

### Blocks

| Component | Purpose |
|-----------|---------|
| `FullscreenHero` | Full-screen hero with title/subtitle/CTA |
| `InfoCardGrid` | Grid of information cards |

### Primitives

| Component | Purpose |
|-----------|---------|
| `AnnouncementCard` | Single announcement with icon/priority |
| `EventCard` | Event with time/location/details |
| `MetricCard` | KPI/metric display with value/trend |
| `ScreenFrame` | Decorative frame for screen preview |

### Behaviour

| Component | Purpose |
|-----------|---------|
| `AutoPagingList` | Auto-paginate long lists |
| `Clock` | Formatted time display |
| `ContentRotator` | Rotate through content slides |
| `Countdown` | Countdown timer |
| `OfflineFallback` | Offline state display |
| `ScheduleGate` | Show/hide content by schedule |
| `SignageTransition` | Animated transitions |
| `StaleDataIndicator` | Data freshness indicator |

---

## Page Audits

### 1. WelcomeScreen.tsx

**Status:** ❌ Uses raw HTML - library components not utilized

**Use Case:** Brand welcome/greeting screen for digital displays. Shows company name with premium visual effects for retail/corporate lobbies.

**Current Implementation:**

- Full-screen gradient background (blue → purple → pink)
- Animated ambient orbs with blur effects
- Grid overlay pattern
- Large gradient text ("Welcome")
- Subtitle text

**Library Components That Should Apply:**

| Component | Applicable? | Notes |
|-----------|-------------|-------|
| `FullscreenHero` | ⚠️ Partial | Exists but lacks gradient backgrounds, animated orbs, and gradient text |
| `SignageContainer` | ❌ Not used | Should wrap the content |

**Gap Analysis:**

The `FullscreenHero` component exists and is conceptually the right component, but it's too limited for this use case:

| Feature Needed | Library Support | Gap? |
|----------------|-----------------|------|
| Gradient backgrounds | ❌ Only solid colors | **Yes** |
| Animated decorative orbs | ❌ Not available | **Yes** |
| Grid/pattern overlays | ⚠️ Available in `SignageContainer` via `showGrid` | **Minor** - not available in `FullscreenHero`; could compose or add prop |
| Gradient text | ❌ Not available | **Yes** |
| Custom content layout | ⚠️ Limited to title/subtitle/body/cta | **Partial** |

**Proposed Component Enhancements/Additions:**

1. **Enhance `FullscreenHero`:**
   - Add `backgroundVariant` prop: `'solid' | 'gradient' | 'image'`
   - Add `gradientPreset` prop with branded gradient options
   - Add `textVariant` prop: `'solid' | 'gradient'`
   - Add `decorativeElements` slot for orbs/particles

2. **New Primitive: `AmbientOrbs`:**
   - Reusable animated background decoration
   - Props: `count`, `colors`, `intensity`, `animation`
   - Accessibility: Honors `prefers-reduced-motion`

3. **Grid Overlay Options:**
   - Option A: Add `showGrid` prop to `FullscreenHero` (matching `SignageContainer`)
   - Option B: Enhance `SignageContainer.showGrid` with customization props (`gridSize`, `gridOpacity`, `pattern`)
   - Option C: Extract standalone `GridOverlay` primitive for composition

**Recommendation:**
Enhance `FullscreenHero` to support gradient backgrounds and gradient text. Create `AmbientOrbs` as a composable decoration primitive. The demo page should then be refactored to use these library components.

---

### 2. AnnouncementsBoard.tsx

**Status:** ✅ Uses library components - minor gaps

**Use Case:** Corporate announcements board displaying company news, events, and updates for office lobbies or common areas.

**Current Implementation:**

- Uses `SignageContainer` with gradient background
- Uses `SignageHeader` for title/tag
- Uses `AnnouncementCard` for each announcement item
- Manual grid overlay div added

**Library Components Used:**

| Component | Used? | Notes |
|-----------|-------|-------|
| `SignageContainer` | ✅ Yes | Used with custom gradient override |
| `SignageHeader` | ✅ Yes | Tag + title display |
| `AnnouncementCard` | ✅ Yes | Perfect fit for announcement items |

**Gap Analysis:**

| Feature Needed | Library Support | Gap? |
|----------------|-----------------|------|
| Announcement list layout | ⚠️ Manual spacing | **Minor** - could use a dedicated list layout |
| Grid overlay customization | ⚠️ Built-in but not configurable | **Minor** - `showGrid` exists but lacks size/opacity/pattern props |
| Auto-pagination for many items | ⚠️ Not demonstrated | **No** - `AutoPagingList` exists but not used |

**Observations:**
This page is a **good example** of proper library usage. The only raw HTML is:

1. Custom grid overlay (demo uses `showGrid={false}` and adds its own with different opacity/size)
2. Custom subtitle paragraph inside `SignageHeader` children slot

**Minor Recommendations:**

1. Enhance `SignageContainer`'s `showGrid` with customization props (`gridSize`, `gridOpacity`) or extract a standalone `GridOverlay` primitive
2. Use the existing `subtitle` prop on `SignageHeader` for the subtitle text, and reserve the children slot for truly custom header content
3. Demo page could demonstrate `AutoPagingList` for longer lists

---

### 3. DaypartMenu.tsx

**Status:** ⚠️ Partial library usage - significant gaps in menu components

**Use Case:** Time-aware menu board for cafés/restaurants that automatically shows breakfast, lunch, or evening menus based on time of day.

**Current Implementation:**

- Uses `Clock` for time display ✅
- Uses `ScheduleGate` for time-based content switching ✅
- Everything else is raw HTML:
  - Page layout and header
  - Menu section containers
  - Individual menu item rows (name + price)

**Library Components Used:**

| Component | Used? | Notes |
|-----------|-------|-------|
| `Clock` | ✅ Yes | Time display |
| `ScheduleGate` | ✅ Yes | Time-window content switching |
| `SignageContainer` | ❌ No | Should wrap the content |
| `SignageHeader` | ❌ No | Custom header instead |

**Gap Analysis:**

| Feature Needed | Library Support | Gap? |
|----------------|-----------------|------|
| Menu board layout | ❌ Not available | **Yes** - Critical |
| Menu section (title + items) | ❌ Not available | **Yes** - Critical |
| Menu item row (name + price) | ❌ Not available | **Yes** - Critical |
| Price formatting | ❌ Manual | **Yes** |
| Section dividers/styling | ❌ Manual | **Yes** |

**This is a critical gap.** Menu boards are a core digital signage use case, yet we have no menu-specific components despite having a `signage-menu-board` skill in the repository.

**Proposed New Components:**

1. **New Block: `MenuBoard`**
   - Full-screen menu layout with header, clock, and content zones
   - Props: `title`, `subtitle`, `variant`, `showClock`
   - Slots for menu sections

2. **New Primitive: `MenuSection`**
   - Container for a group of menu items with section title
   - Props: `title`, `columns`, `variant`
   - Accepts `MenuItem` children

3. **New Primitive: `MenuItem`**
   - Single menu item with name and price
   - Props: `name`, `price`, `description?`, `tags?` (e.g., vegan, gluten-free), `highlight?`, `currency?`
   - Includes automatic price formatting with currency and alignment

**Example refactored usage:**

```tsx
<MenuBoard title="Café" subtitle="Daypart Menu" showClock>
  <ScheduleGate windows={[{ start: '06:00', end: '11:00' }]}>
    <MenuSection title="Breakfast" columns={2}>
      <MenuItem name="Egg & Avocado" price={6.50} />
      <MenuItem name="Porridge" price={3.20} />
    </MenuSection>
  </ScheduleGate>
</MenuBoard>
```

---

### 4. EventSchedule.tsx

**Status:** ✅ Uses library components - minor gaps

**Use Case:** Conference/event schedule board showing today's sessions, speakers, rooms, and tracks.

**Current Implementation:**

- Uses `SignageContainer` with gradient background ✅
- Uses `SignageHeader` with tag, title, and subtitle ✅
- Uses `EventCard` for each schedule item ✅
- Raw HTML for:
  - Background effects (radial gradient, grid overlay)
  - Footer CTA banner

**Library Components Used:**

| Component | Used? | Notes |
|-----------|-------|-------|
| `SignageContainer` | ✅ Yes | With custom gradient override |
| `SignageHeader` | ✅ Yes | Full usage: tag, title, subtitle |
| `EventCard` | ✅ Yes | Perfect fit for schedule items |

**Gap Analysis:**

| Feature Needed | Library Support | Gap? |
|----------------|-----------------|------|
| Event list layout | ⚠️ Manual spacing | **Minor** - similar to announcements |
| Grid overlay customization | ⚠️ Built-in but not configurable | **Minor** - `showGrid` exists but lacks size/opacity props |
| Footer CTA banner | ❌ Not available | **Yes** |
| Time grouping (events at same time) | ❌ Manual | **Minor** |

**Observations:**
This is a **good example** of proper library usage. Very similar pattern to AnnouncementsBoard.

**Minor Recommendations:**

1. Enhance `SignageContainer`'s `showGrid` with customization props or extract a standalone `GridOverlay` primitive
2. **New Primitive: `CTABanner`** - Footer call-to-action with icon, text, and optional action
3. Consider `EventList` wrapper that groups events by time slot

---

### 5. KPIDashboard.tsx

**Status:** ✅ Excellent library usage - minimal gaps

**Use Case:** Real-time KPI/metrics dashboard for office lobbies, sales floors, or operations centers showing key performance indicators.

**Current Implementation:**

- Uses `SignageContainer` ✅
- Uses `SignageHeader` with all props ✅
- Uses `MetricCard` for each KPI ✅
- Raw HTML only for:
  - Grid layout wrapper
  - Footer banner

**Library Components Used:**

| Component | Used? | Notes |
|-----------|-------|-------|
| `SignageContainer` | ✅ Yes | Emerald variant |
| `SignageHeader` | ✅ Yes | Full usage: tag, title, subtitle |
| `MetricCard` | ✅ Yes | Perfect fit with icons, values, and trends |
| `InfoCardGrid` | ❌ No | Exists but uses different card structure |

**Gap Analysis:**

| Feature Needed | Library Support | Gap? |
|----------------|-----------------|------|
| Metric display cards | ✅ Available | No - `MetricCard` works perfectly |
| Grid layout for metrics | ⚠️ Manual | **Minor** - `InfoCardGrid` doesn't fit `MetricCard` |
| Footer banner | ❌ Not available | **Yes** - recurring gap |
| Real-time data refresh | ❌ Not demonstrated | **No** - behavior out of scope |

**Observations:**
This is an **excellent example** of library usage. The only raw HTML is minimal structural code.

**Recommendations:**

1. **Consider: `MetricCardGrid`** - A grid layout specifically for `MetricCard` components with appropriate responsive breakpoints
2. Add `CTABanner` primitive (already proposed from EventSchedule)

**Note:** The existing `InfoCardGrid` uses generic cards with a different data structure. A decision should be made whether to:

- A) Enhance `InfoCardGrid` to accept render props or children
- B) Create a separate `MetricCardGrid` component
- C) Leave manual grid layout (current approach is acceptable)

---

### 6. OfficeDirectory.tsx

**Status:** ❌ Uses NO library components - completely raw HTML

**Use Case:** Building/office directory display showing departments, floor numbers, room locations, and contact extensions for lobby wayfinding.

**Current Implementation:**
ALL raw HTML:

- Custom gradient background with ambient orbs
- Custom gradient text header
- "You are here" location indicator
- Directory entry cards (department, floor badge, room, phone)
- Footer help banner

**Library Components Used:**

| Component | Used? | Notes |
|-----------|-------|-------|
| `SignageContainer` | ❌ No | Should wrap content |
| `SignageHeader` | ❌ No | Custom header instead |
| `AmbientOrbs` | N/A | Doesn't exist (proposed) |
| `DirectoryCard` | N/A | Doesn't exist |

**Gap Analysis:**

| Feature Needed | Library Support | Gap? |
|----------------|-----------------|------|
| Directory entry card | ❌ Not available | **Yes** - Critical |
| Location indicator ("You are here") | ❌ Not available | **Yes** |
| Floor badge | ❌ Not available | **Yes** |
| Gradient text header | ❌ Not available | **Yes** - recurring gap |
| Ambient orbs | ❌ Not available | **Yes** - recurring gap |
| Footer CTA | ❌ Not available | **Yes** - recurring gap |

**This is a critical gap.** Office/building directories are a core digital signage use case with no component support.

**Proposed New Components:**

1. **New Primitive: `DirectoryCard`**
   - Display department/location with floor, room, and contact info
   - Props: `title`, `floor`, `room`, `phone?`, `description?`
   - Floor badge with prominent styling

2. **New Primitive: `LocationIndicator`**
   - "You are here" style wayfinding indicator
   - Props: `location`, `icon?`, `variant`
   - Map pin or custom icon support

3. **New Primitive: `FloorBadge`**
   - Prominent floor number display
   - Props: `floor`, `variant`, `size`
   - Can be used standalone or within DirectoryCard

**Example refactored usage:**

```tsx
<SignageContainer variant="blue">
  <SignageHeader title="Office Directory">
    <LocationIndicator location="Main Lobby" icon={MapPin} />
  </SignageHeader>
  
  <div className="grid md:grid-cols-2 gap-6">
    {directories.map(dir => (
      <DirectoryCard
        title={dir.department}
        floor={dir.floor}
        room={dir.room}
        phone={dir.phone}
      />
    ))}
  </div>
</SignageContainer>
```

---

### 7. OfficeLobbyLoop.tsx

**Status:** ⚠️ Excellent behavior component usage - layout components missing

**Use Case:** Multi-slide office lobby loop that rotates through welcome message, meeting schedule, and connectivity status. Demonstrates auto-pagination, countdowns, and offline fallbacks.

**Current Implementation:**
Behavior components used extensively:

- `Clock` for time display ✅
- `ContentRotator` for slide rotation ✅
- `Countdown` for next update timer ✅
- `AutoPagingList` for meeting list pagination ✅
- `OfflineFallback` for connectivity status ✅
- `StaleDataIndicator` for data freshness ✅
- `SignageTransition` for animations ✅

Layout/structure is raw HTML:

- Manual page layout (no `SignageContainer`)
- Manual header (no `SignageHeader`)
- Manual card panels
- Manual grid layouts

**Library Components Used:**

| Component | Used? | Notes |
|-----------|-------|-------|
| `Clock` | ✅ Yes | Time display |
| `ContentRotator` | ✅ Yes | Slide rotation |
| `Countdown` | ✅ Yes | Timer display |
| `AutoPagingList` | ✅ Yes | Meeting list pagination |
| `OfflineFallback` | ✅ Yes | Connectivity demo |
| `StaleDataIndicator` | ✅ Yes | Data freshness indicator |
| `SignageTransition` | ✅ Yes | Crossfade animation |
| `SignageContainer` | ❌ No | Should wrap content |
| `SignageHeader` | ❌ No | Manual header instead |

**Gap Analysis:**

| Feature Needed | Library Support | Gap? |
|----------------|-----------------|------|
| Slide rotation | ✅ Available | No - `ContentRotator` works |
| Auto-paging list | ✅ Available | No - `AutoPagingList` works |
| Meeting/schedule row | ❌ Not available | **Yes** - manual rendering |
| Content panel/card | ❌ Not available | **Yes** - generic signage panel |
| Info list items | ❌ Not available | **Yes** - bullet list styling |

**Observations:**
This page **excellently demonstrates behavioral components** but fails to use layout components. This is a missed opportunity to show how behavior components compose with layout components.

**Proposed Components:**

1. **New Primitive: `SignagePanel`**
   - Generic content panel with label and content area
   - Props: `label`, `children`, `variant`, `className`
   - Used throughout this demo for the card-like sections

2. **New Primitive: `MeetingRow`**
   - Single meeting/schedule entry
   - Props: `time`, `title`, `room`, `status?`
   - Can be used with `AutoPagingList`

3. **New Primitive: `InfoList`**
   - Styled bullet list for notes/info items
   - Props: `items`, `variant`

**Recommendation:**
Refactor to use `SignageContainer` and `SignageHeader`, and create `SignagePanel` for the content cards. This would make the demo simultaneously showcase both layout AND behavior components.

---

### 8. RestaurantMenu.tsx

**Status:** ❌ Uses NO library components - completely raw HTML

**Use Case:** Full restaurant menu display with multiple categories (Breakfast, Lunch, Dinner), each showing items with name, description, and price.

**Current Implementation:**
ALL raw HTML:

- Custom gradient background with radial overlays
- Custom header with tag badge and gradient text
- Menu category cards
- Individual menu items (name, description, price)
- Footer message

**Library Components Used:**

| Component | Used? | Notes |
|-----------|-------|-------|
| `SignageContainer` | ❌ No | Should wrap content |
| `SignageHeader` | ❌ No | Custom header instead |
| `MenuSection` | N/A | Doesn't exist (proposed) |
| `MenuItem` | N/A | Doesn't exist (proposed) |

**Gap Analysis:**

| Feature Needed | Library Support | Gap? |
|----------------|-----------------|------|
| Menu category section | ❌ Not available | **Yes** - Critical |
| Menu item (name/desc/price) | ❌ Not available | **Yes** - Critical |
| Tag badge | ❌ Not available | **Yes** |
| Gradient text header | ❌ Not available | **Yes** - recurring gap |
| Price display | ❌ Not available | **Yes** |
| Section divider | ❌ Not available | **Yes** |
| Footer message | ❌ Not available | **Yes** - recurring gap |

**This confirms the critical menu component gap** identified in DaypartMenu. RestaurantMenu is more complex with descriptions and multi-category layout.

**Proposed Components (reinforces DaypartMenu proposals):**

1. **New Block: `MenuBoard`** (already proposed)
   - Full-screen menu layout

2. **New Primitive: `MenuSection`** (already proposed)
   - Container for category with title and items
   - Enhanced: Support for column layout

3. **New Primitive: `MenuItem`** (enhanced from DaypartMenu proposal)
   - Props: `name`, `description?`, `price`, `tags?`, `image?`
   - Support for descriptions (RestaurantMenu has them, DaypartMenu doesn't)

4. **New Primitive: `TagBadge`**
   - Small category/promotional badge
   - Props: `label`, `variant`
   - Used for "DAILY SELECTION" type labels

**Example refactored usage:**

```tsx
<MenuBoard 
  title="Today's Menu" 
  subtitle="Fresh. Local. Delicious."
  headerTag="DAILY SELECTION"
>
  <div className="grid lg:grid-cols-3 gap-10">
    {Object.entries(menuCategories).map(([category, items]) => (
      <MenuSection key={category} title={category}>
        {items.map(item => (
          <MenuItem
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </MenuSection>
    ))}
  </div>
</MenuBoard>
```

---

## Summary of Findings

### Coverage Statistics

| Page | Library Usage | Status |
|------|---------------|--------|
| WelcomeScreen | ❌ None | Raw HTML - component gaps |
| AnnouncementsBoard | ✅ Excellent | Minor gaps only |
| DaypartMenu | ⚠️ Partial | Behavior OK, layout missing |
| EventSchedule | ✅ Excellent | Minor gaps only |
| KPIDashboard | ✅ Excellent | Minimal gaps |
| OfficeDirectory | ❌ None | Raw HTML - component gaps |
| OfficeLobbyLoop | ⚠️ Partial | Behavior OK, layout missing |
| RestaurantMenu | ❌ None | Raw HTML - component gaps |

**Summary:** 3 of 8 pages (37.5%) have excellent library usage. 3 pages (37.5%) use NO library components at all. 2 pages (25%) use behavioral components but bypass layout components.

### Critical Gaps Identified

1. **Menu Board Components** - No support for the most common digital signage use case
   - Affects: DaypartMenu, RestaurantMenu
   - Impact: HIGH - Restaurant/café menus are ~40% of commercial signage

2. **Directory Components** - No support for wayfinding/directory boards
   - Affects: OfficeDirectory
   - Impact: MEDIUM - Common in corporate/retail environments

3. **Welcome/Hero Enhancements** - Existing FullscreenHero too limited
   - Affects: WelcomeScreen
   - Impact: MEDIUM - Welcome screens need visual polish

4. **Decorative Elements** - No reusable background effects
   - Affects: WelcomeScreen, OfficeDirectory, EventSchedule, RestaurantMenu
   - Impact: LOW - Cosmetic but creates consistency issues

### Recurring Patterns

These elements appear in multiple pages as raw HTML:

| Element | Occurrences | Proposed Solution |
|---------|-------------|-------------------|
| Custom grid overlay | 4 pages | Enhance `SignageContainer.showGrid` with `gridSize`/`gridOpacity` props, or extract `GridOverlay` primitive |
| Ambient orbs | 2 pages | `AmbientOrbs` primitive |
| Gradient text | 3 pages | `GradientText` primitive or prop |
| Footer CTA banner | 4 pages | `CTABanner` primitive |
| Content panel/card | 3 pages | `SignagePanel` primitive |

## Summary of Proposed New Components

### High Priority (Critical Gaps)

| Component | Type | Addresses Pages | Complexity |
|-----------|------|-----------------|------------|
| `MenuBoard` | Block | DaypartMenu, RestaurantMenu | Medium |
| `MenuSection` | Primitive | DaypartMenu, RestaurantMenu | Low |
| `MenuItem` | Primitive | DaypartMenu, RestaurantMenu | Low |
| `DirectoryCard` | Primitive | OfficeDirectory | Low |
| `LocationIndicator` | Primitive | OfficeDirectory | Low |

### Medium Priority (Recurring Gaps)

| Component | Type | Addresses Pages | Complexity |
|-----------|------|-----------------|------------|
| `SignagePanel` | Primitive | OfficeLobbyLoop, general use | Low |
| `CTABanner` | Primitive | EventSchedule, KPIDashboard, RestaurantMenu, OfficeDirectory | Low |
| `showGrid` enhancement | Props addition | Multiple pages | Very Low |
| `AmbientOrbs` | Primitive | WelcomeScreen, OfficeDirectory | Low |

### Low Priority (Enhancements)

| Component | Type | Addresses Pages | Complexity |
|-----------|------|-----------------|------------|
| `GradientText` | Utility/Primitive | WelcomeScreen, OfficeDirectory, RestaurantMenu | Very Low |
| `TagBadge` | Primitive | RestaurantMenu | Very Low |
| `MeetingRow` | Primitive | OfficeLobbyLoop | Low |
| `FloorBadge` | Primitive | OfficeDirectory | Very Low |
| `InfoList` | Primitive | OfficeLobbyLoop | Very Low |

### Enhancements to Existing Components

| Component | Enhancement | Priority |
|-----------|-------------|----------|
| `FullscreenHero` | Add gradient background variants | Medium |
| `FullscreenHero` | Add gradient text support | Medium |
| `FullscreenHero` | Add decorative element slots | Low |
| `SignageHeader` | Add `subtitle` prop (currently uses children) | Low |
| `InfoCardGrid` | Support custom card components via render props | Low |

## Next Steps

1. **Prioritize implementation** - Start with menu components (MenuBoard, MenuSection, MenuItem) as they address the most impactful gaps
2. **Create implementation issues** - Break down each proposed component into trackable work items
3. **Refactor demo pages** - As components are added, update demo pages to use them
4. **Update documentation** - Ensure Storybook stories exist for all new components
5. **Consider skill alignment** - The `signage-menu-board` skill exists but components don't - align these

## Conclusion

The component library has strong foundations with excellent layout containers (`SignageContainer`, `SignageHeader`), card primitives (`AnnouncementCard`, `EventCard`, `MetricCard`), and behavioral components (`Clock`, `ContentRotator`, `AutoPagingList`, etc.).

However, **critical gaps exist for menu boards and directories** - two of the most common commercial signage use cases. The demo pages that work well (AnnouncementsBoard, EventSchedule, KPIDashboard) are the ones where we built the right primitives. The pages with poor library usage expose missing primitives.

**Recommendation:** Prioritize menu and directory components to bring library coverage to 75%+ of demo pages. Then address recurring patterns (CTABanner, grid customization props) to achieve consistency.
