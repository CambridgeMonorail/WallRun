---
name: signage-layout-system
description: Generate full-screen digital signage layouts designed for large displays, distance readability, and continuous operation. Use when building dashboards, menu boards, status screens, or information displays that run on wall-mounted screens, and produce layout guidance or UI code that prioritizes zoning, hierarchy, and glanceable content over typical web-app chrome.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.0'
---

# Signage Layout System Skill

## Purpose

Use this skill to design layouts for screens that live on walls, are viewed at distance, and must communicate quickly without interaction.

This skill exists to stop digital signage from being generated like a cramped SaaS dashboard or a desktop admin panel.

## When to Use

Use this skill when you need to:

- design a full-screen signage interface
- create a status board, operations screen, menu board, or information display
- adapt web UI patterns for viewing at distance
- structure content into clear visual zones for a large display
- improve readability and hierarchy for always-on public screens

## Do Not Use When

Do not use this skill when:

- designing a traditional desktop or mobile application UI
- building forms, settings screens, or dense operator tooling
- the primary interaction model is typing, clicking, or multi-step workflow completion

## Core Principle

**A signage screen should be understood at a glance from across the room.**

Optimize for distance readability, strong hierarchy, and stable composition before decorative detail.

## Layout Rules

1. Design for full-screen output first, not a browser card inside a page.
2. Divide the screen into a small number of clear zones with obvious purpose.
3. Promote the most important information with the largest area and strongest contrast.
4. Keep text brief, scannable, and grouped into predictable regions.
5. Use generous spacing so content blocks remain legible from distance.
6. Prefer a few strong containers over many small cards.
7. Build for continuous operation and visual stability rather than novelty.

## Typography Rules

- Use large typographic scale with clear separation between headline, primary value, secondary context, and metadata.
- Avoid body-copy density that assumes close reading distance.
- Keep line lengths short enough to scan quickly.
- Treat small text as an exception, not a default.
- Use numeric emphasis for time, counts, prices, and KPIs when those values drive the screen.

## Hierarchy and Zoning

Every screen should answer these questions immediately:

1. What is this screen about?
2. What is the most important information right now?
3. What should the viewer look at next?

Use zones such as:

- headline or context band
- primary information area
- secondary status or supporting data area
- footer or timestamp area when freshness matters

## Constraints

- Avoid SaaS-style card grids with many equally weighted panels.
- Avoid form UI and dense navigation chrome unless the screen genuinely requires them.
- Avoid tiny badges, helper text, and low-contrast detail that only works at laptop distance.
- Avoid visual clutter that competes with the primary message.
- Avoid assuming user interaction; signage is usually glance-first and passive.

**Table and list layouts are acceptable** when the screen's purpose is data presentation (e.g., flight departures, transit arrivals, leaderboards, schedules). In those cases, apply the data density limits below.

## Data Density Limits

When a layout includes tables, lists, or repeated rows:

| Orientation | Max visible rows | Max columns | Notes                                 |
| ----------- | ---------------- | ----------- | ------------------------------------- |
| Landscape   | 10–12            | 4–6         | Keep cell text at 36 px+ minimum      |
| Portrait    | 14–16            | 3–4         | Narrower columns, taller visible area |

- If content exceeds the row limit, paginate with timed rotation (8–15 s per page).
- Column headers should be visually distinct from data rows (weight, size, or background).
- Avoid horizontal scrolling — if it doesn't fit, reduce columns or abbreviate.
- See `signage-distance-legibility` for minimum text sizes within table cells.

## Output Contract

When generating a solution, produce:

1. a layout concept with named zones and their purpose
2. rationale for hierarchy and viewing-distance decisions
3. implementation guidance or React UI code suitable for a full-screen signage surface
4. notes on what was intentionally excluded to protect readability

## Recommended Output Shape

When code is requested, prefer:

- full-screen layouts
- strong section structure
- restrained component count
- explicit spacing and alignment decisions
- data presentation that remains readable without interaction

## Evaluation Checklist

Before finalizing, check whether the result:

- reads clearly from distance
- has one dominant focal area
- avoids generic dashboard clutter
- uses typography to create hierarchy
- would still work if seen for only a few seconds

## Related Skills

- Use `signage-animation-system` for motion systems tuned to public displays.
- Use `signage-menu-board` for restaurant-specific hierarchy and price layouts.
- Use `signage-distance-legibility` for text sizing validation at viewing distance.
- Use `signage-safe-layout` for safe margins, orientation support, and resolution independence.
- Use `brightsign-runtime` when implementation choices must account for player constraints.
