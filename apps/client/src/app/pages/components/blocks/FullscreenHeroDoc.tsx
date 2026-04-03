import { FC } from 'react';
import { Button } from '@tsa/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { FullscreenHero } from '@tsa/shadcnui-signage';

export const FullscreenHeroDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Blocks</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          FullscreenHero
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Hero sections optimized for full-screen signage displays with title,
          description, and optional call-to-action.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>SignageContainer</strong> - Wraps content in ambient
            background container.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Built on SignageContainer for consistent ambient effects</li>
            <li>Flexbox centering for optimal content positioning</li>
            <li>Large typography hierarchy (8xl title, 3xl description)</li>
            <li>Optional CTA button integration</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="bg-slate-950 rounded-lg overflow-hidden">
          <div style={{ height: '500px' }}>
            <FullscreenHero
              title="Welcome to Our Office"
              subtitle="Building a better future together"
              variant="light"
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
            code="npx shadcn add https://cambridgemonorail.github.io/WallRun/registry fullscreen-hero"
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
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/FullscreenHero.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-sm"
              >
                libs/shadcnui-signage/src/lib/blocks/FullscreenHero.tsx
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">
              2. Install dependencies
            </h3>
            <CodeSnippet language="bash" code="pnpm add lucide-react" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Welcome.tsx"
          code={`import { FullscreenHero } from '@/components/signage/blocks/FullscreenHero';

export function Welcome() {
  return (
    <FullscreenHero
      title="Welcome"
      subtitle="Building a better future together"
      variant="light"
      cta={{ label: "Learn More" }}
    />
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Single Message Focus:</strong>{' '}
            Hero sections work best with one clear message. Avoid information
            overload.
          </div>
          <div>
            <strong className="text-foreground">Ultra-Large Typography:</strong>{' '}
            8xl title ensures readability from extreme distances (20+ feet).
          </div>
          <div>
            <strong className="text-foreground">Ambient Backgrounds:</strong>{' '}
            Inherits SignageContainer variants for consistent theming across
            screens.
          </div>
          <div>
            <strong className="text-foreground">CTA Usage:</strong> CTAs are
            optional and most useful for interactive signage displays.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/blocks-fullscreenhero--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/FullscreenHero.tsx"
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
