import { FC } from 'react';
import { Button } from '@tsa/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { SignageHeader } from '@tsa/shadcnui-signage';

export const SignageHeaderDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Layouts</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          SignageHeader
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Standard signage header with logo, title, subtitle, and optional
          metadata for consistent branding across screens.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with flexbox for
            responsive header layout.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Flexbox layout for logo, text, and metadata alignment</li>
            <li>Optional logo image support</li>
            <li>Hierarchical typography (title + subtitle)</li>
            <li>Optional date/time or metadata display</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="bg-slate-950 p-8 rounded-lg">
          <SignageHeader
            title="Welcome to WallRun"
            subtitle="Digital Signage Components"
          />
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
            code="npx shadcn add https://cambridgemonorail.github.io/WallRun/registry signage-header"
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
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/layouts/SignageHeader.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-sm"
              >
                libs/shadcnui-signage/src/lib/layouts/SignageHeader.tsx
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">
              2. Install dependencies
            </h3>
            <p className="text-sm text-muted-foreground">
              No additional dependencies required.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Dashboard.tsx"
          code={`import { SignageHeader } from '@/components/signage/layouts/SignageHeader';

export function Screen() {
  return (
    <SignageHeader
      title="Company Name"
      subtitle="Department or Location"
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Consistent Branding:</strong>{' '}
            Use SignageHeader across all screens for consistent visual identity.
          </div>
          <div>
            <strong className="text-foreground">Logo Sizing:</strong> Logos
            should be SVG or high-resolution PNG for crisp display at large
            sizes.
          </div>
          <div>
            <strong className="text-foreground">Date/Time Display:</strong>{' '}
            Consider updating the date prop for real-time displays using a
            timer.
          </div>
          <div>
            <strong className="text-foreground">Typography:</strong> Large text
            ensures readability from distance. Title is 5xl, subtitle is 2xl.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/layouts-signageheader--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/layouts/SignageHeader.tsx"
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
