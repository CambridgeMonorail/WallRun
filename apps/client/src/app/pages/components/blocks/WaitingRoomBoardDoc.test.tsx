import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { WaitingRoomBoardDocPage } from './WaitingRoomBoardDoc';

describe('WaitingRoomBoardDocPage', () => {
  it('renders the page title and waiting-room example', () => {
    render(<WaitingRoomBoardDocPage />);

    expect(
      screen.getByRole('heading', { name: 'WaitingRoomBoard' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/opinionated full-screen waiting-area template/i),
    ).toBeInTheDocument();

    const exampleBoard = screen.getByTestId('waiting-room-board');

    expect(
      within(exampleBoard).getByText(/complete forms on your phone/i),
    ).toBeInTheDocument();
  });

  it('keeps source and footer links at mobile-safe sizes', () => {
    render(<WaitingRoomBoardDocPage />);

    expect(
      screen.getByRole('link', {
        name: /libs\/shadcnui-signage\/src\/lib\/blocks\/WaitingRoomBoard\.tsx/i,
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
