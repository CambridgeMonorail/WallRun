import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { QRCodeCallout } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const QRCodeCalloutDocPage: FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Primitives</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          QRCodeCallout
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Scan-safe QR surface with visible destination context and an optional
          short URL fallback.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>QRCodeSVG from qrcode.react</strong> - Renders stable SVG QR
            markup for crisp signage output.
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Uses SVG output for deterministic rendering at signage sizes</li>
            <li>Supports size and error-correction variants</li>
            <li>Includes visible label and instruction text above the code</li>
            <li>Can embed ShortUrlCallout as the manual fallback path</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Examples</h2>
        <div className="rounded-lg bg-slate-950 p-8">
          <div className="flex justify-center">
            <QRCodeCallout
              value="https://wallrun.dev/app"
              label="Conference companion app"
              instruction="Scan for personal agenda and venue guidance"
              shortUrl="wallrun.dev/app"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <p className="mb-4 text-muted-foreground">
          Copy the source code into your project. Manual installs also need the
          `qrcode.react` package.
        </p>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium">Using the CLI (Recommended)</h3>
          <CodeSnippet
            language="bash"
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json qr-code-callout"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-medium">1. Copy the component</h3>
            <p className="text-muted-foreground">
              <a
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/QRCodeCallout.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-mono text-sm text-blue-400 hover:text-blue-300 hover:underline"
              >
                libs/shadcnui-signage/src/lib/primitives/QRCodeCallout.tsx
              </a>
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">2. Install dependencies</h3>
            <CodeSnippet language="bash" code="pnpm add qrcode.react" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="PosterCTA.tsx"
          code={`import { QRCodeCallout } from '@wallrun/shadcnui-signage';

export function PosterCTA() {
  return (
    <QRCodeCallout
      value="https://wallrun.dev/app"
      label="Conference companion app"
      instruction="Scan for personal agenda and venue guidance"
      shortUrl="wallrun.dev/app"
      size="lg"
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Destination Context:</strong>{' '}
            Always pair the QR with a human-readable label and instruction so
            viewers know what will happen after scanning.
          </div>
          <div>
            <strong className="text-foreground">Fallback Required:</strong>{' '}
            Provide `shortUrl` when the flow matters enough that scan failures
            need a manual recovery path.
          </div>
          <div>
            <strong className="text-foreground">Print Area:</strong> Keep the
            QR surface on stable, high-contrast backgrounds without overlaid
            effects or tight cropping.
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-primitives-qrcodecallout--documentation"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/QRCodeCallout.tsx"
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