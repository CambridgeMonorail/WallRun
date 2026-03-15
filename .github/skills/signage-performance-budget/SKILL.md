---
name: signage-performance-budget
description: Audit and validate bundle size, image weight, font loading, and frame-rate budgets for digital signage running on embedded hardware like BrightSign players. Use when building or reviewing signage apps to prevent performance issues on resource-constrained devices.
license: MIT
metadata:
  author: CambridgeMonorail
  version: '1.0'
---

# Signage Performance Budget Skill

## Purpose

Use this skill to check whether a signage app will run smoothly on embedded playback hardware.

React developers routinely ship 2 MB font files, heavy animation libraries, and unoptimized images that work fine on modern laptops but cripple a BrightSign player or similar embedded device. This skill encodes the actual constraints of signage hardware and provides actionable budgets.

## When to Use

Use this skill when you need to:

- review a signage app's bundle size and asset weight
- check whether animations or transitions will run smoothly on embedded hardware
- optimize images, fonts, and JavaScript for resource-constrained players
- establish performance budgets for a new signage project
- diagnose performance issues on deployed signage hardware

## Do Not Use When

Do not use this skill when:

- building a desktop or mobile web app with modern hardware targets
- the deployment target is a high-end PC or media player with desktop-class resources
- the task is about layout, legibility, or content design (use other signage skills)

## Core Principle

**Signage hardware is not a laptop. Budget for embedded ARM processors, limited RAM, and no GPU acceleration for complex CSS.**

## Performance Budgets

### JavaScript Bundle

| Metric                | Target   | Hard Limit | Notes                        |
| --------------------- | -------- | ---------- | ---------------------------- |
| Main bundle (gzipped) | < 150 KB | < 300 KB   | Total JS loaded on boot      |
| Total JS (gzipped)    | < 250 KB | < 500 KB   | Including lazy-loaded chunks |
| Third-party libraries | < 100 KB | < 200 KB   | Avoid heavy frameworks/libs  |

### Assets

| Metric                  | Target   | Hard Limit | Notes                               |
| ----------------------- | -------- | ---------- | ----------------------------------- |
| Total page weight       | < 1 MB   | < 2 MB     | All assets for initial render       |
| Individual image        | < 200 KB | < 500 KB   | After optimization                  |
| Total images per screen | < 500 KB | < 1 MB     | All images visible at once          |
| Font files (total)      | < 100 KB | < 250 KB   | Subset aggressively                 |
| Video/animation assets  | < 5 MB   | < 10 MB    | Pre-optimized for target resolution |

### Runtime Performance

| Metric                      | Target      | Minimum              | Notes                          |
| --------------------------- | ----------- | -------------------- | ------------------------------ |
| First contentful paint      | < 2 seconds | < 4 seconds          | From app load, not player boot |
| Frame rate during animation | 30 fps      | 24 fps               | Smooth perceived motion        |
| Memory usage (steady state) | < 100 MB    | < 200 MB             | After initial load stabilizes  |
| Layout recalculations       | Minimal     | No continuous reflow | Avoid per-frame layout thrash  |
| CPU usage (idle)            | < 10%       | < 25%                | When content is static         |

## Common Performance Traps

### JavaScript

| Trap                                                 | Problem                        | Solution                                                   |
| ---------------------------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| Heavy animation libraries (GSAP, Framer Motion full) | Large bundle, high CPU         | Use CSS animations/transitions, or tree-shake aggressively |
| Full icon libraries                                  | 500 KB+ for a few icons        | Import individual icons only                               |
| Moment.js, Lodash (full)                             | Massive unused code            | Use date-fns, native methods, or targeted imports          |
| Polyfills for old browsers                           | Unnecessary weight             | BrightSign uses Chromium — target modern JS                |
| React dev mode in production                         | 2× bundle size, slow rendering | Ensure production builds                                   |

### Images

