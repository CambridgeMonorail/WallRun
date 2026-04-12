import { FC } from 'react';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@wallrun/shadcnui';

const NotFound: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-xl items-center justify-center">
        <section className="w-full rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Route Error
          </p>
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The route you requested does not exist in this WallRun demo.
          </p>

          <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">Attempted path</p>
            <p className="mt-2 break-all font-mono text-sm leading-6 text-muted-foreground">
              {currentPath}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild variant="secondary" className="h-11 w-full sm:w-auto">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                Go to Home
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-11 w-full sm:w-auto">
              <Link to="/getting-started">
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                Open Getting Started
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export { NotFound };
