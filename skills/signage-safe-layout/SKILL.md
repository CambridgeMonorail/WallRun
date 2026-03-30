---
name: signage-safe-layout
description: Enforce safe layout constraints for digital signage running on unknown displays with overscan, bezel compensation, player rotation, and resolution mismatches. Use when building signage layouts that must survive real-world display hardware, and produce layout guidance that prevents content from being clipped or misaligned.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.0'
---

# Signage Safe Layout Skill

## Purpose

Use this skill to ensure signage layouts survive the realities of physical display hardware.

Web developers assume pixel-perfect viewport control. Signage runs on unknown displays with overscan, bezels, rotation, and resolution mismatches that can clip, crop, or distort content. This skill encodes the constraints that prevent broken screens on real hardware.

## When to Use

Use this skill when you need to:

- build a signage layout that must work on multiple display types
- check whether content is too close to screen edges
- handle landscape, portrait, and rotated display orientations
- design layouts that adapt across 1080p, 4K, and non-standard resolutions
- avoid CSS and layout patterns that break on embedded signage players

## Do Not Use When

Do not use this skill when:

- designing for a known, fixed-size desktop or mobile viewport
- the display is a controlled kiosk with a known panel and no overscan
- the task is about content hierarchy or typography (use `signage-layout-system` or `signage-distance-legibility`)

## Core Principle

**Design as if 5% of every edge is invisible.**

If critical content is placed near the screen edge, some displays will clip it. Build defensively.

## Safe Frame Rules

| Rule                               | Guideline                                                       |
| ---------------------------------- | --------------------------------------------------------------- |
| Safe margin                        | Minimum 5% inset from all edges for critical content            |
| CTA / prices / key text            | Must be inside safe frame (5% inset minimum)                    |
| Background and decorative elements | May bleed to edges                                              |
| Logo placement                     | Inside safe frame unless brand guidelines require edge position |
| Tickers and scrolling text         | Start and end within safe frame                                 |

## Resolution Independence Rules

Signage players commonly run at:

- 1920×1080 (Full HD landscape)
- 1080×1920 (Full HD portrait)
- 3840×2160 (4K landscape)
- 2160×3840 (4K portrait)
- Non-standard resolutions from video walls or specialty panels

| Rule                                    | Guideline                                                    |
| --------------------------------------- | ------------------------------------------------------------ |
| Avoid hardcoded pixel dimensions        | Use relative units (%, vw, vh, fr) for layout structure      |
| Avoid relying on exact viewport height  | `100vh` can be unreliable; prefer `100dvh` or flex/grid fill |
| Design for aspect ratio, not resolution | A layout that works at 16:9 should scale from 1080p to 4K    |
| Test both landscape and portrait        | Unless the deployment is locked to one orientation           |
| Avoid fixed-width containers            | Use fluid containers that adapt to available space           |

## Rotation and Orientation Rules

Many signage deployments rotate a landscape display to portrait mode. How rotation is handled depends on the player:

- **BrightSign**: The `roHtmlWidget` has no rotation API. CSS transforms are the **recommended** approach.
- **Other players**: Some handle rotation at the OS/player level. Check your player's capabilities.

| Rule                                                    | Guideline                                                                  |
| ------------------------------------------------------- | -------------------------------------------------------------------------- |
| Content must read correctly in the deployed orientation | Do not assume landscape                                                    |
| BrightSign: Use CSS transforms for rotation             | `roHtmlWidget` has no rotation API — CSS is the only option                |
| Other players: Check player-level rotation first        | Only use CSS rotation if player doesn't handle it                          |
| Test layouts at 9:16 and 16:9                           | Critical content zones must adapt to both                                  |
| Vertical stacking for portrait                          | Multi-zone layouts should reflow to vertical stacking in portrait          |

### BrightSign Rotation Decision Table

When using CSS rotation for BrightSign, select the **compensation direction** (opposite to physical screen rotation):

