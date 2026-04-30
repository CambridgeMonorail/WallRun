import { FC, ReactElement } from 'react';

export interface LogoCarouselProps {
  logos: ReactElement[];
  header?: string;
  subheader?: string;
}

/**
 * LogoCarousel component displays a horizontal scrolling carousel of logos.
 *
 * This component is useful for showcasing partner logos, client logos, or any
 * other set of logos in a visually appealing and interactive manner.
 */
const LogoCarousel: FC<LogoCarouselProps> = ({ logos, header, subheader }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Header Section */}
      {header && (
        <h2 className="text-2xl font-medium tracking-tight text-foreground">
          {header}
        </h2>
      )}
      {subheader && (
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {subheader}
        </p>
      )}

      <div
        data-testid="logo-grid"
        className="mt-8 grid w-full grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6"
      >
        {logos.map((logo, index) => (
          <div
            key={`logo-${index}`}
            data-testid={`logo-grid-item-${index}`}
            className="flex h-16 w-full items-center justify-center rounded-md border border-border/50 bg-background/35 px-4 text-muted-foreground"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};

export { LogoCarousel };
