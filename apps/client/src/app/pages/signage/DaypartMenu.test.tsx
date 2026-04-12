import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { DaypartMenu } from './DaypartMenu';

describe('DaypartMenu', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-12T15:30:00+01:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderPage = () => {
    return render(
      <MemoryRouter>
        <DaypartMenu />
      </MemoryRouter>,
    );
  };

  it('renders the daypart menu heading and evening menu items', () => {
    renderPage();

    expect(screen.getByText('Café')).toBeInTheDocument();
    expect(screen.getByText('Daypart Menu')).toBeInTheDocument();
    expect(screen.getByText('Evening')).toBeInTheDocument();
    expect(screen.getByText('Ramen')).toBeInTheDocument();
    expect(screen.getByText('Sparkling Water')).toBeInTheDocument();
  });

  it('uses responsive shell spacing and a one-column mobile menu grid', () => {
    renderPage();

    expect(screen.getByTestId('daypart-menu-shell')).toHaveClass(
      'px-4',
      'sm:px-8',
      'lg:px-16',
    );
    expect(screen.getByText('Daypart Menu')).toHaveClass(
      'text-4xl',
      'sm:text-5xl',
      'lg:text-7xl',
    );
    expect(screen.getByTestId('daypart-menu-evening').querySelector('.grid')).toHaveClass(
      'grid-cols-1',
      'lg:grid-cols-2',
    );
  });
});