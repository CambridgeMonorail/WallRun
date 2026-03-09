import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const sourceDir = resolve(repoRoot, 'skills');
const destinationDir = resolve(repoRoot, '.github', 'skills');
const isCheckMode = process.argv.includes('--check');

if (!existsSync(sourceDir)) {
  throw new Error(`Source skills directory not found: ${sourceDir}`);
}

function getSkillDirectories(baseDir) {
  return readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function listFiles(baseDir, relativeDir = '') {
  const currentDir = resolve(baseDir, relativeDir);

  return readdirSync(currentDir, { withFileTypes: true })
    .flatMap((entry) => {
      const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        return listFiles(baseDir, relativePath);
      }

      return [relativePath];
    })
    .sort();
}

function syncMirror() {
  rmSync(destinationDir, { force: true, recursive: true });
  mkdirSync(destinationDir, { recursive: true });

  for (const skillDir of getSkillDirectories(sourceDir)) {
    cpSync(resolve(sourceDir, skillDir), resolve(destinationDir, skillDir), {
      recursive: true,
    });
  }
}

function checkMirror() {
  if (!existsSync(destinationDir)) {
    console.error(`Missing generated skills directory: ${destinationDir}`);
    return false;
  }

  const sourceSkillDirs = getSkillDirectories(sourceDir);
  const destinationSkillDirs = getSkillDirectories(destinationDir);

  if (JSON.stringify(sourceSkillDirs) !== JSON.stringify(destinationSkillDirs)) {
    console.error('Skill directory names differ between skills/ and .github/skills/.');
    return false;
  }

  for (const skillDir of sourceSkillDirs) {
    const sourceFiles = listFiles(resolve(sourceDir, skillDir));
    const destinationFiles = listFiles(resolve(destinationDir, skillDir));

    if (JSON.stringify(sourceFiles) !== JSON.stringify(destinationFiles)) {
      console.error(`File lists differ for skill: ${skillDir}`);
      return false;
    }

    for (const relativeFile of sourceFiles) {
      const sourceContent = readFileSync(resolve(sourceDir, skillDir, relativeFile));
      const destinationContent = readFileSync(
        resolve(destinationDir, skillDir, relativeFile)
      );

      if (!sourceContent.equals(destinationContent)) {
        console.error(`File contents differ for ${skillDir}/${relativeFile}`);
        return false;
      }
    }
  }

  return true;
}

if (isCheckMode) {
  if (!checkMirror()) {
    console.error('Skill mirror is out of sync. Run `pnpm sync:skills` and commit the result.');
    process.exit(1);
  }

  console.log(`Skills mirror is in sync: ${destinationDir}`);
} else {
  syncMirror();
  console.log(`Synced skills from ${sourceDir} to ${destinationDir}`);
}