import { FC } from 'react';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { StaleDataIndicator } from '@wallrun/shadcnui-signage';
import { Button } from '@wallrun/shadcnui';

export const StaleDataIndicatorDocPage: FC = () => {
  const nowMs = new Date('2026-02-09T12:00:00Z').getTime();
  const now = () => nowMs;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          StaleDataIndicator
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          A compact freshness indicator for always-on screens (fresh / warning /
          stale) based on last update time.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with conditional CSS
            classes.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses useTicker hook for periodic freshness checks</li>
            <li>Three states: fresh (green), warning (yellow), stale (red)</li>
            <li>Configurable thresholds for warning and stale states</li>
            <li>Compact visual indicator (dot + label)</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        {' '}
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <CodeSnippet
          language="bash"
          code={`npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json stale-data-indicator`}
        />
        <p className="text-muted-foreground mt-4">
          Or{' '}
          <a
            href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/StaleDataIndicator.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-foreground hover:underline"
          >
            view source on GitHub
          </a>
          .
        </p>
      </section>

      <section className="mb-12">
        {' '}
        <h2 className="text-2xl font-medium mb-4">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Fresh</div>
            <StaleDataIndicator now={now} lastUpdatedEpochMs={nowMs - 30_000} />
          </div>
          <div className="border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Warning</div>
            <StaleDataIndicator
              now={now}
              lastUpdatedEpochMs={nowMs - 8 * 60_000}
            />
          </div>
          <div className="border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Stale</div>
            <StaleDataIndicator
              now={now}
              lastUpdatedEpochMs={nowMs - 25 * 60_000}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Status.tsx"
          code={`import { StaleDataIndicator } from '@wallrun/shadcnui-signage';

export function Status({ lastUpdatedEpochMs }: { lastUpdatedEpochMs: number }) {
  return (
    <StaleDataIndicator
      lastUpdatedEpochMs={lastUpdatedEpochMs}
      warnAfterMin={5}
      staleAfterMin={15}
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Freshness Thresholds:</strong>{' '}
            Set thresholds based on update frequency expectations. 5-15 minutes
            typical for dashboards.
          </div>
          <div>
            <strong className="text-foreground">Visual Hierarchy:</strong> Place
            indicator where viewers naturally look (top-right, near timestamps).
          </div>
          <div>
            <strong className="text-foreground">Color Coding:</strong>{' '}
            Green/yellow/red standard for status; ensure sufficient contrast for
            distance viewing.
          </div>
          <div>
            <strong className="text-foreground">Real-time Monitoring:</strong>{' '}
            Essential for dashboards showing live data feeds, preventing stale
            data from misleading viewers.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-staledataindicator--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/StaleDataIndicator.tsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};
