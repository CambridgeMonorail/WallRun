#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';

const args = parseArgs(process.argv.slice(2));

if (args.help || !args.file) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

const filePath = path.resolve(process.cwd(), args.file);
const portraitLimit = Number(args['portrait-limit'] ?? 8);
const landscapeLimit = Number(args['landscape-limit'] ?? 12);
const maxNameLength = Number(args['max-name-length'] ?? 24);
const maxDescriptionLength = Number(args['max-description-length'] ?? 60);
const maxOfferLabelLength = Number(args['max-offer-label-length'] ?? 48);
const maxQrLabelLength = Number(args['max-qr-label-length'] ?? 40);
const maxLegalNotes = Number(args['max-legal-notes'] ?? 2);
const maxFeaturedItems = Number(args['max-featured-items'] ?? 3);
const maxCategories = Number(args['max-categories'] ?? 4);
const maxUnavailableItems = Number(args['max-unavailable-items'] ?? 2);

const raw = await readFile(filePath, 'utf8');
const menu = JSON.parse(raw);
const issues = [];

if ((menu.offerLabel ?? '').length > maxOfferLabelLength) {
  issues.push(`Offer label too long: ${menu.offerLabel.length} chars.`);
}

if ((menu.contact?.qrLabel ?? '').length > maxQrLabelLength) {
  issues.push(`QR label too long: ${menu.contact.qrLabel.length} chars.`);
}

if ((menu.legalNotes ?? []).length > maxLegalNotes) {
  issues.push(`Too many legal or service notes: ${menu.legalNotes.length}.`);
}

const featuredCount = (menu.categories ?? [])
  .flatMap((category) => category.items ?? [])
  .filter((item) => item.featured === true).length;
if (featuredCount > maxFeaturedItems) {
  issues.push(`Too many featured items for one board set: ${featuredCount}.`);
}

const allItems = (menu.categories ?? []).flatMap(
  (category) => category.items ?? [],
);
const unavailableItems = allItems.filter((item) => item.available === false);
if (unavailableItems.length > maxUnavailableItems) {
  issues.push(
    `Too many unavailable items in the active menu: ${unavailableItems.length}.`,
  );
}

const unavailableFeaturedItems = unavailableItems.filter(
  (item) => item.featured === true,
);
for (const item of unavailableFeaturedItems) {
  issues.push(`Featured item unavailable: "${item.name}".`);
}

const featuredItemsMissingImages = allItems.filter(
  (item) =>
    item.featured === true &&
    (!item.imageSrc || String(item.imageSrc).trim() === ''),
);
for (const item of featuredItemsMissingImages) {
  issues.push(`Featured item missing imageSrc: "${item.name}".`);
}

const incompleteFallbackReasons = getIncompleteFallbackReasons(
  menu.fallbackContent,
);
for (const reason of incompleteFallbackReasons) {
  issues.push(reason);
}

const fallbackImageReasons = getFallbackImageReasons(menu.fallbackContent);
for (const reason of fallbackImageReasons) {
  issues.push(reason);
}

if (
  featuredItemsMissingImages.length > 0 &&
  !hasAnyValidFallbackImage(menu.fallbackContent)
) {
  issues.push(
    'No usable fallback image configured for featured items with missing imageSrc.',
  );
}

if (!Array.isArray(menu.categories) || menu.categories.length === 0) {
  issues.push('No categories found.');
}

if ((menu.categories ?? []).length > maxCategories) {
  issues.push(`Too many categories for one board: ${menu.categories.length}.`);
}

const categorySimilarityGroups = groupSimilarCategories(menu.categories ?? []);
for (const group of categorySimilarityGroups) {
  if (group.length >= 3) {
    issues.push(`Too many similar category titles: ${group.join(', ')}.`);
  }
}

for (const category of menu.categories ?? []) {
  const count = Array.isArray(category.items) ? category.items.length : 0;
  if (count > landscapeLimit) {
    issues.push(
      `Category "${category.title}" exceeds landscape capacity with ${count} items.`,
    );
  }
  if (count > portraitLimit) {
    issues.push(
      `Category "${category.title}" exceeds portrait capacity with ${count} items.`,
    );
  }

  for (const item of category.items ?? []) {
    if ((item.name ?? '').length > maxNameLength) {
      issues.push(
        `Item name too long: "${item.name}" (${item.name.length} chars).`,
      );
    }
    if ((item.description ?? '').length > maxDescriptionLength) {
      issues.push(
        `Description too long for "${item.name}": ${item.description.length} chars.`,
      );
    }
    if (!isConsistentPrice(item.price)) {
      issues.push(
        `Inconsistent price format for "${item.name}": ${item.price}`,
      );
    }
  }
}

