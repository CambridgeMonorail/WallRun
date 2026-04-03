import { FC } from 'react';
import { Button } from '@tsa/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { SplitScreen } from '@tsa/shadcnui-signage';

export const SplitScreenDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Layouts</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          SplitScreen
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Two-panel layout component with configurable split ratios, direction,
          and gap sizing for flexible signage layouts.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with CSS Grid for
            precise layout control.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>CSS Grid for deterministic two-column/row layouts</li>
            <li>
              Configurable split ratios (50/50, 60/40, 70/30, 40/60, 30/70)
            </li>
            <li>Horizontal or vertical split directions</li>
            <li>Adjustable gap sizes for visual separation</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="bg-slate-950 p-8 rounded-lg">
          <div style={{ height: '400px' }}>
            <SplitScreen
              ratio="60-40"
              direction="row"
              gap="md"
              primary={
                <div className="h-full bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl">
                    Main Content (60%)
                  </span>
                </div>
              }
              secondary={
                <div className="h-full bg-purple-900/50 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl">Sidebar (40%)</span>
                </div>
              }
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
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json split-screen"
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
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/layouts/SplitScreen.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-sm"
              >
                libs/shadcnui-signage/src/lib/layouts/SplitScreen.tsx
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
          filename="DualContent.tsx"
          code={`import { SplitScreen } from '@/components/signage/layouts/SplitScreen';

export function Dashboard() {
  return (
    <SplitScreen
      ratio="60-40"
      direction="row"
      gap="md"
      primary={<MainContent />}
      secondary={<Sidebar />}
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Fixed Layouts:</strong>{' '}
            SplitScreen provides deterministic layouts that won't reflow or
            break on fixed displays.
          </div>
          <div>
            <strong className="text-foreground">Common Patterns:</strong> 60/40
            ratio works well for main content + sidebar. 70/30 for content-heavy
            displays.
          </div>
          <div>
            <strong className="text-foreground">Vertical Splits:</strong> Use
            vertical direction for ticker tape + main content or header + body
            layouts.
          </div>
          <div>
            <strong className="text-foreground">Gap Sizing:</strong> Larger gaps
            (lg, xl) improve visual separation on large displays viewed from
            distance.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/layouts-splitscreen--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/layouts/SplitScreen.tsx"
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
