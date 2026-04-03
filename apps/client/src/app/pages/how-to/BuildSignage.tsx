import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

/**
 * BuildSignage - Guide for implementing signage screens with signage-architect
 */
export const BuildSignagePage: FC = () => {
  return (
    <div className="doc-shell max-w-5xl font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">How To</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Build a Signage Screen
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Use the signage-architect agent to implement premium digital signage
          screens from design briefs.
        </p>
      </div>

      <section className="demo-panel-soft mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          What the Agent Does
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            The <strong className="text-foreground">signage-architect</strong>{' '}
            agent builds production-ready React signage screens that follow
            design briefs and signage best practices.
          </p>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h3 className="mb-3 text-base font-medium text-foreground">
              What It Creates
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>Full-screen layouts optimized for distance viewing</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  Component implementations using shadcnui-signage primitives
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  BrightSign-compatible React apps with autorun configuration
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  Signage-safe layouts (overscan margins, safe typography, high
                  contrast)
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  State machines for boot/load/content/fallback behavior
                </span>
              </li>
            </ul>
          </div>

          <p className="text-sm italic">
            This agent produces signage content, not website chrome. Output is
            designed for 3–10 metre viewing distance and 24/7 operation.
          </p>
        </div>
      </section>

      <section className="demo-panel mb-8 px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Step-by-Step Guide
        </h2>
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              1. Start From a Design Brief
            </h3>
            <p>
              Before invoking the agent, ensure you have a design brief created.
              See the{' '}
              <Link
                to="/how-to/design-brief"
                className="text-foreground underline hover:no-underline"
              >
                Create a Design Brief
              </Link>{' '}
              guide.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              2. Invoke the Agent
            </h3>
            <p className="mb-3">
              Reference the specific brief you want implemented:
            </p>
            <pre
              className="whitespace-pre-wrap rounded-lg border border-border bg-muted p-4 text-sm"
              aria-label="Agent invocation command example"
            >
              <code className="text-foreground">
                {`@signage-architect implement the design brief in docs/signage design briefs/The Green Fork/`}
              </code>
            </pre>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              3. Review Implementation Options
            </h3>
            <p className="mb-3">The agent will ask clarifying questions:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Create a new player app or add to existing app?</li>
              <li>Which resolution target (1920×1080, 1080×1920, etc.)?</li>
              <li>Static content or data-driven with API integration?</li>
              <li>Single page or multi-page rotation?</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              4. Agent Builds the Screen
            </h3>
            <p className="mb-3">The agent will:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                Create React components using signage primitives from{' '}
                <code className="text-xs">@wallrun/shadcnui-signage</code>
              </li>
              <li>Apply signage layout constraints and safe zones</li>
              <li>Implement the visual direction from the brief</li>
              <li>Add placeholder images with proper sizing and labels</li>
              <li>Configure the BrightSign player app structure</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              5. Verify Locally
            </h3>
            <p className="mb-3">Run the dev server to preview:</p>
            <pre
              className="rounded-lg border border-border bg-muted p-4 text-sm"
              aria-label="Development server command"
            >
              <code className="text-foreground">
                pnpm nx serve &lt;app-name&gt;
              </code>
            </pre>
            <p className="mt-2">
              The agent will provide the exact command for your new app.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              6. Next Steps: Deployment
            </h3>
            <p>
              Once the screen looks correct, deploy it to a BrightSign player.
              See the{' '}
              <Link
                to="/how-to/deploy-brightsign"
                className="text-foreground underline hover:no-underline"
              >
                Deploy to BrightSign
              </Link>{' '}
              guide.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-panel-soft px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          Customization After Implementation
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            After the initial implementation, you can continue working with the
            agent to refine the screen:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Adjust typography</strong> —
              "Increase the price text size by 20%"
            </li>
            <li>
              <strong className="text-foreground">Refine layout</strong> — "Move
              the logo to top-right corner"
            </li>
            <li>
              <strong className="text-foreground">Add animation</strong> —
              "Rotate through featured items every 8 seconds"
            </li>
            <li>
              <strong className="text-foreground">Integrate data</strong> —
              "Connect to menu API endpoint for live pricing"
            </li>
          </ul>
          <p className="mt-4 text-sm italic">
            The agent follows signage constraints throughout iteration —
            maintaining legibility, safe zones, and 24/7 reliability.
          </p>
        </div>
      </section>

      <section className="demo-panel px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          What Makes This Different
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The signage-architect agent enforces signage-specific constraints
            that typical web development ignores:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">10-foot rule</strong> —
              Minimum 48px text for body copy, 72px+ for headings
            </li>
            <li>
              <strong className="text-foreground">Safe zones</strong> — 5%
              margin to avoid overscan and bezel clipping
            </li>
            <li>
              <strong className="text-foreground">High contrast</strong> — WCAG
              AAA minimum, optimized for distance and ambient light
            </li>
            <li>
              <strong className="text-foreground">Loop-safe animation</strong> —
              Slow, graceful motion that doesn't fatigue over hours of viewing
            </li>
            <li>
              <strong className="text-foreground">Always-on reliability</strong>{' '}
              — Offline fallbacks, stale data indicators, error recovery
            </li>
          </ul>
          <p className="mt-4">
            If the output looks like a typical website, the agent will flag it
            and revise.
          </p>
        </div>
      </section>
    </div>
  );
};
