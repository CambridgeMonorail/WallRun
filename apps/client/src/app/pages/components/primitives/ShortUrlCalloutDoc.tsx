import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { ShortUrlCallout } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const ShortUrlCalloutDocPage: FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Primitives</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          ShortUrlCallout
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Large-format readable URL treatment for manual fallback when viewers
          cannot or do not scan a QR code.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with semantic HTML,
            Tailwind CSS, and monospaced type for stable URL rendering.
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Supports inline, panel, and strip variants</li>
            <li>Separates the prefix, URL, and optional label clearly</li>
            <li>Uses font-mono styling to improve URL legibility</li>
            <li>Works standalone or as a fallback inside QR surfaces</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Examples</h2>
        <div className="space-y-6 rounded-lg bg-slate-950 p-8">
          <ShortUrlCallout url="wallrun.dev/check-in" label="Visitor self check-in" />
          <ShortUrlCallout
            url="wallrun.dev/support"
            label="Support portal"
            variant="panel"
          />
          <ShortUrlCallout
            url="wallrun.dev/app"
            label="Conference companion app"
            variant="strip"
          />
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
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json short-url-callout"
          />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-medium">Manual Installation</h3>
          <p className="text-muted-foreground">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/ShortUrlCallout.tsx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-mono text-sm text-blue-400 hover:text-blue-300 hover:underline"
            >
              libs/shadcnui-signage/src/lib/primitives/ShortUrlCallout.tsx
            </a>
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="FallbackPanel.tsx"
          code={`import { ShortUrlCallout } from '@wallrun/shadcnui-signage';

export function FallbackPanel() {
  return (
    <ShortUrlCallout
      url="wallrun.dev/check-in"
      label="Visitor self check-in"
      variant="panel"
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Fallback First:</strong> Use
            ShortUrlCallout anywhere a QR-dependent flow needs a manual recovery
            path.
          </div>
          <div>
            <strong className="text-foreground">URL Length:</strong> Keep the
            URL short and predictable enough to type from distance.
          </div>
          <div>
            <strong className="text-foreground">Variant Choice:</strong>{' '}
            Panel works for standalone fallback zones, strip works inside QR
            cards, and inline works in compact CTA contexts.
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-primitives-shorturlcallout--documentation"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/ShortUrlCallout.tsx"
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