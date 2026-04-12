import { FC } from 'react';
import { ExampleCard } from './components/ExampleCard';
import { signageExamples } from './signageExamples';

export const GalleryPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8" data-testid="gallery-page">
      <div className="max-w-7xl mx-auto">
        {/* DOCS HEADER */}
        <div className="mb-10 space-y-4">
          <p className="text-sm text-muted-foreground">Examples</p>

          <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
            Signage Gallery
          </h1>

          <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
            Full-screen examples demonstrating fixed-aspect layouts,
            distance-readable typography, and deterministic rendering for
            always-on displays.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="gallery-grid"
        >
          {signageExamples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Open any example to view it in full-screen mode. Use your browser's
            back button to return to the gallery.
          </p>
        </footer>
      </div>
    </div>
  );
};
