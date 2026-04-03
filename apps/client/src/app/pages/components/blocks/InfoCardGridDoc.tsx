import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { InfoCardGrid } from '@wallrun/shadcnui-signage';

export const InfoCardGridDocPage: FC = () => {
  const sampleItems = [
    {
      title: 'Fast Performance',
      description: 'Optimized for long-running displays',
      icon: '⚡',
    },
    {
      title: 'Easy Setup',
      description: 'Simple installation and configuration',
      icon: '🎯',
    },
    {
      title: 'Flexible Layouts',
      description: 'Adapts to your content needs',
      icon: '📐',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Blocks</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          InfoCardGrid
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Grid layouts for displaying multiple information cards with
          configurable columns and consistent spacing.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with CSS Grid for
            responsive card layouts.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>CSS Grid for automatic card distribution</li>
            <li>Configurable column counts (2, 3, 4 columns)</li>
            <li>Consistent gap sizing between cards</li>
            <li>Accepts array of InfoCardItem data</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="bg-slate-950 p-8 rounded-lg">
          <InfoCardGrid items={sampleItems} columns={3} />
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
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json info-card-grid"
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
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/InfoCardGrid.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-sm"
              >
                libs/shadcnui-signage/src/lib/blocks/InfoCardGrid.tsx
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
          filename="Features.tsx"
          code={`import { InfoCardGrid } from '@/components/signage/blocks/InfoCardGrid';

const features = [
  {
    title: 'Fast Performance',
    description: 'Optimized for long-running displays',
    icon: '⚡',
  },
  {
    title: 'Easy Setup',
    description: 'Simple installation',
    icon: '🎯',
  },
];

export function Features() {
  return <InfoCardGrid items={features} columns={2} />;
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Column Selection:</strong> 2-3
            columns work best for distance viewing. 4 columns for closer
            displays.
          </div>
          <div>
            <strong className="text-foreground">Content Uniformity:</strong>{' '}
            Keep card content length similar for visual balance.
          </div>
          <div>
            <strong className="text-foreground">Icon Usage:</strong> Icons or
            emojis provide quick visual scanning points.
          </div>
          <div>
            <strong className="text-foreground">Grid Stability:</strong> Fixed
            column counts prevent layout shifts during content updates.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/blocks-infocardgrid--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/InfoCardGrid.tsx"
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