console.log(`Stress test report for ${filePath}`);

if (issues.length === 0) {
  console.log('No content-risk issues found.');
  process.exit(0);
}

for (const issue of issues) {
  console.log(`- ${issue}`);
}

if (args['fail-on-issues']) {
  process.exit(1);
}

function isConsistentPrice(value) {
  return typeof value === 'string' && /^£\d+(\.\d{2})?$/.test(value.trim());
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
  console.log(`Usage: node stress-test-menu-content.mjs --file <menu.json> [options]

Options:
  --portrait-limit <n>         Maximum items per category for portrait
  --landscape-limit <n>        Maximum items per category for landscape
  --max-name-length <n>        Maximum recommended item-name length
  --max-description-length <n> Maximum recommended description length
  --max-offer-label-length <n> Maximum recommended offer-label length
  --max-qr-label-length <n>    Maximum recommended QR-label length
  --max-legal-notes <n>        Maximum recommended count of legal or service notes
  --max-featured-items <n>     Maximum recommended number of featured items
  --max-categories <n>         Maximum recommended category count for one board
  --max-unavailable-items <n>  Maximum recommended count of unavailable items in an active menu
  --fail-on-issues             Exit with code 1 when issues are found
  --help                       Show this help text
`);
}

function getIncompleteFallbackReasons(fallbackContent) {
  if (!fallbackContent) {
    return [];
  }

  const reasons = [];

  if (
    !fallbackContent.offerLabel ||
    String(fallbackContent.offerLabel).trim() === ''
  ) {
    reasons.push('Fallback content missing offerLabel.');
  }

  if (
    !Array.isArray(fallbackContent.categories) ||
    fallbackContent.categories.length === 0
  ) {
    reasons.push('Fallback content missing categories.');
  }

  if (
    !Array.isArray(fallbackContent.legalNotes) ||
    fallbackContent.legalNotes.length === 0
  ) {
    reasons.push('Fallback content missing legalNotes.');
  }

  return reasons;
}

function getFallbackImageReasons(fallbackContent) {
  if (!fallbackContent || typeof fallbackContent !== 'object') {
    return [];
  }

  const reasons = [];
  const directFields = [
    'heroImageSrc',
    'featuredImageSrc',
    'backgroundImageSrc',
  ];

  for (const field of directFields) {
    if (field in fallbackContent && !isNonEmptyString(fallbackContent[field])) {
      reasons.push(`Fallback content has empty ${field}.`);
    }
  }

  if (fallbackContent.images && typeof fallbackContent.images === 'object') {
    for (const [key, value] of Object.entries(fallbackContent.images)) {
      if (!isNonEmptyString(value)) {
        reasons.push(`Fallback content has empty images.${key}.`);
      }
    }
  }

  return reasons;
}

function hasAnyValidFallbackImage(fallbackContent) {
  if (!fallbackContent || typeof fallbackContent !== 'object') {
    return false;
  }

  const directFields = [
    'heroImageSrc',
    'featuredImageSrc',
    'backgroundImageSrc',
  ];
  for (const field of directFields) {
    if (isNonEmptyString(fallbackContent[field])) {
      return true;
    }
  }

  if (fallbackContent.images && typeof fallbackContent.images === 'object') {
    for (const value of Object.values(fallbackContent.images)) {
      if (isNonEmptyString(value)) {
        return true;
      }
    }
  }

  return false;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function groupSimilarCategories(categories) {
  const groups = new Map();

  for (const category of categories) {
    const title = String(category.title ?? '').trim();
    const key = similarityKey(title);
    if (!key) {
      continue;
    }
    const current = groups.get(key) ?? [];
    current.push(title);
    groups.set(key, current);
  }

  return Array.from(groups.values()).filter((group) => group.length > 1);
}

function similarityKey(title) {
  const tokens = title
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(
      (token) =>
        !['and', 'the', 'house', 'seasonal', 'daily', 'specials'].includes(
          token,
        ),
    );

  if (tokens.length === 0) {
    return '';
  }

  return tokens[tokens.length - 1];
}
