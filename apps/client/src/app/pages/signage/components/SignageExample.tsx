import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@wallrun/shadcnui';

export interface SignageExampleProps {
  children: ReactNode;
  showBackButton?: boolean;
}

export const SignageExample: FC<SignageExampleProps> = ({
  children,
  showBackButton = true,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/gallery');
  };

  return (
    <div
      className="min-h-screen min-w-screen bg-background relative overflow-hidden"
      data-testid="signage-example"
    >
      {showBackButton && (
        <div className="absolute top-4 left-4 z-50">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="h-11 bg-background/80 px-4 text-sm backdrop-blur-sm hover:bg-background/90"
            data-testid="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
        </div>
      )}
      <div className="w-full h-full">{children}</div>
    </div>
  );
};
