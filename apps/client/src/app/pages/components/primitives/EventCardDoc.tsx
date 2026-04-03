import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { EventCard } from '@wallrun/shadcnui-signage';

export const EventCardDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Primitives</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          EventCard
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Display event information with time, title, speaker, location, and
          track for conference schedules and event displays.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with native HTML and
            Tailwind CSS.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses Lucide icons (Clock, MapPin) for visual indicators</li>
            <li>
              Gradient background with accent color bar for track categorization
            </li>
            <li>Large typography optimized for distance viewing</li>
            <li>Track color system for visual event categorization</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="bg-slate-950 p-8 rounded-lg">
          <div className="space-y-4">
            <EventCard
              time="9:00 AM"
              title="Opening Keynote: The Future of Digital Signage"
              speaker="Dr. Sarah Chen"
              room="Main Auditorium"
              track="Keynote"
            />
            <EventCard
              time="10:30 AM"
              title="Building Scalable React Components"
              speaker="Alex Martinez"
              room="Room 301"
              track="Technical"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          Copy the source code into your project.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">
            Using the CLI (Recommended)
          </h3>
          <CodeSnippet
            language="bash"
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json event-card"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-3">Manual Installation</h3>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Copy the component</h3>
            <p className="text-muted-foreground">
              <a
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/EventCard.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-sm"
              >
                libs/shadcnui-signage/src/lib/primitives/EventCard.tsx
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">
              2. Install dependencies
            </h3>
            <CodeSnippet language="bash" code="pnpm add lucide-react" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="EventSchedule.tsx"
          code={`import { EventCard } from '@/components/signage/primitives/EventCard';

export function EventSchedule() {
  return (
    <div className="space-y-4">
      <EventCard
        time="9:00 AM"
        title="Opening Keynote"
        speaker="Dr. Sarah Chen"
        room="Main Auditorium"
        track="Keynote"
      />
    </div>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Track Color Coding:</strong>{' '}
            Predefined colors for common tracks (Keynote, Technical, Design,
            Business, Social) help attendees quickly identify session types.
          </div>
          <div>
            <strong className="text-foreground">Time Prominence:</strong> Large
            time display (4xl) on the left ensures quick scanning for schedule
            planning.
          </div>
          <div>
            <strong className="text-foreground">
              Hierarchical Information:
            </strong>{' '}
            Title is most prominent (2xl), followed by speaker and room details
            for logical information priority.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/primitives-eventcard--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/EventCard.tsx"
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
