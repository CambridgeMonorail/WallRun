import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { RestaurantMenu } from './RestaurantMenu';

describe('RestaurantMenu', () => {
  const renderPage = () => {
    return render(
      <MemoryRouter>
        <RestaurantMenu />
      </MemoryRouter>,
    );
  };

  it('renders the menu heading and all category sections', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: "Today's Menu" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Breakfast' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Lunch Specials' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Dinner Entrees' }),
    ).toBeInTheDocument();
  });

  it('uses mobile-first spacing and stacks menu item pricing on narrow screens', () => {
    renderPage();

    expect(screen.getByTestId('restaurant-menu')).toHaveClass('p-4', 'sm:p-8');
    expect(
      screen.getByRole('heading', { name: "Today's Menu" }),
    ).toHaveClass('text-5xl', 'sm:text-6xl', 'lg:text-8xl');

    const firstItemHeading = screen.getByRole('heading', {
      name: 'Classic Breakfast',
    });
    const itemRow = firstItemHeading.parentElement;

    expect(itemRow).not.toBeNull();
    expect(itemRow).toHaveClass('flex-col', 'sm:flex-row');
  });
});