import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { CodeSnippet } from '../../../components/CodeSnippet';
import { MetricCard } from '@wallrun/shadcnui-signage';
import { DollarSign, Users } from 'lucide-react';

export const MetricCardDocPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">Primitives</p>

        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          MetricCard
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          Display KPIs and metrics with values, change indicators, and icons.
          Optimized for distance readability on signage displays.
        </p>
      </div>

      {/* Built On */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">
            <strong>No shadcn primitives</strong> - Built with native HTML and
            Tailwind CSS.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses Lucide icons for visual indicators</li>
            <li>
              Gradient styling inspired by shadcn Card but customized for
              distance readability
            </li>
            <li>
              Large typography (7xl value, 3xl labels) for 10-foot viewing
              distance
            </li>
            <li>High-contrast color scheme for ambient lighting conditions</li>
          </ul>
        </div>
      </section>

      {/* Live Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Examples</h2>

        <div className="space-y-6">
          <div className="bg-slate-950 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard
                title="Total Revenue"
                value="$1.2M"
                change="+12.5%"
                isPositive={true}
                icon={<DollarSign className="w-14 h-14" />}
              />
              <MetricCard
                title="Active Users"
                value="8,432"
                change="-3.2%"
                isPositive={false}
                icon={<Users className="w-14 h-14" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          Copy the source code into your project. This component is designed to
          be copied and customized to your needs.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">
            Using the CLI (Recommended)
          </h3>
          <CodeSnippet
            language="bash"
            code="npx shadcn@latest add https://cambridgemonorail.github.io/WallRun/registry/registry.json metric-card"
          />
          <p className="text-sm text-muted-foreground mt-2">
            This will copy the component and install dependencies automatically.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-3">Manual Installation</h3>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Copy the component</h3>
            <p className="text-muted-foreground">
              <a
                href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/MetricCard.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-mono text-sm text-blue-400 hover:text-blue-300 hover:underline"
              >
                libs/shadcnui-signage/src/lib/primitives/MetricCard.tsx
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

      {/* Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename="Dashboard.tsx"
          code={`import { MetricCard } from '@/components/signage/primitives/MetricCard';
import { DollarSign } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <MetricCard
        title="Total Revenue"
        value="$1.2M"
        change="+12.5% vs last month"
        isPositive={true}
        icon={<DollarSign className="w-14 h-14" />}
      />
    </div>
  );
}`}
        />
      </section>

      {/* Signage Notes */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <strong className="text-foreground">Distance Readability:</strong>{' '}
            Uses 7xl font for values and 3xl for labels, optimized for viewing
            from 10+ feet away. The large icon (14×14) provides immediate visual
            recognition.
          </div>
          <div>
            <strong className="text-foreground">High Contrast:</strong> Dark
            gradient background with bright text ensures readability under
            various ambient lighting conditions. The gradient includes hover
            effects that can be useful for interactive displays.
          </div>
          <div>
            <strong className="text-foreground">Long-Running Display:</strong>{' '}
            Static content with minimal animations reduces the risk of screen
            burn-in on long-term displays. The subtle ambient glow on hover is
            optional and can be disabled if needed.
          </div>
          <div>
            <strong className="text-foreground">Data Updates:</strong> Values
            should be updated via props. Consider wrapping with a data-fetching
            component for real-time metrics. Update frequency should be balanced
            against display refresh needs (typically 30-60 seconds for
            dashboards).
          </div>
          <div>
            <strong className="text-foreground">Performance:</strong>{' '}
            Lightweight component with no external dependencies beyond Lucide
            icons. Renders efficiently even when displaying multiple cards
            simultaneously.
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
                <th className="text-left p-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-4 font-mono text-sm">title</td>
                <td className="p-4 font-mono text-sm">string</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Metric title/label
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">value</td>
                <td className="p-4 font-mono text-sm">string</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Main metric value
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">change</td>
                <td className="p-4 font-mono text-sm">string</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Change indicator text (e.g., "+12.5% vs last month")
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">isPositive</td>
                <td className="p-4 font-mono text-sm">boolean</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Whether the change is positive (green) or negative (red)
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">icon</td>
                <td className="p-4 font-mono text-sm">ReactNode</td>
                <td className="p-4 text-sm text-muted-foreground">
                  Icon to display (Lucide icon component)
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">className</td>
                <td className="p-4 font-mono text-sm">string</td>
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
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://cambridgemonorail.github.io/WallRun/storybook/?path=/docs/primitives-metriccard--docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Storybook
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href="https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/MetricCard.tsx"
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
