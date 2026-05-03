import { FC, ReactNode } from 'react';
import { Button } from '@wallrun/shadcnui';
import { CodeSnippet } from './CodeSnippet';
import { PUBLIC_REGISTRY_URL } from './componentDocs.constants';

type ComponentDocLink = {
  label: string;
  href: string;
};

type ComponentDocNote = {
  title: string;
  body: string;
};

export interface ComponentDocTemplateProps {
  category: string;
  name: string;
  description: string;
  builtOnSummary: string;
  builtOnPoints: string[];
  example: ReactNode;
  installName: string;
  sourcePaths: string[];
  dependencyInstall?: string;
  usageCode: string;
  usageFilename: string;
  signageNotes: ComponentDocNote[];
  links: ComponentDocLink[];
}

export const ComponentDocTemplate: FC<ComponentDocTemplateProps> = ({
  category,
  name,
  description,
  builtOnSummary,
  builtOnPoints,
  example,
  installName,
  sourcePaths,
  dependencyInstall,
  usageCode,
  usageFilename,
  signageNotes,
  links,
}) => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">{category}</p>

        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          {name}
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Built On</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4">
            <strong>{builtOnSummary}</strong>
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {builtOnPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Example</h2>
        <div className="overflow-hidden rounded-lg bg-slate-950 p-8">
          {example}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Installation</h2>
        <p className="mb-4 text-muted-foreground">
          Copy the source code into your project, or install it from the public
          WallRun registry.
        </p>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium">Using the CLI (Recommended)</h3>
          <CodeSnippet
            language="bash"
            code={`npx shadcn@latest add ${PUBLIC_REGISTRY_URL} ${installName}`}
          />
        </div>

        <div className="mb-4">
          <h3 className="mb-3 text-lg font-medium">Manual Installation</h3>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-medium">1. Copy the source files</h3>
            <div className="space-y-2 text-muted-foreground">
              {sourcePaths.map((sourcePath) => {
                const sourceUrl = `https://github.com/CambridgeMonorail/WallRun/blob/main/${sourcePath}`;

                return (
                  <p key={sourcePath}>
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center font-mono text-sm text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      {sourcePath}
                    </a>
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">2. Install dependencies</h3>
            {dependencyInstall ? (
              <CodeSnippet language="bash" code={dependencyInstall} />
            ) : (
              <p className="text-sm text-muted-foreground">
                No additional dependencies required.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Usage</h2>
        <CodeSnippet
          language="tsx"
          filename={usageFilename}
          code={usageCode}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Signage Considerations</h2>
        <div className="space-y-4 text-muted-foreground">
          {signageNotes.map((note) => (
            <div key={note.title}>
              <strong className="text-foreground">{note.title}:</strong>{' '}
              {note.body}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">Links</h2>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <Button key={link.href} asChild variant="outline" className="h-11">
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};