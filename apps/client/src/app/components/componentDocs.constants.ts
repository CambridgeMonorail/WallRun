export const PUBLIC_REGISTRY_URL =
  'https://wallrun.dev/registry/registry.json';

export const PUBLIC_REGISTRY_BASE_URL = 'https://wallrun.dev/registry';

export const LEGACY_REGISTRY_URL =
  'https://cambridgemonorail.github.io/WallRun/registry/registry.json';

export const getPublicRegistryItemUrl = (name: string) =>
  `${PUBLIC_REGISTRY_BASE_URL}/${name}.json`;