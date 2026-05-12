import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { DecisionBoardDocPage } from './DecisionBoardDoc';

describe('DecisionBoardDocPage', () => {
  it('renders the page title and decision example', () => {
    render(<DecisionBoardDocPage />);

    expect(
      screen.getByRole('heading', { name: 'DecisionBoard' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/opinionated full-screen routing template/i),
    ).toBeInTheDocument();

    const exampleBoard = screen.getByTestId('decision-board');

    expect(
      within(exampleBoard).getByText(/open the self-service flow/i),
    ).toBeInTheDocument();
  });

  it('keeps source and footer links at mobile-safe sizes', () => {
    render(<DecisionBoardDocPage />);

    expect(
      screen.getByRole('link', {
        name: /libs\/shadcnui-signage\/src\/lib\/blocks\/DecisionBoard\.tsx/i,
      }),
    ).toHaveClass('min-h-11');

    const sourceLink = screen.getByRole('link', {
      name: /^view source$/i,
    });
    const readmeLink = screen.getByRole('link', { name: /library readme/i });

    expect(sourceLink).toHaveClass('h-11');
    expect(readmeLink).toHaveClass('h-11');
  });
});
