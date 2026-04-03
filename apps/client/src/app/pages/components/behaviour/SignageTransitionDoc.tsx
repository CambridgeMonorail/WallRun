import { FC, useState } from 'react';
import { Button } from '@wallrun/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { SignageTransition } from '@wallrun/shadcnui-signage';

export const SignageTransitionDocPage: FC = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          SignageTransition
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Predictable, signage-safe transitions (crossfade or slide) with
          reduced-motion handling.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with CSS transitions.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>CSS-based transitions (crossfade, slide-left, slide-up)</li>
            <li>Respects prefers-reduced-motion accessibility preference</li>
            <li>Configurable duration and reduced-motion behavior</li>
            <li>Wraps single child with transition effects</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <CodeSnippet
          language="bash"
          code={`npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json signage-transition`}
        />
        <p className="text-muted-foreground mt-4">
          Or{' '}
          <a
            href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/SignageTransition.tsx"
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
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="secondary"
            onClick={() => setStep((s) => (s + 1) % 3)}
          >
            Next
          </Button>
        </div>
        <div className="border border-border rounded-lg p-6 min-h-[140px]">
          <SignageTransition type="crossfade" durationMs={280}>
            <div className="rounded-md border border-border p-6">
              <div className="text-sm text-muted-foreground">State</div>
              <div className="text-2xl font-medium">{step + 1}</div>
            </div>
          </SignageTransition>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="RotatingPanel.tsx"
          code={`import { SignageTransition } from '@wallrun/shadcnui-signage';

export function RotatingPanel({ children }: { children: React.ReactNode }) {
  return (
    <SignageTransition type="slide-left" durationMs={300}>
      {children}
    </SignageTransition>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Transition Types:</strong>{' '}
            Crossfade for unrelated content; slide for sequential or directional
            flow.
          </div>
          <div>
            <strong className="text-foreground">Duration:</strong> Keep
            transitions brief (250-400ms). Longer durations feel sluggish on
            large displays.
          </div>
          <div>
            <strong className="text-foreground">Accessibility:</strong>{' '}
            Reduced-motion preferences are respected automatically; choose
            "shorten" or "disable" behavior.
          </div>
          <div>
            <strong className="text-foreground">Performance:</strong> CSS
            transitions are GPU-accelerated and performant for always-on
            displays.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-signagetransition--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/SignageTransition.tsx"
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
