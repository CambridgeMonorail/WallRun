import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { StaleDataIndicatorDocPage } from './StaleDataIndicatorDoc';

describe('StaleDataIndicatorDocPage', () => {
  it('renders the page title and description', () => {
    render(<StaleDataIndicatorDocPage />);

    expect(
      screen.getByRole('heading', { name: 'StaleDataIndicator' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/compact freshness indicator for always-on screens/i),
    ).toBeInTheDocument();
  });

  it('keeps the inline source link and footer actions at mobile-safe sizes', () => {
    render(<StaleDataIndicatorDocPage />);

    expect(
      screen.getByRole('link', { name: /view source on github/i }),
    ).toHaveClass('min-h-11');

    const storybookLink = screen.getByRole('link', {
      name: /view in storybook/i,
    });
    const sourceLink = screen.getAllByRole('link', {
      name: /view source/i,
    })[1];

    expect(storybookLink).toHaveClass('h-11');
    expect(sourceLink).toHaveClass('h-11');
  });

  it('renders all three freshness examples', () => {
    render(<StaleDataIndicatorDocPage />);

    expect(screen.getAllByText('Fresh').length).toBeGreaterThan(0);
    expect(screen.getByText('Aging')).toBeInTheDocument();
    expect(screen.getAllByText('Stale').length).toBeGreaterThan(0);
  });
});