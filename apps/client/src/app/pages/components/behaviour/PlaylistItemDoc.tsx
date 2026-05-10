import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { PlaylistItem } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const PlaylistItemDocPage: FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          PlaylistItem
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          A single timed playlist row with explicit state, priority, and time
          metadata for signage loops.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with playlist runtime
            helpers and lucide-react status icons.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Resolves active, next, future, and expired states from time data</li>
            <li>Surfaces normal, priority, and takeover urgency levels</li>
            <li>Formats dwell duration and visible time windows for operators</li>
            <li>Exposes stable data attributes for automation and QA checks</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <CodeSnippet
          language="bash"
          code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/playlist-item.json"
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Example</h2>
        <div className="space-y-4 rounded-lg border border-border p-6">
          <PlaylistItem
            id="welcome"
            label="Welcome Loop"
            detail="Main lobby greeting and visitor handoff message."
            startsAt="2026-05-10T09:00:00.000Z"
            endsAt="2026-05-10T09:06:00.000Z"
            durationMs={6 * 60 * 1000}
            state="active"
          />
          <PlaylistItem
            id="evac"
            label="Emergency Advisory"
            detail="Prepared interruption card queued behind the current loop item."
            startsAt="2026-05-10T09:06:00.000Z"
            endsAt="2026-05-10T09:09:00.000Z"
            durationMs={3 * 60 * 1000}
            priority="takeover"
            state="next"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="PlaylistPreview.tsx"
          code={`import { PlaylistItem } from '@wallrun/shadcnui-signage';

export function PlaylistPreview() {
  return (
    <PlaylistItem
      id="breakfast"
      label="Breakfast Menu"
      detail="Morning menu and QR handoff"
      startsAt="2026-05-10T06:00:00.000Z"
      endsAt="2026-05-10T11:00:00.000Z"
      durationMs={5 * 60 * 1000}
      priority="normal"
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">State Labelling:</strong> Keep
            operator-facing labels explicit so support staff can tell whether an
            item is active, queued, or already missed.
          </div>
          <div>
            <strong className="text-foreground">Priority Cues:</strong> Reserve
            takeover styling for genuine interruption content so the signal stays
            meaningful.
          </div>
          <div>
            <strong className="text-foreground">Time Windows:</strong> Display
            absolute times when schedules are externally managed and duration-only
            when the loop is locally controlled.
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-playlistitem--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/PlaylistItem.tsx"
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