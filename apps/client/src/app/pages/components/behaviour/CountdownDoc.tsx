import { FC, useMemo } from 'react';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { Countdown } from '@wallrun/shadcnui-signage';
import { Button } from '@wallrun/shadcnui';

export const CountdownDocPage: FC = () => {
  const targetEpochMs = useMemo(() => Date.now() + 90_000, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          Countdown
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Counts down to a target epoch time and clamps at 0. Optionally calls a
          completion callback.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with React state.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses useTicker hook for second-resolution updates</li>
            <li>Clamps at 0 when target time is reached</li>
            <li>Optional completion callback for triggering actions</li>
            <li>Customizable format string (mm:ss, HH:mm:ss, etc.)</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <CodeSnippet
          language="bash"
          code={`npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json countdown`}
        />
        <p className="text-muted-foreground mt-4">
          Or{' '}
          <a
            href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/Countdown.tsx"
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
          <div className="text-sm text-muted-foreground mb-2">
            Next update in
          </div>
          <Countdown
            targetEpochMs={targetEpochMs}
            format="mm:ss"
            className="text-6xl font-medium tabular-nums"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Timer.tsx"
          code={`import { Countdown } from '@wallrun/shadcnui-signage';

export function Timer({ targetEpochMs }: { targetEpochMs: number }) {
  return (
    <Countdown
      targetEpochMs={targetEpochMs}
      format="mm:ss"
      className="text-7xl tabular-nums"
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Typography:</strong> Use
            tabular-nums to prevent width changes as digits countdown.
          </div>
          <div>
            <strong className="text-foreground">Zero State:</strong> Display
            meaningful message when countdown completes (e.g. "Event starting").
          </div>
          <div>
            <strong className="text-foreground">Format Choice:</strong> Show
            hours for long countdowns (days away), minutes/seconds for imminent
            events.
          </div>
          <div>
            <strong className="text-foreground">Completion Callback:</strong>{' '}
            Useful for triggering transitions or content changes when time
            expires.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-countdown--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/Countdown.tsx"
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
