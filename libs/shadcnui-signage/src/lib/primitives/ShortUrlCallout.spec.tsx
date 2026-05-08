import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShortUrlCallout } from './ShortUrlCallout';

describe('ShortUrlCallout', () => {
  it('renders the URL and default prefix', () => {
    render(<ShortUrlCallout url="wallrun.dev/app" />);

    expect(screen.getByText('wallrun.dev/app')).toBeInTheDocument();
    expect(screen.getByText('Or type')).toBeInTheDocument();
  });

  it('supports panel layout with label metadata', () => {
    render(
      <ShortUrlCallout
        url="wallrun.dev/check-in"
        label="Conference app"
        variant="panel"
      />,
    );

    expect(screen.getByTestId('short-url-callout')).toHaveAttribute(
      'data-variant',
      'panel',
    );
    expect(screen.getByText('Conference app')).toBeInTheDocument();
  });
});
