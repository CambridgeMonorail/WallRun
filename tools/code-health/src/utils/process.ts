import { execSync, type ExecSyncOptions } from 'node:child_process';

export interface RunResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode: number;
}

/**
 * Run a command and capture output
 */
export function runCommand(
  command: string,
  options: ExecSyncOptions = {},
): RunResult {
  try {
    const stdout = execSync(command, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      maxBuffer: 50 * 1024 * 1024, // 50MB buffer for large outputs
      ...options,
    });
    return {
      success: true,
      stdout: stdout.toString(),
      stderr: '',
      exitCode: 0,
    };
  } catch (error: unknown) {
    const execError = error as {
      stdout?: Buffer | string;
      stderr?: Buffer | string;
      status?: number;
    };
    return {
      success: false,
      stdout: execError.stdout?.toString() ?? '',
      stderr: execError.stderr?.toString() ?? '',
      exitCode: execError.status ?? 1,
    };
  }
}

/**
 * Get the version of an installed package
 */
export function getPackageVersion(packageName: string): string {
  try {
    const result = runCommand(`pnpm exec ${packageName} --version`);
    if (result.success) {
      return result.stdout.trim();
    }
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Log a message to console with prefix
 */
export function log(
  message: string,
  type: 'info' | 'warn' | 'error' = 'info',
): void {
  const prefix = {
    info: '\x1b[36m[code-health]\x1b[0m',
    warn: '\x1b[33m[code-health]\x1b[0m',
    error: '\x1b[31m[code-health]\x1b[0m',
  };
  console.log(`${prefix[type]} ${message}`);
}
