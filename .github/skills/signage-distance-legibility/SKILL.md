---
name: signage-distance-legibility
description: Review and enforce minimum text sizes, contrast requirements, information density, and hierarchy clarity for digital signage viewed at 3–10 metres. Use when building or reviewing signage screens, and produce a legibility assessment with problems, recommendations, and suggested layout changes.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.0'
---

# Signage Distance Legibility Skill

## Purpose

Use this skill to review signage UI for readability at real-world viewing distances.

Web developers design for 30–60 cm. Signage is viewed at 3–10 metres. This skill encodes the rules that prevent text from being too small, contrast from being too weak, and information density from overwhelming the viewer.

## When to Use

Use this skill when you need to:

- review a signage screen for distance readability
- set minimum text sizes for a new signage layout
- evaluate contrast and colour choices for display environments
- check information density and zone content limits
- ensure hierarchy is clear enough to read at a glance from across a room

## Do Not Use When

Do not use this skill when:

- designing desktop or mobile interfaces meant for close reading
- the display is an interactive kiosk with a touch distance of < 1 metre
- the task is purely about layout structure (use `signage-layout-system` instead)

## Core Principle

**If you can't read it from 3 metres away, it doesn't belong on a signage screen.**

Every element must justify its size against viewing distance, not screen resolution.

## Minimum Size Rules

These are baseline minimums for standard 1920×1080 signage at 3–5 metre viewing distance. Scale proportionally for 4K or larger viewing distances.

| Element                        | Minimum Size | Notes                                     |
| ------------------------------ | ------------ | ----------------------------------------- |
| Headline / Hero text           | 96px+        | Primary attention anchor                  |
| Primary body text              | 48px+        | Menu items, key information               |
| Secondary text                 | 36px+        | Descriptions, supporting detail           |
| Tertiary / metadata            | 24px+        | Timestamps, footnotes — use sparingly     |
| Touch targets (if interactive) | 120px+       | Rare in signage, but generous when needed |
| Icon size                      | 48px+        | Must be recognizable, not decorative      |

### Resolution and Distance Scaling

The baseline table above is for **1080p at 3–5 m**. Use these multipliers for other setups:

| Resolution   | Multiplier | Headline | Body  | Secondary | Tertiary |
| ------------ | ---------- | -------- | ----- | --------- | -------- |
| 1080p        | 1×         | 96 px    | 48 px | 36 px     | 24 px    |
| 4K (2160p)   | 2×         | 192 px   | 96 px | 72 px     | 48 px    |

For longer viewing distances on a 1080p screen:

| Distance | Headline | Body  | Secondary | Tertiary |
| -------- | -------- | ----- | --------- | -------- |
| 3 m      | 96 px    | 48 px | 36 px     | 24 px    |
| 5 m      | 120 px   | 60 px | 48 px     | 32 px    |
| 8 m      | 160 px   | 80 px | 60 px     | 40 px    |
| 10 m     | 192 px   | 96 px | 72 px     | 48 px    |

**Rule of thumb:** use the 3 m row as the baseline. For distances between rows, interpolate linearly between the nearest values in this table.

## Contrast and Colour Rules

- Minimum contrast ratio: WCAG AA (4.5:1 for text), but **prefer higher** for distance viewing.
- Avoid subtle grey-on-white or grey-on-black — boost contrast beyond what looks good on a laptop.
- Avoid thin fonts, light font weights, and low-saturation text.
- Assume the display is in a bright environment (retail, lobby, sunlight) unless told otherwise.
- Avoid relying on colour alone to convey meaning — use size and weight as backup signals.
- Prefer high-saturation, high-contrast colour combinations that survive ambient light wash.

## Information Density Rules

- Maximum lines of text per zone: 4–6.
- Maximum items in a list or menu column: 8–10 before readability degrades.
- Maximum number of distinct content zones per screen: 4–5.
- One primary message per screen — everything else is supporting context.
- White space is a readability tool, not wasted area.
- If content must scroll or paginate, it is probably too dense for a single view.

## Hierarchy Clarity Rules

- The most important content should occupy the largest area and use the strongest visual weight.
- There should be no more than 3–4 levels of typographic hierarchy on any single screen.
- Size jumps between hierarchy levels should be obvious — at least 1.5× between levels.
- Viewers should be able to identify the primary message within 2 seconds of looking at the screen.
- Secondary content should not compete visually with primary content.

## Display Environment Considerations

Signage screens operate in varied environments that affect legibility:

- **Retail / lobby**: bright overhead lighting, reflections on glass.
- **Outdoor / window-facing**: direct sunlight, extreme brightness.
- **Dim environments**: restaurants, cinemas — avoid blinding white backgrounds.
- **Airport / transit**: high ambient noise competes for attention; text must be unmissable.

Adjust contrast, brightness, and background choices to suit the expected environment.

## Output Contract

When reviewing a signage screen, produce:

1. a summary of legibility problems found (with specific elements cited)
2. recommended minimum sizes for each text element
3. contrast issues and suggested improvements
4. density assessment — whether any zone is overloaded
5. hierarchy assessment — whether the primary message is immediately clear
6. suggested layout changes to improve distance readability

## Example Output Format

```
Distance Legibility Review

Problems:
• Price text at 18px — too small for 3–5m viewing (minimum: 48px)
• 12 menu items in single column — exceeds density limit (max: 8–10)
• Promotional badge uses light grey on white — insufficient contrast
• Secondary description competes with headline for visual weight

Recommendations:
• Increase price text to 48px minimum
• Split menu into two columns or paginate with timed rotation
• Increase badge contrast to minimum 4.5:1 ratio
• Reduce description font weight and increase size gap from headline

Hierarchy Assessment:
Primary message is clear: ✅
Supporting content is subordinate: ❌ (description text too prominent)
```

## Constraints

- Do not assume laptop viewing distance when evaluating signage.
- Do not approve text below the minimum size thresholds without explicit justification.
- Do not treat WCAG AA as sufficient — it is a floor, not a target for distance viewing.
- Do not approve designs where the primary message takes more than 2 seconds to identify.

## Related Skills

- Use `signage-layout-system` for zone structure and hierarchy.
- Use `signage-safe-layout` to ensure text doesn't fall outside safe margins after sizing.
- Use `signage-menu-board` for menu-specific text hierarchy and price sizing.
