import { FC, useMemo, useState } from 'react';
import { Button } from '@wallrun/shadcnui';
import {
  PlaylistTimeline,
  type PlaylistEntry,
} from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

const demoItems: PlaylistEntry[] = [
  {
    id: 'welcome',
    label: 'Welcome Loop',
    detail: 'Greeting content with venue directions and QR handoff.',
    startsAt: '2026-05-10T09:00:00.000Z',
    endsAt: '2026-05-10T09:05:00.000Z',
    durationMs: 5 * 60 * 1000,
  },
  {
    id: 'events',
    label: 'Upcoming Events',
    detail: 'Conference agenda, sponsor slides, and room reminders.',
    startsAt: '2026-05-10T09:05:00.000Z',
    endsAt: '2026-05-10T09:10:00.000Z',
    durationMs: 5 * 60 * 1000,
    priority: 'priority',
  },
  {
    id: 'advisory',
    label: 'Security Advisory',
    detail: 'Reserved interruption slot for urgent building notices.',
    startsAt: '2026-05-10T09:10:00.000Z',
    endsAt: '2026-05-10T09:13:00.000Z',
    durationMs: 3 * 60 * 1000,
    priority: 'takeover',
  },
];

export const PlaylistTimelineDocPage: FC = () => {
  const [preset, setPreset] = useState<'welcome' | 'events'>('welcome');

  const now = useMemo(() => {
    const epochMs =
      preset === 'welcome'
        ? new Date('2026-05-10T09:02:00.000Z').getTime()
        : new Date('2026-05-10T09:07:00.000Z').getTime();

    return () => epochMs;
  }, [preset]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          PlaylistTimeline
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          A deterministic view of the active item, the next slot, and queued
          future entries in a timed signage loop.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with useTicker and the
            shared playlist runtime annotations.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Recomputes item state without app-specific scheduling glue</li>
            <li>Uses the same runtime helpers as PlaylistItem for consistent labels</li>
            <li>Supports deterministic previews through an injected now provider</li>
            <li>Keeps loop planning visible for operators and QA review</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <CodeSnippet
          language="bash"
          code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/playlist-timeline.json"
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Example</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant={preset === 'welcome' ? 'secondary' : 'ghost'}
            className="h-11"
            onClick={() => setPreset('welcome')}
          >
            Simulate 09:02
          </Button>
          <Button
            variant={preset === 'events' ? 'secondary' : 'ghost'}
            className="h-11"
            onClick={() => setPreset('events')}
          >
            Simulate 09:07
          </Button>
        </div>
        <div className="rounded-lg border border-border p-6">
          <PlaylistTimeline items={demoItems} now={now} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="LobbyPlaylist.tsx"
          code={`import { PlaylistTimeline } from '@wallrun/shadcnui-signage';

const items = [
  {
    id: 'welcome',
    label: 'Welcome Loop',
    startsAt: '2026-05-10T09:00:00.000Z',
    endsAt: '2026-05-10T09:05:00.000Z',
    durationMs: 300000,
  },
  {
    id: 'events',
    label: 'Upcoming Events',
    startsAt: '2026-05-10T09:05:00.000Z',
    endsAt: '2026-05-10T09:10:00.000Z',
    durationMs: 300000,
    priority: 'priority',
  },
];

export function LobbyPlaylist() {
  return <PlaylistTimeline items={items} />;
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Operator Preview:</strong>{' '}
            Render the timeline in QA views so schedule defects are visible before
            a player publishes them.
          </div>
          <div>
            <strong className="text-foreground">Explicit Next State:</strong>{' '}
            Highlighting the next item reduces ambiguity when staff are waiting
            for a handoff or interruption slot.
          </div>
          <div>
            <strong className="text-foreground">Timezone Discipline:</strong>{' '}
            If schedules are authored centrally, pair the timeline with the same
            timezone rules as the production player.
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-playlisttimeline--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/PlaylistTimeline.tsx"
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