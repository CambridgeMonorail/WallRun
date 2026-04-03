import { FC } from 'react';
import { Button } from '@tsa/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { AnnouncementCard } from '@tsa/shadcnui-signage';
import { Calendar, PartyPopper } from 'lucide-react';

export const AnnouncementCardDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Primitives</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          AnnouncementCard
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Display announcements with title, description, date, icon, and
          category for bulletin boards and notification displays.
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
            <li>Uses Lucide icons for categorical identification</li>
            <li>Frosted glass effect (backdrop-blur) for visual depth</li>
            <li>Large typography for distance readability</li>
            <li>Category badge system for announcement classification</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Examples</h2>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnnouncementCard
              title="Team Building Event"
              description="Join us for our quarterly team building event at the park."
              date="Friday, Feb 14"
              icon={Calendar}
              category="Event"
            />
            <AnnouncementCard
              title="Holiday Party"
              description="Annual holiday celebration in the main conference hall."
              date="December 20"
              icon={PartyPopper}
              category="Celebration"
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
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json announcement-card"
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
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/AnnouncementCard.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-sm"
              >
                libs/shadcnui-signage/src/lib/primitives/AnnouncementCard.tsx
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
          filename="Announcements.tsx"
          code={`import { AnnouncementCard } from '@/components/signage/primitives/AnnouncementCard';
import { Calendar } from 'lucide-react';

export function Announcements() {
  return (
    <AnnouncementCard
      title="Team Building Event"
      description="Join us for our quarterly team building event."
      date="Friday, Feb 14"
      icon={Calendar}
      category="Event"
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Glass Morphism:</strong>{' '}
            Backdrop blur effect works best over gradient or image backgrounds,
            creating visual depth.
          </div>
          <div>
            <strong className="text-foreground">Icon Selection:</strong> Choose
            icons that clearly represent the announcement category for quick
            visual scanning.
          </div>
          <div>
            <strong className="text-foreground">Content Length:</strong> Keep
            descriptions concise (2-3 lines) for optimal readability from
            distance.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/primitives-announcementcard--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/AnnouncementCard.tsx"
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
