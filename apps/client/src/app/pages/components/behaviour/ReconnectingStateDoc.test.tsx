import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ReconnectingStateDocPage } from './ReconnectingStateDoc';

describe('ReconnectingStateDocPage', () => {
  it('renders the page title and description', () => {
    render(<ReconnectingStateDocPage />);

    expect(
      screen.getByRole('heading', { name: 'ReconnectingState' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/recovery-state notice for live regions/i),
    ).toBeInTheDocument();
  });

  it('renders both panel and inline reconnecting examples', () => {
    render(<ReconnectingStateDocPage />);

    expect(screen.getAllByTestId('reconnecting-state')).toHaveLength(2);
  });
});
