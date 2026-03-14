# Workflow: Rendering and layout issues

## Goal

Diagnose visual problems — missing content, layout shifts, overlapping elements, or incorrect styling — using DOM and screenshot evidence.

## Steps

1. Navigate to the URL and capture a screenshot of the broken state.
2. Take a DOM snapshot (`chr_take_snapshot`) to inspect the element tree.
3. Check console messages for rendering warnings:
   - React hydration mismatches
   - Missing CSS imports
   - Failed image or font loads
4. If layout shifts are suspected, run a Lighthouse audit and check CLS score.
5. Inspect network requests for missing stylesheets, fonts, or images.
6. Use `chr_evaluate_script` to query computed styles if needed:
   ```js
   getComputedStyle(document.querySelector('.broken-element')).display
   ```
7. Propose a fix targeting the root cause:
   - Missing import or broken asset path
   - CSS specificity conflict
   - Incorrect container sizing or overflow
   - Z-index stacking issue
8. Verification plan:
   - Reload and confirm layout matches expected design
   - Confirm no CLS regression via Lighthouse

## Common causes

- CSS file not loaded (check network for 404 on `.css`)
- Tailwind class not generated (missing in content scan)
- Container has `overflow: hidden` clipping children
- Flex/grid item has wrong `min-width` or `min-height`
- Font not loaded, causing FOUT or layout shift
