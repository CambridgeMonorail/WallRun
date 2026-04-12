import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { EventSchedule } from './EventSchedule';

describe('EventSchedule', () => {
  const renderPage = () => {
    return render(
      <MemoryRouter>
        <EventSchedule />
      </MemoryRouter>,
    );
  };

  it('renders the schedule heading and key events', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: "Today's Schedule" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /opening keynote: the future of digital signage/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /closing remarks & q&a/i }),
    ).toBeInTheDocument();
  });

  it('uses smaller mobile event cards and tighter schedule spacing', () => {
    renderPage();

    expect(screen.getByTestId('event-schedule')).toHaveClass('p-4', 'sm:p-8');
    expect(screen.getByTestId('event-schedule-list')).toHaveClass(
      'space-y-4',
      'sm:space-y-5',
      'lg:space-y-6',
    );
    expect(
      screen.getByRole('heading', {
        name: /opening keynote: the future of digital signage/i,
      }),
    ).toHaveClass('text-2xl', 'sm:text-3xl', 'lg:text-4xl');
  });
});