import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ArrivalBoardDocPage } from './ArrivalBoardDoc';

describe('ArrivalBoardDocPage', () => {
  it('renders the page title and arrival-first description', () => {
    render(<ArrivalBoardDocPage />);

    expect(
      screen.getByRole('heading', { name: 'ArrivalBoard' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/opinionated full-screen arrival template/i),
    ).toBeInTheDocument();

    const exampleBoard = screen.getByTestId('arrival-board');

    expect(
      within(exampleBoard).getByText(/finish arrival on your phone/i),
    ).toBeInTheDocument();
  });

  it('keeps source and footer links at mobile-safe sizes', () => {
    render(<ArrivalBoardDocPage />);

    expect(
      screen.getByRole('link', {
        name: /libs\/shadcnui-signage\/src\/lib\/blocks\/ArrivalBoard\.tsx/i,
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
