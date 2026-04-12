import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { OfficeLobbyLoop } from './OfficeLobbyLoop';

describe('OfficeLobbyLoop', () => {
  const renderPage = () => {
    return render(
      <MemoryRouter>
        <OfficeLobbyLoop />
      </MemoryRouter>,
    );
  };

  it('renders the lobby heading and first slide content', () => {
    renderPage();

    expect(screen.getByText('Office Lobby')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Welcome to HQ')).toBeInTheDocument();
    expect(
      screen.getByText(/visitors: please check in at reception/i),
    ).toBeInTheDocument();
  });

  it('uses responsive shell spacing and mobile-safe slide grids', () => {
    renderPage();

    expect(screen.getByTestId('office-lobby-loop-shell')).toHaveClass(
      'px-4',
      'sm:px-8',
      'lg:px-16',
    );
    expect(
      screen.getByTestId('office-lobby-loop-welcome-slide'),
    ).toHaveClass('grid-cols-1', 'lg:grid-cols-12');
    expect(screen.getByText('Today')).toHaveClass(
      'text-4xl',
      'sm:text-5xl',
      'lg:text-7xl',
    );
  });
});