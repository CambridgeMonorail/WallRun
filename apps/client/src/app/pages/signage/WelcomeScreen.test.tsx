import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { WelcomeScreen } from './WelcomeScreen';

describe('WelcomeScreen', () => {
  const renderPage = () => {
    return render(
      <MemoryRouter>
        <WelcomeScreen />
      </MemoryRouter>,
    );
  };

  it('renders the welcome content and gallery back control', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: 'Welcome' }),
    ).toBeInTheDocument();
    expect(screen.getByText('to WallRun')).toBeInTheDocument();
    expect(
      screen.getByText('Digital Signage as Software'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /back to gallery/i }),
    ).toBeVisible();
  });

  it('uses mobile-first heading sizing and a 44px back button', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: 'Welcome' }),
    ).toHaveClass('text-6xl', 'sm:text-8xl', 'lg:text-[12rem]');
    expect(screen.getByTestId('back-button')).toHaveClass('h-11');
  });
});