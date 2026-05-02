import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MenuBoard } from './MenuBoard';
import { MenuSection } from '../primitives/MenuSection';
import { MenuItem } from '../primitives/MenuItem';

describe('MenuBoard components', () => {
  it('renders a menu board heading with supporting copy', () => {
    render(
      <MenuBoard title="Today's Menu" subtitle="Fresh. Local. Delicious.">
        <div>Menu content</div>
      </MenuBoard>,
    );

    expect(
      screen.getByRole('heading', { name: "Today's Menu" }),
    ).toBeInTheDocument();
    expect(screen.getByText('Fresh. Local. Delicious.')).toBeInTheDocument();
  });

  it('renders menu sections and preserves stacked item rows on narrow layouts', () => {
    render(
      <MenuSection title="Breakfast" contentClassName="space-y-5">
        <MenuItem
          name="Classic Breakfast"
          price="$12.99"
          description="Eggs, bacon, toast, hash browns"
        />
      </MenuSection>,
    );

    expect(
      screen.getByRole('heading', { name: 'Breakfast' }),
    ).toBeInTheDocument();

    const itemHeading = screen.getByRole('heading', {
      name: 'Classic Breakfast',
    });
    expect(itemHeading.parentElement).toHaveClass('flex-col', 'sm:flex-row');
    expect(screen.getByText('$12.99')).toBeInTheDocument();
  });
});
