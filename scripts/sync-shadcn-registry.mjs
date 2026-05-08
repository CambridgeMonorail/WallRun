import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const registryDir = path.join(repoRoot, 'apps', 'client', 'public', 'registry');
const registryIndexPath = path.join(registryDir, 'registry.json');

const REGISTRY_ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';
const REGISTRY_ITEM_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const REGISTRY_ALL_ITEM_NAME = 'all';
const REGISTRY_ALL_ITEM_TYPE = 'registry:block';

const readRegistryIndex = async () => {
  const fileContents = await readFile(registryIndexPath, 'utf8');
  return JSON.parse(fileContents);
};

const getValidatedRegistryItemName = (item, options = {}) => {
  const itemName = item?.name;
  const { allowReservedAll = false } = options;

  if (typeof itemName !== 'string' || itemName.length === 0) {
    throw new Error('Registry item name must be a non-empty string.');
  }

  if (itemName === 'registry') {
    throw new Error(`Registry item name "${itemName}" is reserved.`);
  }

  if (itemName === REGISTRY_ALL_ITEM_NAME && !allowReservedAll) {
    throw new Error(`Registry item name "${itemName}" is reserved.`);
  }

  if (!REGISTRY_ITEM_NAME_PATTERN.test(itemName)) {
    throw new Error(
      `Registry item name "${itemName}" must be kebab-case and contain only lowercase letters, numbers, and hyphens.`,
    );
  }

  return itemName;
};

const createRegistryAllItem = (items) => ({
  name: REGISTRY_ALL_ITEM_NAME,
  type: REGISTRY_ALL_ITEM_TYPE,
  title: 'WallRun All Components',
  description:
    'Meta item that installs every published WallRun signage registry component in one command.',
  dependencies: [],
  registryDependencies: items.map((item) => getValidatedRegistryItemName(item)),
  files: [],
});

const writeRegistryItem = async (item) => {
  const itemName = getValidatedRegistryItemName(item, {
    allowReservedAll: item?.name === REGISTRY_ALL_ITEM_NAME,
  });
  const outputPath = path.join(registryDir, `${itemName}.json`);
  const payload = {
    $schema: REGISTRY_ITEM_SCHEMA,
    ...item,
  };

  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
};

const syncRegistryItems = async () => {
  await mkdir(registryDir, { recursive: true });

  const registry = await readRegistryIndex();
  const items = Array.isArray(registry.items) ? registry.items : [];
  const publishedItemNames = new Set(
    items.map((item) => getValidatedRegistryItemName(item)),
  );
  const allItem = createRegistryAllItem(items);
  publishedItemNames.add(REGISTRY_ALL_ITEM_NAME);

  await Promise.all(items.map((item) => writeRegistryItem(item)));
  await writeRegistryItem(allItem);
  const directoryEntries = await readdir(registryDir);

  const staleArtifacts = directoryEntries
    .filter((entry) => entry.endsWith('.json'))
    .filter((entry) => entry !== 'registry.json')
    .filter((entry) => !publishedItemNames.has(entry.replace(/\.json$/u, '')));

  await Promise.all(
    staleArtifacts.map((entry) =>
      rm(path.join(registryDir, entry), { force: true }),
    ),
  );

  console.log(`Synced ${items.length + 1} shadcn registry item files.`);
};

await syncRegistryItems();
