import { FC, useMemo } from 'react';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { AutoPagingList } from '@wallrun/shadcnui-signage';
import { Button } from '@wallrun/shadcnui';

type Item = { id: string; label: string };

export const AutoPagingListDocPage: FC = () => {
  const items = useMemo<Item[]>(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: String(i + 1),
        label: `Item ${String(i + 1).padStart(2, '0')}`,
      })),
    [],
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          AutoPagingList
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Renders long lists as pages (no scrolling), with a dwell time per
          page.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with React hooks and
            native HTML.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses useTicker hook for drift-resistant timing</li>
            <li>Respects prefers-reduced-motion for accessibility</li>
            <li>Automatically pages through large lists without scrolling</li>
            <li>Handles dynamic item updates mid-cycle</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <CodeSnippet
          language="bash"
          code={`npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json auto-paging-list`}
        />
        <p className="text-muted-foreground mt-4">
          Or{' '}
          <a
            href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/AutoPagingList.tsx"
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
        <div className="border border-border rounded-lg p-6">
          <AutoPagingList
            items={items}
            pageSize={4}
            dwellMs={1800}
            getKey={(item) => item.id}
            renderItem={(item) => (
              <div className="py-2 text-lg">
                <span className="tabular-nums text-muted-foreground mr-3">
                  {item.id}
                </span>
                <span className="font-medium">{item.label}</span>
              </div>
            )}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Departures.tsx"
          code={`import { AutoPagingList } from '@wallrun/shadcnui-signage';

export function Departures({ rows }: { rows: Array<{ id: string; label: string }> }) {
  return (
    <AutoPagingList
      items={rows}
      pageSize={6}
      dwellMs={5000}
      getKey={(row) => row.id}
      renderItem={(row) => <div>{row.label}</div>}
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Dwell Time:</strong> Choose
            dwell times appropriate for viewing distance and content density.
            Typical range: 3-8 seconds per page.
          </div>
          <div>
            <strong className="text-foreground">Page Size:</strong> Limit items
            per page based on screen resolution. 4-6 items for 1080p, 8-12 for
            4K displays.
          </div>
          <div>
            <strong className="text-foreground">No Scrolling:</strong> Designed
            for fixed-position displays where scrolling is jarring or
            inaccessible.
          </div>
          <div>
            <strong className="text-foreground">Dynamic Updates:</strong>{' '}
            Handles item additions/removals gracefully without resetting the
            paging cycle.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-autopaginglist--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/AutoPagingList.tsx"
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
