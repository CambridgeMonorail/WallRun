import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@tsa/shadcnui';
import { Bot, Radar, Rocket, Wrench } from 'lucide-react';

export const ToolingPage: FC = () => {
  return (
    <div className="doc-shell max-w-5xl font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">Documentation</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Tooling & Deployment
        </h1>

        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          The Sign Age is not only a component library. It also ships the
          workflows for scaffolding player apps, packaging them for BrightSign,
          discovering devices on your LAN, and reusing AI guidance through
          portable skills.
        </p>
      </div>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium text-foreground">
          <Wrench className="h-6 w-6" />
          Scaffold A Player App
        </h2>
        <p className="mb-4 max-w-3xl text-muted-foreground">
          Start from the BrightSign-ready player app template instead of copying
          files by hand. The repo now supports both the compatibility script and
          the Nx-native generator.
        </p>
        <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
          <pre>
            {`# Compatibility entry point
pnpm scaffold:player --name player-arrivals

# Nx-native generator
pnpm nx g sign-age:player-app --name player-arrivals

# Example: landscape app without status page
pnpm nx g sign-age:player-app --name player-menu-board --displayOrientation landscape --noStatusPage`}
          </pre>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Generated apps preserve the BrightSign packaging shape used by
          player-minimal while letting you customize app name, orientation,
          status page behavior, and tags.
        </p>
      </section>

      <section className="demo-panel mb-12 p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium text-foreground">
          <Rocket className="h-6 w-6" />
          Package And Deploy
        </h2>
        <p className="mb-4 max-w-3xl text-muted-foreground">
          Local BrightSign iteration is part of the workflow. Package the app,
          deploy to a configured player, and retarget a named app when needed.
        </p>
        <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
          <pre>
            {`# Initialize local player registry
pnpm setup:dev

# Deploy the default player app to the default player
pnpm deploy:player

# Deploy a specific app to a named player
pnpm deploy:player -- --app player-arrivals --player lobby-display`}
          </pre>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" asChild>
            <a
              href="https://github.com/CambridgeMonorail/TheSignAge/blob/main/docs/guides/brightsign-deployment.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Deployment Guide
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a
              href="https://github.com/CambridgeMonorail/TheSignAge/blob/main/apps/player-minimal/README.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Player App README
            </a>
          </Button>
        </div>
      </section>

      <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="demo-panel p-6 sm:p-8">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium text-foreground">
            <Radar className="h-6 w-6" />
            Discover And Configure Players
          </h2>
          <p className="mb-4 text-muted-foreground">
            Find BrightSign players on your LAN, then keep player selection
            git-safe through the local registry flow.
          </p>
          <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
            <pre>
              {`# Find BrightSign players on the local network
pnpm discover

# Add a named player without committing credentials
pnpm player add lobby-display 192.168.1.50 --default`}
            </pre>
          </div>
          <Button className="mt-4" variant="secondary" asChild>
            <a
              href="https://github.com/CambridgeMonorail/TheSignAge/blob/main/tools/player-discovery/README.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Discovery Guide
            </a>
          </Button>
        </div>

        <div className="demo-panel p-6 sm:p-8">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium text-foreground">
            <Bot className="h-6 w-6" />
            Install Portable Skills
          </h2>
          <p className="mb-4 text-muted-foreground">
            The repo exposes reusable SKILL.md packages for planning,
            verification, BrightSign deployment, runtime constraints, and player
            discovery.
          </p>
          <div className="code-panel overflow-x-auto p-4 font-mono text-sm text-foreground">
            <pre>{`npx skills add CambridgeMonorail/TheSignAge`}</pre>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <a
                href="https://github.com/CambridgeMonorail/TheSignAge/blob/main/skills/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Skills Guide
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a
                href="https://github.com/CambridgeMonorail/TheSignAge/blob/main/docs/tooling/github-copilot-tooling.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Copilot Tooling Docs
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="demo-panel-soft px-6 py-8 text-center">
        <h3 className="display-type mb-2 text-xl text-foreground">
          Move From Demo To Real Player App
        </h3>
        <p className="mx-auto mb-4 max-w-2xl text-muted-foreground">
          Explore the examples, then scaffold a player app and deploy it to a
          device when you are ready to move beyond the browser demo.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="secondary">
            <Link to="/getting-started">Open Getting Started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/gallery">View Signage Examples</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};