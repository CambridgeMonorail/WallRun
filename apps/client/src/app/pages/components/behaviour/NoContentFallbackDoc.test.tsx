import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { NoContentFallbackDocPage } from './NoContentFallbackDoc';

describe('NoContentFallbackDocPage', () => {
  it('renders the page title and description', () => {
    render(<NoContentFallbackDocPage />);

    expect(
      screen.getByRole('heading', { name: 'NoContentFallback' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/public-safe and operator-friendly fallback surface/i),
    ).toBeInTheDocument();
  });

  it('renders both public-safe and operator-debug examples', () => {
    render(<NoContentFallbackDocPage />);

    expect(screen.getAllByTestId('no-content-fallback')).toHaveLength(2);
    expect(screen.getByTestId('no-content-debug-meta')).toBeInTheDocument();
  });
});
