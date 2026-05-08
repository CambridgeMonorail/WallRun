import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { ContentExpiredWarning } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const ContentExpiredWarningDocPage: FC = () => {
  const now = () => new Date('2026-05-07T10:00:00.000Z').getTime();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Behaviour</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          ContentExpiredWarning
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Expiration marker for preview, QA, and operator contexts when content
          is beyond its approved display window.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Examples</h2>
        <div className="space-y-6 rounded-lg bg-slate-950 p-8 text-white">
          <ContentExpiredWarning
            expiredAt="2026-05-07T09:45:00.000Z"
            now={now}
          />
          <ContentExpiredWarning
            expiredAt="2026-05-07T09:00:00.000Z"
            now={now}
            variant="panel"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <CodeSnippet
          language="bash"
          code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json content-expired-warning"
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="PreviewOverlay.tsx"
          code={`import { ContentExpiredWarning } from '@wallrun/shadcnui-signage';

export function PreviewOverlay() {
  return (
    <ContentExpiredWarning
      expiredAt="2026-05-07T09:45:00.000Z"
      variant="badge"
    />
  );
}`}
        />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-behaviour-contentexpiredwarning--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/behaviour/ContentExpiredWarning.tsx"
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
