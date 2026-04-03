import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { SignageContainer } from '@wallrun/shadcnui-signage';

export const SignageContainerDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Layouts</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          SignageContainer
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Full-screen container with ambient effects, gradient backgrounds, and
          optional grid overlays for immersive signage experiences.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with CSS gradients and
            animations.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>CSS gradients for ambient background effects</li>
            <li>
              Multiple color variants (emerald, teal, blue, violet, indigo,
              pink, orange, cyan)
            </li>
            <li>Optional animated ambient orbs for visual interest</li>
            <li>Optional grid overlay for layout assistance</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="bg-slate-950 rounded-lg overflow-hidden">
          <div style={{ height: '400px' }}>
            <SignageContainer
              variant="blue"
              showGrid={false}
              showAmbientOrbs={true}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                  <h1 className="text-6xl font-bold mb-4">Welcome</h1>
                  <p className="text-3xl text-blue-200">
                    Blue variant with ambient orbs
                  </p>
                </div>
              </div>
            </SignageContainer>
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
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json signage-container"
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
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/layouts/SignageContainer.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-sm"
              >
                libs/shadcnui-signage/src/lib/layouts/SignageContainer.tsx
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
          filename="App.tsx"
          code={`import { SignageContainer } from '@/components/signage/layouts/SignageContainer';

export function WelcomeScreen() {
  return (
    <SignageContainer 
      variant="blue"
      showAmbientOrbs={true}
      showGrid={false}
    >
      <YourContent />
    </SignageContainer>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Ambient Effects:</strong> Subtle
            gradients and orbs add visual depth without distracting from
            content.
          </div>
          <div>
            <strong className="text-foreground">Color Variants:</strong> Choose
            variants that complement your brand or content theme. Blue/teal for
            corporate, pink/purple for events.
          </div>
          <div>
            <strong className="text-foreground">Grid Overlay:</strong> Enable
            during development to ensure content alignment, disable in
            production.
          </div>
          <div>
            <strong className="text-foreground">Performance:</strong> Ambient
            orbs use CSS animations which are GPU-accelerated and performant.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/layouts-signagecontainer--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/layouts/SignageContainer.tsx"
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
