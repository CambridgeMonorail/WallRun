/** Script copy — every word must earn its place */

export const SCRIPT = {
  hook: {
    line: 'Your boss wants content on the lobby screen.',
  },
  frustration: {
    items: [
      { icon: '📋', label: 'Template editors' },
      { icon: '🖱️', label: 'Drag-and-drop CMS' },
      { icon: '🔒', label: 'Vendor lock-in' },
    ],
    punchline: "You're a developer.\nThis shouldn't be this hard.",
  },
  reframe: {
    pre: 'What if signage was just...',
    headline: 'a React app?',
    sub: 'Clone. Install. Deploy. Normal tools. Unusual constraints.',
  },
  showcase: {
    screens: [
      { label: 'Restaurant Menu', icon: '🍔', color: '#f59e0b' },
      { label: 'KPI Dashboard', icon: '📈', color: '#3b82f6' },
      { label: 'Office Directory', icon: '🏢', color: '#10b981' },
      { label: 'Event Schedule', icon: '📅', color: '#8b5cf6' },
    ],
    terminal: [
      { prompt: true, text: 'pnpm deploy:player' },
      { prompt: false, text: '✓ Built player-minimal (2.1s)' },
      { prompt: false, text: '✓ Deployed to BrightSign @ 192.168.1.50' },
    ],
  },
  toolkit: {
    headline: "What's inside",
    items: [
      { label: 'Signage component library', detail: 'shadcn/ui — but for walls', color: '#f59e0b' },
      { label: 'Distance-readable typography', detail: '10-foot rule, enforced', color: '#3b82f6' },
      { label: 'One-command BrightSign deploy', detail: 'pnpm deploy:player', color: '#10b981' },
      { label: 'Copilot agents for signage', detail: 'AI that knows the constraints', color: '#8b5cf6' },
      { label: 'Offline-first, 24/7 ready', detail: 'State machines. Crash recovery.', color: '#ef4444' },
    ],
  },
  constraints: {
    headline: 'Built for the real world',
    cards: [
      { stat: '3–10m', label: 'Viewing distance', detail: 'Readable from across the room' },
      { stat: '24/7', label: 'Always on', detail: 'Survives reboots, outages, crashes' },
      { stat: '1080p+', label: 'Fixed resolution', detail: 'No responsive guessing' },
      { stat: '< 2s', label: 'Glance time', detail: 'Understand and move on' },
    ],
  },
  close: {
    headline: 'Signage is software.\nBuild it like software.',
    url: 'github.com/CambridgeMonorail/TheSignAge',
    cta: '★ Star on GitHub',
  },
} as const;
