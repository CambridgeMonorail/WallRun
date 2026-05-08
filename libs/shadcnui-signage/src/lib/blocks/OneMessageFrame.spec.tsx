import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OneMessageFrame } from './OneMessageFrame';

describe('OneMessageFrame', () => {
  it('renders the headline as the dominant content', () => {
    render(<OneMessageFrame headline="Boarding now in Hall B" />);

    expect(screen.getByTestId('one-message-headline')).toHaveTextContent(
      'Boarding now in Hall B',
    );
  });

  it('renders supporting text with a safe clamp', () => {
    render(
      <OneMessageFrame
        headline="Reception has moved"
        supportingText="Please follow the illuminated floor markers to the temporary check-in desk beside the atrium stairs."
      />,
    );

    expect(screen.getByTestId('one-message-supporting-text')).toHaveClass(
      'line-clamp-3',
    );
  });

  it('renders optional utility, action, and media regions', () => {
    render(
      <OneMessageFrame
        headline="The next keynote starts in 12 minutes"
        utility="Main stage"
        action={<div>Scan for agenda updates</div>}
        media={<div>Preview artwork</div>}
      />,
    );

    expect(screen.getByTestId('one-message-utility')).toHaveTextContent(
      'Main stage',
    );
    expect(screen.getByTestId('one-message-action')).toHaveTextContent(
      'Scan for agenda updates',
    );
    expect(screen.getByTestId('one-message-media')).toHaveTextContent(
      'Preview artwork',
    );
  });
});