# Workflow: Interaction failure (clicks, forms, navigation)

## Goal

Diagnose why a user action (click, form submit, navigation) does not produce the expected result.

## Steps

1. Navigate to the page and capture a screenshot of the initial state.
2. Attempt the interaction using MCP tools:
   - `chr_click` for button or link clicks
   - `chr_fill` and `chr_fill_form` for form inputs
   - `chr_press_key` for keyboard actions
3. Capture a screenshot of the post-interaction state.
4. Check console messages for:
   - Unhandled promise rejections
   - Event handler errors
   - React state warnings
5. Check network requests for:
   - API calls triggered by the action
   - Failed submissions (4xx, 5xx)
   - Missing CSRF tokens or auth headers
6. If the click does not register:
   - Verify the selector targets the correct element
   - Check for overlapping elements (z-index, modals, overlays)
   - Use `chr_evaluate_script` to check if the element is disabled or hidden
7. For form submissions that silently fail:
   - Check validation state via console or DOM inspection
   - Verify the form action URL is correct
   - Look for `preventDefault` blocking submission
8. Propose a fix and verification plan.

## Common causes

- Click target obscured by an overlay or modal backdrop
- Element is disabled or has `pointer-events: none`
- Event handler throws before completing
- Form validation blocks submission without visible feedback
- SPA router intercepts navigation incorrectly
- Missing `type="submit"` on form button
