import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { LastUpdatedStampDocPage } from './LastUpdatedStampDoc';

describe('LastUpdatedStampDocPage', () => {
  it('renders the page title and description', () => {
    render(<LastUpdatedStampDocPage />);

    expect(
      screen.getByRole('heading', { name: 'LastUpdatedStamp' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/quiet freshness marker for live data screens/i),
    ).toBeInTheDocument();
  });

  it('renders fresh, stale, and absolute-format examples', () => {
    render(<LastUpdatedStampDocPage />);

    expect(screen.getAllByTestId('last-updated-stamp')).toHaveLength(3);
  });
});
