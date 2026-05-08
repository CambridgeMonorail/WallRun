import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NoContentFallback } from './NoContentFallback';

describe('NoContentFallback', () => {
  it('renders a public-safe fallback by default', () => {
    render(<NoContentFallback />);

    expect(screen.getByTestId('no-content-fallback')).toHaveAttribute(
      'data-variant',
      'public-safe',
    );
    expect(screen.queryByTestId('no-content-debug-meta')).not.toBeInTheDocument();
  });

  it('renders owner and last-checked metadata in operator mode', () => {
    render(
      <NoContentFallback
        variant="operator-debug"
        owner="Campus operations"
        lastCheckedAt="2026-05-07T10:00:00.000Z"
      />,
    );

    expect(screen.getByTestId('no-content-debug-meta')).toBeInTheDocument();
    expect(screen.getByText(/Owner: Campus operations/)).toBeInTheDocument();
    expect(screen.getByTestId('last-updated-stamp')).toBeInTheDocument();
  });
});