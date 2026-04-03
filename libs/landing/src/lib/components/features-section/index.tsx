import { FC, ReactNode } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@wallrun/shadcnui';

interface Feature {
  title: string;
  description: string;
  icon?: ReactNode; // Add the icon property
  className?: string; // Add the className property
}

interface FeaturesSectionProps {
  title: string;
  features: Feature[];
  className?: string;
  'data-testid'?: string;
}

/**
 * FeaturesSection component displays a section with a title and a list of features.
 */
const FeaturesSection: FC<FeaturesSectionProps> = ({
  title,
  features,
  className,
  'data-testid': dataTestId,
}) => {
  return (
    <section
      id="features"
      className={`w-full px-4 py-8 sm:px-6 lg:px-8 ${className}`}
      data-testid={dataTestId}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="display-kicker mb-4 text-xs sm:text-sm">
            Capability Surface
          </p>
          <h2 className="display-type text-3xl text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            className={`demo-panel h-full bg-transparent p-0 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_hsl(var(--glow-cyan)/0.12)] ${feature.className}`}
          >
            <CardHeader className="p-6 sm:p-7">
              <CardTitle className="mb-4 text-xl font-medium text-foreground sm:text-2xl">
                <div className="flex items-start gap-3 leading-tight">
                  {feature.icon && (
                    <span className="demo-panel-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10">
                      {feature.icon}
                    </span>
                  )}
                  <p>{feature.title}</p>
                </div>
              </CardTitle>
              <CardDescription className="text-base leading-7 text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export { FeaturesSection };
