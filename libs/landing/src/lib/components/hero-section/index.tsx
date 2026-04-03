import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@wallrun/shadcnui'; // Import shadcn Button component

/**
 * Possible color variants for the HeroSection.
 * - 'light' gives a lighter background and primary text
 * - 'dark' gives a darker background and foreground text
 */
type HeroSectionVariant = 'light' | 'dark';

type HeroSectionCta = {
  text: string;
  link?: string;
  onClick?: () => void;
};

/**
 * Props for the HeroSection component.
 */
interface HeroSectionProps {
  /** The main title of the hero section. */
  title: string;
  /** An optional subtitle for the hero section. */
  subtitle?: string;
  /** An optional description for the hero section. */
  description?: string;
  /** An optional list of highlights to display in the hero section. */
  highlights?: string[];
  /** The URL of the image to display in the hero section. */
  image: string;
  /** The alt text for the image. */
  imageAlt: string;
  /** Optional primary call-to-action button configuration. */
  ctaPrimary?: HeroSectionCta;
  /** Optional secondary call-to-action button configuration. */
  ctaSecondary?: HeroSectionCta;
  /** Layout option for the hero section. */
  layout?: 'left' | 'right' | 'stacked';
  /** Additional CSS classes to apply to the hero section. */
  className?: string;
  /** The visual variant for the section's background and text. Defaults to 'light'. */
  variant?: HeroSectionVariant;
}

/**
 * A HeroSection component that displays a title, subtitle, description, highlights, and an image.
 * It also includes optional primary and secondary call-to-action buttons.
 */
export const HeroSection: FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  highlights,
  image,
  imageAlt,
  ctaPrimary,
  ctaSecondary,
  layout = 'left',
  className = '',
  variant = 'light',
}) => {
  const isReversed = layout === 'right';

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = image;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [image]);

  // Default styles for the 'light' variant
  let sectionClasses = 'bg-transparent text-foreground';
  let titleClasses = 'text-foreground';
  let subtitleClasses = 'display-kicker text-[hsl(var(--glow-amber))]';
  let descriptionClasses =
    'text-base leading-7 text-muted-foreground sm:text-lg';
  let highlightIconClasses = 'text-[hsl(var(--glow-cyan))]';
  let buttonPrimaryVariant: 'default' | 'secondary' = 'default';
  let buttonSecondaryVariant: 'default' | 'secondary' | 'outline' = 'outline';

  if (variant === 'dark') {
    sectionClasses = 'bg-transparent text-foreground';
    titleClasses = 'text-foreground';
    subtitleClasses = 'display-kicker text-[hsl(var(--glow-cyan))]';
    descriptionClasses = 'text-base leading-7 text-muted-foreground sm:text-lg';
    highlightIconClasses = 'text-[hsl(var(--glow-cyan))]';
    buttonPrimaryVariant = 'default';
    buttonSecondaryVariant = 'secondary';
  }

  const isExternalUrl = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const isInternalRoute = (url: string) => {
    return url.startsWith('/');
  };

  const renderCta = (
    cta: HeroSectionCta,
    variant: 'default' | 'secondary' | 'outline',
    className: string,
    testId: string,
  ) => {
    if (cta.link) {
      const isExternal = isExternalUrl(cta.link);

      if (isInternalRoute(cta.link)) {
        return (
          <Button
            asChild
            variant={variant}
            className={className}
            data-testid={testId}
          >
            <Link to={cta.link} onClick={cta.onClick}>
              {cta.text}
            </Link>
          </Button>
        );
      }

      return (
        <Button
          asChild
          variant={variant}
          className={className}
          data-testid={testId}
        >
          <a
            href={cta.link}
            onClick={cta.onClick}
            {...(isExternal && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
          >
            {cta.text}
          </a>
        </Button>
      );
    }

    return (
      <Button
        onClick={cta.onClick}
        variant={variant}
        className={className}
        data-testid={testId}
        disabled={!cta.onClick}
      >
        {cta.text}
      </Button>
    );
  };

  return (
    <section
      className={`${sectionClasses} relative isolate w-full overflow-hidden ${className}`}
      data-testid="hero-section"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--glow-cyan)/0.75)] to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,hsl(var(--glow-violet)/0.18),transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,hsl(var(--glow-cyan)/0.15),transparent_68%)] blur-3xl" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-4 py-20 sm:px-6 md:px-10 lg:flex-row lg:gap-16 lg:py-28">
        <div
          className={`relative z-10 flex-1 space-y-6 text-center lg:text-left ${
            isReversed ? 'order-last lg:order-first' : ''
          }`}
          data-testid="hero-content"
        >
          {subtitle && (
            <p
              className={`${subtitleClasses} text-xs sm:text-sm`}
              data-testid="hero-subtitle"
            >
              {subtitle}
            </p>
          )}
          <h1
            className={`display-type text-4xl leading-[1.08] sm:text-5xl lg:text-6xl ${titleClasses}`}
            data-testid="hero-title"
          >
            {title}
          </h1>
          {description && (
            <p
              className={`mx-auto max-w-2xl lg:mx-0 ${descriptionClasses}`}
              data-testid="hero-description"
            >
              {description}
            </p>
          )}
          {highlights && (
            <ul
              className="grid gap-3 text-left text-sm text-muted-foreground sm:grid-cols-3"
              data-testid="hero-highlights"
            >
              {highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="demo-panel-soft flex items-center gap-3 rounded-2xl px-4 py-3"
                  data-testid={`hero-highlight-${index}`}
                >
                  <CheckIcon
                    className={`h-5 w-5 shrink-0 ${highlightIconClasses}`}
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            {ctaPrimary &&
              renderCta(
                ctaPrimary,
                buttonPrimaryVariant,
                'min-w-40 rounded-full border border-[hsl(var(--glow-cyan)/0.24)] bg-[linear-gradient(135deg,hsl(var(--accent)),hsl(var(--secondary)))] px-6 py-6 text-sm uppercase tracking-[0.18em] shadow-[0_0_28px_hsl(var(--glow-cyan)/0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_hsl(var(--glow-cyan)/0.26)]',
                'cta-primary',
              )}
            {ctaSecondary &&
              renderCta(
                ctaSecondary,
                buttonSecondaryVariant,
                'min-w-40 rounded-full border border-white/12 bg-background/10 px-6 py-6 text-sm uppercase tracking-[0.18em] text-foreground backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[hsl(var(--glow-violet)/0.32)] hover:bg-white/6',
                'cta-secondary',
              )}
          </div>
        </div>

        <div
          className="relative z-10 flex flex-1 items-center justify-center"
          data-testid="hero-media"
        >
          <div className="demo-panel demo-grid w-full max-w-xl p-6 sm:p-8">
            <div className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(145deg,hsl(var(--background)/0.92),hsl(var(--card)/0.74))] p-6 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.08),0_0_48px_hsl(var(--glow-violet)/0.12)]">
              <img
                src={image}
                alt={imageAlt}
                className="mx-auto w-3/4 max-w-md object-contain drop-shadow-[0_0_40px_hsl(var(--glow-cyan)/0.18)]"
                width="448"
                height="448"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * A CheckIcon component that renders an SVG check icon.
 */
const CheckIcon: FC<React.ComponentProps<'svg'>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
