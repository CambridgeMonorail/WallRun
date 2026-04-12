import { FC } from 'react';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { ContentRotator } from '@wallrun/shadcnui-signage';
import { Button } from '@wallrun/shadcnui';

export const ContentRotatorDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          ContentRotator
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Rotates between multiple pieces of content on a fixed cadence, with
          optional transitions and pause controls.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with React state and
            hooks.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses useTicker hook for deterministic rotation timing</li>
            <li>Supports fade, slide, and no-transition modes</li>
            <li>Respects prefers-reduced-motion accessibility preference</li>
            <li>Handles dynamic children updates without restarting cycle</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        {' '}
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <CodeSnippet
          language="bash"
          code={`npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json content-rotator`}
        />
        <p className="text-muted-foreground mt-4">
          Or{' '}
          <a
            href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/ContentRotator.tsx"
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
        <div className="border border-border rounded-lg p-6">
          <ContentRotator intervalMs={2500} transition="slide">
            <div className="rounded-md border border-border p-6">
              <div className="text-sm text-muted-foreground">Slide</div>
              <div className="text-2xl font-medium">Welcome</div>
            </div>
            <div className="rounded-md border border-border p-6">
              <div className="text-sm text-muted-foreground">Slide</div>
              <div className="text-2xl font-medium">Today’s Events</div>
            </div>
            <div className="rounded-md border border-border p-6">
              <div className="text-sm text-muted-foreground">Slide</div>
              <div className="text-2xl font-medium">Safety Notice</div>
            </div>
          </ContentRotator>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="LobbyLoop.tsx"
          code={`import { ContentRotator } from '@wallrun/shadcnui-signage';

export function LobbyLoop() {
  return (
    <ContentRotator intervalMs={8000} transition="slide">
      <div>Slide A</div>
      <div>Slide B</div>
      <div>Slide C</div>
    </ContentRotator>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Rotation Speed:</strong> 5-10
            seconds per item is typical for signage. Slower for dense content,
            faster for simple messages.
          </div>
          <div>
            <strong className="text-foreground">Transitions:</strong> Slide
            transitions work well for sequential content; fade for unrelated
            items.
          </div>
          <div>
            <strong className="text-foreground">Pause Control:</strong> Useful
            for interactive kiosks or when integrated with presence sensors.
          </div>
          <div>
            <strong className="text-foreground">Dynamic Content:</strong>{' '}
            Handles children changes (add/remove items) without disrupting the
            rotation.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-contentrotator--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/ContentRotator.tsx"
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
