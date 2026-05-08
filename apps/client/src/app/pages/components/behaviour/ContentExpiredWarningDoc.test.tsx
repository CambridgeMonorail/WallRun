import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ContentExpiredWarningDocPage } from './ContentExpiredWarningDoc';

describe('ContentExpiredWarningDocPage', () => {
  it('renders the page title and description', () => {
    render(<ContentExpiredWarningDocPage />);

    expect(
      screen.getByRole('heading', { name: 'ContentExpiredWarning' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/expiration marker for preview, QA, and operator contexts/i),
    ).toBeInTheDocument();
  });

  it('renders expired examples for the badge and panel variants', () => {
    render(<ContentExpiredWarningDocPage />);

    expect(screen.getAllByTestId('content-expired-warning')).toHaveLength(2);
  });
});
