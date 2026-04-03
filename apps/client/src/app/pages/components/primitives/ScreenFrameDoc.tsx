import { FC } from 'react';
import { Button } from '@tsa/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { ScreenFrame } from '@tsa/shadcnui-signage';

export const ScreenFrameDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Primitives</p>

        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          ScreenFrame
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Preview container for signage screens that enforces fixed aspect
          ratios and resolutions for accurate content preview.
        </p>
      </div>

      {/* Built On */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with native HTML and
            CSS transforms.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses CSS transforms for scaling preview content</li>
            <li>
              Enforces exact aspect ratios for 1080p, 4K, and vertical displays
            </li>
            <li>Optional safe area overlay for QA and content review</li>
            <li>Deterministic sizing ensures WYSIWYG preview</li>
          </ul>
        </div>
      </section>

      {/* Live Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Example</h2>
        <div className="bg-slate-950 p-8 rounded-lg overflow-auto">
          <div className="flex justify-center">
            <ScreenFrame resolution="1080p" scale={0.3} showSafeArea>
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-6xl font-bold mb-4">Welcome</h1>
                  <p className="text-3xl">1080p Preview</p>
                </div>
              </div>
            </ScreenFrame>
          </div>
        </div>
      </section>

      {/* Installation */}
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
            code="npx shadcn add https://cambridgemonorail.github.io/WallRun/registry screen-frame"
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
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/ScreenFrame.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-sm"
              >
                libs/shadcnui-signage/src/lib/primitives/ScreenFrame.tsx
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

      {/* Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Preview.tsx"
          code={`import { ScreenFrame } from '@/components/signage/primitives/ScreenFrame';

export function SignagePreview() {
  return (
    <ScreenFrame 
      resolution="1080p" 
      scale={0.5} 
      showSafeArea
    >
      <YourSignageContent />
    </ScreenFrame>
  );
}`}
        />
      </section>

      {/* Signage Notes */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Development Preview:</strong>{' '}
            ScreenFrame is primarily a development and QA tool. It allows you to
            preview signage content at exact target resolutions during
            development.
          </div>
          <div>
            <strong className="text-foreground">
              Aspect Ratio Enforcement:
            </strong>{' '}
            Ensures content maintains the correct aspect ratio (16:9, 16:10,
            9:16) regardless of the browser window size.
          </div>
          <div>
            <strong className="text-foreground">Safe Area Overlay:</strong>{' '}
            Enable{' '}
            <code className="bg-muted px-1 py-0.5 rounded">showSafeArea</code>{' '}
            to visualize the 5% margin where content should be kept for optimal
            viewing on various displays.
          </div>
          <div>
            <strong className="text-foreground">Scale for Testing:</strong> Use
            the <code className="bg-muted px-1 py-0.5 rounded">scale</code> prop
            to fit full-resolution content in smaller viewports during
            development.
          </div>
          <div>
            <strong className="text-foreground">Production Use:</strong> In
            production deployments on BrightSign or similar devices, ScreenFrame
            is typically not needed as the display itself enforces the
            resolution.
          </div>
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Props</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium">Prop</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Default</th>
                <th className="text-left p-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-4 font-mono text-sm">resolution</td>
                <td className="p-4 font-mono text-sm">Resolution</td>
                <td className="p-4 font-mono text-sm">'1080p'</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Target resolution ('1080p', '4k', '1080p-vertical', etc.)
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">scale</td>
                <td className="p-4 font-mono text-sm">number</td>
                <td className="p-4 font-mono text-sm">1</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Scale factor for preview (0.5 = 50% size)
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">showSafeArea</td>
                <td className="p-4 font-mono text-sm">boolean</td>
                <td className="p-4 font-mono text-sm">false</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Show safe area overlay for QA
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">children</td>
                <td className="p-4 font-mono text-sm">ReactNode</td>
                <td className="p-4 font-mono text-sm">-</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Content to render within the frame
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">className</td>
                <td className="p-4 font-mono text-sm">string</td>
                <td className="p-4 font-mono text-sm">''</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Additional CSS classes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Links */}
      <section>
        <h2 className="text-2xl font-medium mb-4">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/primitives-screenframe--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/ScreenFrame.tsx"
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
