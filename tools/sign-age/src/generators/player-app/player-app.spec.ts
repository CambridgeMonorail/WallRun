import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readJson, Tree } from '@nx/devkit';

import { playerAppGenerator } from './player-app';
import { PlayerAppGeneratorSchema } from './schema';

describe('player-app generator', () => {
  let tree: Tree;
  const options: PlayerAppGeneratorSchema = {
    name: 'player-test-screen',
    displayOrientation: 'landscape',
    noStatusPage: true,
    tags: 'scope:signage,type:app',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await playerAppGenerator(tree, options);

    expect(tree.exists('apps/player-test-screen/project.json')).toBe(true);
    expect(tree.exists('apps/player-test-screen/README.md')).toBe(true);
    expect(tree.exists('apps/player-test-screen/src/app/StatusPage.tsx')).toBe(
      false,
    );

    const projectConfig = readJson(tree, 'apps/player-test-screen/project.json');
    expect(projectConfig.name).toBe('player-test-screen');
    expect(projectConfig.tags).toEqual(['scope:signage', 'type:app']);

    const configSource = tree.read(
      'apps/player-test-screen/src/config.ts',
      'utf8',
    );
    expect(configSource).toContain("displayOrientation: 'landscape'");

    const viteConfig = tree.read(
      'apps/player-test-screen/vite.config.mts',
      'utf8',
    );
    expect(viteConfig).toContain('port: 4201');
  });

  it('should reuse the same auto-selected port when regenerating with force', async () => {
    await playerAppGenerator(tree, {
      name: 'player-test-screen',
    });

    await playerAppGenerator(tree, {
      name: 'player-test-screen',
      force: true,
    });

    const viteConfig = tree.read(
      'apps/player-test-screen/vite.config.mts',
      'utf8',
    );
    expect(viteConfig).toContain('port: 4201');
  });
});
