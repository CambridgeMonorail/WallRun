---
name: chrome-devtools-webapp-debug
description: Investigate broken pages, failing user journeys, console errors, network failures, and frontend performance regressions using Chrome DevTools MCP. Use when a web app problem must be diagnosed with browser evidence, and produce a findings report with screenshots, console or network evidence, root-cause hypothesis, fix proposal, and verification steps.
license: MIT
metadata:
  author: CambridgeMonorail
  version: "1.0"
---

# Chrome DevTools WebApp Debugging Skill

## Purpose

This skill provides repeatable workflows for debugging web application issues using Chrome DevTools MCP, including console inspection, network analysis, screenshots, and performance traces.

## Requirement

This skill requires the `chrome-devtools` MCP server to be available in VS Code Copilot Agent mode.

If MCP tools are unavailable:

- Do not guess
- Do not propose fixes
- Ask the user to run the MCP Preflight agent or enable the MCP server

## When to use

Use this skill when the user reports:

- A page is broken or rendering incorrectly
- A user journey fails
- Network requests fail (4xx, 5xx, CORS, timeouts)
- Console errors or unhandled promise rejections
- Performance regressions (slow load, poor LCP, jank)

## Inputs to request

- Target URL (local or deployed)
- Repro steps
- Expected behaviour versus actual behaviour
- Environment (dev, stage, prod)
- Any error text or screenshots (optional)

## Evidence first

The agent must gather evidence before suggesting changes:

- Screenshot of the failing state
- Console output (errors and warnings)
- Network requests relevant to the failure
- Performance trace for slowness or jank

## MCP tool reference

The Chrome DevTools MCP server exposes these tool groups. Exact names may vary by server version; use `tool_search_tool_regex` with the pattern `mcp_io_github_chr` to discover the current set.

### Page and navigation

| Tool | Purpose |
|------|---------|
| `chr_navigate_page` | Navigate to a URL |
| `chr_new_page` | Open a new tab |
| `chr_select_page` | Switch between tabs |
| `chr_list_pages` | List open tabs |
| `chr_close_page` | Close a tab |
| `chr_resize_page` | Set viewport size |

### Evidence capture

| Tool | Purpose |
|------|---------|
| `chr_take_screenshot` | Capture the current viewport as an image |
| `chr_take_snapshot` | Capture the DOM (accessibility tree or HTML) |
| `chr_list_console_messages` | List all console messages (errors, warnings, logs) |
| `chr_get_console_message` | Read a specific console message in detail |
| `chr_list_network_requests` | List all network requests with status, timing, size |
| `chr_get_network_request` | Read headers, body, and timing for one request |

### Performance

| Tool | Purpose |
|------|---------|
| `chr_performance_start_trace` | Begin recording a performance trace |
| `chr_performance_stop_trace` | Stop the trace and return the result |
| `chr_performance_analyze_insight` | Get automated performance insights |
| `chr_take_memory_snapshot` | Capture a heap snapshot for memory analysis |
| `chr_lighthouse_audit` | Run a Lighthouse audit (performance, a11y, best practices) |

### Interaction (for reproduction)

| Tool | Purpose |
|------|---------|
| `chr_click` | Click an element by selector |
| `chr_fill` | Fill a form input |
| `chr_fill_form` | Fill multiple form fields at once |
| `chr_press_key` | Press a keyboard key |
| `chr_type_text` | Type text into the focused element |
| `chr_hover` | Hover over an element |
| `chr_wait_for` | Wait for a selector, navigation, or timeout |
| `chr_handle_dialog` | Accept or dismiss a browser dialog |

### Advanced

| Tool | Purpose |
|------|---------|
| `chr_evaluate_script` | Execute JavaScript in the page context |
| `chr_emulate` | Emulate device, network throttling, or geolocation |
| `chr_upload_file` | Upload a file to a file input |

## Evidence gathering sequence

Follow this order when investigating an issue:

```
1. chr_navigate_page     → Load the target URL
2. chr_take_screenshot   → Capture initial state
3. [reproduce the issue using click/fill/press_key]
4. chr_take_screenshot   → Capture failing state
5. chr_list_console_messages → Check for errors and warnings
6. chr_list_network_requests → Check for failed or slow requests
7. chr_get_network_request   → Inspect specific failing requests
8. chr_get_console_message   → Read detailed error with stack trace
```

For performance issues, insert a trace:

```
1. chr_performance_start_trace
2. [reproduce the slow action]
3. chr_performance_stop_trace
4. chr_performance_analyze_insight
```

For accessibility or best-practices audits:

```
1. chr_lighthouse_audit
```

## When to use this skill versus other approaches

| Scenario | Use this skill | Use instead |
|----------|---------------|-------------|
| Page broken, need browser evidence | Yes | — |
| Console error visible in terminal logs | No | systematic-debugging |
| Build failure or type error | No | verification |
| Server-side API returning errors | No | Server logs, systematic-debugging |
| Need to inspect live DOM state | Yes | — |
| Need to compare environments | Partially | Compare network responses, then check config |
| Performance regression with metrics | Yes | — |
| CSS/layout issue visible on screen | Yes | — |

## Output format

1. Summary of repro and findings
2. Evidence (console and network summaries, screenshots, trace notes)
3. Root cause hypothesis and confidence level
4. Minimal fix proposal
5. Verification plan
6. Regression checklist

## Troubleshooting

### MCP server not responding

1. Verify the Chrome DevTools MCP server is listed in VS Code MCP settings.
2. Check that a Chrome/Chromium instance is running with remote debugging enabled.
3. Try `chr_list_pages` — if it returns results, the connection is working.

### Cannot reproduce the issue

1. Check the URL is correct (dev vs staging vs production).
2. Use `chr_emulate` to match the user's device and network conditions.
3. Clear cookies and storage, then retry.
4. If auth is required, use `chr_fill_form` to log in with test credentials.

### Evidence is incomplete

- If network requests are missing, the page may have loaded before MCP connected. Navigate again with `chr_navigate_page`.
- If console messages are empty, reproduce the action after connecting.
- For intermittent issues, repeat the reproduction several times and compare evidence.

## Privacy and safety

Chrome DevTools MCP can access and modify the connected browser session.

- Use test accounts where possible
- Avoid real customer data
- Avoid pasting secrets into prompts or logs

## References

Scenario-specific workflows:

- [Console error and unhandled rejection](references/console-error.md)
- [Network failure (4xx, 5xx, CORS, timeout)](references/network-failure.md)
- [Performance triage (LCP focus)](references/performance-lcp.md)
- [Bug triage (general)](references/bug-triage.md)
- [Rendering and layout issues](references/rendering-layout.md)
- [Interaction failure (clicks, forms, navigation)](references/interaction-failure.md)
- [Authentication and session issues](references/auth-session.md)
