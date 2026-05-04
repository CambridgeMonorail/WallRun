import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { RestaurantDigitalSignageTutorialPage } from './RestaurantDigitalSignage';

describe('RestaurantDigitalSignageTutorialPage', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <RestaurantDigitalSignageTutorialPage />
      </BrowserRouter>,
    );
  };

  it('renders the tutorial title and fictional restaurant', () => {
    renderWithRouter();
    expect(
      screen.getByText('Create Restaurant Digital Signage With WallRun'),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/the lard lounge/i).length).toBeGreaterThan(0);
  });

  it('renders the case study sections', () => {
    renderWithRouter();
    expect(screen.getByText('The Brief')).toBeInTheDocument();
    expect(
      screen.getByText('Turn the Restaurant Into a Signage System'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Model the Menu Before the Layout'),
    ).toBeInTheDocument();
    expect(screen.getByText('Build the First Screen')).toBeInTheDocument();
  });

  it('renders implementation snippets', () => {
    renderWithRouter();
    expect(screen.getByText('lardLoungeMenu.ts')).toBeInTheDocument();
    expect(screen.getByText('LardLoungeMenuScreen.tsx')).toBeInTheDocument();
    expect(screen.getByText(/@signage-architect/)).toBeInTheDocument();
  });

  it('links to related workflow pages', () => {
    renderWithRouter();
    expect(
      screen.getByRole('link', { name: /open menuboard docs/i }),
    ).toHaveAttribute('href', '/components/blocks/menu-board');
    expect(
      screen.getByRole('link', { name: /create a design brief/i }),
    ).toHaveAttribute('href', '/how-to/design-brief');
    expect(
      screen.getByRole('link', { name: /review deployment tooling/i }),
    ).toHaveAttribute('href', '/tooling');
  });
});
