import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { QRHandoff } from '@wallrun/shadcnui-signage';
import { CodeSnippet } from '../../../components/CodeSnippet';

export const QRHandoffDocPage: FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Blocks</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          QRHandoff
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Composed phone-handoff surface that combines explanatory copy,
          ActionStrip emphasis, and a QRCodeCallout into one reusable CTA zone.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>ActionStrip + QRCodeCallout</strong> - Composes the lower
            level CTA primitives instead of reimplementing them.
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Uses ActionStrip for the explanatory copy zone</li>
            <li>Uses QRCodeCallout for the scan target and manual fallback</li>
            <li>Fits event, lobby, and service continuation use cases</li>
            <li>Designed for landscape or portrait signage layouts</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Example</h2>
        <div className="rounded-lg bg-slate-950 p-8">
          <QRHandoff
            title="Take the schedule with you"
            description="Scan to continue on your phone with room changes, session reminders, and venue navigation."
            qrValue="https://wallrun.dev/app"
            qrLabel="Conference companion app"
            qrInstruction="Scan for personal agenda and venue guidance"
            shortUrl="wallrun.dev/app"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <p className="mb-4 text-muted-foreground">
          Copy the source code into your project. Manual installs also need the
          `qrcode.react` package used by QRCodeCallout.
        </p>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium">Using the CLI (Recommended)</h3>
          <CodeSnippet
            language="bash"
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json qr-handoff"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-medium">1. Copy the component</h3>
            <p className="text-muted-foreground">
              <a
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/QRHandoff.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-mono text-sm text-blue-400 hover:text-blue-300 hover:underline"
              >
                libs/shadcnui-signage/src/lib/blocks/QRHandoff.tsx
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
          filename="EventScheduleFooter.tsx"
          code={`import { QRHandoff } from '@wallrun/shadcnui-signage';

export function EventScheduleFooter() {
  return (
    <QRHandoff
      title="Take the schedule with you"
      description="Scan to continue on your phone with room changes, session reminders, and venue navigation."
      qrValue="https://wallrun.dev/app"
      qrLabel="Conference companion app"
      qrInstruction="Scan for personal agenda and venue guidance"
      shortUrl="wallrun.dev/app"
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Continuation Pattern:</strong>{' '}
            Use QRHandoff when the screen needs to explain what moves to the
            viewer's device, not just show a raw QR code.
          </div>
          <div>
            <strong className="text-foreground">Message Hierarchy:</strong>{' '}
            Keep the title outcome-focused and use the description for a single
            sentence about the benefit or next step.
          </div>
          <div>
            <strong className="text-foreground">Layout Fit:</strong> The block
            is most effective in wide footer or side-panel zones, but it also
            supports portrait handoff layouts through Storybook and demo usage.
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/signage-blocks-qrhandoff--documentation"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/QRHandoff.tsx"
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