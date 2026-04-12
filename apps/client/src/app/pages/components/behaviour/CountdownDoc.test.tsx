import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { CountdownDocPage } from './CountdownDoc';

describe('CountdownDocPage', () => {
  it('renders the page title and description', () => {
    render(<CountdownDocPage />);

    expect(
      screen.getByRole('heading', { name: 'Countdown' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/counts down to a target epoch time and clamps at 0/i),
    ).toBeInTheDocument();
  });

  it('keeps the inline source link and footer actions at mobile-safe sizes', () => {
    render(<CountdownDocPage />);

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