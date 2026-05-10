import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { LoopProgress } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const LoopProgressDocPage: FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          LoopProgress
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          A dwell-progress indicator for the currently active playlist item with
          explicit elapsed and remaining time.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built from semantic HTML and
            playlist duration formatting helpers.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Exposes a standard progressbar for assistive technology</li>
            <li>Clamps invalid elapsed values to safe display bounds</li>
            <li>Shows both percent complete and time remaining</li>
            <li>Works well as a secondary operator cue beside active content</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <CodeSnippet
          language="bash"
          code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/loop-progress.json"
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Example</h2>
        <div className="space-y-6 rounded-lg border border-border p-6">
          <LoopProgress
            label="Welcome loop dwell"
            elapsedMs={95 * 1000}
            durationMs={180 * 1000}
          />
          <LoopProgress
            label="Takeover expiry"
            elapsedMs={35 * 1000}
            durationMs={45 * 1000}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="ActiveSlotProgress.tsx"
          code={`import { LoopProgress } from '@wallrun/shadcnui-signage';

export function ActiveSlotProgress() {
  return (
    <LoopProgress
      label="Current menu item"
      elapsedMs={90000}
      durationMs={180000}
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Keep It Secondary:</strong>{' '}
            Progress bars help operators and preview screens, but public content
            should remain the dominant element.
          </div>
          <div>
            <strong className="text-foreground">Dwell Debugging:</strong> Use
            progress display during QA to spot items with unrealistic duration
            values before publishing.
          </div>
          <div>
            <strong className="text-foreground">Accessible State:</strong>{' '}
            The semantic progressbar makes the timing state readable in browser
            tooling and assistive technologies.
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-loopprogress--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/LoopProgress.tsx"
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