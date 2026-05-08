import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { ReconnectingState } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const ReconnectingStateDocPage: FC = () => {
  const now = () => new Date('2026-05-07T10:00:00.000Z').getTime();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          ReconnectingState
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Recovery-state notice for live regions that are restoring service
          without collapsing the surrounding layout.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Examples</h2>
        <div className="space-y-6 rounded-lg bg-slate-950 p-8 text-white">
          <ReconnectingState
            active
            lastConnectedAt="2026-05-07T09:56:00.000Z"
            now={now}
          />
          <ReconnectingState
            active
            variant="inline"
            lastConnectedAt="2026-05-07T09:58:00.000Z"
            now={now}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <CodeSnippet
          language="bash"
          code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json reconnecting-state"
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="FeedRecovery.tsx"
          code={`import { ReconnectingState } from '@wallrun/shadcnui-signage';

export function FeedRecovery() {
  return (
    <ReconnectingState
      active
      lastConnectedAt="2026-05-07T09:56:00.000Z"
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
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-reconnectingstate--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/ReconnectingState.tsx"
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
