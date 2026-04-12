import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnnouncementsBoard } from './AnnouncementsBoard';

describe('AnnouncementsBoard', () => {
  const renderPage = () => {
    return render(
      <MemoryRouter>
        <AnnouncementsBoard />
      </MemoryRouter>,
    );
  };

  it('renders the announcement board heading and items', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: 'Announcements' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Team Building Event' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Product Launch Meeting' }),
    ).toBeInTheDocument();
  });

  it('uses responsive board spacing and smaller announcement copy on mobile', () => {
    renderPage();

    expect(screen.getByTestId('announcements-board')).toHaveClass('p-4', 'sm:p-8');
    expect(
      screen.getByRole('heading', { name: 'Announcements' }),
    ).toHaveClass('text-5xl', 'sm:text-6xl', 'lg:text-8xl');
    expect(screen.getByTestId('announcements-list')).toHaveClass(
      'space-y-4',
      'sm:space-y-6',
      'lg:space-y-8',
    );
    expect(
      screen.getByRole('heading', { name: 'Team Building Event' }),
    ).toHaveClass('text-2xl', 'sm:text-3xl', 'lg:text-5xl');
  });
});