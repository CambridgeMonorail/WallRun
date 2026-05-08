import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { ActionStrip } from '@wallrun/shadcnui-signage';
import { Smartphone } from 'lucide-react';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const ActionStripDocPage: FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Primitives</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          ActionStrip
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Reusable CTA shell for footer strips and side-zone handoff messaging
          on signage layouts.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with semantic HTML,
            Tailwind CSS, and the shared signage `cn()` utility.
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Supports bottom, left, and right CTA placement zones</li>
            <li>Uses tone variants for neutral, brand, and urgent emphasis</li>
            <li>Accepts optional leading visuals and action content</li>
            <li>
              Preserves stable data attributes for compatibility wrappers such
              as `CTABanner`
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Examples</h2>
        <div className="space-y-6">
          <div className="rounded-lg bg-slate-950 p-8">
            <ActionStrip
              message="Continue on your phone for live agenda updates and personalized reminders"
              tone="brand"
              position="bottom"
              leadingVisual={<Smartphone className="h-8 w-8" aria-hidden="true" />}
              action={
                <a
                  href="https://wallrun.dev/app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/40"
                >
                  Open agenda
                </a>
              }
            />
          </div>
          <div className="rounded-lg bg-slate-950 p-8">
            <ActionStrip
              message="Use the west entrance and scan for overflow seating guidance"
              tone="urgent"
              position="right"
              action={
                <a
                  href="https://wallrun.dev/overflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/40"
                >
                  View overflow route
                </a>
              }
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <p className="mb-4 text-muted-foreground">
          Copy the source code into your project. This primitive has no external
          runtime dependencies beyond React.
        </p>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium">Using the CLI (Recommended)</h3>
          <CodeSnippet
            language="bash"
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json action-strip"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-medium">Manual Installation</h3>
            <p className="text-muted-foreground">
              <a
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/ActionStrip.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-mono text-sm text-blue-400 hover:text-blue-300 hover:underline"
              >
                libs/shadcnui-signage/src/lib/primitives/ActionStrip.tsx
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="EventFooter.tsx"
          code={`import { ActionStrip } from '@wallrun/shadcnui-signage';

export function EventFooter() {
  return (
    <ActionStrip
      message="Continue on your phone for live agenda updates and personalized reminders"
      position="bottom"
      tone="brand"
      action={
        <a href="https://wallrun.dev/app" target="_blank" rel="noopener noreferrer">
          Open agenda
        </a>
      }
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">One CTA Zone:</strong> Use
            ActionStrip for a single dominant next step, not for clusters of
            competing actions.
          </div>
          <div>
            <strong className="text-foreground">Placement Discipline:</strong>{' '}
            Bottom strips work for persistent handoff actions, while left and
            right variants fit side-zone layouts or poster compositions.
          </div>
          <div>
            <strong className="text-foreground">Distance Readability:</strong>{' '}
            Keep the copy short enough to read at a glance and reserve the
            action element for the single most important continuation path.
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-primitives-actionstrip--documentation"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/ActionStrip.tsx"
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