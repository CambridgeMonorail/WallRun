import { describe, expect, it } from 'vitest';
import { CONFIG, getOutputDir, getWorkspaceRoot } from '../config.js';

describe('CONFIG', () => {
  it('should have required properties', () => {
    expect(CONFIG).toHaveProperty('workspaceName');
    expect(CONFIG).toHaveProperty('outputDir');
    expect(CONFIG).toHaveProperty('excludeDirs');
    expect(CONFIG).toHaveProperty('excludePatterns');
    expect(CONFIG).toHaveProperty('minDuplicationLines');
    expect(CONFIG).toHaveProperty('minDuplicationTokens');
    expect(CONFIG).toHaveProperty('safeCleanupThreshold');
    expect(CONFIG).toHaveProperty('likelyCleanupThreshold');
  });

  it('should have reasonable defaults', () => {
    expect(CONFIG.minDuplicationLines).toBeGreaterThan(0);
    expect(CONFIG.minDuplicationTokens).toBeGreaterThan(0);
    expect(CONFIG.safeCleanupThreshold).toBeGreaterThan(CONFIG.likelyCleanupThreshold);
  });

  it('should exclude common directories', () => {
    expect(CONFIG.excludeDirs).toContain('node_modules');
    expect(CONFIG.excludeDirs).toContain('dist');
    expect(CONFIG.excludeDirs).toContain('coverage');
  });
});

describe('getWorkspaceRoot', () => {
  it('should return a string', () => {
    const root = getWorkspaceRoot();
    expect(typeof root).toBe('string');
    expect(root.length).toBeGreaterThan(0);
  });
});

describe('getOutputDir', () => {
  it('should return path with reports/code-health', () => {
    const outputDir = getOutputDir('/workspace');
    expect(outputDir).toContain('reports');
    expect(outputDir).toContain('code-health');
  });
});
