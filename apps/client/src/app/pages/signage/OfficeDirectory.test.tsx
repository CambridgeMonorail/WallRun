import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { OfficeDirectory } from './OfficeDirectory';

describe('OfficeDirectory', () => {
  const renderPage = () => {
    return render(
      <MemoryRouter>
        <OfficeDirectory />
      </MemoryRouter>,
    );
  };

  it('renders the wayfinding heading and lobby context', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: 'Office Directory' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/you are here: main lobby/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Conference Rooms' }),
    ).toBeInTheDocument();
  });

  it('uses a one-column mobile grid with stacked directory rows', () => {
    renderPage();

    expect(screen.getByTestId('office-directory')).toHaveClass('p-4', 'sm:p-8');
    const grid = screen.getByTestId('office-directory-grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2');

    const receptionHeading = screen.getByRole('heading', { name: 'Reception' });
    const cardHeader = receptionHeading.parentElement;
    expect(cardHeader).not.toBeNull();
    expect(cardHeader).toHaveClass('flex-col', 'sm:flex-row');

    const roomLabel = screen.getByText('Room 101');
    const roomRow = roomLabel.parentElement;
    expect(roomRow).not.toBeNull();
    expect(roomRow).toHaveClass('flex-col', 'sm:flex-row');
  });
});