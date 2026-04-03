import { FC } from 'react';
import { Button } from '@wallrun/shadcnui';
import { Steps, Step } from '@wallrun/shadcnui-blocks';

/**
 * Props for the StepsSection component.
 */
interface StepsSectionProps {
  /** The title of the section */
  title: string;
  /** An array of steps to display */
  steps: Step[];
  /** The text to display on the button */
  buttonText: string;
  /** The action to perform when the button is clicked */
  buttonAction: () => void;
  /** Test ID for the component */
  'data-testid'?: string;
}

/**
 * A section component that displays a title, a list of steps, and a button.
 *
 * The component helps visually illustrate a multi-step process with notes explaining each step.
 * Its primary use case is for landing pages that provide an overview of product functionality or getting started guides.
 */
const StepsSection: FC<StepsSectionProps> = ({
  title,
  steps,
  buttonText,
  buttonAction,
  'data-testid': dataTestId,
}) => {
  return (
    <section
      className="w-full px-4 py-8 text-foreground sm:px-6 lg:px-8"
      data-testid={dataTestId}
    >
      <div className="demo-panel mx-auto max-w-6xl px-6 py-10 text-center sm:px-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <p className="display-kicker mb-4 text-xs sm:text-sm">
            Activation Sequence
          </p>
          <h2 className="display-type mb-6 text-3xl text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="section-shell mx-auto mb-8 max-w-5xl px-4 py-6 text-left sm:px-6">
          <Steps steps={steps} />
        </div>
        <Button
          size="lg"
          onClick={buttonAction}
          variant="default"
          className="rounded-full border border-[hsl(var(--glow-cyan)/0.24)] bg-[linear-gradient(135deg,hsl(var(--accent)),hsl(var(--secondary)))] px-6 py-6 text-sm uppercase tracking-[0.18em] shadow-[0_0_28px_hsl(var(--glow-cyan)/0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_hsl(var(--glow-cyan)/0.26)]"
          aria-label={buttonText}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export { StepsSection };
