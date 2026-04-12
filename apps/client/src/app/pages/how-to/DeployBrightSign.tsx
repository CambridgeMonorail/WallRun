import { FC } from 'react';
import { Package, Upload, Bug, Network } from 'lucide-react';

/**
 * DeployBrightSign - Guide for deploying apps to BrightSign players
 */
export const DeployBrightSignPage: FC = () => {
  return (
    <div className="doc-shell max-w-5xl font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">How To</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Deploy to BrightSign Players
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Use the BrightSign Deploy agent to package and deploy React apps to
          BrightSign OS 9.x digital signage players.
        </p>
      </div>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          What the Agent Does
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            The <strong className="text-foreground">BrightSign Deploy</strong>{' '}
            agent handles the complete deployment workflow for BrightSign OS 9.x
            players.
          </p>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h3 className="mb-3 text-base font-medium text-foreground">
              Capabilities
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <Package className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  <strong>Package apps</strong> — Build optimized IIFE bundles
                  with autorun.brs bootstrap
                </span>
              </li>
              <li className="flex gap-2">
                <Upload className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  <strong>Deploy via HTTP</strong> — Push builds to players via
                  Diagnostic Web Server (port 8008)
                </span>
              </li>
              <li className="flex gap-2">
                <Bug className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  <strong>Debug player issues</strong> — Inspect runtime state,
                  logs, and device info
                </span>
              </li>
              <li className="flex gap-2">
                <Network className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  <strong>Discover players</strong> — Scan network to find
                  BrightSign devices
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Prerequisites
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>Before deploying, ensure you have:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              A BrightSign OS 9.x player on the same network as your development
              machine
            </li>
            <li>
              The player's IP address (use{' '}
              <code className="text-xs">pnpm discover</code> to find it)
            </li>
            <li>
              Diagnostic Web Server (DWS) enabled on the player (enabled by
              default)
            </li>
            <li>A built signage app ready to deploy</li>
          </ul>
        </div>
      </section>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Quick Deploy Workflow
        </h2>
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              1. Find Your Player
            </h3>
            <p className="mb-3">Scan the network to discover players:</p>
            <pre
              className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm"
              aria-label="Player discovery command"
            >
              <code className="text-foreground">pnpm discover</code>
            </pre>
            <p className="mt-2 text-sm">
              This will list all BrightSign devices with their IP addresses and
              serial numbers.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              2. Use the Agent to Deploy
            </h3>
            <p className="mb-3">Invoke the BrightSign Deploy agent:</p>
            <pre
              className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-border bg-muted p-4 text-sm"
              aria-label="Agent invocation example"
            >
              <code className="text-foreground">
                {`@BrightSign Deploy

Package and deploy the player-minimal app to the BrightSign player at 192.168.1.100`}
              </code>
            </pre>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              3. Agent Handles Packaging
            </h3>
            <p className="mb-3">The agent will:</p>
            <ul className="ml-6 list-disc space-y-1 text-sm">
              <li>Build the app with Vite (optimized IIFE bundle)</li>
              <li>Create autorun.brs bootstrap script</li>
              <li>Organize files in BrightSign-compatible structure</li>
              <li>
                Create deployment package in{' '}
                <code className="text-xs">dist/&lt;app-name&gt;-brightsign/</code>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              4. Upload to Player
            </h3>
            <p>
              The agent uploads the package to the player's SD card via the HTTP
              API and triggers a reboot.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              5. Verify on Player
            </h3>
            <p>
              After reboot (10–30 seconds), the player will launch your app
              full-screen.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-panel mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Debugging Player Issues
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            If your app doesn't load correctly on the player, use the agent to
            diagnose:
          </p>
          <pre
            className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-border bg-muted p-4 text-sm"
            aria-label="Debugging command example"
          >
            <code className="text-foreground">
              {`@BrightSign Deploy

Debug the player at 192.168.1.100 - the app is showing a blank screen`}
            </code>
          </pre>
          <p className="mt-4">The agent will check:</p>
          <ul className="ml-6 list-disc space-y-2 text-sm">
            <li>Device info and firmware version</li>
            <li>Current autorun configuration</li>
            <li>File structure on SD card</li>
            <li>Console errors via remote Chrome DevTools</li>
            <li>Network connectivity</li>
          </ul>
        </div>
      </section>

      <section className="demo-panel-soft px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Common Issues
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 text-base font-medium text-foreground">
              Blank Screen After Deploy
            </h3>
            <p className="text-sm">
              Usually caused by incorrect bundle format. Ensure Vite config uses
              IIFE format, not ES modules. The agent will check this.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 text-base font-medium text-foreground">
              Player Not Found
            </h3>
            <p className="text-sm">
              Verify player is on same network subnet. Check firewall settings
              aren't blocking port 8008.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 text-base font-medium text-foreground">
              Upload Fails
            </h3>
            <p className="text-sm">
              DWS may be disabled. Enable via BrightSign's local web interface
              or contact the player administrator.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 text-base font-medium text-foreground">
              Media Won't Autoplay
            </h3>
            <p className="text-sm">
              BrightSign requires user gesture for media. Use{' '}
              <code className="text-xs">muted autoplay</code> and handle state
              in React, not relying on browser autoplay.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-panel px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Advanced: Manual Deployment
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>For manual control over the deployment process:</p>
          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">
                1. Package the app:
              </p>
              <pre
                className="overflow-x-auto rounded-lg border border-border bg-muted p-3 text-xs"
                aria-label="Package player app command"
              >
                <code className="text-foreground">
                  pnpm package:player player-minimal
                </code>
              </pre>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">
                2. Deploy to player:
              </p>
              <pre
                className="overflow-x-auto rounded-lg border border-border bg-muted p-3 text-xs"
                aria-label="Deploy to player command"
              >
                <code className="text-foreground">
                  pnpm deploy:local player-minimal 192.168.1.100
                </code>
              </pre>
            </div>
          </div>
          <p className="mt-4 text-sm">
            The agent wraps these commands and adds error checking, diagnostics,
            and context-aware guidance.
          </p>
        </div>
      </section>
    </div>
  );
};
