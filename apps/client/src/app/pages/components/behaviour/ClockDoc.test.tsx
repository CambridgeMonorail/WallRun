import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ClockDocPage } from './ClockDoc';

describe('ClockDocPage', () => {
  it('renders the page title and description', () => {
    render(<ClockDocPage />);

    expect(
      screen.getByRole('heading', { name: 'Clock' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/signage-ready clock with large, readable formatting/i),
    ).toBeInTheDocument();
  });

  it('keeps the inline source link and footer actions at mobile-safe sizes', () => {
    render(<ClockDocPage />);

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
});