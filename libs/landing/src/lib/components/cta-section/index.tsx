import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';

/**
 * Possible color variants for the CTA section.
 * - 'light' gives a lighter background and primary text
 * - 'dark' gives a darker background and foreground text
 */
type CTASectionVariant = 'light' | 'dark';

interface CTASectionProps {
  /** The title to display in the section. */
  title: string;
  /** The description text to display in the section. */
  description: string;
  /** The text to display on the button. */
  buttonText: string;
  /** The action to perform when the button is clicked. */
  buttonAction?: () => void;
  /** External URL to navigate to. Renders a proper anchor element. */
  buttonHref?: string;
  /**
   * The visual variant for the section's background and text.
   * Defaults to 'light'.
   */
  variant?: CTASectionVariant;
}

/**
 * A reusable CTA (Call-To-Action) section component with two variants:
 * 'light' and 'dark'. This helps break up a single-color landing page
 * into distinct sections.
 */
export const CTASection: FC<CTASectionProps> = ({
  title,
  description,
  buttonText,
  buttonAction,
  buttonHref,
  variant = 'light',
}) => {
  const baseSectionClasses = 'w-full px-4 py-8 sm:px-6 lg:px-8';
  const baseHeadingClasses = 'display-type text-3xl text-foreground sm:text-4xl';
  const baseParagraphClasses = 'mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg';

  let sectionClasses = 'bg-transparent text-foreground';
  let headingClasses = baseHeadingClasses;
  let paragraphClasses = baseParagraphClasses;
  let buttonVariant: 'default' | 'secondary' = 'default';
  let buttonClassName =
    'rounded-full border border-[hsl(var(--glow-cyan)/0.24)] bg-[linear-gradient(135deg,hsl(var(--accent)),hsl(var(--secondary)))] px-6 py-6 text-sm uppercase tracking-[0.18em] shadow-[0_0_28px_hsl(var(--glow-cyan)/0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_hsl(var(--glow-cyan)/0.26)]';

  if (variant === 'dark') {
    sectionClasses = 'bg-transparent text-foreground';
    headingClasses = `${baseHeadingClasses} text-foreground`;
    paragraphClasses = `${baseParagraphClasses} text-muted-foreground`;
    buttonVariant = 'secondary';
    buttonClassName =
      'rounded-full border border-white/12 bg-background/10 px-6 py-6 text-sm uppercase tracking-[0.18em] text-foreground backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[hsl(var(--glow-violet)/0.32)] hover:bg-white/6';
  }

  return (
    <section className={`${baseSectionClasses} ${sectionClasses}`}>
      <div className="demo-panel demo-grid mx-auto max-w-6xl px-6 py-10 text-center sm:px-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${headingClasses} mb-6`}>{title}</h2>
          <p className={`${paragraphClasses} mb-8`}>{description}</p>
        </div>
        {buttonHref ? (
          <Button
            asChild
            size="lg"
            variant={buttonVariant}
            className={buttonClassName}
            aria-label={buttonText}
          >
            <a href={buttonHref} target="_blank" rel="noopener noreferrer">
              {buttonText}
            </a>
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={buttonAction}
            variant={buttonVariant}
            className={buttonClassName}
            aria-label={buttonText}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </section>
  );
};