| Physical Screen Rotation      | CSS Compensation | Config Setting    | CSS Transform  |
| ----------------------------- | ---------------- | ----------------- | -------------- |
| Standard landscape            | None             | `landscape`       | (none)         |
| Rotated 90° anti-clockwise    | +90° clockwise   | `portrait-right`  | `rotate(90deg)`  |
| Rotated 90° clockwise         | -90° anti-clockwise | `portrait-left` | `rotate(-90deg)` |
| Upside down (180°)            | 180°             | `inverted`        | `rotate(180deg)` |

**Common mistake**: Selecting `portrait-left` when the screen is rotated anti-clockwise. This rotates content the same direction as the screen = 180° = upside down.

## Overscan and Bezel Compensation

| Rule                                                      | Guideline                                                  |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| Assume 3–5% overscan on consumer displays                 | Professional displays may have 0%, but do not rely on it   |
| Bezel-adjacent content on video walls                     | Add extra margin equal to bezel width                      |
| Do not place text or icons flush with edges               | Even on zero-overscan displays, edge content feels cramped |
| Test with a visible safe-frame overlay during development | Remove before deployment                                   |

## CSS and Layout Anti-Patterns

Patterns that commonly break on signage hardware:

| Anti-Pattern                                    | Problem                              | Alternative                           |
| ----------------------------------------------- | ------------------------------------ | ------------------------------------- |
| `position: absolute` with pixel offsets         | Breaks at different resolutions      | Use CSS Grid or Flexbox positioning   |
| `100vh` for full-screen height                  | Unreliable on some players           | Use `100dvh`, flex fill, or grid fill |
| Fixed pixel widths on containers                | Does not adapt to resolution changes | Use percentage or fractional units    |
| `overflow: hidden` on viewport-level containers | Can mask clipping issues             | Prefer layout that naturally fits     |
| `transform: rotate()` for display orientation   | See rotation rules above — varies by player | BrightSign requires CSS rotation; others may not |
| Small fixed-position elements near edges        | Clipped by overscan                  | Move into safe frame                  |

## Implementation Patterns

Apply safe layout constraints using CSS utilities and a development overlay. See [implementation examples](references/examples.md) for:

- A `.safe-frame` CSS class that enforces the 5% inset
- A full-screen `.signage-shell` CSS Grid shell with portrait reflow
- A `<SafeFrameOverlay />` React component for visualising the safe boundary during development

## Output Contract

When reviewing or generating a signage layout, produce:

1. safe frame compliance assessment — whether critical content is inside the safe margin
2. resolution independence assessment — whether the layout adapts to common resolutions
3. orientation assessment — whether the layout works in both landscape and portrait
4. identified anti-patterns — CSS or layout choices that risk breaking on hardware
5. specific recommendations for any issues found

## Example Output Format

```
Safe Layout Review

Problems:
• Primary CTA placed 12px from right edge — outside safe frame
• Container uses fixed width of 1200px — will not adapt to 4K
• Layout assumes landscape orientation — no portrait fallback

Recommendations:
• Move CTA inside 5% safe margin (minimum 96px inset at 1920px)
• Replace fixed width with max-width + fluid container
• Add portrait breakpoint with vertical zone stacking

Safe Frame: ❌ (1 element outside safe margin)
Resolution Independence: ❌ (fixed pixel widths)
Orientation Support: ❌ (landscape only)
```

## Constraints

- Do not approve layouts with critical content outside the 5% safe margin.
- Do not approve fixed pixel dimensions for primary layout structure.
- Do not assume the deployment orientation is known unless explicitly stated.

## Related Skills

- Use `signage-layout-system` to structure zones and hierarchy before applying safe margins.
- Use `signage-distance-legibility` to verify text sizes survive after safe-margin insets.
- Use `signage-performance-budget` when targeting specific BrightSign hardware.
- Do not use CSS transforms for display rotation — this is a player-level concern.
