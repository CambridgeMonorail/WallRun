import { FC, useMemo, useState } from 'react';
import { Button } from '@tsa/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { ScheduleGate } from '@tsa/shadcnui-signage';

export const ScheduleGateDocPage: FC = () => {
  const [preset, setPreset] = useState<'open' | 'closed'>('open');

  const now = useMemo(() => {
    const epochMs =
      preset === 'open'
        ? new Date('2026-02-09T10:30:00').getTime()
        : new Date('2026-02-09T20:30:00').getTime();
    return () => epochMs;
  }, [preset]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          ScheduleGate
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Conditionally renders content based on weekday and time windows
          (optionally timezone-aware).
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with date-fns-tz for
            timezone handling.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Timezone-aware scheduling using date-fns-tz</li>
            <li>Supports weekday-specific windows (mon-sun shorthand)</li>
            <li>Minute-aligned updates via useTicker hook</li>
            <li>Efficient re-evaluation only when window boundaries crossed</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <CodeSnippet
          language="bash"
          code={`npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json schedule-gate`}
        />
        <p className="text-muted-foreground mt-4">
          Or{' '}
          <a
            href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/ScheduleGate.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            view source on GitHub
          </a>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Button
            variant={preset === 'open' ? 'secondary' : 'ghost'}
            onClick={() => setPreset('open')}
          >
            Simulate 10:30
          </Button>
          <Button
            variant={preset === 'closed' ? 'secondary' : 'ghost'}
            onClick={() => setPreset('closed')}
          >
            Simulate 20:30
          </Button>
        </div>

        <div className="border border-border rounded-lg p-6">
          <ScheduleGate
            now={now}
            windows={[{ days: ['mon'], start: '09:00', end: '17:00' }]}
            fallback={<div className="text-muted-foreground">Closed</div>}
          >
            <div className="text-2xl font-medium">Open</div>
          </ScheduleGate>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Menu.tsx"
          code={`import { ScheduleGate } from '@tsa/shadcnui-signage';

export function DaypartMenu() {
  return (
    <ScheduleGate
      windows={[{ start: '06:00', end: '11:00', timezone: 'Europe/London' }]}
      fallback={<div>Not serving breakfast</div>}
    >
      <div>Breakfast menu</div>
    </ScheduleGate>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Daypart Menus:</strong> Show
            breakfast/lunch/dinner menus based on time windows.
          </div>
          <div>
            <strong className="text-foreground">Business Hours:</strong> Display
            different content during open/closed hours.
          </div>
          <div>
            <strong className="text-foreground">Timezone Handling:</strong>{' '}
            Critical for multi-location deployments; ensure timezone matches
            display location.
          </div>
          <div>
            <strong className="text-foreground">Fallback Design:</strong>{' '}
            Fallback content should clearly indicate "closed" or "unavailable"
            state.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-schedulegate--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/ScheduleGate.tsx"
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
