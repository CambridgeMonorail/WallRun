# Signage Skill Testing Report

**Date:** 2026-03-15
**Branch:** `chore/test-signage-skills`
**Tester:** AI agent (simulated user prompts)

## Methodology

For each signage skill:

1. Craft a realistic user prompt that should trigger the skill
2. Apply the skill's guidance to produce output
3. Evaluate: Does the skill trigger clearly? Is the output useful and appropriate?
4. Rate: **Pass** / **Partial** / **Fail**
5. Note improvement opportunities

---

## 1. signage-layout-system

**Test Prompt:** "Design a full-screen airport arrivals board showing flight status for a 1920×1080 lobby display."

### Skill Triggered?

Yes — prompt mentions "full-screen", "arrivals board", "display", matching "When to Use" triggers (design a full-screen signage interface; create a status board).

### Generated Output (applying skill guidance)

**Layout concept:**

- **Zone 1 — Header band** (top 10%): Airport logo, "Arrivals" title, current time
- **Zone 2 — Primary flight table** (middle 75%): 8-10 visible rows, large type showing flight number, origin, scheduled time, status (On Time / Delayed / Landed)
- **Zone 3 — Footer** (bottom 15%): Scrolling service message, last-updated timestamp

**Rationale:** Hierarchy follows skill rules — single clear purpose, largest area for most important info, few strong containers rather than many cards. Typography at 48px+ for flight data, 96px+ for header.

**Intentionally excluded:** Dense multi-column tables, small badges, interactive filters, SaaS card grids.

### Assessment

| Criterion               | Result                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| Trigger clarity         | Clear — "full-screen signage" is explicit                                                   |
| Output matches contract | Yes — zones named, hierarchy rationale given, code shape clear                              |
| Rules applied correctly | Yes — large type, few zones, distance-first                                                 |
| Missing guidance        | No guidance on data density limits per zone (how many rows is too many for a flight board?) |

### Rating: **Pass**

### Improvement Opportunities

- Add explicit guidance on **maximum data rows per screen** for table/list-type signage (flight boards, transit boards).
- The skill's "Constraints" section could mention table-style layouts as acceptable when the screen's purpose genuinely requires them (it currently warns against tables).

---

## 2. signage-animation-system

**Test Prompt:** "Add subtle ambient animation to a restaurant menu board — it feels too static. The board runs 24/7 on a BrightSign player."

### Skill Triggered?

Yes — "ambient animation", "menu board", "runs 24/7", "BrightSign" all match "When to Use" triggers.

### Generated Output (applying skill guidance)

**Motion plan:**

- **Featured item zone:** Slow crossfade (8s duration, 2s ease) between 2-3 featured items on a 30-second rotation.
- **Price highlight:** Gentle opacity pulse on daily special price (0.85 → 1.0, 4s cycle), barely perceptible, reinforces freshness.
- **Background:** Very subtle gradient shift across 60s cycle, hue rotation within 5° to create ambient warmth.

**What was avoided:** No scrolling text, no item-level entrance animations, no simultaneous motion across zones, no easing with bounce/overshoot. Motion kept to 1 simultaneous element plus background.

**Loop safety:** All cycles use CSS animation with `infinite` and durations designed so rotation boundaries aren't perceivable. No JavaScript timers that could drift.

### Assessment

| Criterion               | Result                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| Trigger clarity         | Clear — mentions ambient motion on signage + BrightSign                                         |
| Output matches contract | Yes — motion intent per element, timing, loop behaviour, things avoided                         |
| Rules applied correctly | Yes — slow, calm motion, limited simultaneous movement                                          |
| Missing guidance        | No specific CSS code patterns provided (skill gives principles but not implementation snippets) |

### Rating: **Pass**

### Improvement Opportunities

- Add a **"Starter CSS Patterns" section** with 2-3 copy-paste CSS animation examples (crossfade, gentle opacity pulse, subtle background shift).
- Add guidance on **CSS `will-change` and `transform: translateZ(0)`** for GPU layer promotion on constrained hardware.

---

## 3. signage-menu-board

**Test Prompt:** "Build a cafe menu board with 3 drink categories and 2 featured items for a portrait 1080×1920 display."

### Skill Triggered?

Yes — "cafe menu board", "drink categories", "featured items" directly match.

### Generated Output (applying skill guidance)

**Template Selected:** Feature Pair + Hero (adapted for portrait)

