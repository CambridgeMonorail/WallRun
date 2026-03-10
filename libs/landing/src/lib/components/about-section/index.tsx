import { LogoCarousel } from '@tsa/shadcnui-blocks';
import { ReactElement } from 'react';

/**
 * Props for the AboutSection component.
 */
interface AboutSectionProps {
  /**
   * The title to display in the about section.
   * This should be a short, descriptive heading that summarizes the content of the section.
   */
  title: string;

  /**
   * The description to display in the about section.
   * This should provide more detailed information about the organization, product, or service.
   */
  description: string;

  /**
   * An array of React elements representing logos to display in the about section.
   * These logos can represent partners, technologies, or other relevant entities.
   */
  logos: ReactElement[];

  /**
   * Optional header for the logo carousel.
   */
  header?: string;

  /**
   * Optional subheader for the logo carousel.
   */
  subheader?: string;
}

/**
 * A component that renders an about section with a title, description, and logos.
 *
 * This component is typically used in landing pages to provide visitors with information
 * about the organization, product, or service. It helps to build credibility and trust
 * by showcasing key details and visual elements such as logos of partners or technologies.
 */
export const AboutSection = ({
  title,
  description,
  logos,
  header,
  subheader,
}: AboutSectionProps): ReactElement => {
  return (
    <section
      data-testid="about-section"
      className="w-full px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="demo-panel mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="display-kicker mb-4 text-xs sm:text-sm">
            Systems, Tooling, Delivery
          </p>
          <h2
            data-testid="about-title"
            className="display-type mb-6 text-3xl text-foreground sm:text-4xl"
          >
            {title}
          </h2>
          <p
            data-testid="about-description"
            className="mx-auto mb-10 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            {description}
          </p>
        </div>
        <div className="section-shell px-4 py-6 sm:px-6">
          {logos.length > 0 ? (
            <LogoCarousel logos={logos} header={header} subheader={subheader} />
          ) : (
            <div
              data-testid="about-logos"
              className="flex flex-wrap justify-center gap-4"
            >
              {logos.map((logo, index) => (
                <div
                  key={index}
                  data-testid={`about-logo-${index}`}
                  className="mb-2"
                >
                  {logo}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
