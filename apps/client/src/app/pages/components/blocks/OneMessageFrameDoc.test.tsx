import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { OneMessageFrameDocPage } from './OneMessageFrameDoc';

describe('OneMessageFrameDocPage', () => {
  it('renders the page title and description', () => {
    render(<OneMessageFrameDocPage />);

    expect(
      screen.getByRole('heading', { name: 'OneMessageFrame' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/single-message signage shell/i),
    ).toBeInTheDocument();
  });

  it('keeps source and footer links at mobile-safe sizes', () => {
    render(<OneMessageFrameDocPage />);

    expect(
      screen.getByRole('link', { name: /view source on github/i }),
    ).toHaveClass('min-h-11');

    const storybookLink = screen.getByRole('link', {
      name: /view in storybook/i,
    });
    const sourceLink = screen.getByRole('link', {
      name: /^view source$/i,
    });

    expect(storybookLink).toHaveClass('h-11');
    expect(sourceLink).toHaveClass('h-11');
  });
});