**Zone breakdown:**

- **Top 15%:** Brand name + category label ("Specialty Drinks")
- **Upper 35%:** Two featured drink cards side-by-side, each with image placeholder, name (48px+), price (36px), short description
- **Middle 40%:** Three category columns stacked vertically: Hot Drinks, Cold Drinks, Seasonal — each with item name + price rows
- **Bottom 10%:** Allergen notice, Wi-Fi info

**Price treatment:** Price right-aligned on same line as item name, consistent position. Featured items use larger price (48px) vs. list items (36px).

**Data shape:** Uses `MenuBoardContent` type from skill with `categories` and `featuredItems`.

### Assessment

| Criterion               | Result                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| Trigger clarity         | Clear — explicit menu board request                                                              |
| Output matches contract | Yes — template selected, zones described, price rules stated, data shape referenced              |
| Rules applied correctly | Yes — hierarchy, scannable prices, short text                                                    |
| Missing guidance        | Portrait-specific template adaptation is not explicitly covered — templates seem landscape-first |

### Rating: **Pass**

### Improvement Opportunities

- **Add portrait variants** for each template (the 3 templates assume horizontal side-by-side zones which don't map directly to 9:16).
- **Add a "Maximum items per category" guideline** — at what point should a menu paginate or rotate?
- Cross-reference **signage-distance-legibility** for minimum sizes — the menu board skill doesn't repeat the size table.

---

## 4. signage-distance-legibility

**Test Prompt:** "Review this signage screen — the marketing team says the menu prices are hard to read from the counter (about 4 metres). Price text is currently 24px, menu items are 20px."

### Skill Triggered?

Yes — "hard to read", "4 metres", reviewing text sizes, directly matches "review a signage screen for distance readability".

### Generated Output (applying skill guidance)

```
Distance Legibility Review

Problems:
• Price text at 24px — below minimum for primary body text (48px minimum)
• Menu item names at 20px — below minimum for secondary text (36px minimum)
• Both are roughly half the required minimum for 3-5m viewing distance

Recommendations:
• Increase price text to 48px minimum (primary body text role)
• Increase menu item names to 48px (they are primary information, not secondary)
• If space is limited, reduce number of items shown and use timed rotation
• Verify contrast ratio meets 4.5:1 minimum (prefer higher for counter environment)

Hierarchy Assessment:
Primary message identifiable in 2 seconds: Unable to assess (sizes too small for glanceable reading)
```

### Assessment

| Criterion               | Result                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Trigger clarity         | Very clear — distance + text size review is an exact match                                                         |
| Output matches contract | Yes — problems cited, minimum sizes recommended, format matches example                                            |
| Rules applied correctly | Yes — correctly identified 24px and 20px as below minimum thresholds                                               |
| Missing guidance        | The minimum size table is for 1920×1080 at 3-5m. No scaling guidance for higher resolutions or different distances |

### Rating: **Pass**

### Improvement Opportunities

- Add a **scaling formula or table** for different resolutions: "At 4K, multiply pixel values by 2" or similar.
- Add a **distance-to-minimum-size chart** (e.g., 3m → 48px, 5m → 64px, 8m → 96px on 1080p).
- The skill says "Scale proportionally for 4K or larger viewing distances" but doesn't specify the proportional relationship.

---

## 5. signage-safe-layout

**Test Prompt:** "Check whether my signage layout is safe for deployment on mixed consumer displays — some are cheap TVs with overscan, some are professional panels."

### Skill Triggered?

Yes — "safe for deployment", "overscan", "mixed displays" match triggers.

### Generated Output (applying skill guidance)

```
Safe Layout Review

Checklist applied:
• Safe margin: Verify all critical content is within 5% inset from edges
• Resolution independence: Check for hardcoded pixel dimensions
• Orientation: Confirm layout works at both 16:9 and 9:16
• Anti-patterns: Scan for position:absolute with pixel offsets, 100vh usage, fixed widths

(Would need actual code to produce specific findings)
```

### Assessment

| Criterion               | Result                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Trigger clarity         | Clear — safe layout for multiple displays                                              |
| Output matches contract | Partially — the skill is a review/audit skill so it needs actual code/layout to review |
| Rules applied correctly | Yes — correct checklist items                                                          |
| Missing guidance        | No **implementation helper** (e.g., a CSS safe-frame mixin or React wrapper component) |

### Rating: **Partial**

### Improvement Opportunities

- Add a **safe-frame CSS utility class or mixin** that can be copy-pasted:
  ```css
  .safe-frame {
    padding: 5%;
    box-sizing: border-box;
  }
  ```
- Add a **development overlay component** (React) that shows the safe frame boundary — the skill mentions "test with a visible safe-frame overlay" but doesn't provide one.
- The skill is audit-focused but provides no implementation code. Adding a small code section would make it actionable for generative use (not just review).

---

## 6. signage-state-machine

**Test Prompt:** "Create the state management for a weather dashboard signage app that fetches data from an API and must handle offline scenarios."

### Skill Triggered?

Yes — "state management", "signage app", "fetches data from API", "handle offline" are direct matches.

### Generated Output (applying skill guidance)

**State model:**

```
boot → loading → content → (refresh cycle)
                    ↓
              data-error → fallback-content
                    ↓
               offline → cached-content / static-fallback
```

**TypeScript implementation:**

```typescript
type WeatherState = { status: 'boot' } | { status: 'loading' } | { status: 'content'; data: WeatherData } | { status: 'refreshing'; data: WeatherData } | { status: 'data-error'; lastGoodData: WeatherData | null } | { status: 'offline'; cachedData: WeatherData | null };
```

**Rendering:** Switch statement covering all states — `boot`/`loading` show branded splash, `content`/`refreshing` show weather, `data-error` shows last-known, `offline` shows cached or static fallback.

### Assessment

| Criterion               | Result                                                                                                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trigger clarity         | Very clear — state management + signage + API + offline                                                                                                          |
| Output matches contract | Yes — state model, viewer view per state, fallback chain, recovery                                                                                               |
| Rules applied correctly | Yes — no blank screens, no spinners, discriminated union                                                                                                         |
| Missing guidance        | No **complete custom hook or context** implementation — the rendering switch is shown but not the actual `useReducer`/`useEffect` wiring that drives transitions |

### Rating: **Pass**

### Improvement Opportunities

- Add a **complete `useSignageState` hook** (or `useReducer` pattern) that wires the transitions, not just the type definition and switch statement.
- The `SignageState` type is defined as a single line which is hard to read. Consider formatting it as a multi-line union in the skill itself.
- Add a **state transition diagram** as a Mermaid diagram for tools that can render it.

---

## 7. signage-data-refresh-patterns

**Test Prompt:** "Implement background data polling for a transit arrivals board that updates every 30 seconds. The API sometimes fails."

### Skill Triggered?

Yes — "background data polling", "updates every 30 seconds", "API sometimes fails" match directly.

### Generated Output (applying skill guidance)

**Refresh strategy:**

- Transit data: 30-second interval (matches "real-time" category)
- Add ±3 second jitter to prevent thundering herd
- Stage data before swap, validate before rendering

**Backoff on failure:** 5s → 15s → 30s → 60s → 120s ceiling. Reset on success.

**Implementation:** Use `useSignageData` hook pattern with `fetcher`, `interval: 30_000`, `validate` function that checks data shape.

### Assessment

| Criterion               | Result                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Trigger clarity         | Clear — polling, interval, failure handling                                            |
| Output matches contract | Yes — intervals, non-blocking flow, retry config, validation, failure path             |
| Rules applied correctly | Yes — no visible loading, staged swap, backoff                                         |
| Missing guidance        | The `useSignageData` hook is defined as a type signature only — no implementation body |

### Rating: **Pass**

### Improvement Opportunities

- **Provide a complete `useSignageData` implementation**, not just the signature. This is the most actionable thing missing.
- Add a **multi-source coordination example** — the concept is described in prose but not shown in code.
- Add guidance on **when to trigger the offline transition** (the skill says "after sustained failure e.g. 10 minutes" — make this a configurable parameter in the hook).

---

## 8. signage-performance-budget

**Test Prompt:** "Review my signage app build — it's running slowly on a BrightSign XT1144. The dist folder is 4.2 MB."

### Skill Triggered?

Yes — "review", "signage app build", "running slowly", "BrightSign", "dist folder size" match.

### Generated Output (applying skill guidance)

```
Performance Budget Review

Bundle Size:
• Total page weight: 4.2 MB — ❌ exceeds hard limit (2 MB target)
• Need breakdown of JS, CSS, fonts, images

Immediate flags from 4.2 MB total:
• Likely includes unoptimized images (check for PNGs > 500KB)
• Possible full icon library import (check lucide-react tree-shaking)
• Possible unsubsetted fonts (check font file sizes)
• Check for dev mode React bundle

Recommended diagnostics:
du -sh dist/assets/*.js
du -sh dist/assets/*.css
find dist -name "*.woff2" -exec du -sh {} \;
find dist -name "*.png" -o -name "*.jpg" -exec du -sh {} \;
```

### Assessment

| Criterion               | Result                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| Trigger clarity         | Very clear — performance + BrightSign + build size                                              |
| Output matches contract | Yes — budget assessment, specific risks, measurement commands                                   |
| Rules applied correctly | Yes — correctly flagged 4.2 MB as over hard limit                                               |
| Missing guidance        | No **automated build check script** — would be very useful to have a script that checks budgets |

### Rating: **Pass**

### Improvement Opportunities

- Add a **budget check script** (shell or Node) that can be run as a build step to fail if budgets are exceeded.
- Add **BrightSign model-specific limits** — the XT1144, XD1034, HD224 have very different capabilities. A quick reference table of CPU/RAM/GPU per model would be valuable.
- The "Measurement and Verification" section gives helpful `du` commands — consider wrapping these into a single verification script.

---

## 9. signage-content-fallbacks

**Test Prompt:** "My signage app shows a broken image icon when the menu image CDN is down. How should I handle image fallbacks?"

### Skill Triggered?

Yes — "broken image", "CDN is down", "image fallbacks" match directly.

### Generated Output (applying skill guidance)

**Image fallback chain:**

```
Live image from CDN
  → Cached image (service worker or localStorage)
    → Bundled placeholder image (correct aspect ratio, branded)
      → CSS gradient or solid-colour background
```

**Implementation:** Use `SignageImage` component that handles `onError` to swap to `fallbackSrc`. Never show broken image icon.

**Static fallback requirement:** Bundle placeholder images at correct aspect ratios in a `fallback/` directory.

### Assessment

| Criterion               | Result                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| Trigger clarity         | Very clear — broken images on signage                                                                           |
| Output matches contract | Yes — fallback chain, viewer experience per level, static requirements                                          |
| Rules applied correctly | Yes — never show broken icon, branded placeholders                                                              |
| Missing guidance        | The implementation is in `references/examples.md` (indirection); the SKILL.md itself only describes the concept |

### Rating: **Pass**

### Improvement Opportunities

- The **inline implementation patterns** section only describes concepts and points to `references/examples.md`. Consider keeping at least the `SignageImage` component inline — it's small enough and is the most commonly needed pattern.
- Add guidance on **service worker caching** for images — this is mentioned as a fallback level but never explained.
- Add a **"test with network disabled" checklist** item to the output contract.

---

## 10. signage-placeholder-images

**Test Prompt:** "I need placeholder images for a restaurant menu board with 2 featured dishes and a hero background."

### Skill Triggered?

Yes — "placeholder images", "menu board", "featured dishes", "hero background" match.

### Generated Output (applying skill guidance)

| Zone       | Purpose               | Dimensions | Filename               | Label                      | Alt Text                           |
| ---------- | --------------------- | ---------- | ---------------------- | -------------------------- | ---------------------------------- |
| Background | Full-screen food hero | 1920×1080  | `hero-food-bg.jpg`     | BACKGROUND HERO FOOD IMAGE | Background photo of signature dish |
| Featured 1 | Featured dish card    | 800×800    | `featured-dish-01.jpg` | FOOD IMAGE HERE            | Featured menu item photo           |
| Featured 2 | Featured dish card    | 800×800    | `featured-dish-02.jpg` | FOOD IMAGE HERE            | Featured menu item photo           |

**Developer notes:** These are placeholder references. Replace with brand-approved photography before deployment. Hero background should be high-res and tolerate heavy overlay. Featured images should show individual dishes on clean backgrounds.

### Assessment

| Criterion               | Result                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Trigger clarity         | Clear — placeholder images for signage                                                                   |
| Output matches contract | Yes — purpose, dimensions, filename, label, alt text, developer notes                                    |
| Rules applied correctly | Yes — deterministic naming, signage-appropriate dimensions                                               |
| Missing guidance        | No mention of **placeholder image generation services** (e.g., how to generate actual placeholder files) |

### Rating: **Pass**

### Improvement Opportunities

- Add guidance on **how to create the actual placeholder files** — SVG generation, solid-colour with text overlay, or reference to a tool.
- The skill is thorough for planning but doesn't bridge to implementation — no code for generating placeholder React components or utility functions.
- Add a **cross-reference to signage-content-fallbacks** — placeholder images are often the static fallback level.

---

## Summary

| #   | Skill                         | Rating      | Key Finding                                                  |
| --- | ----------------------------- | ----------- | ------------------------------------------------------------ |
| 1   | signage-layout-system         | **Pass**    | Missing data density limits for table/list screens           |
| 2   | signage-animation-system      | **Pass**    | No CSS code examples; needs starter patterns                 |
| 3   | signage-menu-board            | **Pass**    | Templates are landscape-first; no portrait variants          |
| 4   | signage-distance-legibility   | **Pass**    | Missing scaling formula for 4K / viewing distances           |
| 5   | signage-safe-layout           | **Partial** | Audit-only — no implementation code (CSS mixin, dev overlay) |
| 6   | signage-state-machine         | **Pass**    | Hook signature but no implementation body                    |
| 7   | signage-data-refresh-patterns | **Pass**    | `useSignageData` hook is a type stub only                    |
| 8   | signage-performance-budget    | **Pass**    | No automated budget check script                             |
| 9   | signage-content-fallbacks     | **Pass**    | Key patterns delegated to references file                    |
| 10  | signage-placeholder-images    | **Pass**    | No bridge from planning to actual file generation            |

### Pass Rate: 9/10 Pass, 1/10 Partial

---

## Cross-Cutting Improvement Opportunities

### 1. Implementation Gaps (Most Impactful)

Several skills define hook signatures or component APIs without implementation bodies:

- `signage-data-refresh-patterns` — `useSignageData` hook is a type signature only
- `signage-state-machine` — `SignageState` type + switch but no `useReducer` wiring
- `signage-safe-layout` — no CSS utility or dev overlay component

**Recommendation:** Add `references/examples.md` files with complete, copy-paste implementations for the 2-3 most critical patterns in each skill. `signage-content-fallbacks` already does this well.

### 2. Portrait/Orientation Blindspot

- `signage-menu-board` templates assume landscape
- `signage-layout-system` doesn't provide portrait-specific zone templates
- `signage-safe-layout` mentions portrait but other skills don't adapt

**Recommendation:** Add a "Portrait Adaptation" section to `signage-menu-board` and `signage-layout-system`.

### 3. Missing Scaling Guidance

- `signage-distance-legibility` gives minimums for 1080p at 3-5m but no formula for other resolutions or distances
- `signage-performance-budget` gives budgets but no per-device model reference

**Recommendation:** Add a simple scaling table or formula to `signage-distance-legibility`. Add a BrightSign model capability reference to `signage-performance-budget`.

### 4. Cross-Skill References Could Be Stronger

Skills reference each other in "Related Skills" sections, but the connections during actual use aren't always obvious:

- When would you use `signage-content-fallbacks` vs. `signage-state-machine`? (answer: fallbacks is per-zone content, state-machine is app lifecycle — but this distinction could be clearer)
- `signage-placeholder-images` should reference `signage-content-fallbacks` (placeholders ARE fallback content)

**Recommendation:** Add a brief "How This Relates To" note in the "When to Use" / "Do Not Use" sections clarifying handoff points between overlapping skills.

### 5. Actionable Code Patterns

Skills that rated highest in usefulness (`signage-content-fallbacks`, `signage-state-machine`, `signage-data-refresh-patterns`) all provide TypeScript patterns. Skills rated lower (`signage-safe-layout`, `signage-animation-system`) are principle-heavy with no code.

**Recommendation:** Every skill that can provide code should include at least one minimal, complete code example (in SKILL.md or references/).

---

## Priority Fixes (Ranked)

1. **Add `references/examples.md` to `signage-safe-layout`** with CSS safe-frame utility and React dev overlay — fixes the only "Partial" rating
2. **Complete `useSignageData` hook implementation** in `signage-data-refresh-patterns` — most requested implementation gap
3. **Add portrait template variants** to `signage-menu-board` — common deployment scenario not covered
4. **Add scaling reference** to `signage-distance-legibility` — prevents incorrect size calculations at 4K
5. **Add starter CSS animation patterns** to `signage-animation-system` — makes the skill generative, not just advisory
