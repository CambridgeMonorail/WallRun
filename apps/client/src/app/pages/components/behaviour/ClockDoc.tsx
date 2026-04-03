import { FC } from 'react';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { Clock } from '@tsa/shadcnui-signage';
import { Button } from '@tsa/shadcnui';

export const ClockDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          Clock
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          A signage-ready clock with large, readable formatting and optional
          timezone/locale.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built on the native
            Intl.DateTimeFormat API for formatting.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses useTicker hook for minute-aligned updates</li>
            <li>Timezone-aware via Intl.DateTimeFormat timeZone option</li>
            <li>Efficient re-renders only on time change</li>
            <li>Supports custom format strings and locales</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <CodeSnippet
          language="bash"
          code={`npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json clock`}
        />
        <p className="text-muted-foreground mt-4">
          Or{' '}
          <a
            href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/Clock.tsx"
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
        {' '}
        <h2 className="text-2xl font-medium mb-4">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Local time</div>
            <Clock className="text-5xl font-medium" format="HH:mm" />
          </div>
          <div className="border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">
              Timezone + seconds
            </div>
            <Clock
              className="text-5xl font-medium"
              format="HH:mm:ss"
              timezone="Europe/London"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Header.tsx"
          code={`import { Clock } from '@tsa/shadcnui-signage';

export function Header() {
  return <Clock format="HH:mm" className="text-6xl tabular-nums" />;
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Typography:</strong> Use
            tabular-nums class for monospace digits to prevent layout shift.
          </div>
          <div>
            <strong className="text-foreground">Update Frequency:</strong>{' '}
            Updates at minute boundaries by default for efficiency. Add seconds
            for high-precision displays.
          </div>
          <div>
            <strong className="text-foreground">Timezone Awareness:</strong>{' '}
            Specify timezone for multi-location displays or daylight saving
            handling.
          </div>
          <div>
            <strong className="text-foreground">Readability:</strong> Use large
            font sizes (4xl-8xl) for distance viewing.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-clock--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/Clock.tsx"
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
