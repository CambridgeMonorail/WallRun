import { type FC, type ReactNode } from 'react';

interface DocPageHeaderProps {
  /** Category label (e.g., "Behaviour", "Layouts", "Primitives") */
  category: string;
  /** Component name */
  title: string;
  /** Brief description of the component */
  description: string;
}

interface DocPageLayoutProps {
  /** Header configuration */
  header: DocPageHeaderProps;
  /**
   * Summary of what the component is built on.
   * Accepts ReactNode to allow custom formatting (e.g., bold lead phrase).
   * @example
   * <>
   *   <strong>No shadcn primitives</strong> - Built with conditional rendering.
   * </>
   */
  builtOnSummary: ReactNode;
  /** List of "Built On" bullet points as simple strings */
  builtOnItems: string[];
  /** Remaining page content (Installation, Example, Props, etc.) */
  children: ReactNode;
}

/**
 * Shared layout component for documentation pages.
 *
 * Provides consistent structure for component documentation including:
 * - Header with category, title, and description
 * - "Built On" section describing component foundation
 * - Slot for custom content sections
 *
 * @example
 * ```tsx
 * <DocPageLayout
 *   header={{
 *     category: "Behaviour",
 *     title: "OfflineFallback",
 *     description: "A boundary that renders fallback content when offline."
 *   }}
 *   builtOnSummary={
 *     <>
 *       <strong>No shadcn primitives</strong> - Built with conditional rendering.
 *     </>
 *   }
 *   builtOnItems={[
 *     "Manual recovery control via isHealthy prop",
 *     "Defaults to showing content when isHealthy is undefined",
 *   ]}
 * >
 *   <section className="mb-12">...</section>
 * </DocPageLayout>
 * ```
 */
export const DocPageLayout: FC<DocPageLayoutProps> = ({
  header,
  builtOnSummary,
  builtOnItems,
  children,
}) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <p className="text-sm text-muted-foreground">{header.category}</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          {header.title}
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          {header.description}
        </p>
      </div>

      {/* Built On */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Built On</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="mb-4">{builtOnSummary}</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {builtOnItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Custom sections */}
      {children}
    </div>
  );
};
