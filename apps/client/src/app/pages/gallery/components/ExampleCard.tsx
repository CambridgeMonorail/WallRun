import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const Icon = example.thumbnailIcon;

  const handleClick = () => {
    navigate(example.path);
  };

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
      onClick={handleClick}
      data-testid={`example-card-${example.id}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
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
        <div className="flex gap-2 flex-wrap">
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
  );
};
