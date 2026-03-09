import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@tsa/shadcnui';
import {
  BookOpen,
  Bot,
  Github,
  Layers,
  Palette,
  Layout,
  ExternalLink,
} from 'lucide-react';

export const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-background p-8 min-h-screen max-w-6xl mx-auto">
      {/* HERO */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
          The Sign Age
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Digital signage as software. Build deterministic, data-driven content
          for always-on displays using React, TypeScript, and modern web
          technologies.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate('/getting-started')}
            variant="secondary"
            size="lg"
          >
            Get Started
          </Button>
          <Button
            onClick={() => navigate('/gallery')}
            variant="secondary"
            size="lg"
          >
            View Examples
          </Button>
        </div>
      </div>

      {/* QUICK LINKS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <button
          className="bg-card p-6 rounded border border-border hover:border-foreground transition-colors cursor-pointer text-left w-full"
          onClick={() => navigate('/getting-started')}
          aria-label="Navigate to Getting Started guide"
        >
          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-foreground flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                Getting Started
              </h3>
              <p className="text-muted-foreground mb-3">
                Installation guide, quick start tutorial, and your first signage
                screen. Learn how to add components using the shadcn registry
                protocol.
              </p>
              <span className="text-sm text-foreground hover:underline">
                Read the guide →
              </span>
            </div>
          </div>
        </button>

        <button
          className="bg-card p-6 rounded border border-border hover:border-foreground transition-colors cursor-pointer text-left w-full"
          onClick={() => navigate('/library')}
          aria-label="Navigate to Component Library"
        >
          <div className="flex items-start gap-4">
            <Layers className="w-8 h-8 text-foreground flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                Component Library
              </h3>
              <p className="text-muted-foreground mb-3">
                Browse 23 signage components built for distance readability,
                fixed-aspect layouts, and 24/7 operation. Supports shadcn
                registry protocol.
              </p>
              <span className="text-sm text-foreground hover:underline">
                Browse components →
              </span>
            </div>
          </div>
        </button>

        <button
          className="bg-card p-6 rounded border border-border hover:border-foreground transition-colors cursor-pointer text-left w-full"
          onClick={() => navigate('/gallery')}
          aria-label="Navigate to Signage Gallery"
        >
          <div className="flex items-start gap-4">
            <Layout className="w-8 h-8 text-foreground flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                Signage Gallery
              </h3>
              <p className="text-muted-foreground mb-3">
                Full-screen examples: restaurant menus, office directories, KPI
                dashboards, event schedules, and welcome screens. View in
                full-screen mode.
              </p>
              <span className="text-sm text-foreground hover:underline">
                View examples →
              </span>
            </div>
          </div>
        </button>

        <button
          className="bg-card p-6 rounded border border-border hover:border-foreground transition-colors cursor-pointer text-left w-full"
          onClick={() => navigate('/color-palette')}
          aria-label="Navigate to Theme and Colors page"
        >
          <div className="flex items-start gap-4">
            <Palette className="w-8 h-8 text-foreground flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                Theme & Colors
              </h3>
              <p className="text-muted-foreground mb-3">
                WCAG contrast checker and theme configuration reference.
                Accessibility-first design with locked colors optimized for
                distance readability.
              </p>
              <span className="text-sm text-foreground hover:underline">
                View color palette →
              </span>
            </div>
          </div>
        </button>
      </section>

      <section className="mb-12 bg-card p-8 rounded border border-border">
        <h2 className="text-2xl font-medium text-foreground mb-3">
          What You Can Use From This Repo
        </h2>
        <p className="max-w-3xl text-base text-muted-foreground mb-6 leading-relaxed">
          The demo app is not just a showcase. It points to four distinct
          things you can consume: signage components, registry-based install
          paths, portable Copilot skills, and BrightSign deployment workflows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background p-5 rounded border border-border">
            <div className="flex items-start gap-3 mb-3">
              <Layers className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Signage Components
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Purpose-built React components for distance readability,
                  fixed-aspect layouts, and always-on screens.
                </p>
              </div>
            </div>
            <div className="bg-muted text-foreground p-3 rounded font-mono text-xs overflow-x-auto mb-3">
              <pre>{`npx shadcn@latest add https://cambridgemonorail.github.io/TheSignAge/registry/registry.json auto-paging-list`}</pre>
            </div>
            <Button
              onClick={() => navigate('/getting-started')}
              variant="secondary"
            >
              See install options
            </Button>
          </div>

          <div className="bg-background p-5 rounded border border-border">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Component Reference
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse the inventory, see what each library contains, and use
                  Storybook for live props and usage examples.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={() => navigate('/library')}
                variant="secondary"
              >
                Open library guide
              </Button>
              <Button variant="ghost" asChild>
                <a
                  href="https://cambridgemonorail.github.io/TheSignAge/storybook/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Storybook
                </a>
              </Button>
            </div>
          </div>

          <div className="bg-background p-5 rounded border border-border">
            <div className="flex items-start gap-3 mb-3">
              <Bot className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Portable Skills
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Reusable <code className="text-xs">SKILL.md</code>{' '}
                  workflows for BrightSign deployment, discovery, debugging,
                  verification, and planning.
                </p>
              </div>
            </div>
            <div className="bg-muted text-foreground p-3 rounded font-mono text-xs overflow-x-auto mb-3">
              <pre>{`npx skills add CambridgeMonorail/TheSignAge`}</pre>
            </div>
            <Button variant="secondary" asChild>
              <a
                href="https://github.com/CambridgeMonorail/TheSignAge/blob/main/skills/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read skills guide
              </a>
            </Button>
          </div>

          <div className="bg-background p-5 rounded border border-border">
            <div className="flex items-start gap-3 mb-3">
              <Layout className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Player Workflows
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Packaging, local deployment, player configuration, and LAN
                  discovery for BrightSign OS 9.x players.
                </p>
              </div>
            </div>
            <Button variant="secondary" asChild>
              <a
                href="https://github.com/CambridgeMonorail/TheSignAge/blob/main/docs/guides/brightsign-deployment.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open deployment guide
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* EXTERNAL RESOURCES */}
      <section className="bg-card p-8 rounded border border-border">
        <h2 className="text-2xl font-medium text-foreground mb-6">
          Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://cambridgemonorail.github.io/TheSignAge/storybook/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-background rounded border border-border hover:border-foreground transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <div>
              <div className="font-medium text-foreground">Storybook</div>
              <div className="text-sm text-muted-foreground">
                Interactive component documentation
              </div>
            </div>
          </a>
          <a
            href="https://github.com/CambridgeMonorail/TheSignAge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-background rounded border border-border hover:border-foreground transition-colors"
          >
            <Github className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <div>
              <div className="font-medium text-foreground">GitHub</div>
              <div className="text-sm text-muted-foreground">
                Source code and contribution guide
              </div>
            </div>
          </a>
          <a
            href="https://github.com/CambridgeMonorail/TheSignAge/blob/main/apps/client/public/registry/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-background rounded border border-border hover:border-foreground transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <div>
              <div className="font-medium text-foreground">Registry README</div>
              <div className="text-sm text-muted-foreground">
                shadcn registry setup and component install commands
              </div>
            </div>
          </a>
          <a
            href="https://github.com/CambridgeMonorail/TheSignAge/blob/main/docs/tooling/github-copilot-tooling.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-background rounded border border-border hover:border-foreground transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <div>
              <div className="font-medium text-foreground">Copilot Tooling</div>
              <div className="text-sm text-muted-foreground">
                Skills, agents, and workflow documentation
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* PROJECT STATUS */}
      <footer className="mt-12 pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Alpha Status:</strong> This
          project is under active development. Features may be incomplete or
          change significantly. Feedback and contributions welcome.
        </p>
      </footer>
    </div>
  );
};
