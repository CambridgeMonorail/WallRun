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
  let subtitleClasses = 'display-kicker text-[hsl(var(--glow-violet))]';
  let descriptionClasses =
    'text-base leading-7 text-muted-foreground sm:text-lg';
  let highlightIconClasses = 'text-[hsl(var(--glow-cyan))]';
  let buttonPrimaryVariant: 'default' | 'secondary' = 'default';
  let buttonSecondaryVariant: 'default' | 'secondary' | 'outline' = 'outline';

  if (variant === 'dark') {
    sectionClasses = 'bg-transparent text-foreground';
    titleClasses = 'text-foreground';
    subtitleClasses = 'display-kicker text-[hsl(var(--glow-violet))]';
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--glow-violet)/0.75)] to-transparent" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-4 py-16 sm:px-6 md:px-10 lg:min-h-[calc(100vh-3.5rem)] lg:flex-row lg:gap-16 lg:py-20">
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
            className={`display-type text-5xl leading-[0.98] sm:text-6xl lg:text-7xl ${titleClasses}`}
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
              className="grid gap-3 text-left text-sm text-muted-foreground sm:grid-cols-2"
              data-testid="hero-highlights"
            >
              {highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="demo-panel-soft flex items-center gap-3 px-4 py-3"
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
                'min-w-40 rounded-md border border-[hsl(var(--glow-violet)/0.42)] bg-[hsl(var(--glow-violet))] px-6 py-6 text-sm font-semibold text-white shadow-[0_0_28px_hsl(var(--glow-violet)/0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[hsl(var(--glow-violet)/0.92)] hover:shadow-[0_0_36px_hsl(var(--glow-violet)/0.28)]',
                'cta-primary',
              )}
            {ctaSecondary &&
              renderCta(
                ctaSecondary,
                buttonSecondaryVariant,
                'min-w-40 rounded-md border border-white/12 bg-background/20 px-6 py-6 text-sm font-semibold text-foreground backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[hsl(var(--glow-cyan)/0.42)] hover:bg-white/6',
                'cta-secondary',
              )}
          </div>
        </div>

        <div
          className="relative z-10 flex flex-1 items-center justify-center"
          data-testid="hero-media"
        >
          <div className="brand-frame w-full max-w-xl p-3">
            <div className="generative-field aspect-[16/10] rounded-md p-5">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={image}
                      alt={imageAlt}
                      className="h-8 w-auto object-contain drop-shadow-[0_0_22px_hsl(var(--glow-violet)/0.36)]"
                      width="120"
                      height="32"
                      data-testid="hero-image"
                    />
                  </div>
                  <span className="mono-detail rounded-sm border border-white/10 bg-black/30 px-2 py-1 text-[0.62rem] text-muted-foreground">
                    10:24
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-[1fr_0.78fr] sm:items-end">
                  <div>
                    <p className="display-type max-w-xs text-3xl leading-none text-foreground sm:text-4xl">
                      BrightSign with code
                    </p>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                      Generative signage, live data, fixed canvases, shipped as
                      software.
                    </p>
                  </div>
                  <div className="brand-frame hidden p-4 sm:block">
                    <pre className="font-mono text-[0.68rem] leading-5 text-[hsl(var(--glow-violet))]">
                      {`uniform float time;
void main() {
  vec2 uv = screen();
  float d = length(uv);
  glow += signal(d);
}`}
                    </pre>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Dev-first', 'Data', 'Ready'].map((label, index) => (
                    <div
                      key={label}
                      className="brand-frame px-3 py-2 text-left"
                    >
                      <p className="mono-detail text-[0.56rem] text-muted-foreground">
                        0{index + 1}
                      </p>
                      <p className="mt-1 text-xs font-medium text-foreground">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
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
