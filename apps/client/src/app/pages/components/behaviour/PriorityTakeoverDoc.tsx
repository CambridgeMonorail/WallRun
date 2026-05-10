import { FC, useState } from 'react';
import { Button } from '@wallrun/shadcnui';
import { PriorityTakeover } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const PriorityTakeoverDocPage: FC = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          PriorityTakeover
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          A distinct interruption surface for urgent playlist overrides that
          still supports calm fallback content when inactive.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with playlist time
            formatting helpers and lucide-react alert iconography.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Returns fallback content when no interruption is active</li>
            <li>Differentiates priority and full takeover urgency levels</li>
            <li>Optionally exposes an active-until timestamp for operators</li>
            <li>Keeps emergency and service-interrupt states visually distinct</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <CodeSnippet
          language="bash"
          code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/priority-takeover.json"
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Example</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant={active ? 'secondary' : 'ghost'}
            className="h-11"
            onClick={() => setActive(true)}
          >
            Show takeover
          </Button>
          <Button
            variant={!active ? 'secondary' : 'ghost'}
            className="h-11"
            onClick={() => setActive(false)}
          >
            Show fallback
          </Button>
        </div>

        <div className="rounded-lg border border-border p-6">
          <PriorityTakeover
            active={active}
            title="Building access paused"
            message="Use the staffed entrance on the west side while the main doors are inspected."
            priority="takeover"
            activeUntil="2026-05-10T09:20:00.000Z"
            fallback={
              <div className="rounded-[1.25rem] border border-border bg-muted p-6 text-lg text-muted-foreground">
                Normal playlist content is active.
              </div>
            }
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="InterruptLayer.tsx"
          code={`import { PriorityTakeover } from '@wallrun/shadcnui-signage';

export function InterruptLayer() {
  return (
    <PriorityTakeover
      active
      title="Safety advisory"
      message="Please use the alternate lift while maintenance is underway."
      priority="takeover"
      activeUntil="2026-05-10T09:20:00.000Z"
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Escalation Control:</strong>{' '}
            Reserve full takeover styling for content that should interrupt the
            normal loop immediately.
          </div>
          <div>
            <strong className="text-foreground">Fallback Behaviour:</strong>{' '}
            Provide a stable non-alert state so the screen remains useful once
            the interruption expires.
          </div>
          <div>
            <strong className="text-foreground">Operator Clarity:</strong>{' '}
            Showing an expiry time helps staff confirm whether a takeover is
            stale or still intentionally active.
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-prioritytakeover--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/PriorityTakeover.tsx"
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