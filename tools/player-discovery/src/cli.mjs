/**
 * CLI interface for player discovery
 */

import readline from 'readline';

/**
 * Simple prompt using readline
 * @param {string} question 
 * @param {string} defaultValue 
 * @returns {Promise<string>}
 */
export async function prompt(question, defaultValue = '') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  return new Promise((resolve) => {
    const displayDefault = defaultValue ? ` (${defaultValue})` : '';
    rl.question(`${question}${displayDefault}: `, (answer) => {
      rl.close();
      resolve(answer || defaultValue);
    });
  });
}

/**
 * Display progress spinner
 */
export class ProgressSpinner {
  constructor(message = 'Working') {
    this.message = message;
    this.frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    this.frameIndex = 0;
    this.interval = null;
    this.lastLine = '';
  }
  
  start() {
    this.interval = setInterval(() => {
      const frame = this.frames[this.frameIndex];
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
      
      // Clear previous line and write new one
      if (this.lastLine) {
        process.stdout.write('\r' + ' '.repeat(this.lastLine.length) + '\r');
      }
      
      this.lastLine = `${frame} ${this.message}`;
      process.stdout.write(this.lastLine);
    }, 80);
  }
  
  update(message) {
    this.message = message;
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      if (this.lastLine) {
        process.stdout.write('\r' + ' '.repeat(this.lastLine.length) + '\r');
      }
    }
  }
  
  succeed(message) {
    this.stop();
    console.log(`✔ ${message}`);
  }
  
  fail(message) {
    this.stop();
    console.log(`✖ ${message}`);
  }
}

/**
 * Format discovered players as a table
 * @param {Array} players 
 */
export function formatPlayersTable(players) {
  if (players.length === 0) {
    return 'No players discovered.';
  }
  
  const rows = [
    ['IP', 'Port', 'Evidence'],
    ['---', '---', '---'],
    ...players.map(p => [
      p.ip,
      p.port.toString(),
      p.evidence || 'unknown',
    ]),
  ];
  
  // Calculate column widths
  const widths = rows[0].map((_, colIdx) =>
    Math.max(...rows.map(row => row[colIdx].length))
  );
  
  // Format rows
  return rows
    .map(row =>
      row.map((cell, idx) => cell.padEnd(widths[idx])).join('  ')
    )
    .join('\n');
}

/**
 * Format player info for detailed probe
 * @param {object} player 
 */
export function formatPlayerInfo(player) {
  if (!player) {
    return 'No player information available.';
  }
  
  const lines = [
    `IP: ${player.ip}:${player.port}`,
    `Endpoint: ${player.endpoint}`,
    `Probed: ${player.probedAt}`,
    '',
  ];
  
  if (player.info) {
    lines.push('Device Info:');
    for (const [key, value] of Object.entries(player.info)) {
      lines.push(`  ${key}: ${JSON.stringify(value)}`);
    }
  }
  
  return lines.join('\n');
}
