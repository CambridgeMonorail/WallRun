import { FC, useState } from 'react';
import { Button } from '@wallrun/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { DocPageLayout } from '../../../components/DocPageLayout';
import { OfflineFallback } from '@wallrun/shadcnui-signage';

export const OfflineFallbackDocPage: FC = () => {
  const [isHealthy, setIsHealthy] = useState(true);

  return (
    <DocPageLayout
      header={{
        category: 'Behaviour',
        title: 'OfflineFallback',
        description:
          'A boundary that renders stable fallback content when offline (or when an app-provided health signal is false).',
      }}
      builtOnSummary={
        <>
          <strong>No shadcn primitives</strong> - Built with conditional
          rendering.
        </>
      }
      builtOnItems={[
        { text: 'Manual recovery control via isHealthy prop' },
        { text: 'Defaults to showing content when isHealthy is undefined' },
        { text: 'Fallback UI displayed when offline or unhealthy' },
        {
          text: 'No automatic recovery - parent must signal health restoration',
        },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <CodeSnippet
          language="bash"
          code={`npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json offline-fallback`}
        />
        <p className="text-muted-foreground mt-4">
          Or{' '}
          <a
            href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/OfflineFallback.tsx"
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
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="secondary"
            className="h-11"
            onClick={() => setIsHealthy((v) => !v)}
          >
            Toggle health
          </Button>
          <div className="text-sm text-muted-foreground">
            isHealthy: {String(isHealthy)}
          </div>
        </div>

        <div className="border border-border rounded-lg p-6">
          <OfflineFallback
            isOnline={true}
            isHealthy={isHealthy}
            fallback={
              <div className="text-muted-foreground">
                Showing fallback (offline/unhealthy).
              </div>
            }
          >
            <div className="text-2xl font-medium">Showing live content</div>
          </OfflineFallback>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Screen.tsx"
          code={`import { OfflineFallback } from '@wallrun/shadcnui-signage';

export function Screen({ isHealthy }: { isHealthy: boolean }) {
  return (
    <OfflineFallback
      isHealthy={isHealthy}
      fallback={<div>Offline / unhealthy</div>}
    >
      <div>Live content</div>
    </OfflineFallback>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Graceful Degradation:</strong>{' '}
            Show static fallback content when data sources fail, preventing
            blank screens.
          </div>
          <div>
            <strong className="text-foreground">Manual Recovery:</strong> Does
            not auto-recover; parent must explicitly signal health restoration
            to prevent flicker.
          </div>
          <div>
            <strong className="text-foreground">Fallback Design:</strong>{' '}
            Fallback UI should match the visual weight of live content to avoid
            jarring layout shifts.
          </div>
          <div>
            <strong className="text-foreground">Health Monitoring:</strong>{' '}
            Integrate with API health checks, network status, or data freshness
            monitoring.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-offlinefallback--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/OfflineFallback.tsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source
            </a>
          </Button>
        </div>
      </section>
    </DocPageLayout>
  );
};
