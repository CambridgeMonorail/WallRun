import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Monitor, Utensils } from 'lucide-react';

type Tutorial = {
  title: string;
  description: string;
  path: string;
  duration: string;
  audience: string;
};

const tutorials: Tutorial[] = [
  {
    title: 'Restaurant Digital Signage From Scratch',
    description:
      'Invent The Lard Lounge, turn the concept into a signage brief, model the menu data, choose WallRun components, and build a production-minded restaurant screen set.',
    path: '/tutorials/restaurant-digital-signage',
    duration: '45-60 min',
    audience: 'React developers building restaurant signage',
  },
];

const TutorialCard: FC<{ tutorial: Tutorial }> = ({ tutorial }) => {
  return (
    <Link
      to={tutorial.path}
      className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="rounded-md bg-muted p-2 text-muted-foreground">
          <Utensils className="h-5 w-5" />
        </div>
        <ArrowRight className="mt-2 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>

      <h3 className="mb-2 text-lg font-medium text-foreground group-hover:text-accent-foreground">
        {tutorial.title}
      </h3>
      <p className="mb-5 text-sm text-muted-foreground">
        {tutorial.description}
      </p>

      <dl className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Time
          </dt>
          <dd className="mt-1 text-foreground">{tutorial.duration}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Audience
          </dt>
          <dd className="mt-1 text-foreground">{tutorial.audience}</dd>
        </div>
      </dl>
    </Link>
  );
};

export const TutorialsPage: FC = () => {
  return (
    <div className="doc-shell max-w-5xl font-sans">
      <div className="demo-panel demo-grid mb-10 space-y-4 px-8 py-8 sm:px-10">
        <p className="text-sm text-muted-foreground">Tutorials</p>

        <h1 className="display-type text-3xl text-foreground md:text-4xl">
          Build Signage Like a Project
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Longer-form walkthroughs that turn a venue brief into real WallRun
          screens, data shapes, component choices, runtime notes, and deployment
          checks.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 px-2 text-xl font-medium text-foreground">
          Featured Tutorial
        </h2>
        <div className="space-y-4">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.path} tutorial={tutorial} />
          ))}
        </div>
      </section>

      <section className="demo-panel-soft px-8 py-8 sm:px-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-md bg-muted p-2 text-muted-foreground">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-medium text-foreground">
            Tutorial Format
          </h2>
        </div>
        <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <Monitor className="mb-3 h-5 w-5 text-muted-foreground" />
            <h3 className="mb-2 font-medium text-foreground">
              Start with context
            </h3>
            <p>
              Define the venue, audience, service model, screens, and failure
              cases before writing components.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <Utensils className="mb-3 h-5 w-5 text-muted-foreground" />
            <h3 className="mb-2 font-medium text-foreground">
              Model the content
            </h3>
            <p>
              Shape real menu or operational data so the UI can stay readable,
              testable, and easy to change.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <ArrowRight className="mb-3 h-5 w-5 text-muted-foreground" />
            <h3 className="mb-2 font-medium text-foreground">
              Finish with checks
            </h3>
            <p>
              Validate distance legibility, safe zones, data fallback behavior,
              and the player packaging path.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
