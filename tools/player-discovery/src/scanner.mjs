/**
 * BrightSign Player Network Scanner
 * 
 * Scans local network for BrightSign players using HTTP probing.
 * Best effort discovery - limited by network topology and firewall rules.
 */

import http from 'http';
import https from 'https';

/**
 * Parse CIDR notation to get all IPs in subnet
 * @param {string} cidr - e.g., "192.168.0.0/24"
 * @returns {string[]} Array of IP addresses
 */
export function parseCIDR(cidr) {
  const [baseIP, bits] = cidr.split('/');
  const maskBits = parseInt(bits, 10);
  
  if (maskBits < 24 || maskBits > 32) {
    throw new Error('Only /24 to /32 subnets supported for safety');
  }
  
  const octets = baseIP.split('.').map(Number);
  const hostBits = 32 - maskBits;
  const numHosts = Math.pow(2, hostBits);
  
  const ips = [];
  const baseValue = (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3];
  
  for (let i = 0; i < numHosts; i++) {
    const ipValue = baseValue + i;
    const ip = [
      (ipValue >> 24) & 0xFF,
      (ipValue >> 16) & 0xFF,
      (ipValue >> 8) & 0xFF,
      ipValue & 0xFF
    ].join('.');
    ips.push(ip);
  }
  
  return ips;
}

/**
 * Probe a single IP:port for BrightSign evidence
 * @param {string} ip 
 * @param {number} port 
 * @param {number} timeout 
 * @returns {Promise<{success: boolean, evidence?: string, headers?: object, body?: string}>}
 */
export async function probeHost(ip, port, timeout = 2000) {
  const protocol = port === 443 ? https : http;
  const pathsToTry = port === 443 ? ['/'] : ['/api/v1/info', '/'];

  for (const requestPath of pathsToTry) {
    const result = await new Promise((resolve) => {
      let resolved = false;
      const finish = (payload) => {
        if (resolved) return;
        resolved = true;
        resolve(payload);
      };

      const req = protocol.get(
        {
          hostname: ip,
          port,
          path: requestPath,
          timeout,
          headers: { 'User-Agent': 'TheSignAge-Discovery/1.0' },
          rejectUnauthorized: false,
        },
        (res) => {
          let body = '';

          res.on('data', (chunk) => {
            body += chunk.toString();
            if (body.length > 8000) {
              const evidence = detectBrightSign(res.headers, body);
              if (evidence) {
                finish({
                  success: true,
                  evidence,
                  headers: res.headers,
                  body: body.substring(0, 500),
                });
              } else {
                finish({ success: false });
              }
              res.destroy();
            }
          });

          res.on('end', () => {
            const evidence = detectBrightSign(res.headers, body);
            if (evidence) {
              finish({
                success: true,
                evidence,
                headers: res.headers,
                body: body.substring(0, 500),
              });
            } else {
              finish({ success: false });
            }
          });

          res.on('aborted', () => finish({ success: false }));
          res.on('close', () => finish({ success: false }));
        }
      );

      req.on('error', () => finish({ success: false }));
      req.on('timeout', () => {
        req.destroy();
        finish({ success: false });
      });
    });

    if (result?.success) {
      return result;
    }
  }

  return { success: false };
}

/**
 * Detect if response looks like BrightSign DWS
 * @param {object} headers 
 * @param {string} body 
 * @returns {string|null} Evidence string or null
 */
function detectBrightSign(headers, body) {
  const bodyLower = body.toLowerCase();
  const serverHeader = (headers.server || '').toLowerCase();
  
  // Check server header
  if (serverHeader.includes('brightsign')) {
    return `header:server=${headers.server}`;
  }
  
  // Check body for diagnostic web server
  if (bodyLower.includes('diagnostic web server')) {
    return 'body:diagnostic web server';
  }
  
  if (bodyLower.includes('brightsign')) {
    return 'body:brightsign';
  }
  
  // Check for common DWS paths
  if (bodyLower.includes('/api/v1/') || bodyLower.includes('/getdeviceinfo')) {
    return 'body:api endpoints';
  }

  // DWS JSON markers (common in /api/v1/info)
  if (bodyLower.includes('"isplayer":true') || (bodyLower.includes('"fwversion"') && bodyLower.includes('"serial"'))) {
    return 'body:dws api info';
  }
  
  return null;
}

/**
 * Scan subnet for BrightSign players
 * @param {object} options
 * @param {string} options.cidr - CIDR notation subnet
 * @param {number[]} options.ports - Ports to probe
 * @param {number} options.timeout - Probe timeout in ms
 * @param {number} options.parallel - Number of parallel scans
 * @param {((progress: { total: number, completed: number, found: number }) => void) | undefined} options.onProgress - Progress callback
 * @returns {Promise<Array>} Discovered players
 */
export async function scanSubnet({
  cidr,
  ports = [80, 8080],
  timeout = 2000,
  parallel = 10,
  onProgress,
}) {
  const ips = parseCIDR(cidr);
  const discovered = [];
  
  // Create all probe tasks
  const tasks = [];
  for (const ip of ips) {
    for (const port of ports) {
      tasks.push({ ip, port });
    }
  }
  
  // Process in parallel batches
  for (let i = 0; i < tasks.length; i += parallel) {
    const batch = tasks.slice(i, i + parallel);
    const results = await Promise.all(
      batch.map(({ ip, port }) => probeHost(ip, port, timeout))
    );
    
    results.forEach((result, idx) => {
      const { ip, port } = batch[idx];
      if (result.success) {
        discovered.push({
          ip,
          port,
          evidence: result.evidence,
          discoveredAt: new Date().toISOString(),
        });
      }
    });
    
    if (onProgress) {
      onProgress({
        total: tasks.length,
        completed: Math.min(i + parallel, tasks.length),
        found: discovered.length,
      });
    }
  }
  
  return discovered;
}

/**
 * Probe a single player and get detailed info
 * @param {string} ip 
 * @param {number} port 
 * @returns {Promise<object|null>}
 */
export async function probePlayer(ip, port = 8008) {
  // Try to get device info from DWS API
  const endpoints = [
    '/api/v1/info',
    '/GetDeviceInfo',
    '/info',
  ];
  
  for (const endpoint of endpoints) {
    try {
      const result = await new Promise((resolve) => {
        const req = http.get(
          {
            hostname: ip,
            port,
            path: endpoint,
            timeout: 3000,
          },
          (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
              try {
                const data = JSON.parse(body);
                resolve({ success: true, endpoint, data });
              } catch {
                resolve({ success: false });
              }
            });
          }
        );
        
        req.on('error', () => resolve({ success: false }));
        req.on('timeout', () => {
          req.destroy();
          resolve({ success: false });
        });
      });
      
      if (result.success) {
        return {
          ip,
          port,
          endpoint: result.endpoint,
          info: result.data,
          probedAt: new Date().toISOString(),
        };
      }
    } catch {
      continue;
    }
  }
  
  return null;
}
