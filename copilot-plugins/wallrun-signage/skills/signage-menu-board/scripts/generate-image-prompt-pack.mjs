#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = parseArgs(process.argv.slice(2));

if (args.help || !args.menu || !args.venue || !args.brand) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

const menu = JSON.parse(
  await readFile(path.resolve(process.cwd(), args.menu), 'utf8'),
);
const venue = JSON.parse(
  await readFile(path.resolve(process.cwd(), args.venue), 'utf8'),
);
const brand = JSON.parse(
  await readFile(path.resolve(process.cwd(), args.brand), 'utf8'),
);

const prompts = [];
prompts.push('# Image Prompt Pack');
prompts.push('');
prompts.push(`Venue: ${venue.name}`);
prompts.push(`Mode: ${menu.mode ?? 'unknown'}`);
prompts.push('');
prompts.push('## Logo Direction');
prompts.push('');
prompts.push(
  `Create a distance-readable wordmark direction for ${venue.name}, a ${venue.concept} venue with a ${venue.tone} tone. Use ${brand.typography.heading} cues, keep it simple for digital menu signage, and avoid intricate detail.`,
);
prompts.push('');

prompts.push('## Hero Image');
prompts.push('');
prompts.push(buildHeroPrompt(venue, brand, menu));
prompts.push('');

prompts.push('## Featured Items');
prompts.push('');
for (const item of getFeaturedItems(menu)) {
  prompts.push(`- ${item.name}: ${buildFeaturedPrompt(venue, brand, item)}`);
}

if (getFeaturedItems(menu).length === 0) {
  prompts.push('- No featured items were present in the menu JSON.');
}

prompts.push('');
prompts.push('## Category-Supporting Images');
prompts.push('');
for (const category of menu.categories ?? []) {
  const sample = category.items?.[0];
  if (!sample) {
    continue;
  }
  prompts.push(
    `- ${category.title}: ${buildCategoryPrompt(venue, brand, category.title, sample.name)}`,
  );
}

const outputPath = path.resolve(
  process.cwd(),
  args.output ?? `./prompt-pack-${menu.mode ?? 'menu'}.md`,
);
await writeFile(outputPath, `${prompts.join('\n')}\n`, 'utf8');
console.log(`Wrote prompt pack to ${outputPath}`);

function buildHeroPrompt(venue, brand, menu) {
  return `High-quality food photography for digital menu signage. Venue: ${venue.name}. Concept: ${venue.concept}. Offer: ${menu.offerLabel ?? 'Core menu hero'}. Tone: ${venue.tone}. Palette cues: background ${brand.colours.background}, accent ${brand.colours.accent}. Shot type: hero image, strong focal dish, clean composition, ${brand.imageStyle}, no text, no hands, no visible labels.`;
}

function buildFeaturedPrompt(venue, brand, item) {
  return `Realistic plated food photography for ${item.name}. Venue: ${venue.name}. Cuisine: ${venue.cuisine}. Tone: ${venue.tone}. Use a clean composition, consistent camera angle, ${brand.imageStyle}, no text, no hands, signage-friendly framing.`;
}

function buildCategoryPrompt(venue, brand, categoryName, dishName) {
  return `Supporting food image for the ${categoryName} category at ${venue.name}. Representative dish: ${dishName}. Keep style consistent with the hero image, use ${brand.imageStyle}, high contrast, simplified composition, no text.`;
}

function getFeaturedItems(menu) {
  return (menu.categories ?? []).flatMap((category) =>
    (category.items ?? []).filter((item) => item.featured === true),
  );
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      continue;
    }
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith('--')) {
      parsed[key] = true;
      continue;
    }
    parsed[key] = next;
    index += 1;
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node generate-image-prompt-pack.mjs --venue <venue.json> --brand <brand.json> --menu <menu.json> [options]

Options:
  --output <file>  Output markdown file path
  --help           Show this help text
`);
}
