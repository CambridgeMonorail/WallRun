/** Script copy for each scene */

export const SCRIPT = {
  intro: {
    headline: 'Software that lives on walls',
    subtitle: 'TheSignAge — digital signage as software',
  },
  problem: {
    headline: 'Signage deserves better tooling',
    points: [
      'Web developers can build almost anything',
      'But digital signage still gets treated like templates and slides',
      'CMS furniture, not real software',
    ],
  },
  shift: {
    headline: 'Signage as software',
    subtitle: 'TheSignAge treats every screen as a React application',
    points: [
      'Component-driven architecture',
      'Type-safe, testable, deployable',
      'Built for developers, not drag-and-drop',
    ],
  },
  repoOverview: {
    headline: 'What\'s in the repo',
    items: [
      { label: 'Signage component library', description: 'Reusable primitives for wall displays' },
      { label: 'Demo website', description: 'Live showcase of components and layouts' },
      { label: 'Player app', description: 'BrightSign-ready deployment target' },
      { label: 'Installable skills', description: 'Copilot skills for signage development' },
      { label: 'Developer workflow', description: 'Nx monorepo with full CI/CD' },
    ],
  },
  whyItMatters: {
    headline: 'Why this matters',
    points: [
      { title: 'Deterministic layout', description: 'Pixel-perfect at every resolution' },
      { title: 'Distance readability', description: 'Designed for 3–10 metre viewing' },
      { title: 'Wall-screen constraints', description: 'Safe zones, overscan, rotation' },
      { title: 'Code-driven composition', description: 'Not slide tooling' },
    ],
  },
  outro: {
    headline: 'TheSignAge',
    subtitle: 'Open source on GitHub',
    url: 'github.com/CambridgeMonorail/TheSignAge',
  },
} as const;
