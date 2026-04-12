import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { OfflineFallbackDocPage } from './OfflineFallbackDoc';

describe('OfflineFallbackDocPage', () => {
  it('renders the page title and description', () => {
    render(<OfflineFallbackDocPage />);

    expect(
      screen.getByRole('heading', { name: 'OfflineFallback' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/renders stable fallback content when offline/i),
    ).toBeInTheDocument();
  });

  it('keeps the mobile touch targets sized correctly', () => {
    render(<OfflineFallbackDocPage />);

    expect(screen.getByRole('button', { name: /toggle health/i })).toHaveClass(
      'h-11',
    );
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

  it('toggles between healthy and fallback example states', () => {
    render(<OfflineFallbackDocPage />);

    expect(screen.getByText(/showing live content/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /toggle health/i }));

    expect(
      screen.getByText(/showing fallback \(offline\/unhealthy\)\./i),
    ).toBeInTheDocument();
  });
});