| Trap                                 | Problem               | Solution                                                  |
| ------------------------------------ | --------------------- | --------------------------------------------------------- |
| Unoptimized PNGs/JPEGs               | 2–5 MB per image      | Compress, resize to display resolution, use WebP          |
| 4K images on 1080p screens           | 4× the pixels needed  | Size images to deployment resolution                      |
| Many small decorative images         | HTTP request overhead | Use CSS, SVG inline, or sprite sheets                     |
| Background images at full resolution | Massive file size     | Compress aggressively — backgrounds tolerate quality loss |

### Fonts

| Trap                             | Problem                    | Solution                                            |
| -------------------------------- | -------------------------- | --------------------------------------------------- |
| Full Google Fonts downloads      | 500 KB–2 MB per family     | Subset to characters actually used                  |
| Multiple font weights/styles     | Compounds file size        | Use 2–3 weights maximum                             |
| Web font loading blocking render | Delays first paint         | Use `font-display: swap` and preload critical fonts |
| Custom fonts loaded from CDN     | Network dependency at boot | Bundle fonts locally for signage                    |

### CSS and Rendering

| Trap                                       | Problem                            | Solution                             |
| ------------------------------------------ | ---------------------------------- | ------------------------------------ |
| Complex box-shadows and filters            | GPU-intensive on embedded hardware | Use simple shadows or none           |
| CSS backdrop-filter / blur                 | Very expensive on weak GPUs        | Avoid or use sparingly               |
| Continuous CSS animations on many elements | Frame drops                        | Limit simultaneous animations to 2–3 |
| Large numbers of DOM nodes                 | Slow rendering and reflow          | Keep DOM under 500 nodes per screen  |

## Measurement and Verification

### Build-Time Checks

```bash
# Check bundle size after build
du -sh dist/assets/*.js
du -sh dist/assets/*.css

# Check total asset weight
du -sh dist/

# Check for production mode
grep -r "process.env.NODE_ENV" dist/ | head
```

### Runtime Checks

- Use Chrome DevTools Performance tab to measure frame rate and CPU usage.
- Use Chrome DevTools Network tab to measure total transfer size.
- Use Chrome DevTools Memory tab to check for leaks during continuous operation.
- Run the app for 30+ minutes and check that memory usage remains stable.

### BrightSign-Specific

- Test on actual player hardware, not just a desktop browser.
- Use BrightSign diagnostic web server to monitor memory and CPU.
- Check that the player's Chromium version supports all CSS/JS features used.

## Output Contract

When reviewing a signage app for performance, produce:

1. bundle size assessment against targets (JS, CSS, fonts)
2. asset weight assessment (images, fonts, video)
3. runtime performance risks (animations, DOM complexity, CSS effects)
4. specific items that exceed budgets with recommended fixes
5. overall performance verdict: within budget / at risk / over budget

## Example Output Format

```
Performance Budget Review

Bundle Size:
• Main JS: 180 KB gzipped — ⚠️ above target (150 KB), within hard limit
• CSS: 12 KB gzipped — ✅ within budget
• Fonts: 320 KB — ❌ exceeds hard limit (250 KB)

Assets:
• Hero image: 1.2 MB — ❌ exceeds hard limit (500 KB)
• Total page weight: 1.8 MB — ⚠️ approaching hard limit (2 MB)

Runtime Risks:
• backdrop-filter used on overlay — likely to drop frames on BrightSign
• 847 DOM nodes — ⚠️ approaching complexity limit (500 target)

Recommendations:
• Subset fonts to Latin characters only (est. savings: 200 KB)
• Compress hero image to WebP at display resolution (est. savings: 900 KB)
• Replace backdrop-filter with solid semi-transparent background
• Simplify DOM structure in menu zone

Verdict: ❌ Over budget — requires optimization before deployment
```

## Constraints

- Do not assume desktop-class hardware performance.
- Do not approve bundles exceeding hard limits without explicit hardware verification.
- Do not recommend animation libraries without evaluating their bundle cost.
- Do not skip font subsetting — full font families are a common budget-buster.
- Always recommend local font bundling over CDN loading for signage deployments.
