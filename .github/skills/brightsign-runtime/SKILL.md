---
name: brightsign-runtime
description: Explain how to build and adapt web applications that run reliably on BrightSign players. Use when generating code intended for BrightSign hardware, and produce implementation guidance or code that respects static deployment, embedded runtime constraints, media autoplay requirements, limited resources, and always-on operation.
---

# BrightSign Runtime Skill

## Purpose

Use this skill to shape frontend code for the realities of BrightSign playback hardware instead of assuming a normal desktop browser environment.

This skill exists to prevent web developers from generating code that is technically valid in Chrome but fragile, heavy, or operationally unsafe on a player.

## When to Use

Use this skill when you need to:

- generate frontend code that will run on BrightSign hardware
- review whether a React or web implementation is suitable for a player
- adapt browser-first UI patterns for an embedded signage runtime
- make decisions about assets, media playback, polling, and startup behavior
- reduce runtime complexity before packaging or deployment

## Do Not Use When

Do not use this skill when:

- the target environment is a normal desktop or mobile browser only
- the task is purely about packaging, uploading, or debugging an already built app
- you only need network or player diagnostics rather than implementation guidance

## Core Principle

**BrightSign is an embedded playback target, not a general-purpose workstation browser.**

Prefer predictable, static, low-overhead solutions over rich but fragile runtime behavior.

## Runtime Model

Assume the application will run with these constraints:

- the app is launched as a packaged static site from local storage
- the screen is usually full-screen and always on
- user interaction may be minimal or absent
- hardware resources are more constrained than a developer laptop
- recovery from network or data failures matters more than feature richness

## Implementation Rules

1. Prefer static builds and local assets over runtime-heavy architectures.
2. Minimize bundle size and avoid unnecessary dependencies.
3. Avoid background churn such as aggressive polling, frequent re-render loops, or unnecessary timers.
4. Treat startup time and steady-state stability as first-class requirements.
5. Assume the screen may run unattended for long periods.
6. Fail gracefully when remote APIs, assets, or media sources are unavailable.
7. Design for deterministic playback rather than interactive complexity.

## Media and Playback Rules

- Ensure video and audio behavior is compatible with autoplay expectations on managed playback devices.
- Prefer explicit, resilient media handling over browser-only assumptions.
- Avoid depending on user gestures to unlock core playback.
- Use media sparingly when it competes with readability or system stability.
- Design loops and transitions to run cleanly for extended periods.

## Network and Data Rules

- Do not assume continuous or low-latency connectivity.
- Cache or retain the last known good state when practical.
- Avoid rapid polling intervals.
- Prefer predictable refresh cadence over noisy live updates.
- Handle API failures with visible fallback behavior rather than blank screens.

## UI and Rendering Constraints

- Favor simple layout and rendering paths.
- Avoid expensive animation, visual effects, and unnecessary DOM complexity.
- Avoid relying on browser features that are optional, flaky, or unnecessary for signage.
- Prefer stable full-screen presentation over multi-panel app chrome.

## Operational Constraints

- Build for unattended operation and easy restart behavior.
- Avoid hidden failure modes that leave the screen blank or stale without indication.
- Make timestamps, stale indicators, and fallback states explicit when data freshness matters.
- Prefer code paths that are easy to package, deploy, and diagnose later.

## Output Contract

When responding with guidance or code, produce:

1. a BrightSign suitability assessment for the proposed approach
2. implementation guidance or code shaped for an embedded signage runtime
3. explicit notes on risky browser assumptions removed or avoided
4. fallback or degradation behavior for media, data, or connectivity issues
5. any follow-up packaging, deployment, or debugging considerations

## Evaluation Checklist

Before finalizing, check whether the result:

- can run as a static packaged app
- avoids unnecessary runtime overhead
- handles autoplay and media behavior safely
- degrades gracefully when networked data fails
- is likely to remain stable during long unattended playback

## Related Skills

- Use `brightsign-package` to turn the app into a deployable player package.
- Use `brightsign-deploy-local` for fast local iteration on hardware.
- Use `brightsign-debug` when the issue is already happening on a player.
- Use `signage-layout-system` to shape the wall-screen UI itself.