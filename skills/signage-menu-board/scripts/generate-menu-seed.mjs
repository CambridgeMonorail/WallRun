#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

const outputDir = path.resolve(
  process.cwd(),
  args['output-dir'] ?? './menu-board-seed-output',
);
const venueName = args.name ?? 'Harbour Grain';
const slug = slugify(args.slug ?? venueName);
const modes = (args.modes ?? 'breakfast,lunch,dinner')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const venueProfile = {
  name: venueName,
  concept:
    args.concept ??
    'Coastal bakery and espresso bar with hot breakfast and simple takeaway lunch.',
  cuisine: args.cuisine ?? 'Bakery cafe',
  serviceModel: args['service-model'] ?? 'counter-service',
  tone: args.tone ?? 'premium',
  priceRange: args['price-range'] ?? '££',
  audience:
    args.audience ??
    'Commuters, casual lunch visitors, and local weekend footfall.',
  locationContext: args.location ?? 'Busy neighbourhood high street.',
  brandStory:
    args['brand-story'] ??
    'Calm, premium fast-service venue with readable, signage-friendly offers.',
};

const brandProfile = {
  logoText: venueName,
  logoDirection:
    args['logo-direction'] ??
    'Compact wordmark with strong spacing and restrained character.',
  colours: {
    background: '#243746',
    foreground: '#F5EBDD',
    accent: '#7FB7A3',
  },
  typography: {
    heading: 'Condensed editorial serif',
    body: 'Neutral grotesk sans',
    price: 'Neutral grotesk sans with tabular numerals',
  },
  iconStyle: 'outlined',
  imageStyle:
    'Studio-lit plated food photography with clean backgrounds and minimal props.',
  surfaceStyle:
    'Matte dark surface with subtle texture away from critical text.',
};

await mkdir(outputDir, { recursive: true });
await writeJson(
  path.join(outputDir, 'venue-profile.example.json'),
  venueProfile,
);
await writeJson(
  path.join(outputDir, 'brand-profile.example.json'),
  brandProfile,
);

for (const mode of modes) {
  const menu = createMenuForMode(mode, venueName);
  await writeJson(
    path.join(outputDir, `menu-${slug}-${mode}.example.json`),
    menu,
  );
}

console.log(`Generated menu-board seed pack in ${outputDir}`);

function createMenuForMode(mode, brandName) {
  const commonContact = {
    hours: 'Mon-Sat 07:00-16:00',
    qrLabel: 'Scan For Full Menu',
  };

  const templates = {
    breakfast: {
      offerLabel: 'Breakfast Until 11:30',
      categories: [
        createCategory('breakfast-baps', 'Breakfast Baps', [
          createItem(
            'smoked-bacon-bap',
            'Smoked Bacon Bap',
            '£5.80',
            ['Popular'],
            true,
          ),
          createItem('sausage-egg-bap', 'Sausage & Egg Bap', '£6.40', [], true),
          createItem(
            'greens-breakfast-roll',
            'Greens Breakfast Roll',
            '£5.60',
            ['V'],
          ),
        ]),
        createCategory('morning-sides', 'Morning Sides', [
          createItem('rosemary-hash-browns', 'Rosemary Hash Browns', '£2.80'),
          createItem('seasonal-fruit-pot', 'Seasonal Fruit Pot', '£3.20', [
            'VG',
            'GF',
          ]),
        ]),
      ],
      legalNotes: ['Ask staff about allergens.'],
    },
    lunch: {
      offerLabel: 'Lunch From 11:30',
      categories: [
        createCategory('sandwiches', 'Sandwiches', [
          createItem('brown-crab-roll', 'Brown Crab Roll', '£8.90', [], true),
          createItem('chicken-focaccia', 'Chicken Focaccia', '£7.80'),
          createItem('mozzarella-tomato', 'Mozzarella & Tomato', '£7.20', [
            'V',
          ]),
        ]),
        createCategory('soups-salads', 'Soups & Salads', [
          createItem('roasted-tomato-soup', 'Roasted Tomato Soup', '£5.40', [
            'V',
          ]),
          createItem('sea-herb-grain-bowl', 'Sea Herb Grain Bowl', '£8.20', [
            'VG',
          ]),
        ]),
      ],
      legalNotes: ['Limited availability after 14:00.'],
    },
    dinner: {
      offerLabel: 'Evening Specials',
      categories: [
        createCategory('flatbreads', 'Flatbreads', [
          createItem(
            'smoked-mackerel-flatbread',
            'Smoked Mackerel Flatbread',
            '£11.80',
            [],
            true,
          ),
          createItem(
            'charred-pepper-flatbread',
            'Charred Pepper Flatbread',
            '£10.90',
            ['V'],
          ),
        ]),
        createCategory('small-plates', 'Small Plates', [
          createItem('brown-butter-carrots', 'Brown Butter Carrots', '£5.80', [
            'V',
            'GF',
          ]),
          createItem(
            'crispy-sea-salt-potatoes',
            'Crispy Sea Salt Potatoes',
            '£5.20',
            ['VG', 'GF'],
          ),
        ]),
      ],
      legalNotes: [
        'Evening specials subject to availability.',
        'Ask staff about allergens.',
      ],
    },
  };

  const selected = templates[mode] ?? templates.lunch;

  return {
    brandName,
    mode,
    offerLabel: selected.offerLabel,
    categories: selected.categories,
    contact: commonContact,
    legalNotes: selected.legalNotes,
  };
}

function createCategory(id, title, items) {
  return { id, title, items };
}

function createItem(id, name, price, tags = [], featured = false) {
  return {
    id,
    name,
    price,
    ...(tags.length > 0 ? { tags } : {}),
    ...(featured ? { featured: true } : {}),
  };
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

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function printHelp() {
  console.log(`Usage: node generate-menu-seed.mjs [options]

Options:
  --output-dir <dir>      Output directory for generated files
  --name <venue>          Venue name
  --slug <slug>           Slug used in generated menu file names
  --concept <text>        Venue concept
  --cuisine <text>        Cuisine type
  --service-model <text>  Service model
  --tone <text>           Brand tone
  --price-range <text>    Price range, for example ££
  --modes <list>          Comma-separated modes, for example breakfast,lunch,dinner
  --help                  Show this help text
`);
}
