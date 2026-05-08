import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { OneMessageFrame } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const OneMessageFrameDocPage: FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Blocks</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          OneMessageFrame
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Single-message signage shell for one dominant statement, one short
          context line, and one clear next step.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with semantic layout
            zones, stable spacing, and signage-safe typographic hierarchy.
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Keeps the headline visually dominant</li>
            <li>Clamps supporting text to a safe line count</li>
            <li>Supports optional action, media, and utility zones</li>
            <li>Works for lobbies, waiting rooms, and interruption states</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Examples</h2>
        <div className="rounded-lg bg-slate-950 p-8">
          <OneMessageFrame
            utility="Reception notice"
            headline="Visitor check-in has moved to Desk 3"
            supportingText="Please use the illuminated route beside the atrium stairs. Staff will redirect anyone arriving at the former desk."
            action={
              <div className="inline-flex rounded-full border border-white/15 bg-white px-6 py-3 text-xl font-semibold text-slate-950">
                Follow the floor markers
              </div>
            }
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <CodeSnippet
          language="bash"
          code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json one-message-frame"
        />
        <p className="mt-4 text-muted-foreground">
          Or{' '}
          <a
            href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/OneMessageFrame.tsx"
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
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="VisitorNotice.tsx"
          code={`import { OneMessageFrame } from '@wallrun/shadcnui-signage';

export function VisitorNotice() {
  return (
    <OneMessageFrame
      utility="Reception notice"
      headline="Visitor check-in has moved to Desk 3"
      supportingText="Please use the illuminated route beside the atrium stairs."
      action={<div>Follow the floor markers</div>}
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">One Main Point:</strong> Use
            this block when the screen needs one dominant message, not a list of
            competing updates.
          </div>
          <div>
            <strong className="text-foreground">Action Discipline:</strong>{' '}
            Keep the action slot to a single next step so the frame stays
            glanceable at distance.
          </div>
          <div>
            <strong className="text-foreground">Media Support:</strong> Add
            media only when it reinforces the message rather than competing with
            the headline.
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-blocks-onemessageframe--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/OneMessageFrame.tsx"
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
