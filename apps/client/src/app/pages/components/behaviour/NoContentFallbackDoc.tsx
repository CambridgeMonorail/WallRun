import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { NoContentFallback } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const NoContentFallbackDocPage: FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          NoContentFallback
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Public-safe and operator-friendly fallback surface for feeds,
          playlists, and schedules that have nothing valid to show.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Examples</h2>
        <div className="space-y-6">
          <div className="rounded-lg bg-slate-950 p-8">
            <NoContentFallback
              title="Live updates temporarily unavailable"
              message="Please use the assistance desk beside this screen for the latest service information."
            />
          </div>
          <div className="rounded-lg bg-slate-950 p-8">
            <NoContentFallback
              variant="operator-debug"
              title="Playlist returned no valid items"
              message="The public screen should stay useful while operations teams confirm the source feed and schedule window."
              owner="Transport operations"
              lastCheckedAt="2026-05-07T09:56:00.000Z"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <CodeSnippet
          language="bash"
          code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json no-content-fallback"
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="ScheduleFallback.tsx"
          code={`import { NoContentFallback } from '@wallrun/shadcnui-signage';

export function ScheduleFallback() {
  return (
    <NoContentFallback
      title="Live updates temporarily unavailable"
      message="Please use the assistance desk beside this screen for the latest service information."
    />
  );
}`}
        />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-nocontentfallback--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/NoContentFallback.tsx"
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
