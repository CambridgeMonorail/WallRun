import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Bot, FileText, Code, Package } from 'lucide-react';

type HowToGuide = {
  title: string;
  description: string;
  path: string;
  icon: typeof Bot;
  category: 'workflow' | 'tools';
};

const guides: HowToGuide[] = [
  {
    title: 'Using Custom Agents',
    description:
      'Learn how custom GitHub Copilot agents work, how to invoke them, and which agents are available in this repository.',
    path: '/how-to/custom-agents',
    icon: Bot,
    category: 'tools',
  },
  {
    title: 'Create a Design Brief',
    description:
      'Use the Signage Design Brief Writer agent to create comprehensive markdown design briefs for digital signage projects.',
    path: '/how-to/design-brief',
    icon: FileText,
    category: 'workflow',
  },
  {
    title: 'Build a Signage Screen',
    description:
      'Implement production-ready signage screens using the signage-architect agent. Build from design briefs with signage-safe layouts and components.',
    path: '/how-to/build-signage',
    icon: Code,
    category: 'workflow',
  },
  {
    title: 'Deploy to BrightSign Players',
    description:
      'Package and deploy React apps to BrightSign OS 9.x players using the BrightSign Deploy agent. Includes debugging and diagnostics.',
    path: '/how-to/deploy-brightsign',
    icon: Package,
    category: 'workflow',
  },
];

const GuideCard: FC<{ guide: HowToGuide }> = ({ guide }) => {
  const Icon = guide.icon;
  return (
    <Link
      to={guide.path}
      className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-md bg-muted p-2 text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-medium text-foreground group-hover:text-accent-foreground">
            {guide.title}
          </h3>
          <p className="text-sm text-muted-foreground">{guide.description}</p>
        </div>
      </div>
    </Link>
  );
};

/**
 * HowTo - Index page for practical how-to guides
 */
export const HowToPage: FC = () => {
  return (
    <div className="doc-shell max-w-5xl font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">Documentation</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          How To Guides
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Practical step-by-step guides for common workflows and tools in The
          Sign Age ecosystem. Learn how to use custom agents, build signage
          screens, deploy to players, and more.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 px-2 text-xl font-medium text-foreground">
          Complete Workflow
        </h2>
        <p className="mb-4 px-2 text-sm text-muted-foreground">
          Follow these guides in order to go from concept to deployed signage:
        </p>
        <div className="space-y-4">
          {guides
            .filter((g) => g.category === 'workflow')
            .map((guide) => (
              <GuideCard key={guide.path} guide={guide} />
            ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 px-2 text-xl font-medium text-foreground">
          Tools & Concepts
        </h2>
        <p className="mb-4 px-2 text-sm text-muted-foreground">
          Background information and general tools:
        </p>
        <div className="space-y-4">
          {guides
            .filter((g) => g.category === 'tools')
            .map((guide) => (
              <GuideCard key={guide.path} guide={guide} />
            ))}
        </div>
      </section>

      <section className="demo-panel-soft px-8 py-8 sm:px-10">
        <h2 className="mb-4 text-2xl font-medium text-foreground">
          More Resources
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            For general information about getting started with WallRun, see the{' '}
            <Link
              to="/getting-started"
              className="text-foreground underline hover:no-underline"
            >
              Getting Started
            </Link>{' '}
            guide.
          </p>
          <p>
            For information about installable Copilot skills, see the{' '}
            <Link
              to="/skills"
              className="text-foreground underline hover:no-underline"
            >
              Skills
            </Link>{' '}
            documentation.
          </p>
          <p>
            For tooling and deployment workflows, see{' '}
            <Link
              to="/tooling"
              className="text-foreground underline hover:no-underline"
            >
              Tooling & Deployment
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};
