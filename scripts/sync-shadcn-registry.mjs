import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const registryDir = path.join(repoRoot, 'apps', 'client', 'public', 'registry');
const registryIndexPath = path.join(registryDir, 'registry.json');

const REGISTRY_ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';

const readRegistryIndex = async () => {
  const fileContents = await readFile(registryIndexPath, 'utf8');
  return JSON.parse(fileContents);
};

const writeRegistryItem = async (item) => {
  const outputPath = path.join(registryDir, `${item.name}.json`);
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

  await Promise.all(items.map((item) => writeRegistryItem(item)));

  const publishedItemNames = new Set(items.map((item) => item.name));
  const directoryEntries = await readdir(registryDir);

  const staleArtifacts = directoryEntries
    .filter((entry) => entry.endsWith('.json'))
    .filter((entry) => entry !== 'registry.json')
    .filter((entry) => !publishedItemNames.has(entry.replace(/\.json$/u, '')));

  await Promise.all(
    staleArtifacts.map((entry) => rm(path.join(registryDir, entry), { force: true })),
  );

  console.log(`Synced ${items.length} shadcn registry item files.`);
};

await syncRegistryItems();