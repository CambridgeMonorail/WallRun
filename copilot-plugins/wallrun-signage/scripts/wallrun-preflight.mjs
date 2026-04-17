#!/usr/bin/env node

/**
 * Minimal advisory hook for WallRun plugin output.
 *
 * This starter intentionally stays conservative:
 * - exits 0
 * - prints reminders
 * - avoids mutating anything
 *
 * Replace with richer parsing once the hook payload shape
 * is stabilised in the VS Code plugin API.
 */

const reminders = [
  'Confirm target orientation and resolution are explicit.',
  'Confirm safe-area or overscan handling is defined.',
  'Confirm offline and empty-data fallback states exist.',
  'Confirm autoplay and startup assumptions are realistic.',
  'Confirm no deploy success is claimed without evidence.',
  'Confirm no credentials or machine-specific device details are embedded.',
];

for (const reminder of reminders) {
  console.log(`[wallrun-preflight] ${reminder}`);
}

process.exit(0);
