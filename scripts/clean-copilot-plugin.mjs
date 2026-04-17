#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const pluginRoot = path.join(process.cwd(), 'copilot-plugins', 'wallrun-signage');

if (fs.existsSync(pluginRoot)) {
  fs.rmSync(pluginRoot, { recursive: true, force: true });
  console.log(`[plugin:copilot:clean] Removed ${pluginRoot}`);
} else {
  console.log(`[plugin:copilot:clean] Nothing to clean — ${pluginRoot} does not exist`);
}
