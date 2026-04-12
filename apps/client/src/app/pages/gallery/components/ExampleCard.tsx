import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@wallrun/shadcnui';
import type { SignageExample } from '../signageExamples';

export interface ExampleCardProps {
  example: SignageExample;
}

export const ExampleCard: FC<ExampleCardProps> = ({ example }) => {
  const Icon = example.thumbnailIcon;

  return (
    <Link
      to={example.path}
      aria-label={`Open ${example.title} example`}
      className="block rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      data-testid={`example-card-${example.id}`}
    >
      <Card className="min-h-44 transition-all duration-200 hover:shadow-lg md:hover:scale-[1.02]">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <CardTitle className="text-lg">{example.title}</CardTitle>
              </div>
            </div>
          </div>
          <CardDescription className="mt-2">
            {example.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {example.aspectRatio}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {example.resolution}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {example.category}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
